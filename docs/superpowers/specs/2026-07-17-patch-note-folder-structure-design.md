# Patch note per-version folder structure

## Problem

`assets/patch/` currently stores patch note content as flat files keyed by
a manually-typed `<version>_<date>` id: `1.0.0_20260519.ko.md`,
`1.0.0_20260519.en.md`, plus a same-directory thumb image
(`v1_0_0.jpg`) referenced by relative path from frontmatter. Adding a
new patch note means inventing a new id, remembering to suffix both
language files with it, and dropping images in the same flat directory
as everything else. The user wants each release to live in its own
folder, split by language, with a dedicated place for images, so future
releases follow one obvious, repeatable shape.

## Directory structure

```
assets/patch/
  manifest.json          # ["v1.0.0"] — release folder names, newest first
  v1.0.0/
    ko/
      patch.md
    en/
      patch.md
    image/
      v1_0_0.jpg
```

- The folder name is the release id used both in `manifest.json` and to
  build fetch URLs. It does not need to match `version:` in frontmatter
  exactly, but for v1.0.0 it does (`v1.0.0` folder ↔ `version: v1.0.0`).
- `ko/patch.md` and `en/patch.md` are the only content files per
  language — no version/date in the filename, since the folder already
  scopes both.
- `image/` holds any images the release's frontmatter or body references
  (today: just the card thumbnail); the frontmatter `thumb:` field
  becomes a path into this folder, e.g. `assets/patch/v1.0.0/image/v1_0_0.jpg`.

## Code changes

`js/main.js`, `loadPatchReleases(lang)` (the only place that constructs
the per-release fetch URL): change

```js
fetch("assets/patch/" + id + "." + lang + ".md")
```

to

```js
fetch("assets/patch/" + id + "/" + lang + "/patch.md")
```

`fetchPatchManifest()`, `parsePatchMd()`, `patchDetailHTML()`, and
routing (`patchSlug()`, URL hash `#v1-0-0`) are unaffected — they only
ever see the manifest array and the parsed frontmatter/body, neither of
which changes shape. The URL hash keys off `version:` in frontmatter,
not the folder name, so it's untouched.

## Content migration (v1.0.0)

- Move `assets/patch/1.0.0_20260519.ko.md` → `assets/patch/v1.0.0/ko/patch.md`
- Move `assets/patch/1.0.0_20260519.en.md` → `assets/patch/v1.0.0/en/patch.md`
- Move `assets/patch/v1_0_0.jpg` → `assets/patch/v1.0.0/image/v1_0_0.jpg`
- Update `thumb:` in both moved `.md` files from `assets/patch/v1_0_0.jpg`
  to `assets/patch/v1.0.0/image/v1_0_0.jpg`
- Update `assets/patch/manifest.json` from `["1.0.0_20260519"]` to `["v1.0.0"]`

## Adding a future release (documented outcome, not built now)

Create `assets/patch/v<X.Y.Z>/{ko,en}/patch.md` and
`assets/patch/v<X.Y.Z>/image/*`, then prepend `"v<X.Y.Z>"` to
`manifest.json`. No code changes needed.

## Out of scope

- No change to `parsePatchMd`'s grammar (already extended separately).
- No change to how `thumb`/other frontmatter fields are interpreted —
  still plain paths inserted as-is into `src`/`href` attributes.
- No tooling/script to scaffold new release folders — YAGNI until a
  second release actually needs one.
