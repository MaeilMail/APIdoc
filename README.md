### **API URL**

https://maeilmail-api-docs.herokuapp.com/

### **USER API**

- **회원 가입** **POST `/api/users`**
    - 이메일, 닉네임 중복 여부 확인
    - bycrpt.hash로 비밀번호 복호화
- **로그인** **POST `/api/auth/login`**
    - bycrpt.compare로 비밀번호 확인
    - 로그인 성공 시 JWT와 status 리턴
- **구글 유저 회원가입** **POST `/api/auth/login/google`**
    - 프론트에서 넘어온 구글 email 중복 여부 확인
    - 중복이 아니라면 해당 email로 임시 유저 정보 생성
    - ‘회원 탈퇴’라는 단어로 비밀번호 해쉬화
- **회원 정보 조회** **GET `/api/auth/me`**
    - 미들웨어를 통해 사용자의 userId 추출 후 정보 조회
    - sequelize의 include 기능을 활용하여 자식 테이블 (Favor, Language)를 같이 조회함
- **회원 정보 수정** **PATCH `/api/auth/me`**
    - 현재 비밀번호 일치 여부 확인 후 개인정보 수정
    - 이미지 업로드 PATCH api/auth/me/image
        - AWS-SDK, AWS-S3, MULTER 패키지 활용하여 이미지 업로드 처리
- **구글 유저 회원 정보 수정** **PATCH `/api/auth/me?isGoogle=true`**
    - 회원 가입 시 입력되지 않은 닉네임, 국가 등을 추가로 입력
- **회원 탈퇴** **PATCH `/api/auth/me/withdrawal`**
    - 현재 비밀번호 입력 시 회원 탈퇴
    - 사용자 정보를 일정 기간 유지하고자 patch 활용
    - 후에 sql schedule 기능을 활용하여 유저 정보 reset 기능 구현 예정
- **사용자 검색** **GET `/api/users?search={nickname}`**
    - 닉네임을 기준으로 검색
    - regexp을 활용하여 정확히 일치하는 닉네임 검색 결과 도출
- **사용자 랜덤 추천** **GET `/api/users?recommend=true`**
    - sequelize의 random 함수와 limit 옵션을 활용하여 랜덤한 10명의 사용자 추천
- **특정 사용자 정보 확인** **GET `/api/users:{userId}`**
    - sequelize의 include 기능을 활용하여 자식 테이블 (Favor, Language)를 같이 조회함
    

### Letter **API**

- **특정 유저에게 편지쓰기** **POST `/api/letters/:userId`**
    - 프론트단에서 편지보낸 시각, 도착 시각, 걸리는 시간과 편지 내용을 받아 편지 보내기
    - node-scheduler를 이용해 시간이되면 is_arrived(편지가 도착했는지에 대한 속성)이 1로 변한다.
- **특정 유저와의 대화 보기** **GET `/api/letters/:userId?page=`
    - 특정 유저와의 대화 목록을 불러옴
    - Sequelize로 Pagination 기능을 구현해, 대화를 불러올 때 페이지당 10개의 쪽지씩 불러오도록 함 (전체 페이지 수도 동적으로 구해 프론트단으로 함께 보냄)
- **대화한 사람들 목록** **GET`/api/letters/`**
    - 대화한 사람들 목록을 보여주되, Letter 테이블의 내용 뿐아니라 Letter테이블이 참조하고 있는 User 테이블의 대화한 사람들의 기본적인 정보를 함께 불러온다.
    - Letter 테이블에 is_read(읽었는지에 대한 속성)가 0(안 읽음)인 것들의 갯수도 count 변수에 담아 함께 보내준다.
- **최근에 도착한 목록** **GET`/api/letters/my/recent`**
    - 최근에 온 편지들을 불러 오는데, is_arrived(편지가 도착했는지에 대한 속성) 1(도착)인 것들을 불러온다
- **오고 있는 편지 목록** **GET`/api/letters/my/incoming`**
    - 오고 있는 편지들을 불러 오는데, is_arrived(편지가 도착했는지에 대한 속성) 0(배달 중)인 것들을 불러온다.
- **특정 유저와의 특정 편지 확인** **GET`/api/letters/:userId/:letterId`**
    - 편지의 내용을 확인
- **편지 읽음 처리** **PATCH`/api/letters/:letterId`**
    - is_read(읽었는지에 대한 속성)을 읽음으로 처리
- **편지 전체 삭제** **PATCH`/api/letters/:userId`**
    - 특정 유저와의 전체 대화 목록을 삭제
