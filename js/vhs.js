/* ============================================================
   vhs.js — the analog-horror touches that need JavaScript.

   1. Timecode: the "PLAY ▶ 00:00:00" counter in the hero ticks
      up every second, like a tape that started when the visitor
      pressed play on the page.
   2. Flashlight: the page's dark vignette follows the cursor,
      so moving the mouse feels like sweeping a light around a
      dark room. (On touch devices it just stays centered.)
   ============================================================ */

(function () {
  /* ---- 1. tape timecode ---- */
  var timecode = document.getElementById("timecode");
  if (timecode) {
    var start = Date.now();

    function pad(n) { return n < 10 ? "0" + n : "" + n; }

    setInterval(function () {
      var s = Math.floor((Date.now() - start) / 1000);
      var h = Math.floor(s / 3600);
      var m = Math.floor((s % 3600) / 60);
      timecode.textContent = pad(h) + ":" + pad(m) + ":" + pad(s % 60);
    }, 1000);
  }

  /* ---- 2. flashlight vignette ---- */
  var fine = window.matchMedia("(pointer: fine)").matches;
  if (fine) {
    var root = document.documentElement;
    document.addEventListener("mousemove", function (e) {
      root.style.setProperty("--flash-x", e.clientX + "px");
      root.style.setProperty("--flash-y", e.clientY + "px");
    }, { passive: true });
  }
})();
