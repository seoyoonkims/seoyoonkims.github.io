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

### **2. Related Work**  



