/* «Տիկնիկ» (հարսանյաց մեքենա) դիզայնի դասավորությունը */
(function () {
  "use strict";
  var K = window.K, C = K.C, esc = K.esc, t = K.t, u = K.u, pad = K.pad;
  var TXT = {
    hy: { hint: "Սեղմեք մեքենային", top: "Շարասյունը պատրաստ է", beep: "Բի՜պ-բի՜պ", inv: "Սիրով հրավիրում ենք Ձեզ մեր հարսանիքին", our: "Ճանապարհ դեպի նոր կյանք", program: "Շարասյան երթուղին",
      dress: "Դրեսկոդ", left: "Մինչև հարսանիք մնաց", rsvp: "Կմիանա՞ք շարասյանը", rsvpLead: "Խնդրում ենք պատասխանել մինչև", fin: "Սիրով սպասում ենք Ձեզ", wdl: ["Կիրակի", "Երկուշաբթի", "Երեքշաբթի", "Չորեքշաբթի", "Հինգշաբթի", "Ուրբաթ", "Շաբաթ"] },
    ru: { hint: "Нажмите на машину", top: "Кортеж готов", beep: "Би-бип!", inv: "С любовью приглашаем вас на нашу свадьбу", our: "Дорога в новую жизнь", program: "Маршрут кортежа",
      dress: "Дресс-код", left: "До свадьбы осталось", rsvp: "Присоединитесь к кортежу?", rsvpLead: "Пожалуйста, ответьте до", fin: "С любовью ждём вас", wdl: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"] },
    en: { hint: "Tap the car", top: "The convoy is ready", beep: "Beep beep!", inv: "We joyfully invite you to our wedding", our: "The road to a new life", program: "Convoy route",
      dress: "Dress code", left: "Counting down", rsvp: "Will you join the convoy?", rsvpLead: "Kindly reply by", fin: "With love", wdl: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] }
  };
  function x(k) { return (TXT[K.lang] || TXT.hy)[k]; }
  var uid = 0;

  function car() {
    var id = "cb" + (++uid);
    return '<svg class="car" viewBox="0 0 330 170" aria-hidden="true"><defs><linearGradient id="' + id + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#e6e1dc"/></linearGradient></defs>' +
      '<ellipse cx="165" cy="146" rx="150" ry="8" fill="rgba(80,60,60,.18)"/>' +
      '<path d="M18 118L24 92Q30 80 52 77L108 72Q130 42 172 40L212 40Q242 42 262 70L296 75Q314 79 314 98L314 118Q314 124 306 124L26 124Q18 124 18 118Z" fill="url(#' + id + ')" stroke="#c8bfba" stroke-width="1.5"/>' +
      '<path d="M118 72Q136 50 170 48L180 48L180 72Z" fill="#cfe1ef" stroke="#b9c7d3"/><path d="M188 48L210 48Q234 50 250 72L188 72Z" fill="#cfe1ef" stroke="#b9c7d3"/>' +
      '<path d="M24 100H312" stroke="#d9d2cd" stroke-width="1"/><rect x="300" y="88" width="14" height="9" rx="3" fill="#ffe7a8"/><rect x="18" y="92" width="8" height="8" rx="2" fill="#f2a0a8"/>' +
      '<rect x="12" y="112" width="20" height="7" rx="3" fill="#bdb5b0"/><rect x="302" y="112" width="22" height="7" rx="3" fill="#bdb5b0"/>' +
      '<g class="wh"><circle cx="82" cy="124" r="22" fill="#2d2a2c"/><circle cx="82" cy="124" r="11" fill="#d9d4d0"/><path d="M82 113V135M71 124H93" stroke="#9a948f" stroke-width="2"/></g>' +
      '<g class="wh"><circle cx="256" cy="124" r="22" fill="#2d2a2c"/><circle cx="256" cy="124" r="11" fill="#d9d4d0"/><path d="M256 113V135M245 124H267" stroke="#9a948f" stroke-width="2"/></g>' +
      // ժապավեններ և ծաղիկներ
      '<path class="rb" d="M298 78C280 70 262 86 244 74C230 66 214 74 196 66" fill="none" stroke="#f2b8c0" stroke-width="4" stroke-linecap="round"/><path class="rb" d="M298 82C282 92 262 80 244 90C228 98 214 84 196 92" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" opacity=".9"/>' +
      '<g>' + [[286, 72, "#f2b8c0"], [294, 76, "#fff"], [278, 76, "#ffd6dc"], [290, 68, "#e895a1"], [282, 69, "#fff"]].map(function (p) { return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="5" fill="' + p[2] + '" stroke="#e7c9cd" stroke-width=".8"/>'; }).join("") + "</g>" +
      '<path d="M120 40C140 30 160 34 172 40" fill="none" stroke="#f2b8c0" stroke-width="3"/><circle cx="146" cy="34" r="6" fill="#fff" stroke="#f2b8c0" stroke-width="1.5"/>' +
      // տիկնիկ կափարիչին
      '<g transform="translate(272 34)"><g class="doll"><path d="M-9 34L0 12L9 34Z" fill="#fff" stroke="#e7c9cd" stroke-width="1"/><path d="M-12 34Q0 28 12 34L10 38H-10Z" fill="#fff" stroke="#e7c9cd" stroke-width="1"/>' +
      '<circle cy="7" r="5.5" fill="#f6d7c3"/><path d="M-6 6Q-5 -2 0 -1Q6 -1 6 6Q4 2 0 2Q-4 2 -6 6Z" fill="#6b4532"/><path d="M4 2Q14 10 12 32L8 32Q8 14 2 4Z" fill="#fff" opacity=".75"/>' +
      '<circle cx="-2" cy="7" r=".7" fill="#4a3330"/><circle cx="2" cy="7" r=".7" fill="#4a3330"/><circle cx="0" cy="-2" r="1.6" fill="#f2b8c0"/></g></g></svg>';
  }
  function envelope() {
    var n = K.names();
    return '<div class="env" id="env" role="button" aria-label="' + esc(x("hint")) + '"><div class="sky"><i class="sun"></i></div><div class="top"><div class="caps">' + esc(x("top")) + '</div><div class="nm">' + esc(n.join(" & ")) + "</div></div>" +
      '<div class="road"></div><div class="carw" id="carw"><div class="beep">' + esc(x("beep")) + "</div>" + car() + '<i class="sp s1"></i><i class="sp s2"></i><i class="sp s3"></i></div>' +
      (K.PREVIEW ? "" : '<div class="hint">' + esc(x("hint")) + "</div>") + "</div>";
  }
  function hero() {
    var n = K.names(), d = K.date;
    return '<section class="hero"><div class="wrap"><div class="caps rv">' + esc(x("inv")) + '</div><h1 class="nm rv d1"><span>' + esc(n[0] || "") + '</span><span class="amp">&amp;</span><span>' + esc(n[1] || "") + "</span></h1>" +
      '<div class="dt3 rv d2"><div class="s">' + esc(x("wdl")[d.getDay()]) + '</div><div class="d">' + d.getDate() + '</div><div class="s">' + esc(u("monthsGen")[d.getMonth()]) + "</div></div>" +
      '<div class="yr rv d2">' + d.getFullYear() + '</div><div class="hc rv d3">' + car() + "</div></div></section>";
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
    return '<section class="blush"><div class="wrap"><h2 class="h2 rv">' + esc(x("program")) + '</h2><div class="route">' + (C.events || []).map(function (e, i) {
      return '<div class="stop rv"><div class="pin">' + (i + 1) + '</div><div class="tm">' + esc(e.time) + '</div><div class="t">' + esc(t(e.title)) + '</div><div class="n">' + esc(t(e.place)) +
        '</div><div class="a">' + esc(t(e.address)) + "</div>" + (e.map ? '<a class="btn" href="' + esc(e.map) + '" target="_blank" rel="noopener">' + esc(u("map")) + "</a>" : "") + "</div>";
    }).join("") + "</div></div></section>";
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
    return '<section class="fin"><div class="wrap"><div class="caps rv">' + esc(x("fin")) + '</div><div class="nm rv">' + esc(K.names().join(" & ")) + "</div></div></section>" +
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
  // «Բի՜պ-բի՜պ» → մեքենան ցնցվում է → քշում է աջ՝ ժապավենները ծածանվում են → էջը
  function open() {
    var env = document.getElementById("env"); if (env.dataset.busy) return; env.dataset.busy = "1";
    K.music.play();
    env.classList.add("s1");
    setTimeout(function () { env.classList.add("s2"); }, 1100);
    setTimeout(function () { env.classList.add("s3"); }, 2600);
    setTimeout(function () {
      opened = true; document.body.classList.remove("locked");
      document.getElementById("app").insertAdjacentHTML("beforeend", K.chrome()); K.bindChrome(render); K.reveal();
    }, 3100);
    setTimeout(function () { env.remove(); }, 3800);
  }
  render();
})();
