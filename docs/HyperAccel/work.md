---
title: Work
layout: default
parent: HyperAccel
nav_order: 3
---

## HyperAccel 업무  

Research Intern (2024.06.23 ~ 2024.08.30)  

---

**<DFX Paper Review (1주차)>**  
DFX 논문 리뷰를 통해 향후 회사 업무를 진행하는데 필요한 사전 지식을 습득하였다. 이 논문은 트랜스포머 기반의 텍스트 생성 모델을 가속하기 위한 Low-latency Multi-FPGA에 관한 내용으로, 실제로 회사에서 개발한 LPU 칩의 핵심 내용을 담고 있다. 

**<Linux Packaging (2-4주차)>**   
CI/CD의 일환으로 Linux Packaging을 통해 회사의 라이브러리를 손 쉽게 배포할 수 있도록 Debian Package 및 Docker Image를 만들었다. LPU로 LLM 모델들을 가동시키기 위해서는 하드웨어뿐만 아니라 소프트웨어 스택들도 필요하다. 이들은 환경의 영향을 많이 받기 때문에 여러 Dependency와 File Structure, Environment Variables 등을 종합적으로 고려한 설치 패키지를 OS별로 만들고 배포해야 User가 간편하게 사용할 수 있다. 패키징과 이미지 빌드를 완료하면 모든 것이 셋팅 되어 있는 Docker Image가 생성되고 LPU를 사용할 수 있다. Ubuntu 22.04-LTS 환경에서 작업하였으며 cmake, dpkg, git 등 다양한 소프트웨어 tool과도 친해질 수 있었다. 

**<LPU Code Review (5주차)>**  
LPU 코드 리뷰를 통해 실제 LPU의 구조와 구현 방법에 대해 배우고, LLM 특화 반도체가 요구하는 하드웨어의 특성과 설계 과정을 이해할 수 있었다. Control Flow, Control Unit, Computation Unit, On-chip Memory Unit, Off-chip Memory Access Unit 등을 차례로 공부하면서 Top View 측면에서 많은 깨달음을 얻었다. 

**<LPU Monitoring System (6-10주차)>**  
FPGA 하드웨어에서 Compute Unit 별 Utilization을 측정하는 Monitoring System을 설계 및 구현하고, VCS 시뮬레이션과 VITIS 합성을 통해 결과를 분석하였다. Instruction이 호스트 PC에서부터  Compute Unit까지 도달하는 과정과 연산 후에 Compute Unit에서 다시 Memory로 되돌아가는 전체 과정을 이해해야 Monitoring 모듈을 어디에 배치해야 효율적이고 Legacy 코드들을 가장 적게 건드릴 수 있는지 감을 잡을 수 있기 때문에 큰 그림을 이해하려고 노력했다. 실제 설계에서는 Kernel 간 통신이나  Host와의 통신도 고려해야 하기 때문에 AXI 프로토콜 관련 개념과 모듈을 이해하는 데에도 많은 노력을 기울였다. 결론적으로 Kernel 간 통신은 AXI-Stream, Host와의 통신은 AXI DMA로 구현하였다. 시뮬레이션 뿐만 아니라 실제 합성을 통해 Bitstream으로 FPGA에서 작동시킬 수 있는 수준까지 만들어야 했기 때문에 System Verilog로 RTL을 설계할 때부터 모듈별로 최대한 간결하게 하드웨어 친화적으로 짜는 법도 배울 수 있었다. 

**<Paper Seminar(1-9주차)>**  
LLM 및 하드웨어 가속기에 관한 최신 논문들로 매주 진행되는 논문 세미나에 참여하였다. 나는 LLM Quantization을 효과적으로 구현하기 위한 Software-Hardware Co-design 관련 논문인 Tender를 읽고 세미나에서 발표하였다. 이외 진행된 논문으로는 QLLM, NeuPIMs, TCP, Posit, Flash-attention2,  MECLA 등이 있다. 


 
---



