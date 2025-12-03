# ProjectPulse

> 프로젝트/티켓(업무) 상태를 한 눈에 관리하는 개인 사이드 프로젝트  
> React + TypeScript + Spring Boot + PostgreSQL 기반 프로젝트 관리 대시보드

---

## 👀 프로젝트 소개

**ProjectPulse**는 팀/개인 단위의 프로젝트와 티켓(work request)을 관리하고,  
각 프로젝트의 진행 상태와 업무 우선순위를 한 곳에서 볼 수 있도록 만드는 **경량 프로젝트 관리 도구**입니다.

- 프로젝트 상태: `PLANNING / ACTIVE / HOLD / COMPLETED`
- 티켓(업무) 상태: `TO_DO / IN_PROGRESS / DONE / BLOCKED`
- 역할(Role) 기반 접근: `ADMIN / MANAGER / USER`
- 사용자별 그리드 설정, 활동 로그까지 갖춘 **실전형 사이드 프로젝트**

---

## 🧩 기술 스택 (Tech Stack)

### Backend

- **Java 21**
- **Spring Boot 4.x**
- Spring Web / Spring Security (JWT 예정 or 적용)
- DB: **PostgreSQL**
- MyBatis
- Gradle 또는 Maven 빌드

### Frontend

- **React + TypeScript**
- React Router
- Custom Hooks 기반 MVVM 스타일 (`useLoginViewModel`, `useSignUpViewModel` 등)
- 상태 관리: React 내부 상태(Hooks) 위주 (필요 시 추후 전역 상태 도입 예정)
- SCSS: 기본 SCSS

---

## 🧱 주요 기능 (Features)

### 1. 인증/인가 (Auth)

- 로그인 / 회원가입
- 로그인 ID 중복 체크 API
- 로그인 성공 시 사용자 정보 + 토큰을 `sessionStorage`에 저장
  - `USER_KEY`, `TOKEN_KEY` 형태로 관리
- 역할(Role)에 따라 화면/기능 제한 가능 (`ADMIN / MANAGER / USER`)

### 2. 사용자/역할 관리

- `roles` 테이블로 권한(역할) 정의
- `users` 테이블에서 사용자 계정, 상태, 역할 관리
- (옵션) 추후 `positions` 테이블로 “직급/직위” 관리 확장 가능

### 3. 프로젝트 관리 (Projects)

- 프로젝트 생성 / 조회
- 프로젝트 상태:
  - `PLANNING` : 기획 단계
  - `ACTIVE` : 진행 중
  - `HOLD` : 보류
  - `COMPLETED` : 완료
- `owner_id`를 통해 프로젝트 책임자(매니저/PM) 지정
- `project_members` 테이블로 프로젝트별 참여 인원 관리 (N:N 관계)

### 4. 티켓 / 업무 관리 (Work Requests)

- `work_requests` 테이블 기반 업무/이슈 단위 티켓 관리
- 상태:
  - `TO_DO / IN_PROGRESS / DONE / BLOCKED`
- 우선순위:
  - `LOW / MEDIUM / HIGH / CRITICAL`
- 담당자(`assignee_id`)와 생성자(`reporter_id`) 분리
- 프로젝트별, 담당자별, 상태별, 마감일 기준 조회에 대비한 인덱스 설계

### 5. 사용자별 그리드 설정 (Grid Settings)

- `grid_settings` 테이블에서 **사용자별 컬럼 숨김/순서/너비 등의 UI 설정을 JSONB로 저장**
- 페이지별(`page_id`)로 다른 설정값 유지
  - 예: `tickets`, `projects`, `users` 등
- 동일 사용자 + 동일 페이지는 1건만 존재하도록 Unique Index 적용

### 6. 활동 로그 (Activity Logs)

- `activity_logs` 테이블로 다음과 같은 정보 기록:
  - 누가(`user_id`)
  - 어떤 액션을 했는지(`action_type`)
  - 어떤 엔티티에(`entity_type`, `entity_id`)
  - 추가 정보(`metadata`: JSONB)
- 예: 로그인, 프로젝트 생성, 티켓 상태 변경 등 추적 가능

---

## 🚀 실행 방법 (Getting Started)

1. 사전 준비

- Node.js (v18 이상 권장)
- Java 21
- PostgreSQL 설치 및 실행

- DB 생성:

  > CREATE DATABASE TaskFlow;

2. Backend 실행

```
cd backend
# (Gradle 기준 예시)
./gradlew bootRun
# 또는
gradlew.bat bootRun
```

서버 기본 포트: http://localhost:8080

3. Frontend 실행

```
cd Home
npm install
npm run dev
```

---

## 🗄️ 데이터베이스 스키마 개요

> DB: **PostgreSQL**

주요 테이블:

1. `roles`

   - `role_code` (PK): `ADMIN`, `MANAGER`, `USER` 등
   - `name_ko`, `description`, `created_at`

2. `users`

   - `id` (PK, IDENTITY)
   - `login_id` (Unique), `password`, `name`, `phone`
   - `role_code` (FK → roles.role_code)
   - `status` (기본값 `ACTIVE`)
   - `last_login_at`, `created_at`, `updated_at`

3. `projects`

   - `id` (PK)
   - `name`, `description`, `status` (`PLANNING` 기본)
   - `owner_id` (FK → users.id)
   - `created_at`, `updated_at`

4. `project_members`

   - 복합 PK (`project_id`, `user_id`)
   - `role_in_project` (예: PM, Dev, QA)
   - `joined_at`

5. `work_requests`

   - `id` (PK)
   - `project_id` (FK)
   - `title`, `description`
   - `status`, `priority`, `assignee_id`, `reporter_id`, `due_date`
   - `created_at`, `updated_at`

6. `grid_settings`

   - `id` (PK), `user_id` (FK), `page_id`, `settings_json`(JSONB), `updated_at`
   - Unique Index: (`user_id`, `page_id`)

7. `activity_logs`
   - `id` (PK)
   - `user_id` (nullable FK)
   - `action_type`, `entity_type`, `entity_id`, `metadata`(JSONB), `created_at`

---

## 📁 폴더 구조(수정중)

```bash
backend/
 ├ src/main/java/...
 └ build.gradle / pom.xml

frontend/
 ├ src
 │  ├ pages
 │  │   ├ LoginPage.tsx
 │  │   └ SignUpPage.tsx
 │  ├ viewmodels
 │  │   ├ useLoginViewModel.ts
 │  │   └ useSignUpViewModel.ts
 │  ├ components
 │  │   └ common
 │  │       └ AlertPopup.tsx
 │  ├ utils
 │  │   ├ HttpUtil.ts
 │  │   ├ StringUtil.ts
 │  │   └ RouteUtil.ts
 │  ├ const
 │  │   ├ ApiPath.ts
 │  │   └ RoutePath.ts
 │  └ hooks
 │      └ useAuth.ts
 └ package.json
```

## 🔒 인증 흐름 (간단 설명)

1. 사용자가 로그인 폼에서 `loginId`, `password` 입력
2. `useLoginViewModel.submit()` 호출 → `LoginService.login()` → `ApiPath.LOGIN` 요청
3. 성공 시:
   - `LoginResponse` 수신 (`loginId`, `name`, `roleCode`, `token` 등)
   - `AuthStorage.saveUser(user)`로 `sessionStorage`에 사용자 정보/토큰 저장
   - 라우터를 통해 Dashboard로 이동
4. 로그아웃 시:
   - `logout` API(optional) 호출 후
   - `clearUser()`로 저장된 사용자 정보 제거
   - 로그인 화면으로 이동
