---
title: Variational Autoencoders
layout: default
parent: Posts
nav_order: 2
---

**Variational Autoencoders**  

1. Latent Variable Models  

Latent variable models는 $Pr(x)$ 대신에 latent variable z를 이용하여 $Pr(x,z)$ 를 표현함으로써 $Pr(x)$ 를 간접적으로 나타낸다.

$$
Pr(x) = \int Pr(x,z)dz
$$

Conditional probability로 풀어서 작성하면 아래 식처럼 된다.

$$
Pr(x) = \int Pr(x \vert z)Pr(z)dz
$$

$Pr(x)$가 복잡하면 $Pr(x \vert z)$ 와 $Pr(z)$ 로 간접적으로 나타내는 것이 상대적으로 간단할 수 있다.  

- Mixture of Gaussians  

$$
Pr(x \vert z = n) = N_x [\mu _n, (\sigma _n)^2]
$$

잠재변수 z는 discrete 하게 주어지는 값이고, 주어진 z 값에 따라 x의 분포는 평균이 $\mu _n$이고 분산이 $(\sigma _n)^2$인 정규분포를 따른다. 

$$
Pr(x) = \sum\limits_{i=1}^N Pr(x, z=n) = \sum\limits_{i=1}^N Pr(x \vert z=n) \dot Pr(z=n)
$$


2. Nonlinear Latent Variable Model  

데이터 $\mathbf{x}$ 와 잠재 변수 $\mathbf{z}$ 모두 multivariate가 되어 벡터로 표현된다.
$Pr(\mathbf{z})$ 는 표준 정규분포를 따른다.  

$$
Pr(\mathbf{z}) = N_\mathbf{z}[\mathbf{0}, \mathbf{I}]
$$

$Pr(\mathbf{x} \vert \mathbf{z}, \mathbf{\phi})$ 는 평균이 $f[\mathbf{z}, \mathbf{\phi}]$ 이고, 공분산이 $\mathbf{\sigma ^2}\mathbf{I}$ 인 정규분포를 따른다. 


$$
Pr(\mathbf{x} \vert \mathbf{z}, \mathbf{\phi}) = N_\mathbf{x} [\mathbf{f}[\mathbf{z}, \mathbf{\phi}], \mathbf{\sigma ^2}\mathbf{I}]
$$

$\mathbf{f}[\mathbf{z}, \mathbf{\phi}]$ 은 deep network parameter $\mathbf{\phi}$ 로 표현되고, 데이터의 중요한 특징을 설명한다. 나머지 설명되지 않는 부분들은 노이즈에 포함된다.  


잠재 변수 $\mathbf{z}$ 에 대해 marginalizing 하면 $Pr(\mathbf{x} \vert \mathbf{\phi})$ 를 얻을 수 있다.

$$
Pr(\mathbf{x} \vert \mathbf{\phi}) = \int Pr(\mathbf{x} \vert \mathbf{z}, \mathbf{\phi}) \dot Pr(\mathbf{z}) d\mathbf{z}
= \int N_\mathbf{x} [\mathbf{f}[\mathbf{z}, \mathbf{\phi}], \mathbf{\sigma ^2}\mathbf{I}] \dot N_\mathbf{z} [0, \mathbf{I} d\mathbf{z}]
$$

- Generation  

Ancestral sampling으로 $\mathbf{x}^{*}$ 를 그릴 수 있다. $Pr(\mathbf{z})$ 로부터 $\mathbf{z}^{*}$ 를 그리고 $Pr(\mathbf{x} \vert \mathbf{z}^{*}, \mathbf{\phi})$ 를 구한 후 $ Pr(\mathbf{x} \vert \mathbf{\phi})$ 를 구하면 된다.  

Figure 17.3  


3. Training  








---

모든 분포는 가우시안의 합으로 나타낼 수 있어서 z 값에 따른 여러가지 단일 가우시안 분포로 나타내서 simplify 하는 듯.
