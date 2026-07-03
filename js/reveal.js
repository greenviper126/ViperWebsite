/* ============================================================
   reveal.js — fade-in on scroll.

   Tags project cards and year dividers with .reveal, then uses
   an IntersectionObserver to add .visible as each one scrolls
   into view (the transition itself lives in components.css).
   If the browser doesn't support IntersectionObserver, nothing
   is tagged and everything just stays visible.
   ============================================================ */

(function () {
  if (!("IntersectionObserver" in window)) return;

  var targets = document.querySelectorAll(".card, .year-divider");

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
})();
