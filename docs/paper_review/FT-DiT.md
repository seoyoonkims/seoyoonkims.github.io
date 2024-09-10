---
title: FT-DiT
layout: default
parent: Paper Review
nav_order: 8
---

### 논문 리뷰  

## QIHOO-T2X: AN EFFICIENCY-FOCUSED DIFFUSION TRANSFORMER VIA PROXY TOKENS FOR TEXT-TO-ANY-TASK  

---

### **1. Introduction**  


---

### **2. Related Work**  


---

### **3. Method**  

**3.1 Redundancy Analysis**  

![Figure 2](../images/FT-DiT/2.png)

위 그림은 Pixart-$\alpha$ 512 resolution의 어텐션 맵이다. 그 중 같은 $4 \times 4$ 윈도우에 속하는 토큰들은 어텐션 맵이 거의 동일한 것을 볼 수 있다. 또한, 공간적으로 가까운 토큰들끼리는 유사도가 다양하지만, 멀어질수록 유사도가 일정해지는 것을 볼 수 있다. 

이러한 Visual Information의 Sparsity와 Redundancy 때문에 Global Attention 매커니즘을 최적화할 필요가 있다. 이 논문에서는 Sparse Attention 전략을 적용해서 각 윈도우마다 추출한 몇 개의 Proxy Tokens끼리 Self-attention을 적용하여 연산의 복잡도를 줄인다.  

**3.2 Architecture of PT-DiT**  

![Figure 3](../images/FT-DiT/3.png)

Latent code $\mathbf{z} \in \mathbb{R}^{C \times F \times H \times W}$가 들어오면 path embedding을 거쳐서 latent tokens $\mathbf{z}_s \in \mathbb{R}^{N \times D}가 된다. 이후 Positional Encoding을 거쳐서 Proxy Token 블록으로 들어가면 Global Information Interaction Module (GIIM)과 Texture Complement Module (TCM) 등을 거치게 된다. GIIM은 sparse하게 글로벌한 Interaction을 조사하고, TCM은 Window Attention이나 Shift-Window Attention을 통해 로컬 디테일을 조사한다.  

**GIIM Module**  




---



