# Patch Note Format Extension + v1.0.0 Content Update Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extend the patch-note markdown-lite parser/renderer to support multi-paragraph text, `##`-style groups, `#` section headings and `---` dividers, then replace the v1.0.0 ko/en patch note content with the new App Store launch announcement using this extended format.

**Architecture:** `js/main.js` owns a small custom parser (`parsePatchMd`) and renderer (`patchDetailHTML`) for `assets/patch/*.md` files. We extend the parser's body-walking loop to emit an ordered sequence of typed nodes (`rule`, `section`, `group`) instead of a flat group array, and change `intro`/`outro` from single joined strings to arrays of paragraphs. The renderer walks the new node sequence and paragraph arrays to produce the same HTML shape as before, plus two new elements. Content files are then rewritten against the new grammar.

**Tech Stack:** Vanilla JS (ES5-style, no build step), plain CSS, static `.md` content files fetched at runtime.

## Global Constraints

- No build step — `js/main.js` is loaded directly by the browser; keep ES5-compatible syntax (`var`, no arrow functions) consistent with the rest of the file.
- Existing `[ Label ]` bracket group syntax must keep working unchanged (used by future simple patch notes).
- All patch-note text goes through `esc()` before insertion — no raw HTML in `.md` content.
- Cache-busting query strings (`?v=NN`) on `css/styles.css` and `js/main.js` must be bumped in all 5 HTML files (`index.html`, `patch-notes.html`, `privacy.html`, `terms.html`, `oss-license.html`) whenever those files change, per existing site convention.
- `assets/patch/manifest.json` and frontmatter fields (`version`, `date`, `tag`, `summary`, `thumb`) are unchanged — only extending body grammar and replacing body content.

---

### Task 1: Extend `parsePatchMd` to emit multi-paragraph intro/outro and an ordered body node sequence

**Files:**
- Modify: `js/main.js:48-114` (function `parsePatchMd`)

**Interfaces:**
- Produces: `parsePatchMd(text)` now returns `{ version, date, tag, summary, thumb, cardTitle, intro: string[], body: Array<{type:"rule"}|{type:"section",title:string}|{type:"group",label:string,items:Array<string|{text:string,items:string[]}>}>, outro: string[] }`. Previous callers used `rel.intro` (string), `rel.groups` (array of `{label,items}`), `rel.outro` (string) — Task 2 updates the only consumer (`patchDetailHTML`).

- [ ] **Step 1: Replace the `parsePatchMd` function body**

Replace the whole function (lines 48-114) with:

```javascript
  function parsePatchMd(text) {
    var lines = text.replace(/\r\n/g, "\n").split("\n");
    var meta = {};
    var i = 0;
    if (lines[0] && lines[0].trim() === "---") {
      for (i = 1; i < lines.length; i++) {
        if (lines[i].trim() === "---") { i++; break; }
        var m = lines[i].match(/^([A-Za-z]+):\s*(.*)$/);
        if (m) meta[m[1].trim()] = m[2].trim();
      }
    }

    var body = lines.slice(i);
    while (body.length && body[0].trim() === "") body.shift();

    var introParas = [];
    var outroParas = [];
    var nodes = [];      // {type:"rule"} | {type:"section",title} | {type:"group",label,items}
    var current = null;  // current group node, for bullet attachment
    var mode = "intro";  // "intro" -> "body" -> "outro"
    var paraBuf = [];

    function flushPara(target) {
      if (paraBuf.length) { target.push(paraBuf.join(" ")); paraBuf = []; }
    }

    body.forEach(function (line) {
      var trimmed = line.trim();

      if (trimmed === "") {
        if (mode === "intro") flushPara(introParas);
        else if (mode === "outro") flushPara(outroParas);
        return;
      }

      if (mode !== "outro") {
        if (trimmed === "---") {
          flushPara(introParas);
          nodes.push({ type: "rule" });
          mode = "body";
          current = null;
          return;
        }
        var section = trimmed.match(/^#\s+(.+)$/);
        if (section) {
          flushPara(introParas);
          nodes.push({ type: "section", title: section[1] });
          mode = "body";
          current = null;
          return;
        }
        var group = trimmed.match(/^\[\s*(.+?)\s*\]$/) || trimmed.match(/^##\s+(.+)$/);
        if (group) {
          flushPara(introParas);
          current = { type: "group", label: group[1], items: [] };
          nodes.push(current);
          mode = "body";
          return;
        }
        var bullet = line.match(/^(\s*)-\s+(.*)$/);
        if (bullet && mode === "body" && current) {
          var indent = bullet[1].length;
          var itemText = bullet[2];
          var last = current.items[current.items.length - 1];
          if (indent >= 2 && last) {
            if (typeof last === "string") {
              last = { text: last, items: [] };
              current.items[current.items.length - 1] = last;
            }
            last.items.push(itemText);
          } else {
            current.items.push(itemText);
          }
          return;
        }
      }

      if (mode === "intro") {
        paraBuf.push(trimmed);
      } else {
        mode = "outro";
        current = null;
        paraBuf.push(trimmed);
      }
    });

    flushPara(mode === "outro" ? outroParas : introParas);

    return {
      version: meta.version || "",
      date: meta.date || "",
      tag: meta.tag || "",
      summary: meta.summary || "",
      thumb: meta.thumb || "",
      cardTitle: meta.title || "",
      intro: introParas,
      body: nodes,
      outro: outroParas,
    };
  }
```

