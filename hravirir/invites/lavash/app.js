/* «Ափսե և լավաշ» դիզայնի դասավորությունը */
(function () {
  "use strict";
  var K = window.K, C = K.C, esc = K.esc, t = K.t, u = K.u, pad = K.pad;
  var TXT = {
    hy: { hint: "Կոտրեք ափսեն՝ բախտի համար", luck: "Բախտի համար", inv: "Սիրով հրավիրում ենք Ձեզ մեր հարսանիքին", our: "Մեր սովորույթը", program: "Օրվա ծրագիր", dress: "Դրեսկոդ", left: "Մինչև հարսանիք մնաց",
      rsvp: "Կգա՞ք", rsvpLead: "Խնդրում ենք պատասխանել մինչև", fin: "Սիրով սպասում ենք Ձեզ", wdl: ["Կիրակի", "Երկուշաբթի", "Երեքշաբթի", "Չորեքշաբթի", "Հինգշաբթի", "Ուրբաթ", "Շաբաթ"] },
    ru: { hint: "Разбейте тарелку на счастье", luck: "На счастье", inv: "С любовью приглашаем вас на нашу свадьбу", our: "Наш обычай", program: "Программа дня", dress: "Дресс-код", left: "До свадьбы осталось",
      rsvp: "Вы придёте?", rsvpLead: "Пожалуйста, ответьте до", fin: "С любовью ждём вас", wdl: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"] },
    en: { hint: "Break the plate for luck", luck: "For luck", inv: "We joyfully invite you to our wedding", our: "Our tradition", program: "The day", dress: "Dress code", left: "Counting down",
      rsvp: "Will you come?", rsvpLead: "Kindly reply by", fin: "With love", wdl: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] }
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
  function plate(txt) {
    var s = '<svg viewBox="0 0 200 200" aria-hidden="true"><defs><radialGradient id="pg" cx=".45" cy=".4"><stop offset="0" stop-color="#ffffff"/><stop offset=".8" stop-color="#f4efe6"/><stop offset="1" stop-color="#ddd3c3"/></radialGradient></defs>' +
      '<circle cx="100" cy="100" r="98" fill="url(#pg)"/><circle cx="100" cy="100" r="92" fill="none" stroke="' + BL + '" stroke-width="3"/><circle cx="100" cy="100" r="86" fill="none" stroke="' + BL + '" stroke-width="1" stroke-dasharray="3 4"/>';
    for (var i = 0; i < 12; i++) { var a = i * Math.PI / 6; s += flower(f(100 + Math.cos(a) * 74), f(100 + Math.sin(a) * 74), 10, i % 2 ? RD : BL, i % 2 ? "#e0685c" : "#5d7fbd"); }
    s += '<circle cx="100" cy="100" r="58" fill="none" stroke="' + RD + '" stroke-width="1.5"/><circle cx="100" cy="100" r="54" fill="#fbf7ef"/>' + flower(100, 100, 36, BL, RD) +
      '<circle cx="100" cy="100" r="15" fill="#fbf7ef" stroke="' + GD + '" stroke-width="1.5"/>';
    if (txt) s += '<text x="100" y="105" text-anchor="middle" font-family="Dzeragir, serif" font-size="13" fill="' + RD + '">' + txt + "</text>";
    return s + "</svg>";
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
    var s = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 700' preserveAspectRatio='none'><defs><filter id='b' x='-60%' y='-60%' width='220%' height='220%'><feGaussianBlur stdDeviation='1.6'/></filter><filter id='w' x='-60%' y='-60%' width='220%' height='220%'><feGaussianBlur stdDeviation='14'/></filter>" +
      "<radialGradient id='g' cx='.5' cy='.45' r='.75'><stop offset='0' stop-color='#f6e3bb'/><stop offset='1' stop-color='#e2bf7f'/></radialGradient></defs><rect width='400' height='700' fill='url(#g)'/>";
    for (var i = 0; i < 14; i++) s += "<ellipse cx='" + f(r() * 400) + "' cy='" + f(r() * 700) + "' rx='" + f(30 + r() * 60) + "' ry='" + f(20 + r() * 40) + "' fill='#fff6df' opacity='.45' filter='url(#w)'/>";
    for (var j = 0; j < 90; j++) {
      var rx = 2 + r() * 7, big = r() > .8;
      s += "<ellipse cx='" + f(r() * 400) + "' cy='" + f(r() * 700) + "' rx='" + f(big ? rx * 1.8 : rx) + "' ry='" + f((big ? rx * 1.8 : rx) * (.6 + r() * .5)) + "' fill='" + (r() > .5 ? "#a8743a" : "#8e5c2a") + "' opacity='" + f(.18 + r() * .3) + "' filter='url(#b)'/>";
    }
    s += "</svg>";
    document.documentElement.style.setProperty("--lavash", 'url("data:image/svg+xml,' + encodeURIComponent(s) + '") center / cover no-repeat, #efd7a8');
  })();
  function envelope() {
    var n = K.names();
    return '<div class="env" id="env" role="button" aria-label="' + esc(x("hint")) + '"><div class="lav"><div class="in"><div class="caps">' + esc(x("luck")) + '</div><div class="nm">' + esc(n[0] || "") + '<span>&amp;</span>' + esc(n[1] || "") + "</div></div></div>" +
      '<div class="stage"><div class="whole">' + plate(esc(ini())) + cracks() + "</div>" + shards() + "</div>" + (K.PREVIEW ? "" : '<div class="hint">' + esc(x("hint")) + "</div>") + "</div>";
  }
  function hero() {
    var n = K.names(), d = K.date;
    return '<section class="hero lavbg"><div class="wrap"><div class="caps rv">' + esc(x("inv")) + '</div><h1 class="nm rv d1"><span>' + esc(n[0] || "") + '</span><span class="amp">&amp;</span><span>' + esc(n[1] || "") + "</span></h1>" +
      '<div class="dt3 rv d2"><div class="s">' + esc(x("wdl")[d.getDay()]) + '</div><div class="d">' + d.getDate() + '</div><div class="s">' + esc(u("monthsGen")[d.getMonth()]) + "</div></div>" +
      '<div class="yr rv d2">' + d.getFullYear() + '</div><div class="pl rv d3">' + plate() + "</div></div></section>";
  }
  function story() {
    return '<section class="cream"><div class="wrap"><h2 class="h2 rv">' + esc(x("our")) + '</h2><p class="p rv">' + esc(t(C.text)) + "</p>" +
      '<div class="cal rv"><div class="cal-h">' + esc(u("months")[K.date.getMonth()]) + " " + K.date.getFullYear() + '</div><div class="cal-g">' + K.calendarCells() + "</div></div></div></section>";
  }
  function countdown() {
    return '<section class="lavbg"><div class="wrap"><div class="caps rv">' + esc(x("left")) + '</div><div class="cdn rv" data-cd>' + ["days", "hours", "minutes", "seconds"].map(function (k) {
      return '<div><b data-k="' + k + '">00</b><span>' + esc(u(k)) + "</span></div>";
    }).join("") + "</div></div></section>";
  }
  function program() {
    var cols = [[BL, RD], [RD, BL], [BL, GD], [RD, GD]];
    return '<section class="cream"><div class="wrap"><h2 class="h2 rv">' + esc(x("program")) + "</h2>" + (C.events || []).map(function (e, i) {
      var c = cols[i % 4];
      return '<div class="ev rv"><div class="pic ico"><svg viewBox="0 0 60 60" aria-hidden="true"><circle cx="30" cy="30" r="28" fill="#fbf7ef" stroke="' + c[0] + '" stroke-width="2"/>' + flower(30, 30, 20, c[0], c[1]) + '</svg></div><div class="tm">' + esc(e.time) + '</div><div class="t">' + esc(t(e.title)) +
        '</div><div class="n">' + esc(t(e.place)) + '</div><div class="a">' + esc(t(e.address)) + "</div>" + (e.map ? '<a class="btn" href="' + esc(e.map) + '" target="_blank" rel="noopener">' + esc(u("map")) + "</a>" : "") + "</div>";
    }).join("") + "</div></section>";
  }
  function dress() {
    if (!C.dresscode) return "";
    return '<section class="lavbg"><div class="wrap"><h2 class="h2 rv">' + esc(x("dress")) + '</h2><p class="rv">' + esc(t(C.dresscode.text)) + '</p><div class="dots rv">' +
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
    return '<section class="fin lavbg"><div class="wrap"><div class="caps rv">' + esc(x("fin")) + '</div><div class="nm rv">' + esc(K.names().join(" & ")) + "</div></div></section>" +
      '<div class="made"><a href="https://hravirir.am" target="_blank" rel="noopener">HRAVIRIR.AM</a></div>';
  }

  var opened = false;
  function render() {
    document.documentElement.lang = K.lang;
    document.title = K.names().join(" & ");
    document.getElementById("app").innerHTML = (opened ? "" : envelope()) + "<main>" + hero() + story() + countdown() + program() + dress() + rsvp() + fin() + "</main>" + (opened ? K.chrome() : "");
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
