/* «Աղավնիներ» դիզայնի դասավորությունը */
(function () {
  "use strict";
  var K = window.K, C = K.C, esc = K.esc, t = K.t, u = K.u, pad = K.pad;
  var TXT = {
    hy: { hint: "Սեղմեք ծրարին", envTop: "Հրավեր", inv: "Սիրով հրավիրում ենք Ձեզ մեր հարսանիքին", our: "Սիրո մասին", program: "Օրվա ծրագիր", dress: "Դրեսկոդ", left: "Մինչև հարսանիք մնաց",
      rsvp: "Կգա՞ք", rsvpLead: "Խնդրում ենք պատասխանել մինչև", fin: "Սիրով սպասում ենք Ձեզ", wdl: ["Կիրակի", "Երկուշաբթի", "Երեքշաբթի", "Չորեքշաբթի", "Հինգշաբթի", "Ուրբաթ", "Շաբաթ"] },
    ru: { hint: "Нажмите на конверт", envTop: "Приглашение", inv: "С любовью приглашаем вас на нашу свадьбу", our: "О любви", program: "Программа дня", dress: "Дресс-код", left: "До свадьбы осталось",
      rsvp: "Вы придёте?", rsvpLead: "Пожалуйста, ответьте до", fin: "С любовью ждём вас", wdl: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"] },
    en: { hint: "Tap the envelope", envTop: "Invitation", inv: "We joyfully invite you to our wedding", our: "About love", program: "The day", dress: "Dress code", left: "Counting down",
      rsvp: "Will you come?", rsvpLead: "Kindly reply by", fin: "With love", wdl: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] }
  };
  function x(k) { return (TXT[K.lang] || TXT.hy)[k]; }
  function ini() { var n = K.list(C.names && (C.names.hy || C.names)); return (n[0] || "").charAt(0) + (n[1] ? n[1].charAt(0) : ""); }
  var uid = 0;

  // սպիտակ աղավնի (դեմքով դեպի աջ), թևը՝ առանձին, որ թափահարի
  function dove(flip, branch) {
    var id = "dv" + (++uid);
    return '<svg class="dove' + (flip ? " fl" : "") + '" viewBox="0 0 120 80" aria-hidden="true"><defs><linearGradient id="' + id + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#dfe6ee"/></linearGradient></defs>' +
      '<g' + (flip ? ' transform="translate(120 0) scale(-1 1)"' : "") + '>' +
      '<path d="M22 50C32 39 55 35 71 38C78 30 89 27 96 31C100 33 102 36 107 38L100 41C96 42 94 45 92 49C86 61 68 66 50 64C39 63 29 61 22 58L6 63L12 55L2 50L16 51Z" fill="url(#' + id + ')" stroke="#9fb0c3" stroke-width=".9" stroke-linejoin="round"/>' +
      '<path d="M8 55L20 54M6 59L19 57" stroke="#b5c3d2" stroke-width=".7"/>' +
      '<circle cx="95" cy="34" r="1.6" fill="#3d4a5a"/><path d="M58 64L56 72M64 63L63 72" stroke="#c9a3a3" stroke-width="1.4" stroke-linecap="round"/>' +
      (branch ? '<path d="M104 40C112 44 116 50 118 56" stroke="#7d9a7a" stroke-width="1.1" fill="none"/><path d="M109 44c4-3 7-2 8 0c-3 2-6 2-8 0zM113 50c4-2 6 0 6 2c-3 1-5 0-6-2z" fill="#9db59a"/>' : "") +
      '<g class="wing"><path d="M50 45C44 27 52 10 72 3C67 15 71 25 80 32C70 39 60 43 50 45Z" fill="#fff" stroke="#9fb0c3" stroke-width=".9" stroke-linejoin="round"/>' +
      '<path d="M56 40C56 30 60 20 68 12M62 38C63 30 66 24 72 18M68 36C70 31 72 27 76 25" stroke="#b5c3d2" stroke-width=".7" fill="none"/></g></g></svg>';
  }
  function sprig() {
    var s = '<svg class="spr" viewBox="0 0 160 60" aria-hidden="true"><path d="M4 50C40 40 90 34 156 12" stroke="#8ea3b8" stroke-width="1.2" fill="none"/>';
    for (var i = 0; i < 9; i++) { var x0 = 16 + i * 16, y0 = 47 - i * 4.1; s += '<ellipse cx="' + x0 + '" cy="' + (y0 - 7) + '" rx="6" ry="4" fill="#b8c8d8" transform="rotate(-30 ' + x0 + " " + (y0 - 7) + ')"/><ellipse cx="' + (x0 + 5) + '" cy="' + (y0 + 5) + '" rx="6" ry="4" fill="#a3b7cb" transform="rotate(20 ' + (x0 + 5) + " " + (y0 + 5) + ')"/>'; }
    return s + "</svg>";
  }
  function seal(txt) {
    return '<svg viewBox="0 0 100 100" aria-hidden="true"><defs><radialGradient id="sl" cx=".38" cy=".32"><stop offset="0" stop-color="#9fb6d0"/><stop offset=".6" stop-color="#6f8fb3"/><stop offset="1" stop-color="#4c6a8d"/></radialGradient></defs>' +
      '<path d="M50 3c8 0 11 5 18 7s13 1 17 8 1 12 4 19 7 11 5 19-8 9-11 16-3 13-10 17-13 0-20 3-12 7-19 4-7-9-14-12-14-3-17-10 1-13-1-20-7-11-3-18 10-6 14-12 5-11 12-13 9 1 15-2S42 3 50 3z" fill="url(#sl)"/>' +
      '<circle cx="50" cy="50" r="30" fill="none" stroke="#dbe6f1" stroke-width="1.3" opacity=".8"/><text x="50" y="59" text-anchor="middle" font-family="GHEA Mariam, serif" font-style="italic" font-size="26" fill="#eef4fa">' + txt + "</text></svg>";
  }
  function envelope() {
    var n = K.names();
    return '<div class="env" id="env" role="button" aria-label="' + esc(x("hint")) + '"><div class="sky"></div><div class="top"><div class="caps">' + esc(x("envTop")) + "</div></div>" +
      '<div class="envl"><div class="back"></div><div class="letter"><div class="caps">' + esc(x("inv")) + '</div><div class="nm">' + esc(n.join(" & ")) + '</div><div class="dt">' + pad(K.date.getDate()) + " · " + pad(K.date.getMonth() + 1) + " · " + K.date.getFullYear() + "</div></div>" +
      '<svg class="pocket" viewBox="0 0 300 200" preserveAspectRatio="none" aria-hidden="true"><path d="M0 0L152 112L0 200Z" fill="#f4f7fa"/><path d="M300 0L148 112L300 200Z" fill="#eef2f6"/><path d="M0 200L150 96L300 200Z" fill="#fbfcfd"/>' +
      '<path d="M0 200L150 96L300 200" fill="none" stroke="#d4dde7" stroke-width="1"/></svg>' +
      '<div class="flap"><svg viewBox="0 0 300 200" preserveAspectRatio="none" aria-hidden="true"><path d="M0 0H300L150 118Z" fill="#f7f9fb" stroke="#d4dde7" stroke-width="1"/></svg></div>' +
      '<div class="sprw">' + sprig() + '</div><div class="seal">' + seal(esc(ini())) + '</div><div class="d1">' + dove(false, true) + '</div><div class="d2">' + dove(true) + "</div></div>" +
      (K.PREVIEW ? "" : '<div class="hint">' + esc(x("hint")) + "</div>") + "</div>";
  }
  function hero() {
    var n = K.names(), d = K.date;
    return '<section class="hero"><div class="wrap"><div class="pair rv">' + dove(false, true) + dove(true) + '</div><div class="caps rv">' + esc(x("inv")) + '</div><h1 class="nm rv d1"><span>' + esc(n[0] || "") +
      '</span><span class="amp">&amp;</span><span>' + esc(n[1] || "") + "</span></h1>" +
      '<div class="dtl rv d2"><span>' + esc(x("wdl")[d.getDay()]) + "</span><b>" + pad(d.getDate()) + "." + pad(d.getMonth() + 1) + "." + d.getFullYear() + "</b><span>" + pad(d.getHours()) + ":" + pad(d.getMinutes()) + "</span></div></div></section>";
  }
  function story() {
    return '<section class="band"><div class="wrap"><h2 class="h2 rv">' + esc(x("our")) + '</h2><p class="p rv">' + esc(t(C.text)) + "</p>" +
      '<div class="cal rv"><div class="cal-h">' + esc(u("months")[K.date.getMonth()]) + " " + K.date.getFullYear() + '</div><div class="cal-g">' + K.calendarCells() + "</div></div></div></section>";
  }
  function countdown() {
    return '<section><div class="wrap"><div class="caps rv">' + esc(x("left")) + '</div><div class="cdn rv" data-cd>' + ["days", "hours", "minutes", "seconds"].map(function (k) {
      return '<div><b data-k="' + k + '">00</b><span>' + esc(u(k)) + "</span></div>";
    }).join("") + "</div></div></section>";
  }
  function program() {
    return '<section class="band"><div class="wrap"><h2 class="h2 rv">' + esc(x("program")) + "</h2>" + (C.events || []).map(function (e, i) {
      return '<div class="ev rv"><div class="pic ico">' + dove(i % 2 === 1, i === 3) + '</div><div class="tm">' + esc(e.time) + '</div><div class="t">' + esc(t(e.title)) +
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
    return '<section class="band"><div class="wrap"><h2 class="h2 rv">' + esc(x("rsvp")) + '</h2><p class="rv">' + esc(x("rsvpLead")) + " " + esc(K.deadline()) + "</p>" +
      '<form class="rs rv" id="rf"><label class="radio"><input type="radio" name="attend" value="yes" checked>' + esc(u("yes")) + "</label>" +
      '<label class="radio"><input type="radio" name="attend" value="no">' + esc(u("no")) + "</label>" +
      '<div class="fl"><label for="rn">' + esc(u("name")) + '</label><input id="rn" name="name" required autocomplete="name"></div>' +
      '<div class="fl"><label for="rg">' + esc(u("guests")) + '</label><select id="rg" name="guests">' + [1, 2, 3, 4, 5, 6].map(function (i) { return "<option>" + i + "</option>"; }).join("") + "</select></div>" +
      '<button class="btn fill" type="submit">' + esc(u("send")) + "</button></form></div></section>";
  }
  function fin() {
    return '<section class="fin"><div class="wrap"><div class="sealf rv">' + seal(esc(ini())) + '</div><div class="caps rv">' + esc(x("fin")) + '</div><div class="nm rv">' + esc(K.names().join(" & ")) + "</div></div></section>" +
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
  // աղավնիները թռչում են → կնիքը պոկվում է → կափարիչը բացվում է → նամակը դուրս է գալիս
  function open() {
    var env = document.getElementById("env"); if (env.dataset.busy) return; env.dataset.busy = "1";
    K.music.play();
    env.classList.add("s1");
    setTimeout(function () { env.classList.add("s2"); }, 700);
    setTimeout(function () { env.classList.add("s3"); }, 1100);
    setTimeout(function () { env.classList.add("s4"); }, 2000);
    setTimeout(function () { env.classList.add("s5"); }, 3100);
    setTimeout(function () {
      opened = true; document.body.classList.remove("locked");
      document.getElementById("app").insertAdjacentHTML("beforeend", K.chrome()); K.bindChrome(render); K.reveal();
    }, 3700);
    setTimeout(function () { env.remove(); }, 4300);
  }
  render();
})();
