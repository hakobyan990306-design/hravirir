/* «Տիեզերք» (տղայի ծնունդ) դիզայնի դասավորությունը */
(function () {
  "use strict";
  var K = window.K, C = K.C, esc = K.esc, t = K.t, u = K.u, pad = K.pad;
  var TXT = {
    hy: { hint: "Սեղմեք հրթիռին", top: "Հրավեր ծննդյան", sub: "Ինձ արդեն", years: "տարեկան է", plan: "Թռիչքի պլան", where: "Վայրէջքի վայրը", dress: "Տիեզերական դրեսկոդ", left: "Մինչև մեկնարկ",
      rsvp: "Կթռչե՞ս ինձ հետ", rsvpLead: "Խնդրում ենք պատասխանել մինչև", fin: "Սպասում եմ քեզ", wdl: ["Կիրակի", "Երկուշաբթի", "Երեքշաբթի", "Չորեքշաբթի", "Հինգշաբթի", "Ուրբաթ", "Շաբաթ"] },
    ru: { hint: "Нажмите на ракету", top: "Приглашение на день рождения", sub: "Мне уже", years: "", plan: "План полёта", where: "Место посадки", dress: "Космический дресс-код", left: "До старта",
      rsvp: "Полетишь со мной?", rsvpLead: "Пожалуйста, ответьте до", fin: "Жду тебя", wdl: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"] },
    en: { hint: "Tap the rocket", top: "Birthday invitation", sub: "I'm turning", years: "", plan: "Flight plan", where: "Landing site", dress: "Space dress code", left: "Launch in",
      rsvp: "Will you fly with me?", rsvpLead: "Kindly reply by", fin: "See you there", wdl: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] }
  };
  function x(k) { return (TXT[K.lang] || TXT.hy)[k]; }
  function f(v) { return Math.round(v * 10) / 10; }
  var s0 = 13; function r() { s0 = (s0 * 16807) % 2147483647; return s0 / 2147483647; }

  function stars(n) { var h = ""; for (var i = 0; i < n; i++) { var z = 1 + r() * 2; h += '<i style="left:' + f(r() * 100) + "%;top:" + f(r() * 100) + "%;width:" + f(z) + "px;height:" + f(z) + "px;animation-delay:-" + f(r() * 3) + 's"></i>'; } return '<div class="stars">' + h + "</div>"; }
  function planet(cls, style, c1, c2, ring) {
    return '<div class="planet ' + cls + '" style="' + style + ";background:radial-gradient(circle at 30% 30%," + c1 + "," + c2 + ')">' +
      (ring ? '<i style="position:absolute;left:-30%;right:-30%;top:44%;height:14%;border:2px solid rgba(255,214,107,.7);border-radius:50%;transform:rotate(-18deg)"></i>' : "") + "</div>";
  }
  function rocket() {
    return '<svg viewBox="0 0 100 200" aria-hidden="true"><defs><linearGradient id="rb" x1="0" x2="1"><stop offset="0" stop-color="#d9dcf0"/><stop offset=".45" stop-color="#ffffff"/><stop offset="1" stop-color="#b9bddb"/></linearGradient></defs>' +
      '<path class="flame" d="M38 168Q50 230 62 168Z" fill="#ffd66b"/><path class="flame" d="M43 168Q50 206 57 168Z" fill="#ff9f5a"/>' +
      '<path d="M22 120L6 160L30 150Z" fill="#ff8fb1"/><path d="M78 120L94 160L70 150Z" fill="#ff8fb1"/>' +
      '<path d="M50 4C74 26 80 70 76 140L70 166H30L24 140C20 70 26 26 50 4Z" fill="url(#rb)"/>' +
      '<path d="M50 4C60 13 66 24 70 36H30C34 24 40 13 50 4Z" fill="#ff9f5a"/><rect x="30" y="160" width="40" height="10" rx="3" fill="#8a8fb8"/>' +
      '<circle cx="50" cy="74" r="15" fill="#6fd3d0" stroke="#8a8fb8" stroke-width="4"/><circle cx="45" cy="69" r="4" fill="#fff" opacity=".7"/>' +
      '<text x="50" y="128" text-anchor="middle" font-family="Armmatura, GHEA Mariam, sans-serif" font-size="22" fill="#232a5c">' + esc(C.age || "") + "</text></svg>";
  }
  function smoke() { var h = ""; for (var i = 0; i < 16; i++) { var a = Math.PI + r() * Math.PI, d = 60 + r() * 140; h += '<i style="--x:' + f(Math.cos(a) * d) + "px;--y:" + f(-Math.abs(Math.sin(a)) * d * .4 - 10) + "px;--dl:" + f(r() * .4) + 's"></i>'; } return '<div class="smoke">' + h + "</div>"; }
  function envelope() {
    var g = K.guest();
    return '<div class="env" id="env" role="button" aria-label="' + esc(x("hint")) + '">' + stars(60) + planet("", "left:-40px;top:22%;width:120px;height:120px", "#ffb38a", "#c95f4a", true) +
      planet("", "right:10%;top:48%;width:44px;height:44px", "#9ff0ea", "#3f8f9c") +
      '<div class="top"><div class="caps">' + esc(x("top")) + "</div>" + (g ? "<b>" + esc(g) + "</b>" : "") + "</div>" +
      '<div class="count" id="cnt"></div><div class="ground"></div><div class="pad"></div>' + smoke() + '<div class="rocket" id="seal">' + rocket() + "</div>" +
      (K.PREVIEW ? "" : '<div class="hint">' + esc(x("hint")) + "</div>") + "</div>";
  }
  function hero() {
    var n = K.names(), d = K.date;
    return '<section class="hero">' + stars(40) + planet("", "right:-30px;top:8%;width:90px;height:90px", "#ffd66b", "#e08a3a", true) + planet("", "left:6%;bottom:14%;width:36px;height:36px", "#ff8fb1", "#b54b77") +
      '<div class="wrap" style="position:relative"><div class="caps rv">' + esc(x("top")) + '</div><div class="nm rv d1">' + esc(n[0] || "") + '</div><div class="sub rv d1">' + esc(x("sub")) + "</div>" +
      '<div class="age rv d2">' + esc(C.age || "") + '</div><div class="sub rv d2">' + esc(x("years")) + "</div>" +
      '<div class="chips rv d3"><span>' + esc(x("wdl")[d.getDay()]) + "</span><span>" + d.getDate() + " " + esc(u("monthsGen")[d.getMonth()]) + "</span><span>" + pad(d.getHours()) + ":" + pad(d.getMinutes()) + "</span></div>" +
      (C.photo ? '<div class="photo rv d3" style="background-image:url(\'' + esc(C.photo) + '\')"></div>' : "") + "</div></section>";
  }
  function body() {
    var v = C.venue, s = '<section class="band">' + stars(20) + '<div class="wrap" style="position:relative"><h2 class="h2 rv">' + esc(t(C.greeting)) + '</h2><p class="p rv">' + esc(t(C.text)) + "</p></div></section>";
    if (C.activities) s += '<section><div class="wrap"><h2 class="h2 rv">' + esc(x("plan")) + '</h2><div class="acts">' + C.activities.map(function (a) {
      return '<div class="act rv"><b>' + esc(a.time) + "</b><span>" + esc(t(a.text)) + "</span></div>"; }).join("") + "</div></div></section>";
    if (v) s += '<section class="band"><div class="wrap"><h2 class="h2 rv">' + esc(x("where")) + '</h2><div class="place rv">' + (v.img ? '<img alt="" data-wc="' + esc(v.img) + '">' : '<div class="ico">' + rocket() + "</div>") +
      '<div class="n">' + esc(t(v.place)) + '</div><div class="a">' + esc(t(v.address)) + "</div>" + (v.map ? '<a class="btn" href="' + esc(v.map) + '" target="_blank" rel="noopener">' + esc(u("map")) + "</a>" : "") + "</div>" +
      (C.dresscode ? '<h2 class="h2 rv" style="margin-top:48px">' + esc(x("dress")) + '</h2><p class="rv">' + esc(t(C.dresscode.text)) + '</p><div class="dots rv">' +
        (C.dresscode.colors || []).map(function (c) { return '<i style="background:' + esc(c) + '"></i>'; }).join("") + "</div>" : "") + "</div></section>";
    s += '<section><div class="wrap"><h2 class="h2 rv">' + esc(x("left")) + '</h2><div class="cdn rv" data-cd>' + ["days", "hours", "minutes", "seconds"].map(function (k) {
      return '<div><b data-k="' + k + '">00</b><span>' + esc(u(k)) + "</span></div>"; }).join("") + "</div>";
    if (C.rsvp) s += '<h2 class="h2 rv" style="margin-top:46px">' + esc(x("rsvp")) + '</h2><p class="rv">' + esc(x("rsvpLead")) + " " + esc(K.deadline()) + "</p>" +
      '<form class="rs rv" id="rf"><label class="radio"><input type="radio" name="attend" value="yes" checked>' + esc(u("yes")) + "</label>" +
      '<label class="radio"><input type="radio" name="attend" value="no">' + esc(u("no")) + "</label>" +
      '<div class="fl"><label for="rn">' + esc(u("name")) + '</label><input id="rn" name="name" required autocomplete="name"></div>' +
      '<div class="fl"><label for="rg">' + esc(u("guests")) + '</label><select id="rg" name="guests">' + [1, 2, 3, 4, 5, 6].map(function (i) { return "<option>" + i + "</option>"; }).join("") + "</select></div>" +
      '<button class="btn" type="submit">' + esc(u("send")) + "</button></form>";
    return s + '</div></section><section class="fin band">' + stars(20) + '<div class="wrap" style="position:relative"><div class="caps rv">' + esc(x("fin")) + '</div><div class="nm rv">' + esc(K.names()[0] || "") + "</div></div></section>" +
      '<div class="made"><a href="https://hravirir.am" target="_blank" rel="noopener">HRAVIRIR.AM</a></div>';
  }

  var opened = false;
  function render() {
    document.documentElement.lang = K.lang;
    document.title = K.names()[0] || "";
    document.getElementById("app").innerHTML = (opened ? "" : envelope()) + "<main>" + hero() + body() + "</main>" + (opened ? K.chrome() : "");
    document.body.classList.toggle("locked", !opened);
    if (!opened) { var e = document.getElementById("env"); if (e && !K.PREVIEW) e.onclick = open; } else K.reveal();
    if (window.Watercolor) window.Watercolor.apply();
    K.countdown(true); K.rsvp(document.getElementById("rf")); K.bindChrome(render);
  }
  // 3 → 2 → 1 → ծուխ և մեկնարկ
  function open() {
    var env = document.getElementById("env"), cnt = document.getElementById("cnt"); if (env.dataset.busy) return; env.dataset.busy = "1";
    env.classList.add("go"); K.music.play();
    ["3", "2", "1"].forEach(function (n, i) { setTimeout(function () { cnt.textContent = n; cnt.classList.remove("show"); void cnt.offsetWidth; cnt.classList.add("show"); }, i * 800); });
    setTimeout(function () { env.classList.add("lift"); }, 2400);
    setTimeout(function () { env.classList.add("done"); }, 4400);
    setTimeout(function () {
      opened = true; document.body.classList.remove("locked");
      document.getElementById("app").insertAdjacentHTML("beforeend", K.chrome()); K.bindChrome(render); K.reveal();
    }, 4800);
    setTimeout(function () { env.remove(); }, 5500);
  }
  render();
})();
