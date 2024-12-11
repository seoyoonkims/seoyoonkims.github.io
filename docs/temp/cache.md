---
title: Cache Architecture
layout: default
parent: Posts
nav_order: 6
---

## Cache Architecture  

(작성 중)
Basic Design, Coherence, Advanced Architectures

---

**Why Caches?**  

32-bit 메모리 주소를 가진 컴퓨터에서 현실적으로 모든 프로그램이 4GB의 메모리를 1 cycle 안에 접근하는 것은 불가능하다. 

대부분의 컴퓨터는 여러 프로그램을 멀티 태스킹으로 실행할 뿐더러, 메모리 사이즈가 커질수록 접근 속도가 느려지기 때문이다.  

**Cache**는 이러한 문제점을 해결하고자 고안된 방법이다. 시스템 적으로 메모리 계층 구조를 사용해서 속도를 늘리고, 가상 메모리를 사용해 연속적이고 프라이빗한 (것 같은) 메모리를 제공한다. 

---

**Principles**  

Temporal Locality와 Spatial Locality에 기반해서 가장 최근에 이용된 데이터들, 즉 가까운 미래에 사용될 가능성이 높은 데이터들을 DRAM 보다 접근 속도가 빠른 캐시 메모리에 저장해서 속도를 높인다.   

- Temporal Locality: 프로그램은 같은 장소를 짧은 시간 내에 여러번 반복하는 경향이 있다. ex) loops  
- Spatial Locality: 프로그램은 근처에 있는 비슷한 메모리 주소를 참조하는 경향이 있다. ex) array

---

**Modern Memory Hierarchy**  

![1](../images/cache/1.png)

현대 컴퓨터의 메모리 계층이다. 레지스터 파일을 제외하면 모두 자동으로 관리되는 시스템이다. 위로 갈수록 접근 속도가 빠르고 용량은 적은 것을 볼 수 있다. 

---

**Cache Design Basics**  

캐시는 SRAM 기반이다. DRAM으로의 접근을 줄이는 것이 목적이지만, 크기가 DRAM 보다 훨씬 작기 때문에 Miss가 생길 수 밖에 없다. 따라서 데이터를 효율적으로 저장해야 Hit Ratio를 높일 수 있다.  

기본 작동 원리는 다음과 같다.  

![2](../images/cache/2.png)

Hit이면 바로 사용하면 되지만, Miss인 경우 더 하위 계층에서 데이터를 Fetch 해와야 한다. 

다음 파라미터들로 캐시가 디자인되는데, M은 메모리 사이즈, G는 접근 사이즈, C는 캐시의 사이즈를 뜻한다.  

$$
M = 2^m, G=2^g, C
$$

---

### **Direct-Mapped Cache**  

![3](../images/cache/3.png)

Direct-Mapped Cache의 경우 같은 인덱스 자리에 여러 데이터가 매핑될 수 있기 때문에 이들을 구별하기 위해서 Tag가 필요하다. M bytes 메모리에 있는 데이터가 C bytes 메모리에 들어가므로 M/C개의 메모리 블록이 동일한 캐시 인덱스에 대응된다. 따라서 이들을 구별하기 위해서는 $log_2 (M/C)$ 만큼의 Tag 비트가 저장되어 있어야 한다. 다시 말하면, $2^{tag}$ 만큼의 주소 중에 하나만 캐시에 저장될 수 있다. 

캐시 용량이 C bytes이고, 한 블록의 용량이 B bytes이면, 캐시 라인의 수는 $C/B$개가 된다. 따라서 캐시 라인의 인덱스 비트는 $log_2 (C/G)$가 된다. B bytes인 한 블록은 G bytes의 Word로 구성되어 있으므로, 블록 인덱스 비트 $bo$는 $log_2 (B/G)$가 된다. $g$는 $log_2 (G)$이다. Tag 비트는 $log_2(M/C)$ 혹은 M-bit에서 나머지 비트들을 빼서 구할 수 있다. 랜덤한 두 주소가 주어졌을 때 캐시 충돌이 일어날 확률은 캐시 라인 개수의 역수인 $1/{C/B}$이다. 따라서 캐시 라인 수(블록 수)인 $C/B$가 커지면 충돌이 줄어들게 된다.  

블록 사이즈 B가 커지면 한 번에 많은 데이터를 로드하므로, Spatial Locality가 강한 상황에서 Prefetching의 효과가 좋을 수 있지만, 블록 수가 줄어들어서 충돌 가능성이 높아진다. 또한, 블록 사이즈가 크면 로드하는 데 Latency가 커지므로 필요한 Word를 먼저 로드해서 파이프라인에 공급하고 나머지를 로드하거나, 서브 블록들에 Valid Bit를 추가해서 Request가 날라온 서브 블록만 교체하는 방법 등이 있다.  

---

### **Set-Associative Cache**  

Direct-Mapped Cache의 각 메모리 블록은 캐시의 특정 인덱스 딱 한 곳에만 저장될 수 있었다. 구현은 간단하지만, 동일한 인덱스에 여러 메모리 블록이 매핑되면 충돌이 발생한다.  

