---
title: Tender
layout: default
parent: Paper Review
nav_order: 2
---

2024 ACM/IEEE 51st Annual International Symposium on Computer Architecture (ISCA)  

## Tender: Accelerating Large Language Models via Tensor Decomposition and Runtime Requantization  
(작성 중)

### II. Background and Motivation  


#### C. Challenges in Quantizing Large Language Models  

**Preliminaries on Quantization**  

- Uniform Symmetric Quantization  

$s=x_max / (2^(b-1) -1)$   $x_q=round(x_f / s)$

b = bit width 이므로 $(2^(b-1) -1)$ 개로 쪼갤 수 있음  
s = scaling factor 는 x_max를 $(2^(b-1) -1)$ 로 나눠주면 됨  

$$
x_q = round(x_f/s)
$$

Dequantization은 양자화 된 정수 값에 scaling factor를 곱해서 다시 floating-point로 복원하는 과정이다.  
런타임에서 x_max를 결정하는 오버헤드를 줄이기 위해 static quantization을 이용한다. 이는 런타임 전에 calibration sample을 통해 미리 scaling factor를 계산한다.  

텐서 내의 elements가 어떻게 양자화되는지에 따라 다양한 quantization granularity가 생긴다.  
ex) per-tensor, per-row, per-column  

per-column이 가장 좋은 성능을 보이지만, 행렬 계산 시에 열마다 다른 scaling factor를 적용해야 해서 오버헤드가 크고 속도를 저하시킨다.  
따라서 이전의 LLM들은 per-row나 per-tensor quantization을 통해 activation을 하고 per-column이나 per-tensor으로 weight quantization을 한다.  


**Approaches to Handling Outliers in LLM Activations**  

여러 알고리즘 기반 PTQ는 LLM activation 시의 outlier들을 처리하는 것을 목표로 한다. LLM.int8()과 SmoothQuant가 있다.  

- LLM.int8()은 mixed-precision decomposition을 사용하는데, activation 시의 outlier들은 FP16 precision으로 유지되고, 다른 값들은 INT8로 양자화되는 방식이다. Floating-point 연산을 포함하기 때문에 무시할 수 없는 성능 오버헤드가 초래된다.  
- SmoothQuant는 activation의 일부를 weights로 옮기는 방식으로 양자화의 어려움을 줄이고자 한다. 하지만, outlier를 normal 값들로부터 명확하게 분리하지 않기 때문에 ultra low-bit에서 손실이 크다.  

이상값을 인식하는 여러 가속기들이 있는데, 이들은 normal값을 low-bit으로 양자화하면서 이상값을 별도로 처리하기 위해 mixed precision을 사용한다.  

- GOBO는 가중치만 양자화하는 방식으로, outlier들을 더 높은 정밀도로 양자화한다.  
- OLAccel은 16비트 MAC 유닛을 몇 개 사용하여 4비트 MAC 유닛과 함께 outlier를 처리한다.  
- DRQ는 텐서에서 민감한 영역을 식별하기 위해 세밀한 감지 알고리즘을 사용한다.  
- OliVe는 outlier를 custom number representation으로 양자화한다. Mixed precision을 사용하지는 않지만 인접한 normal값을 가지치기하고 커스텀 타입을 지원하기 위해 인코더/디코더가 필요하다.  


#### D. Challenges and Opportunities  

직관적으로, activation tensor를 reduction axis인 열을 따라서 분할하고 각 그룹을 다른 scaling factor로 양자화할 수 있다.  

$$
P_i = X_i \times W_i / s_i s_w , Y = \sum\limits_{i=1}^G (s_i s_w) \dot P_i
$$
식(1)

$P_i$, $Y$, $G$ 는 각각 그룹 i의 부분합, 최종 행렬, 그룹 개수를 나타낸다.  

이 방법도 작은 부분 행렬과 부분 곱을 누적하기 위한 빈번한 rescaling으로 utilization이 낮아지는 문제가 있다. 따라서, 모델의 정확성을 유지하면서 양자화의 효과를 누리기 위해 reduction axis를 따라 채널을 분할하고 유사한 범위를 가진 채널들을 그룹화하여 이상값을 다른 값들로부터 분리하면서도 reduction axis를 유지하여 연산 코어를 더 잘 활용할 수 있도록 해야한다. 

우리의 직관은 부분 합을 특정 순서로 처리하고 다음 부분 합을 더하기 전에 누적된 값을 rescaling 하여 행렬 곱셈의 reduction axis를 유지할 수 있다는 것이다.  

