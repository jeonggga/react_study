# React Study Project Summary

이 문서는 `react_study` 폴더 내의 React 학습 프로젝트들에 대한 요약입니다.

## 📂 프로젝트 구조 및 내용

### 1. [section01](./section01)

- **주제**: React 기초 (Getting Started)
- **내용**: Create React App을 이용한 기본 프로젝트 구조 파악 및 간단한 실행 테스트.

### 2. [section02](./section02)

- **주제**: React 컴포넌트와 Hooks 기초
- **내용**:
  - `Button`, `Counter`, `Register` 등의 다양한 컴포넌트 실습.
  - React Hooks (`useState`, `useRef`)의 기본 사용법.
  - Custom Hook (`useInput`) 만들어보기.

### 3. [section03](./section03)

- **주제**: Props와 State (데이터 흐름)
- **내용**:
  - `Controller`와 `Viewer` 컴포넌트를 분리하여 데이터가 어떻게 흐르는지 실습.
  - Counter 앱을 구조화하여 Props 전달 연습.

### 4. [section04](./section04)

- **주제**: 실전 프로젝트 1 - 할 일 관리 앱 (Todo List)
- **내용**:
  - 기본적인 CRUD (생성, 조회, 수정, 삭제) 기능이 포함된 투두 리스트 구현.
  - `App`, `Editor`, `List`, `TodoItem` 등으로 컴포넌트 구조화.

### 5. [section05](./section05)

- **주제**: React 최적화
- **내용**:
  - 할 일 관리 앱을 기반으로 렌더링 최적화 실습.
  - `useMemo`, `useCallback`, `React.memo` 등을 활용하여 불필요한 렌더링 방지.

### 6. [section06](./section06)

- **주제**: 복잡한 상태 관리 (useReducer)
- **내용**:
  - `useState` 대신 `useReducer`를 사용하여 상태 관리 로직을 컴포넌트 외부로 분리.
  - 상태 업데이트 로직을 `reducer` 함수 하나로 모듈화하여 관리.

### 7. [section07](./section07)

- **주제**: React 복습 및 응용 예제
- **내용**:
  - **쇼핑카트 (Shopping Cart)**: 상품 목록과 장바구니 기능 구현.
  - **연락처 목록 (Contact List)**: 연락처 추가 및 리스트 출력.
  - `section04`~`06`에서 배운 내용을 종합하여 복습 및 응용.

## 📝 참고 사항

- 각 섹션(folder)은 독립적인 Vite 또는 CRA 프로젝트로 구성되어 있습니다.
- 실행하려면 해당 폴더로 이동 후 `npm install` 및 `npm run dev` (또는 `npm start`)를 실행하세요.
