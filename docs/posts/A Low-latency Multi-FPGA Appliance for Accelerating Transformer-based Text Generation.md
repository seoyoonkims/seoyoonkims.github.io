---
title: DFX 논문
layout: default
parent: Posts
nav_order: 2
---

## DFX: A Low-latency Multi-FPGA Appliance for Accelerating Transformer-based Text Generation
---

### Abstract  

트랜스포머(Transformer)는 데이터 센터에서 자연어 처리(NLP)를 하는 데 널리 사용하는 딥러닝 언어 모델이다. 여러 트랜스포머 모델 중 GPT는 가장 주목할 만한 성과를 만들었다. 요약 단계에서 큰 사이즈의 인풋 텍스트를 처리한 후 생성 단계에서는 하나의 단어를 시간 순서대로 생성한다. GPU는 병렬 처리에 특화되어 있으므로 요약 단계에서는 잘 작동하지만 생성 단계에서는 텍스트 생성의 Sequential Characteristic 때문에 성능이 크게 떨어진다. 이로 인한 high latency 문제를 해결할 수 있는 효과적인 하드웨어 플랫폼이 필요하다.  

DFX는 Multi-FPGA 가속기인데, GPT-2 모델의 요약 및 생성 단계를 모두 low latency 및 high throughput으로 처리할 수 있다. DFX는 모델 병렬 처리 및 최적화된 데이터 흐름을 사용하며, 모델과 하드웨어를 인식하고 있어서 여러 장치 간의 작업을 동시에 빠르게 실행할 수 있다. DFX의 코어는 맞춤형 명령어들을 사용하며 GPT-2의 동작을 처음부터 끝까지 제공한다. 우리는 이 하드웨어 구조를 4개의 Xilinx Alveo U280 FPGA에 적용하였고 모든 HBM 채널과 계산 리소스들을 사용하여 하드웨어 효율을 높인다. DFX는 GPT-2 모델을 작동시켰을 때 NVIDIA V100 GPUs 대비 5.58배의 속도 향상과 3.99배의 에너지 효율 향상을 달성하였다. 또한, GPU appliance보다 비용 효율이 8.21배 높기 때문에 텍스트 생성 기술의 유망한 해결책이다.

---

### Introduction  

트랜스포머는 딥러닝 언어 모델로 인풋 데이터의 각 부분마다 중요도 가중치를 다르게 주는 어텐션 기법을 사용한다. RNN와 LSTM으로 회귀와 글로벌 디펜던시 문제를 해결하면서 사실상 텍스트 생성과 같은 자연어 처리의 표준 기법으로 자리 잡았다. 트랜스포머 모델 중 Generative Pre-trained Transformer (GPT)는 클라우드 서비스에 널리 이용되며 텍스트 생성에 주목할만한 성과를 거두고 있다.  

텍스트 생성 과정은 요약과 생성 단계로 나뉘는데, 언어 모델은 인풋 토큰으로부터 생성된 인풋 context를 이용하여 지속적으로 연속적인 아웃풋 토큰을 생성한다. 생성 단계는 각 iteration 마다 하나의 아웃풋 토큰을 생성하며 이전 단계의 아웃풋 토큰을 인풋으로 사용한다. 반면에 언어 모델은 iteraions 동안 Contextual Features를 저장한다. 현재의 서버 플랫폼에서는 택스트 생성에 GPU를 사용한다. GPU의 대량 병렬 계산 유닛은 인풋 토큰을 동시에 계산할 수 있게 하기 때문에 요약 단계에서 좋은 성능을 발휘한다. 그치만 Sequential Processing에는 맞지 않기 때문에 성능이 생성 단계에서는 성능이 저하된다.  

여러 개의 아키텍쳐가 트랜스포머를 가속시키기 위해 제안된 바 있다. 어텐션 메커니즘은 문맥 이해를 위한 행렬 곱과 소프트맥스로 구성되어 있고 연산적으로 가장 intensive 하기 때문에 주된 걱정거리였다. 그러나 언어 서비스는 트랜스포머의 전체적인 구조를 고려해야 한다. 데이터 센터가 위의 가속기 구조들을 채택하려면 서버 플랫폼이 추가적인 CPU나 연산 모듈을 필요로 해서 overhead가 늘어난다. 따라서 전체적인 GPT 작동을 수행할 수 있는 단일화되고 프로그램할 수 있는 아키텍쳐가 필요하다.  

본 논문에서는 DFX라는 Multi-FPGA 가속기를 제안한다. 이 가속기는 텍스트 생성에 최적화 되어있고 다양한 GPT 모델에 적용할 수 있다. Sequential Characteristic을 다루기 위해 DFX의 연산 코어는 단일 토큰 처리에 최적화 되어있다. 또한, 최대 HBM을 위해 GPT의 특성에 기반한 효과적인 Tiling Scheme과 dataflow를 사용한다. 증가하는 모델 사이즈를 다루기 위해 모델 병렬 처리를 하여 연산 코어의 피지컬 수를 늘리고 로드를 고르게 분배한다. GPT 모델은 지속적으로 변화하고 다른 언어 서비스로 확장할 수 있도록 FPGA 모델을 이용한다. FPGA 기반 가속기 ASIC 기반과 비교했을 때 다시 프로그래밍 할 수 있는 하드웨어를 최저 비용으로 제공한다.  

