---
title: Variational Autoencoders
layout: default
parent: Posts
nav_order: 3
---

**Variational Autoencoders**  

**1. Latent Variable Models**  

Latent variable models는 $Pr(\mathbf{x})$ 대신에 latent variable $\mathbf{z}$를 이용하여 $Pr(\mathbf{x}, \mathbf{z})$ 를 표현함으로써 $Pr(\mathbf{x})$ 를 간접적으로 나타낸다.

$$
Pr(\mathbf{x}) = \int Pr(\mathbf{x} ,\mathbf{z})d\mathbf{z}
$$

Conditional probability로 풀어서 작성하면 아래 식처럼 된다.

$$
Pr(\mathbf{x}) = \int Pr(\mathbf{x} \vert \mathbf{z})Pr(\mathbf{z})d\mathbf{z}
$$

$Pr(\mathbf{x})$가 복잡하면 $Pr(\mathbf{x} \vert \mathbf{z})$ 와 $Pr(\mathbf{z})$ 로 간접적으로 나타내는 것이 상대적으로 간단할 수 있다.  

**Mixture of Gaussians**  

$$
Pr(z = n) = \lambda _n  
$$

$$
Pr(x \vert z = n) = N_x [\mu _n, {\sigma _n}^2]  
$$

잠재변수 $z$는 discrete 하게 주어지는 값이므로 가능한 값들을 모두 더해서 marginalize 할 수 있다. 주어진 $z$ 값에 따라 $x$의 분포는 평균이 $\mu _n$이고 분산이 $(\sigma _n)^2$인 정규분포를 따른다. 

$$
Pr(x) = \sum\limits_{i=1}^N Pr(x, z=n)  
$$

$$
= \sum\limits_{i=1}^N Pr(x \vert z=n) \cdot Pr(z=n) = \sum\limits_{i=1}^N \lambda_n \cdot N_x [\mu _n, {\sigma _n}^2]  
$$

이를 통해 복잡한 multi-modal 확률 분포를 간단한 likelihood와 prior로 나타낼 수 있다.  

---

**2. Nonlinear Latent Variable Model**  

Nonlinear latent variable model에서는 data $\mathbf{x}$ 와 latent variable $\mathbf{z}$ 모두 continuous 이고 multivariate이다. 

$$
Pr(\mathbf{z}) = N_\mathbf{z}[\mathbf{0}, \mathbf{I}]  
$$

$$
Pr(\mathbf{x} \vert \mathbf{z}, \mathbf{\phi}) = N_\mathbf{x} [\mathbf{f}[\mathbf{z}, \mathbf{\phi}], \sigma^2 \mathbf{I}]  
$$

$\mathbf{f}[\mathbf{z}, \boldsymbol{\phi}]$ 은 deep network parameter $\boldsymbol{\phi}$ 로 표현되고, 데이터의 중요한 특징을 설명한다. 나머지 설명되지 않는 부분들은 노이즈$\sigma^2 \mathbf{I}$에 포함된다.  


잠재 변수 $\mathbf{z}$ 에 대해 marginalizing 하면 $Pr(\mathbf{x} \vert \boldsymbol{\phi})$ 를 얻을 수 있다.

$$
Pr(\mathbf{x} \vert \boldsymbol{\phi}) = \int Pr(\mathbf{x} \vert \mathbf{z}, \boldsymbol{\phi}) \cdot Pr(\mathbf{z}) d\mathbf{z}
= \int N_\mathbf{x} [\mathbf{f}[\mathbf{z}, \mathbf{\phi}], \boldsymbol{\sigma}^2\mathbf{I}] \cdot N_\mathbf{z} [0, \mathbf{I} d\mathbf{z}]
$$

- Generation  

Ancestral sampling으로

Figure 17.3  

---

3. Training  








---

모든 분포는 가우시안의 합으로 나타낼 수 있어서 z 값에 따른 여러가지 단일 가우시안 분포로 나타내서 simplify 하는 듯.
