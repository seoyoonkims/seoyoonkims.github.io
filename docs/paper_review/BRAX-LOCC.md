---
title: BRAX-LOCC
layout: default
parent: Paper Review
nav_order: 15
---

### 논문 리뷰

## Local object crop collision network for efficient simulation of non-convex objects in GPU-based simulators  

by Dongwon Son (KAIST), Beomjun Kim (KAIST)  

---

### **Introduction**  

GPU 기반 시뮬레이터는 수천 개의 환경을 병렬로 시뮬레이션할 수 있기 때문에 CPU 기반보다 빅데이터 생성 속도가 매우 빠르다. 하지만 현재의 GPU 기반 시뮬레이터인 IssacGym과 Brax는 Non-Convex 객체를 처리할 때 속도나 정확성, 일반성 면에서 한계가 있다. 또한, GJK 같은 기존의 CD 알고리즘은 Non-Convex 객체의 충돌을 처리할 때 Computation이 크게 증가한다. Convex Hull 같은 근사는 속도는 유지하지만, 정확도가 크게 떨어진다.  

본 논문은 LOCC 라는 새로운 CD 알고리즘을 제안한다. 데이터 기반 접근법을 사용하여, 정확도가 온라인이 아닌 오프라인에서의 데이터 품질에 따라 결정된다. 특히, 객체의 Global Shape이 아닌 충돌 지점의 Local Crop 부분만 학습해서 효율적이다. LOCC는 기존 알고리즘보다 Non-Convex 시뮬레이션에서 정확도를 유지하면서 5-10배 더 빠른 속도를 자랑한다.  

### **Related Works**  

**Collision detection using a Neural Network**  

최근에 NN을 활용해서 Shape을 나타내는 연구가 제안되었다. 주로 Query Point가 두 물체에 모두 속하면 Collision이라고 Detect 하는 방식인데, 이러한 접근은 Query Point 개수에 따라 정확도가 높아지는 것이므로, 아주 많은 Query Point 개수를 요구한다. 그리고 물체의 모양을 Explicit 하게 복원하는 것은 CD에서 불필요하다.  

데이터의 효율성과 속도를 높이기 위해 물체의 Point Cloud와 Pose, 그리고 Scene의 Point Cloud가 주어졌을 때, 물체와 Scene이 충돌하는지를 판단하는 방법을 제안하기도 하였다. 지금까지 방법들은 전체 Scene과 물체의 Representation을 학습해야 해서 비효율적이었다.  

기존 방식과 달리, LOCC는 충돌 부분만 Local Crop 해서 학습함으로써 데이터 효율성을 크게 개선한다. 이는 특히 Motion Planning 보다 Contact Resolution이 필요한 Physics Simulation에 적합하다.  


**Collision resolution using an OCN(Object Collision Net)**  

Contact Resolution의 목표는 충돌이 일어났을 때 Penetration이 아니라 Contact를 해결해서 물리 법칙이 적용되는 방향으로 움직이게 하는 것이다. 

이를 위해서는 Contact Points와 Contact Forces가 필요하다. Contact Points를 찾기 위해서는 OCN을 이용해서 어떤 Object Pose가 충돌을 일으키는지 탐지한다. 그 다음, 물체의 질량 중심에 작용하는 힘이랑 토크를 OCN의 그래디언트를 이용해서 계산한다. OCN의 그래디언트의 방향이 충돌을 해소하는 방향이라는 Intuition이 활용되었다. 이후 Point Isolation 기법으로 Contact Points를 탐지한 후, 경로 최적화를 통해 Contact Constraints를 만족하도록 충돌을 해결한다. 그러나 이런 연구들은 나사 조이기 같은 특정 작업에서만 효과적이었다.  

**Analytical collision detection methods and their usage in GPUs**  

**GJK (Gilbert-Johnson-Keerthi)**: 대표적인 Collision Detection Algorithm으로, Convex Object에 대해 빠르게 작동한다. Non-Convex 일 경우 Convex Decomposition이 필요하기 때문에 Computation Cost가 크게 증가한다. GPU에서 If문 때문에 효율적이지 않다.  

**SAT(Seperate Axis Theorem)**: Convex Object를 다양한 축에 투영시켜서 겹치는지 확인한다. GPU에서 효율적으로 구현할 수 있지만, 복잡한 Non-Convex를 처리하는 데 한계가 있다.  

**LOCC**는 기존의 GJK나 SAT 처럼 Convex Decomposition 없이 NN 기반으로 단순한 Feed Forward 계산을 통해 충돌을 예측한다. Non-Convex Object를 처리할 때 속도와 정확성, 일반성 면에서 뛰어나다.  


### LOCAL OBJECT CROP COLLISION NETWORK  

![1](../images/BRAX-LOCC.png)



---
용어 정리:  

1. AABB는 Axis-Aligned Bounding Box의 약자로, 3D 공간에서 객체를 감싸는 최소 크기의 축 정렬된 직육면체를 의미한다.  
2. OBB는 Oriented Bounding Box의 약자로, 3D 공간에서 객체를 감싸는 회전 가능한 직육면체를 의미한다. AABB와 유사하지만, 객체의 방향에 맞게 자유롭게 회전할 수 있다.  

