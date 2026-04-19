# JSXGraph 프로젝트

Vue 3 + TypeScript + Vite를 기반으로 한 인터랙티브 수학 그래프 시각화 프로젝트입니다.

## 기술 스택

- **Vue 3**: 프론트엔드 프레임워크 (`<script setup>` SFC 사용)
- **TypeScript**: 타입 안정성을 위한 정적 타이핑
- **Vite**: 빠른 개발 서버 및 빌드 도구
- **JSXGraph**: 인터랙티브 수학 그래프 라이브러리
- **Math.js**: 수학 계산 및 수식 처리
- **MathLive**: 수학 입력 편집기
- **Pinia**: Vue 상태 관리 라이브러리

## 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

### 빌드

```bash
npm run build
```

### 빌드 미리보기

```bash
npm run preview
```

## 프로젝트 구조

```text
src/
├── components/    # Vue 컴포넌트
├── composables/   # Vue Composable 함수들
├── data/          # 데이터 파일들
├── utils/         # 유틸리티 함수들
├── type/          # TypeScript 타입 정의
├── App.vue        # 루트 컴포넌트
├── main.ts        # 앱 진입점
└── style.css      # 전역 스타일
```

## 추가 정보

- [Vue 3 Script Setup 문서](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup)
- [Vue TypeScript 가이드](https://vuejs.org/guide/typescript/overview.html#project-setup)
- [JSXGraph 문서](https://jsxgraph.org/)
- [Vite 문서](https://vitejs.dev/)
