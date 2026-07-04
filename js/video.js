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
  var canEmbedInline = window.location.protocol !== "file:";

  function buildEmbedUrl(id) {
    var params = new URLSearchParams({
      autoplay: "1",
      rel: "0",
      playsinline: "1",
      modestbranding: "1"
    });

    // Some browsers/contexts are more reliable when origin is explicit.
    if (window.location.origin && window.location.origin !== "null") {
      params.set("origin", window.location.origin);
    }

    return "https://www.youtube.com/embed/" + encodeURIComponent(id) + "?" + params.toString();
  }

  facades.forEach(function (el) {
    var id = el.dataset.id;
    var watchUrl = "https://www.youtube.com/watch?v=" + encodeURIComponent(id);
    var shortUrl = "https://youtu.be/" + encodeURIComponent(id);

    // show the video's own thumbnail as the background
    el.style.backgroundImage =
      "url('https://i.ytimg.com/vi/" + id + "/hqdefault.jpg')";

    // make it keyboard-accessible
    el.setAttribute("role", "button");
    el.setAttribute("tabindex", "0");
    el.setAttribute("aria-label", "Play video: " + (el.dataset.title || id));

    function showFallback() {
      if (!el.querySelector(".yt-fallback-wrap")) {
        var broken = el.querySelector("iframe");
        if (broken) broken.remove();

        var wrap = document.createElement("div");
        wrap.className = "yt-fallback-wrap";
        Object.assign(wrap.style, {
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: "2",
          fontFamily: "var(--mono)",
          background: "rgba(2, 8, 4, 0.9)",
          border: "1px solid rgba(88, 216, 120, 0.45)",
          padding: "0.45rem",
          display: "grid",
          gap: "0.35rem",
          minWidth: "12rem"
        });

        var note = document.createElement("div");
        note.textContent = "Playback blocked here";
        Object.assign(note.style, {
          color: "#d9ffe4",
          fontSize: "0.72rem",
          textAlign: "center"
        });

        var openMain = document.createElement("a");
        openMain.className = "yt-fallback";
        openMain.href = watchUrl;
        openMain.target = "_blank";
        openMain.rel = "noopener noreferrer";
        openMain.textContent = "Open on YouTube";
        openMain.setAttribute("aria-label", "Open video on YouTube: " + (el.dataset.title || id));
        Object.assign(openMain.style, {
          fontSize: "0.78rem",
          padding: "0.35rem 0.55rem",
          color: "#d9ffe4",
          border: "1px solid rgba(88, 216, 120, 0.5)",
          textDecoration: "none",
          textAlign: "center"
        });

        var openShort = document.createElement("a");
        openShort.href = shortUrl;
        openShort.target = "_blank";
        openShort.rel = "noopener noreferrer";
        openShort.textContent = "Open short link";
        Object.assign(openShort.style, {
          fontSize: "0.72rem",
          color: "#b7d6c0",
          textAlign: "center",
          textDecoration: "none"
        });

        var copyBtn = document.createElement("button");
        copyBtn.type = "button";
        copyBtn.textContent = "Copy link";
        Object.assign(copyBtn.style, {
          fontFamily: "var(--mono)",
          fontSize: "0.72rem",
          cursor: "pointer",
          color: "#d9ffe4",
          background: "rgba(88, 216, 120, 0.12)",
          border: "1px solid rgba(88, 216, 120, 0.38)",
          padding: "0.28rem 0.4rem"
        });

        copyBtn.addEventListener("click", function (evt) {
          evt.preventDefault();
          evt.stopPropagation();

          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(watchUrl)
              .then(function () { copyBtn.textContent = "Copied"; })
              .catch(function () { window.prompt("Copy this link", watchUrl); });
          } else {
            window.prompt("Copy this link", watchUrl);
          }
        });

        wrap.appendChild(note);
        wrap.appendChild(openMain);
        wrap.appendChild(openShort);
        wrap.appendChild(copyBtn);
        el.appendChild(wrap);
      }
    }

    function play() {
      if (el.classList.contains("playing")) return;
      el.classList.add("playing");

      // VS Code file preview (file://) does not provide referrer, which triggers
      // YouTube embed Error 153. Open on YouTube directly in this context.
      if (!canEmbedInline) {
        showFallback();
        return;
      }

      var iframe = document.createElement("iframe");
      iframe.src = buildEmbedUrl(id);
      iframe.title = el.dataset.title || "YouTube video";
      iframe.referrerPolicy = "strict-origin-when-cross-origin";
      iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;

      var loaded = false;
      var failTimer = window.setTimeout(function () {
        if (loaded) return;
        showFallback();
      }, 6000);

      iframe.addEventListener("load", function () {
        loaded = true;
        window.clearTimeout(failTimer);
      });

      iframe.addEventListener("error", function () {
        window.clearTimeout(failTimer);
        showFallback();
      });

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
