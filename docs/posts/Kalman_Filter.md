---
title: Kalman Filter
layout: default
parent: Posts
nav_order: 4
---

<span style="color:red"> red </span>
<span style="color:#ffd33d"> yellow </span>
<span style="color:blue"> blue </span>
<span style="color:brown"> brown </span>
<span style="color:orange"> orange </span>
<span style="color:green"> green </span>
<span style="color:violet"> violet </span>
<span style="color:yellowgreen"> yellowgreen </span>
<span style="color:blueviolet"> blueviolet </span>
<span style="color:gray"> gray</span>
<span style="color:indigo"> indigo </span>

<span style="background-color:#fff5b1"> 노란형광펜 </span>
<span style="background-color:#FFE6E6"> 빨강형광펜 </span>
<span style="background-color:#E6E6FA"> 보라형광펜 </span>
<span style="background-color:#C0FFFF"> 파랑형광펜 </span>
<span style="background-color:#FFFFF0"> 노란형광펜 </span>
<span style="background-color:#F5F5F5"> 회색형광펜 </span>
<span style="background-color:#DCFFE4"> 초록형광펜 </span>




**Bayes' Filter**  

Prior: $p(x_0)$  
Process model: $p(x_t | x_{t-1}, u_t)$  
Measurement model: $(z_t | x_t)$  

Prediction Step: $p(x_t \vert z_{1:t-1}, u_{1:t}) = \int p(x_t \vert x_{t-1}, u_t) p(x_{t-1} \vert z_{1:t-1}, u_{1:t}) dx_{t-1}$  

Update Step: $p(x_t \vert z_{1:t}, u_{1:t}) = \eta p(z_t \vert x_t) p(x_t \vert z_{1:t-1}, u_{1:t})$


**Assumptions**  
- Prior follows a Gaussian distribution  
$p(x_0) \sim N(\mu _0, \sigma _0)$

- Process model $p(x_t \vert x_{t-1}, u_t)$ is linear with additive Gaussian white noise

$$
x_t = A_t x_{t-1} + B_t u_t + n_t  
n_t \sim N(0, Q_t)
$$

- Measurement model $p(z_t \vert x_t)$ is linear with additive Gaussian white noise

$$
z_t = C_t x_t + v_t  
v_t \sim N(0, R_t)
$$