- [ ] **Step 2: Sanity-check the parser in isolation with Node**

The function has no DOM dependency, so it can be exercised directly. Run:

```bash
node -e '
var fs = require("fs");
var src = fs.readFileSync("js/main.js", "utf8");
var m = src.match(/function parsePatchMd[\s\S]*?\n  }\n/);
eval(m[0].replace(/^  /, ""));
var sample = [
  "---",
  "version: v1.0.0",
  "date: test",
  "---",
  "Para one line one.",
  "Para one line two.",
  "",
  "Para two.",
  "",
  "---",
  "",
  "# Big Section",
  "",
  "## (1) Group A",
  "- item a1",
  "- item a2",
  "",
  "## (2) Group B",
  "- item b1",
  "",
  "Feedback: test@example.com"
].join("\n");
console.log(JSON.stringify(parsePatchMd(sample), null, 2));
'
```

Expected: JSON output with `intro: ["Para one line one. Para one line two.", "Para two."]`, `body` containing one `rule` node, one `section` node (`title: "Big Section"`), then two `group` nodes (`label: "(1) Group A"` and `"(2) Group B"`, each with their bullet items), and `outro: ["Feedback: test@example.com"]`.

- [ ] **Step 3: Commit**

```bash
git add js/main.js
git commit -m "$(cat <<'EOF'
패치노트 파서에 다단락/섹션헤더/구분선 문법 추가

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 2: Update `patchDetailHTML` to render the new node/paragraph shapes

**Files:**
- Modify: `js/main.js:178-199` (function `patchDetailHTML`, plus add two small helpers next to `patchChangeGroup`)

**Interfaces:**
- Consumes: `parsePatchMd` output from Task 1 — `rel.intro: string[]`, `rel.body: Array<node>`, `rel.outro: string[]`, plus unchanged `rel.thumb`, `rel.date`, `rel.cardTitle`, `rel.version`.
- Consumes: existing `patchChangeGroup(label, items)` (unchanged, `js/main.js:170-176`) and `esc(str)` (`js/main.js:324`).
- Produces: `patchDetailHTML(rel, p)` returns the same overall HTML shape as before (back-link, article, thumb, title, date, rule, intro paragraphs, `.changelog` div, outro paragraphs), now supporting multiple intro/outro `<p>`s and interleaved section/rule/group nodes inside `.changelog`.

- [ ] **Step 1: Add two helper functions right after `patchChangeGroup` (currently ending at `js/main.js:176`)**

Insert immediately after the closing `}` of `patchChangeGroup`:

```javascript
  function patchParagraphs(paras, className) {
    return (paras || []).map(function (t) {
      return '<p class="' + className + '">' + esc(t) + '</p>';
    }).join("");
  }

  function patchBodyHTML(body) {
    return (body || []).map(function (node) {
      if (node.type === "rule") return '<hr class="patch-article__divider">';
      if (node.type === "section") {
        return '<h2 class="patch-article__section-title">' + esc(node.title) + '</h2>';
      }
      return patchChangeGroup(node.label, node.items);
    }).join("");
  }
