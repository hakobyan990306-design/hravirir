/* «Ձիթենու կնիք» — կտավե ծրար ոսկե կնիքով. կնիքը բարձրանում է, կափարիչը բացվում է, ներսից դուրս է գալիս «Save the Date» լուսանկարը */
(function () {
  "use strict";
  var K = window.K, C = K.C, esc = K.esc, t = K.t, u = K.u, P = window.P;
  P.texts({
    hy: { hint: "Սեղմեք կնիքին", ghost: "ԾՐԱԳԻՐ" },
    ru: { hint: "Нажмите на печать", ghost: "ПРОГРАММА" },
    en: { hint: "Tap the seal", ghost: "PROGRAM" }
  });
  function olive(w, flip) {
    var s = '<svg class="olv" viewBox="0 0 160 60" width="' + w + '" aria-hidden="true"' + (flip ? ' style="transform:scaleX(-1)"' : "") + '><path d="M6 46C46 40 92 30 154 12" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>';
    [[24, 42, -30], [40, 38, 32], [56, 35, -34], [72, 31, 28], [88, 27, -36], [104, 23, 30], [120, 19, -38], [136, 15, 26]].forEach(function (l, i) {
      s += '<ellipse cx="' + l[0] + '" cy="' + (l[1] + (i % 2 ? -7 : 7)) + '" rx="9" ry="3.3" transform="rotate(' + l[2] + " " + l[0] + " " + (l[1] + (i % 2 ? -7 : 7)) + ')" fill="currentColor" opacity="' + (i % 2 ? .75 : .55) + '"/>';
    });
    return s + '<circle cx="66" cy="42" r="3.6" fill="currentColor" opacity=".8"/><circle cx="112" cy="30" r="3.2" fill="currentColor" opacity=".8"/></svg>';
  }
  function seal() {
    var b = "";
    for (var i = 0; i < 26; i++) { var a = i / 26 * Math.PI * 2, r = 46 + (i % 3 ? 2.5 : -1.5) + (i % 5 ? 0 : 2); b += (i ? "L" : "M") + (60 + Math.cos(a) * r).toFixed(1) + " " + (60 + Math.sin(a) * r).toFixed(1); }
    return '<svg class="seal" viewBox="0 0 120 120" aria-hidden="true"><defs><radialGradient id="sg" cx=".38" cy=".32" r=".8"><stop offset="0" stop-color="#f3d79a"/><stop offset=".45" stop-color="#c9a15a"/><stop offset="1" stop-color="#8a6630"/></radialGradient>' +
      '<radialGradient id="si" cx=".6" cy=".65" r=".7"><stop offset="0" stop-color="#b48a45"/><stop offset="1" stop-color="#e4c584"/></radialGradient></defs>' +
      '<path d="' + b + 'Z" fill="url(#sg)" filter="drop-shadow(0 1px 2px rgba(0,0,0,.12))"/><circle cx="60" cy="60" r="34" fill="url(#si)"/><circle cx="60" cy="60" r="34" fill="none" stroke="#7d5a26" stroke-opacity=".45"/>' +
      '<g transform="translate(60 60) rotate(-58) scale(.42) translate(-80 -30)" style="color:#7a5523">' + olive(160).replace(/<\/?svg[^>]*>/g, "") + "</g></svg>";
  }
  function env() {
    var n = K.names();
    return '<div class="env" id="env" role="button" aria-label="' + esc(P.x("hint")) + '"><div class="back"></div><div class="card"></div><div class="pocket"></div><div class="flap"></div>' +
      '<div class="enm"><span class="a">' + esc(n[0] || "") + '</span><span class="b">' + esc(n[1] || "") + '</span></div><div class="sealw">' + seal() + "</div>" +
      (K.PREVIEW ? "" : '<div class="hint">' + esc(P.x("hint")) + "</div>") + "</div>";
  }
  function hero() {
    var d = K.date;
    return '<section class="hero">' + (C.photo ? '<div class="ph" style="background-image:url(\'' + esc(C.photo) + '\')"></div>' : "") +
      '<div class="sv rv">' + esc(P.x("save")) + "</div>" + P.names("rv d1") +
      '<div class="dl rv d2"><b>' + P.d2(d.getDate()) + "</b><i></i><b>" + P.d2(d.getMonth() + 1) + "</b><i></i><b>" + String(d.getFullYear()).slice(2) + "</b></div>" +
      '<div class="fl2 rv d3">' + olive(120) + olive(120, true) + "</div></section>";
  }
  function circ() { return '<svg class="hand" viewBox="0 0 50 44"><path d="M27 4C13 2 3 12 5 24C7 37 22 42 34 38C46 33 48 18 40 10C34 4 22 3 14 8" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" pathLength="1"/></svg>'; }
  function main() {
    return hero() +
      P.sec("txt", '<div class="caps rv">' + esc(P.x("dear")) + '</div><p class="p big rv">' + P.text() + "</p>" + '<div class="round rv">' + P.month("", circ()).replace(" rv", "") + "</div>") +
      P.sec("prog", '<div class="ghost" aria-hidden="true">' + esc(P.x("ghost")) + '</div><h2 class="h2 rv">' + esc(P.x("program")) + "</h2>" + P.program("list")) +
      K.gallery("h2", "") +
      P.sec("cdsec", '<div class="caps rv">' + esc(P.x("left")) + "</div>" + P.cd()) +
      P.sec("", P.dress()) +
      P.sec("rsv", P.rsvp()) +
      P.sec("fin", '<div class="sealf rv">' + seal() + '</div><div class="caps rv">' + esc(P.x("fin")) + '</div><div class="fnm rv">' + esc(K.names().join(" & ")) + "</div>") + P.made();
  }
  P.run({ env: env, main: main, steps: [[0, "s1"], [450, "s2"], [1350, "s3"]], done: 2100 });
})();
