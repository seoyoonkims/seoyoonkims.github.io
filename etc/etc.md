
## 비밀번호 없이 서버 및 깃허브 SSH로 접속하는 법

### 1. local -> server    
 
**local**  

```
ssh-keygen -t rsa  
```
하면 .ssh에 id_rsa id_rsa.pub 가 생성됨  
 
```
cd .ssh  
cat id_rsa.pub  
```
하면 public code가 나오고 이걸 복사해둔다.  
 
**server**  
 
```
cd .ssh/  
vi authorized_keys
```
에 public code를 붙여넣기 하고 저장.  
 
 
 
### 2. server -> GitHub    
 
**server**  

```
ssh-keygen  
cd .ssh/  
cat id_rsa.pub 
``` 
출력된 코드 복사  
 
**GitHub**
 
settings > SSH and GPG keys 에 들어간다
 
New SSH key 클릭 후 public key 복붙하고 제목은 username@servername 으로 설정  
 
 
만약 git clone 할 때 permission 에러가 나면
```
cd .ssh/
vi config
```
하고 아래 내용 추가  
 
```
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_rsa
  IdentitiesOnly yes
```