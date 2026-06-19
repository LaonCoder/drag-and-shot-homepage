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

  /* ---- renderers -------------------------------------------------------- */
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
          '<span class="faq-q__text"></span>' +
          '<img src="assets/game/faq_chevron.png" class="px faq-q__icon" alt="" aria-hidden="true" width="7" height="6">' +
        '</button>' +
        '<div class="faq-a" id="' + id + '" role="region"><div></div></div>';
      el.querySelector(".faq-q__text").textContent = item.q;
      el.querySelector(".faq-a > div").textContent = item.a;
      list.appendChild(el);
    });
  }

  function patchSlug(version) {
    return String(version).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }

  function patchChangeGroup(type, label, items) {
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

  function patchDetailHTML(rel, p) {
    var groups = (rel.groups || []).map(function (g) {
      return patchChangeGroup(g.type, p.legend[g.type], g.items);
    }).join("");
    var issues = (rel.knownIssues && rel.knownIssues.length)
      ? patchChangeGroup("issue", p.legend.issue, rel.knownIssues) : "";
    var intro = rel.intro ? '<p class="release__intro">' + esc(rel.intro) + '</p>' : "";
    var outro = rel.outro ? '<p class="release__outro">' + esc(rel.outro) + '</p>' : "";
    var thumb = rel.thumb
      ? '<div class="patch-article__thumb"><img src="' + esc(rel.thumb) + '" alt=""></div>' : "";
    return '' +
      '<a class="back-link" href="#" data-patch-back><span aria-hidden="true">&lt;</span> <span>' + esc(p.backToList || "") + '</span></a>' +
      '<article class="patch-article">' +
        thumb +
        '<h1 class="patch-article__title">' + esc(rel.cardTitle || rel.version) + '</h1>' +
        '<div class="patch-article__meta">' +
          '<span class="release__ver">' + esc(rel.version) + '</span>' +
          (rel.tag ? '<span class="release__tag">' + esc(rel.tag) + '</span>' : '') +
          '<span class="release__date">' + esc(rel.date) + '</span>' +
        '</div>' +
        intro +
        '<div class="changelog">' + groups + issues + '</div>' +
        outro +
      '</article>';
  }

  function routePatch(lang) {
    var list = $("#patch-list");
    var detail = $("#patch-detail");
    if (!list || !detail) return;
    var p = window.i18n.t("patch", lang);
    var hash = (location.hash || "").replace(/^#/, "");
    var rel = null;
    (p.releases || []).forEach(function (r) {
      if (patchSlug(r.version) === hash) rel = r;
    });

    if (rel) {
      detail.innerHTML = patchDetailHTML(rel, p);
      detail.hidden = false;
      list.hidden = true;
      window.scrollTo(0, 0);
    } else {
      detail.hidden = true;
      detail.innerHTML = "";
      list.hidden = false;
    }
    observeReveals();
  }

  // grid shows up to 3 rows per page; columns follow the CSS breakpoints
  // (3 / 2 / 1), so a page holds 9 / 6 / 3 cards depending on viewport width.
  var patchPage = 1;
  function patchPerPage() {
    var w = window.innerWidth;
    var cols = w <= 560 ? 1 : (w <= 920 ? 2 : 3);
    return cols * 3;
  }

  function renderPatchPagination(totalPages) {
    var nav = $("#patch-pagination");
    if (!nav) return;
    if (totalPages <= 1) { nav.innerHTML = ""; nav.hidden = true; return; }
    nav.hidden = false;
    var html = '<button type="button" class="patch-page-btn patch-page-btn--arrow" data-patch-page="' +
      (patchPage - 1) + '"' + (patchPage === 1 ? ' disabled' : '') + ' aria-label="이전 페이지">&lt;</button>';
    for (var i = 1; i <= totalPages; i++) {
      html += '<button type="button" class="patch-page-btn" data-patch-page="' + i + '"' +
        (i === patchPage ? ' aria-current="page"' : '') + '>' + i + '</button>';
    }
    html += '<button type="button" class="patch-page-btn patch-page-btn--arrow" data-patch-page="' +
      (patchPage + 1) + '"' + (patchPage === totalPages ? ' disabled' : '') + ' aria-label="다음 페이지">&gt;</button>';
    nav.innerHTML = html;
  }

  function renderPatchGrid(lang) {
    var grid = $("#patch-grid");
    if (!grid) return;
    var p = window.i18n.t("patch", lang);
    var releases = p.releases || [];
    var perPage = patchPerPage();
    var totalPages = Math.max(1, Math.ceil(releases.length / perPage));
    if (patchPage > totalPages) patchPage = totalPages;
    if (patchPage < 1) patchPage = 1;
    var start = (patchPage - 1) * perPage;
    var pageItems = releases.slice(start, start + perPage);

    grid.innerHTML = "";
    pageItems.forEach(function (rel) {
      var a = document.createElement("a");
      a.className = "patch-card reveal";
      a.href = "#" + patchSlug(rel.version);
      a.innerHTML =
        '<div class="patch-card__thumb">' +
          (rel.thumb ? '<img src="' + esc(rel.thumb) + '" alt="" loading="lazy">' : '') +
        '</div>' +
        '<div class="patch-card__body">' +
          '<h3 class="patch-card__title">' + esc(rel.cardTitle || rel.version) + '</h3>' +
          '<p class="patch-card__summary">' + esc(rel.summary || "") + '</p>' +
          '<span class="patch-card__date">' + esc(rel.date) + '</span>' +
        '</div>';
      grid.appendChild(a);
    });

    renderPatchPagination(totalPages);
    observeReveals();
  }

  function renderPatch(lang) {
    if (!$("#patch-grid")) return;
    renderPatchGrid(lang);
    routePatch(lang);
  }

  function renderDoc(containerId, key, lang) {
    var doc = $(containerId);
    if (!doc) return;
    var data = window.i18n.t(key, lang);
    if (!data || !data.sections) return;
    doc.innerHTML = '<p class="updated">' + esc(data.updated) + '</p>';
    data.sections.forEach(function (sec) {
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

  var currentLang = null;
  function renderAll(lang) {
    currentLang = lang;
    renderFaq(lang);
    renderPatch(lang);
    renderDoc("#privacy-doc", "privacy", lang);
    renderDoc("#terms-doc", "terms", lang);
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

  /* ---- flyer animation (UFO + jet, mirrors game title screen) -----------
     Pass 1 (left→right): UFO only
     Pass 2 (right→left): UFO leads, jet trails behind
     4s pause between passes; loops indefinitely while hero is in view.     */
  function initFlyerAnimation() {
    var ufoEl = $(".hero__flyer--ufo");
    var jetEl = $(".hero__flyer--jet");
    var heroEl = $(".hero");
    if (!ufoEl || !jetEl || !heroEl) return;

    var WAIT_MS = 4000;
    var direction = 1; // +1 = left→right, -1 = right→left
    var rafId = null;
    var timeoutId = null;
    var heroInView = true;

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        heroInView = entries[0].isIntersecting;
        if (!heroInView) {
          if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
          if (timeoutId) { clearTimeout(timeoutId); timeoutId = null; }
          ufoEl.style.display = "none";
          jetEl.style.display = "none";
        } else if (!rafId && !timeoutId) {
          timeoutId = setTimeout(runPass, 800);
        }
      }, { threshold: 0.1 }).observe(heroEl);
    }

    function ufoWidth() { return Math.max(24, Math.min(48, window.innerWidth * 0.045)); }
    function jetWidth() { return Math.max(22, Math.min(44, window.innerWidth * 0.04)); }

    function runPass() {
      timeoutId = null;
      if (!heroInView) return;
      if (rafId) { cancelAnimationFrame(rafId); rafId = null; }

      var vw = window.innerWidth;
      var ufoW = ufoWidth();
      var jetW = jetWidth();
      var gap = Math.max(28, Math.min(60, vw * 0.05)); // wider gap between vehicles
      var speed = vw * 0.0825 * 2.16; // px/sec — same ratio as in-game
      var hasJet = direction < 0;

      // Y: fixed relative to hero section (position: absolute), upper band
      var heroH = heroEl.offsetHeight;
      var yMin = heroH * 0.10;
      var yMax = heroH * 0.32;
      var baseY = yMin + Math.random() * (yMax - yMin);

      // Horizontal: traverse full hero width (= viewport width)
      var startX, endX;
      if (direction > 0) {
        startX = -ufoW;
        endX   = vw + ufoW;
      } else {
        startX = vw + (hasJet ? gap + jetW : 0);
        endX   = -(ufoW + (hasJet ? gap + jetW : 0));
      }

      var durationSec = Math.abs(endX - startX) / speed;

      // Tilt: 1.4 s sine wave, ±5–8° random (matches game)
      var tiltMaxDeg    = 5 + Math.random() * 3;
      var tiltPeriodSec = 1.4;

      // Undulation: vertical sine wave only when jet present (3.5 s, game spec)
      var undulAmp       = hasJet ? Math.max(2, vw / 428 * 3) : 0;
      var undulPeriodSec = 3.5;

      ufoEl.style.display = "block";
      jetEl.style.display = hasJet ? "block" : "none";

      var startTime = null;
      function step(ts) {
        if (!startTime) startTime = ts;
        var elapsed = (ts - startTime) / 1000;
        var t = Math.min(elapsed / durationSec, 1);

        var ufoX    = startX + (endX - startX) * t;
        var tiltDeg = Math.sin(elapsed * 2 * Math.PI / tiltPeriodSec) * tiltMaxDeg;
        var undulY  = undulAmp * Math.sin(elapsed * 2 * Math.PI / undulPeriodSec);
        var y       = baseY + undulY;

        ufoEl.style.left      = ufoX + "px";
        ufoEl.style.top       = y + "px";
        ufoEl.style.transform = "scaleX(" + direction + ") rotate(" + tiltDeg + "deg)";

        if (hasJet) {
          // jet trails behind UFO; no tilt — steady flight
          jetEl.style.left      = (ufoX + ufoW + gap) + "px";
          jetEl.style.top       = y + "px";
          jetEl.style.transform = "scaleX(1)";
        }

        if (t < 1) {
          rafId = requestAnimationFrame(step);
        } else {
          rafId = null;
          ufoEl.style.display = "none";
          jetEl.style.display = "none";
          direction = -direction;
          timeoutId = setTimeout(runPass, WAIT_MS);
        }
      }

      rafId = requestAnimationFrame(step);
    }

    timeoutId = setTimeout(runPass, 1000);
  }

  /* ---- bird flock animation (mirrors game title screen logic) -----------
     Sprite: 15×3 px sheet, 5 frames of 3×3 px each, 10 fps
     Flock:  5–10 birds, random direction each pass, 5–10 s gap between flocks
     Each bird has: trail offset behind leader, Y scatter, flutter sine wave  */
  function initBirdAnimation() {
    var heroEl = $(".hero");
    var canvas = $(".hero__birds");
    if (!heroEl || !canvas) return;

    var ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;

    var heroInView = true;
    var flock = null;
    var timeoutId = null;
    var rafId = null;
    var lastTs = null;

    var FRAME_COUNT   = 5;
    var FRAME_DUR_SEC = 0.1;   // 10 fps
    var FLUTTER_AMP   = 1.2;   // asset-pixel amplitude (game spec)

    function syncSize() {
      canvas.width  = heroEl.offsetWidth;
      canvas.height = heroEl.offsetHeight;
      ctx.imageSmoothingEnabled = false;
    }
    window.addEventListener("resize", syncSize);
    syncSize();

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        heroInView = entries[0].isIntersecting;
        if (!heroInView) {
          if (timeoutId) { clearTimeout(timeoutId); timeoutId = null; }
          flock = null;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        } else if (!flock && !timeoutId) {
          timeoutId = setTimeout(spawnFlock, 600);
        }
      }, { threshold: 0.1 }).observe(heroEl);
    }

    function spawnFlock() {
      timeoutId = null;
      if (!heroInView) return;

      var vw = canvas.width;
      var vh = canvas.height;
      var spriteScale = vw / 428;

      var birdCount = 5 + Math.floor(Math.random() * 6);      // 5–10 birds
      var direction = Math.random() < 0.5 ? 1 : -1;           // random dir each time
      var speed     = vw * (0.065 + Math.random() * 0.035);   // game spec px/sec

      // Render size: 3 native-px × spriteScale (scale factor 1)
      var birdSz = Math.max(3, Math.min(12, spriteScale * 3));

      var birds = [];
      var cumulTrail = 0;
      for (var i = 0; i < birdCount; i++) {
        var spacing = (4.5 + Math.random() * 4.0) * spriteScale;
        cumulTrail += spacing;
        birds.push({
          offsetX:     -direction * cumulTrail + (Math.random() - 0.5) * 1.5 * spriteScale,
          offsetY:     (Math.random() - 0.5) * 14.0 * spriteScale,
          flutterPhase: Math.random() * 2 * Math.PI,
          flutterFreq:  0.7 + Math.random() * 0.5,
          framePhase:   Math.floor(Math.random() * FRAME_COUNT),
        });
      }

      // Lead bird starts off-screen; tail birds also clear the edge
      var leadStartX = direction > 0 ? -birdSz : vw + birdSz + cumulTrail;

      // Y: hero-relative — lower half (screen middle down to near section bottom)
      var yMin = vh * 0.45;
      var yMax = vh * 0.82;
      var baseY = yMin + Math.random() * (yMax - yMin);

      flock = {
        direction: direction,
        speed:     speed,
        leadX:     leadStartX,
        baseY:     baseY,
        birds:     birds,
        birdSz:    birdSz,
        cumulTrail: cumulTrail,
        elapsed:   0,
      };
    }

    var birdImg = new Image();
    birdImg.src = "assets/game/bird.png";

    function loop(ts) {
      rafId = requestAnimationFrame(loop);
      var dt = lastTs ? Math.min((ts - lastTs) / 1000, 0.05) : 0;
      lastTs = ts;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (!flock) return;

      flock.elapsed += dt;
      flock.leadX   += flock.direction * flock.speed * dt;

      var vw = canvas.width;
      var vh = canvas.height;
      var spriteScale = vw / 428;

      // Flock is done only when every trailing bird has fully left the screen.
      // Trailing birds span ≈ cumulTrail behind the lead (opposite to direction).
      var gone = flock.direction > 0
        ? (flock.leadX - flock.cumulTrail) > vw + flock.birdSz
        : (flock.leadX + flock.cumulTrail) < -flock.birdSz;
      if (gone) {
        flock = null;
        timeoutId = setTimeout(spawnFlock, 5000 + Math.random() * 5000);
        return;
      }

      if (!birdImg.complete || !birdImg.naturalWidth) return;

      for (var i = 0; i < flock.birds.length; i++) {
        var bird = flock.birds[i];
        var bx = flock.leadX + bird.offsetX;
        if (bx + flock.birdSz < -8 || bx > vw + 8) continue;

        var flutter = Math.sin(
          flock.elapsed * 2 * Math.PI * bird.flutterFreq + bird.flutterPhase
        ) * FLUTTER_AMP * spriteScale;
        var by = flock.baseY + bird.offsetY + flutter;
        if (by < -flock.birdSz || by > vh) continue;

        var frameIdx = (Math.floor(flock.elapsed / FRAME_DUR_SEC) + bird.framePhase) % FRAME_COUNT;
        var srcX = frameIdx * 3; // 3 px per frame in sprite sheet

        // Translate to bird center → mirror if flying left → draw
        ctx.save();
        ctx.translate(bx + flock.birdSz / 2, by + flock.birdSz / 2);
        if (flock.direction < 0) ctx.scale(-1, 1);
        ctx.drawImage(
          birdImg,
          srcX, 0, 3, 3,
          -flock.birdSz / 2, -flock.birdSz / 2, flock.birdSz, flock.birdSz
        );
        ctx.restore();
      }
    }

    function start() {
      spawnFlock();
      if (!rafId) rafId = requestAnimationFrame(loop);
    }

    if (birdImg.complete && birdImg.naturalWidth) {
      start();
    } else {
      birdImg.onload = start;
    }
  }

  /* ---- screenshot gallery (swipe between gameplay shots, loops, autoplay)
     True infinite loop: a clone of the last slide is prepended and a clone
     of the first slide is appended, so slide 6 → 1 (and 1 → 6) keeps
     sliding in the same direction instead of jumping back. Once the
     transition lands on a clone, we snap (no transition) to the matching
     real slide so `pos` stays in [1, total].                              */
  function initShotCarousel() {
    var carousel = $(".shot-carousel");
    var track = $("#shot-track");
    var dotsWrap = $("#shot-dots");
    if (!carousel || !track) return;
    var realSlides = $$(".shot-slide", track);
    var total = realSlides.length;
    if (!total) return;
    var DWELL_MS = 4500;

    var firstClone = realSlides[0].cloneNode(true);
    var lastClone = realSlides[total - 1].cloneNode(true);
    firstClone.setAttribute("aria-hidden", "true");
    lastClone.setAttribute("aria-hidden", "true");
    track.insertBefore(lastClone, realSlides[0]);
    track.appendChild(firstClone);

    var pos = 1; // 1..total = real slides; 0 and total+1 = clones

    var dots = [];
    if (dotsWrap) {
      dotsWrap.innerHTML = "";
      realSlides.forEach(function (_, i) {
        var b = document.createElement("button");
        b.type = "button";
        b.className = "shot-dot";
        b.setAttribute("role", "tab");
        b.setAttribute("aria-label", "Screenshot " + (i + 1));
        b.addEventListener("click", function () { goTo(i); startAutoplay(); });
        dotsWrap.appendChild(b);
        dots.push(b);
      });
    }

    function setTransform(animate) {
      if (!animate) track.style.transition = "none";
      track.style.transform = "translateX(" + (-pos * 100) + "%)";
      if (!animate) {
        void track.offsetWidth; // flush so the next transition re-enables cleanly
        track.style.transition = "";
      }
    }

    function updateIndicators() {
      var logical = ((pos - 1) % total + total) % total;
      dots.forEach(function (d) { d.classList.remove("on"); });
      if (dots[logical]) dots[logical].classList.add("on");
    }

    function step(direction) {
      // if mid-transition onto a clone (rapid input), snap back first
      if (pos === 0) { pos = total; setTransform(false); }
      else if (pos === total + 1) { pos = total + 1 - total; setTransform(false); } // = 1
      pos += direction;
      setTransform(true);
      updateIndicators();
    }

    function goTo(i) {
      pos = i + 1;
      setTransform(true);
      updateIndicators();
    }

    track.addEventListener("transitionend", function (e) {
      if (e.propertyName !== "transform") return;
      if (pos === 0) { pos = total; setTransform(false); }
      else if (pos === total + 1) { pos = 1; setTransform(false); }
    });

    var timer = null;
    var inView = true;
    function startAutoplay() {
      clearTimeout(timer);
      if (!inView) return;
      timer = setTimeout(function () {
        step(1);
        startAutoplay();
      }, DWELL_MS);
    }

    var prev = $(".shot-nav--prev"), next = $(".shot-nav--next");
    if (prev) prev.addEventListener("click", function () { step(-1); startAutoplay(); });
    if (next) next.addEventListener("click", function () { step(1); startAutoplay(); });

    var viewport = $(".shot-viewport");
    if (viewport) {
      var startX = 0, dragging = false;
      viewport.addEventListener("pointerdown", function (e) {
        dragging = true; startX = e.clientX;
      });
      viewport.addEventListener("pointerup", function (e) {
        if (!dragging) return;
        dragging = false;
        var dx = e.clientX - startX;
        if (Math.abs(dx) > 40) { step(dx < 0 ? 1 : -1); startAutoplay(); }
      });
      viewport.addEventListener("pointercancel", function () { dragging = false; });

      viewport.setAttribute("tabindex", "0");
      viewport.addEventListener("keydown", function (e) {
        if (e.key === "ArrowLeft") { step(-1); startAutoplay(); }
        else if (e.key === "ArrowRight") { step(1); startAutoplay(); }
      });
    }

    // pause on hover (desktop)
    carousel.addEventListener("mouseenter", function () {
      clearTimeout(timer);
    });
    carousel.addEventListener("mouseleave", function () {
      startAutoplay();
    });

    // pause while the gallery is scrolled out of view
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        inView = entries[0].isIntersecting;
        if (inView) { updateIndicators(); startAutoplay(); }
        else clearTimeout(timer);
      }, { threshold: 0.2 }).observe(carousel);
    }

    setTransform(false);
    updateIndicators();
    startAutoplay();
  }

  /* ---- maps section decorations: skyline footer (1/10 of section height)
     + falling debris particles confined to the section's bounds          */
  function initStagesDecor() {
    var section = $("#stages");
    var skyline = $(".stages-skyline", section);
    var particles = $(".stages-particles", section);
    if (!section) return;

    function update() {
      var h = section.offsetHeight;
      if (skyline) skyline.style.height = (h / 10) + "px";
      section.style.setProperty("--stages-h", h + "px");
    }
    update();
    window.addEventListener("resize", update);

    if (!particles) return;
    var PARTICLE_COUNT = 15;
    var IMAGE_COUNT = 8;
    for (var i = 0; i < PARTICLE_COUNT; i++) {
      var img = document.createElement("img");
      var n = (i % IMAGE_COUNT) + 1;
      img.src = "assets/game/particles/small_town_map_particle_" + n + ".png";
      img.className = "px stages-particle";
      img.alt = "";
      img.setAttribute("aria-hidden", "true");

      var size = 28 + Math.random() * 28;       // 28–56px
      var duration = 8 + Math.random() * 8;     // 8–16s
      // stratify horizontal position so particles spread evenly across
      // the section instead of clustering by chance
      var left = ((i + Math.random()) / PARTICLE_COUNT) * 100;
      img.style.width = size + "px";
      img.style.left = left + "%";
      img.style.animationDuration = duration + "s";
      img.style.animationDelay = (-Math.random() * duration) + "s";

      particles.appendChild(img);
    }

    // clicking the map button shakes it, like it's refusing to open yet
    var stack = $(".stages-placeholder__stack", section);
    var placeholder = $(".stages-placeholder", section);
    if (stack && placeholder) {
      stack.addEventListener("click", function () {
        placeholder.classList.remove("shake");
        void placeholder.offsetWidth; // restart animation if already running
        placeholder.classList.add("shake");
      });
      placeholder.addEventListener("animationend", function () {
        placeholder.classList.remove("shake");
      });
    }
  }

  /* ---- boot ------------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", function () {
    setupMenu();
    setupFaq();
    setupLangToggle();
    setupHeaderReveal();
    stampYear();
    renderAll(window.i18n.getLang());
    initFlyerAnimation();
    initBirdAnimation();
    initShotCarousel();
    initStagesDecor();
  });

  // re-render collections + re-apply static strings on language change
  document.addEventListener("languagechange", function (e) {
    renderAll(e.detail.lang);
  });

  // patch notes: grid <-> detail routing via URL hash
  window.addEventListener("hashchange", function () {
    if (currentLang) routePatch(currentLang);
  });
  document.addEventListener("click", function (e) {
    var back = e.target.closest ? e.target.closest("[data-patch-back]") : null;
    if (!back) return;
    e.preventDefault();
    history.pushState("", document.title, location.pathname + location.search);
    if (currentLang) routePatch(currentLang);
  });

  // patch notes: pagination (page-number buttons)
  document.addEventListener("click", function (e) {
    var btn = e.target.closest ? e.target.closest("[data-patch-page]") : null;
    if (!btn || btn.disabled) return;
    e.preventDefault();
    var pg = parseInt(btn.getAttribute("data-patch-page"), 10);
    if (isNaN(pg)) return;
    patchPage = pg;
    if (currentLang) renderPatchGrid(currentLang);
    var list = document.querySelector("#patch-list");
    if (list) list.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  // re-page the grid when the column count changes on resize
  var patchResizeTimer;
  window.addEventListener("resize", function () {
    if (!document.querySelector("#patch-grid")) return;
    clearTimeout(patchResizeTimer);
    patchResizeTimer = setTimeout(function () {
      if (currentLang) renderPatchGrid(currentLang);
    }, 150);
  });
})();
