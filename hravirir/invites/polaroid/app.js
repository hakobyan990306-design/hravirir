/* «Պոլարոիդ» — կրաֆտ ծրար սրտիկ-կպչուկով. սրտիկը պոկվում է, կափարիչը բացվում է, ներսից դուրս է թռչում պոլարոիդ լուսանկարը */
(function () {
  "use strict";
  var K = window.K, C = K.C, esc = K.esc, t = K.t, u = K.u, P = window.P;
  P.texts({
    hy: { hint: "Սեղմեք սրտիկին" },
    ru: { hint: "Нажмите на сердечко" },
    en: { hint: "Tap the heart" }
  });
  var heart = '<svg viewBox="0 0 60 54" aria-hidden="true"><path d="M30 52C12 38 2 28 2 16C2 7 9 2 16 2C22 2 27 6 30 11C33 6 38 2 44 2C51 2 58 7 58 16C58 28 48 38 30 52Z" fill="#e4a6a0"/><path d="M14 10C10 12 9 16 10 20" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round" opacity=".7"/></svg>';
  function pol(src, cap, cls) {
    return '<figure class="pol ' + (cls || "") + '"><div class="im" style="background-image:url(\'' + esc(src) + '\')"></div><figcaption>' + cap + "</figcaption></figure>";
  }
  function env() {
    return '<div class="env" id="env" role="button" aria-label="' + esc(P.x("hint")) + '"><div class="back"></div>' +
      (C.photo ? pol(C.photo, esc(P.dots(" · ")), "out") : "") + '<div class="front"></div><div class="flap"></div><div class="hrt">' + heart + "</div>" +
      '<div class="to">' + esc(P.x("invite")) + "</div>" + (K.PREVIEW ? "" : '<div class="hint">' + esc(P.x("hint")) + "</div>") + "</div>";
  }
  function circ() { return '<svg class="hand" viewBox="0 0 50 44"><path d="M27 4C13 2 3 12 5 24C7 37 22 42 34 38C46 33 48 18 40 10C34 4 22 3 14 8" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" pathLength="1"/></svg>'; }
  function main() {
    var n = K.names(), d = K.date;
    return '<section class="hero"><h1 class="nm rv"><span class="n1">' + esc(n[0] || "") + '</span><span class="amp">&amp;</span><span class="n2">' + esc(n[1] || "") + "</span></h1>" +
      (C.photo ? pol(C.photo, esc(P.dots(" · ")), "p1 rv d1") : "") + "</section>" +
      P.sec("txt", '<div class="caps rv">' + esc(P.x("dear")) + '</div><p class="p rv">' + P.text() + "</p>" + P.week("").replace('<b>' + d.getDate() + "</b>", "<b>" + d.getDate() + circ() + "</b>")) +
      (C.photo2 ? '<section class="mid">' + pol(C.photo2, "♥", "p2 rv") + "</section>" : "") +
      P.sec("prog", '<h2 class="h2 rv">' + esc(P.x("program")) + '</h2><i class="vl rv"></i>' + P.program("cards", "stamp-c")) +
      K.gallery("h2", "polgal") +
      P.sec("cds", '<div class="caps rv">' + esc(P.x("left")) + "</div>" + P.cd()) +
      P.sec("", P.dress()) +
      P.sec("rsv", P.rsvp()) +
      P.sec("fin", '<div class="fh rv">' + heart + '</div><div class="caps rv">' + esc(P.x("fin")) + '</div><div class="fnm rv">' + esc(n.join(" & ")) + "</div>") + P.made();
  }
  P.run({ env: env, main: main, steps: [[0, "s1"], [380, "s2"], [1100, "s3"], [2300, "s4"]], done: 2900 });
})();
