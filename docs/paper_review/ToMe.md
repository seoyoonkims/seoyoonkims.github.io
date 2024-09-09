---
title: Token Merging
layout: default
parent: Paper Review
nav_order: 7
---

### 논문 리뷰  

## TOKEN MERGING: YOUR VIT BUT FASTER

---

### **1. Introduction**  

거대 모델을 작동시킬 때 속도를 높이기 위해 Pruning 기법이 사용되고 있지만, Pruning은 정보를 소실시키기 때문에 줄일 수 있는 토큰 개수에 제한이 있다.  

이 논문에서는 토큰을 Prune 하는 대신 Combine 하는 방법인 Token Merging(ToMe)을 제시한다. 이 방법은 Custom Matching 알고리즘 덕분에 Pruning 보다 속도가 빠르고 더 정확하다. 또한, 이 기법은 학습의 유무와 상관없이 잘 작동한다.  

---

### **2. Related Work**  

**Efficient Transformers**: NLP와 컴퓨터 비전 분야에서 트랜스포머의 효율을 높이려는 연구가 많다. 주로 Fast-attention, Pruning, Domain Specific Module 등을 추가하여 성능을 향상시킨다.  

**Token Reduction**: 트랜스포머는 토큰 개수와 상관없이 잘 작동하기 때문에 NLP와 비전 트랜스포머에서 불필요한 토큰을 Pruning 하는 방법이 등장했다. 이러한 방법들은 재학습을 요구하지만, ToMe는 학습이 없어도 된다. 게다가 Pruning 방법은 dynamic 해서 토큰의 개수가 이미지나 문장마다 바뀌기 때문에 서로 다른 인풋을 Batch 처리할 수가 없다. 


**Combininb Tokens**: 대부분의 토큰 병합 방법들은 추가적인 학습을 요구하거나 비효율적인 방법(k-means clustering)을 사용한다. ToMe는 최소한의 연산 비용으로 토큰을 병합하고 기존의 방법들보다 합리적인 Speed-Accuracy Trade-off를 제공한다.  

---

### **Token Merging**  



