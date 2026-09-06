(function () {
  "use strict";

  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1) Aparición al hacer scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------- 2) Ítem del menú activo según la sección visible ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".top-nav a"));
  var sections = navLinks
    .map(function (a) {
      var id = a.getAttribute("href").slice(1);
      return { link: a, section: document.getElementById(id) };
    })
    .filter(function (item) { return item.section; });

  if (sections.length && "IntersectionObserver" in window) {
    var navObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var match = sections.find(function (s) { return s.section === entry.target; });
          if (!match) return;
          if (entry.isIntersecting) {
            navLinks.forEach(function (a) { a.classList.remove("active"); });
            match.link.classList.add("active");
          }
        });
      },
      { threshold: 0, rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach(function (s) { navObserver.observe(s.section); });
  }

  /* ---------- 3) Parallax sutil en los fondos acuarela ---------- */
  if (!reduceMotion) {
    var watercolorSections = Array.prototype.slice.call(document.querySelectorAll(".section-watercolor"));
    var ticking = false;
    var BEFORE_FACTOR = 0.08;
    var AFTER_FACTOR = 0.14;
    var MAX_OFFSET = 70;

    function clamp(value, min, max) {
      return Math.max(min, Math.min(max, value));
    }

    function updateParallax() {
      var viewportCenter = window.innerHeight / 2;
      watercolorSections.forEach(function (section) {
        var rect = section.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > window.innerHeight + 200) return; // fuera de vista, no calcular
        var sectionCenter = rect.top + rect.height / 2;
        var delta = viewportCenter - sectionCenter;
        var offsetA = clamp(delta * BEFORE_FACTOR, -MAX_OFFSET, MAX_OFFSET);
        var offsetB = clamp(delta * AFTER_FACTOR, -MAX_OFFSET * 1.3, MAX_OFFSET * 1.3);
        section.style.setProperty("--py-a", offsetA.toFixed(1) + "px");
        section.style.setProperty("--py-b", offsetB.toFixed(1) + "px");
      });
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    updateParallax();
  }
})();
