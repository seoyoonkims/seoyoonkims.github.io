
## Tetris.deb 파일 만들기

### Set up  

Ubuntu 22.04 LTS

1. vitetris 소스 파일 다운로드  

https://developers.redhat.com/blog/2019/03/18/rpm-packaging-guide-creating-rpm#ascii_based_tetris_game 에 가서 소스 파일을 다운로드 한다.

```
tar -xzf vitetris-0.57.tar.gz
```


2. 필요한 툴 설치  

```
sudo apt-get update
sudo apt-get install dpkg-dev debhelper
```


3. DEB 패키지 디렉토리 구조 생성  

```
cd vitetris-0.57
mkdir debian
cd debian
```


**필수 요소**   
- debian/control: 제어 파일로 패키지에 대한 중요 정보를 제공한다.  

```
Source: vitetris
Section: games
Priority: optional
Maintainer: Seoyoon <seoyoonkims@kaist.ac.kr>
Build-Depends: debhelper-compat (= 13), gcc
Standards-Version: 3.9.8
Homepage: https://www.victornils.net/tetris/

Package: vitetris
Architecture: any
Depends: ${shlibs:Depends}, ${misc:Depends}
Description: ASCII based tetris game
 vitetris is a multiplayer ASCII-based Tetris game
```

- debian/rules: 빌드 및 설치 과정을 정의한다.  

```
#!/usr/bin/make -f
%:
	dh $@

override_dh_auto_configure:
	# No configure step needed

override_dh_auto_build:
	$(MAKE)

override_dh_auto_install:
	$(MAKE) install DESTDIR=$(CURDIR)/debian/vitetris
```

dh는 debhelper, $@는 현재 타겟을 의미한다. %는 모든 타겟을 의미하므로, make build가 호출되면 모든 타겟에 대해 dh build가 실행된다.  

override_dh_auto_build 타겟은 dh_auto_build의 기본 동작을 덮어쓴다. $(MAKE) 명령을 실행하여 빌드 과정을 수행하며, Makefile에 정의된 빌드 규칙을 따른다.  

override_dh_auto_install 타겟은 dh_auto_install의 기본 동작을 덮어쓴다. $(MAKE) install 명령을 실행하여 설치 과정을 수행한. 설치 경로는 DESTDIR=$(CURDIR)/debian/vitetris로 지정되어 있다. 이 경로는 패키지 빌드 과정에서 임시 설치 경로로 사용된다.  


- debian/changelog: 패키지의 변경 사항을 기록한다.    

```
vitetris (0.57-1) unstable; urgency=low

  * Initial release.

 -- Seoyoon Kim <seoyoonkims@kaist.ac.kr>  Mon, 01 Jul 2024 00:00:00 +0000
 ```

4. 경로 설정  

- config.mk 파일에 가서 prefix를 수정하면 원하는 곳에 설치되도록 할 수 있다.  

```
prefix = $(HOME)/tetris
# prefix = /usr/local
```
기본으로 /usr/bin에 설치되도록 설정되어 있는데, 이를 /home/tetris로 바꿔주었다.  


- Makefile의 install에서 다음 코드를 추가하여 설치 전에 /home/tetris 디렉토리가 생성되도록 한다.

```
install: $(PROGNAME)
	$(INSTALL) -d $(DESTDIR)$(prefix)
```

```
bindir = $(prefix)/bin
datarootdir = $(prefix)/share
docdir     = $(datarootdir)/doc/vitetris
pixmapdir  = $(datarootdir)/pixmaps
desktopdir = $(datarootdir)/applications
datadir = $(datarootdir)/allegro
```

prefix만 수정해주면 나머지는 자동으로 수정된다.  
바이너리 파일은 bindir인 /home/tetris/bin에 생성될 것이다.  



5. 소스 빌드 및 패키지화  

```
cd ..
dpkg-buildpackage -us -uc
```

권한 문제가 생기면 ```chmod 777 <파일명>``` 해준다.  
빌드에 성공하면 ../에 vitetris_0.57-1_amd64.deb가 생성된다.  


6. 패키지 설치  

```
sudo dpkg -i vitetris_0.57-1_amd64.deb
```


**파일 계층 구조**  

$(HOME)/tetris/
│   ├── bin/
│   │   └── tetris               (installed from $(prefix)/bin)
│   ├── share/
│   │   ├── applications/
│   │   │   └── vitetris.desktop  (installed from $(desktopdir))
│   │   ├── doc/
│   │   │   └── vitetris/
│   │   │       ├── README        (installed from $(docdir))
│   │   │       └── licence.txt   (installed from $(docdir))
│   │   └── pixmaps/
│   │       └── vitetris.xpm      (installed from $(pixmapdir))


Makefile로 패키지를 빌드할 때, $(CURDIR)/debian/vitetris는 빌드 시의 임시 경로이고, 이 경로 내부의 파일 구조는 실제 시스템에 설치될 경로를 그대로 반영한다. 빌드 과정이 끝나고 패키지가 생성된 후 dpkg 또는 apt를 사용하여 설치하면, 이 임시 경로의 구조가 실제 시스템 경로로 대체된다.  