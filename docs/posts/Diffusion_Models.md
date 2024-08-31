---
title: Diffusion Models
layout: default
parent: Posts
nav_order: 4
---

## **Diffusion Models**  

---

**Overview**  

Diffusion Model은 Encoder와 Decoder로 구성된다. Encoder는 Prespecified인 과정이고, Decoder가 Learnable한 과정이다. 

![18.1](../images/Diffusion/18.1.png)  

Encoder(Forward, Diffusion Process)는 $\mathbf{x}$를 latent variable인 $\mathbf{z}_1, \mathbf{z}_2, ... , \mathbf{z}_T$에 Mapping 한다. White Noise를 첨가하는 과정이라고 보면 된다. 충분히 반복하면 $q(\mathbf{z}_T \vert \mathbf{x})$와 $q(\mathbf{z}_T)$가 Standard Normal Distribution이 되고, Noise만 남은 상태가 된다.  

Decoder(Backward, Reverse Process)는 학습 가능한 네트워크로 Encoder의 역과정이다. Noise가 점차 제거되면서 데이터 샘플을 생성한다. 


---

**Encoder (Forward Process)**  

$$
\mathbf{z}_1 = \sqrt{1-\beta_1 \cdot \mathbf{x}} + \sqrt{\beta_1} \cdot \epsilon_1  
$$
$$
\mathbf{z}_t = \sqrt{1-\beta_t \cdot \mathbf{z}_{t-1}} + \sqrt{\beta_t} \cdot \epsilon_t  
$$

$\epsilon_t$는 Standard Normal Distribution에서 나온 Noise이다. $\beta_t \in [0, 1]$는 noise schdule을 위한 hyperparameter로, 노이즈가 섞이는 속도를 결정한다.  

![18.2](../images/Diffusion/18.2.png)

결국은 위 그림처럼 $x$는 0에 수렴하고, $q(z_t \vert x)$는 mean이 0인 정규분포에 가까워진다. 

$$
q(\mathbf{z}_1 \vert \mathbf{x}) = Norm_{\mathbf{z}_1} \left[ \sqrt{1-\beta_1}\mathbf{x}, \beta_1 \mathbf{I} \right]
$$
$$
q(\mathbf{z}_t \vert \mathbf{z}_{t-1}) = Norm_{\mathbf{z}_1} \left[ \sqrt{1-\beta_t}\mathbf{z}_{t-1}, \beta_t \mathbf{I} \right]
$$
