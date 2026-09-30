/* «Նամակ» դիզայնի դասավորությունը։ Տվյալները՝ index.html-ի window.INVITE-ից */
(function () {
  "use strict";
  var K = window.K, C = K.C, esc = K.esc, t = K.t, u = K.u, pad = K.pad;

  var TXT = {
    hy: { invited: "Դուք հրավիրված եք", wedding: "մեր հարսանիքին", tap: "ՍԵՂՄԵՔ", scroll: "ներքև", announce: "Շտապում ենք հայտնել ուրախ լուրը՝ մենք ամուսնանում ենք",
      program: "Օրվա ծրագիր", dress: "Դրեսկոդ", left: "Մենք «այո» կասենք", leftSub: "ընդամենը", rsvp: "Կմիանա՞ք մեզ", rsvpLead: "Խնդրում ենք հաստատել Ձեր մասնակցությունը մինչև",
      attend: "Ձեր ներկայությունը տոնին", waiting: "Սիրով սպասում ենք Ձեզ" },
    ru: { invited: "Вы приглашены", wedding: "на свадьбу", tap: "НАЖМИТЕ", scroll: "вниз", announce: "Спешим сообщить радостную новость — мы женимся",
      program: "Программа дня", dress: "Дресс-код", left: "Мы скажем «да»", leftSub: "через", rsvp: "Вы с нами?", rsvpLead: "Пожалуйста, подтвердите своё присутствие до",
      attend: "Ваше присутствие на торжестве", waiting: "С любовью ждём вас" },
    en: { invited: "You are invited", wedding: "to our wedding", tap: "TAP", scroll: "scroll", announce: "We are delighted to share our happy news — we are getting married",
      program: "The day", dress: "Dress code", left: "We say “yes”", leftSub: "in", rsvp: "Will you join us?", rsvpLead: "Kindly confirm your attendance by",
      attend: "Will you attend?", waiting: "We look forward to seeing you" }
  };
  function x(k) { return (TXT[K.lang] || TXT.hy)[k]; }

  /* ---------- Գծանկարներ (hravirir.am) ---------- */
  var A = {
    building: '<svg class="art" viewBox="0 0 260 150"><path d="M4 146H256"/><path d="M30 146V72H230V146M24 72H236M28 66H232"/>' +
      '<path d="M112 66V32H148V66M108 32L130 8L152 32ZM130 8V2"/><path d="M124 56V44a6 6 0 0 1 12 0V56"/>' +
      [42, 64, 86, 160, 182, 204].map(function (xx) { return '<path d="M' + xx + " 128V100q0-12 7-17q7 5 7 17V128ZM" + (xx + 7) + ' 84V128"/>'; }).join("") +
      '<path d="M116 146V112a14 14 0 0 1 28 0V146M130 98V146"/><path d="M30 134H230" stroke-dasharray="2 4"/>' +
      '<path d="M8 146V86H30M252 146V86H230M4 86L19 70L34 86M256 86L241 70L226 86M19 70V60M241 70V60"/><path d="M14 128v-18a5 5 0 0 1 10 0v18M236 128v-18a5 5 0 0 1 10 0v18"/></svg>',
    glasses: '<svg class="art" viewBox="0 0 100 100"><path d="M18 26h26c0 12-5 20-13 21-8-1-13-9-13-21zM31 47v30M22 78h18"/><path d="M56 30l25-7c3 12 0 21-7 24-8 2-15-4-18-17zM68 50l8 29M62 82l18-5"/><path d="M44 16l4-8M50 18l7-6M40 14l-2-8"/><path d="M52 58c8 2 14 8 12 14"/></svg>',
    rings: '<svg class="art" viewBox="0 0 100 100"><circle cx="38" cy="58" r="20"/><circle cx="60" cy="58" r="20"/><path d="M52 24l8-10 8 10-8 8zM52 24h16M60 14v18"/></svg>',
    plate: '<svg class="art" viewBox="0 0 100 100"><circle cx="50" cy="52" r="24"/><circle cx="50" cy="52" r="16"/><path d="M16 26v14a4 4 0 0 0 8 0V26M20 26v52M84 26c-6 4-6 20 0 24v28"/></svg>',
    cake: '<svg class="art" viewBox="0 0 100 100"><path d="M22 84h56V62H22zM30 62V46h40v16M38 46V34h24v12M50 34v-8"/><path d="M50 22c-2-3 0-5 0-6 2 1 3 3 0 6zM22 70c9 5 18 5 28 0s19-5 28 0"/></svg>',
    dance: '<svg class="art" viewBox="0 0 100 100"><path d="M30 20l6 6-6 6-6-6zM66 16l5 5-5 5-5-5zM50 40v34M50 50l-14 8M50 50l14-6M50 74l-10 14M50 74l10 14"/><circle cx="50" cy="32" r="6"/><path d="M70 60c6 4 10 10 8 18"/></svg>',
    ring: '<svg class="art" viewBox="0 0 150 120"><ellipse cx="68" cy="78" rx="46" ry="28"/><ellipse cx="68" cy="78" rx="38" ry="21"/><path d="M50 50l18-22 18 22-18 12zM50 50h36M68 28v34M58 50l10-22M78 50l-10-22"/>' +
      '<ellipse cx="104" cy="86" rx="30" ry="18" opacity=".7"/><path d="M26 30l4 4M30 30l-4 4M120 40l3 3M123 40l-3 3" opacity=".8"/></svg>'
  };
  function rose(cls) {
    return '<svg class="art rose ' + cls + '" viewBox="0 0 120 120"><path d="M60 38c14-2 24 8 22 20s-14 18-24 16-16-12-12-22 14-12 20-6-2 16-8 12 0-8 4-6"/>' +
      '<path d="M40 56c-8-10-2-24 12-26M82 52c8-8 4-20-6-24M44 72c-4 10 2 20 14 22M76 70c6 8 2 20-8 22"/><path d="M60 94c-2 10-10 18-22 22M30 86c8-2 14 2 16 8-8 2-14-2-16-8zM66 104c8-4 16-2 18 4-8 4-16 2-18-4z"/></svg>';
  }
  var HEART = '<svg viewBox="0 0 60 56" aria-hidden="true"><path d="M30 54C12 42 2 31 3 18 4 8 13 2 21 4c4 1 7 4 9 8 2-4 5-7 9-8 8-2 17 4 18 14 1 13-9 24-27 36z"/></svg>';
  function sealSVG() {
    var pts = [], n = 30, d;
    for (var i = 0; i < n; i++) { var a = i / n * Math.PI * 2, r = 46 + Math.sin(i * 2.3) * 2 + Math.cos(i * 1.7) * 1.4; pts.push([50 + Math.cos(a) * r, 50 + Math.sin(a) * r]); }
    d = "M" + pts[0].join(" ");
    for (var j = 1; j <= n; j++) { var p = pts[j % n], q = pts[j - 1]; d += "Q" + q[0].toFixed(1) + " " + q[1].toFixed(1) + " " + ((p[0] + q[0]) / 2).toFixed(1) + " " + ((p[1] + q[1]) / 2).toFixed(1); }
    return '<svg viewBox="0 0 100 100" aria-hidden="true"><defs><radialGradient id="sw" cx="38%" cy="30%" r="80%"><stop offset="0" stop-color="#ecc9a0"/><stop offset=".5" stop-color="#b98a5e"/><stop offset="1" stop-color="#6b4526"/></radialGradient>' +
      '<radialGradient id="sw2" cx="60%" cy="70%" r="70%"><stop offset="0" stop-color="#b98a5e"/><stop offset="1" stop-color="#e2bb90"/></radialGradient></defs>' +
      '<path d="' + d + 'Z" fill="url(#sw)"/><circle cx="50" cy="50" r="32" fill="url(#sw2)"/><circle cx="50" cy="50" r="32" fill="none" stroke="#6b4526" stroke-width="1.6" opacity=".6"/>' +
      '<circle cx="50" cy="50" r="28" fill="none" stroke="#f3dcbc" stroke-width=".6" opacity=".7"/>' +
      '<text x="50" y="54" text-anchor="middle" font-size="10.5" letter-spacing="1" font-family="GHEA Mariam, serif" fill="#5a381c">' + esc(x("tap")) + "</text></svg>";
  }
  function cartouche() {
    var d = "M150 8C188 8 200 38 226 38C258 38 262 66 262 92L262 448C262 474 258 502 226 502C200 502 188 532 150 532C112 532 100 502 74 502C42 502 38 474 38 448L38 92C38 66 42 38 74 38C100 38 112 8 150 8Z";
    return '<svg viewBox="0 0 300 540" aria-hidden="true"><defs><radialGradient id="cg" cx="72%" cy="22%" r="70%"><stop offset="0" stop-color="#e9ef9e" stop-opacity=".35"/><stop offset="1" stop-color="#e9ef9e" stop-opacity="0"/></radialGradient></defs>' +
      '<path d="' + d + '" fill="#7a8a5c"/><path d="' + d + '" fill="url(#cg)"/><path d="' + d + '" fill="none" stroke="#fbf7ec" stroke-width="3"/>' +
      '<path d="' + d + '" fill="none" stroke="#fbf7ec" stroke-width="1" transform="translate(15 15) scale(.9)" opacity=".7"/></svg>';
  }
  function flapShapes(W, H) {
    var c = W / 2, h1 = H * .62, h2 = H * .58;
    var top = "M0 0H" + W + "V" + (h1 * .52) + "L" + (c + 24) + " " + (h1 - 20) + "Q" + c + " " + (h1 + 1) + " " + (c - 24) + " " + (h1 - 20) + "L0 " + (h1 * .52) + "Z";
    var bot = "M0 " + h2 + "H" + W + "V" + (h2 * .42) + "L" + (c + 28) + " 18Q" + c + " -2 " + (c - 28) + " 18L0 " + (h2 * .42) + "Z";
    function svg(h, d, grad) {
      return '<svg viewBox="0 0 ' + W + " " + h + '" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="' + grad + '" x1="0" y1="0" x2="0" y2="1">' +
        (grad === "gt" ? '<stop offset="0" stop-color="#7f8e62"/><stop offset="1" stop-color="#75845a"/>' : '<stop offset="0" stop-color="#7a895d"/><stop offset="1" stop-color="#6c7b50"/>') +
        '</linearGradient></defs><path d="' + d + '" fill="url(#' + grad + ')"/><path d="' + d + '" fill="none" stroke="rgba(255,255,255,.14)" stroke-width="1"/></svg>';
    }
    return { top: svg(h1, top, "gt"), bot: svg(h2, bot, "gb") };
  }

  /* ---------- Բաժիններ ---------- */
  function envelope() {
    var g = K.guest();
    return '<div class="env" id="env"><div class="flap top" id="ft"><div class="flap-t"><div class="big">' + esc(x("invited")) + '</div><div class="scr">' + esc(x("wedding")) + "</div></div></div>" +
      '<div class="flap bot" id="fb"><div class="flap-t">' + esc(t(C.envelopeText) || "") + (g ? '<span class="to">' + esc(g) + "</span>" : "") + "</div></div>" +
      '<button class="seal" id="seal" aria-label="' + esc(u("tap")) + '">' + sealSVG() + "</button></div>";
  }
  function hero() {
    return '<section class="hero"' + (C.photo ? ' style="background-image:url(\'' + esc(C.photo) + '\')"' : "") + ">" +
      (C.heroVideo ? '<video src="' + esc(C.heroVideo) + '" autoplay muted loop playsinline' + (C.photo ? ' poster="' + esc(C.photo) + '"' : "") + "></video>" : "") +
      '<div class="cue">' + esc(x("scroll")) + "<i></i></div></section>";
  }
  function namesBlock() {
    var n = K.names(), d = K.date;
    return '<section><div class="cart rv">' + cartouche() + '<div class="cart-in"><div class="names">' +
      (n.length === 2 ? esc(n[0]) + '<span class="amp">&amp;</span>' + esc(n[1]) : n.map(esc).join("<br>")) + "</div>" +
      '<p class="p">' + esc(t(C.announce) || x("announce")) + '</p><div class="vdate">' + pad(d.getDate()) + "<i>·</i>" + pad(d.getMonth() + 1) + "<i>·</i>" + String(d.getFullYear()).slice(2) + "</div></div></div></section>";
  }
  function letter() {
    return '<section><div class="wrap"><h2 class="st rv">' + esc(t(C.greeting)) + '</h2><p class="p rv d1">' + esc(t(C.text)) + "</p>" +
      '<div class="cal rv d2">' + K.calendarCells(HEART) + "</div></div></section>";
  }
  function venue() {
    var v = C.venue; if (!v) return "";
    return '<section class="venue"><div class="wrap"><h2 class="st rv">' + esc(t(v.title)) + '</h2><div class="rv d1">' + A.building + "</div>" +
      '<div class="place rv d1">' + esc(t(v.place)) + '</div><div class="addr rv d1">' + esc(t(v.address)) + "</div>" +
      (v.map ? '<a class="btn rv d2" href="' + esc(v.map) + '" target="_blank" rel="noopener">' + esc(u("map")) + "</a>" : "") + "</div></section>";
  }
  function timeline() {
    var tm = C.timing || []; if (!tm.length) return "";
    var items = tm.map(function (r, i) {
      return '<div class="ti rv">' + (i % 2 === 0 ? rose(i % 4 === 0 ? "r" : "l") : "") + (A[r.icon] || A.glasses) +
        '<div class="tt">' + esc(t(r.text)) + '</div><div class="tm">' + esc(r.time) + "</div>" +
        (r.place ? '<div class="pl">' + esc(t(r.place)) + "</div>" : "") +
        (r.map ? '<a class="btn sm" href="' + esc(r.map) + '" target="_blank" rel="noopener">' + esc(u("map")) + "</a>" : "") + "</div>";
    }).join("");
    return '<section class="timeline"><svg class="tl-line" viewBox="0 0 100 1000" preserveAspectRatio="none" aria-hidden="true"><path vector-effect="non-scaling-stroke" d="M-5 40C60 80 120 150 60 240S-40 380 40 480 140 600 60 700-20 880 105 980"/></svg>' +
      '<div class="wrap"><h2 class="st rv">' + esc(x("program")) + "</h2>" + items + "</div></section>";
  }
  function dress() {
    var dc = C.dresscode; if (!dc) return "";
    var ph = (dc.photos || []).filter(Boolean);
    return '<section><div class="wrap"><h2 class="st rv">' + esc(x("dress")) + '</h2><p class="p rv d1">' + esc(t(dc.text)) + "</p>" +
      '<div class="dots rv d2">' + (dc.colors || []).map(function (c) { return '<i style="background:' + esc(c) + '"></i>'; }).join("") + "</div>" +
      (ph.length ? '<div class="looks rv d2">' + ph.map(function (s) { return '<img src="' + esc(s) + '" alt="" loading="lazy">'; }).join("") + "</div>" : "") + "</div></section>";
  }
  function countdown() {
    return '<section class="cdn-wrap"><div class="wrap"><h2 class="st rv">' + esc(x("left")) + '</h2><div class="caps rv">' + esc(x("leftSub")) + "</div>" +
      '<div class="cdn rv d1" data-cd>' + ["days", "hours", "minutes", "seconds"].map(function (k, i) {
        return (i ? "<i>:</i>" : "") + '<div><b data-k="' + k + '">0</b><span>' + esc(u(k)) + "</span></div>";
      }).join("") + '</div><div class="rv d2">' + A.ring + "</div></div></section>";
  }
  function rsvp() {
    if (!C.rsvp) return "";
    return '<section><div class="wrap"><h2 class="st rv">' + esc(x("rsvp")) + '</h2><p class="p rv d1">' + esc(x("rsvpLead")) + " " + esc(K.deadline()) + "</p>" +
      '<form class="rs rv d2" id="rf"><div class="q">' + esc(x("attend")) + "</div>" +
      '<label class="radio"><input type="radio" name="attend" value="yes" checked>' + esc(u("yes")) + "</label>" +
      '<label class="radio"><input type="radio" name="attend" value="no">' + esc(u("no")) + "</label>" +
      '<div class="fl"><label for="rn">' + esc(u("name")) + '</label><input id="rn" name="name" required autocomplete="name"></div>' +
      '<div class="fl"><label for="rg">' + esc(u("guests")) + '</label><select id="rg" name="guests">' + [1, 2, 3, 4, 5, 6].map(function (n) { return "<option>" + n + "</option>"; }).join("") + "</select></div>" +
      '<div class="fl"><label for="rm">' + esc(u("note")) + '</label><input id="rm" name="note"></div>' +
      '<button class="btn" type="submit">' + esc(u("send")) + "</button></form></div></section>";
  }
  function fin() {
    return '<section class="fin"><div class="wrap"><div class="caps rv">' + esc(t(C.finalText) || x("waiting")) + '</div><div class="names rv d1">' + esc(K.names().join(" & ")) + "</div></div></section>" +
      '<div class="made"><a href="https://hravirir.am" target="_blank" rel="noopener">HRAVIRIR.AM</a></div>';
  }

  /* ---------- Հավաքում ---------- */
  var opened = K.PREVIEW ? false : false;
  function render() {
    document.documentElement.lang = K.lang;
    document.title = K.names().join(" & ") + " — " + x("invited");
    document.getElementById("app").innerHTML = (opened ? "" : envelope()) +
      "<main>" + hero() + namesBlock() + letter() + venue() + timeline() + dress() + countdown() + rsvp() + fin() + "</main>" + (opened ? K.chrome() : "");
    document.body.classList.toggle("locked", !opened);
    if (!opened) { shapeFlaps(); var s = document.getElementById("seal"); if (s && !K.PREVIEW) s.onclick = open; }
    K.countdown(false); K.rsvp(document.getElementById("rf")); K.bindChrome(render);
    if (opened) K.reveal();
  }
  function shapeFlaps() {
    var env = document.getElementById("env"); if (!env) return;
    var f = flapShapes(env.clientWidth, env.clientHeight);
    document.getElementById("ft").insertAdjacentHTML("afterbegin", f.top);
    document.getElementById("fb").insertAdjacentHTML("afterbegin", f.bot);
  }
  function open() {
    var env = document.getElementById("env");
    if (env.classList.contains("open")) return;
    K.music.play();
    env.classList.add("open");
    setTimeout(function () {
      opened = true; document.body.classList.remove("locked");
      document.body.insertAdjacentHTML("beforeend", "");
      document.getElementById("app").insertAdjacentHTML("beforeend", K.chrome()); K.bindChrome(render); K.reveal();
    }, 1300);
    setTimeout(function () { env.remove(); }, 1700);
  }
  var rt; window.addEventListener("resize", function () {
    clearTimeout(rt); rt = setTimeout(function () {
      if (opened) return; var env = document.getElementById("env"); if (!env || env.classList.contains("open")) return;
      document.querySelectorAll(".flap > svg").forEach(function (s) { s.remove(); }); shapeFlaps();
    }, 150);
  });
  render();
})();
