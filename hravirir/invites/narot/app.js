/* «Նարոտ» (կնունք) դիզայնի դասավորությունը */
(function () {
  "use strict";
  var K = window.K, C = K.C, esc = K.esc, t = K.t, u = K.u, pad = K.pad;
  var TXT = {
    hy: { top: "Սուրբ մկրտություն", q: "Ովքե՞ր են կնքահայրն ու կնքամայրը", hint: "Սեղմեք՝ նարոտը հյուսելու համար", gf: "Կնքահայր", gm: "Կնքամայր", go: "Բացել հրավերը",
      inv: "Սիրով հրավիրում ենք Ձեզ մեր որդու կնունքին", our: "Նարոտի խորհուրդը", gp: "Կնքահայր և կնքամայր", program: "Օրվա ծրագիր", left: "Մինչև կնունքը մնաց",
      rsvp: "Կգա՞ք", rsvpLead: "Խնդրում ենք պատասխանել մինչև", fin: "Սիրով սպասում ենք Ձեզ" },
    ru: { top: "Святое крещение", q: "Кто станет крёстными?", hint: "Нажмите, чтобы сплести нарот", gf: "Крёстный отец", gm: "Крёстная мать", go: "Открыть приглашение",
      inv: "С любовью приглашаем вас на крестины нашего сына", our: "Смысл нарота", gp: "Крёстные", program: "Программа дня", left: "До крестин осталось",
      rsvp: "Вы придёте?", rsvpLead: "Пожалуйста, ответьте до", fin: "С любовью ждём вас" },
    en: { top: "Holy baptism", q: "Who are the godparents?", hint: "Tap to braid the narot", gf: "Godfather", gm: "Godmother", go: "Open the invitation",
      inv: "You are invited to our son's baptism", our: "The meaning of the narot", gp: "Godparents", program: "Schedule", left: "Counting down",
      rsvp: "Will you come?", rsvpLead: "Kindly reply by", fin: "With love" }
  };
  function x(k) { return (TXT[K.lang] || TXT.hy)[k]; }
  var uid = 0;
  var CORD = "M28 10C26 120 70 236 100 244C130 236 174 120 172 10";
  function cross(cx, cy, s) {
    return '<g transform="translate(' + cx + " " + cy + ") scale(" + s + ')"><defs><linearGradient id="cg' + (++uid) + '" x1="0" x2="1"><stop offset="0" stop-color="#b8893d"/><stop offset=".5" stop-color="#f3dc9a"/><stop offset="1" stop-color="#a87c35"/></linearGradient></defs>' +
      '<g fill="url(#cg' + uid + ')" stroke="#8a6526" stroke-width=".8"><rect x="-3.5" y="-28" width="7" height="58" rx="1.5"/><rect x="-19" y="-11" width="38" height="7" rx="1.5"/>' +
      [[-3.5, -29], [3.5, -29], [-3.5, 31], [3.5, 31], [-20, -11], [-20, -4], [20, -11], [20, -4]].map(function (p) { return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="3.6"/>'; }).join("") +
      '</g><circle cy="-7.5" r="3" fill="#fff6e0" stroke="#8a6526" stroke-width=".7"/><circle cy="-36" r="3.5" fill="none" stroke="#b8893d" stroke-width="1.6"/></g>';
  }
  function narot(id) {
    return '<svg class="nar" viewBox="0 0 200 330" aria-hidden="true"><defs><mask id="' + id + '"><path d="' + CORD + '" fill="none" stroke="#fff" stroke-width="12" stroke-linecap="round" pathLength="1" class="draw1"/></mask></defs>' +
      '<g mask="url(#' + id + ')"><path d="' + CORD + '" fill="none" stroke="#6b0d16" stroke-width="7.5" stroke-linecap="round"/><path d="' + CORD + '" fill="none" stroke="#fffaf2" stroke-width="5.6" stroke-linecap="round"/>' +
      '<path d="' + CORD + '" fill="none" stroke="#c4182a" stroke-width="5.6" stroke-dasharray="4.2 4.2"/><path d="' + CORD + '" fill="none" stroke="rgba(0,0,0,.18)" stroke-width="5.6" stroke-dasharray=".9 7.5" stroke-dashoffset="-3.6"/></g>' +
      '<g class="pend"><path d="M100 244V262" stroke="#c4182a" stroke-width="2.2"/><circle cx="100" cy="252" r="5.5" fill="#2f6fd6" stroke="#1d4a99" stroke-width="1"/><circle cx="98.5" cy="250.5" r="1.6" fill="#fff"/>' + cross(100, 296, 1) + "</g></svg>";
  }
  function envelope() {
    var n = K.names();
    return '<div class="env" id="env"><div class="top"><div class="caps">' + esc(x("top")) + '</div><div class="nm">' + esc(n[0] || "") + '</div></div><div class="stage" id="stage">' + narot("nm1") + "</div>" +
      '<div class="reveal"><div class="q">' + esc(x("q")) + '</div><div class="gp"><div><small>' + esc(x("gf")) + "</small><b>" + esc(t(C.godfather)) + "</b></div><i></i><div><small>" + esc(x("gm")) + "</small><b>" + esc(t(C.godmother)) + "</b></div></div>" +
      '<button class="go" type="button">' + esc(x("go")) + "</button></div>" + (K.PREVIEW ? "" : '<div class="hint">' + esc(x("hint")) + "</div>") + "</div>";
  }
  function hero() {
    var n = K.names(), d = K.date;
    return '<section class="hero"><div class="wrap"><div class="hn rv">' + narot("nm2") + '</div><div class="caps rv">' + esc(x("inv")) + '</div><h1 class="nm rv d1">' + esc(n[0] || "") + "</h1>" +
      '<div class="dt rv d2">' + d.getDate() + " " + esc(u("monthsGen")[d.getMonth()]) + " " + d.getFullYear() + " · " + pad(d.getHours()) + ":" + pad(d.getMinutes()) + "</div></div></section>";
  }
  function story() {
    return '<section class="soft"><div class="wrap"><h2 class="h2 rv">' + esc(x("our")) + '</h2><p class="p rv">' + esc(t(C.text)) + "</p></div></section>";
  }
  function godparents() {
    return '<section><div class="wrap"><h2 class="h2 rv">' + esc(x("gp")) + '</h2><div class="gcard rv"><div><small>' + esc(x("gf")) + "</small><b>" + esc(t(C.godfather)) + '</b></div><div class="cr">' +
      '<svg viewBox="-24 -40 48 80" aria-hidden="true">' + cross(0, 0, 1) + "</svg></div><div><small>" + esc(x("gm")) + "</small><b>" + esc(t(C.godmother)) + "</b></div></div></div></section>";
  }
  function countdown() {
    return '<section class="soft"><div class="wrap"><div class="caps rv">' + esc(x("left")) + '</div><div class="cdn rv" data-cd>' + ["days", "hours", "minutes", "seconds"].map(function (k) {
      return '<div><b data-k="' + k + '">00</b><span>' + esc(u(k)) + "</span></div>";
    }).join("") + '</div><div class="cal rv"><div class="cal-h">' + esc(u("months")[K.date.getMonth()]) + " " + K.date.getFullYear() + '</div><div class="cal-g">' + K.calendarCells() + "</div></div></div></section>";
  }
  function program() {
    return '<section><div class="wrap"><h2 class="h2 rv">' + esc(x("program")) + "</h2>" + (C.events || []).map(function (e) {
      return '<div class="ev rv"><div class="tm">' + esc(e.time) + '</div><div class="t">' + esc(t(e.title)) + '</div><div class="n">' + esc(t(e.place)) + '</div><div class="a">' + esc(t(e.address)) + "</div>" +
        (e.map ? '<a class="btn" href="' + esc(e.map) + '" target="_blank" rel="noopener">' + esc(u("map")) + "</a>" : "") + "</div>";
    }).join('<div class="tw"></div>') + "</div></section>";
  }
  function rsvp() {
    if (!C.rsvp) return "";
    return '<section class="soft"><div class="wrap"><h2 class="h2 rv">' + esc(x("rsvp")) + '</h2><p class="rv">' + esc(x("rsvpLead")) + " " + esc(K.deadline()) + "</p>" +
      '<form class="rs rv" id="rf"><label class="radio"><input type="radio" name="attend" value="yes" checked>' + esc(u("yes")) + "</label>" +
      '<label class="radio"><input type="radio" name="attend" value="no">' + esc(u("no")) + "</label>" +
      '<div class="fl"><label for="rn">' + esc(u("name")) + '</label><input id="rn" name="name" required autocomplete="name"></div>' +
      '<div class="fl"><label for="rg">' + esc(u("guests")) + '</label><select id="rg" name="guests">' + [1, 2, 3, 4, 5, 6].map(function (i) { return "<option>" + i + "</option>"; }).join("") + "</select></div>" +
      '<button class="btn fill" type="submit">' + esc(u("send")) + "</button></form></div></section>";
  }
  function fin() {
    return '<section class="fin"><div class="wrap"><div class="caps rv">' + esc(x("fin")) + '</div><div class="nm rv">' + esc(K.names()[0] || "") + "</div></div></section>" +
      '<div class="made"><a href="https://hravirir.am" target="_blank" rel="noopener">HRAVIRIR.AM</a></div>';
  }

  var opened = false;
  function render() {
    document.documentElement.lang = K.lang;
    document.title = x("top") + " · " + (K.names()[0] || "");
    document.getElementById("app").innerHTML = (opened ? "" : envelope()) + "<main>" + hero() + story() + godparents() + countdown() + program() + rsvp() + fin() + "</main>" + (opened ? K.chrome() : "");
    document.body.classList.toggle("locked", !opened);
    if (!opened) { var e = document.getElementById("env"); if (e && !K.PREVIEW) { e.onclick = braid; e.querySelector(".go").onclick = function (ev) { ev.stopPropagation(); open(); }; } } else K.reveal();
    K.countdown(true); K.rsvp(document.getElementById("rf")); K.bindChrome(render);
  }
  // թելերը հյուսվում են → խաչը կախվում ու օրորվում է → կնքահայր/կնքամայր → «Բացել»
  function braid() {
    var env = document.getElementById("env"); if (env.dataset.busy) return; env.dataset.busy = "1";
    K.music.play();
    env.classList.add("s1");
    setTimeout(function () { env.classList.add("s2"); }, 1700);
    setTimeout(function () { env.classList.add("s3"); }, 2500);
    setTimeout(open, 9000);
  }
  function open() {
    var env = document.getElementById("env"); if (!env || env.dataset.out) return; env.dataset.out = "1";
    env.classList.add("s4");
    setTimeout(function () {
      opened = true; document.body.classList.remove("locked");
      document.getElementById("app").insertAdjacentHTML("beforeend", K.chrome()); K.bindChrome(render); K.reveal();
    }, 500);
    setTimeout(function () { env.remove(); }, 1200);
  }
  render();
})();
