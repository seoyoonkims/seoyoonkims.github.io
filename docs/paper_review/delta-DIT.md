---
title: delta-DiT
layout: default
parent: Paper Review
nav_order: 4
---

## **Diffusion Models**  

---

### **1. Introduction**  

디퓨전 모델은 뛰어난 생성 능력을 가지고 있지만, 반복적으로 노이즈를 제거하는 방식으로 인해 real-time performance가 떨어진다. 따라서 다양한 추론 가속화 프레임워크가 제시되고 있다.  

DiT의 블록 중에서 앞 부분은 이미지의 아웃라인을 잡는 데 중요하고, 뒷 부분은 디테일에 집중한다는 점을 발견하였다. 따라서 샘플링 초기 단계에서 DiT의 뒷 부분을, 나중 단계에서는 DiT의 앞 부분을 Cache하여 가속한다.  

---

### **2. Related Work**  

**Efficient Diffusion Model**  

디퓨전 모델의 real-time performance를 개선하기 위한 노력은 크게 3가지로 구분이 된다.  

- Lightweight a noist estimation network: pruning, quantization, distillation  

- Optimizing the sampling time steps: Efficient ODE solver  

- Jointly optimizing noise estimation networks and time steps: OMS-DPM, LCM (네트워크 Step을 줄임)  

그러나 이전 방법들은 주로 U-Net 기반의 연구였기 때문에 DiT 모델에 초점을 맞춘 솔루션을 제공하는 것이 이 논문의 주제다.  


**Cache Mechanism**  

다시 사용될 데이터를 일시적으로 저장해서 프로세싱 속도를 높이는 기술이다. LLM에서는 KV Cache 기법이 널리 쓰이고 있다.  

디퓨전에서도 Cache에 기반한 추론 가속화 기법들이 존재한다. DeepCache는 U-Net에서 Upsampling을 할 때 Feature Map을 만들어서 비슷한 인접 단계의 계산은 Cache로 대신하여 계산 속도를 높이는 방법을 사용한다. Faster Diffusion은 U-Net의 인코더와 Skip Connection 사이의 Feature Map을 캐싱하여 인접 단계에서 속도를 높인다. TGATE는 Cross-Attention의 Feature Map을 캐싱하여 Sampling 후반 단계를 가속화한다.  

그러나 DiT는 방향성이 없기 때문에 위의 방법들을 적용하면 정보를 잃어버릴 수 있고, 세밀한 모듈만을 캐싱하는 TGATE의 경우 가속화가 제한적이다. 따라서 Feature Offset을 Caching 하는 $\Delta$-Cache를 제안한다.  

---

### **3. Preliminary**  

자세한 설명은 Diffusion Models 포스트를 참고하면 될 것 같다.  


**Noise Diffusion State**  

핵심은 첨가된 노이즈를 예측하는 방향으로 학습이 진행된다는 것이다.  

$$
\mathcal{L}(\theta) = \mathbb{E}_{t, x_0 \sim q(x), \epsilon \sim \mathcal{N}(0,1)} 
\left[ \left\| \epsilon - \epsilon_\theta \left( \sqrt{\bar{\alpha}_t} x_0 + \sqrt{1 - \bar{\alpha}_t} \epsilon, t \right) \right\|^2 \right]
$$

$$\epsilon_\theta(x_t)$$는 $$f_{N_b} \left( f_{N_b-1} \left( \cdots f_1(x_t) \right) \right) = f_{N_b} \circ f_{N_b-1} \circ \cdots \circ f_1(x_t) = F_1^{N_b}(x_t)$$로 표현된다. $$f_n$$은 DiT의 $n-th$ 블록을 나타낸다. 주로 $N_b$는 28이다. 


**Denoising Stage**  

이 단계는 노이즈로부터 이미지를 생성하며, 이 논문에서 가속하려고 하는 부분이다.  

$$
x_{t-1} = \frac{1}{\sqrt{\alpha_t}} \left( x_t - \frac{\beta_t}{\sqrt{1 - \bar{\alpha}_t}} \epsilon_\theta(x_t, t) \right) + \sigma_t z
$$

많은 시나리오에서 $\epsilon_\theta(x_t, t, c)$를 사용한다. $c$는 Conditional control information으로 클래스나 텍스트의 임베딩으로 생각하면 된다.  

---

### **4. Stage-adaptive Inference Acceleration for Diffusion Transformers**  

**4.1 Tailored Cache Method for DiT**  
Feature을 재사용 하는 것은 training-free inference acceleration에서 중요한 전략이다.  

**Challenges**  

![2](../images/Delta-DiT/2.png)

**Faster Diffusion**는 U-Net 아키텍쳐의 D1-D3 모듈의 **Output**을 캐싱하여 재사용한다. 다음 단계에서 D1-D3 모듈의 재계산을 생략할 수 있지만 $x_{t-1}$에 해당하는 정보를 잃어버리기 때문에 샘플링 단계 간의 연속적인 정보 흐름이 끊기고 결과적으로 성능이 떨어질 수 있다.

**DeepCache**는 5 위치에서 Output Feature Map을 캐싱하여 D2, D3, M, U3, U2의 계산을 생략한다. D1에서 U1으로 이어지는 경로를 통해 $x_{t-1}$의 정보가 유지되므로 Faster Diffusion보다 많은 정보를 보존한다.

**TGATE**는 D1-D3 및 U1-U3 내 Cross-Attention 모듈의 Output Feature Map를 세밀하게 캐싱하여 가속화가 제한적이다.  
  

**Method**  
$\Delta$-Cache는 Output Feature Map 간의 차이를 캐싱한다. 오른쪽 그림을 보면 7의 Output을 캐싱하는 대신 6과 7의 Output의 차이를 캐싱하고, 다음 단계에서 input에 그 차이값을 더해준다. 이를 통해 다음 단계의 B1-B3 계산을 생략하면서도, $x_{t-1}$의 정보를 $\Delta$를 통해 반영할 수 있다.  

따라서, DiT 블록의 정보 손실 문제를 해결하고 앞, 뒤, 중간 블록을 선택적으로 생략할 수 있어서 큰 유연성을 제공한다. 또한, 각 블록의 Output Feature Map의 스케일이 일정한 DiT에 적합하여 $\Delta$ 계산을 가능하게 한다.  


**4.2 Effect of DiT Blocks on Generation**  

DiT 블록의 Front, Middle, Back 부분을 Caching 한 결과를 비교한 것이다. (DiT는 MSA, MCA, FF로 나뉘는데 이것을 말하는 것 같다.)  

![3](../images/Delta-DiT/3.png)



