---
title: Seminar
layout: default
parent: HyperAccel
nav_order: 1
---

**1. 2024/6/28**  
### **QLLM: Accurate and Efficient Low-Bitwidth Quantization for Large Language Models**  

Main Idea:

1. Adaptive Channel Reassembly  

LLM은 두 개의 코어 파트가 있는데, 멀티헤드 셀프 어텐션과 FFN이다. 이들은 주로 Linear layers로 구성되어 있으며 다음과 같이 표현된다.  

$$
\mathbf{y_k} = \sum_{i=1}^M \mathbf{x_iW_{ik}}
$$

M 번째 채널에 아웃라이어가 존재한다고 하면 해당 채널을 T개로 쪼갤 수 있다. 하나의 큰 Activation 값을 여러 개의 작은 값들로 표현하는 것이다.

$$
\mathbf{y_k} = \sum_{i=1}^M \mathbf{x_iW_{ik}} + \frac {\mathbf{x_M}}{T}\mathbf{W_Mk} + \cdots + \frac {\mathbf{x_M}}{T}\mathbf{W_Mk}
$$

$$
T = \floor*max(\vert \mathbf{x_M}/\theta)
$$



