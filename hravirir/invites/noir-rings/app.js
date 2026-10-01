/* «Սև և ոսկի» — թավշյա վարագույրը բացվում է, ներքևում մուգ լուսանկար է, որի վրա սահում են բաժինները, ոսկե մատանիները «գծվում» են */
(function () {
  "use strict";
  var K = window.K, C = K.C, esc = K.esc, t = K.t, u = K.u, P = window.P;
  P.texts({
    hy: { hint: "Սեղմեք՝ վարագույրը բացելու համար", day: "Հարսանյաց օր" },
    ru: { hint: "Нажмите, чтобы открыть занавес", day: "День свадьбы" },
    en: { hint: "Tap to open the curtain", day: "Wedding day" }
  });
  function rings(cls) {
    var id = (cls || "").replace(/\W/g, "");
    return '<svg class="rings ' + (cls || "") + '" viewBox="0 0 160 110" aria-hidden="true"><defs><linearGradient id="rg' + id + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f3dfaa"/><stop offset=".5" stop-color="#c9a15a"/><stop offset="1" stop-color="#8d6a2e"/></linearGradient></defs>' +
      '<g fill="none" stroke="url(#rg' + id + ')" stroke-linecap="round"><circle cx="62" cy="62" r="34" stroke-width="3.2" pathLength="1"/><circle cx="62" cy="62" r="29" stroke-width="1" opacity=".6" pathLength="1"/>' +
      '<circle cx="100" cy="62" r="34" stroke-width="3.2" pathLength="1"/><circle cx="100" cy="62" r="29" stroke-width="1" opacity=".6" pathLength="1"/>' +
      '<path d="M90 30L100 18L110 30L100 36Z" stroke-width="1.6" pathLength="1"/><path d="M90 30H110M100 18V36" stroke-width=".8" opacity=".7" pathLength="1"/>' +
      '<path d="M22 96C40 84 50 98 70 90M92 90C112 98 122 84 140 96" stroke-width="1" opacity=".55" pathLength="1"/></g></svg>';
  }
  function env() {
    var n = K.names();
    return '<div class="env" id="env" role="button" aria-label="' + esc(P.x("hint")) + '"><div class="cur l"></div><div class="cur r"></div>' +
      '<div class="ec"><div class="caps">' + esc(P.x("day")) + '</div><div class="en1">' + esc(n[0] || "") + '</div><div class="en2">' + esc(n[1] || "") + "</div>" + rings("e") +
      '<div class="pl"><i></i></div></div>' + (K.PREVIEW ? "" : '<div class="hint">' + esc(P.x("hint")) + "</div>") + "</div>";
  }
  function hero() {
    var n = K.names(), d = K.date;
    return '<section class="hero"><div class="caps rv">' + esc(P.x("day")) + '</div><div class="nmw rv d1"><div class="big">&amp;</div><h1 class="nm"><span class="n1">' + esc(n[0] || "") + '</span><span class="n2">' + esc(n[1] || "") + "</span></h1></div>" +
      '<div class="dt rv d2">' + P.dots(" | ") + '</div><div class="scroll rv d3"><i></i></div></section>';
  }
  function main() {
    return '<div class="bgfix"' + (C.photo ? ' style="background-image:url(\'' + esc(C.photo) + '\')"' : "") + "></div>" + hero() +
      P.sec("glass", '<h2 class="h2 rv">' + esc(P.x("invite")) + '</h2><div class="caps rv">' + esc(P.x("dear")) + '</div><p class="p rv">' + P.text() + "</p>" + rings("h rv")) +
      P.sec("glass", '<h2 class="h2 rv">' + esc(P.x("program")) + "</h2>" + P.program("cards", "line-a")) +
      K.gallery("h2", "glass") +
      P.sec("glass", '<div class="caps rv">' + esc(P.x("left")) + "</div>" + P.cd() + P.month("", "")) +
      P.sec("glass", P.dress()) +
      P.sec("glass", P.rsvp()) +
      P.sec("fin", rings("f rv") + '<div class="caps rv">' + esc(P.x("fin")) + '</div><div class="fnm rv">' + esc(K.names().join(" & ")) + "</div>") + P.made();
  }
  P.run({ env: env, main: main, steps: [[0, "s1"], [1500, "s2"]], done: 2100 });
})();
