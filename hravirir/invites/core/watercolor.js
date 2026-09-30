/* Լուսանկարը վերածում է ջրաներկ նկարի (canvas-ով, հաճախորդի հեռախոսում)
   window.Watercolor.paint(url, {w, tint, ink, fade}) → Promise<dataURL (PNG, եզրերը թափանցիկ)>
   window.Watercolor.apply(root) — բոլոր <img data-wc="url">-ները փոխարինում է ջրաներկով
   Քայլերը. հարթեցում → գույների «լվացում» (պոստերիզացիա) → պաստելային երանգ → մատիտի/թանաքի եզրագծեր → թղթի հատիկավորություն → եզրերի անհավասար մարում */
(function () {
  "use strict";
  var cache = {};
  function load(url) {
    return new Promise(function (res, rej) { var im = new Image(); im.crossOrigin = "anonymous"; im.onload = function () { res(im); }; im.onerror = rej; im.src = url; });
  }
  // փոքր, կրկնվող «աղմուկ»՝ հարթ (value noise)
  function noise(W, H, cell, seed) {
    var gw = Math.ceil(W / cell) + 2, gh = Math.ceil(H / cell) + 2, g = new Float32Array(gw * gh), s = seed || 7, out = new Float32Array(W * H);
    for (var i = 0; i < g.length; i++) { s = (s * 16807) % 2147483647; g[i] = s / 2147483647; }
    for (var y = 0; y < H; y++) {
      var gy = y / cell, y0 = gy | 0, fy = gy - y0; fy = fy * fy * (3 - 2 * fy);
      for (var x = 0; x < W; x++) {
        var gx = x / cell, x0 = gx | 0, fx = gx - x0; fx = fx * fx * (3 - 2 * fx);
        var a = g[y0 * gw + x0], b = g[y0 * gw + x0 + 1], c = g[(y0 + 1) * gw + x0], d = g[(y0 + 1) * gw + x0 + 1];
        out[y * W + x] = (a + (b - a) * fx) * (1 - fy) + (c + (d - c) * fx) * fy;
      }
    }
    return out;
  }
  function boxBlur(src, W, H, r) {   // 3 ալիք, առանձին հորիզոնական/ուղղահայաց
    var tmp = new Float32Array(src.length), out = new Float32Array(src.length), k = 2 * r + 1, x, y, c, i, acc;
    for (y = 0; y < H; y++) for (c = 0; c < 3; c++) {
      acc = 0; for (i = -r; i <= r; i++) acc += src[(y * W + Math.min(W - 1, Math.max(0, i))) * 3 + c];
      for (x = 0; x < W; x++) { tmp[(y * W + x) * 3 + c] = acc / k; acc += src[(y * W + Math.min(W - 1, x + r + 1)) * 3 + c] - src[(y * W + Math.max(0, x - r)) * 3 + c]; }
    }
    for (x = 0; x < W; x++) for (c = 0; c < 3; c++) {
      acc = 0; for (i = -r; i <= r; i++) acc += tmp[(Math.min(H - 1, Math.max(0, i)) * W + x) * 3 + c];
      for (y = 0; y < H; y++) { out[(y * W + x) * 3 + c] = acc / k; acc += tmp[(Math.min(H - 1, y + r + 1) * W + x) * 3 + c] - tmp[(Math.max(0, y - r) * W + x) * 3 + c]; }
    }
    return out;
  }
  function paint(url, o) {
    o = o || {};
    var key = url + JSON.stringify(o); if (cache[key]) return cache[key];
    return (cache[key] = load(url).then(function (im) {
      var W = o.w || 720, H = Math.round(W * im.naturalHeight / im.naturalWidth);
      var cv = document.createElement("canvas"); cv.width = W; cv.height = H;
      var cx = cv.getContext("2d"); cx.drawImage(im, 0, 0, W, H);
      var id = cx.getImageData(0, 0, W, H), d = id.data, N = W * H, src = new Float32Array(N * 3), i, c;
      for (i = 0; i < N; i++) { src[i * 3] = d[i * 4]; src[i * 3 + 1] = d[i * 4 + 1]; src[i * 3 + 2] = d[i * 4 + 2]; }
      var soft = boxBlur(boxBlur(src, W, H, 2), W, H, 3);          // լվացում
      var fine = boxBlur(src, W, H, 1);                             // եզրերի համար
      var n1 = noise(W, H, 80, 11), n2 = noise(W, H, 9, 29), n3 = noise(W, H, 90, 5);
      var paper = o.paper || [251, 246, 240], tint = o.tint || [236, 214, 196], ink = o.ink || [120, 88, 60];
      var levels = 7, keep = o.keep == null ? .62 : o.keep;
      // եզրեր (Sobel)՝ պայծառության վրա
      var L = new Float32Array(N); for (i = 0; i < N; i++) L[i] = fine[i * 3] * .3 + fine[i * 3 + 1] * .59 + fine[i * 3 + 2] * .11;
      for (var y = 0; y < H; y++) for (var x = 0; x < W; x++) {
        var p = y * W + x, q = p * 3, e = 0;
        if (x > 0 && y > 0 && x < W - 1 && y < H - 1) {
          var gx = -L[p - W - 1] - 2 * L[p - 1] - L[p + W - 1] + L[p - W + 1] + 2 * L[p + 1] + L[p + W + 1];
          var gy = -L[p - W - 1] - 2 * L[p - W] - L[p - W + 1] + L[p + W - 1] + 2 * L[p + W] + L[p + W + 1];
          e = Math.min(1, Math.max(0, (Math.sqrt(gx * gx + gy * gy) - 60) / 220));
        }
        var jit = (n1[p] - .5) * (o.jit == null ? 22 : o.jit);
        for (c = 0; c < 3; c++) {
          var v = soft[q + c] + jit;
          v = Math.round(v / 255 * (levels - 1)) / (levels - 1) * 255 * .55 + v * .45;   // «լվացված» հարթ գունային շերտեր
          v = v * keep + tint[c] * (1 - keep) * .5 + paper[c] * (1 - keep) * .5;          // պաստել
          v = 255 - (255 - v) * .82;                                                       // ավելի լուսավոր
          v = v * (1 - e * .5) + ink[c] * e * .5;                                          // թանաքե եզրագիծ
          v *= .93 + .07 * n2[p];                                                          // թղթի հատիկ
          d[p * 4 + c] = v < 0 ? 0 : v > 255 ? 255 : v;
        }
        // եզրերի անհավասար մարում (ջրաներկի «արյունահոսք»)
        var fx = Math.min(x, W - 1 - x) / W, fy = Math.min(y, H - 1 - y) / H, edge = Math.min(fx * 1.6, fy * 1.6 * W / H * .9);
        var f = o.fade == null ? .16 : o.fade, a = (edge - f * (.35 + n3[p] * .9)) / (f * .9);
        d[p * 4 + 3] = Math.max(0, Math.min(1, a)) * 255;
      }
      cx.putImageData(id, 0, 0);
      return cv.toDataURL("image/png");
    }));
  }
  function apply(root) {
    (root || document).querySelectorAll("img[data-wc]").forEach(function (im) {
      var url = im.getAttribute("data-wc"); im.removeAttribute("data-wc");
      paint(url, im.dataset.wcw ? { w: +im.dataset.wcw } : {}).then(function (src) { im.src = src; im.classList.add("wc-on"); }, function () { im.src = url; im.classList.add("wc-on"); });
    });
  }
  window.Watercolor = { paint: paint, apply: apply };
})();