```

- [ ] **Step 2: Replace the body of `patchDetailHTML`**

Replace (was lines ~178-199):

```javascript
  function patchDetailHTML(rel, p) {
    var groups = (rel.groups || []).map(function (g) {
      return patchChangeGroup(g.label, g.items);
    }).join("");
    var intro = rel.intro ? '<p class="release__intro">' + esc(rel.intro) + '</p>' : "";
    var outro = rel.outro ? '<p class="release__outro">' + esc(rel.outro) + '</p>' : "";
    var thumb = rel.thumb
      ? '<div class="patch-article__thumb"><img src="' + esc(rel.thumb) + '" alt=""></div>' : "";
    var metaLine = rel.date
      ? '<p class="patch-article__date">' + esc(rel.date) + '</p>' : "";
    return '' +
      '<a class="back-link" href="#" data-patch-back><span aria-hidden="true">&lt;</span> <span>' + esc(p.backToList || "") + '</span></a>' +
      '<article class="patch-article">' +
        thumb +
        '<h1 class="patch-article__title">' + esc(rel.cardTitle || rel.version) + '</h1>' +
        metaLine +
        '<hr class="patch-article__rule">' +
        intro +
        '<div class="changelog">' + groups + '</div>' +
        outro +
      '</article>';
  }
```

with:

```javascript
  function patchDetailHTML(rel, p) {
    var intro = patchParagraphs(rel.intro, "release__intro");
    var outro = patchParagraphs(rel.outro, "release__outro");
    var thumb = rel.thumb
      ? '<div class="patch-article__thumb"><img src="' + esc(rel.thumb) + '" alt=""></div>' : "";
    var metaLine = rel.date
      ? '<p class="patch-article__date">' + esc(rel.date) + '</p>' : "";
    return '' +
      '<a class="back-link" href="#" data-patch-back><span aria-hidden="true">&lt;</span> <span>' + esc(p.backToList || "") + '</span></a>' +
      '<article class="patch-article">' +
        thumb +
        '<h1 class="patch-article__title">' + esc(rel.cardTitle || rel.version) + '</h1>' +
        metaLine +
        '<hr class="patch-article__rule">' +
        intro +
        '<div class="changelog">' + patchBodyHTML(rel.body) + '</div>' +
        outro +
      '</article>';
  }
```

- [ ] **Step 3: Grep for any other reader of `rel.groups` / `rel.intro` / `rel.outro` as strings**

```bash
grep -n "\.groups\b\|rel\.intro\|rel\.outro" js/main.js
```

Expected: only the (now-updated) `patchDetailHTML` references remain; no other call site treats `intro`/`outro` as a string or reads `.groups`.

- [ ] **Step 4: Commit**

```bash
git add js/main.js
git commit -m "$(cat <<'EOF'
패치노트 렌더러가 다단락/섹션헤더/구분선을 표시하도록 갱신

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 3: Add CSS for the new section heading and divider, and make paragraph spacing multi-paragraph-safe

**Files:**
- Modify: `css/styles.css:1190-1197` (`.release__intro`, `.release__outro`)
- Modify: `css/styles.css` (insert new rules after `.patch-article__rule`, i.e. after line 1188)

**Interfaces:**
- Consumes: class names produced by Task 2 — `release__intro`, `release__outro` (now possibly repeated), `patch-article__section-title`, `patch-article__divider`.

- [ ] **Step 1: Insert new rules after `.patch-article__rule` (after `css/styles.css:1188`)**

```css
.patch-article__section-title {
  margin: 8px 0 2px;
  font-family: var(--sans);
  font-size: 22px;
  font-weight: 700;
  color: var(--navy);
}
.patch-article__divider {
  border: 0;
  border-top: 1px solid var(--line);
  margin: 4px 0 8px;
}
```

- [ ] **Step 2: Replace `.release__intro` / `.release__outro` (currently `css/styles.css:1190-1197`) to handle repeated paragraphs**

Replace:

```css
.release__intro { margin: 0 0 28px; color: var(--ink); font-weight: 600; font-size: 17px; }
.release__outro {
  margin: 32px 0 0;
  padding-top: 18px;
  border-top: 1px solid var(--line);
  color: var(--ink-soft);
  font-size: 15px;
}
```

with:

```css
.release__intro { margin: 0 0 14px; color: var(--ink); font-weight: 400; font-size: 16px; line-height: 1.7; }
.release__intro:first-of-type { font-weight: 600; font-size: 17px; }
.release__intro:last-of-type { margin-bottom: 28px; }
.release__outro {
  margin: 0;
  color: var(--ink-soft);
  font-size: 15px;
  line-height: 1.7;
}
.release__outro:first-of-type {
  margin-top: 32px;
  padding-top: 18px;
  border-top: 1px solid var(--line);
}
```

