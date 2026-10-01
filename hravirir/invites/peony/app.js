/* «Պիոն» դիզայնի դասավորությունը */
(function () {
  "use strict";
  var K = window.K, C = K.C, esc = K.esc, t = K.t, u = K.u, pad = K.pad;
  var TXT = {
    hy: { hint: "Սեղմեք բացիկին", inv: "Սիրով հրավիրում ենք Ձեզ մեր հարսանիքին", our: "Մեր խոսքը", program: "Օրվա ծրագիր", dress: "Դրեսկոդ", left: "Հարսանիքին մնացել է",
      rsvp: "Հարցաթերթիկ", rsvpLead: "Խնդրում ենք պատասխանել մինչև", fin: "Սիրով սպասում ենք Ձեզ", wdl: ["Կիրակի", "Երկուշաբթի", "Երեքշաբթի", "Չորեքշաբթի", "Հինգշաբթի", "Ուրբաթ", "Շաբաթ"] },
    ru: { hint: "Нажмите на открытку", inv: "С любовью приглашаем вас на нашу свадьбу", our: "Наши слова", program: "Программа дня", dress: "Дресс-код", left: "До свадьбы осталось",
      rsvp: "Анкета", rsvpLead: "Пожалуйста, ответьте до", fin: "С любовью ждём вас", wdl: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"] },
    en: { hint: "Tap the card", inv: "We joyfully invite you to our wedding", our: "Our words", program: "Schedule", dress: "Dress code", left: "Counting down",
      rsvp: "RSVP", rsvpLead: "Kindly reply by", fin: "With love", wdl: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] }
  };
  function x(k) { return (TXT[K.lang] || TXT.hy)[k]; }
  function f(v) { return Math.round(v * 10) / 10; }
  function ini() { var n = K.list(C.names && (C.names.hy || C.names)); return (n[0] || "").charAt(0) + (n[1] ? n[1].charAt(0) : ""); }
  var uid = 0, s0 = 11;
  function r() { s0 = (s0 * 16807) % 2147483647; return s0 / 2147483647; }
  var PAL = { blush: ["#b85c69", "#e39a9c", "#f9d9d4"], coral: ["#c9654d", "#ec9b7e", "#fbd6c4"], ivory: ["#c29c80", "#ecd5c2", "#fff6ee"], rose: ["#963f52", "#d07884", "#f2c4c6"] };

  function petal(l, w) {
    return "M0 0C" + f(-w * .9) + " " + f(-l * .25) + " " + f(-w) + " " + f(-l * .75) + " " + f(-w * .45) + " " + f(-l * .95) + "Q" + f(-w * .2) + " " + f(-l * 1.06) + " 0 " + f(-l * .9) +
      "Q" + f(w * .2) + " " + f(-l * 1.06) + " " + f(w * .45) + " " + f(-l * .95) + "C" + f(w) + " " + f(-l * .75) + " " + f(w * .9) + " " + f(-l * .25) + " 0 0Z";
  }
  function peony(cx, cy, R, pal) {
    var id = "pg" + (++uid), p = PAL[pal] || PAL.blush;
    var s = '<radialGradient id="' + id + '" cx="' + cx + '" cy="' + cy + '" r="' + R + '" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="' + p[0] + '"/><stop offset=".55" stop-color="' + p[1] + '"/><stop offset="1" stop-color="' + p[2] + '"/></radialGradient>' +
      '<g transform="translate(' + cx + " " + cy + ') scale(1 .86)">';
    [[10, 1, .5, 0], [9, .8, .46, 17], [8, .62, .4, 7], [7, .45, .33, 25], [6, .3, .26, 11], [5, .17, .18, 30]].forEach(function (g) {
      for (var i = 0; i < g[0]; i++) s += '<path d="' + petal(R * g[1] * (.9 + r() * .2), R * g[2]) + '" transform="rotate(' + f(g[3] + i * 360 / g[0] + (r() - .5) * 14) + ')" fill="url(#' + id + ')" stroke="' + p[0] + '" stroke-opacity=".42" stroke-width=".8"/>';
    });
    return s + "</g>";
  }
  function leaf(x0, y0, len, ang, col) {
    return '<g transform="translate(' + x0 + " " + y0 + ") rotate(" + ang + ')"><path d="M0 0C' + f(len * .3) + " " + f(-len * .24) + " " + f(len * .72) + " " + f(-len * .2) + " " + len + " 0C" + f(len * .7) + " " + f(len * .22) + " " + f(len * .3) + " " + f(len * .22) + ' 0 0Z" fill="' + (col || "#a8b79c") + '"/>' +
      '<path d="M2 0H' + f(len * .9) + '" stroke="#fff" stroke-opacity=".5" stroke-width=".8"/></g>';
  }
  function bud(x0, y0, rr, pal) {
    var p = PAL[pal] || PAL.blush;
    return '<g transform="translate(' + x0 + " " + y0 + ')"><path d="M0 ' + rr + "C" + (-rr * 1.1) + " " + (rr * .2) + " " + (-rr * .6) + " " + (-rr) + " 0 " + (-rr) + "C" + (rr * .6) + " " + (-rr) + " " + (rr * 1.1) + " " + (rr * .2) + " 0 " + rr + 'Z" fill="' + p[1] + '"/>' +
      '<path d="M0 ' + rr + "C" + (-rr * .9) + " " + (rr * .4) + " " + (-rr * .9) + " " + (-rr * .2) + " " + (-rr * .4) + " " + (-rr * .3) + "M0 " + rr + "C" + (rr * .9) + " " + (rr * .4) + " " + (rr * .9) + " " + (-rr * .2) + " " + (rr * .4) + " " + (-rr * .3) + '" fill="none" stroke="#a8b79c" stroke-width="2"/></g>';
  }
  // ծաղկեփունջը բացիկի ճակատին (300×420)
  function cover() {
    s0 = 11;
    return '<svg viewBox="0 0 300 420" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs></defs>' +
      leaf(150, 250, 110, -150) + leaf(150, 250, 100, -30) + leaf(120, 270, 90, 160) + leaf(185, 265, 95, 15) + leaf(150, 250, 80, -95, "#93a58a") + leaf(100, 180, 70, -130, "#93a58a") + leaf(205, 185, 72, -45) +
      bud(62, 150, 16, "coral") + bud(244, 142, 14, "blush") + bud(230, 330, 13, "rose") +
      peony(108, 222, 72, "blush") + peony(206, 238, 62, "ivory") + peony(152, 302, 52, "coral") + peony(96, 318, 34, "rose") + peony(210, 160, 30, "blush") +
      "</svg>";
  }
  function flower(i) {
    s0 = 40 + i * 7;
    var pals = ["blush", "coral", "ivory", "rose"];
    return '<svg viewBox="0 0 120 110" aria-hidden="true">' + leaf(60, 60, 50, -160) + leaf(60, 60, 50, -20) + peony(60, 56, 40, pals[i % 4]) + "</svg>";
  }
  function garland(w) {
    s0 = 77;
    return '<svg viewBox="0 0 360 150" aria-hidden="true">' + leaf(180, 70, 120, 178) + leaf(180, 70, 120, 2) + leaf(120, 76, 70, 150, "#93a58a") + leaf(240, 76, 70, 30, "#93a58a") +
      bud(40, 78, 12, "coral") + bud(322, 76, 12, "blush") + peony(122, 74, 40, "ivory") + peony(240, 74, 40, "coral") + peony(180, 66, 54, "blush") + "</svg>";
  }

  function envelope() {
    var n = K.names(), d = K.date;
    return '<div class="env" id="env" role="button" aria-label="' + esc(x("hint")) + '"><div class="card" id="card">' +
      '<div class="inner"><div class="gar">' + garland() + '</div><div class="caps">' + esc(x("inv")) + '</div><div class="nm">' + esc(n[0] || "") + '<span>&amp;</span>' + esc(n[1] || "") + "</div>" +
      '<div class="dt">' + pad(d.getDate()) + " · " + pad(d.getMonth() + 1) + " · " + d.getFullYear() + "</div></div>" +
      '<div class="flap l"><div class="face front">' + cover() + '</div><div class="face back"></div></div>' +
      '<div class="flap r"><div class="face front">' + cover() + '</div><div class="face back"></div></div>' +
      '<div class="band"><div class="mono">' + esc(ini()) + "</div></div></div>" +
      (K.PREVIEW ? "" : '<div class="hint">' + esc(x("hint")) + "</div>") + "</div>";
  }
  function hero() {
    var n = K.names(), d = K.date;
    return '<section class="hero"><div class="gtop">' + garland() + '</div><div class="wrap"><div class="caps rv">' + esc(x("inv")) + '</div><h1 class="nm rv d1"><span>' + esc(n[0] || "") +
      '</span><span class="amp">&amp;</span><span>' + esc(n[1] || "") + "</span></h1>" +
      '<div class="dt3 rv d2"><div class="s">' + esc(x("wdl")[d.getDay()]) + '</div><div class="d">' + d.getDate() + '</div><div class="s">' + esc(u("monthsGen")[d.getMonth()]) + "</div></div>" +
      '<div class="yr rv d2">' + d.getFullYear() + '</div></div><div class="gbot">' + garland() + "</div></section>";
  }
  function story() {
    return '<section class="blush"><div class="wrap"><h2 class="h2 rv">' + esc(x("our")) + '</h2><p class="p rv">' + esc(t(C.text)) + "</p>" +
      '<div class="cal rv"><div class="cal-h">' + esc(u("months")[K.date.getMonth()]) + " " + K.date.getFullYear() + '</div><div class="cal-g">' + K.calendarCells() + "</div></div></div></section>";
  }
  function countdown() {
    return '<section><div class="wrap"><div class="caps rv">' + esc(x("left")) + '</div><div class="cdn rv" data-cd>' + ["days", "hours", "minutes", "seconds"].map(function (k) {
      return '<div><b data-k="' + k + '">00</b><span>' + esc(u(k)) + "</span></div>";
    }).join("") + "</div></div></section>";
  }
  function program() {
    return '<section class="blush"><div class="wrap"><h2 class="h2 rv">' + esc(x("program")) + "</h2>" + (C.events || []).map(function (e, i) {
      return '<div class="ev rv"><div class="pic ico">' + K.evIcon(e, "sketch-b") + '</div><div class="tm">' + esc(e.time) + '</div><div class="t">' + esc(t(e.title)) +
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
    return '<section class="blush"><div class="wrap"><h2 class="h2 rv">' + esc(x("rsvp")) + '</h2><p class="rv">' + esc(x("rsvpLead")) + " " + esc(K.deadline()) + "</p>" +
      '<form class="rs rv" id="rf"><label class="radio"><input type="radio" name="attend" value="yes" checked>' + esc(u("yes")) + "</label>" +
      '<label class="radio"><input type="radio" name="attend" value="no">' + esc(u("no")) + "</label>" +
      '<div class="fl"><label for="rn">' + esc(u("name")) + '</label><input id="rn" name="name" required autocomplete="name"></div>' +
      '<div class="fl"><label for="rg">' + esc(u("guests")) + '</label><select id="rg" name="guests">' + [1, 2, 3, 4, 5, 6].map(function (i) { return "<option>" + i + "</option>"; }).join("") + "</select></div>" +
      '<button class="btn fill" type="submit">' + esc(u("send")) + "</button></form></div></section>";
  }
  function fin() {
    return '<section class="fin"><div class="wrap"><div class="fl1 rv">' + flower(0) + '</div><div class="caps rv">' + esc(x("fin")) + '</div><div class="nm rv">' + esc(K.names().join(" & ")) + "</div></div></section>" +
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
  // ժապավենը սահում է → փեղկերը բացվում են երկու կողմ → բացիկը մոտենում է
  function open() {
    var env = document.getElementById("env"); if (env.dataset.busy) return; env.dataset.busy = "1";
    K.music.play();
    env.classList.add("s1");
    setTimeout(function () { env.classList.add("s2"); }, 800);
    setTimeout(function () { env.classList.add("s3"); }, 3000);
    setTimeout(function () {
      opened = true; document.body.classList.remove("locked");
      document.getElementById("app").insertAdjacentHTML("beforeend", K.chrome()); K.bindChrome(render); K.reveal();
    }, 3700);
    setTimeout(function () { env.remove(); }, 4300);
  }
  render();
})();
