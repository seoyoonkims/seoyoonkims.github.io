---
title: Diffusion Models
layout: default
parent: Posts
nav_order: 4
---

## **Diffusion Models**  

---

**1. Overview**  

Diffusion Model은 Encoder와 Decoder로 구성된다. Encoder는 Prespecified인 과정이고, Decoder가 Learnable한 과정이다. 

![18.1](../images/Diffusion/18.1.png)  

Encoder(Forward, Diffusion Process)는 $\mathbf{x}$를 latent variable인 $\mathbf{z}_1, \mathbf{z}_2, ... , \mathbf{z}_T$에 Mapping 한다. White Noise를 첨가하는 과정이라고 보면 된다. 충분히 반복하면 $q(\mathbf{z}_T \vert \mathbf{x})$와 $q(\mathbf{z}_T)$가 Standard Normal Distribution이 되고, Noise만 남은 상태가 된다.  

Decoder(Backward, Reverse Process)는 학습 가능한 네트워크로 Encoder의 역과정이다. Noise가 점차 제거되면서 데이터 샘플을 생성한다. 


---

**2. Encoder (Forward Process)**  

$$
\mathbf{z}_1 = \sqrt{1-\beta_1 \cdot \mathbf{x}} + \sqrt{\beta_1} \cdot \epsilon_1  
$$

$$
\mathbf{z}_t = \sqrt{1-\beta_t \cdot \mathbf{z}_{t-1}} + \sqrt{\beta_t} \cdot \epsilon_t  
$$

$\epsilon_t$는 Standard Normal Distribution에서 나온 Noise이다. $\beta_t \in [0, 1]$는 noise schdule을 위한 hyperparameter로, 노이즈가 섞이는 속도를 결정한다.  

$$
q(\mathbf{z}_1 \vert \mathbf{x}) = N_{\mathbf{z}_1} \left[ \sqrt{1-\beta_1}\mathbf{x}, \beta_1 \mathbf{I} \right]
$$

$$
q(\mathbf{z}_t \vert \mathbf{z}_{t-1}) = N_{\mathbf{z}_1} \left[ \sqrt{1-\beta_t}\mathbf{z}_{t-1}, \beta_t \mathbf{I} \right]  
$$

직전 단계의 변수에만 영향을 받는 Markov Chain이라고 볼 수 있다. 충분한 단계 T가 지나면, 원본 데이터의 특성은 사라지고 $q(\mathbf{z}_T \vert \mathbf{x}) = q(\mathbf{z}_T)$인 표준 정규 분포가 된다.  
  
Joint Distribution은 다음과 같다. 

$$
q(\mathbf{z}_{1...T} \vert \mathbf{x}) = q(\mathbf{z}_1 \vert \mathbf{x}) \prod\limits_{t=2}^{T} q(\mathbf{z}_t \vert \mathbf{z}_{t-1})
$$

![18.2](../images/Diffusion/18.2.png)

결국은 위 그림처럼 $x$는 0에 수렴하고, $q(z_t \vert x)$는 mean이 0인 정규분포에 가까워진다. 


**2.1 Diffusion Kernel**  

$\mathbf{z}_t$ 를 계산하는 것은 t가 클 때 time-consuming 일 수 있다. 다행히도 $q(\mathbf{z}_t \vert \mathbf{x})$ 의 closed-form이 존재하고 initial data $\mathbf{x}$ 에서 바로 $\mathbf{z}_t$ 를 구하는 것이 가능하다. 이것을 diffusion kernel이라고 한다.


$$
\mathbf{z}_1 = \sqrt{1-\beta_1 \cdot \mathbf{x}} + \sqrt{\beta_1} \cdot \epsilon_1  
$$

$$
\mathbf{z}_2 = \sqrt{1-\beta_2 \cdot \mathbf{z}_{1}} + \sqrt{\beta_2} \cdot \epsilon_2  
$$

두번째 식을 첫번째 식에 대입하면, 다음을 얻는다.

$$
\mathbf{z}_2 = \sqrt{1-\beta_2} (\sqrt{1-\beta_1} \cdot \mathbf{x} + \sqrt{\beta_1} \cdot \epsilon_1) + \sqrt{\beta_2} \cdot \epsilon_2  
$$

$$
= \sqrt{1-\beta_2} (\sqrt{1-\beta_1} \cdot \mathbf{x} + \sqrt{1-(1-\beta_1)} \cdot \epsilon_1) + \sqrt{\beta_2} \cdot \epsilon_2  
$$

$$
= \sqrt{(1-\beta_2)(1-\beta_1)} \cdot \mathbf{x} + \sqrt{1-\beta_2 -(1-\beta_2)(1-\beta_1)} \cdot \epsilon_1 + \sqrt{\beta_2} \cdot \epsilon_2  
$$

서로 독립인 두 가우시안 분포의 합은 평균이 $\mu + \nu$, 분산이 $\sigma^2 + \tau^2$ 인 새로운 가우시안 분포가 된다는 점을 이용하면 다음이 쉽게 유도가 된다. 세번째 식에서 뒤에 두 항은 평균이 0이고 분산이 각각 $\sqrt{1-\beta_2 -(1-\beta_2)(1-\beta_1)}$, $\sqrt{\beta_2}$ 인 가우시안 분포이다. 따라서 두 분포를 더하면 평균이 0이고 분산이 $1-\beta_2 -(1-\beta_2)(1-\beta_1) + \beta_2 = 1 - (1-\beta_2)(1-\beta_1)$ 가 된다.

$$
\mathbf{z}_2 = \sqrt{(1-\beta_2)(1-\beta_1)} \cdot \mathbf{x} + \sqrt{1-(1-\beta_2)(1-\beta_1)} \cdot \epsilon  
$$

$\epsilon$은 표준 정규 분포이다. 위 과정을 반복하면 $\mathbf{z}_t$를 쉽게 구할 수 있다.

$$
\mathbf{z}_t = \sqrt{\alpha_t} \cdot \mathbf{x} + \sqrt{1-\alpha_t} \cdot \epsilon  
$$

$$
\alpha_t = \prod \limits_{s=1}^t 1-\beta_s  
$$