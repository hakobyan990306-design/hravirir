/* Ամանորյա կորպորատիվ դիզայնների ընդհանուր մասը (ny-globe, ny-fireworks, ny-tree).
   Ամեն դիզայն տալիս է իր բացման էկրանը (env), գլխավոր բաժնի ֆոնը (heroBg) և բացման անիմացիան (open),
   իսկ այստեղ կառուցվում են բաժինները՝ հրավեր, ծրագիր, հետհաշվարկ, դրեսկոդ, RSVP, վայր, և ձյուն/հրավառություն canvas-ով */
(function () {
  "use strict";
  var K = window.K, C = K.C, esc = K.esc, t = K.t, u = K.u, pad = K.pad;
  var TXT = {
    hy: { invite: "Ամանորյա հրավեր", dear: "Սիրելի՛ գործընկերներ", program: "Երեկոյի ծրագիր", left: "Երեկույթին մնացել է", dress: "Դրեսկոդ",
      rsvp: "Հարցաթերթիկ", rsvpLead: "Խնդրում ենք պատասխանել մինչև", venue: "Վայրը", how: "Ինչպես հասնել", fin: "Շնորհավոր Նոր տարի", scroll: "ԹԵՐԹԵՔ ՆԵՐՔԵՎ" },
    ru: { invite: "Новогоднее приглашение", dear: "Дорогие коллеги", program: "Программа вечера", left: "До праздника осталось", dress: "Дресс-код",
      rsvp: "Анкета", rsvpLead: "Пожалуйста, ответьте до", venue: "Место", how: "Как добраться", fin: "С Новым годом", scroll: "ЛИСТАЙТЕ ВНИЗ" }
  };
  var X = {};
  function x(k) { return (X[K.lang] && X[K.lang][k]) || (TXT[K.lang] || TXT.hy)[k]; }
  function dd() { var d = K.date; return pad(d.getDate()) + "." + pad(d.getMonth() + 1) + "." + d.getFullYear(); }
  function tm() { return pad(K.date.getHours()) + ":" + pad(K.date.getMinutes()); }
  var star = '<svg class="st" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1.5l2.5 7.2 7.6.2-6 4.6 2.2 7.3L12 16.5l-6.3 4.3 2.2-7.3-6-4.6 7.6-.2z" fill="currentColor"/></svg>';
  var orn = '<div class="orn rv"><i></i>' + star + "<i></i></div>";

  function sections(o) {
    var h = '<section class="hero" id="hero">' + (o.heroBg || "") + '<div class="wrap">' +
      '<div class="co rv">' + esc(C.company || "") + '</div><div class="eye rv">' + esc(x("invite")) + "</div>" +
      '<h1 class="nm rv">' + esc(t(C.title)) + '</h1><div class="yr rv">' + esc(C.year || "") + "</div>" +
      '<div class="when rv"><span>' + dd() + "</span>" + star + "<span>" + tm() + "</span></div></div>" +
      '<a class="scr" href="#about"><span>' + esc(x("scroll")) + "</span><i></i></a></section>";
    h += '<section id="about"><div class="wrap">' + orn + '<h2 class="h2 rv">' + esc(x("dear")) + '</h2><p class="p rv">' + esc(t(C.text)) + "</p></div></section>";
    h += '<section class="alt"><div class="wrap"><h2 class="h2 rv">' + esc(x("program")) + '</h2><div class="pg">' + (C.events || []).map(function (e, i) {
      return '<div class="e rv" style="--d:' + i * 80 + 'ms"><div class="tm">' + esc(e.time) + '</div><div class="t">' + esc(t(e.title)) + "</div></div>"; }).join("") + "</div></div></section>";
    h += '<section class="cdw"><div class="wrap"><div class="caps rv">' + esc(x("left")) + '</div><div class="cdn rv" data-cd>' + ["days", "hours", "minutes", "seconds"].map(function (k) {
      return '<div><b data-k="' + k + '">00</b><span>' + esc(u(k)) + "</span></div>"; }).join("") + "</div></div></section>";
    if (C.dresscode) h += '<section><div class="wrap"><h2 class="h2 rv">' + esc(x("dress")) + '</h2><p class="p rv">' + esc(t(C.dresscode.text)) + '</p><div class="dots rv">' +
      (C.dresscode.colors || []).map(function (c) { return '<i style="background:' + esc(c) + '"></i>'; }).join("") + "</div></div></section>";
    if (C.rsvp) h += '<section class="alt"><div class="wrap"><h2 class="h2 rv">' + esc(x("rsvp")) + '</h2><p class="p rv">' + esc(x("rsvpLead")) + " " + esc(K.deadline()) + "</p>" +
      '<form class="rs rv" id="rf"><label class="radio"><input type="radio" name="attend" value="yes" checked>' + esc(u("yes")) + "</label>" +
      '<label class="radio"><input type="radio" name="attend" value="no">' + esc(u("no")) + "</label>" +
      '<div class="fl"><label for="rn">' + esc(u("name")) + '</label><input id="rn" name="name" required autocomplete="name"></div>' +
      '<div class="fl"><label for="rg">' + esc(u("guests")) + '</label><select id="rg" name="guests">' + [1, 2, 3, 4].map(function (i) { return "<option>" + i + "</option>"; }).join("") + "</select></div>" +
      '<button class="btn fill" type="submit">' + esc(u("send")) + "</button></form></div></section>";
    var v = C.venue || {};
    h += '<section><div class="wrap"><h2 class="h2 rv">' + esc(x("venue")) + '</h2><div class="vn rv"><div class="vt">' + esc(t(v.place)) + '</div><div class="va">' + esc(t(v.address)) + "</div>" +
      (v.map ? '<a class="btn" href="' + esc(v.map) + '" target="_blank" rel="noopener">' + esc(x("how")) + "</a>" : "") + "</div></div></section>";
    h += '<section class="fin">' + (o.finBg || "") + '<div class="wrap">' + orn + '<div class="ft rv">' + esc(x("fin")) + '</div><div class="co rv">' + esc(C.company || "") + "</div></div></section>" +
      '<div class="made"><a href="https://hravirir.am" target="_blank" rel="noopener">HRAVIRIR.AM</a></div>';
    return h;
  }

  // ձյուն canvas-ով (o.n՝ քանակ, o.color, o.max՝ չափ, o.wind)
  function snow(cv, o) {
    o = o || {};
    if (!cv || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return { storm: function () {} };
    var g = cv.getContext("2d"), W, H, P = [], boost = 0;
    function size() { var r = window.devicePixelRatio || 1; W = cv.clientWidth; H = cv.clientHeight; cv.width = W * r; cv.height = H * r; g.setTransform(r, 0, 0, r, 0, 0); }
    function mk(y) { return { x: Math.random() * W, y: y == null ? Math.random() * H : y, r: .8 + Math.random() * (o.max || 2.6), v: .3 + Math.random() * .9, w: Math.random() * 6.28, a: .4 + Math.random() * .6 }; }
    size(); window.addEventListener("resize", size);
    for (var i = 0; i < (o.n || 80); i++) P.push(mk());
    (function f() {
      g.clearRect(0, 0, W, H); g.fillStyle = o.color || "#fff";
      var b = boost; boost *= .985;
      P.forEach(function (p, i) {
        p.w += .02 + b * .05; p.y += p.v * (1 + b * 3) - b * 2.2 * Math.sin(p.w * 2); p.x += Math.sin(p.w) * (.4 + b * 4) + (o.wind || 0);
        if (p.y > H + 5) P[i] = mk(-5); if (p.y < -10) p.y = H + 4; if (p.x > W + 5) p.x = -5; if (p.x < -5) p.x = W + 5;
        g.globalAlpha = p.a; g.beginPath(); g.arc(p.x, p.y, p.r, 0, 6.283); g.fill();
      });
      g.globalAlpha = 1; requestAnimationFrame(f);
    })();
    return { storm: function () { boost = 1.6; } };
  }
  // հրավառություն canvas-ով. fire(x, y, color)
  function fireworks(cv) {
    var g = cv.getContext("2d"), W, H, P = [], R = [], run = false;
    function size() { var r = window.devicePixelRatio || 1; W = cv.clientWidth; H = cv.clientHeight; cv.width = W * r; cv.height = H * r; g.setTransform(r, 0, 0, r, 0, 0); }
    size(); window.addEventListener("resize", size);
    var COL = ["#ffd36e", "#ff6b9a", "#7ee3ff", "#b48cff", "#fff4d6", "#ff8f5a", "#9dffb0"];
    function boom(x, y, c) { for (var i = 0; i < 90; i++) { var a = Math.random() * 6.283, s = 1 + Math.random() * 4.6; P.push({ x: x, y: y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, l: 1, c: c }); } }
    function loop() {
      g.globalCompositeOperation = "destination-out"; g.fillStyle = "rgba(0,0,0,.22)"; g.fillRect(0, 0, W, H); g.globalCompositeOperation = "lighter";
      R = R.filter(function (r) { r.y += r.vy; r.vy += .28; g.fillStyle = "#fff3c4"; g.beginPath(); g.arc(r.x, r.y, 1.8, 0, 6.283); g.fill(); if (r.vy >= -.4) { boom(r.x, r.y, r.c); return false; } return true; });
      P = P.filter(function (p) { p.vx *= .975; p.vy = p.vy * .975 + .045; p.x += p.vx; p.y += p.vy; p.l -= .011;
        g.globalAlpha = Math.max(0, p.l); g.fillStyle = p.c; g.beginPath(); g.arc(p.x, p.y, 1.7, 0, 6.283); g.fill(); return p.l > 0; });
      g.globalAlpha = 1; g.globalCompositeOperation = "source-over";
      if (P.length || R.length) requestAnimationFrame(loop); else { run = false; g.clearRect(0, 0, W, H); }
    }
    return { fire: function (x, y, c) {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      R.push({ x: x, y: H + 5, vy: -Math.sqrt(2 * .28 * (H - y)), c: c || COL[Math.random() * COL.length | 0] });
      if (!run) { run = true; requestAnimationFrame(loop); } } };
  }

  // o: { txt, env(), heroBg, finBg, open(env, done) }
  function run(o) {
    X = o.txt || {};
    var opened = false;
    function render() {
      document.documentElement.lang = K.lang;
      document.title = (C.company || "") + " · " + t(C.title);
      document.getElementById("app").innerHTML = (opened ? "" : o.env()) + "<main>" + sections(o) + "</main>" + (opened ? K.chrome() : "");
      document.body.classList.toggle("locked", !opened);
      if (opened || K.PREVIEW) document.getElementById("hero").classList.add("go");
      if (!opened) { var e = document.getElementById("env"); if (e && !K.PREVIEW) e.onclick = open; if (o.ready) o.ready(e); } else K.reveal();
      if (o.after) o.after();
      K.countdown(true); K.rsvp(document.getElementById("rf")); K.bindChrome(render);
    }
    function open() {
      var env = document.getElementById("env"); if (env.dataset.busy) return; env.dataset.busy = "1";
      K.music.play();
      o.open(env, function () {
        opened = true; document.body.classList.remove("locked"); document.getElementById("hero").classList.add("go");
        document.getElementById("app").insertAdjacentHTML("beforeend", K.chrome()); K.bindChrome(render); K.reveal();
        env.classList.add("out"); setTimeout(function () { env.remove(); }, 900);
      });
    }
    render();
  }
  window.NY = { run: run, snow: snow, fireworks: fireworks, x: x, dd: dd, tm: tm, star: star };
})();
