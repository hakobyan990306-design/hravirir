/* «Կարմիր վարդ» (նշանդրեք) դիզայնի դասավորությունը */
(function () {
  "use strict";
  var K = window.K, C = K.C, esc = K.esc, t = K.t, u = K.u, pad = K.pad;
  var TXT = {
    hy: { hint: "Սեղմեք վարդին", top: "Նշանդրեք", inv: "Սիրով հրավիրում ենք Ձեզ մեր նշանդրեքին", said: "Նա ասաց՝ այո", our: "Մեր պատմությունը", program: "Երեկոյի ծրագիր", dress: "Դրեսկոդ", left: "Մինչև նշանդրեք մնաց",
      rsvp: "Կգա՞ք", rsvpLead: "Խնդրում ենք պատասխանել մինչև", fin: "Սիրով սպասում ենք Ձեզ" },
    ru: { hint: "Нажмите на розу", top: "Помолвка", inv: "С любовью приглашаем вас на нашу помолвку", said: "Она сказала «да»", our: "Наша история", program: "Программа вечера", dress: "Дресс-код", left: "До помолвки осталось",
      rsvp: "Вы придёте?", rsvpLead: "Пожалуйста, ответьте до", fin: "С любовью ждём вас" },
    en: { hint: "Tap the rose", top: "Engagement", inv: "We joyfully invite you to our engagement", said: "She said yes", our: "Our story", program: "The evening", dress: "Dress code", left: "Counting down",
      rsvp: "Will you come?", rsvpLead: "Kindly reply by", fin: "With love" }
  };
  function x(k) { return (TXT[K.lang] || TXT.hy)[k]; }
  function f(v) { return Math.round(v * 10) / 10; }
  var uid = 0, s0 = 9; function r() { s0 = (s0 * 16807) % 2147483647; return s0 / 2147483647; }

  function petal(l, w) {
    return "M0 0C" + f(-w * 1.05) + " " + f(-l * .2) + " " + f(-w * 1.1) + " " + f(-l * .85) + " " + f(-w * .3) + " " + f(-l) + "Q0 " + f(-l * 1.04) + " " + f(w * .3) + " " + f(-l) +
      "C" + f(w * 1.1) + " " + f(-l * .85) + " " + f(w * 1.05) + " " + f(-l * .2) + " 0 0Z";
  }
  // վարդ՝ վերևից. օղակները բացվում են հերթով (դաս .ring և --k)
  function rose(R, anim) {
    var id = "rg" + (++uid); s0 = 9;
    var s = '<svg class="rose" viewBox="-110 -110 220 220" aria-hidden="true"><defs><radialGradient id="' + id + '" cx="0" cy="0" r="' + R + '" gradientUnits="userSpaceOnUse">' +
      '<stop offset="0" stop-color="#3d0610"/><stop offset=".45" stop-color="#8e1426"/><stop offset=".85" stop-color="#c62a3c"/><stop offset="1" stop-color="#e0485a"/></radialGradient>' +
      '<radialGradient id="' + id + 's" cx="0" cy="0" r="' + R + '" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#000" stop-opacity=".55"/><stop offset=".5" stop-color="#000" stop-opacity="0"/></radialGradient></defs>';
    s += '<g class="lv"><path d="M0 0C30 -20 70 -30 100 -10C80 10 40 20 0 0Z" fill="#2f5a3a" transform="rotate(35)"/><path d="M0 0C30 -20 70 -30 100 -10C80 10 40 20 0 0Z" fill="#3b6d47" transform="rotate(160)"/><path d="M0 0C30 -20 70 -30 100 -10C80 10 40 20 0 0Z" fill="#2f5a3a" transform="rotate(260)"/></g>';
    var rings = [[5, 1, .56, 0], [5, .86, .52, 36], [6, .7, .44, 12], [6, .55, .38, 40], [5, .4, .32, 20], [4, .27, .26, 50], [3, .16, .2, 10]];
    rings.forEach(function (g, k) {
      s += '<g class="ring" style="--k:' + (rings.length - 1 - k) + '">';
      for (var i = 0; i < g[0]; i++) s += '<path d="' + petal(R * g[1] * (.92 + r() * .16), R * g[2]) + '" transform="rotate(' + f(g[3] + i * 360 / g[0] + (r() - .5) * 12) + ')" fill="url(#' + id + ')" stroke="#4a0812" stroke-opacity=".5" stroke-width=".8"/>';
      s += "</g>";
    });
    return s + '<circle r="' + f(R * .09) + '" fill="#3d0610"/><circle class="shd" r="' + R + '" fill="url(#' + id + 's)" pointer-events="none"/></svg>';
  }
  function falling(n) {
    var h = ""; s0 = 21;
    for (var i = 0; i < n; i++) {
      var sz = 14 + r() * 16;
      h += '<i style="left:' + f(r() * 100) + "%;width:" + f(sz) + "px;height:" + f(sz * 1.2) + "px;--x:" + f((r() - .5) * 120) + "px;--r:" + f(r() * 720 - 360) + "deg;--d:" + f(2.4 + r() * 2) + "s;--dl:" + f(r() * 1.2) + 's"></i>';
    }
    return '<div class="fall">' + h + "</div>";
  }
  function ring() {
    return '<svg viewBox="0 0 100 100" aria-hidden="true"><defs><linearGradient id="gd" x1="0" x2="1"><stop offset="0" stop-color="#a87b3e"/><stop offset=".5" stop-color="#f4dca2"/><stop offset="1" stop-color="#a87b3e"/></linearGradient></defs>' +
      '<ellipse cx="50" cy="62" rx="30" ry="26" fill="none" stroke="url(#gd)" stroke-width="6"/><path d="M40 30L50 18L60 30L50 42Z" fill="#fdf6f6" stroke="#d9c7c7" stroke-width="1.2"/><path d="M40 30H60M50 18L46 30L50 42L54 30Z" stroke="#d9c7c7" stroke-width=".8" fill="none"/></svg>';
  }
  function envelope() {
    var n = K.names();
    return '<div class="env" id="env" role="button" aria-label="' + esc(x("hint")) + '"><div class="velv"></div><div class="top"><div class="caps">' + esc(x("top")) + "</div></div>" +
      '<div class="rw">' + rose(100) + '</div><div class="names"><div class="said">' + esc(x("said")) + '</div><div class="nm">' + esc(n.join(" & ")) + "</div></div>" + falling(34) +
      (K.PREVIEW ? "" : '<div class="hint">' + esc(x("hint")) + "</div>") + "</div>";
  }
  function hero() {
    var n = K.names(), d = K.date;
    return '<section class="hero"><div class="hr rv">' + rose(100) + '</div><div class="wrap"><div class="caps rv">' + esc(x("inv")) + '</div><h1 class="nm rv d1"><span>' + esc(n[0] || "") +
      '</span><span class="amp">&amp;</span><span>' + esc(n[1] || "") + "</span></h1>" +
      '<div class="dt rv d2"><span>' + pad(d.getDate()) + "</span><i></i><span>" + pad(d.getMonth() + 1) + "</span><i></i><span>" + d.getFullYear() + "</span></div></div></section>";
  }
  function story() {
    return '<section class="cream"><div class="wrap"><h2 class="h2 rv">' + esc(x("our")) + '</h2><p class="p rv">' + esc(t(C.text)) + "</p>" +
      '<div class="cal rv"><div class="cal-h">' + esc(u("months")[K.date.getMonth()]) + " " + K.date.getFullYear() + '</div><div class="cal-g">' + K.calendarCells() + "</div></div></div></section>";
  }
  function countdown() {
    return '<section><div class="wrap"><div class="caps rv">' + esc(x("left")) + '</div><div class="cdn rv" data-cd>' + ["days", "hours", "minutes", "seconds"].map(function (k) {
      return '<div><b data-k="' + k + '">00</b><span>' + esc(u(k)) + "</span></div>";
    }).join("") + "</div></div></section>";
  }
  function program() {
    return '<section class="cream"><div class="wrap"><h2 class="h2 rv">' + esc(x("program")) + "</h2>" + (C.events || []).map(function (e, i) {
      return '<div class="ev rv"><div class="pic ico">' + (i % 2 ? ring() : rose(100)) + '</div><div class="tm">' + esc(e.time) + '</div><div class="t">' + esc(t(e.title)) +
        '</div><div class="n">' + esc(t(e.place)) + '</div><div class="a">' + esc(t(e.address)) + "</div>" + (e.map ? '<a class="btn" href="' + esc(e.map) + '" target="_blank" rel="noopener">' + esc(u("map")) + "</a>" : "") + "</div>";
    }).join("") + "</div></section>";
  }
  function dress() {
    if (!C.dresscode) return "";
    return '<section><div class="wrap"><h2 class="h2 rv">' + esc(x("dress")) + '</h2><p class="rv">' + esc(t(C.dresscode.text)) + '</p><div class="dots rv">' +
      (C.dresscode.colors || []).map(function (c) { return '<i style="background:' + esc(c) + '"></i>'; }).join("") + "</div></div></section>";
  }
  function rsvp() {
    if (!C.rsvp) return "";
    return '<section class="cream"><div class="wrap"><h2 class="h2 rv">' + esc(x("rsvp")) + '</h2><p class="rv">' + esc(x("rsvpLead")) + " " + esc(K.deadline()) + "</p>" +
      '<form class="rs rv" id="rf"><label class="radio"><input type="radio" name="attend" value="yes" checked>' + esc(u("yes")) + "</label>" +
      '<label class="radio"><input type="radio" name="attend" value="no">' + esc(u("no")) + "</label>" +
      '<div class="fl"><label for="rn">' + esc(u("name")) + '</label><input id="rn" name="name" required autocomplete="name"></div>' +
      '<div class="fl"><label for="rg">' + esc(u("guests")) + '</label><select id="rg" name="guests">' + [1, 2, 3, 4, 5, 6].map(function (i) { return "<option>" + i + "</option>"; }).join("") + "</select></div>" +
      '<button class="btn fill" type="submit">' + esc(u("send")) + "</button></form></div></section>";
  }
  function fin() {
    return '<section class="fin"><div class="wrap"><div class="fr rv">' + ring() + '</div><div class="caps rv">' + esc(x("fin")) + '</div><div class="nm rv">' + esc(K.names().join(" & ")) + "</div></div></section>" +
      '<div class="made"><a href="https://hravirir.am" target="_blank" rel="noopener">HRAVIRIR.AM</a></div>';
  }

  var opened = false;
  function render() {
    document.documentElement.lang = K.lang;
    document.title = K.names().join(" & ");
    document.getElementById("app").innerHTML = (opened ? "" : envelope()) + "<main>" + hero() + story() + countdown() + program() + dress() + rsvp() + fin() + "</main>" + (opened ? K.chrome() : "");
    document.body.classList.toggle("locked", !opened);
    if (!opened) { var e = document.getElementById("env"); if (e && !K.PREVIEW) e.onclick = open; } else K.reveal();
    K.countdown(true); K.rsvp(document.getElementById("rf")); K.bindChrome(render);
  }
  // կոկոնը բացվում է թերթիկ առ թերթիկ → անունները → թերթիկները թափվում են
  function open() {
    var env = document.getElementById("env"); if (env.dataset.busy) return; env.dataset.busy = "1";
    K.music.play();
    env.classList.add("s1");
    setTimeout(function () { env.classList.add("s2"); }, 1900);
    setTimeout(function () { env.classList.add("s3"); }, 3900);
    setTimeout(function () {
      opened = true; document.body.classList.remove("locked");
      document.getElementById("app").insertAdjacentHTML("beforeend", K.chrome()); K.bindChrome(render); K.reveal();
    }, 4500);
    setTimeout(function () { env.remove(); }, 5200);
  }
  render();
})();
