# 마운자로그인

마운자로를 통해 만난 환자들의 실제 이야기를 MR의 시각에서 공유하는 플랫폼입니다.

## 기술 스택

- Next.js 15
- React 18
- TypeScript
- Tailwind CSS
- Lucide React

## 설치 및 실행

```bash
# 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
npm start
```

## 배포

Vercel에 자동 배포됩니다.

```
https://mounjalog-in.vercel.app
```

## 프로젝트 구조

```
src/
├── app/
│   ├── page.tsx           # 홈 페이지
│   ├── layout.tsx         # 레이아웃
│   ├── globals.css        # 전역 스타일
│   └── stories/
│       ├── page.tsx       # 이야기 목록
│       └── [id]/
│           └── page.tsx   # 이야기 상세
├── lib/
│   └── stories.ts         # 이야기 데이터
└── data/
    └── stories.json       # JSON 데이터
```

## 라이선스

© 2026 Eli Lilly Korea
