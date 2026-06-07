/* =========================================================================
   TRICK SHOT — UI behavior
   Mobile menu · language toggle · FAQ accordion · scroll reveal ·
   and rendering of the collections that live in translations.js
   (stages, FAQ, patch notes, privacy sections) so they re-render on
   language change.
   ========================================================================= */
(function () {
  "use strict";

  var $  = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  /* ---- map art assets (pixel-art sprites copied from the game) ---------- */
  var MAP_ART = {
    forest:    { thumb: "assets/game/map_forest.png",    title: "assets/game/title_forest.png",    skyline: "assets/game/skyline_forest.png" },
    smalltown: { thumb: "assets/game/map_smalltown.png", title: "assets/game/title_smalltown.png", skyline: "assets/game/skyline_smalltown.png" },
  };

  /* ---- renderers -------------------------------------------------------- */
  function renderMaps(lang) {
    var track = $("#stages-grid");
    if (!track) return;
    var s = window.i18n.t("stages", lang);
    track.innerHTML = "";

    s.items.forEach(function (map) {
      var art = MAP_ART[map.id] || {};
      var slide = document.createElement("article");
      slide.className = "map-slide";
      slide.setAttribute("role", "tabpanel");
      slide.innerHTML =
        '<div class="map-slide__art map-slide__art--' + esc(map.id) + '">' +
          (art.skyline ? '<img class="map-slide__skyline px" src="' + art.skyline + '" alt="" aria-hidden="true">' : '') +
          (art.thumb ? '<img class="map-slide__thumb px ball-bounce" src="' + art.thumb + '" alt="" aria-hidden="true" width="60" height="60">' : '') +
          '<span class="map-slide__count">' + esc(String(map.stageCount)) + ' ' + esc(s.stagesLabel) + '</span>' +
        '</div>' +
        '<div class="map-slide__body">' +
          (art.title ? '<img class="map-slide__title px" src="' + art.title + '" alt="">' : '<h3></h3>') +
          '<h3 class="' + (art.title ? 'sr-only' : '') + '"></h3>' +
          (map.subtitle ? '<p class="map-slide__subtitle"></p>' : '') +
          '<p class="map-slide__desc"></p>' +
          '<ul class="map-tags"></ul>' +
        '</div>';
      var titleImg = slide.querySelector(".map-slide__title");
      if (titleImg) titleImg.alt = map.name;
      slide.querySelector("h3").textContent = map.name;
      if (map.subtitle) slide.querySelector(".map-slide__subtitle").textContent = map.subtitle;
      slide.querySelector(".map-slide__desc").textContent = map.description;
      var tagList = slide.querySelector(".map-tags");
      map.tags.forEach(function (tag) {
        var li = document.createElement("li");
        li.className = "map-tag";
        li.textContent = tag;
        tagList.appendChild(li);
      });
      track.appendChild(slide);
    });

    initMapCarousel();
  }

  /* ---- map carousel (swipe left/right between maps) --------------------- */
  var mapIndex = 0;
  function initMapCarousel() {
    var track = $("#stages-grid");
    var dotsWrap = $("#map-dots");
    if (!track) return;
    var slides = $$(".map-slide", track);
    if (!slides.length) return;
    if (mapIndex >= slides.length) mapIndex = slides.length - 1;

    // dots
    if (dotsWrap) {
      dotsWrap.innerHTML = "";
      slides.forEach(function (_, i) {
        var b = document.createElement("button");
        b.type = "button";
        b.className = "map-dot" + (i === mapIndex ? " on" : "");
        b.setAttribute("role", "tab");
        b.setAttribute("aria-label", "Map " + (i + 1));
        b.addEventListener("click", function () { goToMap(i); });
        dotsWrap.appendChild(b);
      });
    }
    applyMapIndex();
  }

  function applyMapIndex() {
    var track = $("#stages-grid");
    if (!track) return;
    track.style.transform = "translateX(" + (-mapIndex * 100) + "%)";
    $$(".map-dot", $("#map-dots")).forEach(function (d, i) {
      d.classList.toggle("on", i === mapIndex);
    });
    var slides = $$(".map-slide", track);
    var prev = $(".map-nav--prev"), next = $(".map-nav--next");
    if (prev) prev.disabled = mapIndex <= 0;
    if (next) next.disabled = mapIndex >= slides.length - 1;
  }

  function goToMap(i) {
    var slides = $$(".map-slide", $("#stages-grid"));
    mapIndex = Math.max(0, Math.min(i, slides.length - 1));
    applyMapIndex();
  }

  function setupMapCarousel() {
    var prev = $(".map-nav--prev"), next = $(".map-nav--next");
    if (prev) prev.addEventListener("click", function () { goToMap(mapIndex - 1); });
    if (next) next.addEventListener("click", function () { goToMap(mapIndex + 1); });

    var viewport = $(".map-viewport");
    if (!viewport) return;

    // pointer/touch swipe
    var startX = 0, dragging = false;
    viewport.addEventListener("pointerdown", function (e) {
      dragging = true; startX = e.clientX;
    });
    viewport.addEventListener("pointerup", function (e) {
      if (!dragging) return;
      dragging = false;
      var dx = e.clientX - startX;
      if (Math.abs(dx) > 40) goToMap(mapIndex + (dx < 0 ? 1 : -1));
    });
    viewport.addEventListener("pointercancel", function () { dragging = false; });

    // keyboard
    viewport.setAttribute("tabindex", "0");
    viewport.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") goToMap(mapIndex - 1);
      else if (e.key === "ArrowRight") goToMap(mapIndex + 1);
    });
  }

  function renderFaq(lang) {
    var list = $("#faq-list");
    if (!list) return;
    var f = window.i18n.t("faq", lang);
    list.innerHTML = "";
    f.items.forEach(function (item, i) {
      var id = "faq-a-" + i;
      var el = document.createElement("div");
      el.className = "faq-item reveal";
      el.innerHTML =
        '<button class="faq-q" aria-expanded="false" aria-controls="' + id + '">' +
          '<span class="faq-q__text"></span><span class="plus" aria-hidden="true">+</span>' +
        '</button>' +
        '<div class="faq-a" id="' + id + '" role="region"><div></div></div>';
      el.querySelector(".faq-q__text").textContent = item.q;
      el.querySelector(".faq-a > div").textContent = item.a;
      list.appendChild(el);
    });
  }

  function renderPatch(lang) {
    var wrap = $("#patch-releases");
    if (!wrap) return;
    var p = window.i18n.t("patch", lang);

    // build the legend from only the change types actually present
    var legend = $("#patch-legend");
    if (legend) {
      var present = {};
      p.releases.forEach(function (rel) {
        (rel.groups || []).forEach(function (g) { present[g.type] = true; });
        if (rel.knownIssues && rel.knownIssues.length) present.issue = true;
      });
      var order = ["new", "imp", "fix", "issue"];
      legend.innerHTML = order
        .filter(function (t) { return present[t] && p.legend[t]; })
        .map(function (t) { return tag(t, p.legend[t]); })
        .join("");
    }

    wrap.innerHTML = "";
    p.releases.forEach(function (rel) {
      var el = document.createElement("section");
      el.className = "release reveal";

      var groups = (rel.groups || []).map(function (g) {
        return changeGroup(g.type, p.legend[g.type], g.items);
      }).join("");

      // known issues render as their own change-group ("issue" type)
      var issues = (rel.knownIssues && rel.knownIssues.length)
        ? changeGroup("issue", p.legend.issue, rel.knownIssues)
        : "";

      var intro = rel.intro
        ? '<p class="release__intro">' + esc(rel.intro) + '</p>' : "";
      var outro = rel.outro
        ? '<p class="release__outro">' + esc(rel.outro) + '</p>' : "";

      el.innerHTML =
        '<div class="release__head">' +
          '<span class="release__ver">' + esc(rel.version) + '</span>' +
          '<span class="release__tag">' + esc(rel.tag) + '</span>' +
          '<span class="release__date">' + esc(rel.date) + '</span>' +
        '</div>' +
        intro +
        '<div class="changelog">' + groups + issues + '</div>' +
        outro;
      wrap.appendChild(el);
    });

    function changeGroup(type, label, items) {
      var lis = items.map(function (it) {
        var li = document.createElement("li");
        li.textContent = it;
        return li.outerHTML;
      }).join("");
      return '' +
        '<div class="change-group">' +
          '<h4><span class="dot dot--' + type + '"></span>' + esc(label) + '</h4>' +
          '<ul>' + lis + '</ul>' +
        '</div>';
    }

    function tag(type, label) {
      return '<span class="legend-item"><span class="dot dot--' + type + '"></span>' + esc(label) + '</span>';
    }
  }

  function renderPrivacy(lang) {
    var doc = $("#privacy-doc");
    if (!doc) return;
    var pv = window.i18n.t("privacy", lang);
    doc.innerHTML = '<p class="updated">' + esc(pv.updated) + '</p>';
    pv.sections.forEach(function (sec) {
      var s = document.createElement("section");
      var h = document.createElement("h2");
      h.textContent = sec.h;
      var body = document.createElement("div");
      body.innerHTML = sec.body; // trusted, authored content
      s.appendChild(h);
      s.appendChild(body);
      doc.appendChild(s);
    });
  }

  function esc(str) {
    return String(str).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function renderAll(lang) {
    renderMaps(lang);
    renderFaq(lang);
    renderPatch(lang);
    renderPrivacy(lang);
    observeReveals();
  }

  /* ---- scroll reveal ---------------------------------------------------- */
  var revealObserver = null;
  function observeReveals() {
    if (!("IntersectionObserver" in window)) {
      $$(".reveal").forEach(function (el) { el.classList.add("in"); });
      return;
    }
    if (!revealObserver) {
      revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            revealObserver.unobserve(e.target);
          }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    }
    $$(".reveal:not(.in)").forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---- header reveal -----------------------------------------------------
     The header starts out showing only the version badge. Once the header's
     bottom edge has scrolled past the hero section's bottom edge, the rest
     of the nav springs into view (and springs back out on the way up). */
  function setupHeaderReveal() {
    var header = $(".site-header");
    var hero = $(".hero");
    if (!header || !hero) return;

    function update() {
      var headerBottom = header.getBoundingClientRect().bottom;
      var heroBottom = hero.getBoundingClientRect().bottom;
      header.classList.toggle("is-revealed", heroBottom <= headerBottom);
    }

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  /* ---- mobile menu ------------------------------------------------------ */
  function setupMenu() {
    var nav = $(".nav");
    var toggle = $(".nav__toggle");
    var menu = $("#mobile-menu");
    if (!toggle || !menu) return;

    function setOpen(open) {
      nav.classList.toggle("is-open", open);
      menu.classList.toggle("is-open", open);
      document.body.classList.toggle("menu-open", open);
      toggle.setAttribute("aria-expanded", String(open));
    }
    toggle.addEventListener("click", function () {
      setOpen(!menu.classList.contains("is-open"));
    });
    // close when a navigation link inside the menu is clicked
    menu.addEventListener("click", function (e) {
      var a = e.target.closest("a");
      if (a) setOpen(false);
    });
    // close on Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });
    // reset when crossing to desktop
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 860) setOpen(false);
    });
  }

  /* ---- FAQ accordion (event delegation) --------------------------------- */
  function setupFaq() {
    document.addEventListener("click", function (e) {
      var btn = e.target.closest(".faq-q");
      if (!btn) return;
      var panel = document.getElementById(btn.getAttribute("aria-controls"));
      var open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!open));
      if (panel) panel.style.maxHeight = open ? "0px" : panel.scrollHeight + 24 + "px";
    });
  }

  /* ---- language toggle (event delegation) ------------------------------- */
  function setupLangToggle() {
    document.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-lang-btn]");
      if (!btn) return;
      window.i18n.setLang(btn.getAttribute("data-lang-btn"));
    });
  }

  /* ---- year stamp ------------------------------------------------------- */
  function stampYear() {
    $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
  }

  /* ---- boot ------------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", function () {
    setupMenu();
    setupFaq();
    setupLangToggle();
    setupHeaderReveal();
    setupMapCarousel();
    stampYear();
    renderAll(window.i18n.getLang());
  });

  // re-render collections + re-apply static strings on language change
  document.addEventListener("languagechange", function (e) {
    renderAll(e.detail.lang);
  });
})();
