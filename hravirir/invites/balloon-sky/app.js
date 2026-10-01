/* «Օդապարիկ» դիզայնի դասավորությունը */
(function () {
  "use strict";
  var K = window.K, C = K.C, esc = K.esc, t = K.t, u = K.u, pad = K.pad;
  var TXT = {
    hy: { hint: "Սեղմեք օդապարիկին", top: "Ծննդյան հրավեր", sub: "Ես արդեն", years: "տարեկան եմ", plan: "Օրվա ծրագիր", where: "Որտեղ", dress: "Դրեսկոդ", left: "Ծնունդին մնացել է",
      rsvp: "Հարցաթերթիկ", rsvpLead: "Խնդրում ենք պատասխանել մինչև", fin: "Սպասում եմ քեզ", wdl: ["Կիրակի", "Երկուշաբթի", "Երեքշաբթի", "Չորեքշաբթի", "Հինգշաբթի", "Ուրբաթ", "Շաբաթ"] },
    ru: { hint: "Нажмите на шар", top: "Приглашение на день рождения", sub: "Мне уже", years: "", plan: "Программа дня", where: "Где", dress: "Дресс-код", left: "До дня рождения осталось",
      rsvp: "Анкета", rsvpLead: "Пожалуйста, ответьте до", fin: "Жду тебя", wdl: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"] },
    en: { hint: "Tap the balloon", top: "Birthday invitation", sub: "I'm turning", years: "", plan: "Schedule", where: "Where", dress: "Dress code", left: "Counting down",
      rsvp: "RSVP", rsvpLead: "Kindly reply by", fin: "See you there", wdl: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] }
  };
  function x(k) { return (TXT[K.lang] || TXT.hy)[k]; }
  function f(v) { return Math.round(v * 10) / 10; }
  var COLS = ["#f0a88e", "#9fcfbf", "#f3d27a", "#b9a9d9", "#86b6d8", "#f5c1c7"];

  // օդապարիկ՝ գույնզգույն շերտերով, պարաններով և հյուսված զամբյուղով
  function balloon(tag, cols) {
    cols = cols || COLS; var id = "b" + Math.random().toString(36).slice(2, 7), g = "";
    for (var i = -4; i <= 4; i++) {           // ուղղահայաց շերտեր (կորացած՝ ուռուցիկ տեսք)
      var x0 = i * 14, bend = i * 9;
      g += '<path d="M' + x0 + " -110C" + (x0 + bend) + " -80 " + (x0 + bend * 1.25) + " -10 " + (x0 * .45) + ' 52L' + ((i + 1) * 14 * .45) + " 52C" + ((i + 1) * 14 + (i + 1) * 9 * 1.25) + " -10 " + ((i + 1) * 14 + (i + 1) * 9) + " -80 " + ((i + 1) * 14) + ' -110Z" fill="' + cols[(i + 4) % cols.length] + '"/>';
    }
    var shape = "M0 -100C62 -100 82 -40 60 4C48 28 26 44 16 56H-16C-26 44 -48 28 -60 4C-82 -40 -62 -100 0 -100Z";
    var basket = '<path d="M-13 92h26l-3 22h-20z" fill="#d7ab77"/><path d="M-12 99h24M-11 106h22M-6 92v22M0 92v22M6 92v22" stroke="#b68650" stroke-width="1"/><rect x="-15" y="89" width="30" height="5" rx="2" fill="#c08f58"/>';
    var ropes = '<path d="M-16 56L-12 90M16 56L12 90M-5 57L-4 90M5 57L4 90" stroke="#9c8a72" stroke-width="1"/>';
    var tagEl = tag ? '<g transform="translate(0 126)"><path d="M-2 -12L-40 0H40Z" fill="none"/><path d="M-1 -12Q-30 -6 -46 0M1 -12Q30 -6 46 0" stroke="#9c8a72" stroke-width=".8" fill="none"/>' +
      '<rect x="-48" y="0" width="96" height="26" rx="6" fill="#fff" stroke="#f0a88e" stroke-width="1.2"/><text x="0" y="18" text-anchor="middle" font-family="Noyemi, GHEA Mariam, serif" font-size="15" fill="#4d4a5c">' + esc(tag) + "</text></g>" : "";
    return '<svg viewBox="-90 -112 180 ' + (tag ? 270 : 232) + '" aria-hidden="true"><defs><clipPath id="' + id + '"><path d="' + shape + '"/></clipPath>' +
      '<radialGradient id="' + id + 's" cx=".35" cy=".3" r=".75"><stop offset="0" stop-color="#fff" stop-opacity=".45"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#3b3450" stop-opacity=".22"/></radialGradient></defs>' +
      '<g clip-path="url(#' + id + ')">' + g + '<path d="' + shape + '" fill="url(#' + id + 's)"/></g><path d="' + shape + '" fill="none" stroke="#fff" stroke-width="1.2" opacity=".6"/>' +
      '<rect x="-17" y="52" width="34" height="6" rx="3" fill="#c08f58"/>' + ropes + basket + tagEl + "</svg>";
  }
  function cloud(w) {
    var c = "", s = 3;
    for (var i = 0; i < 8; i++) { s = (s * 16807) % 2147483647; var r = s / 2147483647; c += '<ellipse cx="' + f(30 + i * 20) + '" cy="' + f(60 - Math.sin(i / 7 * Math.PI) * 24) + '" rx="' + f(24 + r * 14) + '" ry="' + f(18 + r * 8) + '" fill="#fff"/>'; }
    return '<svg viewBox="0 0 210 100" aria-hidden="true"><defs><filter id="cbl"><feGaussianBlur stdDeviation="2.5"/></filter></defs><g filter="url(#cbl)" opacity=".92">' + c + "</g></svg>";
  }
  function envelope() {
    var g = K.guest(), n = K.names();
    return '<div class="env sky" id="env" role="button" aria-label="' + esc(x("hint")) + '">' +
      '<div class="cloud a l" style="left:-20%;top:12%;width:70%">' + cloud() + '</div><div class="cloud b r" style="right:-24%;top:30%;width:74%">' + cloud() + "</div>" +
      '<div class="cloud a l" style="left:-26%;bottom:6%;width:80%">' + cloud() + '</div><div class="cloud b r" style="right:-20%;bottom:16%;width:64%">' + cloud() + "</div>" +
      '<div class="mini" style="left:10%;top:30%">' + balloon("", ["#9fcfbf", "#fff"]) + '</div><div class="mini" style="right:12%;top:62%;animation-delay:-2s">' + balloon("", ["#b9a9d9", "#fff"]) + "</div>" +
      '<div class="top"><div class="caps">' + esc(x("top")) + "</div>" + (g ? "<b>" + esc(g) + "</b>" : "") + "</div>" +
      '<div class="bal" id="seal">' + balloon((n[0] || "") + " · " + (C.age || "")) + "</div>" +
      (K.PREVIEW ? "" : '<div class="hint">' + esc(x("hint")) + "</div>") + "</div>";
  }
  function hero() {
    var n = K.names(), d = K.date;
    return '<section class="hero sky"><div class="cloud a" style="left:-24%;top:6%;width:70%">' + cloud() + '</div><div class="cloud b" style="right:-26%;top:40%;width:70%">' + cloud() + "</div>" +
      '<div class="hbal" style="left:3%;top:3%;width:15%">' + balloon("", ["#f0a88e", "#fff"]) + '</div><div class="hbal" style="right:3%;top:58%;width:15%;animation-delay:-2.5s">' + balloon("", ["#86b6d8", "#fff"]) + "</div>" +
      '<div class="wrap" style="position:relative"><div class="caps rv">' + esc(x("top")) + '</div><div class="nm rv d1">' + esc(n[0] || "") + '</div><div class="sub rv d1">' + esc(x("sub")) + "</div>" +
      '<div class="age rv d2">' + esc(C.age || "") + '</div><div class="sub rv d2">' + esc(x("years")) + "</div>" +
      '<div class="chips rv d3"><span>' + esc(x("wdl")[d.getDay()]) + "</span><span>" + d.getDate() + " " + esc(u("monthsGen")[d.getMonth()]) + "</span><span>" + pad(d.getHours()) + ":" + pad(d.getMinutes()) + "</span></div>" +
      (C.photo ? '<div class="photo rv d3" style="background-image:url(\'' + esc(C.photo) + '\')"></div>' : "") + "</div></section>";
  }
  function body() {
    var s = '<section><div class="wrap"><h2 class="h2 rv">' + esc(t(C.greeting)) + '</h2><p class="p rv">' + esc(t(C.text)) + "</p></div></section>";
    if (C.activities) s += '<section class="sky" style="background:linear-gradient(180deg,#eef4f9,#fdf1ec)"><div class="wrap"><h2 class="h2 rv">' + esc(x("plan")) + '</h2><div class="acts">' + C.activities.map(function (a, i) {
      return '<div class="act rv"><div class="em" style="background:' + COLS[i % COLS.length] + '">' + esc(a.time) + "</div><b>" + esc(t(a.text)) + "</b></div>"; }).join("") + "</div></div></section>";
    var v = C.venue;
    if (v) s += '<section><div class="wrap"><h2 class="h2 rv">' + esc(x("where")) + '</h2><div class="place rv">' + (v.img ? '<img alt="" data-wc="' + esc(v.img) + '">' : '<div class="ico">' + K.evIcon(v) + "</div>") +
      '<div class="n">' + esc(t(v.place)) + '</div><div class="a">' + esc(t(v.address)) + "</div>" + (v.map ? '<a class="btn" href="' + esc(v.map) + '" target="_blank" rel="noopener">' + esc(u("map")) + "</a>" : "") + "</div>" +
      (C.dresscode ? '<h2 class="h2 rv" style="margin-top:48px">' + esc(x("dress")) + '</h2><p class="rv">' + esc(t(C.dresscode.text)) + '</p><div class="dots rv">' +
        (C.dresscode.colors || []).map(function (c) { return '<i style="background:' + esc(c) + '"></i>'; }).join("") + "</div>" : "") + "</div></section>";
    s += '<section class="sky" style="background:linear-gradient(180deg,#fdf1ec,#eef4f9)"><div class="wrap"><h2 class="h2 rv">' + esc(x("left")) + '</h2><div class="cdn rv" data-cd>' + ["days", "hours", "minutes", "seconds"].map(function (k) {
      return '<div><b data-k="' + k + '">00</b><span>' + esc(u(k)) + "</span></div>"; }).join("") + "</div>";
    if (C.rsvp) s += '<h2 class="h2 rv" style="margin-top:46px">' + esc(x("rsvp")) + '</h2><p class="rv">' + esc(x("rsvpLead")) + " " + esc(K.deadline()) + "</p>" +
      '<form class="rs rv" id="rf"><label class="radio"><input type="radio" name="attend" value="yes" checked>' + esc(u("yes")) + "</label>" +
      '<label class="radio"><input type="radio" name="attend" value="no">' + esc(u("no")) + "</label>" +
      '<div class="fl"><label for="rn">' + esc(u("name")) + '</label><input id="rn" name="name" required autocomplete="name"></div>' +
      '<div class="fl"><label for="rg">' + esc(u("guests")) + '</label><select id="rg" name="guests">' + [1, 2, 3, 4, 5, 6].map(function (i) { return "<option>" + i + "</option>"; }).join("") + "</select></div>" +
      '<button class="btn" type="submit">' + esc(u("send")) + "</button></form>";
    return s + '</div></section><section class="fin"><div class="wrap"><div class="caps rv">' + esc(x("fin")) + '</div><div class="nm rv">' + esc(K.names()[0] || "") + "</div></div></section>" +
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
  // օդապարիկը բարձրանում է, ամպերը բաժանվում են
  function open() {
    var env = document.getElementById("env"); if (env.classList.contains("open")) return;
    K.music.play(); env.classList.add("open");
    setTimeout(function () {
      opened = true; document.body.classList.remove("locked");
      document.getElementById("app").insertAdjacentHTML("beforeend", K.chrome()); K.bindChrome(render); K.reveal();
    }, 2300);
    setTimeout(function () { env.remove(); }, 2800);
  }
  render();
})();
