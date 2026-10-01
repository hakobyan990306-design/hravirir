/* «Հրեշտակ» (աղջկա կնունք) դիզայնի դասավորությունը */
(function () {
  "use strict";
  var K = window.K, C = K.C, esc = K.esc, t = K.t, u = K.u;
  var TXT = {
    hy: { hint: "Սեղմեք թևերին", top: "Կնունքի հրավեր", holy: "Սուրբ Մկրտություն", lead: "Սիրով հրավիրում ենք Ձեզ մեր դստեր կնունքին", godp: "Կնքահայր և կնքամայր",
      program: "Օրվա ծրագիր", dress: "Դրեսկոդ", left: "Կնունքին մնացել է", rsvp: "Հարցաթերթիկ", rsvpLead: "Խնդրում ենք պատասխանել մինչև", fin: "Սիրով սպասում ենք Ձեզ",
      wdl: ["Կիրակի", "Երկուշաբթի", "Երեքշաբթի", "Չորեքշաբթի", "Հինգշաբթի", "Ուրբաթ", "Շաբաթ"] },
    ru: { hint: "Нажмите на крылья", top: "Приглашение на крестины", holy: "Святое Крещение", lead: "С любовью приглашаем вас на крестины нашей дочери", godp: "Крёстные",
      program: "Программа дня", dress: "Дресс-код", left: "До крестин осталось", rsvp: "Анкета", rsvpLead: "Пожалуйста, ответьте до", fin: "С любовью ждём вас",
      wdl: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"] },
    en: { hint: "Tap the wings", top: "Baptism invitation", holy: "Holy Baptism", lead: "With love we invite you to our daughter's baptism", godp: "Godparents",
      program: "Schedule", dress: "Dress code", left: "Counting down", rsvp: "RSVP", rsvpLead: "Kindly reply by", fin: "With love",
      wdl: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] }
  };
  function x(k) { return (TXT[K.lang] || TXT.hy)[k]; }
  function f(v) { return Math.round(v * 10) / 10; }

  // թև՝ երեք շարք փետուր (վերևից՝ մանր, ներքև՝ երկար), աջ եզրը՝ «ուս»
  function wing() {
    // ուրվագիծ (ուսը՝ վերևի աջում, ծայրը՝ ներքևի ձախում) + չորս շարք փետուր՝ հետևից (երկար) դեպի առաջ (մանր)
    var sil = "M206 40C150 8 60 22 22 92C6 132 10 204 30 272C54 250 78 244 100 232C126 216 150 186 168 150C188 112 204 78 206 40Z";
    var rows = [
      { a: [152, 160], b: [36, 250], n: 8, L: 80, w: 16, g0: 22, g1: 46, fill: "#f2e1e3" },
      { a: [186, 112], b: [58, 196], n: 8, L: 64, w: 15, g0: 18, g1: 42, fill: "#f8ecec" },
      { a: [200, 72], b: [66, 132], n: 8, L: 48, w: 14, g0: 14, g1: 36, fill: "#fdf6f6" },
      { a: [205, 44], b: [78, 70], n: 7, L: 34, w: 13, g0: 10, g1: 28, fill: "#ffffff" }
    ], p = "";
    rows.forEach(function (rw) {
      for (var i = rw.n - 1; i >= 0; i--) {
        var tt = i / (rw.n - 1), ax = rw.a[0] + (rw.b[0] - rw.a[0]) * tt, ay = rw.a[1] + (rw.b[1] - rw.a[1]) * tt, ang = rw.g0 + (rw.g1 - rw.g0) * tt, L = rw.L * (.8 + tt * .35), w = rw.w;
        var tr = ' transform="translate(' + f(ax) + " " + f(ay) + ") rotate(" + f(ang) + ')"';
        p += "<path" + tr + ' d="M0 0C' + f(w * .8) + " " + f(L * .18) + " " + f(w * .7) + " " + f(L * .78) + " 0 " + f(L) + "C" + f(-w * .7) + " " + f(L * .78) + " " + f(-w * .8) + " " + f(L * .18) + ' 0 0Z" fill="' + rw.fill + '" stroke="#e3c9cd" stroke-width=".8"/>' +
          "<path" + tr + ' d="M0 3V' + f(L * .9) + '" stroke="#ebd6d9" stroke-width=".7"/>';
      }
    });
    return '<svg viewBox="0 0 220 300" aria-hidden="true"><path d="' + sil + '" fill="#fbf1f1" stroke="#e3c9cd" stroke-width="1"/>' + p + "</svg>";
  }
  function feather() { return '<svg viewBox="0 0 16 34"><path d="M8 0C14 8 13 24 8 34C3 24 2 8 8 0Z" fill="#fff" stroke="#e8d3d6" stroke-width=".7"/><path d="M8 2V33" stroke="#e8d3d6" stroke-width=".6"/></svg>'; }
  function feathers(n) {
    var h = "", s = 7; function r() { s = (s * 16807) % 2147483647; return s / 2147483647; }
    for (var i = 0; i < n; i++) h += '<i style="left:' + f(r() * 100) + "%;--x:" + f((r() - .5) * 120) + "px;--r:" + f(r() * 540) + "deg;animation-delay:-" + f(r() * 7) + "s;animation-duration:" + f(6 + r() * 4) + 's">' + feather() + "</i>";
    return '<div class="feathers">' + h + "</div>";
  }
  function envelope() {
    var g = K.guest(), n = K.names();
    return '<div class="env" id="env" role="button" aria-label="' + esc(x("hint")) + '"><div class="halo"></div>' +
      '<div class="top"><div class="caps">' + esc(x("top")) + "</div>" + (g ? "<b>" + esc(g) + "</b>" : "") + "</div>" +
      '<div class="card"><div class="caps">' + esc(x("holy")) + '</div><div class="nm">' + esc(n[0] || "") + "</div></div>" +
      '<div class="wing l">' + wing() + '</div><div class="wing r">' + wing().replace(/(<svg[^>]*>)/, '$1<g transform="translate(220 0) scale(-1 1)">').replace(/<\/svg>$/, "</g></svg>") + "</div>" + feathers(10) +
      (K.PREVIEW ? "" : '<div class="hint">' + esc(x("hint")) + "</div>") + "</div>";
  }
  function hero() {
    var n = K.names(), d = K.date;
    return '<section class="hero">' + feathers(6) + '<div class="wrap"><svg class="wings rv" viewBox="0 0 440 300"><g transform="translate(0 0)">' + wing().replace(/^<svg[^>]*>|<\/svg>$/g, "") + '</g><g transform="translate(440 0) scale(-1 1)">' + wing().replace(/^<svg[^>]*>|<\/svg>$/g, "") + "</g></svg>" +
      '<div class="caps rv">' + esc(x("holy")) + '</div><h1 class="nm rv d1">' + esc(n[0] || "") + '</h1><p class="lead rv d2">' + esc(x("lead")) + "</p>" +
      '<div class="dt3 rv d2"><div class="s">' + esc(x("wdl")[d.getDay()]) + '</div><div class="d">' + d.getDate() + '</div><div class="s">' + esc(u("monthsGen")[d.getMonth()]) + '</div></div><div class="yr rv d2">' + d.getFullYear() + "</div>" +
      (C.photo ? '<div class="oval rv d3" style="background-image:url(\'' + esc(C.photo) + '\')"></div>' : "") + "</div></section>";
  }
  function body() {
    var s = '<section class="pinkbg"><div class="wrap"><p class="p rv">' + esc(t(C.text)) + "</p>" + (C.godparents ? '<div class="caps rv" style="margin-top:26px">' + esc(x("godp")) + '</div><div class="gp rv">' + esc(t(C.godparents)) + "</div>" : "") + "</div></section>" +
      '<section style="padding:40px 0 10px"><div class="wrap"><div class="caps rv">' + esc(x("left")) + '</div><div class="cdn rv" data-cd>' + ["days", "hours", "minutes", "seconds"].map(function (k) {
        return '<div><b data-k="' + k + '">00</b><span>' + esc(u(k)) + "</span></div>"; }).join("") + "</div></div></section>" +
      '<section><div class="wrap"><h2 class="h2 rv">' + esc(x("program")) + "</h2>" + (C.events || []).map(function (e) {
        return '<div class="ev rv">' + (e.img ? '<div class="pic"><img alt="" data-wc="' + esc(e.img) + '"></div>' : '<div class="pic ico">' + K.evIcon(e, "thin-b") + "</div>") + '<div class="tm">' + esc(e.time) + '</div><div class="t">' + esc(t(e.title)) +
          '</div><div class="n">' + esc(t(e.place)) + '</div><div class="a">' + esc(t(e.address)) + "</div>" + (e.map ? '<a class="btn" href="' + esc(e.map) + '" target="_blank" rel="noopener">' + esc(u("map")) + "</a>" : "") + "</div>";
      }).join("") + "</div></section>";
    if (C.dresscode) s += '<section class="pinkbg"><div class="wrap"><h2 class="h2 rv">' + esc(x("dress")) + '</h2><p class="rv">' + esc(t(C.dresscode.text)) + '</p><div class="dots rv">' +
      (C.dresscode.colors || []).map(function (c) { return '<i style="background:' + esc(c) + '"></i>'; }).join("") + "</div></div></section>";
    if (C.rsvp) s += '<section><div class="wrap"><h2 class="h2 rv">' + esc(x("rsvp")) + '</h2><p class="rv">' + esc(x("rsvpLead")) + " " + esc(K.deadline()) + "</p>" +
      '<form class="rs rv" id="rf"><label class="radio"><input type="radio" name="attend" value="yes" checked>' + esc(u("yes")) + "</label>" +
      '<label class="radio"><input type="radio" name="attend" value="no">' + esc(u("no")) + "</label>" +
      '<div class="fl"><label for="rn">' + esc(u("name")) + '</label><input id="rn" name="name" required autocomplete="name"></div>' +
      '<div class="fl"><label for="rg">' + esc(u("guests")) + '</label><select id="rg" name="guests">' + [1, 2, 3, 4, 5, 6].map(function (i) { return "<option>" + i + "</option>"; }).join("") + "</select></div>" +
      '<button class="btn fill" type="submit">' + esc(u("send")) + "</button></form></div></section>";
    return s + '<section class="fin pinkbg"><div class="wrap"><div class="caps rv">' + esc(x("fin")) + '</div><div class="nm rv">' + esc(K.names()[0] || "") + "</div></div></section>" +
      '<div class="made"><a href="https://hravirir.am" target="_blank" rel="noopener">HRAVIRIR.AM</a></div>';
  }

  var opened = false;
  function render() {
    document.documentElement.lang = K.lang;
    document.title = K.names()[0] || "";
    document.getElementById("app").innerHTML = (opened ? "" : envelope()) + "<main>" + hero() + body() + "</main>" + (opened ? K.chrome() : "");
    document.body.classList.toggle("locked", !opened);
    if (!opened) { var e = document.getElementById("env"); if (e && !K.PREVIEW) e.onclick = open; } else K.reveal();
    if (window.Watercolor) window.Watercolor.apply();
    K.countdown(true); K.rsvp(document.getElementById("rf")); K.bindChrome(render);
  }
  // թևերը բացվում են, քարտը մեծանում է
  function open() {
    var env = document.getElementById("env"); if (env.classList.contains("open")) return;
    K.music.play(); env.classList.add("open");
    setTimeout(function () {
      opened = true; document.body.classList.remove("locked");
      document.getElementById("app").insertAdjacentHTML("beforeend", K.chrome()); K.bindChrome(render); K.reveal();
    }, 2600);
    setTimeout(function () { env.remove(); }, 3000);
  }
  render();
})();
