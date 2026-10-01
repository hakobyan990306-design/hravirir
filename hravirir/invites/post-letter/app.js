/* «Փոստ» (հարսանիք, սև-սպիտակ) դիզայնի դասավորությունը.
   ծրարի առջևը՝ հասցե գեղագրով, նամականիշ Արարատով, փոստի կնիք → շրջվում է → սև կնիքը ճաքում է → նամակը դուրս է գալիս ու բացվում */
(function () {
  "use strict";
  var K = window.K, C = K.C, esc = K.esc, t = K.t, u = K.u, pad = K.pad;
  var TXT = {
    hy: { hint: "Սեղմեք ծրարին", inv: "Հարսանյաց հրավեր", lead: "Սիրով հրավիրում ենք Ձեզ մեր հարսանիքին", story: "Սիրելի՛ հյուրեր", plan: "Օրվա ծրագիր", dress: "Դրեսկոդ", left: "Մնաց",
      rsvp: "Կմիանա՞ք մեզ", rsvpLead: "Խնդրում ենք պատասխանել մինչև", fin: "Սիրով՝", to: "Ում", pm: "ԵՐԵՎԱՆ", all: "Մեր սիրելի հյուրերին" },
    ru: { hint: "Нажмите на конверт", inv: "Приглашение на свадьбу", lead: "С любовью приглашаем вас на нашу свадьбу", story: "Дорогие гости", plan: "Программа дня", dress: "Дресс-код", left: "Осталось",
      rsvp: "Вы с нами?", rsvpLead: "Пожалуйста, ответьте до", fin: "С любовью,", to: "Кому", pm: "ЕРЕВАН", all: "Нашим дорогим гостям" },
    en: { hint: "Tap the envelope", inv: "Wedding invitation", lead: "With love we invite you to our wedding", story: "Dear guests", plan: "Schedule", dress: "Dress code", left: "Time left",
      rsvp: "Will you join us?", rsvpLead: "Kindly reply by", fin: "With love,", to: "To", pm: "YEREVAN", all: "Our dear guests" }
  };
  function x(k) { return (TXT[K.lang] || TXT.hy)[k]; }
  function ini() { var n = K.list(C.names && (C.names.hy || C.names)); return (n[0] || "").charAt(0) + (n[1] || "").charAt(0); }
  function f(v) { return Math.round(v * 10) / 10; }

  function seal() {   // սև մոմե կնիք
    var pts = [], s = 5;
    for (var i = 0; i < 30; i++) { s = (s * 16807) % 2147483647; var a = i / 30 * Math.PI * 2, rr = 46 + (i % 2 ? 3 : -1.5) + (s / 2147483647 - .5) * 3; pts.push(f(50 + Math.cos(a) * rr) + "," + f(50 + Math.sin(a) * rr)); }
    return '<svg viewBox="0 0 100 100" aria-hidden="true"><defs><radialGradient id="bw" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#6a6a6a"/><stop offset=".45" stop-color="#262626"/><stop offset="1" stop-color="#050505"/></radialGradient></defs>' +
      '<polygon points="' + pts.join(" ") + '" fill="url(#bw)"/><circle cx="50" cy="50" r="32" fill="none" stroke="#000" stroke-width="2" opacity=".6"/><circle cx="50" cy="50" r="27" fill="none" stroke="#9a9a9a" stroke-width=".7" opacity=".6"/>' +
      '<text x="50" y="58" text-anchor="middle" font-family="GHEA Mariam, serif" font-size="21" fill="#0a0a0a">' + esc(ini()) + '</text><text x="49.3" y="57.3" text-anchor="middle" font-family="GHEA Mariam, serif" font-size="21" fill="#bdbdbd" opacity=".45">' + esc(ini()) + "</text></svg>";
  }
  function pocket(W, H) {
    return '<svg class="pocket" viewBox="0 0 ' + W + " " + H + '"><defs><filter id="ps"><feDropShadow dx="0" dy="-2" stdDeviation="3" flood-color="#000" flood-opacity=".14"/></filter></defs>' +
      '<path d="M0 0L' + W * .52 + " " + H * .56 + "L0 " + H + 'Z" fill="#fbfbfa" filter="url(#ps)"/><path d="M' + W + " 0L" + W * .48 + " " + H * .56 + "L" + W + " " + H + 'Z" fill="#f7f6f4" filter="url(#ps)"/>' +
      '<path d="M0 ' + H + "L" + W / 2 + " " + H * .44 + "L" + W + " " + H + 'Z" fill="#fdfdfc" filter="url(#ps)"/></svg>';
  }
  function flap(W, H) {
    return '<svg class="flap" viewBox="0 0 ' + W + " " + H + '"><defs><filter id="fs" x="-10%" y="-10%" width="120%" height="140%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000" flood-opacity=".2"/></filter></defs>' +
      '<path d="M0 0H' + W + "L" + W / 2 + " " + H * .58 + 'Z" fill="#fefefd" filter="url(#fs)"/></svg><div class="fin-l"></div>';
  }
  // ծրարի առջևը
  function front(g) {
    var st = '<svg viewBox="0 0 60 72" aria-hidden="true"><rect x="1" y="1" width="58" height="70" fill="#fff" stroke="#1f1f1f" stroke-width="1" stroke-dasharray="3 2"/><rect x="6" y="6" width="48" height="60" fill="#efece7"/>' +
      '<path d="M6 52L20 32L27 39L37 22L54 47V66H6Z" fill="#c9c3b9"/><path d="M33 28L37 22L41 29L37 27Z" fill="#fff"/><path d="M14 44L20 36L24 41Z" fill="#fff" opacity=".8"/><circle cx="46" cy="15" r="5" fill="none" stroke="#1f1f1f" stroke-width=".8"/>' +
      '<text x="30" y="63" text-anchor="middle" font-family="GHEA Mariam, serif" font-size="6" letter-spacing="1" fill="#1f1f1f">ՀԱՅԱՍՏԱՆ</text></svg>';
    var pm = '<svg viewBox="0 0 96 60" aria-hidden="true"><circle cx="30" cy="30" r="22" fill="none" stroke="#1f1f1f" stroke-width="1" opacity=".5"/><circle cx="30" cy="30" r="16" fill="none" stroke="#1f1f1f" stroke-width=".6" opacity=".5"/>' +
      '<text x="30" y="28" text-anchor="middle" font-family="GHEA Mariam, serif" font-size="6" fill="#1f1f1f" opacity=".6">' + esc(x("pm")) + '</text><text x="30" y="37" text-anchor="middle" font-family="GHEA Mariam, serif" font-size="5.5" fill="#1f1f1f" opacity=".6">' +
      pad(K.date.getDate()) + "." + pad(K.date.getMonth() + 1) + "." + K.date.getFullYear() + "</text>" +
      '<path d="M56 18q8-4 16 0t16 0M56 26q8-4 16 0t16 0M56 34q8-4 16 0t16 0M56 42q8-4 16 0t16 0" fill="none" stroke="#1f1f1f" stroke-width=".8" opacity=".45"/></svg>';
    return '<div class="front" id="front"><div class="stamp">' + st + '</div><div class="pmk">' + pm + '</div><div class="addr"><span>' + esc(x("to")) + "</span><b>" + esc(g || x("all")) + "</b><i></i><i></i></div></div>";
  }
  function envelope() {
    var g = K.guest(), n = K.names();
    return '<div class="env" id="env" role="button" aria-label="' + esc(x("hint")) + '"><div class="env-top"><div class="caps">' + esc(x("inv")) + "</div></div>" +
      '<div class="flipw"><div class="envw" id="ew"><div class="back"></div>' +
      '<div class="letter"><div class="half lo"><div class="caps">' + esc(K.dateLong()) + '</div></div><div class="up-in"><div class="caps">' + esc(x("lead")) + '</div><div class="nm">' + esc(n.join(" & ")) + "</div></div>" +
      '<div class="half up"><div class="nm">' + esc(ini().split("").join(" & ")) + "</div></div></div>" +
      '<div class="pk" id="pk"></div><div class="fw" id="fw"></div>' +
      '<div class="seal"><div class="sz">' + seal() + '</div><div class="h hl">' + seal() + '</div><div class="h hr">' + seal() + "</div></div></div>" + front(g) + "</div>" +
      (K.PREVIEW ? "" : '<div class="env-hint">' + esc(x("hint")) + "</div>") + "</div>";
  }
  function drawEnv() {
    var ew = document.getElementById("ew"); if (!ew) return;
    var W = ew.offsetWidth, H = ew.offsetHeight;
    document.getElementById("pk").innerHTML = pocket(W, H); document.getElementById("fw").innerHTML = flap(W, H);
  }
  function orn() { return '<svg class="ringic rv" viewBox="0 0 64 34" fill="none" stroke="#1f1f1f" stroke-width="1"><path d="M0 17h24M40 17h24"/><path d="M32 9l8 8-8 8-8-8z"/></svg>'; }
  function hero() {
    var n = K.names(), d = K.date;
    return '<section class="hero"><div class="wrap"><div class="caps rv">' + esc(x("inv")) + '</div><h1 class="nm rv d1"><span>' + esc(n[0]) + '</span><span class="amp">&amp;</span><span>' + esc(n[1] || "") + "</span></h1>" +
      orn() + '<div class="dt rv d2">' + pad(d.getDate()) + " · " + pad(d.getMonth() + 1) + " · " + d.getFullYear() + "</div>" +
      (C.photo ? '<div class="frame rv d3" style="background-image:url(\'' + esc(C.photo) + '\')"></div>' : "") + "</div></section>";
  }
  function body() {
    var s = '<section class="grey"><div class="wrap"><h2 class="h2 rv">' + esc(x("story")) + '</h2><p class="p rv">' + esc(t(C.text)) + "</p></div></section>" +
      '<section style="padding:44px 0"><div class="wrap"><div class="caps rv">' + esc(x("left")) + '</div><div class="cdn rv" data-cd>' + ["days", "hours", "minutes", "seconds"].map(function (k) {
        return '<div><b data-k="' + k + '">00</b><span>' + esc(u(k)) + "</span></div>"; }).join("") + "</div></div></section>" +
      '<section class="grey"><div class="wrap"><h2 class="h2 rv">' + esc(x("plan")) + "</h2>" + (C.events || []).map(function (e) {
        return '<div class="ev rv">' + (e.img ? '<div class="pic"><img alt="" data-wc="' + esc(e.img) + '"></div>' : '<div class="pic ico">' + K.evIcon(e) + "</div>") + '<div class="tm">' + esc(e.time) + '</div><div class="t">' + esc(t(e.title)) +
          '</div><div class="n">' + esc(t(e.place)) + '</div><div class="a">' + esc(t(e.address)) + "</div>" + (e.map ? '<a class="btn" href="' + esc(e.map) + '" target="_blank" rel="noopener">' + esc(u("map")) + "</a>" : "") + "</div>";
      }).join("") + (C.dresscode ? '<h2 class="h2 rv" style="margin-top:56px">' + esc(x("dress")) + '</h2><p class="rv">' + esc(t(C.dresscode.text)) + '</p><div class="dots rv">' +
        (C.dresscode.colors || []).map(function (c) { return '<i style="background:' + esc(c) + '"></i>'; }).join("") + "</div>" : "") + "</div></section>";
    if (C.rsvp) s += '<section><div class="wrap"><h2 class="h2 rv">' + esc(x("rsvp")) + '</h2><p class="rv">' + esc(x("rsvpLead")) + " " + esc(K.deadline()) + "</p>" +
      '<form class="rs rv" id="rf"><label class="radio"><input type="radio" name="attend" value="yes" checked>' + esc(u("yes")) + "</label>" +
      '<label class="radio"><input type="radio" name="attend" value="no">' + esc(u("no")) + "</label>" +
      '<div class="fl"><label for="rn">' + esc(u("name")) + '</label><input id="rn" name="name" required autocomplete="name"></div>' +
      '<div class="fl"><label for="rg">' + esc(u("guests")) + '</label><select id="rg" name="guests">' + [1, 2, 3, 4, 5, 6].map(function (i) { return "<option>" + i + "</option>"; }).join("") + "</select></div>" +
      '<button class="btn fill" type="submit">' + esc(u("send")) + "</button></form></div></section>";
    return s + '<section class="fin grey"><div class="wrap"><div class="sealf rv">' + seal() + '</div><div class="caps rv">' + esc(x("fin")) + '</div><div class="nm rv">' + esc(K.names().join(" & ")) + "</div></div></section>" +
      '<div class="made"><a href="https://hravirir.am" target="_blank" rel="noopener">HRAVIRIR.AM</a></div>';
  }

  var opened = false;
  function render() {
    document.documentElement.lang = K.lang;
    document.title = K.names().join(" & ");
    document.getElementById("app").innerHTML = (opened ? "" : envelope()) + "<main>" + hero() + body() + "</main>" + (opened ? K.chrome() : "");
    document.body.classList.toggle("locked", !opened);
    if (!opened) { drawEnv(); var e = document.getElementById("env"); if (e && !K.PREVIEW) e.onclick = open; } else K.reveal();
    if (window.Watercolor) window.Watercolor.apply();
    K.countdown(true); K.rsvp(document.getElementById("rf")); K.bindChrome(render);
  }
  function open() {
    var env = document.getElementById("env"); if (env.dataset.busy) return; env.dataset.busy = "1";
    K.music.play();
    var st = ["s0", "s1", "s2", "s3", "s4", "s5"], at = [0, 1000, 1450, 2000, 3100, 3900];
    st.forEach(function (s, i) { setTimeout(function () { env.classList.add(s); }, at[i]); });
    setTimeout(function () { env.classList.add("done"); }, 5300);
    setTimeout(function () {
      opened = true; document.body.classList.remove("locked");
      document.getElementById("app").insertAdjacentHTML("beforeend", K.chrome()); K.bindChrome(render); K.reveal();
    }, 5700);
    setTimeout(function () { env.remove(); }, 6400);
  }
  window.addEventListener("resize", drawEnv);
  render();
})();
