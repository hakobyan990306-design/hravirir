/* «Լույս» — սպիտակ/կաթնագույն և ոսկեգույն. բացումը՝ սպիտակ դաջված ծրար, ծաղիկները փայլում են,
   վերևի կափարիչը կնիքի հետ բարձրանում է, ներսից լույսի շողեր են դուրս գալիս */
(function () {
  "use strict";
  var K = window.K, C = K.C, esc = K.esc, t = K.t, u = K.u, P = window.P;
  P.texts({
    hy: { hint: "Սեղմեք կնիքին", welcome: "Սիրով հրավիրում ենք Ձեզ", wed: "մեր հարսանյաց արարողությանը", date: "Ամսաթիվ", dateT: "Պահպանեք այս օրը Ձեր օրացույցում",
      d: "օր", m: "ամիս", y: "տարի", left: "Հարսանիքին մնացել է", plan: "Օրվա ծրագիր", where: "Վայրեր", fin: "Սիրով սպասում ենք Ձեզ" },
    ru: { hint: "Нажмите на печать", welcome: "С любовью приглашаем вас", wed: "на нашу свадебную церемонию", date: "Дата", dateT: "Сохраните этот день в календаре",
      d: "день", m: "месяц", y: "год", left: "До свадьбы осталось", plan: "Программа дня", where: "Места", fin: "С любовью ждём вас" },
    en: { hint: "Tap the seal", welcome: "We joyfully invite you", wed: "to our wedding ceremony", date: "The date", dateT: "Save this day in your calendar",
      d: "day", m: "month", y: "year", left: "Until the wedding", plan: "Schedule", where: "Venues", fin: "With love" }
  });
  function ini() { var n = K.names(); return [(n[0] || "").charAt(0), (n[1] || "").charAt(0)]; }

  // ---------- դաջված ծաղկային նկարազարդ (սպիտակը սպիտակի վրա՝ լույս + ստվեր շերտերով, առանց filter-ի) ----------
  var s0 = 7; function r() { s0 = (s0 * 16807) % 2147483647; return s0 / 2147483647; }
  function rose(x, y, R) { // շերտավոր վարդ
    var h = "";
    for (var k = 3; k >= 1; k--) { var rr = R * k / 3, n = 5 + k; for (var i = 0; i < n; i++) { var a = i * 360 / n + k * 17; h += '<ellipse cx="' + x.toFixed(1) + '" cy="' + (y - rr * .55).toFixed(1) + '" rx="' + (rr * .42).toFixed(1) + '" ry="' + (rr * .62).toFixed(1) + '" transform="rotate(' + a.toFixed(0) + " " + x.toFixed(1) + " " + y.toFixed(1) + ')"/>'; } }
    return h + '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="' + (R * .22).toFixed(1) + '"/>';
  }
  function leaf(x, y, L, a) { return '<path transform="translate(' + x.toFixed(1) + " " + y.toFixed(1) + ") rotate(" + a.toFixed(0) + ')" d="M0 0C' + (L * .3).toFixed(1) + " -" + (L * .28).toFixed(1) + " " + (L * .75).toFixed(1) + " -" + (L * .26).toFixed(1) + " " + L.toFixed(1) + " 0C" + (L * .75).toFixed(1) + " " + (L * .26).toFixed(1) + " " + (L * .3).toFixed(1) + " " + (L * .28).toFixed(1) + ' 0 0Z"/>'; }
  function sprig(x, y, len, a, n) { // ճյուղ՝ տերևներով
    var h = '<path class="st" d="M' + x + " " + y + "l" + (Math.cos(a * Math.PI / 180) * len).toFixed(1) + " " + (Math.sin(a * Math.PI / 180) * len).toFixed(1) + '"/>';
    for (var i = 1; i <= n; i++) { var px = x + Math.cos(a * Math.PI / 180) * len * i / (n + 1), py = y + Math.sin(a * Math.PI / 180) * len * i / (n + 1); h += leaf(px, py, 9 + r() * 4, a - 40) + leaf(px, py, 9 + r() * 4, a + 40); }
    return h;
  }
  function bouquet(cx, cy, s) { // փունջ՝ կենտրոնում վարդ, կողքերում ճյուղեր և փոքր ծաղիկներ (սիմետրիկ)
    var h = "";
    [[-1, 1]].forEach(function () {});
    for (var side = -1; side <= 1; side += 2) {
      h += sprig(cx + side * 10 * s, cy, 70 * s, side > 0 ? -20 : 200, 5) + sprig(cx + side * 8 * s, cy + 8 * s, 58 * s, side > 0 ? 25 : 155, 4) + sprig(cx, cy - 6 * s, 44 * s, side > 0 ? -60 : 240, 3);
      h += rose(cx + side * 34 * s, cy + 10 * s, 11 * s) + rose(cx + side * 60 * s, cy - 6 * s, 7 * s) + rose(cx + side * 22 * s, cy - 22 * s, 6 * s);
    }
    return h + rose(cx, cy, 19 * s);
  }
  function art(kind) {
    s0 = 7; var g = "";
    if (kind === "top") g = bouquet(200, 300, 1.55);
    else if (kind === "bot") g = bouquet(200, 650, 1.2) + sprig(40, 520, 80, -60, 4) + sprig(360, 520, 80, 240, 4);
    else g = sprig(kind === "l" ? 20 : 380, 160, 150, kind === "l" ? 70 : 110, 7) + sprig(kind === "l" ? 30 : 370, 420, 140, kind === "l" ? 60 : 120, 6) + rose(kind === "l" ? 46 : 354, 300, 10) + rose(kind === "l" ? 40 : 360, 560, 8);
    var lay = function (cls, dx, dy) { return '<g class="' + cls + '" transform="translate(' + dx + " " + dy + ')">' + g + "</g>"; };
    return '<svg class="lv-art" viewBox="0 0 400 760" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' + lay("eD", 1.8, 2.2) + lay("eL", -1.3, -1.5) + lay("eM", 0, 0) + "</svg>";
  }
  // սպիտակ մոմե կնիք՝ դափնե պսակով և երկու սկզբնատառով (կենտրոնացված ըստ տառերի տեսքի)
  function seal() {
    var L = ini(), wr = "";
    for (var i = 0; i < 14; i++) { var a = -80 + i * 11.5, rad = a * Math.PI / 180, x = 60 + Math.cos(rad) * 34, y = 60 + Math.sin(rad) * 34; wr += leaf(x, y, 9, a + 120) + leaf(120 - x, y, 9, 60 - a); }
    return '<svg class="lv-seal" viewBox="0 0 120 120" aria-hidden="true"><defs><radialGradient id="lvS" cx=".38" cy=".32" r=".85"><stop offset="0" stop-color="#ffffff"/><stop offset=".55" stop-color="#f1ede6"/><stop offset="1" stop-color="#d8d0c3"/></radialGradient></defs>' +
      '<path d="M61 4C70 6 77 3 85 10C95 13 104 20 107 31C114 39 117 50 114 61C118 72 113 84 106 92C102 103 91 110 79 113C69 118 56 117 45 114C33 113 21 106 15 95C7 87 3 75 6 63C2 52 6 40 13 31C17 20 27 12 39 9C46 5 53 3 61 4Z" fill="url(#lvS)" style="filter:drop-shadow(0 1px 2px rgba(0,0,0,.12))"/>' +
      '<circle cx="60" cy="60" r="41" fill="none" stroke="#c9bfae" stroke-opacity=".7"/><g fill="#d9d0c2" stroke="#bfb4a2" stroke-width=".4">' + wr + "</g>" +
      '<g fill="#a8987f" text-anchor="middle" style="font-family:var(--script)"><text x="45" y="68" font-size="20">' + esc(L[0]) + '</text><text x="60" y="65" font-size="10">&amp;</text><text x="75" y="68" font-size="20">' + esc(L[1]) + "</text></g></svg>";
  }
  function env() {
    var n = K.names();
    return '<div class="env lve" id="env" role="button" aria-label="' + esc(P.x("hint")) + '">' +
      '<div class="lv-in"><div class="lv-rays"></div><div class="lv-glow"></div></div>' +
      '<div class="lv-f lv-l">' + art("l") + '</div><div class="lv-f lv-r">' + art("r") + '</div><div class="lv-f lv-b">' + art("bot") + "</div>" +
      '<div class="lv-tw"><div class="lv-f lv-t">' + art("top") + '</div><div class="lv-sw">' + seal() + "</div></div>" +
      '<div class="lv-shine"></div><div class="lv-bloom"></div>' +
      (K.PREVIEW ? "" : '<div class="hint">' + esc(P.x("hint")) + "</div>") + "</div>";
  }
  // կամարաձև շրջանակ (ոսկեգույն գիծ)
  function arch(inner, cls) { return '<div class="arch ' + (cls || "") + ' rv">' + inner + "</div>"; }
  function main() {
    var n = K.names(), d = K.date;
    var places = (C.events || []).map(function (e) {
      return '<div class="pl">' + (e.img ? arch('<img src="' + esc(e.img) + '" alt="" loading="lazy">', "ph") : "") +
        '<div class="pl-t rv">' + esc(e.time) + " · " + esc(t(e.title)) + '</div><div class="pl-n rv">' + esc(t(e.place) || "") + '</div><div class="pl-a rv">' + esc(t(e.address) || "") + "</div>" +
        (e.map ? '<a class="pill rv" href="' + esc(e.map) + '" target="_blank" rel="noopener">' + esc(P.x("how")) + "</a>" : "") + "</div>";
    }).join("");
    var plan = (C.plan || C.events || []).map(function (e) {
      return '<div class="tl-r rv"><div class="tl-t">' + esc(e.time) + '</div><i class="tl-d"></i><div class="tl-x"><b>' + esc(t(e.title)) + "</b>" + (e.text ? "<span>" + esc(t(e.text)) + "</span>" : "") +
        (e.map ? '<a class="tl-b" href="' + esc(e.map) + '" target="_blank" rel="noopener">' + esc(P.x("how")) + "</a>" : "") + "</div></div>";
    }).join("");
    return '<section class="hero">' + arch((C.photo ? '<img src="' + esc(C.photo) + '" alt="">' : ""), "big") +
      '<div class="caps rv">' + esc(P.x("welcome")) + '</div><h1 class="nm rv"><span>' + esc(n[0] || "") + '</span><span class="amp">&amp;</span><span>' + esc(n[1] || "") + "</span></h1>" +
      '<div class="caps rv">' + esc(P.x("wed")) + "</div></section>" +
      P.sec("dt", '<h2 class="h2 rv">' + esc(P.x("date")) + '</h2><p class="p rv">' + esc(P.x("dateT")) + '</p><div class="dcards rv">' +
        [[P.d2(d.getDate()), P.x("d")], [P.d2(d.getMonth() + 1), P.x("m")], [d.getFullYear(), P.x("y")]].map(function (c) { return "<div><b>" + c[0] + "</b><span>" + esc(c[1]) + "</span></div>"; }).join("") +
        '</div><div class="wd rv">' + esc(P.x("wdl")[d.getDay()]) + " · " + esc(u("months")[d.getMonth()]) + "</div>") +
      P.sec("txt", arch('<div class="txt-in"><p class="p">' + P.text() + '</p><div class="fnm sm">' + esc(n.join(" & ")) + "</div></div>", "frame")) +
      P.sec("cd", '<div class="caps rv">' + esc(P.x("left")) + "</div>" + P.cd("")) +
      P.sec("plan", '<h2 class="h2 rv">' + esc(P.x("plan")) + '</h2><div class="tl">' + plan + "</div>") +
      P.sec("where", '<h2 class="h2 rv">' + esc(P.x("where")) + "</h2>" + places) +
      K.gallery("h2", "") +
      (C.dresscode ? P.sec("", P.dress("h2")) : "") +
      (C.rsvp ? P.sec("rsv", P.rsvp("h2")) : "") +
      P.sec("fin", '<div class="fseal rv">' + seal() + '</div><div class="caps rv">' + esc(P.x("fin")) + '</div><div class="fnm rv">' + esc(n.join(" & ")) + "</div>") + P.made();
  }
  P.run({ env: env, main: main, steps: [[0, "s1"], [650, "s2"], [1850, "s3"], [2450, "s4"]], done: 2550 });
})();
