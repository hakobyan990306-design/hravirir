/* «Տերրա» — շագանակագույն կարված քարտ՝ կապված թելով և չոր ծաղկով. թելը արձակվում է, քարտը շրջվում է, տակից՝ լուսանկարը */
(function () {
  "use strict";
  var K = window.K, C = K.C, esc = K.esc, t = K.t, u = K.u, P = window.P;
  P.texts({
    hy: { hint: "Սեղմեք՝ թելը արձակելու համար", top: "Դուք հրավիրված եք", fin: "Մինչ հանդիպում" },
    ru: { hint: "Нажмите, чтобы развязать", top: "Вы приглашены", fin: "До встречи" },
    en: { hint: "Tap to untie", top: "You are invited", fin: "See you soon" }
  });
  // չոր պամպաս՝ փափուկ փետուրներով
  function pampas(w) {
    var s = '<svg class="pmp" viewBox="0 0 80 160" width="' + w + '" aria-hidden="true"><g stroke-linecap="round" fill="none">';
    [[40, 150, 30, 20, "#e9d9bf"], [40, 150, 52, 30, "#d8c29e"], [40, 150, 18, 46, "#cdb38a"]].forEach(function (p) {
      s += '<path d="M' + p[0] + " " + p[1] + "Q" + (p[0] + (p[2] - p[0]) * .3) + " " + (p[1] - 60) + " " + p[2] + " " + p[3] + '" stroke="#a88a62" stroke-width="1.2"/>';
      for (var i = 0; i < 16; i++) { var k = i / 16, x = p[0] + (p[2] - p[0]) * k * k, y = p[1] - (p[1] - p[3]) * k; s += '<path d="M' + x.toFixed(1) + " " + y.toFixed(1) + "q" + (i % 2 ? 9 : -9) + " -6 " + (i % 2 ? 4 : -4) + ' -16" stroke="' + p[4] + '" stroke-width="2.2" opacity=".85"/>'; }
    });
    return s + "</g></svg>";
  }
  function env() {
    var n = K.names();
    return '<div class="env" id="env" role="button" aria-label="' + esc(P.x("hint")) + '"><div class="flip"><div class="fr"><div class="st"></div><div class="caps">' + esc(P.x("top")) + "</div>" +
      '<div class="en">' + esc(n[0] || "") + '<i>&amp;</i>' + esc(n[1] || "") + '</div><div class="ed">' + P.dots(".") + "</div>" +
      '<div class="tw v"></div><div class="tw h"></div><div class="pw">' + pampas(70) + '</div><svg class="knot" viewBox="0 0 80 50"><path d="M40 25C24 6 6 12 14 24C20 34 34 28 40 25C46 22 60 16 66 26C74 38 56 44 40 25Z" fill="none" stroke="#e7d6b6" stroke-width="2.6"/><path d="M40 25L30 48M40 25L52 48" stroke="#e7d6b6" stroke-width="2.4" stroke-linecap="round"/></svg></div>' +
      '<div class="bk"' + (C.photo ? ' style="background-image:url(\'' + esc(C.photo) + '\')"' : "") + "></div></div>" + (K.PREVIEW ? "" : '<div class="hint">' + esc(P.x("hint")) + "</div>") + "</div>";
  }
  function main() {
    var n = K.names();
    return '<section class="hero"' + (C.photo ? ' style="--ph:url(\'' + esc(C.photo) + '\')"' : "") + '><div class="hc"><h1 class="nm rv"><span class="n1">' + esc(n[0] || "") + '</span><span class="amp">և</span><span class="n2">' + esc(n[1] || "") + "</span></h1>" +
      '<div class="dt rv d1">' + P.dots(".") + '</div></div><div class="dn rv d2"><i></i></div></section>' +
      P.sec("sand", '<div class="pmw rv">' + pampas(54) + '</div><h2 class="h2 rv">' + esc(P.x("dear")) + '</h2><p class="p rv">' + P.text() + "</p>" + '<div class="calc rv">' + P.month("", "").replace(" rv", "") + "</div>") +
      P.sec("", '<h2 class="h2 rv">' + esc(P.x("program")) + "</h2>" + P.program("line")) +
      K.gallery("h2", "sand") +
      P.sec("choc", '<div class="caps rv">' + esc(P.x("left")) + "</div>" + P.cd("tiles")) +
      P.sec("", P.dress()) +
      P.sec("sand", P.rsvp()) +
      P.sec("fin choc", '<div class="fnm rv">' + esc(P.x("fin")) + '</div><div class="caps rv">' + esc(n.join(" & ")) + "</div>") + P.made();
  }
  P.run({ env: env, main: main, steps: [[0, "s1"], [800, "s2"], [2000, "s3"]], done: 2600 });
})();
