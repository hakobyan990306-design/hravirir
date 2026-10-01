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
  function env() { var n = K.names(); return P.wenv({ letter: (n[0] || "").charAt(0), hint: P.x("hint"), top: esc(n.join(" & ")) }); }
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
  P.run({ env: env, main: main, steps: P.wenvSteps, done: P.wenvDone });
})();
