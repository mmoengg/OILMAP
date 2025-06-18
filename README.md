# 유가 정보 파트너, OILMAP

배포: https://oilmap.vercel.app <br />
Test ID: <br />
Test PW: <br />

<br />

## 프로젝트 소개
- OILMAP은 유가 정보가 필요한 사용자에게 쉽고 편리하게 최신 주유소 정보를 제공하고, 개인의 주유 이력을 체계적으로 관리할 수 있는 서비스입니다.
- 사용자의 현재 위치를 기반으로 주변 주유소를 추천하며, 지도에서 각 주유소의 위치와 상세 정보를 직관적으로 확인할 수 있습니다.
- 주유 내역을 기록, 수정, 삭제할 수 있어 자신의 주유 히스토리를 한눈에 파악할 수 있습니다.
- 자주 이용하는 단골 주유소를 관심 등록하여, 해당 주유소의 유가 정보를 빠르게 확인할 수 있습니다.

<br />

## 개발 환경
- Front-end: HTML, Svelte
- Back-end: Firebase
- 버전관리: Github
- 서비스 배포 환경: Vercel
- 디자인: Figma

<br />

## 개발 기술
### Svelte
- Svelte는 컴파일 단계에서 불필요한 코드와 런타임 오버헤드를 제거해, 실제 브라우저에서 매우 빠른 렌더링 속도를 제공합니다. 초기 로딩 속도와 인터랙션 성능이 뛰어나 사용자 경험을 크게 향상시킬 수 있습니다.
- Svelte는 HTML, CSS, JavaScript가 한 파일에 자연스럽게 통합되어, 코드가 깔끔하고 유지보수가 쉬우며, 러닝 커브가 낮아 빠르게 개발에 집중할 수 있습니다.
- 기존 프레임워크와 달리 Svelte는 빌드 시점에 코드를 최적화해서, 런타임에 별도의 프레임워크 코드가 거의 남지 않습니다. 이로 인해 번들 크기가 작고, 불필요한 리소스 낭비가 적습니다.

<br />

## 프로젝트 구조
```
├── README.md
├── vite.config.js
├── svelte.config.js
├── package.json
├── package-lock.json
├── jsconfig.json
├── LICENSE
├── .npmrc
├── .gitignore
│
├── static
│    └── fonts
│    └── images
│        └── icon
│             .
│             .
└── src
     ├── lib
     │     └── components
     │     │    └── common
     │     │    │    └── Header.svelte
     │     │    └── history
     │     │    └── home
     │     │    └── stations
     │     └── firebase
     │     └── js
     │     └── store
     │     └── styles
     ├── routes
     │     └── (api)
     │     │    └── api
     │     └── (gnb1)
     │     │    └── home
     │     │    │    └── +page.server.js
     │     │    │    └── +page.svelte   
     │     │    └── favorites
     │     │    └── map
     │     │    └── news
     │     │    └── prices
     │     │    └── profile
     │     │    └── settings
     │     │    └── signup
     │     │    └── +layout.svelte
     │     └── (gnb2)
     │     │    └── history
     │     │    │    └── +page.server.js
     │     │    │    └── +page.svelte
     │     │    └── stations
     │     │    └── +layout.svelte
     │     └── +page.server.js
     │     └── +page.svelte
     └── app.html
     └── hooks.server.js
```

<br />

## 페이지별 기능



