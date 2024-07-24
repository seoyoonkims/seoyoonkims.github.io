---
title: Seminar
layout: default
parent: HyperAccel
nav_order: 1
---

## HyperAccel 논문 세미나 정리

### **1. QLLM: Accurate and Efficient Low-Bitwidth Quantization for Large Language Models (6/24)**  

- Channel Disassembly

LLM은 두 개의 코어 파트가 있는데, 멀티헤드 셀프 어텐션과 FFN이다. 이들은 주로 Linear layers로 구성되어 있으며 다음과 같이 표현된다.  

$$
\mathbf{y}_k = \sum_{i=1}^M \mathbf{x}_i\mathbf{W}_{ik}
$$

M 번째 채널에 아웃라이어가 존재한다고 하면 해당 채널을 T개로 쪼갤 수 있다. 하나의 큰 Activation 값을 여러 개의 작은 값들로 표현하는 것이다.

$$
\mathbf{y_k} = \sum_{i=1}^M \mathbf{x}_i\mathbf{W}_{ik} + \frac {\mathbf{x}_M}{T}\mathbf{W}_{Mk} + \cdots + \frac {\mathbf{x}_M}{T}\mathbf{W}_{Mk}
$$

$$
T = \lceil max(\vert \mathbf{x}_M \vert /\theta) \rceil
$$

$\theta$ 는 아웃라이어 채널이 어떤 크기로 쪼개질지 조절하는 매개변수다.  

- Channel Assembly

채널을 쪼개고 나면 채널의 개수는 $M + T - 1$ 가 된다. 원래 M개 였으므로 이를 M개로 다시 줄여주는 작업이 필요하다.

이때 LLM에는 상당히 많은 채널이 존재하므로 몇개 생략해도 성능에 별 지장이 없다. 그렇지만 단순히 Channel Pruning을 하면 정보를 잃게 되므로, Channel Assembly를 통해 비슷한 채널들을 하나로 합쳐주는 방법으로 채널의 수를 줄인다.  

Distance가 가까운 채널들을 Merge 해주는데, 식을 잘보면 Activation 차와 가중치 차의 곱으로 인수분해가 가능하다. 두 가지 모두 비슷해야 Distance가 작아짐을 알 수 있다.

$$
D(i, j) = \vert \frac {\mathbf{x}_i(\mathbf{W}_{ik}-\mathbf{W}_{jk})}{2} + \frac {\mathbf{x}_j(\mathbf{W}_{jk}-\mathbf{W}_{ik})}{2} \vert ^2
$$


$$
\mathbf{x}_i\mathbf{W}_{ik} + \mathbf{x}_j\mathbf{W}_{jk} \approx \frac {\mathbf{x}_i + \mathbf{x}_j}{2} (\mathbf{W}_{ik}+\mathbf{W}_{jk})
$$

Merge에는 이 단순한 식을 사용한다.  

- Choosing T and $\theta$  

Find $\theta$ that satisfies

$$
arg min_\theta \vert Softmax(\mathbf{QK}^T)\mathbf{V} - Softmax(\mathbf{\tilda{Q}\tilda{K}}^T)\mathbf{\tilda{V}}
$$

를 Grid Search로 찾는다.  
(좀 원시적인 방법..)  

- Efficient Gradient Based Error Correction  

Fine tuning 해주는 부분인데 Lora 논문을 참고한다. 

$$
Y = quant(X)quant(W) + quant(X)W_{correction}
$$

로 $W_{correction}$ 을 학습을 시키는데 $W_{correction}=AB$ 로 해서 결국 AB를 학습시킨다. 이렇게 하면 메모리를 줄일 수 있기 때문이다.  
(근데 FFN은 다 이렇게 하지 않나)

한줄 평가:
**재미: 3.5**  
**유익: 3.5**
**이해: 4**  


