/* «Արքայադուստր» (աղջկա ծնունդ) դիզայնի դասավորությունը */
(function () {
  "use strict";
  var K = window.K, C = K.C, esc = K.esc, t = K.t, u = K.u, pad = K.pad;
  var TXT = {
    hy: { hint: "Սեղմեք դղյակին", top: "Հեքիաթային տոն", years: "տարեկան", inv: "Սիրով հրավիրում ենք Ձեզ", our: "Մի անգամ լինում է…", program: "Տոնի ծրագիր", dress: "Դրեսկոդ", left: "Մինչև տոնը մնաց",
      rsvp: "Կգա՞ք", rsvpLead: "Խնդրում ենք պատասխանել մինչև", fin: "Սիրով սպասում ենք Ձեզ" },
    ru: { hint: "Нажмите на замок", top: "Сказочный праздник", years: "лет", inv: "С любовью приглашаем вас", our: "Жила-была…", program: "Программа праздника", dress: "Дресс-код", left: "До праздника осталось",
      rsvp: "Вы придёте?", rsvpLead: "Пожалуйста, ответьте до", fin: "С любовью ждём вас" },
    en: { hint: "Tap the castle", top: "A fairytale party", years: "years old", inv: "You are invited", our: "Once upon a time…", program: "The party", dress: "Dress code", left: "Counting down",
      rsvp: "Will you come?", rsvpLead: "Kindly reply by", fin: "See you there" }
  };
  function x(k) { return (TXT[K.lang] || TXT.hy)[k]; }
  function f(v) { return Math.round(v * 10) / 10; }
  var s0 = 13; function r() { s0 = (s0 * 16807) % 2147483647; return s0 / 2147483647; }
  var PK = "#f7cfe0", PK2 = "#eeb3cd", LI = "#b89ad8", LI2 = "#9a7cc4", GD = "#f2c96b", ST = "#d98fb3";

  function tower(x0, y0, w, h, roofH, flag) {
    var s = '<rect x="' + x0 + '" y="' + y0 + '" width="' + w + '" height="' + h + '" fill="' + PK + '" stroke="' + ST + '" stroke-width="1.5"/>' +
      '<rect x="' + x0 + '" y="' + y0 + '" width="' + (w * .3) + '" height="' + h + '" fill="' + PK2 + '" opacity=".6"/>' +
      '<path d="M' + (x0 - 6) + " " + y0 + "L" + (x0 + w / 2) + " " + (y0 - roofH) + "L" + (x0 + w + 6) + " " + y0 + 'Z" fill="' + LI + '" stroke="' + LI2 + '" stroke-width="1.5"/>' +
      '<path d="M' + (x0 + w / 2) + " " + (y0 - roofH) + "L" + (x0 + w + 6) + " " + y0 + "L" + (x0 + w / 2 + 4) + " " + y0 + 'Z" fill="' + LI2 + '" opacity=".5"/>' +
      '<path d="M' + (x0 + w / 2 - 7) + " " + (y0 + 30) + "v14h14v-14a7 7 0 0 0 -14 0z" + '" fill="' + GD + '" stroke="' + ST + '" stroke-width="1.2"/>';
    if (flag) s += '<path d="M' + (x0 + w / 2) + " " + (y0 - roofH) + "v-16" + '" stroke="#8a6aa8" stroke-width="1.5"/><path d="M' + (x0 + w / 2) + " " + (y0 - roofH - 16) + "l14 4l-14 4z" + '" fill="#f28bb2" class="flag"/>';
    return s;
  }
  function castle() {
    var s = '<svg class="cs" viewBox="0 0 300 300" aria-hidden="true">' +
      '<path d="M0 285C60 270 120 278 150 282C190 276 250 268 300 282V300H0Z" fill="#cde8c9"/>' +
      tower(34, 110, 52, 170, 70, true) + tower(214, 110, 52, 170, 70, true) +
      '<rect x="86" y="150" width="128" height="130" fill="' + PK + '" stroke="' + ST + '" stroke-width="1.5"/>';
    for (var i = 0; i < 8; i++) s += '<rect x="' + (86 + i * 16) + '" y="140" width="10" height="12" fill="' + PK + '" stroke="' + ST + '" stroke-width="1.2"/>';
    s += tower(122, 70, 56, 80, 64, true) +
      '<path d="M122 280V222a28 28 0 0 1 56 0V280Z" fill="#6b4a7a"/><path d="M116 280V222a34 34 0 0 1 68 0V280" fill="none" stroke="' + ST + '" stroke-width="2"/>' +
      '<path d="M100 186v14h12v-14a6 6 0 0 0 -12 0zM188 186v14h12v-14a6 6 0 0 0 -12 0z" fill="' + GD + '" stroke="' + ST + '" stroke-width="1.2"/>' +
      '<path d="M140 104a10 10 0 0 1 20 0v18h-20z" fill="' + GD + '" stroke="' + ST + '" stroke-width="1.2"/>';
    return s + "</svg>";
  }
  function crown() {
    return '<svg viewBox="0 0 100 70" aria-hidden="true"><path d="M8 58L4 16L28 36L50 6L72 36L96 16L92 58Z" fill="' + GD + '" stroke="#c99a36" stroke-width="2" stroke-linejoin="round"/>' +
      '<rect x="8" y="56" width="84" height="10" rx="3" fill="#e8b84e" stroke="#c99a36" stroke-width="2"/><circle cx="50" cy="40" r="6" fill="#f28bb2"/><circle cx="28" cy="46" r="4" fill="' + LI + '"/><circle cx="72" cy="46" r="4" fill="' + LI + '"/>' +
      '<circle cx="4" cy="16" r="4" fill="#f28bb2"/><circle cx="50" cy="6" r="4" fill="#f28bb2"/><circle cx="96" cy="16" r="4" fill="#f28bb2"/></svg>';
  }
  function wand() {
    return '<svg viewBox="0 0 80 80" aria-hidden="true"><path d="M14 70L48 30" stroke="#b89ad8" stroke-width="5" stroke-linecap="round"/><path d="M56 6l5 12 13 1-10 8 3 13-11-7-11 7 3-13-10-8 13-1z" fill="' + GD + '" stroke="#c99a36" stroke-width="1.5" stroke-linejoin="round"/>' +
      '<circle cx="24" cy="30" r="2.5" fill="#f28bb2"/><circle cx="70" cy="52" r="2" fill="' + LI + '"/><circle cx="36" cy="14" r="1.8" fill="#f28bb2"/></svg>';
  }
  function cake() {
    return '<svg viewBox="0 0 80 80" aria-hidden="true"><path d="M40 6c3 4 3 7 0 9-3-2-3-5 0-9z" fill="#ffb347"/><rect x="38" y="15" width="4" height="12" rx="2" fill="' + LI + '"/>' +
      '<rect x="18" y="27" width="44" height="18" rx="6" fill="#f7cfe0"/><path d="M18 34c6 5 9-3 15 2s9-3 15 2 9-2 14 0" stroke="#fff" stroke-width="3" fill="none"/><rect x="12" y="45" width="56" height="22" rx="6" fill="' + LI + '"/><path d="M12 55h56" stroke="#fff" stroke-width="2" stroke-dasharray="5 4"/></svg>';
  }
  function sparkles(n) {
    var h = "", cols = ["#f28bb2", GD, LI, "#fff", "#9fd8f0"]; s0 = 13;
    for (var i = 0; i < n; i++) { var a = r() * Math.PI * 2, d = 60 + r() * 170; h += '<i style="background:' + cols[i % 5] + ";--x:" + f(Math.cos(a) * d) + "px;--y:" + f(Math.sin(a) * d) + "px;--dl:" + f(r() * .5) + 's"></i>'; }
    return '<div class="spk">' + h + "</div>";
  }
  function clouds() { return '<i class="cl c1"></i><i class="cl c2"></i><i class="cl c3"></i>'; }
  function envelope() {
    var n = K.names();
    return '<div class="env" id="env" role="button" aria-label="' + esc(x("hint")) + '">' + clouds() + '<div class="top"><div class="caps">' + esc(x("top")) + '</div><div class="nm">' + esc(n[0] || "") + "</div></div>" +
      '<div class="stage" id="stage">' + castle() + '<div class="bridge"><i></i></div><div class="gl"></div>' + sparkles(40) + "</div>" +
      (K.PREVIEW ? "" : '<div class="hint">' + esc(x("hint")) + "</div>") + "</div>";
  }
  function hero() {
    var n = K.names(), d = K.date;
    return '<section class="hero">' + clouds() + '<div class="wrap"><div class="cr rv">' + crown() + '</div><div class="caps rv">' + esc(x("inv")) + '</div><h1 class="nm rv d1">' + esc(n[0] || "") + "</h1>" +
      '<div class="age rv d1"><b>' + esc(C.age || "") + "</b><span>" + esc(x("years")) + "</span></div>" +
      '<div class="dt rv d2">' + d.getDate() + " " + esc(u("monthsGen")[d.getMonth()]) + " · " + pad(d.getHours()) + ":" + pad(d.getMinutes()) + '</div><div class="mc rv d3">' + castle() + "</div></div></section>";
  }
  function story() {
    return '<section class="lil"><div class="wrap"><h2 class="h2 rv">' + esc(x("our")) + '</h2><p class="p rv">' + esc(t(C.text)) + "</p></div></section>";
  }
  function countdown() {
    return '<section><div class="wrap"><div class="caps rv">' + esc(x("left")) + '</div><div class="cdn rv" data-cd>' + ["days", "hours", "minutes", "seconds"].map(function (k) {
      return '<div><b data-k="' + k + '">00</b><span>' + esc(u(k)) + "</span></div>";
    }).join("") + "</div></div></section>";
  }
  function program() {
    return '<section class="lil"><div class="wrap"><h2 class="h2 rv">' + esc(x("program")) + "</h2>" + (C.events || []).map(function (e, i) {
      return '<div class="ev rv"><div class="pic ico">' + (i % 2 ? cake() : wand()) + '</div><div class="tm">' + esc(e.time) + '</div><div class="t">' + esc(t(e.title)) +
        '</div><div class="n">' + esc(t(e.place)) + '</div><div class="a">' + esc(t(e.address)) + "</div>" + (e.map ? '<a class="btn" href="' + esc(e.map) + '" target="_blank" rel="noopener">' + esc(u("map")) + "</a>" : "") + "</div>";
    }).join("") + "</div></section>";
  }
  function dress() {
    if (!C.dresscode) return "";
    return '<section><div class="wrap"><h2 class="h2 rv">' + esc(x("dress")) + '</h2><p class="rv">' + esc(t(C.dresscode.text)) + '</p><div class="dots rv">' +
      (C.dresscode.colors || []).map(function (c) { return '<i style="background:' + esc(c) + '"></i>'; }).join("") + "</div></div></section>";
  }
  function rsvp() {
    if (!C.rsvp) return "";
    return '<section class="lil"><div class="wrap"><h2 class="h2 rv">' + esc(x("rsvp")) + '</h2><p class="rv">' + esc(x("rsvpLead")) + " " + esc(K.deadline()) + "</p>" +
      '<form class="rs rv" id="rf"><label class="radio"><input type="radio" name="attend" value="yes" checked>' + esc(u("yes")) + "</label>" +
      '<label class="radio"><input type="radio" name="attend" value="no">' + esc(u("no")) + "</label>" +
      '<div class="fl"><label for="rn">' + esc(u("name")) + '</label><input id="rn" name="name" required autocomplete="name"></div>' +
      '<div class="fl"><label for="rg">' + esc(u("guests")) + '</label><select id="rg" name="guests">' + [1, 2, 3, 4, 5, 6].map(function (i) { return "<option>" + i + "</option>"; }).join("") + "</select></div>" +
      '<button class="btn fill" type="submit">' + esc(u("send")) + "</button></form></div></section>";
  }
  function fin() {
    return '<section class="fin"><div class="wrap"><div class="cr rv">' + crown() + '</div><div class="caps rv">' + esc(x("fin")) + '</div><div class="nm rv">' + esc(K.names()[0] || "") + "</div></div></section>" +
      '<div class="made"><a href="https://hravirir.am" target="_blank" rel="noopener">HRAVIRIR.AM</a></div>';
  }

  var opened = false;
  function render() {
    document.documentElement.lang = K.lang;
    document.title = x("top") + " · " + (K.names()[0] || "");
    document.getElementById("app").innerHTML = (opened ? "" : envelope()) + "<main>" + hero() + story() + countdown() + program() + dress() + rsvp() + fin() + "</main>" + (opened ? K.chrome() : "");
    document.body.classList.toggle("locked", !opened);
    if (!opened) { var e = document.getElementById("env"); if (e && !K.PREVIEW) e.onclick = open; } else K.reveal();
    K.countdown(true); K.rsvp(document.getElementById("rf")); K.bindChrome(render);
  }
  // կամուրջն իջնում է → դարպասից լույս և փայլեր → «մտնում ենք» դղյակ
  function open() {
    var env = document.getElementById("env"); if (env.dataset.busy) return; env.dataset.busy = "1";
    K.music.play();
    env.classList.add("s1");
    setTimeout(function () { env.classList.add("s2"); }, 1300);
    setTimeout(function () { env.classList.add("s3"); }, 2600);
    setTimeout(function () {
      opened = true; document.body.classList.remove("locked");
      document.getElementById("app").insertAdjacentHTML("beforeend", K.chrome()); K.bindChrome(render); K.reveal();
    }, 3500);
    setTimeout(function () { env.remove(); }, 4200);
  }
  render();
})();
