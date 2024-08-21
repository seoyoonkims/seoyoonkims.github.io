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

 - Main IDEA:  
 Computation Unit 마다 begin & end signal을 Cycle Monitor에 연결해서 실제 연산에 사용된 사이클 수를 측정한다. Monitor Top 모듈은 우선순위에 따라 Data를 취합하여 LOG FIFO에 저장했다가 AXI DMA를 통해서 적절한 타이밍에 Host로 전송한다. 온칩 메모리를 줄이기 위해 16개 마다 Transfer 모드가 되며, Transfer 모드에도 Monitor는 작동한다. 따라서 데이터가 모이는 속도보다 Transfer 속도가 빨라야 한다.  

 - 설계 시 어려웠던 점:  
 실제로 합성을 하게 되면 테스트 벤치는 사라지기 때문에 Host에게 전송하기 위해 어떤 루트를 통해 내보내야 할지 감을 잡는게 어려웠다. AXI DMA를 통해서 적절하게 Port를 뚫어줘야 합성 시에 실제 메모리로 데이터를 전송할 수 있다. 또한, 커널 간의 통신도 일반적인 로직으로는 구현이 불가하기 때문에 AXI-Stream이라는 것을 활용해야 했다. 양쪽에 FIFO가 있어서 통신 프로토콜에 따라 Master에서 Slave로의 데이터 전송이 이루어진다.  

 - 구현 시 어려웠던 점:  
 RTL을 구현하기 전에 미리 Computation Unit이 정확하게 어떤 방식으로 Instruction을 받고 연산을 한다음에 Writeback 단계로 넘어가게 되는지 숙지를 하고 코드를 짰어야 하는데, 당연하게 Instruction 당 적어도 한 번의 Writeback은 수행하게 될 것으로 믿고 코드를 짰던 것 같다. LLM에서는 워낙 큰 행렬이나 벡터 연산이 많기 때문에 쪼개진 Input이 여러 번에 걸쳐서 연산된 후 연산기 내부에서 합쳐져서 Writeback 된다는 점을 숙지하지 못했다. Mini-Instruction이 들어와서 Mini-Writeback을 여러번에 걸쳐서 하는 것으로 이해를 했었다. 그래서 나는 INST_VALID인 시점부터 WB_VALID 가 되는 시점까지의 시간을 측정했는데, WB을 안하고 다음 결과를 기다렸다가 WB을 하는 Instruction도 많기 때문에 시간이 계속 밀리는 현상이 발생했다. 당시에는 결과가 전혀 이해가 가지 않아서 오랬동안 원인을 못찾고 있다가 VCS로 LPU 전체 시뮬레이션을 돌리고 웨이브 폼을 보자마자 완전히 잘못된 방향으로 코드를 짜고 있었음을 발견했다. VCS로 커널 안쪽의 모든 DUT를 들여다 볼 수 있다는 걸 더 일찍 깨달았으면 시간을 많이 절약할 수 있었을 것 같다. 또한, 내가 예상했던 것 보다도 훨씬 더 촘촘하게 파이프라인이 되어있어서 INST_BEGIN 부터 INST_END까지의 시간이 아니라 거의 INST_BEGIN 만 가지고 측정해도 무방할 정도였다. 또 한가지 힘들었던 점은 hard coding 되어 있는 Host의 특정 메모리 주소를 넘어가는 곳에 DMA Write을 하자 Segmentation Fault가 발생했다. malloc이 알아서 괜찮은 곳에 할당을 해줄 것으로 예상을 했는데 무슨 문제가 있었던 것 같다. 

- 시간이 더 있었으면:  
16개씩 묶어서 전송을 시키는 것으로 구현을 했는데 이렇게 하니까 마지막에 16개가 모이지 않은 채로 종료가 되면 0~15개의 Instruction의 정보는 알 수가 없게 되었다. DEBUG START 전에 LOG FIFO를 비우는 FSM을 추가해야 할 것 같다. 그리고 위에서 말한 메모리 문제를 해결해서 더 많은 데이터를 얻어서 분석해보고 싶다.  
   

 
---



