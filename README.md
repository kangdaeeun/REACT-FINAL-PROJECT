## PROJECT: REACT-FINAL-PROJECT

## 목차

1. [프로젝트 목표](#프로젝트-목표)
2. [주요기능](#주요기능-기능) 
3. [개발기간](#개발기간) 
4. [기술스택](#기술스택) 
5. [서비스 구조](#서비스-구조) 
6. [프로젝트 파일 구조](#프로젝트-파일-구조) 
7. [Trouble Shooting](#trouble-shooting)

## 프로젝트 목표
1. 프론트엔드 필수 기술 스택의 실전 활용 경험
2. 독립적인 CRUD 기능 구현 능력 향상

## 주요기능
1. 메인페이지
* 글 목록 조회

2. 상세페이지
* 글 상세 조회
* 추천 수 조회
* 추천 기능(로그인 후 가능)
* 댓글 수 조회
* 댓글 목록 조회
* 댓글 작성(로그인 후 가능)
* 댓글 수정(로그인 후 가능)
* 댓글 삭제(로그인 후 가능)

3. 글 작성 페이지

4. 글 수정 페이지

5. 회원가입 페이지
* 이메일
* 닉네임
* 비밀번호
* 비밀번호 확인
* 유효성 검사

6. 로그인 페이지
* 이메일
* 비밀번호
* 유효성 검사

7. 마이 페이지
* 프로필 이미지 업로드
* 닉네임 변경

## 개발기간 2024/12/31(화) ~ 2025/02/06(목)

## 기술스택 및 개발환경
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> 
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">

![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)

### Version Control
* Git: 프로젝트 버전 관리
* GitHub: 원격 저장소로 활용

### IDE : Visual Studio Code (VS Code)
* 확장성 높은 플러그인과 직관적인 UI를 활용하여 개발 환경을 최적화.

### Deploy
* Vercel

React 기반 프론트엔드 애플리케이션 배포.
코드 푸시 시 자동으로 배포되어 최신 상태 유지

* Supabase

백엔드 데이터베이스 및 인증 서비스로 활용
API와 데이터 관리를 통해 결과 저장 및 조회 기능 구현

## 서비스 구조
1. Frontend
* React: 사용자 인터페이스 개발.
* Tailwind: CSS 스타일링.
* React Router: 페이지 간 라우팅 처리.
* TanStack Query: API 요청 상태 관리 및 데이터 캐싱.
* Vite: 빠른 빌드와 개발 서버 제공
2. Backend
* Supabse:
1) 사용자 인증 (회원가입, 로그인, 로그아웃)
2) 사용자 결과 데이터 저장 및 관리
3) 닉네임 및 테스트 결과 CRUD(생성, 조회, 수정, 삭제 처리
3. Deploy
* Vercel: 프론트엔드 애플리케이션 배포
* Supabase: 데이터베이스 및 API 서버로 활용
4. Database Structure
* Users Table: 사용자 정보 관리
id, email, nickname 등
* Feeds Table: 게시글 정보 관리
title, content, user_id, created_at
* Comments Table: 댓글 정보 관리
content, feed_id, user_id, created_at
* Upvotes Table: 추천 정보 관
feed_id, user_id
  
## 프로젝트 파일 구조
react-final-project/
├── public/
├── src/
│   ├── assets/
│   ├── api/
│   │   └── commentApi.ts
│   │   └── feedApi.ts
│   │   └── upvoteApi.ts
│   ├── components/
│   │   └── Comment.tsx
│   │   └── CommentForm.tsx
│   │   └── Feed.tsx
│   │   └── FeedForm.tsx
│   │   └── Layout.tsx
│   │   └── Header.tsx
│   ├── pages/
│   │   └── CreatePage.tsx
│   │   └── Detail.tsx
│   │   └── Home.tsx
│   │   └── Login.tsx
│   │   └── MyPage.tsx
│   │   └── Signup.tsx
│   │   └── UpdatePage.tsx
│   ├── providers/
│   │   └── AuthProvider.ts
│   │   └── QueryProvider.ts
│   ├── stores/
│   │   └── useAuthStore.ts
│   ├── utils/
│   │   └── supabase.ts
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── .eslintrc.cjs
├── .gitignore
├── .env.local
├── postcss.config.js
├── tailwind.config.js
├── index.html
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── package.json
├── README.md
└── vite.config.js
└── yarn.lock

## Trouble Shooting
*
1. 문제:
2. 원인:
3. 해결: 
