/* «Հրավառություն» — գիշերային երկինք աստղերով, Արարատի ուրվագիծ և քաղաքի լույսեր. սեղմելիս հրավառություն է սկսվում,
   երկնքում հայտնվում է տարեթիվը. գլխավոր բաժնում հրավառությունը շարունակվում է մի քանի անգամ */
(function () {
  "use strict";
  var K = window.K, C = K.C, esc = K.esc, t = K.t;
  var TXT = { hy: { hint: "Սեղմեք երկնքին" }, ru: { hint: "Нажмите на небо" } };
  // Արարատ (Մասիս և Սիս)՝ ձյունածածկ գագաթներով, տակը՝ քաղաքի լույսեր
  function ararat(id) {
    var lights = "";
    for (var i = 0, s = 5; i < 70; i++) { s = (s * 16807) % 2147483647; lights += '<circle cx="' + (s % 400) + '" cy="' + (318 + (s >> 4) % 26) + '" r="' + (.8 + (s % 10) / 10) + '" fill="' + ["#ffd36e", "#fff2c2", "#ffb86b"][s % 3] + '"/>'; }
    return '<svg class="ar" viewBox="0 0 400 350" preserveAspectRatio="xMidYMax slice" aria-hidden="true"><defs>' +
      '<linearGradient id="m' + id + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3b2d6b"/><stop offset="1" stop-color="#150f33"/></linearGradient></defs>' +
      '<path d="M-20 300 L40 270 L100 220 L140 160 L162 132 L178 138 L214 186 L248 226 L268 240 L286 222 L304 206 L322 220 L356 252 L420 290 L430 300Z" fill="url(#m' + id + ')"/>' +
      '<path d="M140 160 L162 132 L178 138 L198 166 L186 162 L176 172 L166 160 L154 170 L146 162Z" fill="#e9e3ff" opacity=".9"/>' +
      '<path d="M286 222 L304 206 L316 216 L306 218 L298 226 L292 222Z" fill="#e9e3ff" opacity=".85"/>' +
      '<rect x="-20" y="300" width="460" height="60" fill="#0b0820"/>' + lights + "</svg>";
  }
  function stars(cv) {
    var g = cv.getContext("2d"), r = window.devicePixelRatio || 1, W = cv.clientWidth, H = cv.clientHeight;
    cv.width = W * r; cv.height = H * r; g.setTransform(r, 0, 0, r, 0, 0);
    for (var i = 0; i < 140; i++) { g.globalAlpha = .3 + Math.random() * .7; g.fillStyle = "#fff"; g.beginPath(); g.arc(Math.random() * W, Math.random() * H * .75, Math.random() * 1.3, 0, 6.283); g.fill(); }
  }
  var fw, hfw;
  NY.run({
    txt: TXT,
    env: function () {
      return '<div class="env" id="env" role="button" aria-label="' + esc(NY.x("hint")) + '"><canvas class="fx stars" id="est"></canvas><canvas class="fx" id="efw"></canvas>' +
        '<div class="sky"><div class="co">' + esc(C.company || "") + '</div><div class="tt">' + esc(t(C.title)) + '</div><div class="dt">' + NY.dd() + " · " + NY.tm() + "</div></div>" +
        '<div class="big">' + esc(C.year || "") + "</div>" + ararat("e") +
        (K.PREVIEW ? "" : '<div class="hint">' + esc(NY.x("hint")) + "</div>") + "</div>";
    },
    heroBg: '<canvas class="fx stars" id="hst"></canvas><canvas class="fx" id="hfw"></canvas>' + ararat("h"),
    finBg: "",
    ready: function () { stars(document.getElementById("est")); fw = NY.fireworks(document.getElementById("efw")); },
    after: function () {
      stars(document.getElementById("hst")); hfw = NY.fireworks(document.getElementById("hfw"));
      var cv = document.getElementById("hfw"), n = 0;
      clearInterval(this._iv);
      this._iv = setInterval(function () { if (++n > 8 || !document.body.contains(cv)) return; hfw.fire(cv.clientWidth * (.15 + Math.random() * .7), cv.clientHeight * (.12 + Math.random() * .2)); }, 2600);
    },
    open: function (env, done) {
      env.classList.add("go");
      var W = env.clientWidth, H = env.clientHeight;
      [[.3, .22, 0], [.72, .18, 250], [.5, .12, 600], [.2, .3, 900], [.82, .28, 1150], [.45, .25, 1500], [.62, .16, 1800]].forEach(function (p) {
        setTimeout(function () { fw.fire(W * p[0], H * p[1]); }, p[2]);
      });
      setTimeout(function () { env.classList.add("yr"); }, 1100);
      setTimeout(done, 3600);
    }
  });
})();
