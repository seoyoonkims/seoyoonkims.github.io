---
title: Work
layout: default
parent: HyperAccel
nav_order: 3
---

## HyperAccel 업무  

---

### **Debian Package & Docker** (7월 1주 ~ 7월 3주)

Debian 계열의 리눅스에서 Software를 배포하고 설치하는데 사용되는 패키지로, HyperDex Runtime Library와 HyperDex Compiler의 Debian Package를 만들어서 성공적으로 설치되는 것까지 확인하였다. Ubuntu 22.04-LTS 환경에서 작업하였다. GitHub로 협업하는 법도 배울 수 있었다.   

![Docker](../images/dockerfile.png)  

Docker Image는 Software가 필요로 하는 모든 dependency, configuration, library, code 등을 포함하는 패키지이다. Dockerfile로 작성 후 이를 build 하면 Image가 생성되고, 이 Image는 Container에서 run 할 수 있다. Docker Image를 사용하면 Software가 어디서든 동일하게 실행되므로 환경 차이로 인한 문제를 줄일 수 있고, Container가 보통 VM보다 가볍기 때문에 빠르게 실행된다.  

Docker Image는 리눅스 커널을 공유하고 Base Image로 Ubuntu, CentOS, Rocky 등을 선택할 수 있다. 따라서 같은 아키텍쳐를 사용하기만 하면 도커 이미지를 OS와 상관없이 run 할 수 있다. 어떤 환경에서도 HyperDex Runtime Library와 HyperDex Compiler를 사용할 수 있도록 Dockerfile을 작성하고 생성된 Docker Container에서 실제로 LPU를 사용해서 TinyLlama를 돌려보았다.  

---

### **LPU Monitoring System** (7월 4주 ~ 8월 4주)  

1. LPU Code Review (7월 4주)  
 8월에 할 LPU Monitoring 업무를 위해 필요한 사전 지식들을 공부했다. 주로 LPU의 Control Flow와 Control Unit, Computation Unit, On-Chip Memory Unit, Off-Chip Memory Unit에 관한 내용이었다. 실제 LPU 코드를 열어주셔서 모듈별로 뜯어보면서 Top View를 이해하려고 노력했고, LPU가 어떻게 RTL 레벨에서 설계되고 구현되는지 연산기 뿐만 아니라 메모리와 통신 부분까지도 자세하게 공부할 수 있었다.  

2. LPU 모니터링 시스템 설계 (8월 1주 ~ 8월 4주)  
 어렵다.............
 
---