$$
A_1 = P_1, A_i+1 = A_i \dot s_i/s_i+1 + P_i+1,
Y=A_G \dot (s_w s_G)
$$
식(2)

식(1)과 식(2)는 equivalent하다. 식(2)를 하드웨어에서 효과적으로 구현하려면 MAC 유닛으로 수행해야 한다. $s_i/s_i+1$ 을 rescale factor라고 하겠다.  

우리는 알고리즘 하드웨어 co-design 기술인 Tender를 제안하여 mixed precision, custom datatypes, re-training 없이 LLM을 INT4/INT8로 완전히 양자화 한다.  
세밀하게 설계된 PTQ 알고리즘으로 채널을 분해하여 activation 텐서에 있는 outlier 값들을 분리한다. 동시에, Tender는 텐서 연산 유닛 내부에서 rescaling을 가능하게 하여 rquantization이 필요가 없고, 정수 파이프라인을 완전히 활용할 수 있다.  








---
**찾아본 것**    


세분도(granularity) 종류  
- Per-tensor quantization (텐서 단위 양자화):  
텐서 내의 모든 요소가 동일한 양자화 파라미터(스케일 팩터)를 공유한다. 이 방식은 양자화 과정을 단순화하지만, 이상값(outliers)으로 인해 양자화 오류가 커질 수 있다.  
- Per-row quantization (행 단위 양자화):  
텐서의 각 행이 자체 양자화 파라미터를 가진다. 이는 텐서 단위 양자화보다 더 세밀하게 조정할 수 있어 양자화 오류를 줄일 수 있다.  
- Per-column quantization (열 단위 양자화):  
텐서의 각 열이 자체 양자화 파라미터를 가진다.  이 방식은 이상값을 개별적으로 처리할 수 있어 가장 낮은 퍼플렉시티를 제공한다.  

=> 행 단위 양자화의 한계  
이상값은 특정 행이 아니라 특정 채널(열)에 집중되는 경우가 많다. 행 단위 양자화에서는 각 행의 모든 요소가 동일한 스케일 팩터로 양자화되기 때문에, 특정 채널에 집중된 이상값을 효과적으로 분리하기 어렵다.  

XQ =X×WQ; XK =X×WK; XV =X×WV  
이므로 X의 행이 가중치의 열과 곱해지는 형태다.  

따라서 per-column quantization을 하면 각 행의 요소마다 다른 scaling factor를 적용해줘야 해서 비효율적이다.  



텐서 연산 유닛 내에서 재스케일링
- 재양자화의 문제점
디양자화: 정수 값을 다시 부동 소수점 값으로 변환합니다.
연산 수행: 부동 소수점 연산을 수행합니다.
재양자화: 연산 결과를 다시 정수 값으로 변환합니다.
이 과정은 부동 소수점 연산을 포함하기 때문에 성능 오버헤드를 초래합니다.

연산 유닛 내부에서의 재스케일링
연산 유닛 내부에서 재스케일링을 수행하면 다음과 같은 이점이 있습니다:

스케일 팩터의 적용: 연산 유닛 내부에서 부분 합을 계산할 때 스케일 팩터를 직접 적용합니다. 이는 각 부분 합을 계산할 때마다 부동 소수점 연산을 수행하지 않고, 정수 연산만으로 처리할 수 있게 합니다.
명시적 재양자화 불필요: 스케일 팩터를 사용하여 부분 합을 직접 조정하기 때문에, 부동 소수점 값으로 디양자화하고 다시 양자화할 필요가 없습니다.
정수 파이프라인 활용: 모든 연산이 정수 연산으로 처리되므로, 하드웨어의 정수 파이프라인을 완전히 활용할 수 있습니다. 이는 연산 속도를 크게 향상시킵니다.

---
**용어 정리**  

퍼플렉시티(perplexity): 언어 모델의 성능을 측정하는 지표 중 하나로, 낮을수록 모델이 더 좋은 성능을 나타냄  
이상값(outliers): 데이터 세트에서 다른 값들과 비교했을 때 매우 큰 값을 가진 요소들로, 양자화 오류를 증가시킬 수 있음  
텐서(Tensor): 다차원 배열로 데이터를 여러 차원으로 표현할 수 있음. 예를 들어 $A_1=f(W_1 \dot X)$ 는 첫번째 레이어의 활성화 텐서가 된다.  








