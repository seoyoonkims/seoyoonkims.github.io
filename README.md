# Seoyoon Kim's Homepage

Jekyll과 Just the Docs 테마로 만든 개인 홈페이지입니다.

## 로컬 미리보기

Docker와 Docker Compose가 설치되어 있으면, 이 폴더에서 실행합니다.

```sh
docker compose up --build -d
```

첫 실행에는 Ruby 이미지와 의존성을 내려받으므로 시간이 걸릴 수 있습니다.
브라우저에서 <http://localhost:4000>을 열면 GitHub에 올리기 전의 홈페이지를 볼 수 있습니다.

Markdown, 스타일, 레이아웃 등을 수정하면 자동으로 다시 빌드됩니다.
브라우저를 새로고침해서 확인하세요. `_config.yml`을 수정했다면 서버를 재시작합니다.

```sh
docker compose restart jekyll
```

실행 로그 확인:

```sh
docker compose logs -f jekyll
```

미리보기 종료:

```sh
docker compose down
```

Linux에서 `/var/run/docker.sock` 접근 권한 오류가 발생하면 위 명령 앞에 `sudo`를 붙여 실행하세요.
예: `sudo docker compose up --build -d`.

GitHub Pages 배포와 같은 Ruby 3.3과 `Gemfile.lock`에 고정된 의존성을 사용합니다.
빌드 결과와 캐시는 컨테이너 내부에 두며, 미리보기 실행만으로 GitHub에 배포되지는 않습니다.

## 메인 페이지 수정

- 소개 문구와 섹션 구성: `index.md`
- 논문, 학력, 수상, 경력, 기술, 상단 메뉴: `_data/profile.yml`
- 메인 페이지 레이아웃: `_layouts/profile.html`
- 색상, 글꼴, 반응형 스타일: `assets/css/profile.css`

학교와 회사 로고는 `assets/images/logos/`에 저장되어 있으며, 공식 출처는 프로필 데이터 파일에 기록되어 있습니다.
프로필 사진 `assets/images/profile.webp`는 기존 `me2.jpg`를 크롭하고 웹용으로 최적화한 파일입니다.
기본 시스템 글꼴을 사용합니다.

Education의 각 항목은 `_data/profile.yml`에 작성한 순서로 표시됩니다.
논문 미리보기 GIF는 연구실 홈페이지에서 가져온 파일이며, 원본 주소는 논문 데이터의 `preview.source`에 기록되어 있습니다.

## 하위 페이지

글은 `docs/posts/`에서 관리하며, 공통 문서 레이아웃은 `_layouts/default.html`, 본문 스타일은 `assets/css/document.css`입니다.
기존 Systems 글은 `docs/posts/Server.md`로 옮겼고, 이전 주소는 새 주소로 연결됩니다.
