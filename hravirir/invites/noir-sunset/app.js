/* «Սև-ոսկի մայրամուտ» դիզայնի դասավորությունը */
(function () {
  "use strict";
  var K = window.K, C = K.C, esc = K.esc, t = K.t, u = K.u, pad = K.pad;

  var TXT = {
    hy: { together: "Մեր ընտանիքների հետ միասին", and: "և", request: "սիրով հրավիրում ենք Ձեզ մեր հարսանիքին", at: "Ժամը", hint: "Սեղմեք կնիքին",
      the: "Մեր", program: "Ծրագիրը", details: "Մանրամասներ", please: "Խնդրում ենք", by: "Մինչև", thx: "Շնորհակալություն",
      dear: "Հարգելի՛", attend: "Ձեր պատասխանը", wdl: ["Կիրակի", "Երկուշաբթի", "Երեքշաբթի", "Չորեքշաբթի", "Հինգշաբթի", "Ուրբաթ", "Շաբաթ"], dress: "Դրեսկոդ" },
    ru: { together: "Вместе с нашими семьями", and: "и", request: "приглашаем вас на нашу свадьбу", at: "В", hint: "Нажмите на печать",
      the: "The", program: "Программа", details: "Детали", please: "please", by: "До", thx: "спасибо",
      dear: "Дорогие", attend: "Ваш ответ", wdl: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"], dress: "Дресс-код" },
    en: { together: "Together with their families", and: "and", request: "request the pleasure of your company", at: "At", hint: "Tap the seal",
      the: "The", program: "Program", details: "Details", please: "please", by: "By", thx: "thank you",
      dear: "Dear", attend: "Your reply", wdl: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], dress: "Dress code" }
  };
  function x(k) { return (TXT[K.lang] || TXT.hy)[k]; }

  var IC = {
    rings: '<svg class="ic" viewBox="0 0 40 40"><circle cx="15" cy="24" r="9"/><circle cx="25" cy="24" r="9"/><path d="M22 10l3-4 3 4-3 3z"/></svg>',
    glass: '<svg class="ic" viewBox="0 0 40 40"><path d="M10 6h9l-1 10a3.5 3.5 0 0 1-7 0zM14.5 20v13M10 34h9M21 6h9l-1 10a3.5 3.5 0 0 1-7 0zM25.5 20v13M21 34h9"/></svg>',
    camera: '<svg class="ic" viewBox="0 0 40 40"><rect x="5" y="12" width="30" height="20" rx="3"/><path d="M14 12l2-4h8l2 4"/><circle cx="20" cy="22" r="6"/></svg>',
    dinner: '<svg class="ic" viewBox="0 0 40 40"><circle cx="20" cy="21" r="10"/><circle cx="20" cy="21" r="6"/><path d="M5 9v7a2 2 0 0 0 4 0V9M7 9v24M35 9c-3 2-3 9 0 11v13"/></svg>',
    party: '<svg class="ic" viewBox="0 0 40 40"><path d="M8 33l8-20 11 11z"/><path d="M22 10c2-3 5-3 6 0M28 16c3-1 5 1 4 4M30 8l1-3M34 12l3-1"/></svg>',
    cake: '<svg class="ic" viewBox="0 0 40 40"><path d="M8 34h24V22H8zM12 22v-7h16v7M20 15V9M8 27c4 3 8 3 12 0s8-3 12 0"/></svg>'
  };
  function sealSVG() {
    var n = K.names(), mono = n.length === 2 ? n[0].charAt(0) + n[1].charAt(0) : (n[0] || "").charAt(0), pts = [], m = 30, d;
    for (var i = 0; i < m; i++) { var a = i / m * Math.PI * 2, r = 46 + Math.sin(i * 2.5) * 2 + Math.cos(i * 1.4) * 1.4; pts.push([50 + Math.cos(a) * r, 50 + Math.sin(a) * r]); }
    d = "M" + pts[0].join(" ");
    for (var j = 1; j <= m; j++) { var p = pts[j % m], q = pts[j - 1]; d += "Q" + q[0].toFixed(1) + " " + q[1].toFixed(1) + " " + ((p[0] + q[0]) / 2).toFixed(1) + " " + ((p[1] + q[1]) / 2).toFixed(1); }
    return '<svg viewBox="0 0 100 100" aria-hidden="true"><defs><radialGradient id="gs" cx="35%" cy="30%" r="80%"><stop offset="0" stop-color="#fbe9b8"/><stop offset=".5" stop-color="#c9a052"/><stop offset="1" stop-color="#7a5a22"/></radialGradient></defs>' +
      '<path d="' + d + 'Z" fill="url(#gs)"/><circle cx="50" cy="50" r="31" fill="none" stroke="#7a5a22" stroke-width="1.6" opacity=".6"/><circle cx="50" cy="50" r="27" fill="none" stroke="#fff3cf" stroke-width=".6" opacity=".7"/>' +
      '<text x="50" y="59" text-anchor="middle" font-size="26" font-family="ArmAllegro, serif" fill="#6b4b18">' + esc(mono) + "</text></svg>";
  }
  // Սև ծրար. կափարիչը աջից, ծայրը՝ ձախ. ոսկե եզր
  function pieces(W, H) {
    var tip = [W * .2, H * .52], vb = 'viewBox="0 0 ' + W + " " + H + '" preserveAspectRatio="none"';
    var paper = '<defs><linearGradient id="bk" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1d1b19"/><stop offset="1" stop-color="#0f0e0d"/></linearGradient>' +
      '<linearGradient id="bk2" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#262321"/><stop offset="1" stop-color="#141312"/></linearGradient>' +
      '<linearGradient id="gd" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8f6a2a"/><stop offset=".35" stop-color="#ead7ad"/><stop offset=".6" stop-color="#c9a96b"/><stop offset="1" stop-color="#8f6a2a"/></linearGradient></defs>';
    function piece(cls, d, fill, extra) { return '<div class="ep ' + cls + '"><svg ' + vb + ">" + paper + '<path d="' + d + '" fill="' + fill + '"/>' + (extra || "") + "</svg></div>"; }
    var T = "M0 0H" + W + "L" + tip[0] + " " + tip[1] + "Z", B = "M0 " + H + "H" + W + "L" + tip[0] + " " + tip[1] + "Z", L = "M0 0L" + tip[0] + " " + tip[1] + "L0 " + H + "Z";
    var r = 26, fl = "M" + W + " 0L" + (tip[0] + r) + " " + (tip[1] - r * .6) + "Q" + tip[0] + " " + tip[1] + " " + (tip[0] + r) + " " + (tip[1] + r * .6) + "L" + W + " " + H + "Z";
    var edge = "M" + W + " 0L" + (tip[0] + r) + " " + (tip[1] - r * .6) + "Q" + tip[0] + " " + tip[1] + " " + (tip[0] + r) + " " + (tip[1] + r * .6) + "L" + W + " " + H;
    return piece("l", L, "url(#bk)") + piece("t", T, "url(#bk)") + piece("b", B, "url(#bk)") +
      piece("fl", fl, "url(#bk2)", '<path d="' + edge + '" fill="none" stroke="url(#gd)" stroke-width="16"/><path d="' + edge + '" fill="none" stroke="rgba(0,0,0,.35)" stroke-width="1" transform="translate(9 0)"/>');
  }

  /* ---------- Բաժիններ ---------- */
  function envelope() {
    var g = K.guest();
    return '<div class="env" id="env"><div id="pcs"></div>' +
      '<div class="env-tx top"><div class="caps">' + esc(t(C.label) || "") + '</div><div class="nm">' + esc(K.names().join(" & ")) + "</div></div>" +
      '<button class="seal" id="seal" aria-label="' + esc(x("hint")) + '">' + sealSVG() + "</button>" +
      '<div class="env-tx bot">' + (g ? '<div class="caps">' + esc(C.dear != null ? t(C.dear) : x("dear")) + '</div><div class="nm">' + esc(g) + "</div>" : "") +
      (K.PREVIEW ? "" : '<div class="env-hint">' + esc(x("hint")) + "</div>") + "</div></div>";
  }
  function hero() {
    var n = K.names(), d = K.date;
    return '<section class="hero' + (K.PREVIEW ? " go" : "") + '" id="hero"' + (C.photo ? ' style="background-image:url(\'' + esc(C.photo) + '\')"' : "") + ">" +
      (C.heroVideo ? '<video id="hv" src="' + esc(C.heroVideo) + '" muted loop playsinline preload="auto"' + (C.photo ? ' poster="' + esc(C.photo) + '"' : "") + "></video>" : "") +
      '<div class="hero-in"><div class="caps ani a1">' + esc(x("together")) + "</div>" +
      '<div class="nms ani a2">' + (n.length === 2 ? "<span>" + esc(n[0]) + "</span><i>" + esc(x("and")) + "</i><span>" + esc(n[1]) + "</span>" : esc(n.join(" "))) + "</div>" +
      '<div class="caps ani a3">' + esc(t(C.request) || x("request")) + "</div>" +
      '<div class="dt ani a4"><div class="m">' + esc(u("months")[d.getMonth()]) + '</div><div class="side">' + esc(x("wdl")[d.getDay()]) + "</div><b>" + pad(d.getDate()) +
      '</b><div class="side">' + esc(x("at")) + " " + pad(d.getHours()) + ":" + pad(d.getMinutes()) + '</div><div class="y">' + d.getFullYear() + "</div></div></div></section>";
  }
  function head(word) { return '<h2 class="th rv"><span class="s">' + esc(x("the")) + '</span><span class="c">' + esc(word) + "</span></h2>"; }
  function program() {
    var tm = C.timing || []; if (!tm.length) return "";
    var rows = tm.map(function (r, i) {
      var tx = '<div><div class="tm">' + esc(r.time) + '</div><div class="tt">' + esc(t(r.title)) + "</div>" + (r.text ? '<div class="ds">' + esc(t(r.text)) + "</div>" : "") +
        (r.map ? '<a class="mp" href="' + esc(r.map) + '" target="_blank" rel="noopener">' + esc(u("map")) + " →</a>" : "") + "</div>";
      var ic = IC[r.icon] || IC.rings;
      return i % 2 === 0
        ? '<div class="tx l rv">' + tx + '</div><i class="dot"></i><div class="ico r rv">' + ic + "</div>"
        : '<div class="ico l rv">' + ic + '</div><i class="dot"></i><div class="tx r rv">' + tx + "</div>";
    }).join("");
    return '<section class="prog">' + (C.programPhoto ? '<div class="fade-photo" style="background-image:url(\'' + esc(C.programPhoto) + '\')"></div>' : "") +
      '<div class="wrap">' + head(x("program")) + '<div class="pg">' + rows + "</div></div></section>";
  }
  function details() {
    var items = (C.details || []).slice();
    if (C.dresscode) items.unshift({ title: { hy: x("dress"), ru: x("dress"), en: x("dress") }, text: C.dresscode.text, colors: C.dresscode.colors });
    if (!items.length) return "";
    return '<section class="det"><div class="wrap">' + head(x("details")) + '<div class="dl">' + items.map(function (d) {
      return '<div class="di rv"><h3>' + esc(t(d.title)) + "</h3><p>" + esc(t(d.text)) + "</p>" +
        (d.colors ? '<div class="dots">' + d.colors.map(function (c) { return '<i style="background:' + esc(c) + '"></i>'; }).join("") + "</div>" : "") + "</div>";
    }).join("") + "</div></div></section>";
  }
  function rsvp() {
    if (!C.rsvp) return "";
    return '<section class="rsvp">' + (C.rsvpPhoto ? '<div class="fade-photo" style="background-image:url(\'' + esc(C.rsvpPhoto) + '\')"></div>' : "") + '<div class="wrap">' +
      '<div class="please rv">' + esc(x("please")) + '</div><div class="big rv">RS<br>VP</div><div class="by rv">' + esc(x("by")) + " " + esc(K.deadline()) + "</div>" +
      '<form class="rs rv" id="rf"><div class="fl" style="margin-top:0"><label>' + esc(x("attend")) + "</label></div>" +
      '<label class="radio"><input type="radio" name="attend" value="yes" checked>' + esc(u("yes")) + "</label>" +
      '<label class="radio"><input type="radio" name="attend" value="no">' + esc(u("no")) + "</label>" +
      '<div class="fl"><label for="rn">' + esc(u("name")) + '</label><input id="rn" name="name" required autocomplete="name"></div>' +
      '<div class="fl"><label for="rg">' + esc(u("guests")) + '</label><select id="rg" name="guests">' + [1, 2, 3, 4, 5, 6].map(function (n) { return "<option>" + n + "</option>"; }).join("") + "</select></div>" +
      '<button class="btn" type="submit">' + esc(u("send")) + '</button></form><div class="thx rv">' + esc(x("thx")) + "</div></div></section>";
  }
  function fin() {
    var d = K.date;
    return '<section class="fin"' + (C.finalPhoto ? ' style="background-image:url(\'' + esc(C.finalPhoto) + '\')"' : "") + '><div class="fin-in">' +
      '<div class="d1 rv">' + pad(d.getMonth() + 1) + "·" + pad(d.getDate()) + '</div><div class="d2 rv">' + d.getFullYear() + "</div>" +
      '<div class="nm rv">' + esc(K.names().join(" & ")) + '</div><div class="cd rv" data-cd>' + ["days", "hours", "minutes", "seconds"].map(function (k) {
        return '<div><b data-k="' + k + '">00</b>' + esc(u(k)) + "</div>";
      }).join("") + "</div></div></section>" +
      '<div class="made"><a href="https://hravirir.am" target="_blank" rel="noopener">HRAVIRIR.AM</a></div>';
  }

  /* ---------- Հավաքում ---------- */
  var opened = false;
  function render() {
    document.documentElement.lang = K.lang;
    document.title = K.names().join(" & ");
    document.getElementById("app").innerHTML = (opened ? "" : envelope()) + "<main>" + hero() + program() + details() + rsvp() + fin() + "</main>" + (opened ? K.chrome() : "");
    document.body.classList.toggle("locked", !opened);
    if (!opened) { shape(); var s = document.getElementById("seal"); if (s && !K.PREVIEW) s.onclick = open; }
    else { document.getElementById("hero").classList.add("go"); playVideo(); K.reveal(); }
    K.countdown(true); K.rsvp(document.getElementById("rf")); K.bindChrome(render);
  }
  function shape() {
    var env = document.getElementById("env"); if (!env) return;
    var W = env.clientWidth, H = env.clientHeight;
    document.getElementById("pcs").innerHTML = pieces(W, H);
    var s = document.getElementById("seal"); s.style.left = (W * .56) + "px"; s.style.top = (H * .52) + "px";
  }
  function playVideo() { var v = document.getElementById("hv"); if (v) { var p = v.play(); if (p && p.catch) p.catch(function () {}); } }
  function open() {
    var env = document.getElementById("env"); if (env.classList.contains("open")) return;
    K.music.play(); playVideo();
    env.classList.add("open"); document.getElementById("hero").classList.add("go");
    setTimeout(function () {
      opened = true; document.body.classList.remove("locked");
      document.getElementById("app").insertAdjacentHTML("beforeend", K.chrome()); K.bindChrome(render); K.reveal();
    }, 2000);
    setTimeout(function () { env.remove(); }, 2400);
  }
  var rt; window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(function () { if (!opened) shape(); }, 150); });
  render();
})();
