/* «Տարեդարձ» (կորպորատիվ)՝ ար-դեկո զմրուխտ և ոսկի. մեծ ոսկե թիվ (տարիներ) արևի ճառագայթների ֆոնին,
   սեղմելիս ճառագայթները պտտվում ու լայնանում են, ոսկե կոնֆետի. էջում՝ ընկերության պատմություն, երեկոյի ծրագիր */
(function () {
  "use strict";
  var K = window.K, C = K.C, esc = K.esc, t = K.t, u = K.u, pad = K.pad;
  var TXT = {
    hy: { hint: "Սեղմեք էկրանին", years: "ՏԱՐԻ", jub: "Տարեդարձ", invite: "Սիրով հրավիրում ենք", story: "Մեր պատմությունը", program: "Երեկոյի ծրագիր",
      dress: "Դրեսկոդ", rsvp: "Հարցաթերթիկ", rsvpLead: "Խնդրում ենք պատասխանել մինչև", company: "Ընկերություն", left: "Երեկոյին մնացել է",
      venue: "Վայրը", how: "Ինչպես հասնել", fin: "Շնորհակալ ենք, որ մեզ հետ եք", scroll: "ԹԵՐԹԵՔ ՆԵՐՔԵՎ" },
    ru: { hint: "Нажмите на экран", years: "ЛЕТ", jub: "Юбилей", invite: "С удовольствием приглашаем", story: "Наша история", program: "Программа вечера",
      dress: "Дресс-код", rsvp: "Анкета", rsvpLead: "Пожалуйста, ответьте до", company: "Компания", left: "До вечера осталось",
      venue: "Место", how: "Как добраться", fin: "Спасибо, что вы с нами", scroll: "ЛИСТАЙТЕ ВНИЗ" }
  };
  function x(k) { return (TXT[K.lang] || TXT.hy)[k]; }
  function dd() { var d = K.date; return pad(d.getDate()) + "." + pad(d.getMonth() + 1) + "." + d.getFullYear(); }
  function tm() { return pad(K.date.getHours()) + ":" + pad(K.date.getMinutes()); }
  // ար-դեկո ճառագայթներ (SVG)
  function rays(n) {
    var h = "";
    for (var i = 0; i < n; i++) { var a = i * 360 / n; h += '<path d="M200 200 L' + (200 + 260 * Math.sin((a - 3.2) * Math.PI / 180)).toFixed(1) + " " + (200 - 260 * Math.cos((a - 3.2) * Math.PI / 180)).toFixed(1) + " L" + (200 + 260 * Math.sin((a + 3.2) * Math.PI / 180)).toFixed(1) + " " + (200 - 260 * Math.cos((a + 3.2) * Math.PI / 180)).toFixed(1) + 'Z"/>'; }
    return '<svg class="rays" viewBox="0 0 400 400" aria-hidden="true"><defs><radialGradient id="rg" gradientUnits="userSpaceOnUse" cx="200" cy="200" r="260"><stop offset="0" stop-color="#f3dca0" stop-opacity=".32"/><stop offset=".55" stop-color="#c9a45c" stop-opacity=".12"/><stop offset="1" stop-color="#c9a45c" stop-opacity="0"/></radialGradient></defs><g fill="url(#rg)">' + h + "</g></svg>";
  }
  // ար-դեկո անկյուններ
  var corners = '<i class="cr tl"></i><i class="cr tr"></i><i class="cr bl"></i><i class="cr br"></i>';

  function envelope() {
    return '<div class="env" id="env" role="button" aria-label="' + esc(x("hint")) + '">' + rays(36) + '<canvas class="cf" id="cf"></canvas>' +
      '<div class="frame">' + corners + '<div class="co">' + esc(C.company || "") + '</div><div class="big">' + esc(C.years || "") + '</div><div class="yr">' + esc(x("years")) + "</div>" +
      '<div class="dv"><i></i><b></b><i></i></div><div class="tt">' + esc(t(C.title)) + '</div><div class="dt">' + dd() + " · " + tm() + "</div></div>" +
      (K.PREVIEW ? "" : '<div class="hint">' + esc(x("hint")) + "</div>") + "</div>";
  }
  function hero() {
    return '<section class="hero" id="hero">' + rays(28) + '<div class="wrap">' +
      '<div class="co rv">' + esc(C.company || "") + '</div><div class="big rv">' + esc(C.years || "") + '<small>' + esc(x("years")) + "</small></div>" +
      '<h1 class="nm rv">' + esc(t(C.title)) + '</h1><div class="when rv"><span>' + dd() + "</span><i></i><span>" + tm() + "</span></div></div>" +
      '<a class="scr" href="#about"><span>' + esc(x("scroll")) + "</span><i></i></a></section>";
  }
  var dv = '<div class="dv rv"><i></i><b></b><i></i></div>';
  function about() { return '<section id="about"><div class="wrap">' + dv + '<h2 class="h2 rv">' + esc(x("invite")) + '</h2><p class="p rv">' + esc(t(C.text)) + "</p></div></section>"; }
  function story() {
    if (!C.milestones) return "";
    return '<section class="dark"><div class="wrap"><h2 class="h2 rv">' + esc(x("story")) + '</h2><div class="ms">' + C.milestones.map(function (m, i) {
      return '<div class="m rv" style="--d:' + i * 90 + 'ms"><b>' + esc(m[0]) + "</b><span>" + esc(t(m[1])) + "</span></div>";
    }).join("") + "</div></div></section>";
  }
  function program() {
    return '<section><div class="wrap"><h2 class="h2 rv">' + esc(x("program")) + '</h2><div class="pg">' + (C.events || []).map(function (e) {
      return '<div class="e rv"><div class="tm">' + esc(e.time) + '</div><div class="t">' + esc(t(e.title)) + "</div></div>";
    }).join("") + "</div></div></section>";
  }
  function countdown() {
    return '<section class="dark"><div class="wrap"><div class="caps rv">' + esc(x("left")) + '</div><div class="cdn rv" data-cd>' + ["days", "hours", "minutes", "seconds"].map(function (k) {
      return '<div><b data-k="' + k + '">00</b><span>' + esc(u(k)) + "</span></div>"; }).join("") + "</div></div></section>";
  }
  function dress() {
    if (!C.dresscode) return "";
    return '<section><div class="wrap"><h2 class="h2 rv">' + esc(x("dress")) + '</h2><p class="p rv">' + esc(t(C.dresscode.text)) + '</p><div class="dots rv">' +
      (C.dresscode.colors || []).map(function (c) { return '<i style="background:' + esc(c) + '"></i>'; }).join("") + "</div></div></section>";
  }
  function rsvp() {
    if (!C.rsvp) return "";
    return '<section class="dark"><div class="wrap"><h2 class="h2 rv">' + esc(x("rsvp")) + '</h2><p class="p rv">' + esc(x("rsvpLead")) + " " + esc(K.deadline()) + "</p>" +
      '<form class="rs rv" id="rf"><label class="radio"><input type="radio" name="attend" value="yes" checked>' + esc(u("yes")) + "</label>" +
      '<label class="radio"><input type="radio" name="attend" value="no">' + esc(u("no")) + "</label>" +
      '<div class="fl"><label for="rn">' + esc(u("name")) + '</label><input id="rn" name="name" required autocomplete="name"></div>' +
      '<div class="fl"><label for="rg">' + esc(u("guests")) + '</label><select id="rg" name="guests">' + [1, 2, 3, 4].map(function (i) { return "<option>" + i + "</option>"; }).join("") + "</select></div>" +
      '<button class="btn fill" type="submit">' + esc(u("send")) + "</button></form></div></section>";
  }
  function venue() {
    var v = C.venue || {};
    return '<section><div class="wrap"><h2 class="h2 rv">' + esc(x("venue")) + '</h2><div class="vn rv">' + corners + '<div class="vt">' + esc(t(v.place)) + '</div><div class="va">' + esc(t(v.address)) + "</div>" +
      (v.map ? '<a class="btn" href="' + esc(v.map) + '" target="_blank" rel="noopener">' + esc(x("how")) + "</a>" : "") + "</div></div></section>";
  }
  function fin() {
    return '<section class="dark fin"><div class="wrap">' + dv + '<div class="caps rv">' + esc(x("fin")) + '</div><div class="co rv">' + esc(C.company || "") + "</div></div></section>" +
      '<div class="made"><a href="https://hravirir.am" target="_blank" rel="noopener">HRAVIRIR.AM</a></div>';
  }
  // ոսկե կոնֆետի
  function confetti(cv) {
    if (!cv || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var g = cv.getContext("2d"), r = window.devicePixelRatio || 1, W = cv.clientWidth, H = cv.clientHeight, P = [], t0 = performance.now();
    cv.width = W * r; cv.height = H * r; g.setTransform(r, 0, 0, r, 0, 0);
    var col = ["#f3dca0", "#c9a45c", "#fff4d6", "#9c7a35", "#1f7a66"];
    for (var i = 0; i < 160; i++) { var a = Math.random() * 6.283, s = 3 + Math.random() * 9; P.push({ x: W / 2, y: H * .45, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 3, w: 4 + Math.random() * 6, h: 2 + Math.random() * 4, rt: Math.random() * 6, vr: (Math.random() - .5) * .3, c: col[i % col.length] }); }
    (function f(tt) {
      var e = tt - t0; g.clearRect(0, 0, W, H);
      P.forEach(function (p) { p.vx *= .985; p.vy = p.vy * .985 + .12; p.x += p.vx; p.y += p.vy; p.rt += p.vr;
        g.save(); g.globalAlpha = Math.max(0, 1 - e / 2600); g.translate(p.x, p.y); g.rotate(p.rt); g.fillStyle = p.c; g.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); g.restore(); });
      if (e < 2600) requestAnimationFrame(f);
    })(t0);
  }

  var opened = false;
  function render() {
    document.documentElement.lang = K.lang;
    document.title = (C.company || "") + " · " + t(C.title);
    document.getElementById("app").innerHTML = (opened ? "" : envelope()) + "<main>" + hero() + about() + story() + program() + countdown() + dress() + rsvp() + venue() + fin() + "</main>" + (opened ? K.chrome() : "");
    document.body.classList.toggle("locked", !opened);
    if (opened || K.PREVIEW) document.getElementById("hero").classList.add("go");
    if (!opened) { var e = document.getElementById("env"); if (e && !K.PREVIEW) e.onclick = open; } else K.reveal();
    K.countdown(true); K.rsvp(document.getElementById("rf")); K.bindChrome(render);
  }
  function open() {
    var env = document.getElementById("env"); if (env.dataset.busy) return; env.dataset.busy = "1";
    K.music.play();
    env.classList.add("s1"); confetti(document.getElementById("cf"));
    setTimeout(function () { env.classList.add("s2"); document.getElementById("hero").classList.add("go"); }, 1500);
    setTimeout(function () {
      opened = true; document.body.classList.remove("locked");
      document.getElementById("app").insertAdjacentHTML("beforeend", K.chrome()); K.bindChrome(render); K.reveal();
    }, 2200);
    setTimeout(function () { env.remove(); }, 2900);
  }
  render();
})();
