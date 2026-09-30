/* Մատիտային գծանկարներ (օգտագործվում են «Մոնոգրամ»-ում և «Classic»-ում) (տուն, հարսի տուն, եկեղեցի, ռեստորան)
   Ամեն գիծ գծվում է երկու անգամ՝ թեթև շեղումով, ինչպես ձեռքով էսքիզում, ստվերները՝ շտրիխներով։
   window.MonoSketch(name) → <svg> (viewBox 300×200) */
(function () {
  "use strict";
  function Pen(seed, pre) {
    var s = seed, P = [], D = [], n = 0, PI = Math.PI;
    function r() { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }
    function j(v) { return (r() - .5) * v; }
    function f(v) { return Math.round(v * 10) / 10; }
    function cls(c, k) { var a = (c || "") + (k ? " p2" : ""); return a.trim() ? ' class="' + a.trim() + '"' : ""; }
    function line(x1, y1, x2, y2, c) {
      var dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1, ox = dx / L, oy = dy / L, passes = c === "h" ? 1 : 2;
      for (var k = 0; k < passes; k++) {
        var e1 = r() * 1.8, e2 = r() * 1.8, w = Math.min(1.8, L / 30);
        var ax = x1 - ox * e1 + j(.7), ay = y1 - oy * e1 + j(.7), bx = x2 + ox * e2 + j(.7), by = y2 + oy * e2 + j(.7);
        P.push("<path" + cls(c, k) + ' d="M' + f(ax) + " " + f(ay) + "Q" + f((ax + bx) / 2 + j(w)) + " " + f((ay + by) / 2 + j(w)) + " " + f(bx) + " " + f(by) + '"/>');
      }
    }
    function poly(pts, closed, c) {
      for (var i = 0; i < pts.length - 1; i++) line(pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1], c);
      if (closed) line(pts[pts.length - 1][0], pts[pts.length - 1][1], pts[0][0], pts[0][1], c);
    }
    function rect(x, y, w, h, c) { poly([[x, y], [x + w, y], [x + w, y + h], [x, y + h]], true, c); }
    function arc(cx, cy, rx, ry, a0, a1, m) { var o = []; for (var i = 0; i <= m; i++) { var a = a0 + (a1 - a0) * i / m; o.push([cx + Math.cos(a) * rx, cy - Math.sin(a) * ry]); } return o; }
    function curve(pts, c) {
      for (var k = 0; k < (c === "h" ? 1 : 2); k++) {
        var d = "M" + f(pts[0][0] + j(.6)) + " " + f(pts[0][1] + j(.6));
        for (var i = 1; i < pts.length; i++) d += "L" + f(pts[i][0] + j(.5)) + " " + f(pts[i][1] + j(.5));
        P.push("<path" + cls(c, k) + ' d="' + d + '"/>');
      }
    }
    // կամարաձև պատուհան կամ դուռ
    function arch(x, y, w, h, c, noBottom) { var rr = w / 2; curve([[x, y + h], [x, y + rr]].concat(arc(x + rr, y + rr, rr, rr, PI, 0, 12)).concat([[x + w, y + h]]), c); if (!noBottom) line(x, y + h, x + w, y + h, c); }
    function circ(cx, cy, rr, c) { curve(arc(cx, cy, rr, rr, 0, PI * 2, 22), c); }
    // շտրիխներ՝ բազմանկյան ներսում
    function hatch(pts, gap, c) {
      var id = pre + "c" + (n++), xs = pts.map(function (p) { return p[0]; }), ys = pts.map(function (p) { return p[1]; });
      var x0 = Math.min.apply(0, xs), x1 = Math.max.apply(0, xs), y0 = Math.min.apply(0, ys), y1 = Math.max.apply(0, ys), h = y1 - y0;
      D.push('<clipPath id="' + id + '"><polygon points="' + pts.map(function (p) { return p.join(","); }).join(" ") + '"/></clipPath>');
      var keep = P; P = [];
      for (var x = x0 - h; x < x1; x += gap * (.8 + r() * .4)) line(x, y1, x + h, y0, c || "h");
      var g = '<g clip-path="url(#' + id + ')">' + P.join("") + "</g>"; P = keep; P.push(g);
    }
    // ծառի պսակ՝ ալիքավոր եզրով և ներսի գանգուրներով
    function crown(cx, cy, rx, ry, m) {
      var pts = [];
      for (var i = 0; i <= m; i++) { var a = i / m * PI * 2, k = i === m ? 1 : .88 + r() * .24; pts.push([cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k]); }
      pts[m] = pts[0];
      for (var p = 0; p < 2; p++) {
        var d = "M" + f(pts[0][0]) + " " + f(pts[0][1]);
        for (var q = 1; q <= m; q++) { var b = Math.hypot(pts[q][0] - pts[q - 1][0], pts[q][1] - pts[q - 1][1]) * (.55 + r() * .15); d += "A" + f(b) + " " + f(b) + " 0 0 1 " + f(pts[q][0] + j(.6)) + " " + f(pts[q][1] + j(.6)); }
        P.push("<path" + cls("", p) + ' d="' + d + '"/>');
      }
      for (var t = 0; t < m * .8; t++) { var aa = r() * PI * 2, rr = Math.sqrt(r()) * .72, px = cx + Math.cos(aa) * rx * rr, py = cy + Math.sin(aa) * ry * rr;
        P.push('<path class="h" d="M' + f(px) + " " + f(py) + "a" + f(2 + r() * 2) + " " + f(2 + r() * 2) + " 0 1 1 " + f(3 + r() * 3) + " " + f(j(3)) + '"/>'); }
      hatch(arc(cx + rx * .25, cy + ry * .15, rx * .7, ry * .75, -PI * .5, PI * .5, 10).concat([[cx + rx * .25, cy - ry * .6]]), 3.2);
    }
    function trunk(x, y0, y1) { line(x - 2, y0, x - 1.5, y1); line(x + 2, y0, x + 1.5, y1); line(x, y0 + 8, x - 6, y0 + 2, "h"); }
    function grass(x0, x1, y) { for (var x = x0; x < x1; x += 3 + r() * 9) P.push('<path class="h" d="M' + f(x) + " " + y + "l" + f(j(3)) + " " + f(-2 - r() * 4) + "M" + f(x + 2) + " " + y + "l" + f(1 + r() * 2) + " " + f(-2 - r() * 3) + '"/>'); }
    // քարե պատի շարքեր
    function stones(x0, x1, y0, y1, step) {
      for (var y = y0 + step; y < y1 - 2; y += step) { var x = x0 + 2 + r() * 8; while (x < x1 - 6) { var w = 7 + r() * 12; if (r() > .3) line(x, y, Math.min(x + w, x1 - 2), y, "h"); x += w + 4 + r() * 8; } }
    }
    function bird(x, y, s) { P.push('<path d="M' + x + " " + y + "q" + f(s * .5) + " " + f(-s * .5) + " " + s + " 0q" + f(s * .5) + " " + f(-s * .5) + " " + s + ' 0"/>'); }
    function flowers(x, y, w) { for (var i = 0; i < w / 5; i++) { var cx = x + 2 + r() * (w - 4), cy = y - 2 - r() * 7; P.push('<path d="M' + f(cx) + " " + f(cy) + "m-1.8 0a1.8 1.8 0 1 0 3.6 0a1.8 1.8 0 1 0-3.6 0" + '"/>'); } }
    return { line: line, poly: poly, rect: rect, arc: arc, curve: curve, arch: arch, circ: circ, hatch: hatch, crown: crown, trunk: trunk, grass: grass, stones: stones, bird: bird, flowers: flowers, r: r,
      svg: function () { return "<defs>" + D.join("") + "</defs>" + P.join(""); } };
  }

  var PI = Math.PI;
  var SCENES = {
    // Հայկական եկեղեցի՝ թմբուկ, վեղար-գմբեթ, շքամուտք, կից աբսիդներ
    church: function (p) {
      p.line(8, 182, 292, 182); p.grass(10, 290, 182);
      // կից մասեր
      p.poly([[62, 182], [62, 138], [96, 122]]); p.line(56, 140, 96, 120); p.poly([[238, 182], [238, 138], [204, 122]]); p.line(244, 140, 204, 120);
      p.hatch([[204, 124], [238, 140], [238, 182], [204, 182]], 3.4);
      // կենտրոնական մաս
      p.poly([[96, 182], [96, 112], [204, 112], [204, 182]]); p.poly([[88, 114], [150, 80], [212, 114]]); p.line(96, 114, 204, 114, "h");
      p.hatch([[150, 82], [212, 114], [150, 114]], 3); p.hatch([[186, 114], [204, 114], [204, 182], [186, 182]], 3.2);
      p.stones(96, 204, 114, 182, 8); p.stones(62, 96, 138, 182, 8); p.stones(204, 238, 138, 182, 8);
      // թմբուկ և գմբեթ
      p.line(128, 86, 128, 50); p.line(172, 86, 172, 50); p.line(124, 50, 176, 50); p.line(126, 55, 174, 55, "h");
      for (var i = 0; i < 4; i++) p.arch(134 + i * 9, 60, 5, 16, "", true);
      p.hatch([[160, 50], [172, 50], [172, 84], [160, 90]], 2.6);
      p.poly([[122, 51], [150, 16], [178, 51]], true);
      [131, 140, 150, 160, 169].forEach(function (x) { p.line(150, 18, x, 50, "h"); });
      p.hatch([[150, 18], [178, 51], [150, 51]], 2.4);
      p.line(150, 16, 150, 2); p.line(144.5, 7, 155.5, 7); p.circ(150, 16, 1.2);
      // շքամուտք, վարդյակ, պատուհաններ
      p.arch(132, 144, 36, 38, "", true); p.arch(140, 154, 20, 28, "", true); p.hatch([[140, 164], [160, 164], [160, 182], [140, 182]], 2.4);
      p.circ(150, 128, 7); p.circ(150, 128, 3.2, "h");
      p.arch(111, 128, 7, 22); p.arch(182, 128, 7, 22); p.arch(75, 150, 6, 18); p.arch(219, 150, 6, 18);
      // ծառեր, թփեր, թռչուններ
      p.crown(34, 128, 12, 40, 16); p.trunk(34, 168, 182);
      p.crown(270, 160, 22, 16, 13); p.trunk(270, 174, 182); p.crown(84, 178, 12, 6, 8);
      p.bird(214, 40, 7); p.bird(228, 30, 5); p.bird(80, 46, 6);
    },
    // Ռեստորան՝ դասական առանձնատուն սյունասրահով
    hall: function (p) {
      p.line(6, 182, 294, 182); p.grass(8, 292, 182);
      p.poly([[62, 176], [62, 94], [238, 94], [238, 176]]); p.line(56, 176, 244, 176);
      p.poly([[54, 96], [82, 70], [218, 70], [246, 96]], true); for (var x = 90; x < 214; x += 8) p.line(x, 71, x - 6, 95, "h");
      p.hatch([[62, 96], [238, 96], [238, 102], [62, 102]], 2.6); p.hatch([[222, 102], [238, 102], [238, 176], [222, 176]], 3.2);
      p.stones(62, 108, 102, 176, 9); p.stones(192, 238, 102, 176, 9);
      // սյունասրահ և ֆրոնտոն
      p.poly([[104, 96], [150, 60], [196, 96]], true); p.circ(150, 82, 6); p.circ(150, 82, 2.6, "h"); p.line(104, 100, 196, 100);
      p.hatch([[108, 102], [192, 102], [192, 176], [108, 176]], 5);
      [114, 132, 164, 182].forEach(function (x) { p.line(x - 3, 102, x - 3, 172); p.line(x + 3, 102, x + 3, 172); p.rect(x - 5, 100, 10, 4, "h"); p.rect(x - 5, 170, 10, 4, "h"); });
      p.arch(140, 136, 20, 40); p.line(150, 146, 150, 176, "h");
      // աստիճաններ
      p.line(100, 179, 200, 179); p.line(96, 182, 204, 182);
      // պատուհաններ
      [72, 92, 200, 220].forEach(function (x) { p.arch(x - 6, 134, 13, 30); p.line(x + .5, 140, x + .5, 164, "h"); p.rect(x - 6, 108, 13, 14); p.line(x - 6, 115, x + 7, 115, "h"); });
      // լապտերներ, ծառեր
      [98, 202].forEach(function (x) { p.line(x, 182, x, 152); p.rect(x - 3, 144, 6, 8); p.line(x - 4, 144, x, 140); p.line(x + 4, 144, x, 140); });
      p.crown(28, 138, 22, 30, 15); p.trunk(28, 164, 182); p.crown(272, 138, 22, 30, 15); p.trunk(272, 164, 182);
      p.crown(78, 178, 14, 6, 9); p.crown(222, 178, 14, 6, 9);
      p.bird(240, 38, 7); p.bird(254, 30, 5);
    },
    // Փեսայի տուն՝ երկհարկանի քարե տուն պատշգամբով
    house: function (p) {
      p.line(6, 182, 294, 182); p.grass(8, 292, 182);
      p.poly([[86, 182], [86, 92], [214, 92], [214, 182]]);
      p.poly([[76, 94], [110, 60], [190, 60], [224, 94]], true); for (var x = 116; x < 186; x += 7) p.line(x, 61, x - 4, 93, "h");
      p.hatch([[190, 60], [224, 94], [196, 94]], 2.8); p.hatch([[86, 94], [214, 94], [214, 99], [86, 99]], 2.4); p.hatch([[200, 99], [214, 99], [214, 182], [200, 182]], 3);
      p.rect(174, 44, 12, 18); p.line(172, 44, 188, 44);
      p.stones(86, 214, 99, 182, 8);
      p.line(86, 136, 214, 136);
      // պատշգամբ
      p.rect(118, 132, 64, 5); p.line(118, 116, 182, 116); for (var b = 122; b < 180; b += 5) p.line(b, 117, b, 132, "h");
      p.rect(140, 100, 20, 32); p.line(150, 100, 150, 132, "h");
      p.rect(98, 102, 20, 24); p.line(108, 102, 108, 126, "h"); p.line(98, 114, 118, 114, "h");
      p.rect(182, 102, 20, 24); p.line(192, 102, 192, 126, "h"); p.line(182, 114, 202, 114, "h");
      // մուտք
      p.arch(139, 146, 22, 36); p.hatch([[139, 160], [161, 160], [161, 182], [139, 182]], 2.6); p.line(134, 182, 166, 182); p.rect(130, 178, 40, 4, "h");
      p.rect(98, 146, 20, 24); p.line(108, 146, 108, 170, "h"); p.rect(182, 146, 20, 24); p.line(192, 146, 192, 170, "h");
      // ցածր քարե պատ, ծառ, թուփ
      p.poly([[10, 182], [10, 170], [70, 170], [70, 182]]); p.poly([[230, 182], [230, 170], [290, 170], [290, 182]]);
      [22, 36, 50, 62, 244, 258, 272, 284].forEach(function (x) { p.line(x, 171, x, 181, "h"); });
      p.crown(44, 120, 28, 34, 17); p.trunk(44, 150, 170);
      p.crown(252, 160, 18, 12, 11); p.flowers(236, 170, 34);
      p.bird(236, 44, 7);
    },
    // Հարսի տուն՝ սրածայր տանիքով տնակ, գավիթ, վարագույրներ, ծաղիկներ, ցանկապատ
    house2: function (p) {
      p.line(6, 182, 294, 182); p.grass(8, 292, 182);
      p.poly([[92, 182], [92, 106], [208, 106], [208, 182]]);
      p.poly([[80, 108], [150, 50], [220, 108]]); p.poly([[90, 108], [150, 58], [210, 108]], false, "h");
      p.hatch([[150, 52], [220, 108], [150, 108]], 2.8); p.hatch([[194, 108], [208, 108], [208, 182], [194, 182]], 3);
      for (var y = 114; y < 180; y += 7) p.line(92, y, 208, y, "h");
      p.circ(150, 84, 9); p.line(141, 84, 159, 84, "h"); p.line(150, 75, 150, 93, "h");
      // գավիթ՝ սրտիկով
      p.poly([[126, 136], [150, 120], [174, 136]], true); p.line(131, 137, 131, 182); p.line(169, 137, 169, 182);
      p.curve([[150, 134], [144, 129], [143.5, 126], [146, 124.5], [150, 127], [154, 124.5], [156.5, 126], [156, 129], [150, 134]]);
      p.arch(141, 146, 18, 36); p.hatch([[141, 158], [159, 158], [159, 182], [141, 182]], 2.4);
      // պատուհաններ փեղկերով և ծաղկամաններով
      [[102, 128], [176, 128]].forEach(function (w) {
        p.rect(w[0], w[1], 22, 26); p.line(w[0] + 11, w[1], w[0] + 11, w[1] + 26, "h"); p.line(w[0], w[1] + 13, w[0] + 22, w[1] + 13, "h");
        p.rect(w[0] - 7, w[1], 6, 26, "h"); p.rect(w[0] + 23, w[1], 6, 26, "h");
        p.rect(w[0] - 2, w[1] + 28, 26, 6); p.flowers(w[0] - 2, w[1] + 28, 26);
      });
      // ցանկապատ
      [[8, 82], [218, 292]].forEach(function (s) {
        p.line(s[0], 172, s[1], 172, "h"); p.line(s[0], 177, s[1], 177, "h");
        for (var x = s[0] + 3; x < s[1]; x += 8) p.poly([[x, 182], [x, 167], [x + 2, 164], [x + 4, 167], [x + 4, 182]]);
      });
      p.crown(262, 116, 26, 32, 16); p.trunk(262, 146, 166);
      p.crown(40, 150, 16, 14, 11); p.trunk(40, 162, 166);
      p.bird(70, 44, 7); p.bird(84, 36, 5);
    }
  };
  var SEEDS = { church: 11, hall: 23, house: 37, house2: 53 };
  window.MonoSketch = function (name) {
    var p = Pen(SEEDS[name] || 7, "sk" + name);
    (SCENES[name] || SCENES.house)(p);
    // pathLength=1՝ որ բոլոր գծերը «նկարվեն» միաժամանակ (CSS-ը՝ core.css-ում)
    return '<svg class="sketch draw rv" viewBox="0 0 300 200" aria-hidden="true">' + p.svg().replace(/<path /g, '<path pathLength="1" ') + "</svg>";
  };
})();
