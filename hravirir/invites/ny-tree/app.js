/* «Տոնածառ» — վինտաժ տոնածառ ծաղկեփնջով և նվերներով, լույսերը մարած են. սեղմելիս լույսերը վառվում են հերթով,
   աստղը փայլում է, թափվում են ոսկե փայլեր, և բացվում է էջը */
(function () {
  "use strict";
  var K = window.K, C = K.C, esc = K.esc, t = K.t;
  var TXT = { hy: { hint: "Սեղմեք տոնածառին" }, ru: { hint: "Нажмите на ёлку" } };
  function tree() {
    // լամպեր՝ ծաղկեփնջերի երկայնքով (x, y)
    var B = [[150, 92], [134, 110], [168, 116], [118, 140], [150, 146], [184, 138], [104, 176], [132, 184], [170, 186], [198, 172],
      [92, 214], [122, 224], [152, 228], [184, 222], [212, 210], [80, 256], [112, 266], [146, 272], [180, 268], [214, 258], [226, 246]];
    var COL = ["#ff4d5e", "#ffd36e", "#7ee3ff", "#ffffff", "#ff9a3c"];
    var bulbs = B.map(function (b, i) { return '<circle class="bb" style="--i:' + i + ";--c:" + COL[i % COL.length] + '" cx="' + b[0] + '" cy="' + b[1] + '" r="5"/>'; }).join("");
    return '<svg class="tr" viewBox="0 0 300 380" aria-hidden="true"><defs>' +
      '<linearGradient id="tg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2f7a52"/><stop offset="1" stop-color="#14402a"/></linearGradient>' +
      '<radialGradient id="sg"><stop offset="0" stop-color="#fff6cf"/><stop offset=".5" stop-color="#ffd36e"/><stop offset="1" stop-color="#ffd36e" stop-opacity="0"/></radialGradient></defs>' +
      '<circle class="halo" cx="150" cy="58" r="40" fill="url(#sg)"/>' +
      '<g fill="url(#tg)"><path d="M150 70 L196 136 L104 136Z"/><path d="M150 100 L218 190 L82 190Z"/><path d="M150 140 L238 244 L62 244Z"/><path d="M150 186 L256 292 L44 292Z"/></g>' +
      '<g fill="none" stroke="#d6a84c" stroke-width="2" opacity=".8"><path d="M122 116 Q150 132 182 112"/><path d="M98 168 Q150 196 206 160"/><path d="M80 218 Q150 248 222 204"/><path d="M64 262 Q150 292 238 248"/></g>' +
      bulbs + '<rect x="138" y="292" width="24" height="26" fill="#5a3a24"/>' +
      '<g><rect x="60" y="304" width="46" height="40" rx="3" fill="#a3192b"/><rect x="80" y="304" width="7" height="40" fill="#d6a84c"/><rect x="60" y="318" width="46" height="7" fill="#d6a84c"/>' +
      '<rect x="182" y="296" width="58" height="48" rx="3" fill="#d6a84c"/><rect x="207" y="296" width="8" height="48" fill="#a3192b"/><rect x="182" y="314" width="58" height="8" fill="#a3192b"/>' +
      '<rect x="118" y="318" width="40" height="26" rx="3" fill="#f4ead6"/><rect x="134" y="318" width="6" height="26" fill="#1f5a3a"/></g>' +
      '<path class="star" d="M150 34 L157 52 L176 53 L161 65 L166 84 L150 73 L134 84 L139 65 L124 53 L143 52Z" fill="#c9a24f"/></svg>';
  }
  NY.run({
    txt: TXT,
    env: function () {
      return '<div class="env" id="env" role="button" aria-label="' + esc(NY.x("hint")) + '"><canvas class="fx" id="esn"></canvas><canvas class="fx" id="ebr"></canvas>' +
        '<div class="top"><div class="co">' + esc(C.company || "") + '</div><div class="tt">' + esc(t(C.title)) + "</div></div>" +
        '<div class="twrap" id="tw">' + tree() + "</div>" +
        '<div class="dt"><b>' + esc(C.year || "") + "</b><span>" + NY.dd() + " · " + NY.tm() + "</span></div>" +
        (K.PREVIEW ? "" : '<div class="hint">' + esc(NY.x("hint")) + "</div>") + "</div>";
    },
    heroBg: '<canvas class="fx" id="hsn"></canvas><div class="gar"></div>',
    finBg: '<canvas class="fx" id="fsn"></canvas>',
    ready: function () { NY.snow(document.getElementById("esn"), { n: 40, max: 1.8, color: "#fff8e6" }); },
    after: function () { NY.snow(document.getElementById("hsn"), { n: 50, max: 2, color: "#fff8e6" }); NY.snow(document.getElementById("fsn"), { n: 35, color: "#fff8e6" }); },
    open: function (env, done) {
      env.classList.add("go");
      // ոսկե փայլեր աստղից
      setTimeout(function () {
        var s = env.querySelector(".star").getBoundingClientRect(), cv = document.getElementById("ebr");
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        var g = cv.getContext("2d"), r = window.devicePixelRatio || 1, W = cv.clientWidth, H = cv.clientHeight, P = [], t0 = performance.now();
        cv.width = W * r; cv.height = H * r; g.setTransform(r, 0, 0, r, 0, 0);
        for (var i = 0; i < 90; i++) { var a = Math.random() * 6.283, v = 1 + Math.random() * 5; P.push({ x: s.left + s.width / 2, y: s.top + s.height / 2, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 1 }); }
        (function f(tt) { var e = tt - t0; g.clearRect(0, 0, W, H); g.fillStyle = "#ffe08a";
          P.forEach(function (p) { p.vx *= .97; p.vy = p.vy * .97 + .06; p.x += p.vx; p.y += p.vy; g.globalAlpha = Math.max(0, 1 - e / 1800); g.beginPath(); g.arc(p.x, p.y, 1.6, 0, 6.283); g.fill(); });
          if (e < 1800) requestAnimationFrame(f); })(t0);
      }, 1500);
      setTimeout(function () { env.classList.add("zoom"); }, 2300);
      setTimeout(done, 2900);
    }
  });
})();
