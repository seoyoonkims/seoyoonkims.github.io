---
title: ToMe
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

ViT 모듈에 Token Merging Module을 넣어서 학습 없이 불필요한 토큰들을 합치고 Throughput을 높이는 것이 본 연구의 목표이다.  

**Strategy**  

트랜스포머의 각 블록마다 토큰을 병합해서 r개씩 줄인다. r은 비율이 아니라 고정된 토큰의 개수를 의미한다. 블록의 개수가 L개라면 총 rL개의 토큰을 병합하게 된다.  

r은 Speed-accuracy trade-off를 제공한다. 토큰을 많이 병합할수록 정확도는 떨어지지만 throughput은 높아지기 때문이다. 중요한 것은 인풋 이미지와 상관없이 토큰 개수를 줄인다는 점이다. 몇몇 Pruning 기법처럼 토큰 개수가 dynamic 하게 변하면 정확도는 올라갈 수 있지만 구현하는 것이 impractical 하고, Batching을 어렵게 한다.  
  

**Token Similarity**  

토큰의 유사도를 측정할 때 그들의 feature 간의 거리가 작을수록 유사하다고 판별할 수 있지만, 트랜스포머에서 그들은 overparameterized 되어 있어서 중요하지 않은 노이즈를 포함할 가능성이 있다.  

운이 좋게도 트랜스포머는 셀프 어텐션 레이어를 포함하고 있다. 구체적으로, Key는 이미 각 토큰 간의 유사도를 나타내고 있으므로 여기서 계산된 Cosine Similarity를 이용하면 된다.  
  

**Bipartite Soft Matching**  

토큰을 r개 만큼 줄이는 작업을 L번 (블록 개수만큼) 반복해야 하기 때문에 런타임이 아주 짧아야 한다. 기존의 kmeans clustering이나 graph cuts 같은 방법은 그렇지 않다.  

이 논문의 솔루션은 다음과 같다. 일단 병렬 처리가 불가능한 방법을 피하면서 Merging을 점진적으로 할 수 있는 방법을 찾았다.  

![Figure 1](../images/ToMe/1.png)

1. 토큰을 비슷한 개수의 집합 A와 B로 나눈다.  
2. A에 있는 토큰마다 B에 있는 토큰 중 가장 유사한 토큰을 edge로 연결한다.  
3. 유사도가 가장 높은 r개의 edge만 남긴다. 
4. 연결된 토큰들을 하나로 합친다. (By Averaging Features)
5. 두 집합을 Concatenate 한다.  

이 방법은 토큰을 랜덤하게 없애는 것과 거의 속도 차이가 없고 코드 몇 줄로 구현할 수 있다.  
  
  
**Tracking Token Size**  

