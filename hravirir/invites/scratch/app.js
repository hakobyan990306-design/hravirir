/* «Քերվող քարտ» դիզայնի դասավորությունը */
(function () {
  "use strict";
  var K = window.K, C = K.C, esc = K.esc, t = K.t, u = K.u, pad = K.pad;
  var TXT = {
    hy: { top: "Մենք ունենք գաղտնիք", hint: "Քերեք սրտերը մատով", skip: "Ցույց տալ առանց քերելու", lab: ["օր", "ամիս", "տարի"], yes: "Մենք ամուսնանում ենք", inv: "Սիրով հրավիրում ենք Ձեզ մեր հարսանիքին",
      our: "Մեր գաղտնիքը", program: "Օրվա ծրագիր", dress: "Դրեսկոդ", left: "Հարսանիքին մնացել է", rsvp: "Հարցաթերթիկ", rsvpLead: "Խնդրում ենք պատասխանել մինչև", fin: "Սիրով սպասում ենք Ձեզ",
      wdl: ["Կիրակի", "Երկուշաբթի", "Երեքշաբթի", "Չորեքշաբթի", "Հինգշաբթի", "Ուրբաթ", "Շաբաթ"] },
    ru: { top: "У нас есть секрет", hint: "Сотрите сердечки пальцем", skip: "Показать без стирания", lab: ["день", "месяц", "год"], yes: "Мы женимся", inv: "С любовью приглашаем вас на нашу свадьбу",
      our: "Наш секрет", program: "Программа дня", dress: "Дресс-код", left: "До свадьбы осталось", rsvp: "Анкета", rsvpLead: "Пожалуйста, ответьте до", fin: "С любовью ждём вас",
      wdl: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"] },
    en: { top: "We have a secret", hint: "Scratch the hearts", skip: "Reveal without scratching", lab: ["day", "month", "year"], yes: "We're getting married", inv: "We joyfully invite you to our wedding",
      our: "Our secret", program: "Schedule", dress: "Dress code", left: "Counting down", rsvp: "RSVP", rsvpLead: "Kindly reply by", fin: "With love",
      wdl: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] }
  };
  function x(k) { return (TXT[K.lang] || TXT.hy)[k]; }
  function f(v) { return Math.round(v * 10) / 10; }
  var s0 = 17; function r() { s0 = (s0 * 16807) % 2147483647; return s0 / 2147483647; }
  var HEART = '<svg viewBox="0 0 100 92" aria-hidden="true"><path d="M50 90C20 68 2 50 2 28C2 12 14 2 28 2C38 2 46 8 50 16C54 8 62 2 72 2C86 2 98 12 98 28C98 50 80 68 50 90Z"/></svg>';

  function confetti() {
    var h = "", cols = ["#e5b3ae", "#d7b46a", "#f7ede8", "#9c6b67", "#fff"]; s0 = 17;
    for (var i = 0; i < 60; i++) h += '<i style="left:' + f(r() * 100) + "%;background:" + cols[i % 5] + ";--r:" + f(r() * 900 - 450) + "deg;--x:" + f((r() - .5) * 120) + "px;--d:" + f(1.8 + r() * 1.6) + "s;--dl:" + f(r() * .6) + 's"></i>';
    return '<div class="conf">' + h + "</div>";
  }
  function envelope() {
    var d = K.date, vals = [pad(d.getDate()), pad(d.getMonth() + 1), String(d.getFullYear()).slice(2)];
    return '<div class="env" id="env"><div class="card"><div class="caps">' + esc(x("top")) + '</div><div class="nm">' + esc(K.names().join(" & ")) + "</div>" +
      '<div class="hearts">' + vals.map(function (v, i) {
        return '<div class="ht"><div class="hv">' + HEART + "<b>" + v + "</b></div><canvas data-i=\"" + i + '"></canvas><span>' + esc(x("lab")[i]) + "</span></div>";
      }).join("") + '</div><div class="yes">' + esc(x("yes")) + '</div><div class="hint">' + esc(x("hint")) + '</div><button class="skip" type="button">' + esc(x("skip")) + "</button></div>" + confetti() + "</div>";
  }
  // ոսկե շերտը՝ քերելու համար
  function paint(cv) {
    var w = cv.offsetWidth, h = cv.offsetHeight, dpr = Math.min(2, window.devicePixelRatio || 1);
    cv.width = w * dpr; cv.height = h * dpr;
    var c = cv.getContext("2d"); c.scale(dpr, dpr);
    var g = c.createLinearGradient(0, 0, w, h); g.addColorStop(0, "#b8913f"); g.addColorStop(.35, "#f3dc9a"); g.addColorStop(.55, "#caa24f"); g.addColorStop(.8, "#f1d48a"); g.addColorStop(1, "#a9823a");
    c.fillStyle = g; c.fillRect(0, 0, w, h);
    for (var i = 0; i < 160; i++) { c.fillStyle = "rgba(255,255,255," + (r() * .5).toFixed(2) + ")"; c.fillRect(r() * w, r() * h, 1.2, 1.2); }
    c.fillStyle = "rgba(120,85,30,.55)"; c.font = "600 11px Noto Serif Armenian, serif"; c.textAlign = "center"; c.fillText("✦ ✦ ✦", w / 2, h / 2 + 4);
    c.globalCompositeOperation = "destination-out";
    return c;
  }
  function bindScratch(env) {
    var done = 0, cvs = env.querySelectorAll("canvas");
    function check(cv, c) {
      var d = c.getImageData(0, 0, cv.width, cv.height).data, n = 0, k = 0;
      for (var i = 3; i < d.length; i += 4 * 24) { k++; if (d[i] < 40) n++; }
      if (n / k > .45 && !cv.dataset.done) { cv.dataset.done = "1"; cv.classList.add("gone"); cv.parentNode.classList.add("ok"); done++; if (done === cvs.length) finish(); }
    }
    cvs.forEach(function (cv) {
      var c = paint(cv), down = false, moves = 0;
      function pt(ev) { var b = cv.getBoundingClientRect(); return [ev.clientX - b.left, ev.clientY - b.top]; }
      function scratch(ev) { var p = pt(ev); c.beginPath(); c.arc(p[0], p[1], 17, 0, Math.PI * 2); c.fill(); if (++moves % 6 === 0) check(cv, c); }
      cv.addEventListener("pointerdown", function (ev) { down = true; cv.setPointerCapture(ev.pointerId); K.music.play(); scratch(ev); });
      cv.addEventListener("pointermove", function (ev) { if (down) scratch(ev); });
      cv.addEventListener("pointerup", function () { down = false; check(cv, c); });
    });
    env.querySelector(".skip").onclick = function () { cvs.forEach(function (cv) { cv.classList.add("gone"); cv.parentNode.classList.add("ok"); }); K.music.play(); finish(); };
  }
  function hero() {
    var n = K.names(), d = K.date;
    return '<section class="hero"><div class="wrap"><div class="caps rv">' + esc(x("inv")) + '</div><h1 class="nm rv d1"><span>' + esc(n[0] || "") + '</span><span class="amp">&amp;</span><span>' + esc(n[1] || "") + "</span></h1>" +
      '<div class="mini rv d2">' + [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].map(function (v) { return '<div class="ht">' + HEART + "<b>" + v + "</b></div>"; }).join("") + "</div>" +
      '<div class="wd rv d2">' + esc(x("wdl")[d.getDay()]) + " · " + pad(d.getHours()) + ":" + pad(d.getMinutes()) + "</div></div></section>";
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
    return '<section class="blush"><div class="wrap"><h2 class="h2 rv">' + esc(x("program")) + "</h2>" + (C.events || []).map(function (e) {
      return '<div class="ev rv"><div class="pic ico">' + K.evIcon(e, "double-c") + '</div><div class="tm">' + esc(e.time) + '</div><div class="t">' + esc(t(e.title)) +
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
    return '<section class="fin"><div class="wrap"><div class="fh rv">' + HEART + '</div><div class="caps rv">' + esc(x("fin")) + '</div><div class="nm rv">' + esc(K.names().join(" & ")) + "</div></div></section>" +
      '<div class="made"><a href="https://hravirir.am" target="_blank" rel="noopener">HRAVIRIR.AM</a></div>';
  }

  var opened = false;
  function render() {
    document.documentElement.lang = K.lang;
    document.title = K.names().join(" & ");
    document.getElementById("app").innerHTML = (opened ? "" : envelope()) + "<main>" + hero() + story() + countdown() + program() + dress() + rsvp() + fin() + "</main>" + (opened ? K.chrome() : "");
    document.body.classList.toggle("locked", !opened);
    if (!opened) { var e = document.getElementById("env"); if (e && !K.PREVIEW) bindScratch(e); else if (e) e.querySelectorAll("canvas").forEach(paint); } else K.reveal();
    K.countdown(true); K.rsvp(document.getElementById("rf")); K.bindChrome(render);
  }
  // բոլոր սրտերը քերված են → «Մենք ամուսնանում ենք» + կոնֆետի → էջը
  function finish() {
    var env = document.getElementById("env"); if (!env || env.dataset.busy) return; env.dataset.busy = "1";
    env.classList.add("s1");
    setTimeout(function () { env.classList.add("s2"); }, 2600);
    setTimeout(function () {
      opened = true; document.body.classList.remove("locked");
      document.getElementById("app").insertAdjacentHTML("beforeend", K.chrome()); K.bindChrome(render); K.reveal();
    }, 3200);
    setTimeout(function () { env.remove(); }, 3900);
  }
  render();
})();
