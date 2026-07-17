# Patch note format extension + v1.0.0 content update

## Problem

`assets/patch/*.md` files use a small custom markdown-like format parsed by
`parsePatchMd()` in `js/main.js`: YAML-ish frontmatter, a single-line intro
paragraph, `[ Group Label ]` bullet groups, and a single-line outro
paragraph. The new v1.0.0 patch note text (App Store launch announcement)
needs:

- a multi-paragraph greeting (blank-line-separated paragraphs)
- a `---` divider
- a top-level section heading ("신규 콘텐츠") grouping several subsections
- numbered subsections ("(1) 신규 맵 및 스테이지", etc.), each with its own
  bullet list
- a closing feedback-email line

None of the multi-paragraph, section-heading, or divider pieces are
supported today. This spec extends the format minimally to cover them,
then replaces the v1.0.0 ko/en content using the extended format.

## Format extension (`parsePatchMd` in `js/main.js`)

Body parsing today walks lines and only recognizes `[ Label ]` group
headers and `- ` bullets; everything else before the first group is
"intro" (joined into one string with spaces) and everything after the
last group is "outro" (same).

Extend to:

1. **Multi-paragraph intro/outro** — `intro` and `outro` become arrays of
   paragraph strings, split on blank lines, instead of single
   space-joined strings. Each renders as its own `<p>`.
2. **`## Label` group syntax** — an alternate, equivalent spelling of
   `[ Label ]` for starting a bullet group. Both produce the same group
   object `{ label, items }`; existing `[ ]` files keep working unchanged.
3. **`# Title` section heading** — a line starting with a single `#`
   (not `##`) before/between groups. Recorded as a `{ type: "section",
   title }` marker in the body's item sequence. Renders as an `<h2>`
   above the group(s) that follow it, until the next `# Title` or the end
   of the groups.
4. **`---` divider** — a line that is exactly `---` in the body (not the
   frontmatter delimiter) is recorded as `{ type: "rule" }` in the
   sequence and renders as an `<hr>`.

To render section headings and dividers in the correct position relative
to groups, `groups` changes from a flat array of group objects to an
ordered array that can also contain section/rule markers; the group
label recognizer stays a flat regex so `[ ]` and `## ` both map to the
same node shape.

## Rendering (`patchDetailHTML` in `js/main.js`)

- `intro`/`outro` arrays render as one `<p class="release__intro">` /
  `release__outro` per paragraph, in order.
- The body sequence (sections, rules, groups) renders in source order
  inside `.changelog`: `{type:"section"}` → `<h2 class="patch-article__section-title">`,
  `{type:"rule"}` → `<hr class="patch-article__divider">`, group nodes →
  existing `patchChangeGroup()` output.
- No change to `patchItemList` (nested bullets already supported).

## CSS (`css/styles.css`)

- `.patch-article__section-title`: heading style sitting above a run of
  `.change-group`s (bigger than `.change-group h4`, matches existing
  patch-article typography scale).
- `.patch-article__divider`: same visual treatment as
  `.patch-article__rule` (reuse if visually identical — a plain
  `<hr>` styled with `var(--line)`).
- `.release__intro`, `.release__outro` already have paragraph margins;
  verify multi-`<p>` output still reads well with existing
  margin/spacing (add `+ p { margin-top: ... }` if paragraphs collide).

## Content plan

`assets/patch/1.0.0_20260519.ko.md` and `.en.md` bodies are fully
replaced (frontmatter `version`/`date`/`tag`/`summary`/`thumb` unchanged)
with:

- Intro: the App Store launch announcement, as separate paragraphs
  (greeting, thank-you, roadmap teaser, Google Play note, closing "감사합니다!").
- `---` divider.
- `# 신규 콘텐츠` section heading.
- Five `## (n) Title` groups: 신규 맵 및 스테이지, 튜토리얼, 캐릭터, 설정, 기타 —
  bullets exactly as provided by the user, including the nested
  Power/Accuracy/Concentration explanation bullets under 캐릭터.
- Outro: `피드백은 laonpixels@gmail.com 으로 보내주세요.` (feedback line from the
  previous version, explicitly requested to be kept).

`en.md` gets a natural English translation of the same structure and
content (not the old 1.0.0 English text — full replacement, same as ko).

The previous `[ 알려진 이슈 ]` (known issues) group is dropped per user
decision (full replace, no known issues in the new copy).

## Out of scope

- No changes to `parsePatchMd`'s frontmatter parsing.
- No support for inline bold/links/etc. — bullets and paragraphs stay
  plain text (existing `esc()` escaping).
- No changes to pagination, card grid, or routing logic.
