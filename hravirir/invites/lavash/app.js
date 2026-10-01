/* «Ափսե և լավաշ» դիզայնի դասավորությունը */
(function () {
  "use strict";
  var K = window.K, C = K.C, esc = K.esc, t = K.t, u = K.u, pad = K.pad;
  var TXT = {
    hy: { hint: "Կոտրեք ափսեն՝ բախտի համար", luck: "Բախտի համար", inv: "Սիրով հրավիրում ենք Ձեզ մեր հարսանիքին", our: "Մեր սովորույթը", cap: "Լավաշը՝ առատության, մեղրը՝ քաղցր կյանքի համար",program: "Օրվա ծրագիր", dress: "Դրեսկոդ", left: "Հարսանիքին մնացել է",
      rsvp: "Հարցաթերթիկ", rsvpLead: "Խնդրում ենք պատասխանել մինչև", fin: "Սիրով սպասում ենք Ձեզ", wdl: ["Կիրակի", "Երկուշաբթի", "Երեքշաբթի", "Չորեքշաբթի", "Հինգշաբթի", "Ուրբաթ", "Շաբաթ"] },
    ru: { hint: "Разбейте тарелку на счастье", luck: "На счастье", inv: "С любовью приглашаем вас на нашу свадьбу", our: "Наш обычай", cap: "Лаваш — к достатку, мёд — к сладкой жизни",program: "Программа дня", dress: "Дресс-код", left: "До свадьбы осталось",
      rsvp: "Анкета", rsvpLead: "Пожалуйста, ответьте до", fin: "С любовью ждём вас", wdl: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"] },
    en: { hint: "Break the plate for luck", luck: "For luck", inv: "We joyfully invite you to our wedding", our: "Our tradition", cap: "Lavash for abundance, honey for a sweet life",program: "Schedule", dress: "Dress code", left: "Counting down",
      rsvp: "RSVP", rsvpLead: "Kindly reply by", fin: "With love", wdl: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] }
  };
  function x(k) { return (TXT[K.lang] || TXT.hy)[k]; }
  function f(v) { return Math.round(v * 10) / 10; }
  var BL = "#2c4f8c", RD = "#b8322a", GD = "#d9a441";
  function ini() { var n = K.list(C.names && (C.names.hy || C.names)); return (n[0] || "").charAt(0) + "·" + (n[1] ? n[1].charAt(0) : ""); }

  // ժողովրդական ծաղիկ
  function flower(cx, cy, r, c1, c2) {
    var s = "";
    for (var i = 0; i < 8; i++) s += '<ellipse cx="' + cx + '" cy="' + f(cy - r * .55) + '" rx="' + f(r * .22) + '" ry="' + f(r * .45) + '" transform="rotate(' + i * 45 + " " + cx + " " + cy + ')" fill="' + (i % 2 ? c2 : c1) + '"/>';
    return s + '<circle cx="' + cx + '" cy="' + cy + '" r="' + f(r * .24) + '" fill="' + GD + '"/>';
  }
  // նուռ (կտրած՝ հատիկներով կամ ամբողջական)
  function pomegranate(cx, cy, r, cut) {
    var s = '<g transform="translate(' + cx + " " + cy + ')"><path d="M' + f(-r * .22) + " " + f(-r * .92) + "L" + f(-r * .3) + " " + f(-r * 1.22) + "L" + f(-r * .08) + " " + f(-r * 1.04) + "L0 " + f(-r * 1.28) + "L" + f(r * .08) + " " + f(-r * 1.04) + "L" + f(r * .3) + " " + f(-r * 1.22) + "L" + f(r * .22) + " " + f(-r * .92) + 'Z" fill="#9c2a22"/>' +
      '<circle r="' + r + '" fill="#b8322a"/><path d="M' + f(-r * .55) + " " + f(-r * .5) + "A" + f(r * .8) + " " + f(r * .8) + " 0 0 1 " + f(r * .2) + " " + f(-r * .8) + '" fill="none" stroke="#e36a5c" stroke-width="' + f(r * .14) + '" stroke-linecap="round" opacity=".7"/>';
    if (cut) {
      s += '<circle r="' + f(r * .78) + '" fill="#f6dfc4"/><path d="M0 ' + f(-r * .78) + "V" + f(r * .78) + "M" + f(-r * .78) + " 0H" + f(r * .78) + '" stroke="#f6dfc4" stroke-width="' + f(r * .12) + '"/>';
      for (var i = 0; i < 26; i++) { var a = i * 2.4, d = r * (.18 + (i % 5) * .12); s += '<ellipse cx="' + f(Math.cos(a) * d) + '" cy="' + f(Math.sin(a) * d) + '" rx="' + f(r * .1) + '" ry="' + f(r * .13) + '" transform="rotate(' + f(a * 57) + " " + f(Math.cos(a) * d) + " " + f(Math.sin(a) * d) + ')" fill="#c8202f" stroke="#7e1018" stroke-width=".4"/>'; }
    }
    return s + "</g>";
  }
  function star8(cx, cy, r, col) {
    var a = r * .7;
    return '<g transform="translate(' + cx + " " + cy + ')" fill="' + col + '"><rect x="' + f(-a) + '" y="' + f(-a) + '" width="' + f(a * 2) + '" height="' + f(a * 2) + '"/><rect x="' + f(-a) + '" y="' + f(-a) + '" width="' + f(a * 2) + '" height="' + f(a * 2) + '" transform="rotate(45)"/></g>';
  }
  // ձեռքով նկարված հայկական կերամիկական ափսե՝ կոբալտ եզր, նռներ և աստղեր, մեջտեղում կտրած նուռ
  function plate(txt) {
    var s = '<svg viewBox="0 0 200 200" aria-hidden="true"><defs><radialGradient id="pg" cx=".42" cy=".36" r=".7"><stop offset="0" stop-color="#ffffff"/><stop offset=".75" stop-color="#f6f1e8"/><stop offset="1" stop-color="#e2d8c6"/></radialGradient>' +
      '<radialGradient id="pw" cx=".5" cy=".55" r=".55"><stop offset=".7" stop-color="#fbf8f2"/><stop offset="1" stop-color="#ebe3d4"/></radialGradient>' +
      '<linearGradient id="gl" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>' +
      '<circle cx="100" cy="102" r="98" fill="rgba(0,0,0,.18)"/><circle cx="100" cy="100" r="98" fill="url(#pg)"/>' +
      '<circle cx="100" cy="100" r="95" fill="none" stroke="#1f3f7a" stroke-width="4"/><circle cx="100" cy="100" r="90.5" fill="none" stroke="#1f3f7a" stroke-width="1.2"/>';
    for (var k = 0; k < 36; k++) { var q = k * Math.PI / 18; s += '<path d="M' + f(100 + Math.cos(q - .06) * 90) + " " + f(100 + Math.sin(q - .06) * 90) + "L" + f(100 + Math.cos(q) * 85) + " " + f(100 + Math.sin(q) * 85) + "L" + f(100 + Math.cos(q + .06) * 90) + " " + f(100 + Math.sin(q + .06) * 90) + 'Z" fill="#1f3f7a"/>'; }
    for (var i = 0; i < 8; i++) {
      var a = i * Math.PI / 4, x0 = f(100 + Math.cos(a) * 70), y0 = f(100 + Math.sin(a) * 70);
      s += i % 2 ? star8(x0, y0, 8.5, "#2c5aa0") + '<circle cx="' + x0 + '" cy="' + y0 + '" r="3.2" fill="' + GD + '"/>' : '<g transform="rotate(' + f(a * 57.3 + 90) + " " + x0 + " " + y0 + ')">' + pomegranate(x0, y0, 9) + '<path d="M' + f(x0 - 12) + " " + f(+y0 + 4) + "q-6 -6 -2 -12q6 2 2 12z" + '" fill="#4f7a3a"/><path d="M' + f(+x0 + 12) + " " + f(+y0 + 4) + "q6 -6 2 -12q-6 2 -2 12z" + '" fill="#4f7a3a"/></g>';
    }
    s += '<circle cx="100" cy="100" r="52" fill="url(#pw)" stroke="#b8322a" stroke-width="1.4"/><circle cx="100" cy="100" r="48" fill="none" stroke="#1f3f7a" stroke-width=".8" stroke-dasharray="2 3"/>' + pomegranate(100, 106, 26, true);
    if (txt) s += '<circle cx="100" cy="106" r="11" fill="#fbf8f2" stroke="' + GD + '" stroke-width="1.2"/><text x="100" y="110" text-anchor="middle" font-family="Dzeragir, serif" font-size="10" fill="#9c2a22">' + txt + "</text>";
    return s + '<path d="M38 52A80 80 0 0 1 120 22" fill="none" stroke="url(#gl)" stroke-width="10" stroke-linecap="round" opacity=".7"/></svg>';
  }
  // ափսեի բեկորներ՝ նույն նկարը տարբեր սեպերով կտրված
  function shards() {
    var h = "", N = 9, s0 = 5;
    function r() { s0 = (s0 * 16807) % 2147483647; return s0 / 2147483647; }
    for (var i = 0; i < N; i++) {
      var a0 = i / N * Math.PI * 2 + (r() - .5) * .3, a1 = (i + 1) / N * Math.PI * 2 + (r() - .5) * .3, am = (a0 + a1) / 2, cx = 50 + (r() - .5) * 8, cy = 50 + (r() - .5) * 8;
      var p = [cx + "% " + cy + "%"]; [a0, am - .12, am + .08, a1].forEach(function (a, k) { var R = k === 1 || k === 2 ? 52 + r() * 8 : 60; p.push(f(50 + Math.cos(a) * R) + "% " + f(50 + Math.sin(a) * R) + "%"); });
      h += '<div class="sh" style="clip-path:polygon(' + p.join(",") + ");--x:" + f(Math.cos(am) * (120 + r() * 120)) + "px;--y:" + f(Math.sin(am) * (120 + r() * 120) + 160) + "px;--r:" + f((r() - .5) * 220) + 'deg">' + plate(esc(ini())) + "</div>";
    }
    return h;
  }
  function cracks() {
    return '<svg class="crk" viewBox="0 0 200 200" aria-hidden="true"><path d="M100 100L60 40L52 18M100 100L150 70L190 76M100 100L120 160L112 192M100 100L40 120L10 112M60 40L40 52M150 70L160 46M120 160L148 168M100 100L88 60" fill="none" stroke="#5a4a3a" stroke-width="1.6" stroke-linecap="round" pathLength="1"/></svg>';
  }
  // լավաշի հյուսվածք՝ նոսր, պատահական թխված բշտիկներով (մեկ անգամ, որպես --lavash)
  (function lavashTexture() {
    var s0 = 29; function r() { s0 = (s0 * 16807) % 2147483647; return s0 / 2147483647; }
    // բաց կաթնագույն թերթ, մեղմ ծալքեր և անկանոն ոսկեշագանակագույն թխված բշտիկներ (փոքր խմբերով, ոչ կլոր բծեր)
    var s = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 700' preserveAspectRatio='xMidYMid slice'><defs><filter id='b' x='-60%' y='-60%' width='220%' height='220%'><feGaussianBlur stdDeviation='.7'/></filter>" +
      "<filter id='w' x='-60%' y='-60%' width='220%' height='220%'><feGaussianBlur stdDeviation='18'/></filter>" +
      "<linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#f4e6c8'/><stop offset='.5' stop-color='#efdcb6'/><stop offset='1' stop-color='#ead3a6'/></linearGradient></defs><rect width='400' height='700' fill='url(#g)'/>";
    // ծալքեր
    for (var k = 0; k < 5; k++) { var y0 = 60 + k * 140 + r() * 40; s += "<path d='M-20 " + f(y0) + "C120 " + f(y0 - 30 - r() * 30) + " 260 " + f(y0 + 30 + r() * 30) + " 420 " + f(y0 - 10) + "' stroke='#c9a46a' stroke-width='" + f(10 + r() * 14) + "' fill='none' opacity='.16' filter='url(#w)'/>"; }
    for (var i = 0; i < 10; i++) s += "<ellipse cx='" + f(r() * 400) + "' cy='" + f(r() * 700) + "' rx='" + f(40 + r() * 70) + "' ry='" + f(25 + r() * 40) + "' fill='#fbf2df' opacity='.55' filter='url(#w)'/>";
    // բշտիկների խմբեր
    for (var j = 0; j < 34; j++) {
      var cx = r() * 400, cy = r() * 700, n = 2 + Math.floor(r() * 5);
      for (var m = 0; m < n; m++) {
        var rx = 1.5 + r() * 5, px = cx + (r() - .5) * 18, py = cy + (r() - .5) * 12;
        s += "<path d='M" + f(px - rx) + " " + f(py) + "Q" + f(px - rx * .6) + " " + f(py - rx * (.6 + r() * .6)) + " " + f(px + rx * .3) + " " + f(py - rx * .5) + "Q" + f(px + rx * 1.2) + " " + f(py) + " " + f(px + rx * .4) + " " + f(py + rx * .6) + "Q" + f(px - rx * .5) + " " + f(py + rx * .8) + " " + f(px - rx) + " " + f(py) + "Z' fill='" + (r() > .35 ? "#b98144" : "#7a4a22") + "' opacity='" + f(.35 + r() * .45) + "' filter='url(#b)'/>";
      }
    }
    for (var d = 0; d < 120; d++) s += "<circle cx='" + f(r() * 400) + "' cy='" + f(r() * 700) + "' r='" + f(.5 + r() * .9) + "' fill='#6b3f1c' opacity='" + f(.25 + r() * .4) + "'/>";
    s += "</svg>";
    if (0) document.documentElement.style.setProperty("--lavash", 'url("data:image/svg+xml,' + encodeURIComponent(s) + '") center / cover no-repeat, #efd7a8');
  })();
  function envelope() {
    var n = K.names();
    return '<div class="env" id="env" role="button" aria-label="' + esc(x("hint")) + '"><div class="lav"><div class="sheet"><div class="in"><div class="caps">' + esc(x("luck")) + '</div><div class="nm">' + esc(n[0] || "") + '<span>&amp;</span>' + esc(n[1] || "") + "</div></div></div></div>" +
      '<div class="stage"><div class="whole">' + plate(esc(ini())) + cracks() + "</div>" + shards() + "</div>" + (K.PREVIEW ? "" : '<div class="hint">' + esc(x("hint")) + "</div>") + "</div>";
  }
  function hero() {
    var n = K.names(), d = K.date;
    return '<section class="hero lavbg"><div class="wrap"><div class="caps rv">' + esc(x("inv")) + '</div><h1 class="nm rv d1"><span>' + esc(n[0] || "") + '</span><span class="amp">&amp;</span><span>' + esc(n[1] || "") + "</span></h1>" +
      '<div class="dt3 rv d2"><div class="s">' + esc(x("wdl")[d.getDay()]) + '</div><div class="d">' + d.getDate() + '</div><div class="s">' + esc(u("monthsGen")[d.getMonth()]) + "</div></div>" +
      '<div class="yr rv d2">' + d.getFullYear() + "</div>" + (C.photo ? K.photo() : '<div class="pl rv d3">' + plate() + "</div>") + "</div></section>";
  }
  // Շեմի տեսարան՝ լավաշը վերևից իջնում է հարս ու փեսայի ուսերին, մեղրը կաթում է գդալից
  function scene() {
    var sp = "", s0 = 11; function r() { s0 = (s0 * 16807) % 2147483647; return s0 / 2147483647; }
    for (var i = 0; i < 26; i++) sp += '<ellipse cx="' + f(88 + r() * 128) + '" cy="' + f(122 + r() * 76) + '" rx="' + f(1.2 + r() * 2.6) + '" ry="' + f(.8 + r() * 1.6) + '" fill="' + (r() > .4 ? "#c08a4c" : "#8a5428") + '" opacity="' + f(.35 + r() * .4) + '"/>';
    var gl = ""; [[96, 112], [206, 108], [150, 100], [120, 206], [186, 214]].forEach(function (p, k) { gl += '<path class="gl" style="--d:' + (2.1 + k * .18) + 's" d="M' + p[0] + " " + (p[1] - 6) + "L" + (p[0] + 1.6) + " " + (p[1] - 1.6) + "L" + (p[0] + 6) + " " + p[1] + "L" + (p[0] + 1.6) + " " + (p[1] + 1.6) + "L" + p[0] + " " + (p[1] + 6) + "L" + (p[0] - 1.6) + " " + (p[1] + 1.6) + "L" + (p[0] - 6) + " " + p[1] + "L" + (p[0] - 1.6) + " " + (p[1] - 1.6) + 'Z" fill="' + GD + '"/>'; });
    return '<div class="tr rv"><svg viewBox="0 0 300 330" aria-hidden="true"><defs><clipPath id="lvc"><path d="M84 134Q90 116 112 118Q150 126 188 120Q210 116 216 134L220 200Q213 209 205 201L199 152Q150 164 103 152L97 203Q89 210 80 200Z"/></clipPath>' +
      '<linearGradient id="hn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f7c548"/><stop offset="1" stop-color="#d98a12"/></linearGradient></defs>' +
      // դուռ-կամար
      '<path d="M40 330V120A110 104 0 0 1 260 120V330" fill="#f6ead2" stroke="' + BL + '" stroke-width="5"/><path d="M52 330V122A98 92 0 0 1 248 122V330" fill="none" stroke="' + RD + '" stroke-width="1.5" stroke-dasharray="6 4"/>' +
      star8(150, 34, 9, BL) + '<circle cx="150" cy="34" r="3.4" fill="' + GD + '"/>' + flower(70, 78, 12, RD, BL) + flower(230, 78, 12, RD, BL) +
      '<rect x="30" y="312" width="240" height="18" rx="3" fill="#b98a5a"/><rect x="30" y="312" width="240" height="4" fill="#d9b07e"/>' +
      // փեսա
      '<path d="M100 300L104 316H118L119 300ZM122 300L123 316H137L138 300Z" fill="#17161c"/>' +
      '<path d="M96 132Q118 122 140 132L144 232L138 304H100L94 232Z" fill="#23222b"/><path d="M110 128L118 160L126 128Z" fill="#fff"/><path d="M113 132L118 136L123 132L118 129Z" fill="#17161c"/><path d="M118 160L106 232M118 160L130 232" stroke="#3a3946" stroke-width="1"/>' +
      '<circle cx="134" cy="150" r="3.4" fill="' + RD + '"/>' +
      '<rect x="113" y="110" width="10" height="14" fill="#e9bc95"/><circle cx="118" cy="98" r="16" fill="#f1c9a5"/><path d="M102 96Q102 78 118 79Q134 78 134 94Q128 86 118 88Q108 88 102 96Z" fill="#2a1c14"/>' +
      '<circle cx="112.5" cy="99" r="1.4" fill="#2a1c14"/><circle cx="123.5" cy="99" r="1.4" fill="#2a1c14"/><path d="M114 106Q118 109 122 106" stroke="#a05a44" stroke-width="1.3" fill="none" stroke-linecap="round"/>' +
      // հարս
      '<path d="M170 92Q196 92 204 150L214 300L198 300L192 160Z" fill="#fff" opacity=".7"/>' +
      '<path d="M168 130Q182 124 196 130L194 172L222 306H142L170 172Z" fill="#fffdf8" stroke="#e7dccb" stroke-width="1"/><path d="M170 172H194" stroke="' + GD + '" stroke-width="2.4"/>' +
      '<path d="M152 290Q182 282 214 290" stroke="#e7dccb" stroke-width="1" fill="none"/><path d="M160 250Q182 244 206 250" stroke="#efe6d8" stroke-width="1" fill="none"/>' +
      '<rect x="177" y="112" width="9" height="13" fill="#eebf98"/><circle cx="182" cy="100" r="15" fill="#f3cdaa"/><path d="M166 100Q164 82 182 82Q200 82 198 100Q192 90 182 90Q172 90 166 100Z" fill="#4a2c1c"/><circle cx="194" cy="86" r="7" fill="#4a2c1c"/>' +
      '<path d="M170 86Q182 78 196 84" stroke="' + GD + '" stroke-width="2.2" fill="none"/>' +
      '<circle cx="176.5" cy="101" r="1.3" fill="#2a1c14"/><circle cx="187.5" cy="101" r="1.3" fill="#2a1c14"/><path d="M178.5 107Q182 110 185.5 107" stroke="#c0564a" stroke-width="1.3" fill="none" stroke-linecap="round"/>' +
      // ձեռքեր և ծաղկեփունջ
      '<path d="M140 140Q150 176 158 190" stroke="#23222b" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M170 140Q164 170 160 188" stroke="#fffdf8" stroke-width="8" fill="none" stroke-linecap="round"/>' +
      '<circle cx="160" cy="194" r="11" fill="#5f8a3a"/><circle cx="155" cy="190" r="6" fill="' + RD + '"/><circle cx="165" cy="191" r="5.5" fill="#fff"/><circle cx="160" cy="198" r="5.5" fill="#e88a8a"/>' +
      // լավաշ
      '<g class="lv"><path d="M84 134Q90 116 112 118Q150 126 188 120Q210 116 216 134L220 200Q213 209 205 201L199 152Q150 164 103 152L97 203Q89 210 80 200Z" fill="#efd7a6" stroke="#c99a5c" stroke-width="1.2"/>' +
      '<g clip-path="url(#lvc)">' + sp + '<path d="M90 140Q150 150 210 138" stroke="#fbeccb" stroke-width="6" fill="none" opacity=".7"/></g></g>' + gl +
      // մեղրի կճուճ և գդալ
      '<g class="hy"><path d="M40 270Q40 250 52 248H80Q92 250 92 270Q92 304 66 304Q40 304 40 270Z" fill="' + BL + '"/><path d="M44 266H88" stroke="#fff" stroke-width="2" stroke-dasharray="3 3"/><ellipse cx="66" cy="248" rx="16" ry="4" fill="url(#hn)"/>' +
      '<g class="dip"><path d="M70 186L82 240" stroke="#9a6a3a" stroke-width="3" stroke-linecap="round"/><ellipse cx="68" cy="182" rx="7" ry="9" fill="url(#hn)" stroke="#b9741a" stroke-width="1"/></g>' +
      '<ellipse class="drop" cx="68" cy="194" rx="2.6" ry="3.6" fill="#e9a226"/></g>' +
      "</svg></div>" + '<div class="caps tr-c rv">' + esc(x("cap")) + "</div>";
  }
  function story() {
    return '<section class="cream"><div class="wrap"><h2 class="h2 rv">' + esc(x("our")) + "</h2>" + scene() + '<p class="p rv">' + esc(t(C.text)) + "</p>" +
      '<div class="cal rv"><div class="cal-h">' + esc(u("months")[K.date.getMonth()]) + " " + K.date.getFullYear() + '</div><div class="cal-g">' + K.calendarCells() + "</div></div></div></section>";
  }
  function countdown() {
    return '<section class="warm"><div class="wrap"><div class="caps rv">' + esc(x("left")) + '</div><div class="cdn rv" data-cd>' + ["days", "hours", "minutes", "seconds"].map(function (k) {
      return '<div><b data-k="' + k + '">00</b><span>' + esc(u(k)) + "</span></div>";
    }).join("") + "</div></div></section>";
  }
  function program() {
    var cols = [[BL, RD], [RD, BL], [BL, GD], [RD, GD]];
    return '<section class="cream"><div class="wrap"><h2 class="h2 rv">' + esc(x("program")) + "</h2>" + (C.events || []).map(function (e, i) {
      var c = cols[i % 4];
      return '<div class="ev rv"><div class="pic ico">' + K.evIcon(e, "diamond-a") + '</div><div class="tm">' + esc(e.time) + '</div><div class="t">' + esc(t(e.title)) +
        '</div><div class="n">' + esc(t(e.place)) + '</div><div class="a">' + esc(t(e.address)) + "</div>" + (e.map ? '<a class="btn" href="' + esc(e.map) + '" target="_blank" rel="noopener">' + esc(u("map")) + "</a>" : "") + "</div>";
    }).join("") + "</div></section>";
  }
  function dress() {
    if (!C.dresscode) return "";
    return '<section class="warm"><div class="wrap"><h2 class="h2 rv">' + esc(x("dress")) + '</h2><p class="rv">' + esc(t(C.dresscode.text)) + '</p><div class="dots rv">' +
      (C.dresscode.colors || []).map(function (c) { return '<i style="background:' + esc(c) + '"></i>'; }).join("") + "</div></div></section>";
  }
  function rsvp() {
    if (!C.rsvp) return "";
    return '<section class="cream"><div class="wrap"><h2 class="h2 rv">' + esc(x("rsvp")) + '</h2><p class="rv">' + esc(x("rsvpLead")) + " " + esc(K.deadline()) + "</p>" +
      '<form class="rs rv" id="rf"><label class="radio"><input type="radio" name="attend" value="yes" checked>' + esc(u("yes")) + "</label>" +
      '<label class="radio"><input type="radio" name="attend" value="no">' + esc(u("no")) + "</label>" +
      '<div class="fl"><label for="rn">' + esc(u("name")) + '</label><input id="rn" name="name" required autocomplete="name"></div>' +
      '<div class="fl"><label for="rg">' + esc(u("guests")) + '</label><select id="rg" name="guests">' + [1, 2, 3, 4, 5, 6].map(function (i) { return "<option>" + i + "</option>"; }).join("") + "</select></div>" +
      '<button class="btn fill" type="submit">' + esc(u("send")) + "</button></form></div></section>";
  }
  function fin() {
    return '<section class="fin warm"><div class="wrap"><div class="caps rv">' + esc(x("fin")) + '</div><div class="nm rv">' + esc(K.names().join(" & ")) + "</div></div></section>" +
      '<div class="made"><a href="https://hravirir.am" target="_blank" rel="noopener">HRAVIRIR.AM</a></div>';
  }

  var opened = false;
  function render() {
    document.documentElement.lang = K.lang;
    document.title = K.names().join(" & ");
    document.getElementById("app").innerHTML = (opened ? "" : envelope()) + "<main>" + hero() + story() + K.gallery() + countdown() + program() + dress() + rsvp() + fin() + "</main>" + (opened ? K.chrome() : "");
    document.body.classList.toggle("locked", !opened);
    if (!opened) { var e = document.getElementById("env"); if (e && !K.PREVIEW) e.onclick = open; } else K.reveal();
    K.countdown(true); K.rsvp(document.getElementById("rf")); K.bindChrome(render);
  }
  // ափսեն ճաքում է → կոտրվում է բեկորների → տակից լավաշը անուններով
  function open() {
    var env = document.getElementById("env"); if (env.dataset.busy) return; env.dataset.busy = "1";
    K.music.play();
    env.classList.add("s1");
    setTimeout(function () { env.classList.add("s2"); if (navigator.vibrate) navigator.vibrate(60); }, 650);
    setTimeout(function () { env.classList.add("s3"); }, 3300);
    setTimeout(function () {
      opened = true; document.body.classList.remove("locked");
      document.getElementById("app").insertAdjacentHTML("beforeend", K.chrome()); K.bindChrome(render); K.reveal();
    }, 3900);
    setTimeout(function () { env.remove(); }, 4600);
  }
  render();
})();
