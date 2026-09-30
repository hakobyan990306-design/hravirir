/* «Ժամացույց» (տղամարդու հոբելյան) դիզայնի դասավորությունը */
(function () {
  "use strict";
  var K = window.K, C = K.C, esc = K.esc, t = K.t, u = K.u, pad = K.pad;
  var TXT = {
    hy: { hint: "Սեղմեք ժամացույցին", top: "Հոբելյան", years: "տարի", inv: "Սիրով հրավիրում եմ Ձեզ իմ հոբելյանին", our: "Ժամանակի մասին", program: "Երեկոյի ծրագիր", dress: "Դրեսկոդ", left: "Մինչև տոնը մնաց",
      rsvp: "Կմիանա՞ք", rsvpLead: "Խնդրում եմ պատասխանել մինչև", fin: "Սիրով սպասում եմ Ձեզ", wdl: ["Կիրակի", "Երկուշաբթի", "Երեքշաբթի", "Չորեքշաբթի", "Հինգշաբթի", "Ուրբաթ", "Շաբաթ"] },
    ru: { hint: "Нажмите на часы", top: "Юбилей", years: "лет", inv: "С радостью приглашаю вас на мой юбилей", our: "О времени", program: "Программа вечера", dress: "Дресс-код", left: "До праздника осталось",
      rsvp: "Вы придёте?", rsvpLead: "Пожалуйста, ответьте до", fin: "С радостью жду вас", wdl: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"] },
    en: { hint: "Tap the watch", top: "Anniversary", years: "years", inv: "You are invited to my anniversary", our: "About time", program: "The evening", dress: "Dress code", left: "Counting down",
      rsvp: "Will you come?", rsvpLead: "Kindly reply by", fin: "Looking forward to seeing you", wdl: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] }
  };
  function x(k) { return (TXT[K.lang] || TXT.hy)[k]; }
  function f(v) { return Math.round(v * 10) / 10; }
  var ROM = ["XII", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI"];
  function angles(hm) { var p = String(hm).split(":"), h = +p[0] % 12, m = +p[1] || 0; return [f(h * 30 + m / 2), m * 6]; }

  function dial(hm, big, age) {
    var a = angles(hm), s = '<svg class="dial" viewBox="0 0 200 200" aria-hidden="true"><defs><radialGradient id="dl" cx=".45" cy=".4"><stop offset="0" stop-color="#fbf5e8"/><stop offset=".85" stop-color="#efe4cf"/><stop offset="1" stop-color="#d8c7a6"/></radialGradient></defs>' +
      '<circle cx="100" cy="100" r="92" fill="url(#dl)"/><circle cx="100" cy="100" r="84" fill="none" stroke="#5a3a24" stroke-width=".8"/><circle cx="100" cy="100" r="70" fill="none" stroke="#5a3a24" stroke-width=".5"/>';
    for (var i = 0; i < 60; i++) { var q = i * 6 * Math.PI / 180, r1 = i % 5 ? 80 : 76; s += '<path d="M' + f(100 + Math.sin(q) * r1) + " " + f(100 - Math.cos(q) * r1) + "L" + f(100 + Math.sin(q) * 84) + " " + f(100 - Math.cos(q) * 84) + '" stroke="#3a2618" stroke-width="' + (i % 5 ? .7 : 1.8) + '"/>'; }
    if (big) ROM.forEach(function (n, i) { var q = i * 30 * Math.PI / 180; s += '<text x="' + f(100 + Math.sin(q) * 61) + '" y="' + f(100 - Math.cos(q) * 61 + 5) + '" text-anchor="middle" font-family="Noto Serif, serif" font-size="13" fill="#3a2618">' + n + "</text>"; });
    if (age) s += '<rect x="80" y="122" width="40" height="22" rx="3" fill="#fffaf0" stroke="#5a3a24" stroke-width=".8"/><text x="100" y="139" text-anchor="middle" font-family="Noto Serif, serif" font-weight="500" font-size="16" fill="#8a5a33">' + esc(age) + "</text>";
    s += '<g class="hh" style="--a:' + a[0] + 'deg"><path d="M100 104L97 100L100 52L103 100Z" fill="#1f1510"/><circle cx="100" cy="64" r="5" fill="none" stroke="#1f1510" stroke-width="2"/></g>' +
      '<g class="mh" style="--a:' + a[1] + 'deg"><path d="M100 106L98 100L100 30L102 100Z" fill="#1f1510"/></g><circle cx="100" cy="100" r="4.5" fill="#c79a4e" stroke="#1f1510" stroke-width="1.2"/>';
    return s + "</svg>";
  }
  function caseSVG() { // բաց կորպուս՝ ոսկե եզրով
    return '<svg class="case" viewBox="0 0 240 280" aria-hidden="true"><defs><linearGradient id="br" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f3dca0"/><stop offset=".35" stop-color="#c79a4e"/><stop offset=".6" stop-color="#8f6a2f"/><stop offset=".85" stop-color="#e2c07a"/><stop offset="1" stop-color="#8f6a2f"/></linearGradient></defs>' +
      '<path d="M120 8C112 -50 60 -90 -40 -150" fill="none" stroke="url(#br)" stroke-width="5" stroke-dasharray="8 3" stroke-linecap="round"/><path d="M120 4a14 14 0 1 1 0 28a14 14 0 1 1 0-28zm0 6a8 8 0 1 0 0 16a8 8 0 1 0 0-16z" fill="url(#br)"/><rect x="108" y="28" width="24" height="18" rx="4" fill="url(#br)"/><rect x="104" y="40" width="32" height="10" rx="3" fill="#8f6a2f"/>' +
      '<circle cx="120" cy="160" r="112" fill="url(#br)"/><circle cx="120" cy="160" r="104" fill="none" stroke="#fff2c8" stroke-opacity=".5" stroke-width="1.5"/><circle cx="120" cy="160" r="100" fill="#2a1d15"/></svg>';
  }
  function lid() { // կափարիչ՝ փորագրված
    var s = '<svg viewBox="0 0 240 240" aria-hidden="true"><defs><radialGradient id="ld" cx=".38" cy=".32"><stop offset="0" stop-color="#f6e2ab"/><stop offset=".5" stop-color="#c79a4e"/><stop offset="1" stop-color="#7d5a25"/></radialGradient></defs>' +
      '<circle cx="120" cy="120" r="112" fill="url(#ld)"/><circle cx="120" cy="120" r="96" fill="none" stroke="#7d5a25" stroke-width="1.2"/><circle cx="120" cy="120" r="90" fill="none" stroke="#fff2c8" stroke-opacity=".45" stroke-width="1"/>';
    for (var i = 0; i < 24; i++) { var q = i * 15 * Math.PI / 180; s += '<path d="M' + f(120 + Math.sin(q) * 30) + " " + f(120 - Math.cos(q) * 30) + "Q" + f(120 + Math.sin(q + .2) * 60) + " " + f(120 - Math.cos(q + .2) * 60) + " " + f(120 + Math.sin(q) * 88) + " " + f(120 - Math.cos(q) * 88) + '" fill="none" stroke="#7d5a25" stroke-opacity=".55" stroke-width=".8"/>'; }
    return s + '<circle cx="120" cy="120" r="30" fill="url(#ld)" stroke="#7d5a25" stroke-width="1"/><text x="120" y="132" text-anchor="middle" font-family="Noto Serif, serif" font-weight="500" font-size="32" fill="#5a3a24">' + esc(C.age || "") + "</text></svg>";
  }
  function lidBack() { // կափարիչի ներսը՝ փորագրված տարեթվերով
    var y = K.date.getFullYear(), b = y - (+C.age || 0);
    return '<svg viewBox="0 0 240 240" aria-hidden="true"><defs><radialGradient id="lb" cx=".5" cy=".45"><stop offset="0" stop-color="#e9cf8e"/><stop offset=".7" stop-color="#b8893f"/><stop offset="1" stop-color="#7d5a25"/></radialGradient></defs>' +
      '<circle cx="120" cy="120" r="112" fill="url(#lb)"/><circle cx="120" cy="120" r="98" fill="none" stroke="#7d5a25" stroke-width="1"/>' +
      '<text x="120" y="112" text-anchor="middle" font-family="Noto Serif, serif" font-size="22" letter-spacing="3" fill="#6b4a1f">' + b + '</text><path d="M96 122H144" stroke="#6b4a1f" stroke-width="1"/>' +
      '<text x="120" y="148" text-anchor="middle" font-family="Noto Serif, serif" font-size="22" letter-spacing="3" fill="#6b4a1f">' + y + "</text></svg>";
  }
  function envelope() {
    var n = K.names(), d = K.date;
    return '<div class="env" id="env" role="button" aria-label="' + esc(x("hint")) + '"><div class="leather"></div><div class="top"><div class="caps">' + esc(x("top")) + '</div><div class="nm">' + esc(n[0] || "") + "</div></div>" +
      '<div class="watch" id="watch">' + caseSVG() + '<div class="face">' + dial(pad(d.getHours()) + ":" + pad(d.getMinutes()), true, C.age) + '</div><div class="lid"><div class="lf">' + lid() + '</div><div class="lb">' + lidBack() + "</div></div></div>" +
      (K.PREVIEW ? "" : '<div class="hint">' + esc(x("hint")) + "</div>") + "</div>";
  }
  function hero() {
    var n = K.names(), d = K.date;
    return '<section class="hero"><div class="wrap"><div class="caps rv">' + esc(x("inv")) + '</div><div class="age rv d1">' + esc(C.age || "") + '</div><div class="ys rv d1">' + esc(x("years")) + "</div>" +
      '<h1 class="nm rv d2">' + esc(n[0] || "") + '</h1><div class="rule rv d2"></div><div class="dt rv d2">' + esc(x("wdl")[d.getDay()]) + " · " + d.getDate() + " " + esc(u("monthsGen")[d.getMonth()]) + " " + d.getFullYear() + "</div>" +
      '<div class="mini rv d3">' + dial(pad(d.getHours()) + ":" + pad(d.getMinutes()), true) + "</div></div></section>";
  }
  function story() {
    return '<section class="band"><div class="wrap"><h2 class="h2 rv">' + esc(x("our")) + '</h2><p class="p rv">' + esc(t(C.text)) + "</p></div></section>";
  }
  function countdown() {
    return '<section><div class="wrap"><div class="caps rv">' + esc(x("left")) + '</div><div class="cdn rv" data-cd>' + ["days", "hours", "minutes", "seconds"].map(function (k) {
      return '<div><b data-k="' + k + '">00</b><span>' + esc(u(k)) + "</span></div>";
    }).join("") + "</div></div></section>";
  }
  function program() {
    return '<section class="band"><div class="wrap"><h2 class="h2 rv">' + esc(x("program")) + "</h2>" + (C.events || []).map(function (e) {
      return '<div class="ev rv"><div class="pic ico">' + dial(e.time, false) + '</div><div class="info"><div class="tm">' + esc(e.time) + '</div><div class="t">' + esc(t(e.title)) +
        '</div><div class="n">' + esc(t(e.place)) + '</div><div class="a">' + esc(t(e.address)) + "</div>" + (e.map ? '<a class="btn" href="' + esc(e.map) + '" target="_blank" rel="noopener">' + esc(u("map")) + "</a>" : "") + "</div></div>";
    }).join("") + "</div></section>";
  }
  function dress() {
    if (!C.dresscode) return "";
    return '<section><div class="wrap"><h2 class="h2 rv">' + esc(x("dress")) + '</h2><p class="rv">' + esc(t(C.dresscode.text)) + '</p><div class="dots rv">' +
      (C.dresscode.colors || []).map(function (c) { return '<i style="background:' + esc(c) + '"></i>'; }).join("") + "</div></div></section>";
  }
  function rsvp() {
    if (!C.rsvp) return "";
    return '<section class="band"><div class="wrap"><h2 class="h2 rv">' + esc(x("rsvp")) + '</h2><p class="rv">' + esc(x("rsvpLead")) + " " + esc(K.deadline()) + "</p>" +
      '<form class="rs rv" id="rf"><label class="radio"><input type="radio" name="attend" value="yes" checked>' + esc(u("yes")) + "</label>" +
      '<label class="radio"><input type="radio" name="attend" value="no">' + esc(u("no")) + "</label>" +
      '<div class="fl"><label for="rn">' + esc(u("name")) + '</label><input id="rn" name="name" required autocomplete="name"></div>' +
      '<div class="fl"><label for="rg">' + esc(u("guests")) + '</label><select id="rg" name="guests">' + [1, 2, 3, 4, 5, 6].map(function (i) { return "<option>" + i + "</option>"; }).join("") + "</select></div>" +
      '<button class="btn fill" type="submit">' + esc(u("send")) + "</button></form></div></section>";
  }
  function fin() {
    return '<section class="fin"><div class="wrap"><div class="fl2 rv">' + lid() + '</div><div class="caps rv">' + esc(x("fin")) + '</div><div class="nm rv">' + esc(K.names()[0] || "") + "</div></div></section>" +
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
  // թագը սեղմվում է → կափարիչը բացվում է → սլաքները պտտվում են ու կանգնում տոնի ժամին → մոտեցում
  function open() {
    var env = document.getElementById("env"); if (env.dataset.busy) return; env.dataset.busy = "1";
    K.music.play();
    env.classList.add("s1");
    setTimeout(function () { env.classList.add("s2"); }, 350);
    setTimeout(function () { env.classList.add("s3"); }, 1300);
    setTimeout(function () { env.classList.add("s4"); }, 3600);
    setTimeout(function () {
      opened = true; document.body.classList.remove("locked");
      document.getElementById("app").insertAdjacentHTML("beforeend", K.chrome()); K.bindChrome(render); K.reveal();
    }, 4200);
    setTimeout(function () { env.remove(); }, 4900);
  }
  render();
})();
