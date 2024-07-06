---
title: Kalman Filter
layout: default
parent: Posts
nav_order: 4
---


**Bayes' Filter**  

Prior: $p(x_0)$  
Process model: $p(x_t | x_t-1, u_t)$  
Measurement model: $(z_t | x_t)$  

Prediction Step: $p(x_t | z_1:t-1, u_1:t) = \int p(x_t | x_t-1, u_t) p(x_t-1 | z_1:t-1, u_1:t) dx_t-1$  

