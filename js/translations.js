/* =========================================================================
   TRICK SHOT — translation dictionary
   Embedded as a global object (not fetched) so the site works from file://
   too. To add a language: copy a block, translate values, then add a button
   in the language toggle (see README).
   ========================================================================= */
window.TS_I18N = {
  /* ===================================================================== */
  /* Korean                                                                */
  /* ===================================================================== */
  ko: {
    meta: {
      titleHome:    "TRICK SHOT — 드래그하고 골인! 물리 기반 트릭샷",
      titlePrivacy: "개인정보 처리방침 — TRICK SHOT",
      titlePatch:   "패치 노트 — TRICK SHOT",
    },
    nav: {
      stages: "맵", faq: "FAQ", patch: "패치 노트",
      download: "다운로드", privacy: "개인정보", home: "홈",
      menuOpen: "메뉴 열기", menuClose: "메뉴 닫기",
    },
    hero: {
      tagline: "TAP AND DRAG TO SHOOT",
      sub: "공을 드래그해 골대에 넣어라! 물리 기반 농구 트릭샷 퍼즐. Forest와 Small Town, 두 가지 테마 맵에서 42개의 스테이지에 도전하세요.",
      ctaPlay: "맵 보기",
      ctaDownload: "지금 바로 다운로드",
    },
    features: {
      eyebrow: "WHY TRICK SHOT",
      title: "단순하지만 깊이 있는 재미",
      desc: "누구나 1초 만에 시작할 수 있지만, 완벽한 슛을 위해선 수백 번의 도전이 필요합니다.",
      items: [
        { icon: "touch",   title: "드래그 슈팅",      desc: "공을 탭하고 드래그해 방향과 파워를 조절하세요. 흰 점선 궤적으로 예상 경로를 확인하며 완벽한 슛을 노려라." },
        { icon: "physics", title: "실감나는 물리엔진", desc: "중력·마찰·반발력이 모두 적용된 리얼한 물리 시뮬레이션. 버섯·스프링·벽에 공이 현실적으로 반응한다." },
        { icon: "stage",   title: "42개 스테이지",    desc: "Forest와 Small Town, 두 가지 테마 맵에 각 21개 스테이지. 독창적인 장애물이 가득하다." },
        { icon: "bonus",   title: "다양한 보너스",     desc: "PERFECT SHOT·동물 히트·코인 수집으로 보너스 점수 획득. 3스타 달성을 목표로 도전하라." },
      ],
    },
    stages: {
      eyebrow: "MAPS",
      title: "현재 추가된 맵",
      desc: "좌우로 넘겨 두 가지 테마 맵을 확인하세요. 각 맵에는 21개 스테이지가 있습니다!",
      stagesLabel: "스테이지",
      more: "지금 다운로드",
      swipeHint: "← 좌우로 스와이프 →",
      items: [
        {
          id: "forest",
          name: "Forest",
          subtitle: "숲속 농구 코트",
          stageCount: 21,
          description: "자연 속 숲 배경의 21개 스테이지. 개구리·나비·다람쥐 같은 동물을 맞히고, 버섯 반사판·거미줄·바람 장애물을 헤쳐나가라.",
          tags: ["동물 보너스", "바람 장애물", "자연 지형"],
        },
        {
          id: "smalltown",
          name: "Small Town",
          subtitle: "골목길 농구 코트",
          stageCount: 21,
          description: "도심 배경의 21개 스테이지. 회전하는 금속 파이프·스프링·바람 블로워·엘리베이터·고층 빌딩 등 도시 장치를 극복하라.",
          tags: ["기계 장치", "스프링 반사", "도심 구조물"],
        },
      ],
    },
    faq: {
      eyebrow: "FAQ",
      title: "자주 묻는 질문",
      desc: "궁금한 점이 더 있다면 언제든 문의해 주세요.",
      items: [
        { q: "어떻게 슛을 하나요?", a: "화면에서 농구공을 탭한 뒤 원하는 방향으로 드래그하세요. 흰색 점선으로 예상 궤적을 확인할 수 있습니다. 드래그가 길수록 파워가 강해지며, 손가락을 떼면 공이 발사됩니다." },
        { q: "별점은 어떻게 얻나요?", a: "스테이지 클리어 시 획득 점수에 따라 1~3개의 별을 받습니다. 골 품질(PERFECT SHOT +10,000 / GREAT SHOT +3,000 / GOOD SHOT +1,000), MAX POWER(+1,500), 코인 수집(+1,000), 장애물 보너스 등이 합산됩니다. 3스타 기준은 스테이지별로 3,000~4,000점입니다." },
        { q: "시도 횟수에 제한이 있나요?", a: "각 스테이지마다 5번의 시도 기회가 있습니다. 공이 골대에 들어가지 못하거나 경계 밖으로 나가면 시도 횟수가 차감됩니다. 코인과 장애물은 매 시도마다 초기화됩니다." },
        { q: "보너스 점수는 어떻게 얻나요?", a: "코인 수집(+1,000), 개구리·오일통·병 맞추기(각 +1,000), 거미 맞추기(+1,500), 다람쥐 맞추기(+2,000), 나비·참새 연속 히트(+500×n), 스프링 반사(+500) 등 다양한 방법으로 추가 점수를 얻을 수 있습니다." },
        { q: "바람이 있는 스테이지는 어떻게 하나요?", a: "바람이 있는 스테이지에서는 흰 점선 궤적과 실제 경로가 달라집니다. 점선은 바람이 없을 때의 이상적인 경로이므로 바람 방향을 고려해 조준을 보정하세요. 일부 스테이지에서는 바람이 주기적으로 켜지고 꺼지므로 타이밍을 맞추면 유리합니다." },
        { q: "스테이지는 순서대로 해야 하나요?", a: "네, 이전 스테이지를 클리어해야 다음 스테이지가 잠금 해제됩니다. 클리어 기록은 기기에 자동 저장됩니다." },
      ],
    },
    download: {
      eyebrow: "DOWNLOAD",
      title: "지금 바로 시작하세요",
      desc: "원하는 플랫폼에서 무료로 다운로드하고 첫 트릭샷에 도전해 보세요.",
      note: "* 출시 플랫폼 및 일정은 지역에 따라 다를 수 있습니다.",
      stores: {
        ios:     { small: "App Store에서",  big: "App Store" },
        android: { small: "다운로드",        big: "Google Play" },
        steam:   { small: "이용 가능",       big: "Steam" },
      },
    },
    footer: {
      desc: "공을 드래그해 골대에 넣어라! 물리 기반 농구 트릭샷 퍼즐 TRICK SHOT.",
      gameTitle: "게임",
      supportTitle: "지원",
      legalTitle: "정책",
      linkFeatures: "특징", linkStages: "맵", linkDownload: "다운로드",
      linkFaq: "FAQ", linkContact: "문의하기", linkPatch: "패치 노트",
      linkPrivacy: "개인정보 처리방침", linkTerms: "이용약관",
      rights: "© 2026 TRICK SHOT. All rights reserved.",
      langLabel: "언어",
    },
    privacy: {
      title: "개인정보 처리방침",
      subtitle: "TRICK SHOT은 이용자의 개인정보를 소중히 다룹니다.",
      back: "홈으로 돌아가기",
      updated: "최종 수정일: 2026년 5월 31일",
      sections: [
        { h: "1. 개요", body: "<p>TRICK SHOT 개발자(이하 &#8216;개발자&#8217;)는 이용자의 개인정보를 소중히 여기며 관련 법령을 준수합니다. 본 방침은 앱 이용 과정에서 개인정보가 어떻게 처리되는지 안내합니다.</p>" },
        { h: "2. 수집하는 정보", body: "<p>TRICK SHOT은 최소한의 정보만을 수집합니다.</p><ul><li><strong>기기 저장 정보:</strong> 스테이지 클리어 여부, 별점 기록 등 게임 진행 상황은 기기 내부에만 저장되며 외부 서버로 전송되지 않습니다.</li><li><strong>문의 정보(선택):</strong> 고객 문의 시 이메일 주소 및 문의 내용</li></ul>" },
        { h: "3. 정보의 이용 목적", body: "<ul><li>게임 진행 상황 저장 및 복원</li><li>앱 오류 개선 및 서비스 품질 향상</li><li>고객 문의 응대</li></ul>" },
        { h: "4. 정보의 공유 및 제3자 제공", body: "<p>개발자는 이용자의 개인정보를 제3자에게 판매하거나 제공하지 않습니다. 앱은 외부 서버와 통신하지 않으며, 모든 게임 데이터는 기기 내에 로컬로 저장됩니다.</p>" },
        { h: "5. 데이터 보관 기간", body: "<p>게임 진행 데이터는 이용자가 앱을 삭제할 때까지 기기에 보관됩니다. 앱 삭제 시 모든 로컬 데이터가 함께 삭제됩니다. 고객 문의 기록은 응대 완료 후 1년 이내에 파기됩니다.</p>" },
        { h: "6. 아동의 개인정보", body: "<p>TRICK SHOT은 계정 시스템이 없고 개인정보 수집이 최소화되어 있어 아동도 안전하게 이용할 수 있습니다.</p>" },
        { h: "7. 이용자의 권리", body: "<p>이용자는 앱을 삭제함으로써 모든 로컬 게임 데이터를 즉시 삭제할 수 있습니다. 기타 개인정보 관련 문의는 아래 문의처로 연락해 주세요.</p>" },
        { h: "8. 정책의 변경", body: "<p>본 방침은 서비스 변경에 따라 수정될 수 있으며, 변경 시 앱 내 공지 또는 본 페이지를 통해 사전 안내합니다.</p>" },
        { h: "9. 문의처", body: "<p>개인정보 관련 문의는 아래로 연락해 주시기 바랍니다.</p><p><strong>이메일:</strong> jiseok212@gmail.com</p>" },
      ],
    },
    patch: {
      title: "패치 노트",
      subtitle: "TRICK SHOT의 최신 업데이트 소식을 확인하세요.",
      back: "홈으로 돌아가기",
      legend: { new: "추가 사항", imp: "개선", fix: "수정", issue: "알려진 이슈" },
      releases: [
        {
          version: "v1.0.0", date: "2026.05.19", tag: "정식 출시",
          intro: "안녕하세요. 첫 정식 출시 버전입니다.",
          groups: [
            { type: "new", items: [
              "Small Town 맵 21개 스테이지",
              "Forest 맵 21개 스테이지",
              "인트로 컷씬 + 타이틀 화면",
              "스테이지 클리어 / 실패 결과 화면 + 별 점수 시스템",
              "사운드: 배경 ambient, 충돌 SFX, UI / 결과 / 폭죽 사운드",
              "Forest 스테이지 1 첫 진입 튜토리얼",
            ] },
          ],
          knownIssues: ["일부 디바이스에서 오디오 초기 로드 시 짧은 hitch 발생 가능"],
          outro: "피드백은 jiseok212@gmail.com 으로 보내주세요.",
        },
      ],
    },
  },

  /* ===================================================================== */
  /* English                                                               */
  /* ===================================================================== */
  en: {
    meta: {
      titleHome:    "TRICK SHOT — Drag, aim, and swish!",
      titlePrivacy: "Privacy Policy — TRICK SHOT",
      titlePatch:   "Patch Notes — TRICK SHOT",
    },
    nav: {
      stages: "Maps", faq: "FAQ", patch: "Patch Notes",
      download: "Download", privacy: "Privacy", home: "Home",
      menuOpen: "Open menu", menuClose: "Close menu",
    },
    hero: {
      tagline: "TAP AND DRAG TO SHOOT",
      sub: "Drag the ball, aim for the hoop. A physics-based basketball trick-shot puzzle. Take on 42 stages across two themed maps: Forest and Small Town.",
      ctaPlay: "See Maps",
      ctaDownload: "Download",
    },
    features: {
      eyebrow: "WHY TRICK SHOT",
      title: "Simple to play, deep to master",
      desc: "Anyone can start in one second — but the perfect shot takes a hundred tries.",
      items: [
        { icon: "touch",   title: "Drag to Shoot", desc: "Tap the ball and drag to set aim and power. A dotted trajectory line shows your arc — release to fire." },
        { icon: "physics", title: "Real Physics",   desc: "Gravity, friction, and restitution all apply. Balls bounce off mushrooms, spring off springs, and get caught in spider webs." },
        { icon: "stage",   title: "42 Stages",      desc: "Two themed maps — Forest and Small Town — each with 21 unique stages packed with creative obstacles." },
        { icon: "bonus",   title: "Bonus System",   desc: "Earn extra points with PERFECT SHOTs, animal hits, and coins. Chase that 3-star rating!" },
      ],
    },
    stages: {
      eyebrow: "MAPS",
      title: "Available Maps",
      desc: "Swipe left and right to explore both themed maps — each with 21 stages!",
      stagesLabel: "Stages",
      more: "Download Now",
      swipeHint: "← swipe to browse →",
      items: [
        {
          id: "forest",
          name: "Forest",
          subtitle: "Forest basketball court",
          stageCount: 21,
          description: "21 stages set in a natural forest. Hit animals like frogs, butterflies and squirrels, and navigate obstacles like mushroom reflectors, spider webs and wind gusts.",
          tags: ["Animal Bonuses", "Wind Obstacles", "Nature Terrain"],
        },
        {
          id: "smalltown",
          name: "Small Town",
          subtitle: "Backstreet basketball court",
          stageCount: 21,
          description: "21 stages set in an urban environment. Overcome rotating metal pipes, springs, wind blowers, elevators and towering buildings.",
          tags: ["Mechanical Traps", "Spring Bounces", "Urban Structures"],
        },
      ],
    },
    faq: {
      eyebrow: "FAQ",
      title: "Frequently asked questions",
      desc: "Still curious? Reach out any time.",
      items: [
        { q: "How do I shoot?", a: "Tap the basketball and drag in the direction you want to aim. The white dotted line shows your expected trajectory. Drag farther for more power, then release to launch." },
        { q: "How do I earn stars?", a: "Stars are based on your score when you clear a stage. Shot quality (PERFECT SHOT +10,000 / GREAT SHOT +3,000 / GOOD SHOT +1,000), MAX POWER (+1,500), coins (+1,000 each) and obstacle bonuses all add up. Three stars typically requires 3,000–4,000 points depending on the stage." },
        { q: "Is there a limit on attempts?", a: "Each stage gives you 5 attempts. If the ball misses the hoop or goes out of bounds, one attempt is deducted. Coins and obstacles reset at the start of each attempt." },
        { q: "How do I earn bonus points?", a: "Collect coins (+1,000), hit frogs, oil barrels or bottles (+1,000 each), hit a spider (+1,500), hit the squirrel (+2,000), chain butterfly or sparrow hits (+500×combo), or bounce off a spring (+500)." },
        { q: "How do I handle wind stages?", a: "The dotted trajectory line shows your path without wind. Account for wind direction when aiming. On some stages wind pulses on and off — timing your shot during a calm window can help." },
        { q: "Do I have to play stages in order?", a: "Yes — you must clear a stage to unlock the next one. Your progress is saved automatically on your device." },
      ],
    },
    download: {
      eyebrow: "DOWNLOAD",
      title: "Get started right now",
      desc: "Download free on your favorite platform and take your first trick shot.",
      note: "* Launch platforms and timing may vary by region.",
      stores: {
        ios:     { small: "Download on the", big: "App Store" },
        android: { small: "GET IT ON",       big: "Google Play" },
        steam:   { small: "AVAILABLE ON",    big: "Steam" },
      },
    },
    footer: {
      desc: "Drag the ball, aim for the hoop. TRICK SHOT, a physics-based basketball trick-shot puzzle.",
      gameTitle: "Game",
      supportTitle: "Support",
      legalTitle: "Legal",
      linkFeatures: "Features", linkStages: "Maps", linkDownload: "Download",
      linkFaq: "FAQ", linkContact: "Contact", linkPatch: "Patch Notes",
      linkPrivacy: "Privacy Policy", linkTerms: "Terms of Service",
      rights: "© 2026 TRICK SHOT. All rights reserved.",
      langLabel: "Language",
    },
    privacy: {
      title: "Privacy Policy",
      subtitle: "TRICK SHOT treats your personal data with care.",
      back: "Back to home",
      updated: "Last updated: May 31, 2026",
      sections: [
        { h: "1. Overview", body: "<p>The developer of TRICK SHOT (the \"App\") is committed to protecting user privacy. This policy explains how information is handled when you use the App.</p>" },
        { h: "2. Information we collect", body: "<p>TRICK SHOT collects only the minimum necessary information.</p><ul><li><strong>On-device storage:</strong> Stage progress, star ratings and game settings are stored locally on your device and are never sent to any external server.</li><li><strong>Inquiry info (optional):</strong> Email address and message content when contacting support.</li></ul>" },
        { h: "3. How we use information", body: "<ul><li>Saving and restoring game progress</li><li>Fixing bugs and improving the App</li><li>Responding to support inquiries</li></ul>" },
        { h: "4. Sharing &amp; third parties", body: "<p>We do not sell or share your personal information with third parties. The App does not communicate with external servers — all game data is stored locally on your device.</p>" },
        { h: "5. Data retention", body: "<p>Game progress data is kept on your device until you delete the App. Uninstalling the App removes all local data immediately. Support correspondence is deleted within one year of resolution.</p>" },
        { h: "6. Children's privacy", body: "<p>TRICK SHOT has no account system and collects minimal data, making it safe for players of all ages.</p>" },
        { h: "7. Your rights", body: "<p>You can delete all local game data at any time by uninstalling the App. For other privacy-related requests, please use the contact below.</p>" },
        { h: "8. Changes to this policy", body: "<p>This policy may be updated when the App changes. We will give advance notice through the App or this page.</p>" },
        { h: "9. Contact", body: "<p>For privacy inquiries, please reach us at:</p><p><strong>Email:</strong> jiseok212@gmail.com</p>" },
      ],
    },
    patch: {
      title: "Patch Notes",
      subtitle: "Catch up on the latest TRICK SHOT updates.",
      back: "Back to home",
      legend: { new: "Additions", imp: "Improved", fix: "Fixed", issue: "Known issues" },
      releases: [
        {
          version: "v1.0.0", date: "May 19, 2026", tag: "Initial release",
          intro: "Hello! This is the first official release.",
          groups: [
            { type: "new", items: [
              "Small Town map — 21 stages",
              "Forest map — 21 stages",
              "Intro cutscene + title screen",
              "Stage clear / fail result screens + star scoring system",
              "Sound: background ambient, collision SFX, UI / result / fireworks sounds",
              "First-entry tutorial on Forest stage 1",
            ] },
          ],
          knownIssues: ["A brief audio hitch may occur on initial sound load on some devices"],
          outro: "Send feedback to jiseok212@gmail.com.",
        },
      ],
    },
  },
};
