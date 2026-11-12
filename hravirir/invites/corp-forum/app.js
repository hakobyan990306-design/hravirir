/* «Ֆորում» (կորպորատիվ)՝ ժապավենով կախված VIP անցաթուղթ, սեղմելիս շրջվում է, «դարպասները» բացվում են.
   Էջը՝ մուգ կապույտ և շամպայնի ոսկի, թվեր, օրակարգ, բանախոսներ, դրեսկոդ, RSVP, վայր */
(function () {
  "use strict";
  var K = window.K, C = K.C, esc = K.esc, t = K.t, u = K.u, pad = K.pad;
  var TXT = {
    hy: { hint: "Սեղմեք անցաթղթին", pass: "VIP ԱՆՑԱԹՈՒՂԹ", guest: "Պատվավոր հյուր", welcome: "Բարի գալուստ", invite: "Հրավեր",
      about: "Սիրելի՛ գործընկերներ", agenda: "Օրակարգ", speakers: "Բանախոսներ", dress: "Դրեսկոդ", rsvp: "Գրանցում", rsvpLead: "Խնդրում ենք հաստատել մասնակցությունը մինչև",
      company: "Ընկերություն", left: "Ֆորումին մնացել է", venue: "Վայրը", how: "Ինչպես հասնել", fin: "Սպասում ենք Ձեզ", y: "թ." },
    ru: { hint: "Нажмите на пропуск", pass: "VIP ПРОПУСК", guest: "Почётный гость", welcome: "Добро пожаловать", invite: "Приглашение",
      about: "Уважаемые партнёры", agenda: "Программа", speakers: "Спикеры", dress: "Дресс-код", rsvp: "Регистрация", rsvpLead: "Пожалуйста, подтвердите участие до",
      company: "Компания", left: "До форума осталось", venue: "Место", how: "Как добраться", fin: "Ждём вас", y: "г." }
  };
  function x(k) { return (TXT[K.lang] || TXT.hy)[k]; }
  function dd() { var d = K.date; return pad(d.getDate()) + "." + pad(d.getMonth() + 1) + "." + d.getFullYear(); }
  function tm() { return pad(K.date.getHours()) + ":" + pad(K.date.getMinutes()); }
  function ini(n) { return String(t(n) || "").split(/\s+/).map(function (w) { return w.charAt(0); }).join("").slice(0, 2); }
  var mono = '<svg class="mono" viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="18.5" fill="none" stroke="currentColor" stroke-width="1"/><path d="M13 28V12l14 16V12" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>';
  // QR-ի նմանվող նախշ (կայուն, ոչ պատահական)
  function qr() { var s = 11, h = ""; for (var i = 0; i < 81; i++) { s = (s * 16807) % 2147483647; if (s % 3) h += '<i style="grid-area:' + (1 + (i / 9 | 0)) + "/" + (1 + i % 9) + '"></i>'; } return '<div class="qr">' + h + "</div>"; }

  function envelope() {
    return '<div class="env" id="env" role="button" aria-label="' + esc(x("hint")) + '"><div class="grid"></div>' +
      '<div class="gate l"></div><div class="gate r"></div>' +
      '<div class="lan"><i class="strap a"></i><i class="strap b"></i><i class="clip"></i>' +
      '<div class="card" id="card"><div class="f">' +
        '<div class="top">' + mono + "<span>" + esc(C.company || "") + "</span></div>" +
        '<div class="vip">' + esc(x("pass")) + '</div><div class="ttl">' + esc(t(C.title)) + "</div>" +
        '<div class="gst"><small>' + esc(x("guest")) + "</small><i></i></div>" +
        '<div class="meta"><span>' + dd() + "</span><span>" + tm() + "</span></div>" +
      '</div><div class="b">' + qr() + '<div class="wl">' + esc(x("welcome")) + "</div><small>" + esc(C.company || "") + "</small></div></div></div>" +
      (K.PREVIEW ? "" : '<div class="hint">' + esc(x("hint")) + "</div>") + "</div>";
  }
  function hero() {
    return '<section class="hero" id="hero"><div class="grid"></div><div class="glow"></div><div class="wrap">' +
      '<div class="co rv">' + mono + "<span>" + esc(C.company || "") + "</span></div>" +
      '<div class="tag rv">' + esc(x("invite")) + "</div>" +
      '<h1 class="nm rv">' + esc(t(C.title)) + "</h1>" +
      '<div class="when rv"><span>' + dd() + "</span><i></i><span>" + tm() + "</span></div>" +
      '<div class="pl rv">' + esc(t(C.venue && C.venue.place)) + "</div></div>" +
      '<a class="scr" href="#about"><span>' + (K.lang === "ru" ? "ЛИСТАЙТЕ ВНИЗ" : "ԹԵՐԹԵՔ ՆԵՐՔԵՎ") + "</span><i></i></a></section>";
  }
  function about() {
    return '<section id="about"><div class="wrap"><h2 class="h2 rv">' + esc(x("about")) + '</h2><p class="p rv">' + esc(t(C.text)) + "</p>" +
      '<div class="stats rv">' + (C.stats || []).map(function (s) { return "<div><b>" + esc(s[0]) + "</b><span>" + esc(t(s[1])) + "</span></div>"; }).join("") + "</div></div></section>";
  }
  function agenda() {
    return '<section class="dark"><div class="wrap"><h2 class="h2 rv">' + esc(x("agenda")) + '</h2><div class="ag">' + (C.events || []).map(function (e, i) {
      return '<div class="it rv" style="--d:' + i * 70 + 'ms"><div class="tm">' + esc(e.time) + '</div><div class="bd"><div class="t">' + esc(t(e.title)) + "</div>" + (e.note ? '<div class="n">' + esc(t(e.note)) + "</div>" : "") + "</div></div>";
    }).join("") + "</div></div></section>";
  }
  function speakers() {
    if (!C.speakers) return "";
    return '<section><div class="wrap"><h2 class="h2 rv">' + esc(x("speakers")) + '</h2><div class="sp">' + C.speakers.map(function (s) {
      return '<div class="s rv"><div class="av">' + (s.photo ? '<img src="' + esc(s.photo) + '" alt="" loading="lazy">' : "<span>" + esc(ini(s.name)) + "</span>") + '</div><b>' + esc(t(s.name)) + "</b><small>" + esc(t(s.role)) + "</small></div>";
    }).join("") + "</div></div></section>";
  }
  function countdown() {
    return '<section class="dark cdw"><div class="wrap"><div class="caps rv">' + esc(x("left")) + '</div><div class="cdn rv" data-cd>' + ["days", "hours", "minutes", "seconds"].map(function (k) {
      return '<div><b data-k="' + k + '">00</b><span>' + esc(u(k)) + "</span></div>"; }).join("") + "</div></div></section>";
  }
  function dress() {
    if (!C.dresscode) return "";
    return '<section><div class="wrap"><h2 class="h2 rv">' + esc(x("dress")) + '</h2><p class="p rv">' + esc(t(C.dresscode.text)) + '</p><div class="dots rv">' +
      (C.dresscode.colors || []).map(function (c) { return '<i style="background:' + esc(c) + '"></i>'; }).join("") + "</div></div></section>";
  }
  function rsvp() {
    if (!C.rsvp) return "";
    return '<section class="dark"><div class="wrap"><h2 class="h2 rv">' + esc(x("rsvp")) + '</h2><p class="p rv">' + esc(x("rsvpLead")) + " " + esc(K.deadline()) + "</p>" +
      '<form class="rs rv" id="rf"><label class="radio"><input type="radio" name="attend" value="yes" checked>' + esc(u("yes")) + "</label>" +
      '<label class="radio"><input type="radio" name="attend" value="no">' + esc(u("no")) + "</label>" +
      '<div class="fl"><label for="rn">' + esc(u("name")) + '</label><input id="rn" name="name" required autocomplete="name"></div>' +
      '<div class="fl"><label for="rc">' + esc(x("company")) + '</label><input id="rc" name="note" autocomplete="organization"></div>' +
      '<div class="fl"><label for="rg">' + esc(u("guests")) + '</label><select id="rg" name="guests">' + [1, 2, 3, 4, 5].map(function (i) { return "<option>" + i + "</option>"; }).join("") + "</select></div>" +
      '<button class="btn fill" type="submit">' + esc(u("send")) + "</button></form></div></section>";
  }
  function venue() {
    var v = C.venue || {};
    return '<section><div class="wrap"><h2 class="h2 rv">' + esc(x("venue")) + '</h2><div class="vn rv"><div class="vt">' + esc(t(v.place)) + '</div><div class="va">' + esc(t(v.address)) + "</div>" +
      (v.map ? '<a class="btn" href="' + esc(v.map) + '" target="_blank" rel="noopener">' + esc(x("how")) + "</a>" : "") + "</div></div></section>";
  }
  function fin() {
    return '<section class="dark fin"><div class="wrap"><div class="co rv">' + mono + "<span>" + esc(C.company || "") + '</span></div><div class="caps rv">' + esc(x("fin")) + "</div></div></section>" +
      '<div class="made"><a href="https://hravirir.am" target="_blank" rel="noopener">HRAVIRIR.AM</a></div>';
  }

  var opened = false;
  function render() {
    document.documentElement.lang = K.lang;
    document.title = t(C.title) + " · " + (C.company || "");
    document.getElementById("app").innerHTML = (opened ? "" : envelope()) + "<main>" + hero() + about() + agenda() + speakers() + countdown() + dress() + rsvp() + venue() + fin() + "</main>" + (opened ? K.chrome() : "");
    document.body.classList.toggle("locked", !opened);
    if (opened || K.PREVIEW) document.getElementById("hero").classList.add("go");
    if (!opened) { var e = document.getElementById("env"); if (e && !K.PREVIEW) e.onclick = open; } else K.reveal();
    K.countdown(true); K.rsvp(document.getElementById("rf")); K.bindChrome(render);
  }
  // անցաթուղթը շրջվում է → բարձրանում է → դարպասները բացվում են
  function open() {
    var env = document.getElementById("env"); if (env.dataset.busy) return; env.dataset.busy = "1";
    K.music.play();
    env.classList.add("s1");
    setTimeout(function () { env.classList.add("s2"); }, 1300);
    setTimeout(function () { env.classList.add("s3"); document.getElementById("hero").classList.add("go"); }, 1900);
    setTimeout(function () {
      opened = true; document.body.classList.remove("locked");
      document.getElementById("app").insertAdjacentHTML("beforeend", K.chrome()); K.bindChrome(render); K.reveal();
    }, 2600);
    setTimeout(function () { env.remove(); }, 3300);
  }
  render();
})();
