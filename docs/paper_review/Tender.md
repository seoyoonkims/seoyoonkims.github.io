---
title: Tender
layout: default
parent: Paper Review
nav_order: 2
---

논문 리뷰  


2024 ACM/IEEE 51st Annual International Symposium on Computer Architecture (ISCA)  

## Tender: Accelerating Large Language Models via Tensor Decomposition and Runtime Requantization  

Jungi Lee, Wonbeom Lee, Jaweoong Sim  

---

HyperAccel에서 인턴하면서 처음으로 리뷰해본 논문이다.  

PPT Slide: [Tender](https://github.com/seoyoonkims/seoyoonkims.github.io/blob/main/docs/pdf/Tender_PPT.pdf)  


### **I. Introduction**  

LLM이 최근에 굉장히 성공을 거두고 있지만 엄청난 양의 연산과 메모리 리소스들을 필요로 하면서 Quantization을 통해 해결하려는 노력이 많이 이뤄지고 있다. Weight과 Activation을 모두 낮은 비트의 정수로 Quantize 하면 행렬 연산을 가속하고 정수 연산 유닛의 높은 throughput을 유지할 수 있다. 또한, 메모리 capacity와 bandwidth 면에서도 이득을 볼 수 있다.
하지만, CNN이나 작은 트랜스포머 모델과는 달리 모델 사이즈가 6.7B이 넘어가면 Outlier들이 많아져서 Quantization의 범위를 늘리기 때문에 성능이 떨어지게 된다.

![outliers](../images/outliers.png)

그래서 지금까지 이를 해결하기 위한 다양한 노력들이 있었다. 대부분의 소프트웨어 적인 방법들은 복잡한 알고리즘으로 인한 오버헤드 때문에 추론 시간을 눈에 띄게 줄이지 못하거나, 4 bit 같은 Low-bit precision에서 Quantization Loss가 상당해지는 문제점이 있다.
알고리즘-하드웨어 co-design 같은 경우에는 mixed-precision 및 복잡한 연산 유닛을 필요로 하거나, 커스텀 데이터 타입을 필요로 해서 일반적인 하드웨어에서는 지원이 안되는 문제점이 있다.  

Tender는 이중에서 알고리즘-하드웨어 co-design에 해당하는 해결책을 제시하고 있다. 이때, Mixed Precision이나 복잡한 연산 유닛, 그리고 Custom 데이터 타입 없이 LLM을 효과적으로 가속시킬 수 있는 방법에 대해 이야기하고 있다.  

**Tender의 주요 컨셉**  
Activation Tensor를 채널을 따라서 여러 개의 Subtensor들로 나눈다. Outlier들이 주로 채널을 따라 존재하기 때문에 Channel Dimension으로 나누면 Outlier들을 효과적으로 분리할 수 있게 된다. 그후, 각각의 Subtensor들은 다른 Scale Factor를 이용해서 Quantize가 되고 기존의 Tensor나 Row 단위로 Quantization 할 때에 비해 에러가 줄어든다. 하지만, 채널마다 Scale Factor를 다르게 하는 것은 행렬 계산을 하고 부분합을 구할 때 계속 Re-scaling과 Re-quantization이 필요하므로 Scale Factor 간의 관계가 2의 거듭제곱이 되도록 해서 소수 계산을 간단한 Shiter Logic으로 구현한다. 이렇게 하면 소수 연산이 필요했던 Re-quantization이 없어지고 Mixed-Precision이나 Custom Datatype도 필요가 없어진다.  

---
### **Background**  

**1.Transformer**  

앞에서 Activation과 Weight이라는 용어가 등장했는데, 트랜스포머의 경우에는 인풋에 해당하는 X가 Activation, 가중치에 해당하는 W가 Weight이라고 보면 된다. 여기서 주목할 점은 Activation들은 행 단위로 계산이 되고, Weight들은 대부분 열 단위로 계산이 된다는 점이다.  

![transformer](../images/transformer_.png)  

$$
X_Q = XW_Q; X_K = XW_K; X_V = XW_V  
$$  

$$
X_S = softmax(X_Q {X_K}^T)  
$$

$$
X_O = X_S X_V W_O + X  
$$

$$
X_T = ReLU(X_O W_FC1) W_FC2 + X_O  
$$

