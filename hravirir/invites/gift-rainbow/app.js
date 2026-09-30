/* «Նվեր» դիզայնի դասավորությունը */
(function () {
  "use strict";
  var K = window.K, C = K.C, esc = K.esc, t = K.t, u = K.u, pad = K.pad;
  var TXT = {
    hy: { a: "Քեզ համար նվեր կա", b: "բացիր այն", hint: "Սեղմեք նվերին", years: "տարեկան", what: "Ինչ է լինելու", where: "Որտեղ", dress: "Դրեսկոդ", left: "Մինչև տոնը մնաց", rsvp: "Կգա՞ս", rsvpLead: "Խնդրում ենք պատասխանել մինչև", waiting: "Սպասում եմ քեզ",
      wdl: ["Կիրակի", "Երկուշաբթի", "Երեքշաբթի", "Չորեքշաբթի", "Հինգշաբթի", "Ուրբաթ", "Շաբաթ"] },
    ru: { a: "Для тебя есть подарок", b: "открой его", hint: "Нажмите на подарок", years: "год", what: "Что будет", where: "Где", dress: "Дресс-код", left: "До праздника", rsvp: "Придёшь?", rsvpLead: "Пожалуйста, ответьте до", waiting: "Жду тебя",
      wdl: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"] },
    en: { a: "There's a gift for you", b: "open it", hint: "Tap the gift", years: "years", what: "What's planned", where: "Where", dress: "Dress code", left: "Party starts in", rsvp: "Will you come?", rsvpLead: "Kindly reply by", waiting: "See you there",
      wdl: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] }
  };
  function x(k) { return (TXT[K.lang] || TXT.hy)[k]; }
  var COLORS = ["#d98b6a", "#e8b85a", "#9db39a", "#f0b9ad", "#a9cbe0"];

  var LID = '<svg class="lid" viewBox="0 0 250 105" aria-hidden="true"><path d="M125 58C104 20 70 6 62 22c-8 17 30 30 63 36zM125 58c21-38 55-52 63-36 8 17-30 30-63 36z" fill="#e8b85a" stroke="#c9973a" stroke-width="2"/>' +
    '<circle cx="125" cy="58" r="10" fill="#e8b85a" stroke="#c9973a" stroke-width="2"/><rect x="6" y="62" width="238" height="40" rx="10" fill="#d98b6a"/><rect x="6" y="62" width="238" height="12" rx="6" fill="#fff" opacity=".18"/><rect x="112" y="62" width="26" height="40" fill="#e8b85a"/></svg>';
  var BOX = '<svg class="box" viewBox="0 0 250 180" aria-hidden="true"><rect x="18" y="0" width="214" height="176" rx="12" fill="#e79f80"/><rect x="18" y="0" width="214" height="16" fill="#000" opacity=".08"/>' +
    '<rect x="112" y="0" width="26" height="176" fill="#e8b85a"/><circle cx="60" cy="60" r="7" fill="#fff" opacity=".35"/><circle cx="190" cy="120" r="9" fill="#fff" opacity=".35"/><circle cx="70" cy="140" r="5" fill="#fff" opacity=".35"/><circle cx="180" cy="40" r="5" fill="#fff" opacity=".35"/></svg>';
  var ICONS = {
    cake: '<svg viewBox="0 0 48 48"><rect x="8" y="24" width="32" height="16" rx="4" fill="#f0b9ad"/><path d="M8 30c4 3 8 3 12 0s8-3 12 0 6 2 8 0" stroke="#fff" stroke-width="2" fill="none"/><rect x="22" y="13" width="4" height="11" rx="2" fill="#a9cbe0"/><path d="M24 5c-3 4-2 6 0 7 2-1 3-3 0-7z" fill="#e8b85a"/></svg>',
    games: '<svg viewBox="0 0 48 48"><circle cx="16" cy="30" r="10" fill="#9db39a"/><circle cx="32" cy="22" r="10" fill="#e8b85a"/><circle cx="26" cy="36" r="7" fill="#d98b6a"/></svg>',
    show: '<svg viewBox="0 0 48 48"><path d="M24 6l5 11 12 1-9 8 3 12-11-7-11 7 3-12-9-8 12-1z" fill="#e8b85a"/></svg>',
    photo: '<svg viewBox="0 0 48 48"><rect x="6" y="14" width="36" height="26" rx="6" fill="#a9cbe0"/><circle cx="24" cy="27" r="8" fill="#fff"/><circle cx="24" cy="27" r="4" fill="#d98b6a"/><rect x="16" y="9" width="16" height="7" rx="3" fill="#a9cbe0"/></svg>'
  };
  function rainbow() {
    var arcs = [["#d98b6a", 170], ["#e8b85a", 142], ["#9db39a", 114], ["#f0b9ad", 86]].map(function (a) {
      return '<path d="M' + (200 - a[1]) + " 210A" + a[1] + " " + a[1] + " 0 0 1 " + (200 + a[1]) + ' 210" fill="none" stroke="' + a[0] + '" stroke-width="24" stroke-linecap="round"/>';
    }).join("");
    var cloud = function (cx, cy, cls) { return '<g class="cloud ' + cls + '"><ellipse cx="' + cx + '" cy="' + cy + '" rx="46" ry="22" fill="#fff"/><circle cx="' + (cx - 18) + '" cy="' + (cy - 12) + '" r="20" fill="#fff"/><circle cx="' + (cx + 14) + '" cy="' + (cy - 16) + '" r="24" fill="#fff"/></g>'; };
    return '<div class="rainbow rv"><svg viewBox="0 0 400 230" aria-hidden="true"><circle cx="200" cy="60" r="0"/>' + arcs + cloud(58, 206, "c1") + cloud(344, 206, "c2") + "</svg><div class=\"age\">" + esc(C.age || "") + "</div></div>";
  }
  function floaties(n) {
    var h = "";
    // միայն եզրերին, որ տեքստը չծածկեն
    var pos = [[3, 6], [88, 3], [2, 40], [90, 88]];
    for (var i = 0; i < n; i++) h += '<i class="floaty" style="background:' + COLORS[i % 5] + ";left:" + pos[i][0] + "%;top:" + pos[i][1] + "%;animation-delay:-" + i * 1.3 + 's"></i>';
    return h;
  }

  function envelope() {
    var g = K.guest(), pop = "";
    for (var i = 0; i < 9; i++) pop += '<i class="bl" style="background:' + COLORS[i % 5] + ";--x:" + ((i - 4) * 38) + "px;--r:" + ((i % 3) - 1) * 12 + "deg;--dl:" + (i * .08).toFixed(2) + 's"></i>';
    for (var j = 0; j < 40; j++) { var a = Math.PI * (1.05 + j / 40 * .9), r = 160 + (j % 5) * 30; pop += '<i class="cf" style="background:' + COLORS[j % 5] + ";--x:" + Math.round(Math.cos(a) * r) + "px;--y:" + Math.round(Math.sin(a) * r) + "px;--r:" + j * 37 + "deg;--dl:" + (j % 8) * .03 + 's"></i>'; }
    return '<div class="env" id="env"><div class="env-top"><div class="a">' + esc(x("a")) + '</div><div class="b">' + esc(x("b")) + "</div></div>" +
      '<button class="gift" id="seal" aria-label="' + esc(x("hint")) + '">' + BOX + LID + "</button><div class=\"pop\">" + pop + "</div>" +
      '<div class="env-to">' + (g ? esc(C.dear != null ? t(C.dear) : u("dear")) + "<b>" + esc(g) + "</b>" : "") + (K.PREVIEW ? "" : '<div class="env-hint">' + esc(x("hint")) + "</div>") + "</div></div>";
  }
  function hero() {
    var d = K.date;
    return '<section class="hero">' + floaties(4) + '<div class="wrap">' + rainbow() +
      (C.photo ? '<div class="photo rv" style="background-image:url(\'' + esc(C.photo) + '\')"></div>' : "") +
      '<div class="nm rv">' + esc(K.names().join(" & ")) + '</div><div class="sub rv">' + esc(t(C.subtitle) || "") + "</div>" +
      '<div class="chips rv"><span>' + esc(x("wdl")[d.getDay()]) + "</span><span>" + d.getDate() + " " + esc(u("monthsGen")[d.getMonth()]) + "</span><span>" + pad(d.getHours()) + ":" + pad(d.getMinutes()) + "</span></div></div></section>";
  }
  function letter() {
    return '<section class="letter"><div class="wrap"><h2 class="h2 rv">' + esc(t(C.greeting)) + '</h2><p class="p rv">' + esc(t(C.text)) + "</p></div></section>";
  }
  function plan() {
    var a = C.activities || []; if (!a.length) return "";
    return '<section><div class="wrap"><h2 class="h2 rv">' + esc(x("what")) + '</h2><div class="acts">' + a.map(function (it) {
      return '<div class="act rv">' + (ICONS[it.icon] || ICONS.show) + "<b>" + esc(it.time || "") + "</b><span>" + esc(t(it.text)) + "</span></div>";
    }).join("") + "</div></div></section>";
  }
  function where() {
    var v = C.venue; if (!v) return "";
    return '<section class="letter"><div class="wrap"><h2 class="h2 rv">' + esc(x("where")) + '</h2><div class="where rv"><div class="t">' + pad(K.date.getHours()) + ":" + pad(K.date.getMinutes()) + '</div><div class="n">' + esc(t(v.place)) +
      '</div><div class="a">' + esc(t(v.address)) + "</div>" + (v.map ? '<a class="btn" href="' + esc(v.map) + '" target="_blank" rel="noopener">' + esc(u("map")) + "</a>" : "") + "</div>" +
      (C.dresscode ? '<h2 class="h2 rv" style="margin-top:40px">' + esc(x("dress")) + '</h2><p class="rv">' + esc(t(C.dresscode.text)) + '</p><div class="dots rv">' + (C.dresscode.colors || []).map(function (c) { return '<i style="background:' + esc(c) + '"></i>'; }).join("") + "</div>" : "") +
      "</div></section>";
  }
  function last() {
    var s = '<section>' + floaties(2) + '<div class="wrap"><h2 class="h2 rv">' + esc(x("left")) + '</h2><div class="cdn rv" data-cd>' + ["days", "hours", "minutes", "seconds"].map(function (k) {
      return '<div><b data-k="' + k + '">00</b><span>' + esc(u(k)) + "</span></div>";
    }).join("") + "</div>";
    if (C.rsvp) s += '<h2 class="h2 rv" style="margin-top:44px">' + esc(x("rsvp")) + '</h2><p class="rv">' + esc(x("rsvpLead")) + " " + esc(K.deadline()) + "</p>" +
      '<form class="rs rv" id="rf"><label class="radio"><input type="radio" name="attend" value="yes" checked>' + esc(u("yes")) + "</label>" +
      '<label class="radio"><input type="radio" name="attend" value="no">' + esc(u("no")) + "</label>" +
      '<div class="fl"><label for="rn">' + esc(u("name")) + '</label><input id="rn" name="name" required autocomplete="name"></div>' +
      '<div class="fl"><label for="rg">' + esc(u("guests")) + '</label><select id="rg" name="guests">' + [1, 2, 3, 4, 5, 6].map(function (i) { return "<option>" + i + "</option>"; }).join("") + "</select></div>" +
      '<button class="btn" type="submit">' + esc(u("send")) + "</button></form>";
    return s + '</div></section><section class="fin letter"><div class="wrap"><div class="rv">' + esc(t(C.finalText) || x("waiting")) + '</div><div class="nm rv">' + esc(K.names().join(" & ")) + "</div></div></section>" +
      '<div class="made"><a href="https://hravirir.am" target="_blank" rel="noopener">HRAVIRIR.AM</a></div>';
  }

  var opened = false;
  function render() {
    document.documentElement.lang = K.lang;
    document.title = K.names().join(" & ");
    document.getElementById("app").innerHTML = (opened ? "" : envelope()) + "<main>" + hero() + letter() + plan() + where() + last() + "</main>" + (opened ? K.chrome() : "");
    document.body.classList.toggle("locked", !opened);
    if (!opened) { var s = document.getElementById("seal"); if (s && !K.PREVIEW) s.onclick = open; } else K.reveal();
    K.countdown(true); K.rsvp(document.getElementById("rf"), '<div class="thanks rs"><div class="thanks-t">' + esc(u("thanks")) + "!</div><p>" + esc(u("thanksText")) + "</p></div>"); K.bindChrome(render);
  }
  function open() {
    var env = document.getElementById("env"); if (env.classList.contains("open")) return;
    K.music.play(); env.classList.add("open");
    setTimeout(function () {
      opened = true; document.body.classList.remove("locked");
      document.getElementById("app").insertAdjacentHTML("beforeend", K.chrome()); K.bindChrome(render); K.reveal();
    }, 2300);
    setTimeout(function () { env.remove(); }, 2800);
  }
  render();
})();
