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

GPU 기반 시뮬레이터는 CPU 기반보다 수천 개의 환경을 병렬로 시뮬레이션할 수 있어, 빅데이터 생성 속도가 매우 빠르다. 현재의 GPU 기반 시뮬레이터인 IssacGym과 Brax는 Non-Convex 객체를 처리할 때 속도나 정확성, 일반성 면에서 한계가 있다. 또한, 기존의 CD 알고리즘 (GJK 등)은 Non-Convex 객체의 충돌을 처리할 때 Computation이 크게 증가한다. Convex Hull 같은 근사는 속도는 유지하지만, 정확도가 크게 떨어진다.  

본 논문은 LOCC 라는 새로운 CD 알고리즘을 제안한다. 데이터 기반 접근법을 사용하여, 정확도가 온라인이 아닌 오프라인에서의 데이터 품질에 따라 결정된다. 특히, 객체의 Global Shape이 아닌 충돌 지점의 Local Crop 부분만 학습해서 효율적이다. LOCC는 기존 알고리즘보다 Non-Convex 시뮬레이션에서 정확도를 유지하면서 5-10배 더 빠른 속도를 자랑한다.  


---
용어 정리:  

1. AABB는 Axis-Aligned Bounding Box의 약자로, 3D 공간에서 객체를 감싸는 최소 크기의 축 정렬된 직육면체를 의미한다.  
2. OBB는 Oriented Bounding Box의 약자로, 3D 공간에서 객체를 감싸는 회전 가능한 직육면체를 의미한다. AABB와 유사하지만, 객체의 방향에 맞게 자유롭게 회전할 수 있다.  

