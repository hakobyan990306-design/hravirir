/* «Ոսկե դարպաս» դիզայնի դասավորությունը */
(function () {
  "use strict";
  var K = window.K, C = K.C, esc = K.esc, t = K.t, u = K.u;
  var TXT = {
    hy: { hint: "Սեղմեք դարպասին", top: "Հարսանյաց հրավեր", inv: "Սիրով հրավիրում ենք Ձեզ մեր հարսանիքին", dear: "Սիրելի՛ հարազատներ", program: "Օրվա ծրագիր", dress: "Դրեսկոդ", left: "Մինչև հարսանիք մնաց",
      rsvp: "Կմիանա՞ք մեզ", rsvpLead: "Խնդրում ենք պատասխանել մինչև", fin: "Սիրով՝", wdl: ["Կիրակի", "Երկուշաբթի", "Երեքշաբթի", "Չորեքշաբթի", "Հինգշաբթի", "Ուրբաթ", "Շաբաթ"] },
    ru: { hint: "Нажмите на ворота", top: "Приглашение на свадьбу", inv: "С любовью приглашаем вас на нашу свадьбу", dear: "Дорогие родные", program: "Программа дня", dress: "Дресс-код", left: "До свадьбы осталось",
      rsvp: "Вы с нами?", rsvpLead: "Пожалуйста, ответьте до", fin: "С любовью,", wdl: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"] },
    en: { hint: "Tap the gate", top: "Wedding invitation", inv: "With love we invite you to our wedding", dear: "Dear family", program: "Schedule", dress: "Dress code", left: "Counting down",
      rsvp: "Will you join us?", rsvpLead: "Kindly reply by", fin: "With love,", wdl: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] }
  };
  function x(k) { return (TXT[K.lang] || TXT.hy)[k]; }
  function f(v) { return Math.round(v * 10) / 10; }
  function ini() { var n = K.list(C.names && (C.names.hy || C.names)); return (n[0] || "").charAt(0) + (n[1] || "").charAt(0); }
  var GOLD = '<linearGradient id="gg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7f6232"/><stop offset=".35" stop-color="#e3c485"/><stop offset=".55" stop-color="#a98041"/><stop offset=".8" stop-color="#f0dcaa"/><stop offset="1" stop-color="#8a6630"/></linearGradient>';

  // դարպասի կես (ձախ)՝ ուղղահայաց ձողեր նիզակաձև ծայրերով, գանգուրներ, կամարաձև վերնամաս. աջը՝ հայելային
  function leaf(W, H, mirror) {
    var bars = "", n = 7, gap = W / (n + .5), topY = H * .16, arch = "";
    for (var i = 0; i < n; i++) { var x = gap * (i + .75), y0 = topY + Math.sin((i + .5) / n * Math.PI / 2) * H * .08 * (mirror ? 1 : 1);
      var yy = mirror ? topY + Math.sin((n - i - .5) / n * Math.PI / 2) * H * .08 : topY + Math.sin((i + .5) / n * Math.PI / 2) * H * .08;
      yy = topY + H * .08 - (mirror ? (n - 1 - i) : i) / (n - 1) * H * .08;
      bars += '<rect x="' + f(x - 2.2) + '" y="' + f(yy) + '" width="4.4" height="' + f(H - yy) + '" fill="url(#gg)"/><path d="M' + f(x) + " " + f(yy - 16) + "l6 10-6 6-6-6z" + '" fill="url(#gg)"/>';
    }
    // հորիզոնական գոտիներ և գանգուրներ
    var bands = [H * .3, H * .62, H * .92].map(function (y) { return '<rect x="0" y="' + f(y) + '" width="' + W + '" height="6" fill="url(#gg)"/>'; }).join("");
    var sc = "";
    for (var k = 0; k < 3; k++) for (var j = 0; j < 3; j++) { var cx = gap * (1.25 + k * 2), cy = H * (.4 + j * .16);
      sc += '<path d="M' + f(cx - 14) + " " + f(cy) + "c0-12 18-12 18 0c0 8-10 8-10 2M" + f(cx + 14) + " " + f(cy + 18) + "c0-12-18-12-18 0c0 8 10 8 10 2" + '" fill="none" stroke="url(#gg)" stroke-width="2.6" stroke-linecap="round"/>'; }
    arch = '<path d="M0 ' + f(topY + H * .08) + (mirror ? "Q" + f(W * .5) + " " + f(topY - H * .02) + " " + W + " " + f(topY - H * .04) : "Q" + f(W * .5) + " " + f(topY - H * .02) + " " + W + " " + f(topY - H * .04)) + '" fill="none" stroke="url(#gg)" stroke-width="5"/>';
    var frame = '<rect x="' + (mirror ? W - 7 : 0) + '" y="0" width="7" height="' + H + '" fill="url(#gg)"/>' + '<rect x="' + (mirror ? 0 : W - 5) + '" y="' + f(topY) + '" width="5" height="' + f(H - topY) + '" fill="url(#gg)"/>';
    var g = bars + bands + sc + arch + frame;
    return '<svg viewBox="0 0 ' + W + " " + H + '" preserveAspectRatio="none" aria-hidden="true"><defs>' + GOLD + "</defs>" +
      '<rect width="' + W + '" height="' + H + '" fill="rgba(30,26,20,.35)"/>' + (mirror ? '<g transform="translate(' + W + ' 0) scale(-1 1)">' + g + "</g>" : g) + "</svg>";
  }
  function medallion() {
    return '<svg viewBox="0 0 100 100" aria-hidden="true"><defs>' + GOLD + '</defs><circle cx="50" cy="50" r="46" fill="url(#gg)"/><circle cx="50" cy="50" r="39" fill="#2a2721" stroke="#f0dcaa" stroke-width="1"/>' +
      '<circle cx="50" cy="50" r="34" fill="none" stroke="url(#gg)" stroke-width="1.4"/><text x="50" y="60" text-anchor="middle" font-family="ArmAllegro, GHEA Mariam, serif" font-size="30" fill="url(#gg)">' + esc(ini()) + "</text></svg>";
  }
  function orn() { return '<svg class="orn" viewBox="0 0 150 20" fill="none" stroke="#b08d57" stroke-width="1"><path d="M0 10h55M95 10h55"/><path d="M75 3l7 7-7 7-7-7z"/><circle cx="60" cy="10" r="2"/><circle cx="90" cy="10" r="2"/></svg>'; }
  function envelope() {
    var g = K.guest();
    return '<div class="env" id="env" role="button" aria-label="' + esc(x("hint")) + '"><div class="scene">' + (C.heroBg ? '<img alt="" data-wc="' + esc(C.heroBg) + '">' : "") + '<div class="glow"></div></div>' +
      '<div class="leaf l" id="ll"></div><div class="leaf r" id="lr"></div><div class="med">' + medallion() + "</div>" +
      '<div class="top"><div class="caps">' + esc(x("top")) + "</div>" + (g ? "<b>" + esc(g) + "</b>" : "") + "</div>" +
      (K.PREVIEW ? "" : '<div class="hint">' + esc(x("hint")) + "</div>") + "</div>";
  }
  function drawGate() {
    var l = document.getElementById("ll"); if (!l) return;
    var W = Math.round(window.innerWidth / 2), H = Math.round(window.innerHeight);
    l.innerHTML = leaf(W, H, false); document.getElementById("lr").innerHTML = leaf(W, H, true);
  }
  function hero() {
    var n = K.names(), d = K.date;
    return '<section class="hero">' + (C.heroBg ? '<div class="bg"><img alt="" data-wc="' + esc(C.heroBg) + '"></div>' : "") + '<div class="wrap"><div class="card rv"><div class="caps">' + esc(x("inv")) + "</div>" +
      '<h1 class="nm foil"><span>' + esc(n[0]) + '</span><span class="amp">&amp;</span><span>' + esc(n[1] || "") + "</span></h1>" + orn() +
      '<div class="dt3"><div class="s">' + esc(x("wdl")[d.getDay()]) + '</div><div class="d">' + d.getDate() + '</div><div class="s">' + esc(u("monthsGen")[d.getMonth()]) + '</div></div><div class="yr">' + d.getFullYear() + "</div></div></div></section>";
  }
  function body() {
    var s = '<section class="cream"><div class="wrap"><h2 class="h2 foil rv">' + esc(x("dear")) + '</h2><p class="p rv">' + esc(t(C.text)) + "</p>" +
      '<div class="cal rv"><div class="cal-h foil">' + esc(u("months")[K.date.getMonth()]) + " " + K.date.getFullYear() + '</div><div class="cal-g">' + K.calendarCells() + "</div></div></div></section>" +
      '<section style="padding:44px 0 10px"><div class="wrap"><div class="caps rv">' + esc(x("left")) + '</div><div class="cdn rv" data-cd>' + ["days", "hours", "minutes", "seconds"].map(function (k) {
        return '<div><b data-k="' + k + '">00</b><span>' + esc(u(k)) + "</span></div>"; }).join("") + "</div></div></section>" +
      '<section><div class="wrap"><h2 class="h2 foil rv">' + esc(x("program")) + "</h2>" + orn() + (C.events || []).map(function (e) {
        return '<div class="ev rv">' + (e.img ? '<div class="pic"><img alt="" data-wc="' + esc(e.img) + '"></div>' : "") + '<div class="tm">' + esc(e.time) + '</div><div class="t">' + esc(t(e.title)) +
          '</div><div class="n foil">' + esc(t(e.place)) + '</div><div class="a">' + esc(t(e.address)) + "</div>" + (e.map ? '<a class="btn" href="' + esc(e.map) + '" target="_blank" rel="noopener">' + esc(u("map")) + "</a>" : "") + "</div>";
      }).join("") + "</div></section>";
    if (C.dresscode) s += '<section class="cream"><div class="wrap"><h2 class="h2 foil rv">' + esc(x("dress")) + '</h2><p class="rv">' + esc(t(C.dresscode.text)) + '</p><div class="dots rv">' +
      (C.dresscode.colors || []).map(function (c) { return '<i style="background:' + esc(c) + '"></i>'; }).join("") + "</div></div></section>";
    if (C.rsvp) s += '<section><div class="wrap"><h2 class="h2 foil rv">' + esc(x("rsvp")) + '</h2><p class="rv">' + esc(x("rsvpLead")) + " " + esc(K.deadline()) + "</p>" +
      '<form class="rs rv" id="rf"><label class="radio"><input type="radio" name="attend" value="yes" checked>' + esc(u("yes")) + "</label>" +
      '<label class="radio"><input type="radio" name="attend" value="no">' + esc(u("no")) + "</label>" +
      '<div class="fl"><label for="rn">' + esc(u("name")) + '</label><input id="rn" name="name" required autocomplete="name"></div>' +
      '<div class="fl"><label for="rg">' + esc(u("guests")) + '</label><select id="rg" name="guests">' + [1, 2, 3, 4, 5, 6].map(function (i) { return "<option>" + i + "</option>"; }).join("") + "</select></div>" +
      '<button class="btn fill" type="submit">' + esc(u("send")) + "</button></form></div></section>";
    return s + '<section class="fin cream"><div class="wrap">' + orn() + '<div class="caps rv">' + esc(x("fin")) + '</div><div class="nm foil rv">' + esc(K.names().join(" & ")) + "</div></div></section>" +
      '<div class="made"><a href="https://hravirir.am" target="_blank" rel="noopener">HRAVIRIR.AM</a></div>';
  }

  var opened = false;
  function render() {
    document.documentElement.lang = K.lang;
    document.title = K.names().join(" & ");
    document.getElementById("app").innerHTML = (opened ? "" : envelope()) + "<main>" + hero() + body() + "</main>" + (opened ? K.chrome() : "");
    document.body.classList.toggle("locked", !opened);
    if (!opened) { drawGate(); var e = document.getElementById("env"); if (e && !K.PREVIEW) e.onclick = open; } else K.reveal();
    if (window.Watercolor) window.Watercolor.apply();
    K.countdown(true); K.rsvp(document.getElementById("rf")); K.bindChrome(render);
  }
  // դարպասի փեղկերը բացվում են դեպի մեզ, պալատը մոտենում է
  function open() {
    var env = document.getElementById("env"); if (env.classList.contains("open")) return;
    K.music.play(); env.classList.add("open");
    setTimeout(function () {
      opened = true; document.body.classList.remove("locked");
      document.getElementById("app").insertAdjacentHTML("beforeend", K.chrome()); K.bindChrome(render); K.reveal();
    }, 2700);
    setTimeout(function () { env.remove(); }, 3100);
  }
  window.addEventListener("resize", drawGate);
  render();
})();
