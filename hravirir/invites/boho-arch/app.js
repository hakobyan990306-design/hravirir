/* «Կամար» (բոհո նշանդրեք) դիզայնի դասավորությունը */
(function () {
  "use strict";
  var K = window.K, C = K.C, esc = K.esc, t = K.t, u = K.u, pad = K.pad;
  var TXT = {
    hy: { hint: "Սեղմեք կամարին", top: "Հրավեր նշանդրեքի", story: "Մեր պատմությունը", plan: "Երեկոյի ծրագիր", dress: "Դրեսկոդ", left: "Մնաց",
      rsvp: "Կմիանա՞ք մեզ", rsvpLead: "Խնդրում ենք պատասխանել մինչև", fin: "Սիրով սպասում ենք Ձեզ" },
    ru: { hint: "Нажмите на арку", top: "Приглашение на помолвку", story: "Наша история", plan: "Программа вечера", dress: "Дресс-код", left: "Осталось",
      rsvp: "Вы с нами?", rsvpLead: "Пожалуйста, ответьте до", fin: "С любовью ждём вас" },
    en: { hint: "Tap the arch", top: "Engagement invitation", story: "Our story", plan: "The evening", dress: "Dress code", left: "Time left",
      rsvp: "Will you join us?", rsvpLead: "Kindly reply by", fin: "With love" }
  };
  function x(k) { return (TXT[K.lang] || TXT.hy)[k]; }
  function f(v) { return Math.round(v * 10) / 10; }

  // պամպասի ճյուղ՝ բարակ փետրավոր թելերով
  function pampas() {
    var s = 17, p = "";
    function r() { s = (s * 16807) % 2147483647; return s / 2147483647; }
    [[70, 330, 20, 60, -10], [95, 330, 60, 20, 8], [120, 330, 110, 70, 22], [60, 330, 10, 150, -26]].forEach(function (st) {
      var x0 = st[0], y0 = st[1], x1 = st[2], y1 = st[3];
      p += '<path d="M' + x0 + " " + y0 + "Q" + f((x0 + x1) / 2 + st[4]) + " " + f((y0 + y1) / 2) + " " + x1 + " " + y1 + '" stroke="#b79b77" stroke-width="1.4" fill="none"/>';
      for (var i = 0; i < 160; i++) {
        var tt = .35 + r() * .65, bx = x0 + (x1 - x0) * tt + st[4] * 2 * tt * (1 - tt), by = y0 + (y1 - y0) * tt, ang = Math.atan2(y1 - y0, x1 - x0) + (r() - .5) * 1.6, len = 12 + r() * 30 * (1 - tt * .35);
        p += '<path d="M' + f(bx) + " " + f(by) + "q" + f(Math.cos(ang) * len * .5 + 3) + " " + f(Math.sin(ang) * len * .5) + " " + f(Math.cos(ang) * len) + " " + f(Math.sin(ang) * len) +
          '" stroke="' + ["#efe0c8", "#e6d2b4", "#f6ecdc", "#d9c19e"][i % 4] + '" stroke-width="' + f(1 + r() * 1.2) + '" stroke-linecap="round" fill="none" opacity=".9"/>';
      }
    });
    return '<svg viewBox="0 0 140 340" aria-hidden="true">' + p + "</svg>";
  }
  function hills() {
    return '<svg viewBox="0 0 200 80" preserveAspectRatio="none" aria-hidden="true"><path d="M0 40Q40 10 80 34T160 26T200 30V80H0Z" fill="#c5714c" opacity=".7"/><path d="M0 56Q50 30 100 50T200 44V80H0Z" fill="#a3553a"/>' +
      '<path d="M0 68Q60 52 120 66T200 62V80H0Z" fill="#8c4a2f"/></svg>';
  }
  function envelope() {
    var g = K.guest(), n = K.names();
    return '<div class="env" id="env" role="button" aria-label="' + esc(x("hint")) + '"><div class="top"><div class="caps">' + esc(x("top")) + "</div>" + (g ? "<b>" + esc(g) + "</b>" : "") + "</div>" +
      '<div class="archw"><div class="win"><div class="sun"></div><div class="nm">' + esc(n[0] || "") + "<i>&amp;</i>" + esc(n[1] || "") + '</div><div class="hills">' + hills() + "</div></div></div>" +
      '<div class="pam l">' + pampas() + '</div><div class="pam r">' + pampas() + "</div>" +
      (K.PREVIEW ? "" : '<div class="hint">' + esc(x("hint")) + "</div>") + "</div>";
  }
  function hero() {
    var n = K.names(), d = K.date;
    return '<section class="hero"><div class="rays"></div><div class="pam2" style="left:-30px">' + pampas() + '</div><div class="pam2" style="right:-30px;transform:scaleX(-1)">' + pampas() + "</div>" +
      '<div class="wrap" style="position:relative"><div class="caps rv">' + esc(x("top")) + '</div><h1 class="nm rv d1"><span>' + esc(n[0]) + '</span><span class="amp">&amp;</span><span>' + esc(n[1] || "") + "</span></h1>" +
      '<div class="dt rv d2">' + pad(d.getDate()) + " · " + pad(d.getMonth() + 1) + " · " + d.getFullYear() + "</div>" +
      (C.photo ? '<div class="archp rv d3" style="background-image:url(\'' + esc(C.photo) + '\')"></div>' : "") + "</div></section>";
  }
  function body() {
    var s = '<section class="sandbg"><div class="wrap"><h2 class="h2 rv">' + esc(x("story")) + '</h2><p class="p rv">' + esc(t(C.text)) + "</p></div></section>" +
      '<section style="padding:44px 0 10px"><div class="wrap"><div class="caps rv">' + esc(x("left")) + '</div><div class="cdn rv" data-cd>' + ["days", "hours", "minutes", "seconds"].map(function (k) {
        return '<div><b data-k="' + k + '">00</b><span>' + esc(u(k)) + "</span></div>"; }).join("") + "</div></div></section>" +
      '<section><div class="wrap"><h2 class="h2 rv">' + esc(x("plan")) + "</h2>" + (C.events || []).map(function (e) {
        return '<div class="ev rv">' + (e.img ? '<div class="pic"><img alt="" data-wc="' + esc(e.img) + '"></div>' : '<div class="pic ico">' + pampas() + "</div>") + '<div class="tm">' + esc(e.time) + '</div><div class="t">' + esc(t(e.title)) +
          '</div><div class="n">' + esc(t(e.place)) + '</div><div class="a">' + esc(t(e.address)) + "</div>" + (e.map ? '<a class="btn" href="' + esc(e.map) + '" target="_blank" rel="noopener">' + esc(u("map")) + "</a>" : "") + "</div>";
      }).join("") + "</div></section>";
    if (C.dresscode) s += '<section class="sandbg"><div class="wrap"><h2 class="h2 rv">' + esc(x("dress")) + '</h2><p class="rv">' + esc(t(C.dresscode.text)) + '</p><div class="dots rv">' +
      (C.dresscode.colors || []).map(function (c) { return '<i style="background:' + esc(c) + '"></i>'; }).join("") + "</div></div></section>";
    if (C.rsvp) s += '<section><div class="wrap"><h2 class="h2 rv">' + esc(x("rsvp")) + '</h2><p class="rv">' + esc(x("rsvpLead")) + " " + esc(K.deadline()) + "</p>" +
      '<form class="rs rv" id="rf"><label class="radio"><input type="radio" name="attend" value="yes" checked>' + esc(u("yes")) + "</label>" +
      '<label class="radio"><input type="radio" name="attend" value="no">' + esc(u("no")) + "</label>" +
      '<div class="fl"><label for="rn">' + esc(u("name")) + '</label><input id="rn" name="name" required autocomplete="name"></div>' +
      '<div class="fl"><label for="rg">' + esc(u("guests")) + '</label><select id="rg" name="guests">' + [1, 2, 3, 4, 5, 6].map(function (i) { return "<option>" + i + "</option>"; }).join("") + "</select></div>" +
      '<button class="btn fill" type="submit">' + esc(u("send")) + "</button></form></div></section>";
    return s + '<section class="fin sandbg"><div class="wrap"><div class="caps rv">' + esc(x("fin")) + '</div><div class="nm rv">' + esc(K.names().join(" & ")) + "</div></div></section>" +
      '<div class="made"><a href="https://hravirir.am" target="_blank" rel="noopener">HRAVIRIR.AM</a></div>';
  }

  var opened = false;
  function render() {
    document.documentElement.lang = K.lang;
    document.title = K.names().join(" & ");
    document.getElementById("app").innerHTML = (opened ? "" : envelope()) + "<main>" + hero() + body() + "</main>" + (opened ? K.chrome() : "");
    document.body.classList.toggle("locked", !opened);
    if (!opened) { var e = document.getElementById("env"); if (e && !K.PREVIEW) e.onclick = open; } else K.reveal();
    if (window.Watercolor) window.Watercolor.apply();
    K.countdown(true); K.rsvp(document.getElementById("rf")); K.bindChrome(render);
  }
  // պամպասները բացվում են կողքերով, մենք «մտնում» ենք կամարի միջով
  function open() {
    var env = document.getElementById("env"); if (env.classList.contains("open")) return;
    K.music.play(); env.classList.add("open");
    setTimeout(function () {
      opened = true; document.body.classList.remove("locked");
      document.getElementById("app").insertAdjacentHTML("beforeend", K.chrome()); K.bindChrome(render); K.reveal();
    }, 2100);
    setTimeout(function () { env.remove(); }, 2600);
  }
  render();
})();
