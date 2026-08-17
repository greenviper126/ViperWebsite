// Fetches the site-wide visitor total from GoatCounter and shows it in the
// footer. Stays hidden if the request fails (offline, blocked, or the
// "allow adding visitor counts" setting is off in GoatCounter).
(function () {
  var el = document.querySelector('.footer-visitors');
  if (!el || !window.fetch) return;

  fetch('https://viper.goatcounter.com/counter/TOTAL.json')
    .then(function (r) { return r.ok ? r.json() : Promise.reject(); })
    .then(function (data) {
      el.querySelector('.footer-visitors-num').textContent = data.count.trim();
      el.hidden = false;
    })
    .catch(function () { /* leave hidden */ });
})();
