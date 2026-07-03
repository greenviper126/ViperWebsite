/* ============================================================
   reveal.js — fade-in on scroll.

   Tags project cards and year dividers with .reveal, then uses
   an IntersectionObserver to add .visible as each one scrolls
   into view (the transition itself lives in components.css).
   If the browser doesn't support IntersectionObserver, nothing
   is tagged and everything just stays visible.
   ============================================================ */

(function () {
  var targets = document.querySelectorAll(".card, .year-divider");
  var heroScroll = document.querySelector(".hero-scroll");
  var aboutTitle = document.querySelector("#about .section-title");

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target); // reveal once, then stop watching
          }
        });
      },
      { threshold: 0.12 }
    );

    targets.forEach(function (el) {
      el.classList.add("reveal");
      observer.observe(el);
    });
  }

  if (heroScroll && aboutTitle) {
    function updateHeroScroll() {
      var titleTop = aboutTitle.getBoundingClientRect().top;
      heroScroll.classList.toggle("is-hidden", titleTop <= window.innerHeight);
    }

    window.addEventListener("scroll", updateHeroScroll, { passive: true });
    window.addEventListener("resize", updateHeroScroll);
    updateHeroScroll();
  }
})();
