# ToolBox Frontend

ToolBox 프로젝트의 프론트엔드 서버입니다.

## 서버 정보

- 개발 서버 (베타): https://dev.hoowave.org
- 실제 서버: https://hoowave.org (예정)
- API 서버:
  - 개발 환경: https://api-dev.hoowave.org
  - 프로덕션 환경: https://api.hoowave.org

## 주요 기능

### 1. URL 단축 서비스
- 긴 URL을 짧고 기억하기 쉬운 링크로 변환
- 안전하고 신뢰할 수 있는 URL 단축 서비스 제공
- 광고, 회원가입 없이 즉시 사용 가능

### 2. API 요청 테스트
- API 엔드포인트를 쉽고 빠르게 테스트
- 다양한 HTTP 메소드와 파라미터 지원
- 실시간 요청/응답 확인

### 3. 문의하기
- 서비스 이용 중 궁금하신 점이나 불편사항 문의
- 빠른 답변과 피드백 제공
- 사용자 의견 수렴 및 개선

## 특징

- **간편한 사용**: 광고, 회원가입 없이 바로바로 사용 가능
- **개인정보 보호**: 어떠한 개인정보도 수집하지 않음
- **익명 이용**: 모든 기능을 익명으로 자유롭게 이용 가능
- **사용자 후기**: 서비스 사용 후기 및 별점 평가 가능 (비회원 포함)

## 기술 스택

- Frontend: React, TypeScript, Tailwind CSS
- Backend: Spring Boot
- Database: MySQL
- 기타: Framer Motion, CKEditor

## 개발 환경 설정

### 필수 요구사항

- Node.js 18 이상
- npm 9 이상

### 설치 및 실행

```bash
# 프로젝트 클론
git clone https://github.com/hoowave/toolbox-frontend.git
cd toolbox-frontend

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

## 프로젝트 구조

```
src/
├── components/     # 재사용 가능한 컴포넌트
├── contexts/      # React Context 관련 파일
├── pages/         # 페이지 컴포넌트
├── services/      # API 서비스
├── types/         # TypeScript 타입 정의
└── utils/         # 유틸리티 함수
```

## 연관 프로젝트

- 백엔드: [toolbox-backend](https://github.com/hoowave/toolbox-backend)

## 주의사항

- 현재 베타 버전으로 운영중입니다. 기능이 정상적으로 작동하지 않을 수 있습니다.
- 본 서비스를 사용함에 있어 모든 책임은 개인에게 있습니다.
