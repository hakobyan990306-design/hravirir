/* «Սև-սպիտակ» — hravirir.am-ի դասական լուսանկարային հրավերը (օր.՝ eduard-elmira) */
(function () {
  "use strict";
  var K = window.K, C = K.C, esc = K.esc, t = K.t, u = K.u;
  var TXT = {
    hy: { and: "և", left: "Հարսանիքին մնացել է", plan: "Օրվա ծրագիր", where: "Ստորև տեղադրված քարտեզները Ձեզ կօգնեն ավելի արագ գտնել մեր միջոցառման վայրերը և միանալ մեզ։", how: "Ինչպես հասնել",
      rsvp: "Հարցաթերթիկ", rsvpLead: "Խնդրում ենք պատասխանել մինչև", fin: "Սիրով կսպասենք Ձեզ", share: "Կիսվել հղումով", made: "Կայքը պատրաստվել է", wd: ["Եկ", "Եք", "Չո", "Հի", "Ու", "Շա", "Կի"] },
    ru: { and: "и", left: "До свадьбы осталось", plan: "Программа дня", where: "Карты ниже помогут вам быстрее найти места нашего праздника и присоединиться к нам.", how: "Как добраться",
      rsvp: "Анкета", rsvpLead: "Пожалуйста, ответьте до", fin: "С любовью ждём вас", share: "Поделиться ссылкой", made: "Сайт создан", wd: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"] },
    en: { and: "&", left: "Counting down", plan: "Schedule", where: "The maps below will help you find our venues.", how: "Directions",
      rsvp: "RSVP", rsvpLead: "Kindly reply by", fin: "With love, we await you", share: "Share the link", made: "Made by", wd: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"] }
  };
  function x(k) { return (TXT[K.lang] || TXT.hy)[k]; }
  var ICON = {
    start: '<rect x="8" y="12" width="48" height="42" rx="5"/><path d="M8 24H56M20 6V16M44 6V16M32 47C22 40 20 36 22 32C24 28 30 28 32 33C34 28 40 28 42 32C44 36 42 40 32 47Z"/>',
    home: '<path d="M8 30L32 10L56 30M14 26V54H50V26M26 54V40H38V54"/>',
    rings: '<circle cx="24" cy="38" r="15"/><circle cx="24" cy="38" r="11"/><circle cx="40" cy="30" r="15"/><circle cx="40" cy="30" r="11"/>',
    glasses: '<path d="M14 12H28L26 30C25 36 17 36 16 30ZM36 12H50L48 30C47 36 39 36 38 30ZM21 35V54M43 35V54M14 54H28M36 54H50M14 20H28M36 20H50M31 4L33 9M24 6L27 10M38 6L35 10"/>'
  };
  function icon(k) { return '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICON[k] || ICON.start) + "</svg>"; }
  function img(src, cls) { return src ? '<div class="im ' + (cls || "") + '"><img src="' + esc(src) + '" alt="" loading="lazy"></div>' : ""; }
  function heart() { return '<svg class="hrt" viewBox="0 0 60 56" aria-hidden="true"><path d="M30 52C12 40 3 30 5 18C7 6 22 3 30 16C36 3 54 4 56 17C58 30 46 40 31 51C27 54 20 50 14 47" fill="none" stroke="#e01b24" stroke-width="2.6" stroke-linecap="round"/></svg>'; }
  function logo() { return '<svg viewBox="0 0 60 60" aria-hidden="true"><circle cx="30" cy="30" r="26" fill="#fff" stroke="#f2c230" stroke-width="2.4"/><path d="M18 40C22 28 26 18 30 14C27 26 26 34 28 42M28 30C33 26 38 26 40 30C36 31 33 33 31 38" fill="none" stroke="#555" stroke-width="1.6" stroke-linecap="round"/></svg>'; }
  function bar() {
    return '<div class="topbar"><button class="play" type="button" data-music aria-label="music"><i></i></button></div>';
  }
  function cal() {
    var d0 = K.date, y = d0.getFullYear(), m = d0.getMonth(), first = (new Date(y, m, 1).getDay() + 6) % 7, days = new Date(y, m + 1, 0).getDate(), h = "";
    x("wd").forEach(function (w) { h += '<div class="cw">' + w + "</div>"; });
    for (var i = 0; i < first; i++) h += "<div></div>";
    for (var d = 1; d <= days; d++) h += '<div class="cd' + (d === d0.getDate() ? " on" : "") + '">' + d + (d === d0.getDate() ? heart() : "") + "</div>";
    return '<div class="cal rv"><div class="cal-h">' + esc(u("months")[m]) + '</div><div class="cal-g">' + h + "</div></div>";
  }
  function page() {
    var n = K.names(), ev = C.events || [];
    return '<div class="col">' + bar() +
      '<section class="hero"><div class="ph"><img src="' + esc(C.photo) + '" alt=""><i class="chev"></i></div></section>' +
      '<section><div class="wrap"><h1 class="nm rv">' + esc(n[0] || "") + " " + esc(x("and")) + " " + esc(n[1] || "") + '</h1><div class="hl"></div><p class="p rv">' + esc(t(C.text)) + "</p>" + cal() + "</div></section>" +
      '<section class="cds"><div class="wrap"><h2 class="h2 rv" style="margin-bottom:24px">' + esc(x("left")) + '</h2><div class="cdn rv" data-cd>' + ["days", "hours", "minutes", "seconds"].map(function (k) { return '<div><b data-k="' + k + '">00</b><span>' + esc(u(k)) + "</span></div>"; }).join("") + "</div></div></section>" +
      (C.gallery && C.gallery.length ? '<section class="gal"><div class="strip">' + C.gallery.map(function (g) { return '<div class="gi"><img src="' + esc(g) + '" alt="" loading="lazy"></div>'; }).join("") + '</div><div class="wrap"><div class="hl long"></div></div></section>' : "") +
      '<section><div class="wrap"><h2 class="h2 rv">' + esc(x("plan")) + '</h2><div class="hl"></div>' + ev.map(function (e) {
        return '<div class="pl rv"><div class="tm">' + esc(e.time) + '</div><div class="ic">' + icon(e.icon) + '</div><div class="tx"><div class="t">' + esc(t(e.title)) + '</div><div class="n">' + esc(t(e.place)) + "</div></div></div>";
      }).join("") + '<div class="hl"></div></div></section>' +
      (C.duo ? '<section class="duo-s"><div class="duo rv">' + img(C.duo[0], "a") + img(C.duo[1], "b") + "</div></section>" : "") +
      '<section><div class="wrap"><div class="hl"></div><p class="p sm rv">' + esc(x("where")) + '</p><div class="hl"></div></div>' + ev.map(function (e) {
        return '<div class="vn rv"><div class="wrap"><h3 class="vp">' + esc(t(e.place)) + "</h3>" + (e.address ? '<div class="va">' + esc(t(e.address)) + "</div>" : "") + "</div>" + img(e.img, "vi") +
          '<div class="wrap">' + (e.map ? '<a class="pill" href="' + esc(e.map) + '" target="_blank" rel="noopener">' + esc(x("how")) + "</a>" : "") + '<div class="hl"></div></div></div>';
      }).join("") + "</section>" +
      (C.rsvp ? '<section><div class="wrap"><h2 class="h2 rv">' + esc(x("rsvp")) + '</h2><p class="p sm rv">' + esc(x("rsvpLead")) + " " + esc(K.deadline()) + "</p>" +
        '<form class="rs rv" id="rf"><label class="radio"><input type="radio" name="attend" value="yes" checked>' + esc(u("yes")) + "</label>" +
        '<label class="radio"><input type="radio" name="attend" value="no">' + esc(u("no")) + "</label>" +
        '<div class="fl"><label for="rn">' + esc(u("name")) + '</label><input id="rn" name="name" required autocomplete="name"></div>' +
        '<div class="fl"><label for="rg">' + esc(u("guests")) + '</label><select id="rg" name="guests">' + [1, 2, 3, 4, 5, 6].map(function (i) { return "<option>" + i + "</option>"; }).join("") + "</select></div>" +
        '<button class="pill fill" type="submit">' + esc(u("send")) + "</button></form></div></section>" : "") +
      '<section class="fin"><div class="wrap"><div class="hl"></div><h2 class="h2 rv">' + esc(x("fin")) + "</h2></div>" + img(C.finalPhoto || C.photo, "fp") + "</section>" +
      '<footer class="ft"><button class="share" type="button">↗ ' + esc(x("share")) + '</button><div>' + esc(x("made")) + ' <a href="https://hravirir.am" target="_blank" rel="noopener">www.hravirir.am</a></div></footer></div>';
  }

  function render() {
    document.documentElement.lang = K.lang;
    document.title = K.names().join(" " + x("and") + " ");
    document.getElementById("app").innerHTML = "<main>" + page() + "</main>" + K.chrome();
    K.reveal(); K.countdown(false); K.rsvp(document.getElementById("rf")); K.bindChrome(render); K.music.sync();
    var sh = document.querySelector(".share");
    if (sh) sh.onclick = function () { if (navigator.share) navigator.share({ title: document.title, url: location.href }).catch(function () {}); else if (navigator.clipboard) navigator.clipboard.writeText(location.href); };
  }
  render();
})();
