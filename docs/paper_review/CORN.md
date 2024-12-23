---
title: CORN
layout: default
parent: Paper Review
nav_order: 10
---

### 논문 리뷰  

## CORN: CONTACT-BASED OBJECT REPRESENTATION FOR NONPREHENSILE MANIPULATION OF GENERAL UNSEEN OBJECTS

---

### **1. Introduction**  

로봇 매니퓰레이터는 제한된 동작으로 인해 자연 환경에서 Pick and Place가 불가능한 상황이 존재한다. 이에 Pick and Place 보다 효과적인 비접촉(nonprehensile) 동작을 수행해야 한다.  

최근에는 심층 강화학습 (Deep RL)이 대안으로 떠오르는데, 비접촉 방법으로 시뮬레이터로 학습한 후, 이를 제로샷으로 현실에 적용하는 것이다. 그러나 기존 알고리즘 중 어떤 것도 일반화 능력이나 동작의 다양성을 동시에 제공한 사례가 없다.  

이 논문에서는 Nonprehensile Manipulation을 위한 새로운 객체 표현 학습 알고리즘을 제안한다. 이전 논문에서 제안된 Action Space와 함께 이 알고리즘을 사용하여 물체 형태에 대한 일반화와 동작의 다양성을 모두 제공한다. Pretraining에는 SSL (Contrastive Learning or Shape Reconstruction)를 사용한다. 복잡한 물체라고 해도 그리퍼와 닿는 부분만 상호작용 하기 때문에 접촉 가능한 부분은 높은 정확도로 표현하고, 나머지 부분은 생략한다.  

Nonprehensile Manipulation에서 로봇 손과 물체의 접촉 유무와 위치를 인식하는 것이 중요하기 때문에 Point Cloud 인코더가 물체의 어느 부분과 로봇의 End Effector가 충돌하는지 예측하도록 Pretrain 한다. 또한, Point Cloud를 효율적으로 인코딩하기 위해 패치 기반 트랜스포머를 활용한다. 계산 시에 로드를 줄이기 위해 여러 점들을 하나의 패치로 그룹화하는 것이다. 





