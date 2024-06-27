---
title: DDPM
layout: default
parent: Paper Review
nav_order: 3
---

## Denoising Diffusion Probabilistic Models

(작성 중)

#### Abstract 
이 논문은 diffusion probabilistic models 방법으로 높은 퀄리티의 이미지를 합성한 결과를 제시한다. Non-equilibrium thermodynamics에 영감을 받은 잠재 변수 모델의 한 종류이다. 최고의 결과는 diffusion probabilistic model과  Langevin dynamics를 이용한 denoising score matching 사이의 연결을 통해 설계된 weighted variational bound로 훈련함으로써 얻을 수 있었다. 이 모델은 자연스럽게 progressive lossy decompression을 따르며 autoregressive decoding의 일반화로 해석될 수 있다. 무조건적 CIFAR10 데이터셋에서 9.46의 Inception 점수와 3.17의 FID 점수를 기록했다. 256 * 256 LSUN 데이터셋에서는 ProgressiveGAN과 유사한 샘플 퀄리티를 달성했다.  


### **1. Introduction**  

Deep generative models 들이 다양한 데이터 모달리티에서 높은 퀄리티의 샘플을 보여주고 있다. GAN, autoregressive model, flows, variational auto encoders 등이 놀라운 이미지 및 오디오 샘플을 생성해왔다. 또한, energy-based modeling과 score matching도 주목할만한 발전이 이루어져 GANs와 경쟁할만한 이미지들을 생성할 수 있게 되었다.

Diffusion probabilistic model은 variational inference로 훈련된 parameterized Markov chain로, 데이터에 맞는 샘플을 유한한 시간 내에 생성한다. 이 체인의 transition은 확산 과정을 역으로 학습하여 수행되고, 그 과정은 샘플링의 반대 방향으로 데이터에 점진적으로 노이즈를 추가해서 신호를 소멸시키는 Markov chain이다. Diffusion이 적은 양의 가우시안 노이즈로 구성되면 샘플링 chain transition을 조건부 가우시안으로 설정하는 것이 충분하며, 특히 간단한 신경망일 때 매개변수화를 가능하게 한다. 

확산 모델은 정의가 간단하고 훈련하기 효율적이지만, 높은 퀄리티의 샘플을 생성한다는 증명이 없었다. 우리는 확산 모델이 실제로 높은 퀄리티의 샘플을 생성할 수 있으며, 때로는 다른 생성 모델보다 더 나을 수 있다는 것을 보여준다. 또한, 특정 매개변수화를 통해 확산 모델이 denoising score matching과 Langevin dynamics와 여러 노이즈 수준에서 동등함을 보여준다.

우리 모델의 샘플 퀄리티에도 불구하고, 다른 log likelihood 기반의 모델보다는 경쟁력이 떨어진다 (하지만 에너지 기반이나 스코어 기반 보다는 우수함). 대부분의 모델의 lossless codelengths가 인지할 수 없는 이미지의 세부 사항을 설명하는 데 소비된다는 것을 발견하였다. 이 현상에 대해 lossy compression의 언어로 더 정교한 분석을 제시하고, 확산 모델의 샘플링 절차가 progressive decoding의 일종으로, 일반적으로 autoregressive models로 가능한 것보다 훨씬 일반화된 비트 순서에 따라 autoregressive decoding과 유사하다는 것을 보여준다.


### **2. Background**  

확산 모델은 식 (1) 형태의 잠재 변수 모델임.

Joint distribution $p_\theta(x_{0:T})$ 이 reverse process이고 Markov chain으로 정의된다. 

확산 모델이 다른 잠재 변수 모델과 구분되는 점은 posterior $q(x_{1:T} \vert x_{0})$ 이며 forward process에 해당함.

Markov chain 형태이고 점차 가우시안 노이즈를 $\beta$ 에 따라 더해가면서 스케줄링함. 

식 (2)

훈련은 variational bound를 최적화하는 방식으로 이루어진다. 

식 (3)

잘 보면 ELBO임


### **3. Diffusion Models and Denoising Autoencoders**  

Forward process에서 $\beta$ 가 learnable 하다는 것을 무시하고 상수로 고정한다. 
따라서 $L_{T}$ 를 상수 취급할 수 있음.





---
reverse process이므로 조건부가 $p_{\theta}(x_{t-1} \vert x_{t})$ 같은 식으로 정의됨.
forward process는 반대.


---
### **용어 정리**
- Variational Inference: posterior 분포 $p(z \vert x)$를 다루기 쉬운 확률분포 $q(z)$로 근사하는 것
- Parametrize: 하나의 표현식을 다른 파라미터를 사용해서 간단하게 표현하는 것 (차수 줄일 수 있음)
