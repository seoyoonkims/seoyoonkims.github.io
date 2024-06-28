---
title: Variational Autoencoders
layout: default
parent: Posts
nav_order: 2
---

**Variational Autoencoders**  

1. Latent Variable Models  

Latent variable models는 Pr(x) 대신에 latent variable z를 이용하여 Pr(x,z)를 표현함으로써 Pr(x)를 간접적으로 나타낸다.

$$
Pr(x) = \int Pr(x,z)dz
$$

Conditional probability로 풀어서 작성하면 아래 식처럼 된다.

$$
Pr(x) = \int Pr(x \vert z)Pr(z)dz
$$

Pr(x)가 복잡하면 Pr(x \vert z)와 Pr(z)로 간접적으로 나타내는 것이 상대적으로 간단할 수 있다.  

- Mixture of Gaussians  

$$
Pr(x \vert z = n) = N_x [(\mu)_n, ((\sigma)_n)^2]
$$



