/* «Լավանդա» (հարսանիք) դիզայնի դասավորությունը */
(function () {
  "use strict";
  var K = window.K, C = K.C, esc = K.esc, t = K.t, u = K.u;
  var TXT = {
    hy: { hint: "Սեղմեք դաշտին", top: "Հարսանյաց հրավեր", dear: "Սիրելի՛ հարազատներ", program: "Օրվա ծրագիր", dress: "Դրեսկոդ", left: "Մինչև հարսանիք մնաց",
      rsvp: "Կմիանա՞ք մեզ", rsvpLead: "Խնդրում ենք պատասխանել մինչև", fin: "Սիրով սպասում ենք Ձեզ", wdl: ["Կիրակի", "Երկուշաբթի", "Երեքշաբթի", "Չորեքշաբթի", "Հինգշաբթի", "Ուրբաթ", "Շաբաթ"] },
    ru: { hint: "Нажмите на поле", top: "Приглашение на свадьбу", dear: "Дорогие родные", program: "Программа дня", dress: "Дресс-код", left: "До свадьбы осталось",
      rsvp: "Вы с нами?", rsvpLead: "Пожалуйста, ответьте до", fin: "С любовью ждём вас", wdl: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"] },
    en: { hint: "Tap the field", top: "Wedding invitation", dear: "Dear family", program: "The day", dress: "Dress code", left: "Counting down",
      rsvp: "Will you join us?", rsvpLead: "Kindly reply by", fin: "With love", wdl: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] }
  };
  function x(k) { return (TXT[K.lang] || TXT.hy)[k]; }
  function f(v) { return Math.round(v * 10) / 10; }
  var s0 = 19; function r() { s0 = (s0 * 16807) % 2147483647; return s0 / 2147483647; }

  // դաշտ՝ դեպի հորիզոն ձգվող շարքեր
  function field() {
    var p = "", vx = 200, vy = 0, n = 14;
    for (var i = 0; i < n; i++) {
      var x0 = -300 + i * 1000 / n, x1 = x0 + 1000 / n * .62;
      p += '<path d="M' + vx + " " + vy + "L" + f(x0) + " 400L" + f(x1) + ' 400Z" fill="url(#lr)"/>';
    }
    return '<svg viewBox="0 0 400 400" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="lr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b8a6d9"/><stop offset=".5" stop-color="#8f7bb8"/><stop offset="1" stop-color="#6a5698"/></linearGradient>' +
      '<linearGradient id="gr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b9b2a0"/><stop offset="1" stop-color="#7e8a66"/></linearGradient></defs><rect width="400" height="400" fill="url(#gr)"/>' + p +
      '<rect width="400" height="40" fill="#d9c3e6" opacity=".55"/></svg>';
  }
  // առջևի ցողուններ՝ լավանդայի հասկեր
  function stems(n) {
    var p = "";
    for (var i = 0; i < n; i++) {
      var x = 10 + i * (380 / n) + (r() - .5) * 14, h = 90 + r() * 70, lean = (r() - .5) * 16, g = '<g class="stem" style="animation-delay:-' + f(r() * 3) + 's">';
      g += '<path d="M' + f(x) + " 200Q" + f(x + lean / 2) + " " + f(200 - h / 2) + " " + f(x + lean) + " " + f(200 - h) + '" stroke="#7e8a66" stroke-width="1.6" fill="none"/>';
      for (var k = 0; k < 9; k++) { var tt = .55 + k * .05, bx = x + lean * tt, by = 200 - h * tt; g += '<ellipse cx="' + f(bx + (k % 2 ? 2.4 : -2.4)) + '" cy="' + f(by) + '" rx="3" ry="4.6" fill="' + ["#8f7bb8", "#a592cc", "#7a66a8"][k % 3] + '"/>'; }
      p += g + "</g>";
    }
    return '<svg viewBox="0 0 400 200" preserveAspectRatio="none" aria-hidden="true">' + p + "</svg>";
  }
  function sprig() {
    var g = '<path d="M20 150Q34 90 40 20" stroke="#7e8a66" stroke-width="1.6" fill="none"/>';
    for (var k = 0; k < 12; k++) { var tt = .45 + k * .045, bx = 20 + 20 * tt, by = 150 - 130 * tt; g += '<ellipse cx="' + f(bx + (k % 2 ? 3 : -3)) + '" cy="' + f(by) + '" rx="3.4" ry="5.4" fill="' + ["#8f7bb8", "#a592cc", "#7a66a8"][k % 3] + '"/>'; }
    return '<svg viewBox="0 0 60 160" aria-hidden="true">' + g + "</svg>";
  }
  function envelope() {
    var g = K.guest(), n = K.names();
    return '<div class="env" id="env" role="button" aria-label="' + esc(x("hint")) + '"><div class="sun"></div><div class="field">' + field() + '</div><div class="stems">' + stems(24) + "</div>" +
      '<div class="sky"><div class="caps">' + esc(x("top")) + '</div><div class="nm">' + esc(n[0] || "") + "<i>&amp;</i>" + esc(n[1] || "") + "</div>" + (g ? "<b>" + esc(g) + "</b>" : "") + "</div>" +
      (K.PREVIEW ? "" : '<div class="hint">' + esc(x("hint")) + "</div>") + "</div>";
  }
  function hero() {
    var n = K.names(), d = K.date;
    return '<section class="hero"><div class="sprig" style="left:-6px;top:30px;transform:rotate(-14deg)">' + sprig() + '</div><div class="sprig" style="right:-6px;bottom:40px;transform:rotate(166deg)">' + sprig() + "</div>" +
      '<div class="wrap"><div class="caps rv">' + esc(x("top")) + '</div><h1 class="nm rv d1"><span>' + esc(n[0]) + '</span><span class="amp">&amp;</span><span>' + esc(n[1] || "") + "</span></h1>" +
      '<div class="dt3 rv d2"><div class="s">' + esc(x("wdl")[d.getDay()]) + '</div><div class="d">' + d.getDate() + '</div><div class="s">' + esc(u("monthsGen")[d.getMonth()]) + '</div></div><div class="yr rv d2">' + d.getFullYear() + "</div>" +
      (C.photo ? '<div class="archp rv d3" style="background-image:url(\'' + esc(C.photo) + '\')"></div>' : "") + "</div></section>";
  }
  function body() {
    var s = '<section class="lavbg"><div class="wrap"><h2 class="h2 rv">' + esc(x("dear")) + '</h2><p class="p rv">' + esc(t(C.text)) + "</p></div></section>" +
      '<section style="padding:40px 0 10px"><div class="wrap"><div class="caps rv">' + esc(x("left")) + '</div><div class="cdn rv" data-cd>' + ["days", "hours", "minutes", "seconds"].map(function (k) {
        return '<div><b data-k="' + k + '">00</b><span>' + esc(u(k)) + "</span></div>"; }).join("") + "</div></div></section>" +
      '<section><div class="wrap"><h2 class="h2 rv">' + esc(x("program")) + "</h2>" + (C.events || []).map(function (e) {
        return '<div class="ev rv">' + (e.img ? '<div class="pic"><img alt="" data-wc="' + esc(e.img) + '"></div>' : '<div class="pic ico">' + sprig() + "</div>") + '<div class="tm">' + esc(e.time) + '</div><div class="t">' + esc(t(e.title)) +
          '</div><div class="n">' + esc(t(e.place)) + '</div><div class="a">' + esc(t(e.address)) + "</div>" + (e.map ? '<a class="btn" href="' + esc(e.map) + '" target="_blank" rel="noopener">' + esc(u("map")) + "</a>" : "") + "</div>";
      }).join("") + "</div></section>";
    if (C.dresscode) s += '<section class="lavbg"><div class="wrap"><h2 class="h2 rv">' + esc(x("dress")) + '</h2><p class="rv">' + esc(t(C.dresscode.text)) + '</p><div class="dots rv">' +
      (C.dresscode.colors || []).map(function (c) { return '<i style="background:' + esc(c) + '"></i>'; }).join("") + "</div></div></section>";
    if (C.rsvp) s += '<section><div class="wrap"><h2 class="h2 rv">' + esc(x("rsvp")) + '</h2><p class="rv">' + esc(x("rsvpLead")) + " " + esc(K.deadline()) + "</p>" +
      '<form class="rs rv" id="rf"><label class="radio"><input type="radio" name="attend" value="yes" checked>' + esc(u("yes")) + "</label>" +
      '<label class="radio"><input type="radio" name="attend" value="no">' + esc(u("no")) + "</label>" +
      '<div class="fl"><label for="rn">' + esc(u("name")) + '</label><input id="rn" name="name" required autocomplete="name"></div>' +
      '<div class="fl"><label for="rg">' + esc(u("guests")) + '</label><select id="rg" name="guests">' + [1, 2, 3, 4, 5, 6].map(function (i) { return "<option>" + i + "</option>"; }).join("") + "</select></div>" +
      '<button class="btn fill" type="submit">' + esc(u("send")) + "</button></form></div></section>";
    return s + '<section class="fin lavbg"><div class="wrap"><div class="caps rv">' + esc(x("fin")) + '</div><div class="nm rv">' + esc(K.names().join(" & ")) + "</div></div></section>" +
      '<div class="made"><a href="https://hravirir.am" target="_blank" rel="noopener">HRAVIRIR.AM</a></div>';
  }

  var opened = false;
  function render() {
    document.documentElement.lang = K.lang;
    document.title = K.names().join(" & ");
    document.getElementById("app").innerHTML = (opened ? "" : envelope()) + "<main>" + hero() + body() + "</main>" + (opened ? K.chrome() : "");
    document.body.classList.toggle("locked", !opened);
    if (!opened) { var e = document.getElementById("env"); if (e && !K.PREVIEW) e.onclick = open; } else K.reveal();
    if (window.Watercolor) window.Watercolor.apply();
    K.countdown(true); K.rsvp(document.getElementById("rf")); K.bindChrome(render);
  }
  // «թռչում ենք» դաշտի վրայով
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
