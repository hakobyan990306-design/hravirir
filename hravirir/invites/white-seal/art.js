/* «Սպիտակ ծրար» դիզայնի գրաֆիկան՝ SVG. մոմե կնիք, նշենու/էվկալիպտի ճյուղ, ծրարի մասեր */
(function () {
  "use strict";
  function f(v) { return Math.round(v * 10) / 10; }
  var seed = 3;
  function r() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }

  // մոմե կնիք՝ անհավասար եզրով, սկզբնատառերով
  function seal(ini) {
    var pts = [], n = 28;
    for (var i = 0; i < n; i++) { var a = i / n * Math.PI * 2, rr = 46 + (i % 2 ? 3.5 : -1) + (r() - .5) * 3; pts.push(f(50 + Math.cos(a) * rr) + "," + f(50 + Math.sin(a) * rr)); }
    return '<svg viewBox="0 0 100 100" aria-hidden="true"><defs><radialGradient id="wx" cx=".38" cy=".32" r=".75"><stop offset="0" stop-color="#b3bca0"/><stop offset=".55" stop-color="#86936f"/><stop offset="1" stop-color="#5f6b4c"/></radialGradient></defs>' +
      '<polygon points="' + pts.join(" ") + '" fill="url(#wx)"/>' +
      '<circle cx="50" cy="50" r="33" fill="none" stroke="#5f6b4c" stroke-width="2.4" opacity=".55"/><circle cx="50" cy="50" r="33" fill="none" stroke="#c9d0b8" stroke-width=".8" opacity=".6" transform="translate(-.8 -.8)"/>' +
      '<text x="50" y="58" text-anchor="middle" font-family="GHEA Mariam, serif" font-size="22" letter-spacing="1" fill="#4f5a3e" opacity=".85">' + ini + "</text>" +
      '<text x="50" y="57.2" text-anchor="middle" font-family="GHEA Mariam, serif" font-size="22" letter-spacing="1" fill="#d4dac4" opacity=".35">' + ini + "</text>" +
      '<ellipse cx="36" cy="30" rx="12" ry="6" fill="#fff" opacity=".18" transform="rotate(-30 36 30)"/></svg>';
  }

  // ճյուղ՝ կոր ցողուն + զույգ տերևներ (ջրաներկի պես կիսաթափանց)
  function sprig(len, bend, cls) {
    var s = "", leaves = "", n = 9;
    for (var i = 0; i <= n; i++) {
      var t = i / n, x = 10 + t * len, y = 60 - Math.sin(t * Math.PI) * bend, ang = -Math.cos(t * Math.PI) * bend * .9;
      var sz = 1 - t * .45, col = ["#9aa88a", "#8a9a79", "#a7b49a", "#7f8f6e"][i % 4];
      if (i) {
        leaves += '<ellipse cx="' + f(x) + '" cy="' + f(y - 9 * sz) + '" rx="' + f(5 * sz) + '" ry="' + f(10 * sz) + '" transform="rotate(' + f(ang - 38) + " " + f(x) + " " + f(y) + ')" fill="' + col + '" opacity=".78"/>' +
          '<ellipse cx="' + f(x) + '" cy="' + f(y + 9 * sz) + '" rx="' + f(5 * sz) + '" ry="' + f(10 * sz) + '" transform="rotate(' + f(ang + 38) + " " + f(x) + " " + f(y) + ')" fill="' + col + '" opacity=".7"/>';
      }
    }
    leaves += '<ellipse cx="' + f(10 + len + 6) + '" cy="60" rx="9" ry="4.4" fill="#8a9a79" opacity=".8"/>';
    s = '<path d="M10 60Q' + f(10 + len / 2) + " " + f(60 - bend * 2) + " " + f(10 + len) + ' 60" fill="none" stroke="#7c8a68" stroke-width="1.6"/>';
    return '<svg class="' + (cls || "") + '" viewBox="0 0 ' + (len + 30) + ' 120" aria-hidden="true">' + s + leaves + "</svg>";
  }

  // չոր ծաղիկների փունջ (էվկալիպտ + պամպաս + մանր ծաղիկներ)՝ կնիքի կողքին
  function bouquet() {
    var p = "";
    for (var i = 0; i < 7; i++) { var a = -70 + i * 11, l = 90 + r() * 30, x2 = 60 + Math.cos(a * Math.PI / 180) * l, y2 = 110 + Math.sin(a * Math.PI / 180) * l;
      p += '<path d="M60 110Q' + f((60 + x2) / 2 + 8) + " " + f((110 + y2) / 2) + " " + f(x2) + " " + f(y2) + '" fill="none" stroke="#b9a98a" stroke-width="1"/>';
      for (var k = 0; k < 9; k++) { var t = .45 + k / 18, px = 60 + (x2 - 60) * t, py = 110 + (y2 - 110) * t;
        p += '<ellipse cx="' + f(px + 3) + '" cy="' + f(py) + '" rx="1.4" ry="5" transform="rotate(' + f(a + 60) + " " + f(px) + " " + f(py) + ')" fill="#e7dcc6"/>'; } }
    for (var j = 0; j < 4; j++) { var b = -40 + j * 25, ex = 60 + Math.cos(b * Math.PI / 180) * 70, ey = 110 + Math.sin(b * Math.PI / 180) * 70;
      p += '<path d="M60 110L' + f(ex) + " " + f(ey) + '" stroke="#7c8a68" stroke-width="1"/>';
      for (var m = 1; m < 5; m++) { var cx = 60 + (ex - 60) * m / 4.3, cy = 110 + (ey - 110) * m / 4.3; p += '<circle cx="' + f(cx) + '" cy="' + f(cy) + '" r="' + f(6 - m * .6) + '" fill="#a9b69c" opacity=".85"/>'; } }
    for (var q = 0; q < 6; q++) p += '<circle cx="' + f(40 + r() * 50) + '" cy="' + f(50 + r() * 40) + '" r="2.2" fill="#f6efe2" stroke="#c9b48c" stroke-width=".6"/>';
    return '<svg viewBox="0 0 160 130" aria-hidden="true">' + p + "</svg>";
  }

  window.WSArt = { seal: seal, sprig: sprig, bouquet: bouquet };
})();
