/* «Կախարդանք» դիզայնի դասավորությունը */
(function () {
  "use strict";
  var K = window.K, C = K.C, esc = K.esc, t = K.t, u = K.u, pad = K.pad;
  var TXT = {
    hy: { hint: "Սեղմեք լուսնին", top: "Աստղերը գրել են", inv: "Սիրով հրավիրում ենք Ձեզ մեր հարսանիքին", our: "Մեր աստղային պատմությունը", program: "Օրվա ծրագիր", dress: "Դրեսկոդ", left: "Հարսանիքին մնացել է",
      rsvp: "Հարցաթերթիկ", rsvpLead: "Խնդրում ենք պատասխանել մինչև", fin: "Սիրով սպասում ենք Ձեզ", wish: "Ցանկություն պահեք" },
    ru: { hint: "Нажмите на луну", top: "Так решили звёзды", inv: "С любовью приглашаем вас на нашу свадьбу", our: "Наша звёздная история", program: "Программа дня", dress: "Дресс-код", left: "До свадьбы осталось",
      rsvp: "Анкета", rsvpLead: "Пожалуйста, ответьте до", fin: "С любовью ждём вас", wish: "Загадайте желание" },
    en: { hint: "Tap the moon", top: "Written in the stars", inv: "We joyfully invite you to our wedding", our: "Our starry story", program: "Schedule", dress: "Dress code", left: "Counting down",
      rsvp: "RSVP", rsvpLead: "Kindly reply by", fin: "With love", wish: "Make a wish" }
  };
  function x(k) { return (TXT[K.lang] || TXT.hy)[k]; }
  function f(v) { return Math.round(v * 10) / 10; }
  var s0 = 3; function r() { s0 = (s0 * 16807) % 2147483647; return s0 / 2147483647; }
  function ini() { var n = K.list(C.names && (C.names.hy || C.names)); return (n[0] || "").charAt(0) + " & " + (n[1] ? n[1].charAt(0) : ""); }

  function stars(n, seed) {
    s0 = seed || 3; var h = "";
    for (var i = 0; i < n; i++) { var s = .8 + r() * 2.2; h += '<i style="left:' + f(r() * 100) + "%;top:" + f(r() * 100) + "%;width:" + f(s) + "px;height:" + f(s) + "px;animation-delay:-" + f(r() * 4) + "s;animation-duration:" + f(2 + r() * 3) + 's"></i>'; }
    return '<div class="stars">' + h + "</div>";
  }
  function moon(phase) { // 0 = մանգաղ … 3 = լիալուսին
    var dx = [26, 14, 6, 60][phase];
    return '<svg viewBox="0 0 100 100" aria-hidden="true"><defs><radialGradient id="mn' + phase + '" cx=".4" cy=".35"><stop offset="0" stop-color="#fff8e1"/><stop offset=".7" stop-color="#f0dca6"/><stop offset="1" stop-color="#d9bd78"/></radialGradient>' +
      '<mask id="mm' + phase + '"><rect width="100" height="100" fill="#fff"/>' + (phase < 3 ? '<circle cx="' + (50 + dx) + '" cy="' + (50 - dx / 3) + '" r="36" fill="#000"/>' : "") + "</mask></defs>" +
      '<circle cx="50" cy="50" r="46" fill="#f0dca6" opacity=".08"/><circle cx="50" cy="50" r="36" fill="url(#mn' + phase + ')" mask="url(#mm' + phase + ')"/>' +
      (phase === 3 ? '<circle cx="40" cy="42" r="5" fill="#d9bd78" opacity=".45"/><circle cx="58" cy="60" r="7" fill="#d9bd78" opacity=".35"/><circle cx="60" cy="36" r="3" fill="#d9bd78" opacity=".4"/>' : "") + "</svg>";
  }
  // սրտաձև համաստեղություն
  function constellation() {
    var pts = [], i;
    for (i = 0; i < 14; i++) { var a = i / 14 * Math.PI * 2, X = 16 * Math.pow(Math.sin(a), 3), Y = -(13 * Math.cos(a) - 5 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a)); pts.push([f(100 + X * 5.2), f(96 + Y * 5.2)]); }
    var d = "M" + pts.map(function (p) { return p.join(" "); }).join("L") + "Z";
    return '<svg class="cons" viewBox="0 0 200 190" aria-hidden="true"><path d="' + d + '" pathLength="1" fill="none" stroke="#e8cf8e" stroke-width=".9" stroke-opacity=".75"/>' +
      pts.map(function (p, j) { return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + (j % 3 ? 1.8 : 2.8) + '" fill="#fff8e1" style="animation-delay:' + f(j * .08) + 's"/>'; }).join("") + "</svg>";
  }
  function envelope() {
    return '<div class="env" id="env" role="button" aria-label="' + esc(x("hint")) + '">' + stars(90, 7) + '<div class="top"><div class="caps">' + esc(x("top")) + "</div></div>" +
      '<div class="moon" id="moon">' + moon(0) + '</div><i class="shoot"></i><div class="cwrap">' + constellation() + '<div class="ini">' + esc(ini()) + "</div></div>" +
      '<div class="wish">' + esc(x("wish")) + "</div>" + (K.PREVIEW ? "" : '<div class="hint">' + esc(x("hint")) + "</div>") + "</div>";
  }
  function hero() {
    var n = K.names(), d = K.date;
    return '<section class="hero">' + stars(60, 11) + '<div class="wrap"><div class="hm rv">' + moon(0) + '</div><div class="caps rv">' + esc(x("inv")) + '</div><h1 class="nm rv d1"><span>' + esc(n[0] || "") +
      '</span><span class="amp">&amp;</span><span>' + esc(n[1] || "") + "</span></h1>" +
      '<div class="dt rv d2">' + d.getDate() + " " + esc(u("monthsGen")[d.getMonth()]) + " " + d.getFullYear() + '</div><div class="tm0 rv d2">' + pad(d.getHours()) + ":" + pad(d.getMinutes()) + "</div></div></section>";
  }
  function story() {
    return '<section class="deep">' + stars(30, 17) + '<div class="wrap"><h2 class="h2 rv">' + esc(x("our")) + '</h2><p class="p rv">' + esc(t(C.text)) + "</p>" +
      '<div class="cal rv"><div class="cal-h">' + esc(u("months")[K.date.getMonth()]) + " " + K.date.getFullYear() + '</div><div class="cal-g">' + K.calendarCells() + "</div></div></div></section>";
  }
  function countdown() {
    return '<section><div class="wrap"><div class="caps rv">' + esc(x("left")) + '</div><div class="cdn rv" data-cd>' + ["days", "hours", "minutes", "seconds"].map(function (k) {
      return '<div><b data-k="' + k + '">00</b><span>' + esc(u(k)) + "</span></div>";
    }).join("") + "</div></div></section>";
  }
  function program() {
    return '<section class="deep">' + stars(40, 23) + '<div class="wrap"><h2 class="h2 rv">' + esc(x("program")) + '</h2><div class="line">' + (C.events || []).map(function (e, i) {
      return '<div class="ev rv"><div class="pic ico">' + K.evIcon(e, "glow-a") + '</div><div class="tm">' + esc(e.time) + '</div><div class="t">' + esc(t(e.title)) +
        '</div><div class="n">' + esc(t(e.place)) + '</div><div class="a">' + esc(t(e.address)) + "</div>" + (e.map ? '<a class="btn" href="' + esc(e.map) + '" target="_blank" rel="noopener">' + esc(u("map")) + "</a>" : "") + "</div>";
    }).join("") + "</div></div></section>";
  }
  function dress() {
    if (!C.dresscode) return "";
    return '<section><div class="wrap"><h2 class="h2 rv">' + esc(x("dress")) + '</h2><p class="rv">' + esc(t(C.dresscode.text)) + '</p><div class="dots rv">' +
      (C.dresscode.colors || []).map(function (c) { return '<i style="background:' + esc(c) + '"></i>'; }).join("") + "</div></div></section>";
  }
  function rsvp() {
    if (!C.rsvp) return "";
    return '<section class="deep"><div class="wrap"><h2 class="h2 rv">' + esc(x("rsvp")) + '</h2><p class="rv">' + esc(x("rsvpLead")) + " " + esc(K.deadline()) + "</p>" +
      '<form class="rs rv" id="rf"><label class="radio"><input type="radio" name="attend" value="yes" checked>' + esc(u("yes")) + "</label>" +
      '<label class="radio"><input type="radio" name="attend" value="no">' + esc(u("no")) + "</label>" +
      '<div class="fl"><label for="rn">' + esc(u("name")) + '</label><input id="rn" name="name" required autocomplete="name"></div>' +
      '<div class="fl"><label for="rg">' + esc(u("guests")) + '</label><select id="rg" name="guests">' + [1, 2, 3, 4, 5, 6].map(function (i) { return "<option>" + i + "</option>"; }).join("") + "</select></div>" +
      '<button class="btn fill" type="submit">' + esc(u("send")) + "</button></form></div></section>";
  }
  function fin() {
    return '<section class="fin">' + stars(50, 31) + '<div class="wrap"><div class="fc rv">' + constellation() + '</div><div class="caps rv">' + esc(x("fin")) + '</div><div class="nm rv">' + esc(K.names().join(" & ")) + "</div></div></section>" +
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
  // լուսինը բարձրանում է → ընկնող աստղ → աստղերից սիրտ է գծվում սկզբնատառերով → երկինքը բացվում է
  function open() {
    var env = document.getElementById("env"); if (env.dataset.busy) return; env.dataset.busy = "1";
    K.music.play();
    env.classList.add("s1");
    setTimeout(function () { env.classList.add("s2"); }, 700);
    setTimeout(function () { env.classList.add("s3"); }, 3200);
    setTimeout(function () {
      opened = true; document.body.classList.remove("locked");
      document.getElementById("app").insertAdjacentHTML("beforeend", K.chrome()); K.bindChrome(render); K.reveal();
    }, 3800);
    setTimeout(function () { env.remove(); }, 4500);
  }
  render();
})();
