# 유가 정보 파트너, OILMAP

배포: https://oilmap.vercel.app <br />
Test ID: test123@test.co.kr <br />
Test PW: test123 <br />

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
│    ├── fonts
│    └── images
│        └── icon
│             .
│             .
└── src
│    ├── lib
│    │     └── components
│    │     │    ├── common
│    │     │    │    └── Header.svelte
│    │     │    ├── history
│    │     │    ├── home
│    │     │    └── stations
│    │     ├── firebase
│    │     ├── js
│    │     ├── store
│    │     └── styles
│    ├── routes
│    │     ├── (api)
│    │     │    └── api
│    │     ├── (gnb1)
│    │     │    ├── home
│    │     │    │    ├── +page.server.js
│    │     │    │    └── +page.svelte   
│    │     │    ├── favorites
│    │     │    ├── map
│    │     │    ├── news
│    │     │    ├── prices
│    │     │    ├── profile
│    │     │    ├── settings
│    │     │    ├── signup
│    │     │    └── +layout.svelte
│    │     ├── (gnb2)
│    │     │    ├── history
│    │     │    │    ├── +page.server.js
│    │     │    │    └── +page.svelte
│    │     │    ├── stations
│    │     │    └── +layout.svelte
│    │     ├── +page.server.js
│    │     └── +page.svelte
│    ├── app.html
└──  └── hooks.server.js
```

<br />

## 페이지별 기능
|로그인|로그아웃|
|------|--------|
|![image](https://github.com/user-attachments/assets/32d4ad98-9337-4a2e-a18c-cbab44dc11b9)|![Honeycam 2025-06-23 14-11-46](https://github.com/user-attachments/assets/920dc779-3ed2-4c58-bf44-f21bfae7e3fc)
|이메일 및 깃허브 로그인|로그인 후 홈 화면에서 로그아웃|

|홈|관심 주유소|
|--|-----------|
|![image](https://github.com/user-attachments/assets/9bca7151-da21-4513-a98a-2fe6b1a15f30)|![Honeycam 2025-06-23 14-14-05](https://github.com/user-attachments/assets/df2ddfd1-21e2-4cea-a09f-a03b11ac6733)|
|로그인 후 홈 화면|홈 관심 주유소 리스트 및 관심 취소|

|주유소|주유소 상세|
|------|-----------|
|![Honeycam 2025-06-23 13-39-03](https://github.com/user-attachments/assets/e8c8bf24-41fe-4576-97a2-4ba747372b97)|![Honeycam 2025-06-23 13-43-01](https://github.com/user-attachments/assets/b3e62e3d-d220-4236-8518-fe15b64a47ce)|
|위치 기반 주유소 추천 및 카카오 맵 출력|카카오 맵 핀 클릭 및 리스트 클릭 시 주유소 상세 출력, 관심 주유소 추가 삭제 기능

|주유소 검색(주유소명)|주유소 검색(필터)|
|---------------------|-----------------|
|![Honeycam 2025-06-23 13-45-03](https://github.com/user-attachments/assets/dc5c6c35-9af0-4558-b1f1-832daa4a53cd)|![Honeycam 2025-06-23 14-03-57](https://github.com/user-attachments/assets/b227ed0b-c4fd-4563-82c1-6515b82d3203)|
|주유소명 검색 및 결과 출력|유종, 거리별, 정렬 필터 결과 출력|

|주유 기록|신규 주유 기록|
|---------|--------------|
|![image](https://github.com/user-attachments/assets/e58dfb08-7dd5-47e7-b762-ed700014d29d)|![Honeycam 2025-06-23 14-05-44](https://github.com/user-attachments/assets/97813b0b-a8bc-4601-a6ef-bcad855e4bb4)|
|입력한 주유 기록 히스토리|신규 주유 정보 기록하기|

|주유 기록 수정|주유 기록 삭제|
|--------------|--------------|
|![Honeycam 2025-06-23 14-07-34](https://github.com/user-attachments/assets/4645b859-2117-4f8a-991c-06e2d8ab7185)|![Honeycam 2025-06-23 14-08-16](https://github.com/user-attachments/assets/7b9f3394-7edb-4ba9-863e-6f933c9fcc07)|
|입력한 주유 기록 수정하기|주유 기록 삭제하기|




