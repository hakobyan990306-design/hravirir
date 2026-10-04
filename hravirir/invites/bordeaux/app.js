/* «Բորդո» — բորդո, սև և կաթնագույն. սև-սպիտակ լուսանկար, կարմիր մոմե կնիք, «հարսանեկան լրագիր» ամսաթվով,
   ծրագիր՝ ուղղահայաց գծով, նռնով բաժակ։ Բացումը՝ բորդո ծրար, կնիքը կոտրվում է, կափարիչը բացվում, բացիկը դուրս գալիս */
(function () {
  "use strict";
  var K = window.K, C = K.C, esc = K.esc, t = K.t, u = K.u, P = window.P;
  P.texts({
    hy: { hint: "Սեղմեք կնիքին", day: "Հարսանեկան օր", dear: "Սիրելի՛ հարազատներ և ընկերներ", date: "Ամուսնության օրը", plan: "Ծրագիր", where: "Վայրը",
      paper: "Հարսանեկան լրագիր", issue: "Հատուկ համար", news: "Մեծ նորություն", newsT: "Այս օրը երկու սիրող սրտեր միանում են։ Հյուրերին խնդրում ենք գալ ժամանակին, բերել լավ տրամադրություն և պարելու պատրաստ կոշիկներ։", left: "Մնացել է", fin: "Սիրով սպասում ենք Ձեզ" },
    ru: { hint: "Нажмите на печать", day: "Свадебный день", dear: "Дорогие родные и друзья", date: "Дата бракосочетания", plan: "Программа", where: "Место",
      paper: "Свадебная газета", issue: "Специальный выпуск", news: "Главная новость", newsT: "В этот день два любящих сердца соединяются. Гостей просим прийти вовремя, взять хорошее настроение и туфли для танцев.", left: "Осталось", fin: "С любовью ждём вас" },
    en: { hint: "Tap the seal", day: "Wedding day", dear: "Dear family and friends", date: "Our wedding date", plan: "Timing", where: "Location",
      paper: "The Wedding Gazette", issue: "Special edition", news: "Big news", newsT: "Two loving hearts become one. Guests are kindly asked to arrive on time, bring a good mood and shoes ready for dancing.", left: "Counting down", fin: "With love" }
  });
  function ini() { var n = K.names(); return [(n[0] || "").charAt(0), (n[1] || "").charAt(0)]; }
  // կարմիր մոմե կնիք՝ անհարթ եզրերով և երկու սկզբնատառով
  var sid = 0;
  function seal(cls) {
    var L = ini(), g = "bxS" + (++sid), h = "bxH" + sid;
    return '<svg class="bx-seal ' + (cls || "") + '" viewBox="0 0 120 120" aria-hidden="true"><defs>' +
      '<radialGradient id="' + g + '" cx=".36" cy=".3" r=".85"><stop offset="0" stop-color="#d4333f"/><stop offset=".45" stop-color="#9e1424"/><stop offset="1" stop-color="#5a0711"/></radialGradient>' +
      '<radialGradient id="' + h + '" cx=".62" cy=".66" r=".7"><stop offset="0" stop-color="#7d0c19"/><stop offset="1" stop-color="#b52231"/></radialGradient></defs>' +
      '<path d="M61 4C70 6 77 3 85 10C95 13 104 20 107 31C114 39 117 50 114 61C118 72 113 84 106 92C102 103 91 110 79 113C69 118 56 117 45 114C33 113 21 106 15 95C7 87 3 75 6 63C2 52 6 40 13 31C17 20 27 12 39 9C46 5 53 3 61 4Z" fill="url(#' + g + ')" filter="drop-shadow(0 6px 7px rgba(40,0,6,.5))"/>' +
      '<circle cx="60" cy="60" r="39" fill="url(#' + h + ')"/><circle cx="60" cy="60" r="39" fill="none" stroke="#e66" stroke-opacity=".28"/><circle cx="60" cy="60" r="33.5" fill="none" stroke="#3d0309" stroke-opacity=".35" stroke-dasharray="1 2.2"/>' +
      '<path d="M30 44C38 30 52 25 64 26" fill="none" stroke="#fff" stroke-opacity=".22" stroke-width="3" stroke-linecap="round"/>' +
      '<text x="60" y="70" text-anchor="middle" font-size="31" fill="#4a040c" fill-opacity=".85" style="font-family:var(--script)">' + esc(L[0]) +
      '<tspan font-size="16" dx="1" dy="-4">&amp;</tspan><tspan dx="1" dy="4">' + esc(L[1]) + "</tspan></text></svg>";
  }
  function env() {
    var n = K.names();
    return '<div class="env bxe" id="env" role="button" aria-label="' + esc(P.x("hint")) + '">' +
      '<div class="fe fe-l"></div><div class="fe fe-r"></div><div class="fe fe-b"></div><div class="fe-tw"><div class="fe fe-t"></div></div>' +
      '<div class="bx-nm">' + esc(n[0] || "") + " <i>&amp;</i> " + esc(n[1] || "") + '<span class="bx-dt">' + P.dots(" · ") + "</span></div>" +
      '<div class="bx-sw"><div class="bx-half l">' + seal() + '</div><div class="bx-half r">' + seal() + "</div></div>" +
      (K.PREVIEW ? "" : '<div class="hint">' + esc(P.x("hint")) + "</div>") + "</div>";
  }
  // «Հարսանեկան լրագիր»՝ իսկական թերթի պես. վերնագիր, սև-սպիտակ լուսանկար, մեծ ամսաթիվ, երկու սյունակ հոդված
  function paper() {
    var n = K.names(), d = K.date, mon = u("months")[d.getMonth()].slice(0, 3).toUpperCase(), g = (C.gallery || [])[0] || C.photo;
    var art = esc(t(C.paperText || P.x("newsT")));
    return '<div class="gz rv"><div class="gz-top"><span>' + esc(P.x("issue")) + "</span><span>№ 1</span><span>" + P.dots(".") + "</span></div>" +
      '<div class="gz-m">' + esc(P.x("paper")) + "</div>" +
      '<div class="gz-r"><span>' + esc(P.x("wdl")[d.getDay()]) + "</span><span>" + esc(u("months")[d.getMonth()]) + " " + d.getFullYear() + "</span></div>" +
      '<div class="gz-h">' + esc((n[0] || "").toUpperCase()) + " <i>+</i> " + esc((n[1] || "").toUpperCase()) + "</div>" +
      '<div class="gz-b">' + (g ? '<figure class="gz-p"><img src="' + esc(g) + '" alt="" loading="lazy"><figcaption>' + esc(n.join(" & ")) + "</figcaption></figure>" : "") +
      '<div class="gz-d"><b>' + d.getDate() + "</b><span>" + esc(mon) + "</span><em>" + d.getFullYear() + "</em></div></div>" +
      '<div class="gz-k">' + esc(P.x("news")) + '</div><p class="gz-c">' + art + "</p></div>";
  }
  // բալով բաժակ՝ լուսանկար (կարելի է փոխել INVITE.drink-ով)
  function glass() {
    var src = C.drink || "https://images.unsplash.com/photo-1600788872581-661fcaccb539?w=900&q=85&auto=format&fit=crop";
    return '<div class="drink rv"><img src="' + esc(src) + '" alt="" loading="lazy"></div>';
  }
  var CIRC = '<svg class="bx-circ" viewBox="0 0 50 50" aria-hidden="true"><path d="M27 6C14 4 5 14 6 26C7 39 19 46 30 43C41 40 46 29 43 19C41 12 34 7 24 8" fill="none" stroke="#9e1424" stroke-width="1.8" stroke-linecap="round"/></svg>';
  function main() {
    var n = K.names(), d = K.date;
    var plan = (C.plan || C.events || []).map(function (e) {
      return '<div class="tl-r rv"><div class="tl-t">' + esc(e.time) + '</div><div class="tl-x"><b>' + esc(t(e.title)) + "</b>" + (e.text ? "<span>" + esc(t(e.text)) + "</span>" : "") + "</div></div>";
    }).join("");
    var places = (C.events || []).map(function (e) {
      var nav = e.map ? '<a class="pill rv" href="' + esc(e.map) + '" target="_blank" rel="noopener">' + esc(P.x("how")) + "</a>" : "";
      return '<div class="pl">' + (e.img ? '<div class="pl-i rv"><img src="' + esc(e.img) + '" alt="" loading="lazy"></div>' : "") +
        '<div class="pl-t rv">' + esc(e.time) + " · " + esc(t(e.title)) + '</div><div class="pl-n rv">' + esc(t(e.place) || "") + '</div><div class="pl-a rv">' + esc(t(e.address) || "") + "</div>" + nav + "</div>";
    }).join("");
    return '<section class="hero"><div class="bar"><span>' + esc(n[0] || "") + '</span><i>&#9829;</i><span>' + esc(n[1] || "") + "</span></div>" +
      '<div class="ph"' + (C.photo ? ' style="background-image:url(\'' + esc(C.photo) + '\')"' : "") + '><h1 class="ttl rv">' + esc(P.x("day")).replace(" ", "<br>") + "</h1></div>" +
      '<svg class="drape" viewBox="0 0 400 70" preserveAspectRatio="none" aria-hidden="true"><path d="M0 0H400V12C330 12 260 70 200 70C140 70 70 12 0 12Z"/></svg>' +
      '<div class="hseal rv">' + seal() + "</div></section>" +
      P.sec("wine dear", '<h2 class="cap rv">' + esc(P.x("dear")) + '</h2><p class="p rv">' + P.text() + "</p>" + paper()) +
      P.sec("white cal-s", '<h2 class="cap2 rv">' + esc(P.x("date")) + "</h2>" + P.month("", CIRC)) +
      P.sec("wine tl", '<h2 class="big rv">' + esc(P.x("plan")) + '</h2><div class="tl">' + plan + "</div>" + glass()) +
      P.sec("white where", '<h2 class="big ink rv">' + esc(P.x("where")) + "</h2>" + places) +
      P.sec("wine cd-s", '<div class="caps rv">' + esc(P.x("left")) + "</div>" + P.cd("")) +
      K.gallery("cap2", "white") +
      (C.dresscode ? P.sec("white", P.dress("cap2")) : "") +
      (C.rsvp ? P.sec("wine rsv", P.rsvp("cap")) : "") +
      P.sec("fin wine", '<div class="fseal rv">' + seal() + '</div><div class="caps rv">' + esc(P.x("fin")) + '</div><div class="fnm rv">' + esc(n.join(" & ")) + "</div>") + P.made();
  }
  P.run({ env: env, main: main, steps: [[0, "s1"], [600, "s2"], [1400, "s3"], [2400, "s4"]], done: 2500 });
})();
