# FlightSim

간단한 3D 비행 데모


## 무엇을 할 수 있나요?

- 키보드로 비행기를 조작하고(상하좌우, 요, 가속/감속) 체크포인트를 통과합니다.
- HUD와 사운드가 포함된 간단한 게임 플레이를 체험할 수 있습니다.

## 기술 스택(요약)

- 클라이언트: React, TypeScript, Vite, Three.js/@react-three/fiber, Tailwind
- 상태/데이터: Zustand, React Query
- 서버: Node.js, Express (Vite 미들웨어 연동)
- 선택적 DB: Drizzle ORM + PostgreSQL (`DATABASE_URL` 필요)

## 빠른 시작

```bash
npm install
npm run dev      # http://localhost:5000
```

빌드/실행:

```bash
npm run build
npm start
```

## 조작 키

- 방향: ArrowUp / ArrowDown / ArrowLeft / ArrowRight
- 요: A / D
- 가속/감속: W / S

## 폴더 개요

- `client/`: React + R3F 클라이언트
- `server/`: Express 서버(개발=HMR, 배포=정적 서빙)
- `shared/`: 스키마 및 공유 타입
