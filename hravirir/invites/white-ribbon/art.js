/* «Ժապավեն» (կնունք) դիզայնի գրաֆիկան՝ SVG. ատլասե հանգույց, ջրաներկ ամպեր, խաչ, գիպսոֆիլա (մանր սպիտակ ծաղիկներ) */
(function () {
  "use strict";
  function f(v) { return Math.round(v * 10) / 10; }
  var seed = 11;
  function r() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }

  // ատլասե հանգույց՝ երկու օղակ, երկու ծայր, կենտրոնական կապ
  function bow() {
    return '<svg viewBox="0 0 160 120" aria-hidden="true"><defs>' +
      '<linearGradient id="rb" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#dbe8f4"/><stop offset=".35" stop-color="#9dbad6"/><stop offset=".6" stop-color="#c7dbee"/><stop offset="1" stop-color="#7d9fc2"/></linearGradient>' +
      '<linearGradient id="rb2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b5cde4"/><stop offset="1" stop-color="#7896b8"/></linearGradient></defs>' +
      '<path d="M74 58C58 44 18 26 12 42c-6 16 26 30 60 22z" fill="url(#rb)"/><path d="M86 58c16-14 56-32 62-16 6 16-26 30-60 22z" fill="url(#rb)"/>' +
      '<path d="M72 60c-10 14-24 38-30 52l12-4 6 10c6-16 14-38 18-54z" fill="url(#rb2)"/><path d="M88 60c10 14 24 38 30 52l-12-4-6 10c-6-16-14-38-18-54z" fill="url(#rb2)"/>' +
      '<path d="M30 40c10 2 26 10 38 18M130 40c-10 2-26 10-38 18" stroke="#fff" stroke-width="1.4" opacity=".55" fill="none"/>' +
      '<rect x="68" y="50" width="24" height="20" rx="8" fill="url(#rb)"/><path d="M72 54c4-2 12-2 16 0" stroke="#fff" stroke-width="1.2" opacity=".6" fill="none"/></svg>';
  }
  // ջրաներկ ամպ՝ մի քանի կիսաթափանց շրջան
  function cloud(w) {
    var c = "";
    for (var i = 0; i < 9; i++) c += '<ellipse cx="' + f(30 + i * 18 + r() * 8) + '" cy="' + f(60 - Math.sin(i / 8 * Math.PI) * 26 + r() * 8) + '" rx="' + f(26 + r() * 14) + '" ry="' + f(18 + r() * 10) + '" fill="#fff" opacity=".85"/>';
    return '<svg viewBox="0 0 210 100" aria-hidden="true" style="width:' + (w || 100) + '%"><defs><filter id="cb"><feGaussianBlur stdDeviation="3"/></filter></defs>' +
      '<g filter="url(#cb)"><ellipse cx="105" cy="70" rx="95" ry="22" fill="#d8e6f2" opacity=".7"/>' + c + "</g></svg>";
  }
  function cross() {
    return '<svg viewBox="0 0 40 56" aria-hidden="true"><defs><linearGradient id="cg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e9eef4"/><stop offset=".5" stop-color="#9fb2c6"/><stop offset="1" stop-color="#dfe7ef"/></linearGradient></defs>' +
      '<path d="M17 2h6v14h14v6H23v32h-6V22H3v-6h14z" fill="url(#cg)" stroke="#8aa0b7" stroke-width=".8"/></svg>';
  }
  // գիպսոֆիլայի ճյուղ
  function gyps(len) {
    var p = '<path d="M10 90Q' + len / 2 + " 60 " + len + ' 20" fill="none" stroke="#9fae9c" stroke-width="1.2"/>';
    for (var i = 0; i < 14; i++) { var t = .25 + i / 18, x = 10 + (len - 10) * t, y = 90 - 70 * t + Math.sin(t * 3) * 8;
      var bx = x + (r() - .5) * 26, by = y - 8 - r() * 16; p += '<path d="M' + f(x) + " " + f(y) + "L" + f(bx) + " " + f(by) + '" stroke="#b3bfae" stroke-width=".7"/>';
      for (var k = 0; k < 3; k++) p += '<circle cx="' + f(bx + (r() - .5) * 8) + '" cy="' + f(by + (r() - .5) * 8) + '" r="' + f(1.8 + r()) + '" fill="#fff" stroke="#d6dde6" stroke-width=".5"/>'; }
    return '<svg viewBox="0 0 ' + (len + 20) + ' 100" aria-hidden="true">' + p + "</svg>";
  }
  window.WRArt = { bow: bow, cloud: cloud, cross: cross, gyps: gyps };
})();
