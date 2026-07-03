/* ============================================================
   video.js — lightweight YouTube embeds.

   Every <div class="yt" data-id="VIDEO_ID"> starts as just the
   video's thumbnail image (fast — no YouTube code loads with
   the page). When it's clicked, we swap in the real iframe
   player and autoplay it. With 16 videos on the page this is
   the difference between a snappy load and a very slow one.
   ============================================================ */

(function () {
  var facades = document.querySelectorAll(".yt[data-id]");

  facades.forEach(function (el) {
    var id = el.dataset.id;

    // show the video's own thumbnail as the background
    el.style.backgroundImage =
      "url('https://i.ytimg.com/vi/" + id + "/hqdefault.jpg')";

    // make it keyboard-accessible
    el.setAttribute("role", "button");
    el.setAttribute("tabindex", "0");
    el.setAttribute("aria-label", "Play video: " + (el.dataset.title || id));

    function play() {
      if (el.classList.contains("playing")) return;
      el.classList.add("playing");

      var iframe = document.createElement("iframe");
      iframe.src =
        "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1&rel=0";
      iframe.title = el.dataset.title || "YouTube video";
      iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;
      el.appendChild(iframe);
    }

    el.addEventListener("click", play);
    el.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        play();
      }
    });
  });
})();