(A single-paragraph intro/outro — the common case — renders identically to before: `:first-of-type` and `:last-of-type` both match the same lone `<p>`.)

- [ ] **Step 3: Bump cache-busting version numbers in all 5 HTML files**

```bash
sed -i '' 's/css\/styles.css?v=108/css\/styles.css?v=109/; s/js\/main.js?v=30/js\/main.js?v=31/' index.html patch-notes.html privacy.html terms.html oss-license.html
grep -n "styles.css?v=\|main.js?v=" index.html patch-notes.html privacy.html terms.html oss-license.html
```

Expected: every match shows `styles.css?v=109` and `main.js?v=31`.

- [ ] **Step 4: Commit**

```bash
git add css/styles.css index.html patch-notes.html privacy.html terms.html oss-license.html
git commit -m "$(cat <<'EOF'
패치노트 섹션헤더/구분선 스타일 추가, 캐시 버전 갱신

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 4: Replace v1.0.0 Korean patch note content

**Files:**
- Modify: `assets/patch/1.0.0_20260519.ko.md` (full body replacement; frontmatter unchanged)

**Interfaces:**
- Consumes: grammar from Task 1 (`---` divider, `# Title` section, `## (n) Label` groups, `- ` bullets, blank-line paragraphs).

- [ ] **Step 1: Replace the file content**

```markdown
---
version: v1.0.0
date: 2026.05.19
tag: 정식 출시
summary: 첫 iOS 정식 출시!
thumb: assets/patch/v1_0_0.jpg
---
안녕하세요, 라온픽셀즈(LaonPixels) 입니다.

드디어 'Drag & Shot: Basketball Arcade' 가 App Store에 정식 출시되었습니다!

플레이해 주시는 모든 분들께 진심으로 감사드리며, 보내주시는 소중한 의견을 바탕으로 더욱 완성도 높은 게임이 될 수 있도록 꾸준히 개선해 나가겠습니다.

앞으로도 새로운 맵과 다양한 콘텐츠, 편의성 개선 등 지속적인 업데이트를 준비하고 있으니 많은 관심과 응원 부탁드립니다.

Google Play 스토어에서도 곧 만나보실 수 있도록 준비 중입니다.

감사합니다!

---

# 신규 콘텐츠

## (1) 신규 맵 및 스테이지
- Forest를 포함한 2개의 맵, 총 42개의 스테이지가 추가되었습니다.
- 다음 맵은 이전 맵의 21개 스테이지를 모두 클리어하면 해금됩니다.

## (2) 튜토리얼
- 처음 플레이하는 분들을 위해 조작 방법을 단계별로 안내하는 튜토리얼이 추가되었습니다.

## (3) 캐릭터
- Tyler, Chris, Kyle 중 원하는 캐릭터를 선택하여 플레이할 수 있습니다.
- 각 캐릭터는 Power, Accuracy, Concentration 능력치가 서로 달라 다양한 플레이 스타일을 경험할 수 있습니다.
- Power: 공을 던지는 힘을 나타냅니다. 수치가 높을수록 공을 더 멀리, 더 강하게 던질 수 있습니다.
- Accuracy: 슛의 정확도를 나타냅니다. 수치가 높을수록 드래그 궤적이 더 길게 표시되어 더욱 정확한 슛이 가능합니다.
- Concentration: 슛을 안정적으로 성공시키는 능력입니다. 수치가 높을수록 슛 실수를 할 확률이 감소합니다.
- 캐릭터가 실수하는 경우, 공을 던질 때 화면 상단에 느낌표(!)가 표시되며, 설정한 파워에서 ±10 범위의 랜덤한 파워로 공을 던집니다.

## (4) 설정
- BGM 및 효과음(SFX) 볼륨, 드래그 파워 표시 여부 등 다양한 게임 옵션을 자유롭게 변경할 수 있습니다.
- 한국어, 영어, 일본어를 포함한 총 8개 언어를 지원합니다.
- 추후 업데이트를 통해 더욱 다양한 언어를 지원할 예정입니다.
- 게임 내에서 FAQ, 개인정보 처리방침, 이용약관, 오픈소스 라이선스를 확인할 수 있습니다.
- FAQ, 개인정보 처리방침 및 이용약관은 공식 웹사이트에서도 확인하실 수 있습니다.

## (5) 기타
- 게임 내에서 최신 패치 노트를 확인할 수 있습니다.

피드백은 laonpixels@gmail.com 으로 보내주세요.
```

