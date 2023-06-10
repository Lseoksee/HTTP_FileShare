# HTTP 파일공유 서비스
* 친구들과 빠르게 파일을 공유해 보세요!
## 주요 기능
* Node.js 서버를 사용한 파일 뷰어
* 음악 & 비디오 스트리밍
* 서버 제어 콘솔
## 사용법
1. Node.js 를 설치합니다.
2. (권장) 자바 8버전 이상을 설치합니다.
3. [HTTP 파일공유 서비스의 최신 릴리스를 다운받습니다.](https://github.com/Lseoksee/HTTP_FileShare/releases)
4. 공유할 파일과 폴더들을 `share`폴더에 복사 합니다. 
5. 압축을 풀어 `start.exe` 를 실행합니다.
<details>
    <summary>만약 자바가 없다면</summary>
  
    1. server.js 가 있는 폴더에서 cmd를 실행합니다. (cd명령을 사용해도 무관)
    2. node server.js 를 입력하여 서버를 실행합니다.
</details>

## server.json 설정
`port`: 서버의 포트를 지정합니다. (기본값: `80`)

`dir`: serever.js가 있는 폴더 기준으로 공유할 폴더를 지정합니다. (기본값: `share`)
* server.js가 있는 폴더 전체로 잡고 싶다면: `""`
* 공유할 폴더가 src 라면: `/src`
* 공유할 폴더가 src/share 라면: `/src/share`

`domain`: 서버와 연결된 도메인을 지정합니다. (server.exe 에서 `web` 입력시 지정된 도메인으로 이동합니다.) <br> (기본값: `""`)

## 콘솔 명령어
* `help`: 명령어 목록을 봅니다.
* `stop`|`exit`: 서버를 종료시킵니다.
* `info`: 서버의 정보를 불러옵니다.
* `web`: 실행된 서버로 브라우저를 엽니다.
## 주의사항
* 서버종료시 반드시 `stop`또는 `exit`를 입력하여 종료해야합니다.
* 설정된 포트로 포트포워딩이 필요합니다.
## 개발환경
### 프론트엔드
* `React`
* `JavaScript`
* `HTML`, `CSS`
### 백엔드
* `Node.js`
* `Express.js`
* `Java`
## 소스출처
* <a href="https://www.flaticon.com/kr/free-icons/" title="폴더 아이콘">폴더 아이콘  제작자: Freepik - Flaticon</a>
* <a href="https://www.flaticon.com/kr/free-icons/" title="비닐 아이콘">비닐 아이콘  제작자: Good Ware - Flaticon</a>
* <a href="https://www.flaticon.com/kr/free-icons/-" title="이미지 편집 아이콘">이미지 편집 아이콘  제작자: Hilmy Abiyyu A. - Flaticon</a>
* <a href="https://www.flaticon.com/kr/free-icons/" title="종이 아이콘">종이 아이콘  제작자: SyafriStudio - Flaticon</a>
* <a href="https://www.flaticon.com/kr/free-icons/-" title="비디오 제작 아이콘">비디오 제작 아이콘  제작자: Prosymbols Premium - Flaticon</a>
