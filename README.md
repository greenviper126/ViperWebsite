# VIPER — Portfolio

Personal portfolio site for VIPER (systems & gameplay programmer — Luau/Roblox, Unity/C#).
Pure static HTML/CSS/JS — no build step, no frameworks. Just open it or host it.

## Structure

```
index.html           All the page content (the only HTML file)
css/
  base.css           Colors/fonts (CSS variables), resets, horror overlays
  layout.css         Nav bar, hero, section containers, year dividers, footer
  components.css     Cards, tags, YouTube player, buttons, contact links
js/
  video.js           Click-to-load YouTube embeds (keeps the page fast)
  reveal.js          Fade-in-on-scroll animation for cards
```

**Where to edit things:**
- Add/remove a project → copy a `<article class="card">` block in `index.html`.
  For the video, put the YouTube video ID in `data-id` (the part after `watch?v=`).
- Change colors → the `:root` variables at the top of `css/base.css`.
- Change text → it's all in `index.html`, nothing is generated.

## Preview locally

Just double-click `index.html`, or for a proper local server:

```
python -m http.server 8000
```

then open http://localhost:8000

## Deploy to GitHub Pages

1. Create a new repo on GitHub named exactly **`greenviper126.github.io`**
   (public, no README).
2. From this folder:
   ```
   git init
   git add .
   git commit -m "Portfolio site"
   git branch -M main
   git remote add origin https://github.com/greenviper126/greenviper126.github.io.git
   git push -u origin main
   ```
3. That's it — the site goes live at **https://greenviper126.github.io** within a
   minute or two (repos named `<username>.github.io` are auto-published from `main`).
4. To update the site later: edit files, then `git add . && git commit -m "update" && git push`.
