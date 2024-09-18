---
title: Kalman Filter
layout: default
parent: Posts
nav_order: 5
---


## 칼만 필터

#### 뉴욕대학교 Giuseppe Loianno 교수님의 ROB-UY3303 Robot Motion and Planning 강의 자료를 기반으로 작성되었음  

---

**칼만 필터**는 루돌프 칼만이 개발한 제어 알고리즘으로, 노이즈가 포함된 관측값을 바탕으로 선형 시스템의 상태를 추정하는 재귀 필터이다.  

칼만 필터를 완전히 이해하기 위해서는 Bayes' Filter와 Gaussian Random Variable에 대해 먼저 공부할 필요가 있기 때문에 이를 포함하여 3장으로 구성하였다.  

---

### **I. Bayes' Filter**  
  
**Markov Property**  

$$
p(x_{t+1} \vert x_{0:t}) = p(x_{t+1} \vert x_t)  
$$

즉, 해당 시점에서 미래를 예측하는데 필요한 정보들만 갖고 있으면 완전한 상태가 된다. 과거의 정보나 독립적인 정보들은 필요하지 않다. 


![Control](../images/KalmanFilter/control.png)

제어 시스템은 Move, Predict, Sense, Update의 반복이라고 볼 수 있다. 물체가 움직이면 불확실성이 커지고, 현재 상태와 이전 관측값을 토대로 다음 상태를 예측한다. 센서를 이용해서 관측값을 얻으면 불확실성을 없애는 방향으로 업데이트를 진행한다.

![Markov](../images/KalmanFilter/markov.png)

위 그림에서 Markov Assumtion을 적용하면 모델을 간단하게 나타낼 수 있다. $x_t$는 현재 상태, $u_t$는 제어 입력, $z_t$는 관측 값을 나타낸다.  

**Prior**  

$$
p(x_0)  
$$  

초기 상태에 대한 사전 확률 분포를 나타낸다. 즉, 로봇이 처음 시작한 위치를 특정 범위 내 위치에 존재할 확률로 나타낸다. 

**Process model**  

$$
p(x_t \vert x_{t-1}, u_t)  
$$

시간 t에서의 상태 $x_t$가 이전 상태 $x_{t-1}$과 제어 입력 $u_t$에 의해 결정된다는 것을 나타낸다. 로봇이 이전 위치에서 얼마나 움직였는지에 따라 새로운 위치를 추정하는 것이다. 하지만 그 움직임에는 불확실성이 포함될 수 있기 때문에 확률로 표현한다. 

**Measurement model**  

$$
p(z_t \vert x_t)  
$$  

시간 t에서의 측정값 $z_t$는 현재 상태 $x_t$에 의해 결정된다. 센서에 노이즈가 포함되기 때문에 확률로 표현한다. 로봇이 카메라를 이용해 자신의 위치를 측정하면, 현재 상태에서 측정된 데이터와 실제 상태의 관계를 설명하는 것이다.  


**Prediction Step**   

$$
p(x_t \vert z_{1:t-1}, u_{1:t}) = \int p(x_t \vert x_{t-1}, u_t) p(x_{t-1} \vert z_{1:t-1}, u_{1:t}) dx_{t-1}  
$$  

**Update Step**  
 
$$
p(x_t \vert z_{1:t}, u_{1:t}) = \eta p(z_t \vert x_t) p(x_t \vert z_{1:t-1}, u_{1:t})  
$$

$\eta$ 는 marginal distribution 이다.  


**3. Assumptions**  
- Prior follows a Gaussian distribution  
$p(x_0) \sim N(\mu _0, \sigma _0)$

- Process model $p(x_t \vert x_{t-1}, u_t)$ is linear with additive Gaussian white noise

$$
x_t = A_t x_{t-1} + B_t u_t + n_t  
$$
$$
n_t \sim N(0, Q_t)
$$

- Measurement model $p(z_t \vert x_t)$ is linear with additive Gaussian white noise

$$
z_t = C_t x_t + v_t  
$$
$$
v_t \sim N(0, R_t)
$$