Set-Associative Cache는 Direct-Mapped Cache를 여러 세트로 나눈 것이다. 같은 인덱스에 매핑되는 메모리 블록이 a개의 Bank 중 아무 곳에 저장될 수 있어서 충돌이 줄어든다.  

각 Bank는 C/a byte짜리 Direct-Mapped Cache과 같다. Tag는 이제 a에 대한 정보도 포함해야 하므로, $t=log_2 M - log_2 (C/a)$가 된다. $log_2 a$ 비트 만큼 늘어난 것을 볼 수 있다. 

Direct-Mapped Cache는 $C/B \times B$ 였다면 Set-Associative Cache는 $C/a/B \times B \times a$가 된 것이다.  

![4](../images/cache/4.png)

이제 인덱스가 주어지면 a개의 Bank를 Search 해서 일치하는 Tag를 찾아야 한다. 따라서 a-to-1 Multiplexer가 필요하다. 그리고 그 인덱스에 업데이트 요청이 들어오면 a개의 Bank 중에서 어떤 것을 업데이트 할 지 결정하는 Replacement Policy가 필요하다. 가장 옛날에 사용된 캐시를 날리는 Least Recently Used (LRU) 정책, Random 하게 날리는 정책 등이 있다.  

---

### **Fully Associative Cache**  

$a=C/B$인 Set Associative Cache라고 보면 된다. 인덱스 비트가 없어서 모든 메모리 블록이 아무 라인에나 저장될 수 있다. 매우 유연하지만 검색 비용도 매우 크고 느리다.  

![5](../images/cache/5.png)

Cache 구조가 $C/(C/B)/B \times B \times C/B = 1 \times B \times C/B$가 된다. Tag가 주어지면 모든 엔트리를 찾아서 데이터가 있으면 리턴한다. 모든 캐시 블록마다 Comparator가 필요하고 거대한 Multiplexer와 Wire가 필요하다.  

다행히도 a=4 정도인 Set-Associated Cache를 사용해도 성능에 문제가 없어서 Fully Associative Cache는 잘 사용하지 않는다.  

---

**Cache Misses**  

- Compulsory Miss: 데이터에 처음 접근할 때 생기는 미스. Locality가 거의 없을 때 지배적이다.

- Capacity Miss: 캐시 크기가 한정되어 있어서 Fully-Associative Cache에서도 발생하는 미스. $C<W$ 일 때 지배적이다.

- Conflict Miss: 두 개 이상의 데이터 블록이 동일한 캐시 라인에 저장되어서 발생하는 미스. $C~=W$이거나 $C/B$가 작을 때 지배적이다. 

---

**Cache Design Considerations**  

**1. Write-Hit Policy**  

- Write-Through Cache: Write-Hit이면 $L_i$, $L_{i+1}$을 모두 업데이트 한다. 구현이 간단하고 I/O Device 등이 로우 레벨 메모리만 보고 데이터 값을 알 수 있지만, L3가 Off Core면 Write 시간이 오래 걸려서 High Performance를 내기 어렵다.

- Write-Back Cache: Write-Hit이면 $L_i$만 업데이트 하고, $L_i$를 "Dirty"로 마크한다. 그리고 나중에 교체하게 되면 $L_{i+1}$를 업데이트한다.  

**2. Write-Miss Policy**  

- Write-Allocate Cache: Write-Miss 이면 $L_i$을 교체한다. Write-Back Cache와 잘 맞는다.  

- Write-No-Allocate Cache: Write-Miss이면 $L_{i+1}$을 교체한다. Write-Through와 잘 맞는다.  

---

**Multi-Level Caches**  

현대 고성능 프로세서에서는 보통 L1 캐시를 Instruction 용과 Data 용으로 분리한다. 메모리 사용 패턴이 대체로 다르기 때문이다. Instruction의 경우가 메모리도 더 작고, 읽기 전용이며, Locality가 높다. L1 캐시를 분리하면 Bandwidth가 두 배가 되고 별도로 최적화할 수 있다. L2, L3는 일반적으로 통합된 형태로 사용된다.  

![6](../images/cache/6.png)  

---

**Inclusive Cache**  

캐시 계층에서 상위 캐시 $L_i$에 포함된 데이터를 하위 캐시 $L_{i+1}$에도 반드시 포함시키는 구조이다. 일관성을 유지하기 편리하지만, $L_i$는 $a>1$ 이고, $L_{i+1}$는 $a=1$인 경우 $L_i$에서의 Miss 하나가 일관성 유지로 인해 여러 개의 블록을 교체하도록 할 수 있다. 원래 멀티 코어에서 데이터 일관성 유지를 위해 이 방법을 많이 썼지만, 이제 많이 안 사용하는 듯하다.  

![7](../images/cache/7.png)

L1에 x, y가 저장되어 있었는데 x를 z로 교체하면 L2에서는 y가 z로 교체됨. 그러면 일관성 때문에 L1에서 y가 있을 수 없어서 y도 날라가는 문제가 있음.  







