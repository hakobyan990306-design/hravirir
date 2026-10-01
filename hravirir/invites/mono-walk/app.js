/* «Մոնոխրոմ քայլ» — սև էկրանին բարակ գիծ է, սեղմելիս կինոկադրի պես սև շերտերը բացվում են վեր ու վար, տակից՝ սև-սպիտակ լուսանկար */
(function () {
  "use strict";
  var K = window.K, C = K.C, esc = K.esc, t = K.t, u = K.u, P = window.P;
  P.texts({
    hy: { hint: "Սեղմեք էկրանին" },
    ru: { hint: "Нажмите на экран" },
    en: { hint: "Tap the screen" }
  });
  function env() {
    var n = K.names();
    return '<div class="env" id="env" role="button" aria-label="' + esc(P.x("hint")) + '"><div class="bar t"></div><div class="bar b"></div>' +
      '<div class="mid"><div class="caps">' + esc(P.x("invite")) + '</div><i class="ln"></i><div class="en">' + esc(n[0] || "") + " · " + esc(n[1] || "") + "</div></div>" +
      (K.PREVIEW ? "" : '<div class="hint">' + esc(P.x("hint")) + "</div>") + "</div>";
  }
  function main() {
    var n = K.names();
    return '<div class="bgfix"' + (C.photo ? ' style="background-image:url(\'' + esc(C.photo) + '\')"' : "") + "></div>" +
      '<section class="hero"><div class="caps rv">' + esc(P.x("invite")) + '</div><div class="nmw rv d1"><span class="ghost">&amp;</span><h1 class="nm"><span class="n1">' + esc(n[0] || "") + '</span><span class="amp">&amp;</span><span class="n2">' + esc(n[1] || "") + "</span></h1></div>" +
      '<i class="hl rv d2"></i><div class="dt rv d2">' + P.dots(".") + "</div></section>" +
      P.sec("tx", '<h2 class="h2 rv">' + esc(P.x("dear")) + '</h2><p class="p rv">' + P.text() + "</p>" + P.month("", "")) +
      P.sec("pg", '<h2 class="h2 rv">' + esc(P.x("program")) + "</h2>" + P.program("cards", false)) +
      K.gallery("h2", "bw") +
      P.sec("", P.dress()) +
      P.sec("", P.rsvp()) +
      P.sec("cds", P.cd() + '<div class="caps rv">' + esc(P.x("left")) + "</div>") +
      P.sec("fin", '<div class="caps rv">' + esc(P.x("fin")) + '</div><div class="fnm rv">' + esc(n.join(" & ")) + "</div>") + P.made();
  }
  P.run({ env: env, main: main, steps: [[0, "s1"], [700, "s2"], [1700, "s3"]], done: 2300 });
})();
