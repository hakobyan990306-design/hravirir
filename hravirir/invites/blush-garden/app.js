/* «Վարդագույն այգի» դիզայնի դասավորությունը */
(function () {
  "use strict";
  var K = window.K, C = K.C, esc = K.esc, t = K.t, u = K.u, pad = K.pad;

  var TXT = {
    hy: { t1: "Հրավեր", t2: "մեր հարսանիքին", hint: "Սեղմեք կնիքին", program: "Օրվա ծրագիր", musicRing: "ՍԵՂՄԵՔ • ԵՐԱԺՇՏՈՒԹՅԱՆ ՀԱՄԱՐ • ", where: "Որտեղ", route: "Ճանապարհը", dress: "Դրեսկոդ", details: "Մանրամասներ",
      left: "Մինչև մեր օրը", rsvp: "Կգա՞ք", rsvpLead: "Խնդրում ենք հաստատել Ձեր մասնակցությունը մինչև", waiting: "Սիրով սպասում ենք",
      wdl: ["Կիրակի", "Երկուշաբթի", "Երեքշաբթի", "Չորեքշաբթի", "Հինգշաբթի", "Ուրբաթ", "Շաբաթ"] },
    ru: { t1: "Приглашение", t2: "на свадьбу", hint: "Нажмите на печать", program: "Программа дня", musicRing: "НАЖМИТЕ • ЧТОБЫ ВКЛЮЧИТЬ МУЗЫКУ • ", where: "Где", route: "Построить маршрут", dress: "Дресс-код", details: "Детали",
      left: "До нашего дня", rsvp: "Вы придёте?", rsvpLead: "Пожалуйста, подтвердите присутствие до", waiting: "С любовью ждём",
      wdl: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"] },
    en: { t1: "Invitation", t2: "to our wedding", hint: "Tap the seal", program: "The day", musicRing: "TAP • TO PLAY THE MUSIC • ", where: "Where", route: "Get directions", dress: "Dress code", details: "Details",
      left: "Until our day", rsvp: "Will you come?", rsvpLead: "Kindly confirm by", waiting: "With love, we're waiting",
      wdl: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] }
  };
  function x(k) { return (TXT[K.lang] || TXT.hy)[k]; }

  // կայուն «պատահական» թվեր, որ պատռված եզրը ամեն անգամ նույնը լինի
  function rng(seed) { return function () { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }; }
  function torn(cls, seed) {
    var r = rng(seed || 7), d = "M0 34L0 " + (8 + r() * 10).toFixed(1);
    for (var xx = 1.5; xx < 100; xx += 1.5 + r() * 2) d += "L" + xx.toFixed(1) + " " + (4 + r() * 16 + (r() > .85 ? 6 : 0)).toFixed(1);
    d += "L100 " + (8 + r() * 10).toFixed(1) + "L100 34Z";
    return '<svg class="torn ' + cls + '" viewBox="0 0 100 34" preserveAspectRatio="none" aria-hidden="true"><path d="' + d + '"/></svg>';
  }
  var HEART = "M30 54C12 42 2 31 3 18 4 8 13 2 21 4c4 1 7 4 9 8 2-4 5-7 9-8 8-2 17 4 18 14 1 13-9 24-27 36z";
  function sealSVG() {
    var n = K.names(), mono = n.length === 2 ? n[0].charAt(0) + "&" + n[1].charAt(0) : (n[0] || "").charAt(0);
    var pts = [], m = 30, d;
    for (var i = 0; i < m; i++) { var a = i / m * Math.PI * 2, rr = 46 + Math.sin(i * 2.1) * 2.2 + Math.cos(i * 1.3) * 1.3; pts.push([50 + Math.cos(a) * rr, 50 + Math.sin(a) * rr]); }
    d = "M" + pts[0].join(" ");
    for (var j = 1; j <= m; j++) { var p = pts[j % m], q = pts[j - 1]; d += "Q" + q[0].toFixed(1) + " " + q[1].toFixed(1) + " " + ((p[0] + q[0]) / 2).toFixed(1) + " " + ((p[1] + q[1]) / 2).toFixed(1); }
    return '<svg viewBox="0 0 100 100" aria-hidden="true"><defs><radialGradient id="bs" cx="36%" cy="30%" r="80%"><stop offset="0" stop-color="#efd0ad"/><stop offset=".5" stop-color="#b98a5e"/><stop offset="1" stop-color="#6b4526"/></radialGradient></defs>' +
      '<path d="' + d + 'Z" fill="url(#bs)"/><circle cx="50" cy="50" r="31" fill="none" stroke="#6b4526" stroke-width="1.5" opacity=".55"/><circle cx="50" cy="50" r="27" fill="none" stroke="#f5dcc0" stroke-width=".6" opacity=".7"/>' +
      '<text x="50" y="58" text-anchor="middle" font-size="24" font-family="Dzeragir, cursive" fill="#5a381c">' + esc(mono) + "</text></svg>";
  }
  function flaps(W, H) {
    var c = W / 2, m = H / 2;
    var P = {
      t: "M0 0H" + W + "L" + (c + 22) + " " + (H * .53 - 14) + "Q" + c + " " + (H * .53 + 4) + " " + (c - 22) + " " + (H * .53 - 14) + "Z",
      b: "M0 " + H + "L" + (c - 24) + " " + (H * .47 + 16) + "Q" + c + " " + (H * .47 - 4) + " " + (c + 24) + " " + (H * .47 + 16) + "L" + W + " " + H + "Z",
      l: "M0 0L" + c + " " + m + "L0 " + H + "Z",
      r: "M" + W + " 0L" + c + " " + m + "L" + W + " " + H + "Z"
    };
    var G = { t: ["#a39c6f", "#8e875a"], b: ["#8a8357", "#9a9366"], l: ["#7b744b", "#8a8357"], r: ["#7b744b", "#8a8357"] };
    var vb = 'viewBox="0 0 ' + W + " " + H + '" preserveAspectRatio="none"';
    var h = "";
    ["r", "l", "b", "t"].forEach(function (k) {
      var gid = "g" + k, vert = k === "t" || k === "b";
      var grad = '<defs><linearGradient id="' + gid + '" x1="0" y1="0" x2="' + (vert ? 0 : 1) + '" y2="' + (vert ? 1 : 0) + '"><stop offset="0" stop-color="' + G[k][0] + '"/><stop offset="1" stop-color="' + G[k][1] + '"/></linearGradient>' +
        '<filter id="s' + k + '" x="-5%" y="-5%" width="110%" height="120%"><feGaussianBlur stdDeviation="6"/></filter></defs>';
      var shadow = k === "t" ? '<path d="' + P.t + '" fill="#000" opacity=".25" filter="url(#st)" transform="translate(0 8)"/>' : k === "b" ? '<path d="' + P.b + '" fill="#000" opacity=".18" filter="url(#sb)" transform="translate(0 -6)"/>' : "";
      h += '<div class="ef ' + k + '"><svg ' + vb + ">" + grad + shadow + '<path d="' + P[k] + '" fill="url(#' + gid + ')"/><path d="' + P[k] + '" fill="none" stroke="rgba(255,255,255,.16)"/></svg>' +
        '</div>';
    });
    return h;
  }

  /* ---------- Բաժիններ ---------- */
  function envelope() {
    var g = K.guest();
    return '<div class="env" id="env"><div id="flaps"></div><div class="env-title"><div class="a">' + esc(x("t1")) + '</div><div class="b">' + esc(x("t2")) + "</div></div>" +
      '<button class="seal" id="seal" aria-label="' + esc(u("tap")) + '">' + sealSVG() + "</button>" +
      '<div class="env-to">' + (g ? esc(C.dear != null ? t(C.dear) : u("dear")) + "<b>" + esc(g) + "</b>" : "") +
      (K.PREVIEW ? "" : '<div class="env-hint">' + esc(x("hint")) + "</div>") + "</div></div>";
  }
  function musicBtn() {
    if (!C.music) return "";
    return '<button class="mbtn" data-music aria-label="music"><svg viewBox="0 0 100 100"><defs><path id="rp" d="M50 50m-38 0a38 38 0 1 1 76 0a38 38 0 1 1-76 0"/></defs>' +
      '<circle cx="50" cy="50" r="48" fill="#ecccc5"/><g class="ring"><text font-size="8.6" letter-spacing="1.2" fill="#3b2923" font-family="Noto Sans Armenian, sans-serif"><textPath href="#rp">' + esc(x("musicRing")) + "</textPath></text></g>" +
      '<circle cx="50" cy="50" r="22" fill="#6f6a3e"/><path d="M45 40v20l16-10z" fill="#f7ebe6"/></svg></button>';
  }
  function hero() {
    var n = K.names(), d = K.date;
    var fx = "";
    if (C.heroFx) {
      fx = '<div class="rays"></div><div class="petals">';
      for (var i = 0; i < 16; i++) fx += '<i style="left:' + (i * 6.5 + (i % 3) * 2).toFixed(1) + '%;--d:' + (9 + (i * 7) % 8) + 's;--dl:-' + ((i * 1.7) % 9).toFixed(1) + 's;--s:' + (8 + (i * 5) % 9) + 'px;--x:' + ((i % 2 ? 1 : -1) * (30 + (i * 13) % 50)) + 'px"></i>';
      fx += '</div><div class="glints">';
      for (var j = 0; j < 14; j++) fx += '<i style="left:' + ((j * 37) % 100) + '%;top:' + ((j * 53) % 70 + 5) + '%;--d:' + (3 + j % 4) + 's;--dl:-' + (j % 5) + 's"></i>';
      fx += "</div>";
    }
    // Անիմացիոն տեսարան (նկար + արև, շատրվան, լապտերներ, թռչուններ)։ Կոորդինատները՝ նկարի %-ով
    var S = C.scene, scene = "";
    if (S) {
      var pos = function (p) { return "left:" + p[0] + "%;top:" + p[1] + "%"; };
      scene = '<div class="scene"><img src="' + esc(S.src) + '" alt="" fetchpriority="high">';
      if (S.sun) scene += '<div class="sunrays" style="' + pos(S.sun) + '"></div><div class="sun" style="' + pos(S.sun) + '"></div>';
      (S.lamps || []).forEach(function (p, k) { scene += '<i class="lamp" style="' + pos(p) + ";animation-delay:-" + (k * .7).toFixed(1) + 's"></i>'; });
      if (S.fountain) {
        scene += '<div class="fount" style="' + pos(S.fountain) + '">';
        for (var q = 0; q < 12; q++) scene += '<i style="--a:' + (q * 30) + "deg;--d:" + (1.1 + (q % 4) * .2).toFixed(1) + "s;--dl:-" + (q * .13).toFixed(2) + 's"></i>';
        scene += "</div>";
      }
      scene += '<svg class="birds" viewBox="0 0 100 40" aria-hidden="true"><g fill="none" stroke="#6d4a45" stroke-width="1.1" stroke-linecap="round">' +
        '<path class="bd b1" d="M10 10q3-3 6 0q3-3 6 0"/><path class="bd b2" d="M24 18q2-2 4 0q2-2 4 0"/><path class="bd b3" d="M4 22q2.5-2.5 5 0q2.5-2.5 5 0"/></g></svg>';
      scene += "</div>";
    }
    var art = !!S;
    return '<section class="hero' + (art ? " art" : "") + (K.PREVIEW ? " go" : "") + '" id="hero"><div class="bg"' + (!art && C.photo ? ' style="background-image:url(\'' + esc(C.photo) + '\')"' : "") + ">" + scene + "</div>" + fx + '<div class="hero-in"><div class="nm">' +
      (n.length === 2 ? esc(n[0]) + "<i>&amp;</i>" + esc(n[1]) : esc(n.join(" "))) + '</div><div class="dt">' + pad(d.getDate()) + "/" + pad(d.getMonth() + 1) + "</div></div>" +
      musicBtn() + torn("b", 11) + "</section>";
  }
  function greeting() {
    var d = K.date, cols = [-1, 0, 1].map(function (o) {
      var dd = new Date(d.getFullYear(), d.getMonth(), d.getDate() + o);
      return '<div class="dcol' + (o === 0 ? " on" : "") + '"><div class="wd">' + esc(x("wdl")[dd.getDay()]) + "</div><b>" + dd.getDate() + '</b><div class="mo">' + esc(u("monthsGen")[dd.getMonth()]) + "</div>" +
        (o === 0 ? '<svg class="pencil" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="M58 7C84 9 98 29 95 53C92 79 70 95 46 93C21 91 5 73 6 50C7 26 26 9 49 7C63 6 76 11 83 19"/><path class="p2" d="M44 10C70 5 93 20 96 45C99 72 80 92 52 95C26 97 7 80 4 56C2 33 16 15 38 10"/></svg>' : "") + "</div>";
    }).join("");
    return '<section><div class="wrap"><h2 class="h rv">' + esc(t(C.greeting)) + '</h2><p class="p rv d1">' + esc(t(C.text)) + '</p><div class="days3 rv d2">' + cols + "</div></div></section>";
  }
  function timeline() {
    var tm = C.timing || []; if (!tm.length) return "";
    return '<section class="tl" id="tl"><svg class="tl-line" id="tlsvg" aria-hidden="true"><path class="ghost"/><path class="draw"/></svg>' +
      '<svg class="tl-heart" id="tlh" viewBox="0 0 60 56" aria-hidden="true"><path d="' + HEART + '" fill="#6f6a3e"/></svg>' +
      '<div class="wrap"><h2 class="h rv">' + esc(x("program")) + '</h2><div class="tl-start"></div>' + tm.map(function (r, i) {
        return '<div class="tli rv ' + (i % 2 ? "r" : "l") + '"><div><div class="hand">' + esc(t(r.text)) + '</div><div class="tm">' + esc(r.time) + "</div>" +
          (r.place ? '<div class="pl">' + esc(t(r.place)) + "</div>" : "") +
          (r.map ? '<a class="mp" href="' + esc(r.map) + '" target="_blank" rel="noopener">' + esc(u("map")) + " →</a>" : "") + "</div></div>";
      }).join("") + '<div class="tl-end"></div></div></section>';
  }
  /* Գիծը անցնում է տեքստերի կողքով. ձախ տեքստի դեպքում՝ աջից, աջի դեպքում՝ ձախից */
  var tlPath = null, tlLen = 0;
  function layoutTimeline() {
    var sec = document.getElementById("tl"); if (!sec) return;
    var svg = document.getElementById("tlsvg"), W = sec.clientWidth, H = sec.clientHeight;
    svg.setAttribute("width", W); svg.setAttribute("height", H); svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    // դիրքերը՝ offset-ներով (transform-ը՝ հայտնվելու անիմացիան, չի խանգարում)
    function rel(el) { var x0 = 0, y0 = 0; while (el && el !== sec) { x0 += el.offsetLeft; y0 += el.offsetTop; el = el.offsetParent; } return [x0, y0]; }
    var st = rel(sec.querySelector(".tl-start")), en = rel(sec.querySelector(".tl-end"));
    var pts = [[W / 2, st[1] + 10]];
    sec.querySelectorAll(".tli").forEach(function (it) {
      var box = it.firstElementChild, b = rel(box), y = rel(it)[1] + it.offsetHeight / 2;
      var right = it.classList.contains("l");
      // կետը տեքստի մյուս կողմում, տեքստից առնվազն 40px հեռու
      var xx = right ? Math.min(W - 16, Math.max(b[0] + box.offsetWidth + 40, W * .8)) : Math.max(16, Math.min(b[0] - 40, W * .2));
      pts.push([xx, y]);
    });
    pts.push([W / 2, en[1] + 20]);
    // Catmull-Rom → Bezier՝ սահուն կոր
    var d = "M" + pts[0][0].toFixed(1) + " " + pts[0][1].toFixed(1);
    for (var i = 0; i < pts.length - 1; i++) {
      var p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
      var c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6], c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += "C" + c1[0].toFixed(1) + " " + c1[1].toFixed(1) + " " + c2[0].toFixed(1) + " " + c2[1].toFixed(1) + " " + p2[0].toFixed(1) + " " + p2[1].toFixed(1);
    }
    svg.querySelector(".ghost").setAttribute("d", d);
    tlPath = svg.querySelector(".draw"); tlPath.setAttribute("d", d);
    tlLen = tlPath.getTotalLength();
    tlPath.style.strokeDasharray = tlLen; moveHeart();
  }
  // Սրտիկը իջնում է գծով՝ ըստ թերթման
  function moveHeart() {
    var sec = document.getElementById("tl"), h = document.getElementById("tlh"); if (!sec || !tlPath) return;
    var r = sec.getBoundingClientRect(), vh = window.innerHeight;
    var p = K.PREVIEW ? 1 : Math.max(0, Math.min(1, (vh * .55 - r.top) / r.height));
    var pt = tlPath.getPointAtLength(p * tlLen);
    tlPath.style.strokeDashoffset = tlLen * (1 - p);
    h.style.transform = "translate(" + pt.x.toFixed(1) + "px," + pt.y.toFixed(1) + "px)";
  }
  var ticking = false;
  window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(function () { ticking = false; moveHeart(); }); } }, { passive: true });
  function venue() {
    var v = C.venue; if (!v) return "";
    return '<section style="padding-bottom:0"><div class="wrap"><h2 class="h rv">' + esc(x("where")) + '</h2><div class="addr rv d1">' + esc(t(v.place)) + "<br>" + esc(t(v.address)) + "</div>" +
      (v.map ? '<a class="round rv d2" href="' + esc(v.map) + '" target="_blank" rel="noopener">' + esc(x("route")) + "</a>" : "") + "</div>" +
      (v.photo ? '<div class="venue-photo" style="background-image:url(\'' + esc(v.photo) + '\')">' + torn("t", 23) + torn("b", 31) + "</div>" : "") + "</section>";
  }
  function dress() {
    var dc = C.dresscode; if (!dc) return "";
    return '<section><div class="wrap"><h2 class="h rv">' + esc(x("dress")) + '</h2><p class="p rv d1">' + esc(t(dc.text)) + "</p>" +
      '<div class="dots rv d2">' + (dc.colors || []).map(function (c) { return '<i style="background:' + esc(c) + '"></i>'; }).join("") + "</div></div></section>";
  }
  function details() {
    if (!C.details) return "";
    return '<section class="details"' + (C.detailsPhoto ? ' style="background-image:url(\'' + esc(C.detailsPhoto) + '\')"' : "") + ">" + torn("t", 41) +
      '<div class="wrap"><h2 class="h rv">' + esc(x("details")) + "</h2>" + K.list(C.details).map(function (p) { return '<p class="p rv" style="margin-top:14px">' + esc(p) + "</p>"; }).join("") + "</div>" + torn("b", 53) + "</section>";
  }
  function countdown() {
    return '<section><div class="wrap"><h2 class="h rv">' + esc(x("left")) + '</h2><div class="cdn rv d1" data-cd>' + ["days", "hours", "minutes", "seconds"].map(function (k) {
      return (k !== "days" ? "<i>:</i>" : "") + '<div><b data-k="' + k + '">00</b><span>' + esc(u(k)) + "</span></div>";
    }).join("") + "</div></div></section>";
  }
  function rsvp() {
    if (!C.rsvp) return "";
    return '<section style="padding-top:20px"><div class="wrap"><h2 class="h rv">' + esc(x("rsvp")) + '</h2><p class="p rv d1">' + esc(x("rsvpLead")) + " " + esc(K.deadline()) + "</p>" +
      '<form class="rs rv d2" id="rf"><label class="radio"><input type="radio" name="attend" value="yes" checked>' + esc(u("yes")) + "</label>" +
      '<label class="radio"><input type="radio" name="attend" value="no">' + esc(u("no")) + "</label>" +
      '<div class="fl"><label for="rn">' + esc(u("name")) + '</label><input id="rn" name="name" required autocomplete="name"></div>' +
      '<div class="fl"><label for="rg">' + esc(u("guests")) + '</label><select id="rg" name="guests">' + [1, 2, 3, 4, 5, 6].map(function (n) { return "<option>" + n + "</option>"; }).join("") + "</select></div>" +
      '<div class="fl"><label for="rm">' + esc(u("note")) + '</label><input id="rm" name="note"></div>' +
      '<button class="round" type="submit">' + esc(u("send")) + "</button></form></div></section>";
  }
  function fin() {
    return '<section class="fin"><div class="wrap"><div class="p rv">' + esc(t(C.finalText) || x("waiting")) + '</div><div class="nm rv d1">' + K.names().map(esc).join('<span class="amp">&amp;</span>') + "</div></div></section>" +
      '<div class="made"><a href="https://hravirir.am" target="_blank" rel="noopener">HRAVIRIR.AM</a></div>';
  }

  /* ---------- Հավաքում ---------- */
  var opened = false;
  function render() {
    document.documentElement.lang = K.lang;
    document.title = K.names().join(" & ") + " — " + x("t1");
    document.getElementById("app").innerHTML = (opened ? "" : envelope()) +
      "<main>" + hero() + greeting() + timeline() + venue() + dress() + details() + countdown() + rsvp() + fin() + "</main>" + (opened ? K.chrome() : "");
    document.body.classList.toggle("locked", !opened);
    if (!opened) { shape(); var s = document.getElementById("seal"); if (s && !K.PREVIEW) s.onclick = open; }
    K.countdown(true); K.rsvp(document.getElementById("rf")); K.bindChrome(render);
    if (opened) { document.getElementById("hero").classList.add("go"); K.reveal(); }
    layoutTimeline();
  }
  function shape() { var env = document.getElementById("env"); if (env) document.getElementById("flaps").innerHTML = flaps(env.clientWidth, env.clientHeight); }
  function open() {
    var env = document.getElementById("env"); if (env.classList.contains("open")) return;
    K.music.play(); env.classList.add("open");
    document.getElementById("hero").classList.add("go");   // նկարը մեղմ մոտենում է, հետո «գրվում» են անունները
    setTimeout(function () {
      opened = true; document.body.classList.remove("locked");
      document.getElementById("app").insertAdjacentHTML("beforeend", K.chrome()); K.bindChrome(render); K.reveal(); layoutTimeline();
    }, 2500);
    setTimeout(function () { env.remove(); }, 2900);
  }
  var rt; window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(function () { if (!opened) shape(); layoutTimeline(); }, 150); });
  render();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(layoutTimeline);
})();
