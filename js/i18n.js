/* =========================================================================
   DRAG & SHOT — i18n engine
   - Resolves nested keys ("nav.stages") from window.TS_I18N[lang]
   - Applies text / HTML / attribute translations across the DOM
   - Persists the choice to localStorage and emits a "languagechange" event
     so dynamic renderers (stages, FAQ, patch notes) can re-render.
   ========================================================================= */
(function () {
  "use strict";

  var STORAGE_KEY = "ts_lang";
  var DEFAULT = "ko";
  var dict = window.TS_I18N || {};
  var supported = Object.keys(dict);

  function pickInitialLang() {
    var saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    if (saved && supported.indexOf(saved) !== -1) return saved;

    var nav = (navigator.language || navigator.userLanguage || DEFAULT)
      .slice(0, 2).toLowerCase();
    if (supported.indexOf(nav) !== -1) return nav;

    return supported.indexOf(DEFAULT) !== -1 ? DEFAULT : supported[0];
  }

  /* Resolve "a.b.c" against the active language table. */
  function resolve(lang, key) {
    var node = dict[lang];
    var parts = key.split(".");
    for (var i = 0; i < parts.length; i++) {
      if (node == null) return undefined;
      node = node[parts[i]];
    }
    return node;
  }

  /* Public lookup helper so other scripts can read strings + collections. */
  function t(key, lang) {
    return resolve(lang || currentLang, key);
  }

  function applyTo(root, lang) {
    root = root || document;

    // text content
    root.querySelectorAll("[data-i18n]").forEach(function (el) {
      var val = resolve(lang, el.getAttribute("data-i18n"));
      if (typeof val === "string") el.textContent = val;
    });

    // raw HTML (lists, <br>, <strong>, …)
    root.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var val = resolve(lang, el.getAttribute("data-i18n-html"));
      if (typeof val === "string") el.innerHTML = val;
    });

    // attributes: data-i18n-attr="aria-label:nav.menuOpen; placeholder:foo.bar"
    root.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      el.getAttribute("data-i18n-attr").split(";").forEach(function (pair) {
        var bits = pair.split(":");
        if (bits.length < 2) return;
        var attr = bits[0].trim();
        var val = resolve(lang, bits[1].trim());
        if (typeof val === "string") el.setAttribute(attr, val);
      });
    });
  }

  var currentLang = pickInitialLang();

  function setLang(lang, opts) {
    if (supported.indexOf(lang) === -1) return;
    currentLang = lang;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}

    document.documentElement.setAttribute("lang", lang);
    applyTo(document, lang);

    // reflect state on any language toggles
    document.querySelectorAll("[data-lang-btn]").forEach(function (btn) {
      btn.setAttribute("aria-pressed", String(btn.getAttribute("data-lang-btn") === lang));
    });

    if (!opts || !opts.silent) {
      document.dispatchEvent(new CustomEvent("languagechange", { detail: { lang: lang } }));
    }
  }

  // Expose a tiny API.
  window.i18n = {
    getLang: function () { return currentLang; },
    setLang: setLang,
    t: t,
    apply: applyTo,
    supported: supported,
  };

  // Apply as early as possible to reduce flash of default language.
  document.documentElement.setAttribute("lang", currentLang);
  document.addEventListener("DOMContentLoaded", function () {
    setLang(currentLang);
  });
})();
