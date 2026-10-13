/* «Էլեգանս» — սպիտակ էջ, օվալաձև սև-սպիտակ լուսանկարներ, մեծ բարակ անուններ մոխրագույն գեղագիր «&»-ով, իրար տակ մեծ ամսաթիվ. բացումը՝ սպիտակ դաջված ծրար */
(function () {
  "use strict";
  var K = window.K, C = K.C, esc = K.esc, t = K.t, u = K.u, P = window.P;
  P.texts({
    hy: { hint: "Սեղմեք կնիքին", inv1: "Հրավիրում են Ձեզ", inv2: "հարսանյաց հանդեսի", happy: "Մենք երջանիկ ենք", happyT: "կիսելու Ձեզ հետ մեր կյանքի ամենագեղեցիկ օրերից մեկի ուրախությունը։", happyS: "Սիրով սպասում ենք",
      until: "Մինչև հարսանիքը", untilT: "մնացել է շատ քիչ", untilS: "ժամանակ", where: "Որտե՞ղ", at: "ժամը", open: "Բացել քարտեզը" },
    ru: { hint: "Нажмите на печать", inv1: "Приглашают вас", inv2: "на свадебное торжество", happy: "Мы счастливы", happyT: "разделить с вами радость одного из самых красивых дней нашей жизни.", happyS: "С любовью ждём",
      until: "До свадьбы", untilT: "осталось совсем немного", untilS: "времени", where: "Где пройдёт?", at: "в", open: "Открыть карту" },
    en: { hint: "Tap the seal", inv1: "Invite you", inv2: "to their wedding", happy: "We are happy", happyT: "to share with you the joy of one of the most beautiful days of our lives.", happyS: "With love",
      until: "Until the wedding", untilT: "there is very little", untilS: "time left", where: "Where?", at: "at", open: "Open map" }
  });
  function oval(src, cls) { return src ? '<div class="ov ' + (cls || "") + ' rv"><img src="' + esc(src) + '" alt="" loading="lazy"></div>' : ""; }
  // դասական սպիտակ ծրար՝ էվկալիպտի դաջվածքով և արծաթափայլ կնիքով. կափարիչը բացվում է, բացիկը դուրս է գալիս
  function euc(x, y, s, r) {
    var p = '<g transform="translate(' + x + " " + y + ") rotate(" + r + ") scale(" + s + ')"><path class="st" d="M0 0C6 -14 10 -30 8 -50"/>';
    for (var i = 0; i < 6; i++) { var yy = -6 - i * 8, sd = i % 2 ? 1 : -1; p += '<ellipse cx="' + (sd * 6 + i * .3).toFixed(1) + '" cy="' + yy + '" rx="5.2" ry="3.6" transform="rotate(' + (sd * 25) + " " + (sd * 6) + " " + yy + ')"/>'; }
    return p + "</g>";
  }
  function env() {
    var n = K.names(), L = [(n[0] || "").charAt(0), (n[1] || "").charAt(0)];
    var art = '<svg class="ce-art" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><filter id="ceE"><feDropShadow dx=".25" dy=".35" stdDeviation=".2" flood-color="#6b6b6b" flood-opacity=".25"/><feDropShadow dx="-.2" dy="-.2" stdDeviation=".15" flood-color="#fff" flood-opacity="1"/></filter></defs>' +
      '<g filter="url(#ceE)" fill="#f5f4f1" stroke="#e4e2dd" stroke-width=".2">' + euc(8, 98, .9, 20) + euc(20, 100, .7, -10) + euc(92, 96, .9, -25) + euc(80, 100, .7, 8) + euc(4, 40, .6, 60) + euc(96, 44, .6, -60) + "</g></svg>";
    var seal = '<svg class="ce-seal" viewBox="0 0 120 120" aria-hidden="true"><defs><radialGradient id="ceG" cx=".35" cy=".3" r=".85"><stop offset="0" stop-color="#ffffff"/><stop offset=".45" stop-color="#dcdcdc"/><stop offset=".8" stop-color="#a9a9a9"/><stop offset="1" stop-color="#8c8c8c"/></radialGradient></defs>' +
      '<path d="M60 6C72 8 82 5 91 15C102 22 111 33 110 47C115 59 110 73 104 83C99 96 87 104 75 109C62 114 49 113 37 109C24 104 14 95 9 82C3 69 6 54 9 42C14 28 23 17 36 11C44 7 52 5 60 6Z" fill="url(#ceG)" filter="drop-shadow(0 1px 2px rgba(0,0,0,.12))"/>' +
      '<circle cx="60" cy="60" r="37" fill="none" stroke="#8a8a8a" stroke-opacity=".55"/><circle cx="60" cy="60" r="32" fill="none" stroke="#8a8a8a" stroke-opacity=".45" stroke-dasharray="1 2.4"/>' +
      '<text x="60" y="70" text-anchor="middle" font-size="31" fill="#5c5c5c" style="font-family:var(--script)">' + esc(L[0]) + '<tspan font-size="17" dx="1" dy="-3">&amp;</tspan><tspan dx="1" dy="3">' + esc(L[1]) + "</tspan></text></svg>";
    return '<div class="env cenv" id="env" role="button" aria-label="' + esc(P.x("hint")) + '"><div class="ce-top"><span>' + esc(n[0] || "") + '</span><i>&amp;</i><span>' + esc(n[1] || "") + '</span></div><div class="ce-box"><div class="ce-back"></div>' +
      '<div class="ce-card"><div class="ce-k">' + esc(P.x("inv1")) + '</div><div class="ce-n">' + esc(n[0] || "") + '<i>&amp;</i>' + esc(n[1] || "") + '</div><div class="ce-d">' + P.dots(" · ") + "</div></div>" +
      '<div class="ce-pocket">' + art + '</div><div class="ce-flap"></div><div class="ce-sw">' + seal + "</div></div>" + (K.PREVIEW ? "" : '<div class="hint">' + esc(P.x("hint")) + "</div>") + "</div>";
  }
  function main() {
    var n = K.names(), d = K.date, g = C.gallery || [];
    var yy = String(d.getFullYear()).slice(2);
    var places = (C.events || []).map(function (e, i) {
      return '<div class="pl">' + (e.img ? '<div class="circ rv"><img src="' + esc(e.img) + '" alt="" loading="lazy"></div>' : "") +
        '<div class="plt rv">' + esc(t(e.title)) + '</div><div class="pln rv">' + esc(t(e.place) || "") + "<br>" + esc(t(e.address)) + '</div><div class="scr rv">' + esc(P.x("at")) + " " + esc(e.time) + "</div>" +
        (e.map ? '<a class="pill rv" href="' + esc(e.map) + '" target="_blank" rel="noopener">' + esc(P.x("open")) + "</a>" : "") + "</div>";
    }).join("");
    return '<section class="hero">' + oval(C.photo, "big") +
      '<h1 class="nm rv d1"><span class="n1">' + esc(n[0] || "") + '</span><span class="amp">&amp;</span><span class="n2">' + esc(n[1] || "") + "</span></h1>" +
      '<div class="inv rv">' + esc(P.x("inv1")) + '</div><div class="scr rv">' + esc(P.x("inv2")) + "</div>" +
      '<div class="bigd rv"><b>' + P.d2(d.getDate()) + "</b><b>" + P.d2(d.getMonth() + 1) + "</b><b>" + yy + "</b></div></section>" +
      P.sec("happy", '<h2 class="cap rv">' + esc(P.x("happy")) + '</h2><p class="p rv">' + esc(P.x("happyT")) + "</p>" + (C.text ? '<p class="p rv">' + P.text() + "</p>" : "") + '<div class="scr rv">' + esc(P.x("happyS")) + "</div>") +
      '<section class="o2">' + oval(g[0], "") + "</section>" +
      P.sec("until", '<h2 class="cap rv">' + esc(P.x("until")) + '</h2><div class="sub rv">' + esc(P.x("untilT")) + '</div><div class="scr rv">' + esc(P.x("untilS")) + "</div>" +
        '<div class="tcd rv" data-cd><span><b data-k="days">00</b><i>' + esc(u("days")) + '</i></span><em>:</em><span><b data-k="hours">00</b><i>' + esc(u("hours")) + '</i></span><em>:</em><span><b data-k="minutes">00</b><i>' + esc(u("minutes")) + '</i></span><em>:</em><span class="sec"><b data-k="seconds">00</b><i>' + esc(u("seconds")) + "</i></span></div>" + P.month("", "")) +
      P.sec("where", '<h2 class="cap rv">' + esc(P.x("where")) + "</h2>" + places) +
      K.gallery("cap", "") +
      P.sec("", P.dress("cap")) +
      P.sec("rsv", P.rsvp("cap")) +
      P.sec("fin", '<div class="scr rv">' + esc(P.x("fin")) + '</div><div class="fnm rv">' + esc(n.join(" & ")) + "</div>") + P.made();
  }
  P.run({ env: env, main: main, steps: [[0, "s1"], [450, "s2"], [1300, "s3"], [2500, "s4"]], done: 3100 });
})();
