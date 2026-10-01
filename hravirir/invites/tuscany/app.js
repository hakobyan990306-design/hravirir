/* «Տոսկանա» դիզայնի դասավորությունը */
(function () {
  "use strict";
  var K = window.K, C = K.C, esc = K.esc, t = K.t, u = K.u, pad = K.pad;
  var TXT = {
    hy: { hint: "Սեղմեք սալիկներին", inv: "Սիրով հրավիրում ենք Ձեզ մեր հարսանիքին", our: "Մեր ամառը", program: "Օրվա ծրագիր", dress: "Դրեսկոդ", left: "Հարսանիքին մնացել է",
      rsvp: "Հարցաթերթիկ", rsvpLead: "Խնդրում ենք պատասխանել մինչև", fin: "Սիրով սպասում ենք Ձեզ", wdl: ["Կիրակի", "Երկուշաբթի", "Երեքշաբթի", "Չորեքշաբթի", "Հինգշաբթի", "Ուրբաթ", "Շաբաթ"] },
    ru: { hint: "Нажмите на плитку", inv: "С любовью приглашаем вас на нашу свадьбу", our: "Наше лето", program: "Программа дня", dress: "Дресс-код", left: "До свадьбы осталось",
      rsvp: "Анкета", rsvpLead: "Пожалуйста, ответьте до", fin: "С любовью ждём вас", wdl: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"] },
    en: { hint: "Tap the tiles", inv: "We joyfully invite you to our wedding", our: "Our summer", program: "Schedule", dress: "Dress code", left: "Counting down",
      rsvp: "RSVP", rsvpLead: "Kindly reply by", fin: "With love", wdl: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] }
  };
  function x(k) { return (TXT[K.lang] || TXT.hy)[k]; }
  var B = "#1f4e9c", Y = "#f2cf3a", G = "#5f8a3a";

  function lemon(cx, cy, s, rot) {
    return '<g transform="translate(' + cx + " " + cy + ") rotate(" + (rot || 0) + ") scale(" + s + ')">' +
      '<path d="M-2 -14C8 -20 22 -6 18 6C22 10 20 14 16 12C8 22 -14 18 -18 4C-22 2 -22 -4 -17 -5C-14 -14 -8 -15 -2 -14Z" fill="' + Y + '" stroke="#c9a21f" stroke-width="1"/>' +
      '<path d="M-10 -2C-6 -8 2 -10 8 -6" stroke="#fff6c2" stroke-width="2" fill="none" stroke-linecap="round"/>' +
      '<path d="M-2 -14C-4 -22 -12 -28 -20 -26C-18 -18 -10 -14 -2 -14Z" fill="' + G + '"/><path d="M-2 -14C4 -24 14 -26 20 -22C16 -14 6 -12 -2 -14Z" fill="#7aa34d"/></g>';
  }
  // մայոլիկա սալիկ (100×100)՝ անկյուններում քառորդ շրջաններ, որ կից սալիկներով շրջան կազմեն
  function tile(v) {
    var s = '<svg viewBox="0 0 100 100" aria-hidden="true"><rect width="100" height="100" fill="#fdfbf5"/>' +
      '<path d="M0 0H22A22 22 0 0 1 0 22ZM100 0V22A22 22 0 0 1 78 0ZM100 100H78A22 22 0 0 1 100 78ZM0 100V78A22 22 0 0 1 22 100Z" fill="' + B + '"/>' +
      '<path d="M0 0H14A14 14 0 0 1 0 14ZM100 0V14A14 14 0 0 1 86 0ZM100 100H86A14 14 0 0 1 100 86ZM0 100V86A14 14 0 0 1 14 100Z" fill="#fdfbf5"/>' +
      '<path d="M50 6C60 20 80 40 94 50C80 60 60 80 50 94C40 80 20 60 6 50C20 40 40 20 50 6Z" fill="none" stroke="' + B + '" stroke-width="2.2"/>' +
      '<path d="M50 16C58 28 72 42 84 50C72 58 58 72 50 84C42 72 28 58 16 50C28 42 42 28 50 16Z" fill="#dbe8f7"/>';
    s += v % 2 ? lemon(50, 52, 1.3, -20) : lemon(44, 56, .9, -30) + lemon(58, 46, .9, 25);
    return s + '<circle cx="50" cy="6" r="2.5" fill="' + Y + '"/><circle cx="50" cy="94" r="2.5" fill="' + Y + '"/><circle cx="6" cy="50" r="2.5" fill="' + Y + '"/><circle cx="94" cy="50" r="2.5" fill="' + Y + '"/></svg>';
  }
  function branch() {
    return '<svg viewBox="0 0 320 90" aria-hidden="true"><path d="M4 30C80 50 180 50 316 20" stroke="#6b5a3a" stroke-width="2.5" fill="none"/>' +
      [[40, 38, -30], [96, 46, 20], [150, 48, -10], [210, 42, 30], [270, 30, -20]].map(function (p) { return '<path d="M' + p[0] + " " + p[1] + "c10 -18 30 -20 38 -14c-8 12 -24 18 -38 14z" + '" fill="' + G + '" transform="rotate(' + p[2] + " " + p[0] + " " + p[1] + ')"/>'; }).join("") +
      lemon(70, 62, 1.1, 10) + lemon(180, 66, 1.3, -15) + lemon(250, 54, 1, 20) + "</svg>";
  }
  function envelope() {
    var n = K.names(), d = K.date, h = "", c = 4, rws = 10;
    for (var r = 0; r < rws; r++) for (var q = 0; q < c; q++) h += '<div class="tl" style="--d:' + ((r + q) * 0.09).toFixed(2) + 's">' + tile(r + q) + "</div>";
    return '<div class="env" id="env" role="button" aria-label="' + esc(x("hint")) + '"><div class="under"><div class="br">' + branch() + '</div><div class="caps">' + esc(x("inv")) + '</div><div class="nm">' + esc(n[0] || "") +
      '<span>&amp;</span>' + esc(n[1] || "") + '</div><div class="dt">' + pad(d.getDate()) + " · " + pad(d.getMonth() + 1) + " · " + d.getFullYear() + '</div></div><div class="tiles">' + h + "</div>" +
      (K.PREVIEW ? "" : '<div class="hint">' + esc(x("hint")) + "</div>") + "</div>";
  }
  function hero() {
    var n = K.names(), d = K.date;
    return '<section class="hero"><div class="strip"></div><div class="wrap"><div class="br rv">' + branch() + '</div><div class="caps rv">' + esc(x("inv")) + '</div><h1 class="nm rv d1"><span>' + esc(n[0] || "") +
      '</span><span class="amp">&amp;</span><span>' + esc(n[1] || "") + "</span></h1>" +
      '<div class="dt3 rv d2"><div class="s">' + esc(x("wdl")[d.getDay()]) + '</div><div class="d">' + d.getDate() + '</div><div class="s">' + esc(u("monthsGen")[d.getMonth()]) + "</div></div>" +
      '<div class="yr rv d2">' + d.getFullYear() + '</div>' + K.photo() + '</div><div class="strip b"></div></section>';
  }
  function story() {
    return '<section class="sky"><div class="wrap"><h2 class="h2 rv">' + esc(x("our")) + '</h2><p class="p rv">' + esc(t(C.text)) + "</p>" +
      '<div class="cal rv"><div class="cal-h">' + esc(u("months")[K.date.getMonth()]) + " " + K.date.getFullYear() + '</div><div class="cal-g">' + K.calendarCells() + "</div></div></div></section>";
  }
  function countdown() {
    return '<section><div class="wrap"><div class="caps rv">' + esc(x("left")) + '</div><div class="cdn rv" data-cd>' + ["days", "hours", "minutes", "seconds"].map(function (k) {
      return '<div><b data-k="' + k + '">00</b><span>' + esc(u(k)) + "</span></div>";
    }).join("") + "</div></div></section>";
  }
  function program() {
    return '<section class="sky"><div class="wrap"><h2 class="h2 rv">' + esc(x("program")) + "</h2>" + (C.events || []).map(function (e, i) {
      return '<div class="ev rv"><div class="pic ico">' + K.evIcon(e, "diamond-c") + '</div><div class="tm">' + esc(e.time) + '</div><div class="t">' + esc(t(e.title)) +
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
    return '<section class="sky"><div class="wrap"><h2 class="h2 rv">' + esc(x("rsvp")) + '</h2><p class="rv">' + esc(x("rsvpLead")) + " " + esc(K.deadline()) + "</p>" +
      '<form class="rs rv" id="rf"><label class="radio"><input type="radio" name="attend" value="yes" checked>' + esc(u("yes")) + "</label>" +
      '<label class="radio"><input type="radio" name="attend" value="no">' + esc(u("no")) + "</label>" +
      '<div class="fl"><label for="rn">' + esc(u("name")) + '</label><input id="rn" name="name" required autocomplete="name"></div>' +
      '<div class="fl"><label for="rg">' + esc(u("guests")) + '</label><select id="rg" name="guests">' + [1, 2, 3, 4, 5, 6].map(function (i) { return "<option>" + i + "</option>"; }).join("") + "</select></div>" +
      '<button class="btn fill" type="submit">' + esc(u("send")) + "</button></form></div></section>";
  }
  function fin() {
    return '<section class="fin"><div class="wrap"><div class="ft rv">' + tile(1) + '</div><div class="caps rv">' + esc(x("fin")) + '</div><div class="nm rv">' + esc(K.names().join(" & ")) + "</div></div></section>" +
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
  // սալիկները շրջվում են ալիքով (վերևի ձախից) → տակից երևում է հրավերը
  function open() {
    var env = document.getElementById("env"); if (env.dataset.busy) return; env.dataset.busy = "1";
    K.music.play();
    env.classList.add("s1");
    setTimeout(function () { env.classList.add("s2"); }, 3000);
    setTimeout(function () {
      opened = true; document.body.classList.remove("locked");
      document.getElementById("app").insertAdjacentHTML("beforeend", K.chrome()); K.bindChrome(render); K.reveal();
    }, 3600);
    setTimeout(function () { env.remove(); }, 4300);
  }
  render();
})();
