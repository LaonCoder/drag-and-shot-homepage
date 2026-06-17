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
      titleTerms:   "이용약관 — TRICK SHOT",
      titlePatch:   "패치 노트 — TRICK SHOT",
    },
    nav: {
      stages: "맵", faq: "FAQ", contact: "문의하기", patch: "패치 노트",
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
      linkOss: "오픈소스 라이센스",
      rights: "© 2026 LaonPixels. All rights reserved.",
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
    terms: {
      title: "이용약관",
      subtitle: "TRICK SHOT 이용에 관한 약관입니다.",
      back: "홈으로 돌아가기",
      updated: "최종 수정일: 2026년 6월 15일",
      sections: [
        { h: "1. 목적 및 약관의 동의", body: "<p>본 약관은 LaonPixels(이하 &#8216;운영자&#8217;)가 제공하는 모바일 게임 TRICK SHOT(이하 &#8216;앱&#8217;)의 이용과 관련하여 운영자와 이용자 간의 권리, 의무 및 책임 사항을 규정함을 목적으로 합니다. 이용자가 앱을 다운로드, 설치 또는 이용하는 경우 본 약관에 동의한 것으로 간주됩니다. 본 약관에 동의하지 않는 경우 앱의 이용을 중단하고 이를 삭제해 주시기 바랍니다.</p>" },
        { h: "2. 약관의 효력 및 우선순위", body: "<p>본 약관은 앱 내 또는 본 페이지에 게시함으로써 효력이 발생합니다. 앱은 Apple App Store, Google Play 등 외부 앱 마켓을 통해 배포되며, 해당 마켓이 정한 이용약관(EULA) 및 정책이 함께 적용됩니다. 본 약관과 각 마켓의 약관이 상충하는 경우, 관련 법령에 반하지 않는 범위에서 이용자에게 유리한 내용이 우선 적용됩니다.</p><p>본 약관에서 정하지 않은 사항은 약관의 규제에 관한 법률, 콘텐츠산업 진흥법, 전자상거래 등에서의 소비자보호에 관한 법률 등 관련 법령 및 상관례에 따릅니다.</p>" },
        { h: "3. 서비스의 내용", body: "<p>TRICK SHOT은 물리 기반의 원터치 농구 트릭샷 퍼즐 게임입니다. 운영자는 서비스 품질 향상을 위하여 게임 콘텐츠(스테이지, 맵, 기능 등)를 추가하거나 변경할 수 있습니다.</p>" },
        { h: "4. 서비스의 변경 및 중단", body: "<p>운영자는 운영상·기술상의 필요에 따라 서비스의 전부 또는 일부를 변경하거나 중단할 수 있습니다. 서비스를 종료하는 경우, 운영자는 관련 법령에 따라 합리적인 기간을 두고 앱 내 공지 또는 본 페이지 등을 통해 사전에 안내합니다. 무료로 제공되는 서비스의 변경·중단으로 인하여 발생한 손해에 대해서는 관련 법령이 정한 경우를 제외하고 책임을 지지 않습니다.</p>" },
        { h: "5. 이용자의 의무", body: "<p>이용자는 다음 각 호의 행위를 하여서는 안 됩니다.</p><ul><li>앱을 역설계, 디컴파일, 디스어셈블하거나 무단으로 수정·배포하는 행위</li><li>비정상적인 방법으로 게임 데이터를 변조하거나 부정한 이익을 취하는 행위</li><li>운영자 또는 제3자의 지식재산권 등 권리를 침해하는 행위</li><li>관련 법령 또는 공공질서·미풍양속에 반하는 목적으로 앱을 이용하는 행위</li></ul>" },
        { h: "6. 이용 제한", body: "<p>이용자가 본 약관 또는 관련 법령을 위반하는 경우, 운영자는 사전 통지 후(긴급하거나 중대한 위반의 경우 통지 없이) 해당 이용자의 서비스 이용을 제한할 수 있습니다. 다만 본 앱은 별도의 계정 시스템 없이 기기 내에서 동작하므로, 이용 제한은 기술적으로 가능한 범위 내에서 적용됩니다.</p>" },
        { h: "7. 결제 및 환불", body: "<p>TRICK SHOT은 현재 무료로 제공됩니다. 추후 인앱 결제 또는 유료 콘텐츠가 도입되는 경우, 결제·청약철회·환불은 전자상거래 등에서의 소비자보호에 관한 법률 등 관련 법령과 결제가 이루어진 앱 마켓(App Store, Google Play 등)의 환불 정책에 따릅니다.</p><p>관련 법령에 따라 보장되는 이용자의 청약철회 및 환불 권리는 본 약관에 의해 제한되지 않습니다.</p>" },
        { h: "8. 게임 데이터 및 가상 아이템", body: "<p>스테이지 진행 상황, 별점 등 게임 데이터는 이용자의 기기 내부에 저장됩니다. 별(star) 등 게임 내 요소는 게임의 진행과 재미를 위한 것으로 현금 등 실제 재산적 가치를 가지지 않으며 환전·양도의 대상이 되지 않습니다.</p><p>이용자는 앱을 삭제함으로써 기기에 저장된 모든 로컬 게임 데이터를 즉시 삭제할 수 있습니다. 앱 삭제 시 게임 진행 데이터는 복구되지 않으며, 개인정보의 처리에 관한 사항은 개인정보 처리방침을 따릅니다.</p>" },
        { h: "9. 지식재산권", body: "<p>앱에 포함된 그래픽, 사운드, 코드, 디자인, 상표 등 모든 콘텐츠에 대한 저작권 및 지식재산권은 운영자 또는 정당한 권리자에게 귀속됩니다. 이용자는 운영자의 사전 서면 동의 없이 이를 복제, 배포, 전송, 2차적 저작물 작성, 상업적으로 이용할 수 없습니다. 일부 오픈소스 구성요소의 라이선스는 별도의 오픈소스 라이센스 페이지에 명시되어 있습니다.</p>" },
        { h: "10. 미성년자의 이용", body: "<p>본 앱은 별도의 계정 생성이나 개인정보 입력 없이 이용할 수 있으며, 전 연령이 안전하게 즐길 수 있도록 설계되었습니다. 추후 유료 결제 기능이 도입될 경우, 미성년자의 결제는 법정대리인의 동의를 받아야 하며, 동의를 받지 못한 결제는 관련 법령에 따라 미성년자 본인 또는 법정대리인이 취소할 수 있습니다.</p>" },
        { h: "11. 면책 조항", body: "<p>앱은 &#8216;있는 그대로(as is)&#8217; 제공되며, 운영자는 앱이 중단이나 오류 없이 작동하거나 특정 목적에 적합함을 보증하지 않습니다. 이용자의 기기 환경, 운영체제 버전 등에 따라 일부 기능이 정상 동작하지 않을 수 있습니다. 다만 본 조항은 관련 법령에 따라 보장되는 소비자의 권리를 배제하지 않습니다.</p>" },
        { h: "12. 책임의 제한", body: "<p>관련 법령이 허용하는 범위 내에서, 운영자는 무료로 제공되는 서비스의 이용 또는 이용 불능으로 인하여 발생한 직접적·간접적·부수적 손해에 대하여 책임을 지지 않습니다. 다만 운영자의 고의 또는 중대한 과실로 인한 손해의 경우에는 그러하지 아니합니다.</p>" },
        { h: "13. 약관의 변경", body: "<p>운영자는 관련 법령을 위반하지 않는 범위에서 본 약관을 개정할 수 있습니다. 약관을 변경하는 경우 변경 내용과 시행일을 명시하여 시행일로부터 상당한 기간 이전에 앱 내 공지 또는 본 페이지를 통해 안내합니다. 이용자에게 불리하거나 중대한 변경의 경우에는 보다 충분한 기간을 두고 별도로 통지합니다. 변경된 약관의 시행일 이후에도 이용자가 앱을 계속 이용하는 경우 변경에 동의한 것으로 봅니다.</p>" },
        { h: "14. 분쟁 해결 및 준거법", body: "<p>본 약관은 대한민국 법률에 따라 규율되고 해석됩니다. 운영자와 이용자 간에 발생한 분쟁은 상호 신의성실의 원칙에 따라 원만히 해결하도록 노력하며, 원만히 해결되지 않는 경우 민사소송법 등 관련 법령에 따른 관할 법원에 소를 제기할 수 있습니다.</p>" },
        { h: "15. 약관의 가분성", body: "<p>본 약관의 일부 조항이 관련 법령에 따라 무효이거나 집행할 수 없는 것으로 판단되더라도, 나머지 조항의 효력에는 영향을 미치지 않습니다.</p>" },
        { h: "16. 운영자 정보 및 문의", body: "<p>서비스 운영자 및 약관 관련 문의처는 다음과 같습니다.</p><p><strong>운영자:</strong> LaonPixels<br><strong>이메일:</strong> laonpixels@gmail.com</p>" },
      ],
    },
    patch: {
      title: "패치 노트",
      subtitle: "TRICK SHOT의 최신 업데이트 소식을 확인하세요.",
      back: "홈으로 돌아가기",
      backToList: "목록으로",
      legend: { new: "추가 사항", imp: "개선", fix: "수정", issue: "알려진 이슈" },
      releases: [
        {
          version: "v1.0.0", date: "2026.05.19", tag: "정식 출시",
          cardTitle: "TRICK SHOT v1.0.0 패치 노트",
          summary: "첫 iOS 정식 출시!",
          thumb: "assets/patch/v1_0_0.jpg",
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
      titleTerms:   "Terms of Service — TRICK SHOT",
      titlePatch:   "Patch Notes — TRICK SHOT",
    },
    nav: {
      stages: "Maps", faq: "FAQ", contact: "Contact", patch: "Patch Notes",
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
      linkOss: "Open-Source Licenses",
      rights: "© 2026 LaonPixels. All rights reserved.",
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
        { h: "4. Sharing & third parties", body: "<p>We do not sell or share your personal information with third parties. The App does not communicate with external servers — all game data is stored locally on your device.</p>" },
        { h: "5. Data retention", body: "<p>Game progress data is kept on your device until you delete the App. Uninstalling the App removes all local data immediately. Support correspondence is deleted within one year of resolution.</p>" },
        { h: "6. Children's privacy", body: "<p>TRICK SHOT has no account system and collects minimal data, making it safe for players of all ages.</p>" },
        { h: "7. Your rights", body: "<p>You can delete all local game data at any time by uninstalling the App. For other privacy-related requests, please use the contact below.</p>" },
        { h: "8. Changes to this policy", body: "<p>This policy may be updated when the App changes. We will give advance notice through the App or this page.</p>" },
        { h: "9. Contact", body: "<p>For privacy inquiries, please reach us at:</p><p><strong>Email:</strong> laonpixels@gmail.com</p>" },
      ],
    },
    terms: {
      title: "Terms of Service",
      subtitle: "The terms that govern your use of TRICK SHOT.",
      back: "Back to home",
      updated: "Last updated: June 15, 2026",
      sections: [
        { h: "1. Purpose and acceptance", body: "<p>These Terms govern the rights, obligations, and responsibilities between LaonPixels (the \"Operator\") and users in connection with the use of the mobile game TRICK SHOT (the \"App\"). By downloading, installing, or using the App, you are deemed to have agreed to these Terms. If you do not agree, please stop using the App and delete it.</p>" },
        { h: "2. Effect and order of priority", body: "<p>These Terms take effect when posted within the App or on this page. The App is distributed through external marketplaces such as the Apple App Store and Google Play, and the end-user license agreement (EULA) and policies set by each marketplace also apply. Where these Terms conflict with a marketplace's terms, the provisions more favorable to the user prevail to the extent not contrary to applicable law.</p><p>Matters not addressed in these Terms are governed by applicable laws and commercial practice, including the Act on the Regulation of Terms and Conditions and consumer-protection laws.</p>" },
        { h: "3. The service", body: "<p>TRICK SHOT is a physics-based, one-touch basketball trick-shot puzzle game. The Operator may add or change game content (stages, maps, features, and so on) to improve the quality of the service.</p>" },
        { h: "4. Modification and discontinuation of the service", body: "<p>The Operator may change or discontinue all or part of the service for operational or technical reasons. If the service is terminated, the Operator will give advance notice through the App or this page within a reasonable period, as required by applicable law. Except where required by law, the Operator is not liable for damages arising from the change or discontinuation of a service provided free of charge.</p>" },
        { h: "5. User responsibilities", body: "<p>You agree not to:</p><ul><li>Reverse-engineer, decompile, disassemble, or modify or distribute the App without authorization</li><li>Tamper with game data through abnormal means or obtain improper benefits</li><li>Infringe the intellectual property or other rights of the Operator or third parties</li><li>Use the App for any purpose contrary to applicable law or public order and morals</li></ul>" },
        { h: "6. Restriction of use", body: "<p>If you violate these Terms or applicable law, the Operator may restrict your use of the service after prior notice (or without notice in cases of urgent or serious violations). As the App operates on your device without a separate account system, such restrictions apply to the extent technically possible.</p>" },
        { h: "7. Payments and refunds", body: "<p>TRICK SHOT is currently provided free of charge. If in-app purchases or paid content are introduced in the future, payment, withdrawal of a purchase, and refunds will follow applicable laws, including consumer-protection laws, and the refund policy of the marketplace where the payment was made (App Store, Google Play, etc.).</p><p>Your statutory rights to withdraw a purchase and obtain a refund are not limited by these Terms.</p>" },
        { h: "8. Game data and virtual items", body: "<p>Game data such as stage progress and star ratings is stored on your device. In-game elements such as stars exist for gameplay and enjoyment, have no real monetary value, and cannot be exchanged for cash or transferred.</p><p>You can delete all local game data stored on your device at any time by uninstalling the App. Game progress is not recoverable after deletion, and the handling of personal data is governed by the Privacy Policy.</p>" },
        { h: "9. Intellectual property", body: "<p>All content in the App — including graphics, sound, code, design, and trademarks — is owned by the Operator or its rightful licensors. You may not reproduce, distribute, transmit, create derivative works from, or commercially exploit it without the Operator's prior written consent. The licenses of certain open-source components are listed separately on the Open-Source Licenses page.</p>" },
        { h: "10. Use by minors", body: "<p>The App can be used without creating an account or entering personal information and is designed to be safe for all ages. If paid features are introduced in the future, purchases by minors must have the consent of a legal guardian, and a purchase made without such consent may be cancelled by the minor or the guardian in accordance with applicable law.</p>" },
        { h: "11. Disclaimer", body: "<p>The App is provided \"as is.\" The Operator does not warrant that the App will operate without interruption or error, or that it is fit for a particular purpose. Some features may not work correctly depending on your device environment or OS version. This clause does not exclude any consumer rights guaranteed under applicable law.</p>" },
        { h: "12. Limitation of liability", body: "<p>To the extent permitted by applicable law, the Operator is not liable for any direct, indirect, or incidental damages arising from the use of, or inability to use, a service provided free of charge. This limitation does not apply to damages caused by the Operator's willful misconduct or gross negligence.</p>" },
        { h: "13. Changes to these terms", body: "<p>The Operator may amend these Terms to the extent not in violation of applicable law. When the Terms are amended, the Operator will state the changes and their effective date and give notice through the App or this page a reasonable period before the effective date. For changes that are unfavorable or material to users, separate notice will be given with a sufficient period. If you continue to use the App after the effective date, you are deemed to have agreed to the changes.</p>" },
        { h: "14. Dispute resolution and governing law", body: "<p>These Terms are governed by and construed under the laws of the Republic of Korea. The Operator and users will endeavor to resolve any dispute amicably in good faith; if a dispute is not resolved, it may be brought before the competent court determined under the Civil Procedure Act and other applicable laws.</p>" },
        { h: "15. Severability", body: "<p>If any provision of these Terms is held invalid or unenforceable under applicable law, the remaining provisions remain in full force and effect.</p>" },
        { h: "16. Operator information and contact", body: "<p>The service operator and the contact for inquiries about these Terms are as follows.</p><p><strong>Operator:</strong> LaonPixels<br><strong>Email:</strong> laonpixels@gmail.com</p>" },
      ],
    },
    patch: {
      title: "Patch Notes",
      subtitle: "Catch up on the latest TRICK SHOT updates.",
      back: "Back to home",
      backToList: "Back to list",
      legend: { new: "Additions", imp: "Improved", fix: "Fixed", issue: "Known issues" },
      releases: [
        {
          version: "v1.0.0", date: "May 19, 2026", tag: "Initial release",
          cardTitle: "TRICK SHOT v1.0.0 Patch Notes",
          summary: "First official iOS release!",
          thumb: "assets/patch/v1_0_0.jpg",
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
