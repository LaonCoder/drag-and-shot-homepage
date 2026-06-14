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
      sub: "벽에 튕기고 장애물을 넘어, 불가능해 보이는 슛에 도전하세요!<br>짜릿한 트릭샷의 재미를 경험해 보세요.",
      ctaPlay: "맵 보기",
      ctaDownload: "지금 바로 다운로드",
    },
    features: {
      title: "매 스테이지마다 펼쳐지는 새로운 도전",
      desc: "수십 가지의 개성 넘치는 스테이지와 다양한 장애물들이 기다립니다.<br>창의적인 플레이로 당신만의 트릭샷을 완성해보세요.",
    },
    gallery: {
      prev: "이전 화면",
      next: "다음 화면",
    },
    stages: {
      title: "계속해서 추가되는 다양한 맵",
      desc: "업데이트를 통해 추가되는 맵들을 만나보세요.<br>자세한 내용은 패치 노트를 참고해주세요.",
    },
    faq: {
      title: "자주 묻는 질문",
      desc: "플레이어들이 가장 많이 궁금해하는 내용을 확인해보세요.",
      items: [
        { q: "게임은 어떻게 조작하나요?", a: "농구공을 누른 채 원하는 방향의 반대로 드래그한 뒤 놓으면, 드래그한 거리에 비례한 힘으로 공이 날아갑니다. 드래그 중에는 예상 궤적이 점선으로 표시되니, 이를 참고해 각도와 힘을 조절하세요." },
        { q: "드래그를 시작했는데 던지고 싶지 않아요. 취소할 수 있나요?", a: "네. 드래그한 손가락을 공이 있던 위치로 다시 가져간 뒤 손을 떼어 보세요. 예상 궤적이 표시되지 않는 상태에서 손을 떼면 공은 던져지지 않습니다." },
        { q: "사운드를 조절하거나 언어를 변경할 수 있나요?", a: "네. 설정 메뉴에서 배경음악(BGM)과 효과음(SFX)의 볼륨을 각각 0~100%까지 조절할 수 있습니다. 또한 게임 언어도 변경할 수 있으며, 현재 한국어와 영어를 포함한 다국어를 지원하고 있습니다. 단, 이미지에 포함된 텍스트는 영어로 표시되므로 이용에 참고해 주세요." },
        { q: "별 3개를 받으려면 어떻게 해야 하나요?", a: "스테이지마다 정해진 점수 기준을 달성하면 별을 하나씩 획득할 수 있습니다. 별 획득에 필요한 점수는 스테이지마다 다릅니다." },
        { q: "점수를 획득하려면 어떻게 해야 하나요?", a: "점수는 다양한 상황에서 획득할 수 있습니다. 깔끔한 슛을 성공시키거나, 강한 파워로 공을 던지거나, 장애물과 상호작용하면 추가 점수를 얻을 수 있습니다. 최고의 트릭샷으로 높은 점수에 도전해 보세요." },
        { q: "별을 한 개만 받아도 다음 스테이지로 넘어갈 수 있나요?", a: "네. 획득한 별 개수와 관계없이 스테이지를 클리어하면 다음 스테이지가 즉시 해금됩니다. 별은 기록과 도전을 위한 수집 요소이며, 게임 진행에는 영향을 주지 않습니다. 또한 추후 업데이트를 통해 별을 활용한 다양한 콘텐츠를 추가할 예정입니다." },
        { q: "어떻게 하면 다음 맵으로 넘어갈 수 있나요?", a: "현재 맵의 모든 스테이지를 클리어하면 다음 맵이 해금됩니다. 'Coming Soon'으로 표시된 맵은 앞으로 추가될 신규 콘텐츠입니다. 새로운 맵과 콘텐츠를 꾸준히 추가할 예정이니 기대해 주세요!" },
        { q: "'Coming Soon'으로 표시된 맵은 언제 나오나요?", a: "가능하면 1~2개월마다 새로운 맵을 업데이트하려고 노력하고 있습니다. 혼자 개발하고 있어 업데이트에 시간이 조금 걸릴 수 있지만, 열심히 만들고 있으니 조금만 기다려 주세요!" },
      ],
    },
    contact: {
      title: "문의하기",
      desc: "게임에 대하여 더 궁금한 점이 있다면 <a href=\"mailto:laonpixels@gmail.com\">laonpixels@gmail.com</a>으로 언제든 문의해주세요 :)",
    },
    download: {
      title: "지금 바로 다운로드하세요",
      desc: "원하는 플랫폼에서 무료로 다운로드하고 첫 트릭샷에 도전해 보세요.",
      note: "* 출시 플랫폼 및 일정은 지역에 따라 다를 수 있습니다.",
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
        { h: "9. 문의처", body: "<p>개인정보 관련 문의는 아래로 연락해 주시기 바랍니다.</p><p><strong>이메일:</strong> laonpixels@gmail.com</p>" },
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
          outro: "피드백은 laonpixels@gmail.com 으로 보내주세요.",
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
      sub: "Bounce off walls, clear obstacles, and go for shots that look impossible!<br>Feel the thrill of pulling off the perfect trick shot.",
      ctaPlay: "See Maps",
      ctaDownload: "Download",
    },
    features: {
      title: "A New Challenge Unfolds in Every Stage",
      desc: "Dozens of distinctive stages and a variety of obstacles await you.<br>Bring your creative plays to life and craft your own perfect trick shot.",
    },
    gallery: {
      prev: "Previous screen",
      next: "Next screen",
    },
    stages: {
      title: "More Maps, Always on the Way",
      desc: "Meet new maps added through updates.<br>Check the patch notes for details.",
    },
    faq: {
      title: "FAQ",
      desc: "Check out what players ask about the most.",
      items: [
        { q: "How do I control the game?", a: "Press and hold the basketball, drag in the opposite direction of where you want to shoot, then release — the ball launches with power proportional to how far you dragged. While dragging, a dotted line shows the expected trajectory, so use it to fine-tune your angle and power." },
        { q: "I started dragging but don't want to shoot. Can I cancel?", a: "Yes. Just drag your finger back to the ball's original position and release. If the trajectory preview disappears before you let go, the ball won't be launched." },
        { q: "Can I adjust the sound or change the language?", a: "Yes. In the settings menu, you can adjust the background music (BGM) and sound effects (SFX) volume independently from 0–100%. You can also change the game language — Korean, English and more are currently supported. Note that text embedded in images is shown in English." },
        { q: "How do I get 3 stars?", a: "Each stage has its own score thresholds, and you earn one star for every threshold you reach. The score required for each star varies by stage." },
        { q: "How do I earn points?", a: "Points can be earned in many ways. Landing a clean shot, throwing the ball with high power, or interacting with obstacles all give you bonus points. Try your best trick shots to chase a high score." },
        { q: "Can I move on with just 1 star?", a: "Yes. As soon as you clear a stage, the next one unlocks immediately, regardless of how many stars you earned. Stars are a collectible for tracking your records and challenges and don't affect your progress. More star-based content is planned for future updates." },
        { q: "How do I unlock the next map?", a: "Clearing every stage on your current map unlocks the next one. Maps marked 'Coming Soon' are new content planned for the future — stay tuned as we keep adding new maps and content!" },
        { q: "When will the maps marked 'Coming Soon' be released?", a: "We aim to release a new map roughly every 1–2 months. Since this game is being developed solo, updates may take a little time, but we're working hard on it — thanks for your patience!" },
      ],
    },
    contact: {
      title: "Contact",
      desc: "If you have any questions about the game, feel free to reach out anytime at <a href=\"mailto:laonpixels@gmail.com\">laonpixels@gmail.com</a> :)",
    },
    download: {
      title: "Download right now",
      desc: "Download free on your favorite platform and take your first trick shot.",
      note: "* Launch platforms and timing may vary by region.",
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
        { h: "9. Contact", body: "<p>For privacy inquiries, please reach us at:</p><p><strong>Email:</strong> laonpixels@gmail.com</p>" },
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
          outro: "Send feedback to laonpixels@gmail.com.",
        },
      ],
    },
  },
};
