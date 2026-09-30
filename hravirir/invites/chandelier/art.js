/* «Ջահ» դիզայնի գրաֆիկան՝ SVG-ով (ոչ նկար). ոսկե զարդանախշ կողպեք, բանալի, բյուրեղյա ջահ, կամարներ, զարդաշղթա */
(function () {
  "use strict";
  var PI = Math.PI;
  function f(v) { return Math.round(v * 10) / 10; }
  var GOLD = '<linearGradient id="{id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8a6630"/><stop offset=".3" stop-color="#e3c485"/><stop offset=".5" stop-color="#b48a47"/>' +
    '<stop offset=".72" stop-color="#f0dcaa"/><stop offset="1" stop-color="#9a7438"/></linearGradient>';
  function gold(id) { return GOLD.replace("{id}", id); }

  // փոքր գանգուր (C-scroll)՝ տեղական կոորդինատներում, պտտված ու տեղափոխված
  function scroll(x, y, ang, s, mirror) {
    var m = mirror ? -1 : 1;
    return '<path transform="translate(' + f(x) + " " + f(y) + ") rotate(" + f(ang) + ") scale(" + f(s * m) + " " + f(s) + ')" d="M0 0c4-9 16-11 21-3c3 5-1 10-6 9c-4-1-4-6 0-6M0 0c-3 6-1 12 5 13"/>';
  }
  function leaf(x, y, ang, s) {
    return '<path transform="translate(' + f(x) + " " + f(y) + ") rotate(" + f(ang) + ") scale(" + f(s) + ')" d="M0 0c3-4 9-4 12 0c-3 4-9 4-12 0z"/>';
  }

  /* ---------- Կողպեք՝ սրածայր զարդաքանդակ (cartouche) ներսում կամարաձև շրջանակով, viewBox 0 0 200 260
     Բանալու անցքի կենտրոնը՝ (100,124). app.js-ը այս կետն է օգտագործում ---------- */
  function cub(p, t) { var u = 1 - t; return [u * u * u * p[0][0] + 3 * u * u * t * p[1][0] + 3 * u * t * t * p[2][0] + t * t * t * p[3][0], u * u * u * p[0][1] + 3 * u * u * t * p[1][1] + 3 * u * t * t * p[2][1] + t * t * t * p[3][1]]; }
  function lock() {
    // արտաքին եզրագծի աջ կեսը՝ երկու կոր (վերևից ներքև)
    var R = [[[100, 8], [134, 40], [180, 82], [180, 130]], [[180, 130], [180, 178], [134, 220], [100, 252]]];
    var fil = "", beadsS = "";
    R.forEach(function (seg) {
      for (var i = 1; i < 9; i++) {
        var t = i / 9, p = cub(seg, t), q = cub(seg, t + .01), ang = Math.atan2(q[1] - p[1], q[0] - p[0]) * 180 / PI;
        var inner = [100 + (p[0] - 100) * .8, 130 + (p[1] - 130) * .84];
        // դուրս նայող գանգուր + ներս նայող տերև, երկու կողմից հայելային
        fil += scroll(p[0], p[1], ang - 60, .9, false) + scroll(200 - p[0], p[1], 180 - ang + 60, .9, true);
        fil += leaf(inner[0], inner[1], ang + 90, 1.1) + leaf(200 - inner[0], inner[1], 90 - ang, 1.1);
        beadsS += '<circle cx="' + f(inner[0] * .5 + p[0] * .5) + '" cy="' + f(inner[1] * .5 + p[1] * .5) + '" r="1.6"/><circle cx="' + f(200 - (inner[0] * .5 + p[0] * .5)) + '" cy="' + f(inner[1] * .5 + p[1] * .5) + '" r="1.6"/>';
      }
    });
    var outline = "M100 8C134 40 180 82 180 130C180 178 134 220 100 252C66 220 20 178 20 130C20 82 66 40 100 8Z";
    var inline = "M100 30C126 56 162 92 162 130C162 168 126 204 100 230C74 204 38 168 38 130C38 92 74 56 100 30Z";
    // անկյունային ականթի գանգուրներ (մեծ)
    var big = [[134, 84, 30], [66, 84, 150], [134, 176, -30], [66, 176, 210]].map(function (a) {
      return '<path transform="translate(' + a[0] + " " + a[1] + ") rotate(" + a[2] + ')" d="M0 0c8-14 26-14 30-2c3 9-5 14-11 11c-5-3-3-9 2-8M0 0c-2 10 4 18 14 18M6 -4c-6-6-6-14 2-18"/>';
    }).join("");
    var crest = '<path d="M100 2c-5 7-5 12 0 16c5-4 5-9 0-16zM100 258c-5-7-5-12 0-16c5 4 5 9 0 16z"/>' +
      '<path d="M100 18c-8-4-18-2-20 6c-1 5 5 7 8 3M100 18c8-4 18-2 20 6c1 5-5 7-8 3M100 242c-8 4-18 2-20-6c-1-5 5-7 8-3M100 242c8 4 18 2 20-6c1-5-5-7-8-3"/>';
    // կամարաձև պատուհան՝ անցքի շուրջը
    var win = '<path d="M76 170V112a24 24 0 0 1 48 0V170Z" fill="url(#lf)" stroke="url(#lg)" stroke-width="2.4"/><path d="M82 164V113a18 18 0 0 1 36 0V164Z" fill="none" stroke="url(#lg)" stroke-width="1"/>';
    return '<svg viewBox="-8 -4 216 268" aria-hidden="true"><defs>' + gold("lg") +
      '<radialGradient id="lf" cx=".5" cy=".42" r=".7"><stop offset="0" stop-color="#fffdf9"/><stop offset="1" stop-color="#f6ece2"/></radialGradient>' +
      '<radialGradient id="kh" cx=".5" cy=".3" r=".8"><stop offset="0" stop-color="#5a3d22"/><stop offset="1" stop-color="#20150b"/></radialGradient>' +
      '<radialGradient id="gw"><stop offset="0" stop-color="#fff8e6"/><stop offset=".5" stop-color="#ffe7b0" stop-opacity=".7"/><stop offset="1" stop-color="#ffe7b0" stop-opacity="0"/></radialGradient></defs>' +
      '<g class="plate" fill="none" stroke="url(#lg)" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="' + outline + '" stroke-width="3"/><path d="' + inline + '" stroke-width="1.2"/>' +
      '<g stroke-width="2.3">' + fil + big + crest + '</g><g fill="url(#lg)" stroke="none">' + beadsS + "</g>" + win + "</g>" +
      // բանալու անցք՝ կլոր գլուխ և նեղացող ոտք
      '<path class="hole" d="M100 110a10 10 0 0 1 6 18l4 24h-20l4-24a10 10 0 0 1 6-18z" fill="url(#kh)" stroke="url(#lg)" stroke-width="1.6"/>' +
      '<circle class="glow" cx="100" cy="126" r="16" fill="url(#gw)"/></svg>';
  }

  /* ---------- Բանալի՝ հորիզոնական, գլխիկը աջ, ծայրը ձախ (viewBox 0 0 220 70, ծայրը՝ x=20, y=35) ---------- */
  function clover(cx, cy, r) {   // երեքնուկաձև գլխիկ (4 թերթ + օղակ)
    var d = r * .3, rp = r * .23;
    return [[d, 0], [-d, 0], [0, d], [0, -d]].map(function (o) { return '<circle cx="' + f(cx + o[0]) + '" cy="' + f(cy + o[1]) + '" r="' + f(rp) + '"/>'; }).join("") +
      '<circle cx="' + cx + '" cy="' + cy + '" r="' + f(r * .3) + '" stroke="none"/>';
  }
  function key() {
    return '<svg viewBox="0 0 220 70" aria-hidden="true"><defs>' + gold("kg") + "</defs>" +
      '<g fill="url(#kg)" stroke="#8a6630" stroke-width=".8" stroke-linejoin="round">' +
      '<path d="M20 32.5h140v5H20z"/>' +                                                            // ձող
      '<path d="M22 37.5h24v16h-5v-7h-5v10h-5v-10h-4v5h-5z"/>' +                                      // ատամներ
      '<path d="M140 29h7v12h-7zM150 28h5v14h-5zM158 30.5c3-2 6-2 8 0v9c-2 2-5 2-8 0z"/>' +             // օղակներ
      clover(190, 35, 30) + "</g>" +
      '<circle cx="190" cy="35" r="6.5" fill="#fbf3e6" stroke="#8a6630" stroke-width="1"/><circle cx="190" cy="35" r="10" fill="none" stroke="#8a6630" stroke-width=".7"/>' +
      '<path d="M26 33.8h128" stroke="#fff3d2" stroke-width=".9" opacity=".75"/></svg>';
  }
  // գլխիկը՝ դեմքով (երբ բանալին արդեն անցքի մեջ է և պտտվում է)
  function bow() {
    return '<svg viewBox="0 0 60 60" aria-hidden="true"><defs>' + gold("bg") + '</defs><g fill="url(#bg)" stroke="#8a6630" stroke-width=".8">' + clover(30, 30, 44) + "</g>" +
      '<circle cx="30" cy="30" r="9" fill="#fbf3e6" stroke="#8a6630" stroke-width="1"/><circle cx="30" cy="30" r="14" fill="none" stroke="#8a6630" stroke-width=".7"/></svg>';
  }

  /* ---------- Բյուրեղյա ջահ, viewBox 0 0 300 330 ---------- */
  function beads(pts, r, cls) { return pts.map(function (p) { return '<circle' + (cls ? ' class="' + cls + '"' : "") + ' cx="' + f(p[0]) + '" cy="' + f(p[1]) + '" r="' + r + '"/>'; }).join(""); }
  function swagPts(x1, y1, x2, y2, sag, step) {   // կախված շղթա (պարաբոլ)
    var L = Math.hypot(x2 - x1, y2 - y1), n = Math.max(3, Math.round(L / step)), o = [];
    for (var i = 0; i <= n; i++) { var u = i / n; o.push([x1 + (x2 - x1) * u, y1 + (y2 - y1) * u + 4 * sag * u * (1 - u)]); }
    return o;
  }
  function prism(x, y, s) { return '<path class="pr" transform="translate(' + f(x) + " " + f(y) + ") scale(" + s + ')" d="M0 0l4 6l-4 12l-4-12z"/>'; }
  function drop(x, y, n) { var p = []; for (var i = 0; i < n; i++) p.push([x, y + i * 5]); return beads(p, 1.5, "cr") + prism(x, y + n * 5 - 1, 1); }
  function chandelier() {
    var cx = 150, arms = "", cups = "", cr = "", fl = "";
    function arm(x0, y0, d, y1, drp) {
      [1, -1].forEach(function (s) {
        var x = cx + s * d;
        arms += '<path d="M' + x0 + " " + y0 + "C" + f(x0 + s * d * .25) + " " + f(y0 + 34) + " " + f(x - s * 14) + " " + f(y1 + 30) + " " + f(x) + " " + f(y1 + 8) + '"/>' +
          '<path d="M' + f(x - s * 4) + " " + f(y1 + 20) + "c" + f(-s * 8) + " 2 " + f(-s * 10) + " 10 " + f(-s * 4) + ' 12"/>';
        cups += '<ellipse cx="' + f(x) + '" cy="' + f(y1 + 8) + '" rx="9" ry="2.6"/><path d="M' + f(x - 4) + " " + f(y1 + 8) + "q4 7 8 0" + '"/>';
        fl += '<rect x="' + f(x - 2.6) + '" y="' + f(y1 - 14) + '" width="5.2" height="21" rx="1" class="cd"/><g class="fla" style="transform-origin:' + f(x) + "px " + f(y1 - 15) + 'px;animation-delay:-' + f(Math.random() * 2) + 's">' +
          '<circle cx="' + f(x) + '" cy="' + f(y1 - 20) + '" r="9" fill="url(#halo)"/><path d="M' + f(x) + " " + f(y1 - 27) + "c-3 5-3 9 0 11c3-2 3-6 0-11z" + '" fill="#ffd58a"/></g>';
        if (drp) cr += drop(x, y1 + 12, 3);
      });
    }
    // ստորին և վերին հարկեր
    arm(cx, 176, 118, 136, 1); arm(cx, 176, 80, 144, 1); arm(cx, 176, 40, 150, 1);
    arm(cx, 112, 62, 88, 1); arm(cx, 112, 28, 94, 0);
    // բյուրեղյա շղթաներ ճյուղերի միջև
    var X = [-118, -80, -40, 40, 80, 118], Y = [144, 152, 158, 158, 152, 144];
    for (var i = 0; i < X.length - 1; i++) { if (i === 2) continue; cr += beads(swagPts(cx + X[i], Y[i], cx + X[i + 1], Y[i + 1], 16, 6), 1.5, "cr"); }
    cr += beads(swagPts(cx - 40, 158, cx + 40, 158, 34, 6), 1.6, "cr") + beads(swagPts(cx - 80, 152, cx + 80, 152, 62, 7), 1.6, "cr");
    cr += beads(swagPts(cx - 62, 96, cx + 62, 96, 22, 6), 1.4, "cr");
    // կենտրոնական կախիկներ
    for (var d = -3; d <= 3; d++) cr += drop(cx + d * 9, 196 + Math.abs(d) * -3, 7 - Math.abs(d));
    // փայլփլուններ
    var tw = "";
    for (var k = 0; k < 16; k++) { var tx = cx + (Math.random() - .5) * 250, ty = 90 + Math.random() * 150; tw += '<path class="tw" style="animation-delay:-' + f(Math.random() * 3) + 's" d="M' + f(tx) + " " + f(ty - 4) + "l1 3l3 1l-3 1l-1 3l-1-3l-3-1l3-1z" + '"/>'; }
    return '<svg viewBox="0 0 300 330" aria-hidden="true"><defs>' + gold("cg") +
      '<radialGradient id="halo"><stop offset="0" stop-color="#fff2cc" stop-opacity=".9"/><stop offset="1" stop-color="#ffe2a0" stop-opacity="0"/></radialGradient></defs>' +
      '<g class="sway">' +
      // շղթա և գլխամաս
      '<g fill="none" stroke="url(#cg)" stroke-width="1.6">' + [4, 12, 20, 28, 36].map(function (y, i) { return i % 2 ? '<ellipse cx="150" cy="' + y + '" rx="1.6" ry="4"/>' : '<ellipse cx="150" cy="' + y + '" rx="3" ry="4"/>'; }).join("") + "</g>" +
      '<path d="M136 48c0-8 6-10 14-10s14 2 14 10z" fill="url(#cg)"/>' +
      // ձող, սափորներ
      '<g fill="url(#cg)"><rect x="147.5" y="48" width="5" height="140"/><path d="M142 72c0-8 16-8 16 0c0 6-4 8-8 10c-4-2-8-4-8-10z"/><ellipse cx="150" cy="112" rx="15" ry="5"/>' +
      '<path d="M138 150c0-10 24-10 24 0c0 14-6 22-12 26c-6-4-12-12-12-26z"/><ellipse cx="150" cy="176" rx="22" ry="6"/><path d="M144 188h12l-6 14z"/></g>' +
      '<g fill="none" stroke="url(#cg)" stroke-width="2.6" stroke-linecap="round">' + arms + "</g>" +
      '<g fill="url(#cg)" stroke="url(#cg)" stroke-width="1">' + cups + "</g>" + fl +
      '<g class="crys">' + cr + "</g>" + tw + "</g></svg>";
  }

  /* ---------- Կամարներ և սյուներ (ջրաներկի ֆոն), viewBox 0 0 375 700 ---------- */
  function arches() {
    function col(x) { return '<path d="M' + x + " 700V330M" + (x + 22) + " 700V330M" + (x - 6) + " 330h34M" + (x - 6) + " 322h34M" + (x - 4) + " 700h30" + '"/>' +
      '<path class="h" d="M' + (x + 6) + " 690V340M" + (x + 11) + " 690V340M" + (x + 16) + " 690V340" + '"/>'; }
    return '<svg viewBox="0 0 375 700" preserveAspectRatio="xMidYMax slice" aria-hidden="true"><g fill="none" stroke="#c9a877" stroke-width="1.2">' +
      '<path d="M40 700V300C40 150 110 70 187.5 70S335 150 335 300V700"/><path d="M58 700V304C58 170 120 92 187.5 92S317 170 317 304V700"/>' +
      col(8) + col(345) + '<path class="h" d="M-30 330c20-120 40-200 70-240M405 330c-20-120-40-200-70-240"/>' +
      '<path class="h" d="M100 690h175M80 670h215"/></g></svg>';
  }

  /* ---------- Կախովի զարդաշղթա (բաժանարար), viewBox 0 0 360 96 ---------- */
  function garland() {
    var hooks = [8, 94, 180, 266, 352], s = "", p = "", d = "";
    for (var i = 0; i < hooks.length - 1; i++) {
      p += '<path d="M' + hooks[i] + " 10Q" + (hooks[i] + hooks[i + 1]) / 2 + " 62 " + hooks[i + 1] + ' 10"/>';
      s += beads(swagPts(hooks[i], 12, hooks[i + 1], 12, 20, 5.5), 1.7, "pe");
    }
    hooks.forEach(function (x, i) {
      d += '<circle cx="' + x + '" cy="8" r="4.2" class="ro"/>' + '<circle cx="' + x + '" cy="8" r="1.8" fill="#fff6e3"/>';
      if (i && i < hooks.length - 1) { var y = 14, b = []; for (var k = 0; k < 6; k++) b.push([x, y + k * 5.4]); d += beads(b, 1.6, "pe") + '<path class="pr" d="M' + x + " " + (y + 32) + "l5 8l-5 16l-5-16z" + '"/>'; }
    });
    return '<svg class="garland" viewBox="0 0 360 96" aria-hidden="true"><defs>' + gold("gg") + '</defs><g fill="none" stroke="url(#gg)" stroke-width="1.3">' + p + "</g>" + s + d + "</svg>";
  }

  window.ChArt = { lock: lock, key: key, bow: bow, chandelier: chandelier, arches: arches, garland: garland };
})();