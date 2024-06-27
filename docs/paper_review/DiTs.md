---
title: DiTs
layout: default
parent: Paper Review
nav_order: 4
---

## Scalable Diffusion Models with Transformers  

(작성 중)

**Abstract**  
트랜스포머 기반의 새로운 확산 모델이다. 일반적인 U-Net 구조의 트랜스포머가 아닌 다른 방법으로 이미지를 학습하게 했다. Gflops로 측정된 forward pass complexity를 통해 Diffusion Transformers (DiTs)의 확장성을 분석한다. 트랜스포머의 깊이/넓이나 입력 토큰 수를 증가하면서 테스트 한 결과 더 높은 Gflops를 가진 DiTs가 일관되게 낮은 FID를 갖고 있음을 확인했다. 확장성과 더불어 DiT-XL/2 모델은 ImageNet 512x512 및 256x256 벤치 마크에서 이전에 나온 모든 확산 모델을 능가한다.

**Introduction**  
U-Net은 픽셀 수준의 autoregressive 모델과 조건부 GANs에서 성공을 거두었고 PixelCNN++로부터 몇 가지 변화를 통해 계승되었다. 이 모델은 주로 ResNet 블록으로 구성된 컨볼루션 네트워크다. 표준 U-Net과 달리 트랜스포머의 필수 구성 요소인 셀프 어텐션 블록이 삽입되었다. 

확산 모델의 아키텍쳐 선택의 중요성을 명확하게 밝히고, 향후 생성 모델 연구를 위한 경험적인 기준을 제시한다. U-Net이 확산 모델의 성능에 중요하지 않으며, 트랜스포머와 같은 표준 디자인으로 쉽게 대체할 수 있다는 것을 보여준다. 결과적으로 확산 모델은 아키텍쳐 통합 추세에서 이점을 얻을 수 있는 좋은 위치에 서있다. 다른 도메인에서의 모범 사례와 훈련 방법을 계승하면서 확장성, 견고성, 효율성과 같은 유리한 특성을 유지한다.

이 논문에서는 트랜스포머 기반의 새로운 클래스의 확산 모델에 중점을 두며, Diffusion Transformers, DiTs라고 부른다.DiTs는 Vision Transformers (ViTs)의 모범 사례를 따르며, 이것은 ResNet과 같은 전통적인 CNN보다 시각적 인식에서 더 효과적인 확장성을 보인다.

더 구체적으로 네트워크 복잡성과 샘플 퀄리티 간의 관계에 따른 트랜스포머의 확장성을 연구한다. Latent Diffusion Model (LDMs)의 프레임워크에 따라 DiT를 디자인하고 벤치마킹 함으로써 U-Net 백본을 Transformer로 대체할 수 있다. 


**Related Work**  

1. Transformer
트랜스포머는 언어, 비전, 메타 학습과 같은 여러 도메인 스페시픽 아키텍쳐들을 대체했다. 언어 도메인에서 모델 크기, 학습 연산량 및 데이터가 증가함에 따라 주목할만한 확장성을 가지고 있다. 트랜스포머는 언어를 넘어서 픽셀을 예측할 수 있도록 훈련되었다. 또한, 자가회귀 모델 및 마스크 생성 모델으로써 discrete codebooks에 대해서도 훈련되었다. 전자는 20B의 파라미터 개수까지 놀라운 확장성을 보여준다. 결과적으로 트랜스포머는 DDPMs에서 non-spatial 데이터를 합성하는데 이용되었다. 이 논문에서는 트랜스포머가 이미지의 확산 모델의 뼈대 구조로 사용될 때의 확장성을 연구한다.

2. Denoising diffusion probabilistic modèles (DDPMs)
디퓨전과 스코어 기반 생성 모델은 이미지 생성에서 특히 성공적이었고, 많은 경우 GANs를 넘어섰다. DDPMs의 발전은 샘플링 기법의 향상에 의해 이루어졌으며, 특히 classifier-free와, 픽셀이 아닌 노이즈를 예측하도록 재구성한 것, 저해상도 기반 확산 모델이 업샘플러와 병렬로 훈련되는 cascaded DDPM pipelines를 사용하는 것 등이 주요 개선 사항이다. 위에 나열된 모든 확산 모델에서는 컨볼루션 U-Net이 기본 구조로 사용된다.

3. Architecture complexity
이미지 생성에서 복잡도를 평가할 때 파라미터 수를 사용하는 것이 일반적이지만, 이것은 정확하지 않은 경우가 많다. 예를 들어, 이미지 해상도는 성능에 큰 영향을 미치지만 파라미터 수는 이것을 고려하지 않기 때문이다. 이 논문에서는 Gflops를 통해 모델의 복잡성을 분석하며, 이는 아키텍쳐 설계 문학과 일치한다.


**Diffusion Transformers**

- Diffusion formulation





---
**용어 정리**  
FID - 생성된 이미지의 품질을 평가하는 지표 중 하나임. 생성 모델이 생성한 이미지와 실제 이미지 사이의 거리를 계산함.  
U-Net - 이미지 처리 및 생성 작업에서 널리 사용되는 CNN 아키텍쳐다.