- [ ] **Step 2: Commit**

```bash
git add assets/patch/1.0.0_20260519.ko.md
git commit -m "$(cat <<'EOF'
v1.0.0 한국어 패치노트를 App Store 정식 출시 공지 내용으로 교체

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 5: Replace v1.0.0 English patch note content (translation)

**Files:**
- Modify: `assets/patch/1.0.0_20260519.en.md` (full body replacement; frontmatter unchanged)

**Interfaces:**
- Consumes: same grammar as Task 4.

- [ ] **Step 1: Replace the file content**

```markdown
---
version: v1.0.0
date: May 19, 2026
tag: Initial release
summary: First official iOS release!
thumb: assets/patch/v1_0_0.jpg
---
Hello, this is LaonPixels.

'Drag & Shot: Basketball Arcade' has finally officially launched on the App Store!

We sincerely thank everyone who plays, and we'll keep improving the game based on your valuable feedback to make it even more polished.

We're also preparing continuous updates going forward — new maps, more content, and quality-of-life improvements — so please stay tuned and keep supporting us.

We're also preparing to bring the game to the Google Play Store soon.

Thank you!

---

# New Content

## (1) New Maps & Stages
- 2 maps including Forest have been added, for a total of 42 stages.
- The next map unlocks once you clear all 21 stages of the previous map.

## (2) Tutorial
- A step-by-step tutorial has been added to guide first-time players through the controls.

## (3) Characters
- Choose your character from Tyler, Chris, and Kyle.
- Each character has different Power, Accuracy, and Concentration stats, letting you experience a variety of play styles.
- Power: how hard you throw the ball. The higher this stat, the farther and stronger you can throw.
- Accuracy: how precise your shots are. The higher this stat, the longer your drag trajectory is shown, allowing for more precise shots.
- Concentration: how reliably you land your shots. The higher this stat, the lower the chance of a shooting mistake.
- When a character makes a mistake, an exclamation mark (!) appears at the top of the screen as the ball is thrown, and the ball is thrown with a random power within ±10 of the power you set.

## (4) Settings
- Freely adjust various game options, including BGM and sound effect (SFX) volume and whether the drag power indicator is shown.
- Supports a total of 8 languages, including Korean, English, and Japanese.
- More languages will be supported in future updates.
- You can check the FAQ, Privacy Policy, Terms of Service, and open-source licenses in-game.
- The FAQ, Privacy Policy, and Terms of Service are also available on our official website.

## (5) Other
- You can check the latest patch notes in-game.

Send feedback to laonpixels@gmail.com.
```

- [ ] **Step 2: Commit**

```bash
git add assets/patch/1.0.0_20260519.en.md
git commit -m "$(cat <<'EOF'
v1.0.0 영어 패치노트를 App Store 정식 출시 공지 내용으로 교체

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 6: Manual verification in the browser

**Files:** none (verification only)

**Interfaces:**
- Consumes: `devserver.py` (repo root) to serve the static site locally.

- [ ] **Step 1: Start the dev server**

```bash
python3 devserver.py &
```

Expected: prints a local URL (e.g. `http://localhost:8000` — check `devserver.py` output for the actual port).

- [ ] **Step 2: Open the patch notes detail page and inspect rendering**

Navigate to `http://localhost:<port>/patch-notes.html#v1-0-0`. Confirm:
- Multiple intro paragraphs render as separate lines with visible spacing, first paragraph slightly bolder.
- A horizontal divider appears after "감사합니다!" / "Thank you!".
- "신규 콘텐츠" / "New Content" appears as a larger heading above the five numbered groups.
- Each of the 5 groups renders its label as a bullet-group heading with its bullets underneath (character stat bullets included).
- The feedback line renders as a single outro paragraph below the changelog, with the top border/spacing it had before.
- Toggle KO/EN with the language switcher and confirm the English version mirrors the same structure.

- [ ] **Step 3: Stop the dev server**

```bash
kill %1
```

- [ ] **Step 4: Report verification result to the user**

State explicitly what was checked and what rendered correctly (or any visual issue found and fixed before moving on) — per the project's verification-before-completion practice, do not claim the update is done without having actually looked at the rendered page.