주요 기여
- GPU 같은 병렬 하드웨어에서 텍스트 생성은 텍스트 생성의 순차적 특성으로 인해 병목 현상이 발생하는 것을 확인한다.  
- 높은 하드웨어 활용도를 가진 GPT 추론 가속화에 최적화된 프로그래밍 가능한 맞춤형 코어를 설계한다.
- GPT에 기반한 tiling scheme과 dataflow로 full HBM을 이용하여 low latency와 high throughput을 달성한다.
- 최소한의 data synchronization과 최고의 병렬 처리를 달성하는 방향으로 Multi-FPGA 시스템에 모델 병렬 처리와 효율적인 네트워크를 적용해서 모델 파라미터를 고르게 분배한다.
- GPU 기반 플랫폼보다 몇배 더 적은 비용으로 몇배 더 좋은 성능과 효율을 내는 트랜스포머 기반 언어 서비스를 구동할 수 있는 Multi-FPGA 시스템을 만든다.  

---
## Background  
A. GPT Language Model  
  GPT는 자연어 처리에서 가장 높은 정확도를 보이는 트랜스포머 기반의 구조이다. 원시적인 트랜스포머는 인코더와 디코더 파트로 이루어져 있는데 각각 인풋과 아웃 시퀀스의 처리를 담당한다. 그러나 GPT는 텍스트 생성에 초점을 맞췄기 때문에 디코더만 가지고 있다. GPT가 인코더를 없앨 수 있었던 것은 인코더 대신 미리 훈련된 행렬을 사용하는 Token Embedding 이라는 방법을 사용하기 때문이다. 게다가, GPT의 모델 사이즈와 디코더 레이어 수는 더 높은 정확도와 토큰 생성의 정교함을 위해 더 많은 파라미터를 요구하면서 점점 증가하고 있다. 최근에 OpenAI는 GPT-3를 발표했는데 공공 도메인에서는 사용할 수 없다. 이 논문에서는 공공 도메인에서 사용가능 한 GPT-2 모델을 사용하였다. GPT-2 모델의 하드웨어 가속 전략은 Size만 늘리면 GPT-3에도 적용이 가능하다는 점에 주목한다.  

  GPT-2 Structure  
  디코더의 시작 부분에 위치한 Token Embedding은 인풋 단어들을 임베딩 벡터로 변환한다. 인풋 단어들은 Dictionary에 기반하여 Token ID로 변환된다. Pre-trained Matrices와 Word Token Embedding (WTE), 그리고 Word Position Embedding (WPE)는 Token ID와 인덱스 하여 대응되는 벡터를 얻는다. WTE는 토큰 관련 인코딩, WPE는 위치 관련 인코딩을 포함한다. LM head는 디코더의 마지막 부분에 위치하여 있고 Token Embedding과 반대되는 역할을 한다. 아웃풋 임베딩 벡터를 Token ID로 변환한다. 이 과정은 WTE의 transpose와의 행렬 곱을 요구하며, softmax를 적용하여 가장 높은 확률을 가진 Token ID를 선택한다. 선택된 Token ID가 생성된 단어를 나타낸다.  

![GPT-2](../images/transformer.png)  


  GPT-2는 Token Embedding과 LM head 사이에 N개(모델 사이즈가 결정)의 디코더 레이어를 가지고 있다. 하나의 디코더 레이어는 크게 4가지로 구분된다: Self-attention, Feed-forward Network, Layer Normalization, Residual. Self-attention은 디코더를 위한 어텐션 기법이고 트랜스포머의 주된 요소다. Query, Key, Value 행렬을 생성해서 어텐션 행렬을 구한다. Query는 현재 주어진 단어와 관련이 있고 Key와 Value는 전체 문맥의 흐름을 나타낸다. GPT-2는 H개의 독립적인 행렬 계산을 수행하기 위해 어텐션 가중치를 H개의 열로 나누는 멀티헤드 어텐션을 사용한다. H는 어텐션 헤드 개수를 나타내는 하이퍼 파라미터이며 모델 사이즈가 증가함에 따라 증가한다. 또 다른 중요한 동작은 Feed-forward Network인데, 이것은 DNN에서 흔히 사용된다. 이것은 두 개의 FC Layers와 GELU 활성화 함수로 이루어져 있다. Layer Normalization와 Residual은 Self-attention와 Feed-forward Network 주변에 위치하며 거대 모델을 fine-tune 하기 위함이다.  

  주어진 Context에 따라 토큰을 생성하기 위해서 GPT-2 모델은 요약 단계외 생성 단계를 포함한다. 요약 단계는 전체 Context를 인풋으로 받기 때문에 디코더의 인풋 차원은 n \* emb 이다. n은 context의 토큰 길이(갯수)이다. 참고로 1.5B 모델의 emb = 1600이다. 임베딩 벡터는 디코더로 fed 되는데 가중치 행렬 사이즈가 emb \* emb 거나 더 크며 아웃풋 행렬은 초기 디멘션과 크기가 같은 n \* emb이다. 아웃풋 행렬의 마지막 행만 LM head에서 처리되고 첫번째 토큰이 생성된다. 맥락을 나타내는 Key와 Value 행렬도 요약 단계에서 생성된다. 생성 단계에서 이전에 생성된 토큰이 디코더에 들어가므로 인풋 디멘션이 1 \* emb 이다. 토큰 생성은 이전의 문맥에 따라 결정되므로 생성 단계는 새 인풋의 context를 Key와 Value 행렬의 행에 appending 함으로써 row demension을 1씩 늘려서 업데이트한다. 예를 들어 "Hello, my name"이 context이고 input token length가 4이면 4 \* emb Key and Value 행렬이 생성되고 요약 단계 때 첫번째 output token인 "is"가 생성된다. 만약 output token length가 3이면 2번의 iterations를 더 하게 되고 Key and Value 행렬이 












---
### 용어 정리
- FPGA는 프로그래밍이 가능한 반도체 장치로 많은 게이트와 논리 블록을 포함하여 다양한 하드웨어 기능을 구현하도록 연결할 수 있다. Multi-FPGA는 말 그대로 여러 개의 FPGA를 동시에 사용하는 시스템을 말한다.


