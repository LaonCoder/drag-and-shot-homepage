# DRAG & SHOT — 게임 소개 홈페이지

픽셀아트 농구 Drag & Shot 게임 **DRAG & SHOT** 의 소개/마케팅 웹사이트입니다.
순수 HTML/CSS/JS로 만들어졌으며 빌드 과정이 없습니다. `index.html` 을 더블클릭해
바로 열어볼 수 있고, 로컬 서버로도 실행할 수 있습니다.

## 실행 방법

```bash
# 방법 1) 그냥 index.html 더블클릭

# 방법 2) 로컬 서버 (권장)
python3 -m http.server 8000
# → http://localhost:8000 접속
```

> 번역 데이터를 `fetch`(JSON) 대신 JS 전역 객체로 임베드했기 때문에
> `file://` 환경에서도 다국어 전환이 정상 동작합니다.

## 구조

```
.
├── index.html          # 메인 랜딩 (단일 스크롤: 히어로·특징·스테이지·FAQ·다운로드)
├── privacy.html        # 개인정보 처리방침
├── terms.html          # 이용약관
├── oss-license.html    # 오픈소스 라이선스
├── patch-notes.html    # 패치 노트
├── css/styles.css      # 디자인 토큰 + 전체 스타일 + 반응형
├── js/
│   ├── translations.js # 한/영 번역 + 콘텐츠(스테이지·FAQ·패치노트·개인정보)
│   ├── i18n.js         # 언어 전환 엔진 (data-i18n 적용, localStorage 저장)
│   └── main.js         # 메뉴·아코디언·스크롤 리빌·동적 콘텐츠 렌더링
└── assets/
    ├── fonts/          # 픽셀 폰트 (NeoDunggeunmo, Galmuri11/Bold)
    ├── game/           # 게임 아트 (히어로·스테이지·파티클·스토어 배지 등)
    ├── patch/          # 패치 노트 썸네일
    └── screenshots/    # 스크린샷
```

## 콘텐츠 교체하기

거의 모든 텍스트와 목록 데이터는 **`js/translations.js`** 한 파일에 모여 있습니다.

- 스테이지 / FAQ / 패치 노트 / 개인정보 항목은 `stages.items`, `faq.items`,
  `patch.releases`, `privacy.sections` 배열을 수정하면 화면에 바로 반영됩니다.
- 헤더/푸터/히어로 등 고정 문구는 해당 키(`nav.*`, `hero.*`, `footer.*` 등)의 값을 바꾸면 됩니다.
- 스토어 다운로드 링크는 `index.html` 의 `.store-btn` 의 `href="#"` 를 실제 URL로 교체하세요.

HTML에서 `data-i18n="섹션.키"` 속성이 붙은 요소는 자동으로 번역됩니다.
속성 번역은 `data-i18n-attr`, 리치 텍스트(HTML)는 `data-i18n-html` 을 사용합니다.

## 언어 추가하기

1. `js/translations.js` 의 `ko` 블록을 복사해 새 언어 코드(예: `ja`)로 붙여넣고 값을 번역합니다.
2. 각 페이지의 언어 토글(`.lang-toggle`)에 버튼을 추가합니다:
   ```html
   <button type="button" data-lang-btn="ja" aria-pressed="false">JA</button>
   ```

언어 결정 우선순위: `localStorage` → 브라우저 언어 → 기본값(`ko`).

## 디자인 토큰

색상·폰트·그림자 등은 `css/styles.css` 상단 `:root` 의 CSS 변수로 정의되어 있어
한 곳에서 전체 톤을 조정할 수 있습니다. 폰트는 Press Start 2P(영문 픽셀),
Galmuri11(한글 픽셀), Pretendard(본문)를 CDN으로 불러옵니다.
