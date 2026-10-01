/* «Ոսկե կնիք» դիզայնի դասավորությունը */
(function () {
  "use strict";
  var K = window.K, C = K.C, esc = K.esc, t = K.t, u = K.u, pad = K.pad;
  var TXT = {
    hy: { hint: "Սեղմեք կնիքին", inv: "Նշանդրեքի հրավեր", lead: "Սիրով հրավիրում ենք Ձեզ մեր նշանդրեքին", story: "Նա ասաց՝ այո", plan: "Օրվա ծրագիր", dress: "Դրեսկոդ", left: "Նշանդրեքին մնացել է",
      rsvp: "Հարցաթերթիկ", rsvpLead: "Խնդրում ենք պատասխանել մինչև", fin: "Սիրով սպասում ենք Ձեզ" },
    ru: { hint: "Нажмите на печать", inv: "Приглашение на помолвку", lead: "С любовью приглашаем вас на нашу помолвку", story: "Она сказала «да»", plan: "Программа дня", dress: "Дресс-код", left: "До помолвки осталось",
      rsvp: "Анкета", rsvpLead: "Пожалуйста, ответьте до", fin: "С любовью ждём вас" },
    en: { hint: "Tap the seal", inv: "Engagement invitation", lead: "With love we invite you to our engagement", story: "She said yes", plan: "Schedule", dress: "Dress code", left: "Counting down",
      rsvp: "RSVP", rsvpLead: "Kindly reply by", fin: "With love" }
  };
  function x(k) { return (TXT[K.lang] || TXT.hy)[k]; }
  function ini() { var n = K.list(C.names && (C.names.hy || C.names)); return (n[0] || "").charAt(0) + (n[1] || "").charAt(0); }
  function f(v) { return Math.round(v * 10) / 10; }

  // ոսկե մոմե կնիք
  function seal() {
    var pts = [], s = 5;
    for (var i = 0; i < 30; i++) { s = (s * 16807) % 2147483647; var a = i / 30 * Math.PI * 2, rr = 46 + (i % 2 ? 3 : -1.5) + (s / 2147483647 - .5) * 3; pts.push(f(50 + Math.cos(a) * rr) + "," + f(50 + Math.sin(a) * rr)); }
    return '<svg viewBox="0 0 100 100" aria-hidden="true"><defs><radialGradient id="gw" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#f3dfae"/><stop offset=".45" stop-color="#c9a15a"/><stop offset="1" stop-color="#8a6428"/></radialGradient></defs>' +
      '<polygon points="' + pts.join(" ") + '" fill="url(#gw)"/><circle cx="50" cy="50" r="32" fill="none" stroke="#8a6428" stroke-width="2" opacity=".6"/>' +
      '<circle cx="50" cy="50" r="27" fill="none" stroke="#f6e6bf" stroke-width=".7" opacity=".7"/>' +
      '<text x="50" y="58" text-anchor="middle" font-family="GHEA Mariam, serif" font-size="21" fill="#7a5620">' + esc(ini()) + "</text>" +
      '<text x="49.3" y="57.3" text-anchor="middle" font-family="GHEA Mariam, serif" font-size="21" fill="#fbecc6" opacity=".45">' + esc(ini()) + "</text></svg>";
  }
  // ջրաներկ վարդ՝ շերտավոր թերթիկներով
  function rose() {
    var p = "", cols = ["#e9b3aa", "#dc9a90", "#f2c7bf", "#d38b82"];
    for (var i = 0; i < 12; i++) { var a = i * 137.5, rr = 6 + i * 3.2, x = 60 + Math.cos(a * Math.PI / 180) * rr * .5, y = 60 + Math.sin(a * Math.PI / 180) * rr * .5;
      p += '<ellipse cx="' + f(x) + '" cy="' + f(y) + '" rx="' + f(10 + i * 1.6) + '" ry="' + f(7 + i * 1.1) + '" transform="rotate(' + f(a) + " " + f(x) + " " + f(y) + ')" fill="' + cols[i % 4] + '" opacity="' + (.9 - i * .04) + '"/>'; }
    var lv = '<ellipse cx="22" cy="92" rx="22" ry="9" transform="rotate(-30 22 92)" fill="#a9b39a" opacity=".85"/><ellipse cx="100" cy="98" rx="20" ry="8" transform="rotate(28 100 98)" fill="#98a58a" opacity=".85"/>';
    return '<svg viewBox="0 0 125 120" aria-hidden="true">' + lv + p + '<path d="M56 56c4-5 10-3 9 3s-8 6-10 1" fill="none" stroke="#b9776e" stroke-width="1.2"/></svg>';
  }
  function petals(n) {
    var h = "", s = 9;
    for (var i = 0; i < n; i++) { s = (s * 16807) % 2147483647; var r1 = s / 2147483647; s = (s * 16807) % 2147483647; var r2 = s / 2147483647;
      h += '<i style="left:' + f(r1 * 94) + "%;top:" + f(r2 * 94) + "%;transform:rotate(" + Math.round(r1 * 360) + "deg) scale(" + f(.6 + r2 * .7) + ')"></i>'; }
    return '<div class="petals">' + h + "</div>";
  }
  function pocket(W, H) {
    return '<svg class="pocket" viewBox="0 0 ' + W + " " + H + '"><defs><filter id="ps"><feDropShadow dx="0" dy="-2" stdDeviation="3" flood-color="#8a5a4a" flood-opacity=".18"/></filter></defs>' +
      '<path d="M0 0L' + W * .52 + " " + H * .56 + "L0 " + H + 'Z" fill="#f8f4ee" filter="url(#ps)"/><path d="M' + W + " 0L" + W * .48 + " " + H * .56 + "L" + W + " " + H + 'Z" fill="#f5f0e9" filter="url(#ps)"/>' +
      '<path d="M0 ' + H + "L" + W / 2 + " " + H * .44 + "L" + W + " " + H + 'Z" fill="#fbf8f3" filter="url(#ps)"/>' +
      '<path d="M8 ' + (H - 1) + "L" + W / 2 + " " + (H * .44 + 6) + "L" + (W - 8) + " " + (H - 1) + '" fill="none" stroke="#d9bd86" stroke-width="1.2" opacity=".8"/></svg>';
  }
  function flap(W, H) {
    return '<svg class="flap" viewBox="0 0 ' + W + " " + H + '"><defs><filter id="fs" x="-10%" y="-10%" width="120%" height="140%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#8a5a4a" flood-opacity=".25"/></filter></defs>' +
      '<path d="M0 0H' + W + "L" + W / 2 + " " + H * .58 + 'Z" fill="#fdfbf7" filter="url(#fs)"/><path d="M6 3H' + (W - 6) + "L" + W / 2 + " " + (H * .58 - 7) + 'Z" fill="none" stroke="#d9bd86" stroke-width="1.2" opacity=".8"/></svg><div class="fin-l"></div>';
  }
  function envelope() {
    var g = K.guest(), n = K.names();
    return '<div class="env" id="env" role="button" aria-label="' + esc(x("hint")) + '">' + petals(16) +
      '<div class="env-top"><div class="caps">' + esc(x("inv")) + "</div>" + (g ? "<b>" + esc(g) + "</b>" : "") + "</div>" +
      '<div class="envw" id="ew"><div class="back"></div>' +
      '<div class="letter"><div class="half lo"><div class="caps">' + esc(K.dateLong()) + '</div></div><div class="up-in"><div class="caps">' + esc(x("lead")) + '</div><div class="nm foil">' + esc(n.join(" & ")) + "</div></div>" +
      '<div class="half up"><div class="nm foil">' + esc(ini().split("").join(" & ")) + "</div></div></div>" +
      '<div class="pk" id="pk"></div><div class="fw" id="fw"></div>' +
      '<div class="seal"><div class="sz">' + seal() + '</div><div class="h hl">' + seal() + '</div><div class="h hr">' + seal() + "</div></div></div>" +
      (K.PREVIEW ? "" : '<div class="env-hint">' + esc(x("hint")) + "</div>") + "</div>";
  }
  function drawEnv() {
    var ew = document.getElementById("ew"); if (!ew) return;
    var r = ew.getBoundingClientRect(), W = Math.round(r.width), H = Math.round(r.height);
    document.getElementById("pk").innerHTML = pocket(W, H); document.getElementById("fw").innerHTML = flap(W, H);
  }
  function hero() {
    var n = K.names(), d = K.date;
    return '<section class="hero"><div class="rose r1">' + rose() + '</div><div class="rose r2">' + rose() + '</div><div class="wrap"><div class="caps rv">' + esc(x("inv")) + "</div>" +
      '<h1 class="nm foil rv d1"><span>' + esc(n[0]) + '</span><span class="amp">&amp;</span><span>' + esc(n[1] || "") + "</span></h1>" +
      '<svg class="ringic rv d2" viewBox="0 0 64 34" fill="none" stroke="#b8904f" stroke-width="1.4"><circle cx="25" cy="20" r="11"/><circle cx="39" cy="20" r="11"/><path d="M36 9l3-5 3 5-3 2z"/></svg>' +
      '<div class="dt rv d2">' + pad(d.getDate()) + " · " + pad(d.getMonth() + 1) + " · " + d.getFullYear() + "</div>" +
      (C.photo ? '<div class="frame rv d3" style="background-image:url(\'' + esc(C.photo) + '\')"></div>' : "") + "</div></section>";
  }
  function story() {
    return '<section class="blush"><div class="wrap"><h2 class="h2 foil rv">' + esc(x("story")) + '</h2><p class="p rv">' + esc(t(C.text)) + '</p></div></section>' +
      '<section style="padding:44px 0"><div class="wrap"><div class="caps rv">' + esc(x("left")) + '</div><div class="cdn rv" data-cd>' + ["days", "hours", "minutes", "seconds"].map(function (k) {
        return '<div><b data-k="' + k + '">00</b><span>' + esc(u(k)) + "</span></div>"; }).join("") + "</div></div></section>";
  }
  function plan() {
    return '<section class="blush"><div class="wrap"><h2 class="h2 foil rv">' + esc(x("plan")) + "</h2>" + (C.events || []).map(function (e) {
      return '<div class="ev rv">' + (e.img ? '<div class="pic"><img alt="" data-wc="' + esc(e.img) + '"></div>' : '<div class="pic ico">' + K.evIcon(e, "arch-b") + "</div>") + '<div class="tm">' + esc(e.time) + '</div><div class="t">' + esc(t(e.title)) +
        '</div><div class="n foil">' + esc(t(e.place)) + '</div><div class="a">' + esc(t(e.address)) + "</div>" + (e.map ? '<a class="btn" href="' + esc(e.map) + '" target="_blank" rel="noopener">' + esc(u("map")) + "</a>" : "") + "</div>";
    }).join("") + (C.dresscode ? '<h2 class="h2 foil rv" style="margin-top:56px">' + esc(x("dress")) + '</h2><p class="rv">' + esc(t(C.dresscode.text)) + '</p><div class="dots rv">' +
      (C.dresscode.colors || []).map(function (c) { return '<i style="background:' + esc(c) + '"></i>'; }).join("") + "</div>" : "") + "</div></section>";
  }
  function rsvp() {
    if (!C.rsvp) return "";
    return '<section><div class="wrap"><h2 class="h2 foil rv">' + esc(x("rsvp")) + '</h2><p class="rv">' + esc(x("rsvpLead")) + " " + esc(K.deadline()) + "</p>" +
      '<form class="rs rv" id="rf"><label class="radio"><input type="radio" name="attend" value="yes" checked>' + esc(u("yes")) + "</label>" +
      '<label class="radio"><input type="radio" name="attend" value="no">' + esc(u("no")) + "</label>" +
      '<div class="fl"><label for="rn">' + esc(u("name")) + '</label><input id="rn" name="name" required autocomplete="name"></div>' +
      '<div class="fl"><label for="rg">' + esc(u("guests")) + '</label><select id="rg" name="guests">' + [1, 2, 3, 4, 5, 6].map(function (i) { return "<option>" + i + "</option>"; }).join("") + "</select></div>" +
      '<button class="btn fill" type="submit">' + esc(u("send")) + "</button></form></div></section>" +
      '<section class="fin blush"><div class="wrap"><div class="sealf rv">' + seal() + '</div><div class="caps rv">' + esc(x("fin")) + '</div><div class="nm foil rv">' + esc(K.names().join(" & ")) + "</div></div></section>" +
      '<div class="made"><a href="https://hravirir.am" target="_blank" rel="noopener">HRAVIRIR.AM</a></div>';
  }

  var opened = false;
  function render() {
    document.documentElement.lang = K.lang;
    document.title = K.names().join(" & ");
    document.getElementById("app").innerHTML = (opened ? "" : envelope()) + "<main>" + hero() + story() + K.gallery() + plan() + rsvp() + "</main>" + (opened ? K.chrome() : "");
    document.body.classList.toggle("locked", !opened);
    if (!opened) { drawEnv(); var e = document.getElementById("env"); if (e && !K.PREVIEW) e.onclick = open; } else K.reveal();
    if (window.Watercolor) window.Watercolor.apply();
    K.countdown(true); K.rsvp(document.getElementById("rf")); K.bindChrome(render);
  }
  // կնիքը ճաքում է → կափարիչը բացվում է → նամակը դուրս է գալիս → ծրարը իջնում է → նամակը բացվում է գրքի պես
  function open() {
    var env = document.getElementById("env"); if (env.dataset.busy) return; env.dataset.busy = "1";
    K.music.play();
    var st = ["s1", "s2", "s3", "s4", "s5"], at = [0, 450, 1000, 2100, 2900];
    st.forEach(function (s, i) { setTimeout(function () { env.classList.add(s); }, at[i]); });
    setTimeout(function () { env.classList.add("done"); }, 4300);
    setTimeout(function () {
      opened = true; document.body.classList.remove("locked");
      document.getElementById("app").insertAdjacentHTML("beforeend", K.chrome()); K.bindChrome(render); K.reveal();
    }, 4700);
    setTimeout(function () { env.remove(); }, 5400);
  }
  window.addEventListener("resize", drawEnv);
  render();
})();
