/* «Տարազ» դիզայնի դասավորությունը */
(function () {
  "use strict";
  var K = window.K, C = K.C, esc = K.esc, t = K.t, u = K.u, pad = K.pad;
  var TXT = {
    hy: { hint: "Սեղմեք զարդին", envTop: "Հարսանյաց հրավեր", inv: "Սիրով հրավիրում ենք Ձեզ մեր հարսանիքին", our: "Օրհնյալ օջախ", program: "Օրվա ծրագիր", dress: "Դրեսկոդ", left: "Հարսանիքին մնացել է",
      rsvp: "Հարցաթերթիկ", rsvpLead: "Խնդրում ենք պատասխանել մինչև", fin: "Սիրով սպասում ենք Ձեզ", wdl: ["Կիրակի", "Երկուշաբթի", "Երեքշաբթի", "Չորեքշաբթի", "Հինգշաբթի", "Ուրբաթ", "Շաբաթ"] },
    ru: { hint: "Нажмите на узор", envTop: "Свадебное приглашение", inv: "С любовью приглашаем вас на нашу свадьбу", our: "Благословенный очаг", program: "Программа дня", dress: "Дресс-код", left: "До свадьбы осталось",
      rsvp: "Анкета", rsvpLead: "Пожалуйста, ответьте до", fin: "С любовью ждём вас", wdl: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"] },
    en: { hint: "Tap the ornament", envTop: "Wedding invitation", inv: "We joyfully invite you to our wedding", our: "A blessed home", program: "Schedule", dress: "Dress code", left: "Counting down",
      rsvp: "RSVP", rsvpLead: "Kindly reply by", fin: "With love", wdl: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] }
  };
  function x(k) { return (TXT[K.lang] || TXT.hy)[k]; }
  function f(v) { return Math.round(v * 10) / 10; }
  var RED = "#8c1c24", DARK = "#5e0f18", GOLD = "#c9a04e", GOLDL = "#ecd49a", CREAM = "#f5ead6";

  // Հավերժության նշան (արևախաչ)
  function arev(cx, cy, r, col) {
    var s = "";
    for (var i = 0; i < 8; i++) s += '<path transform="translate(' + cx + " " + cy + ") rotate(" + i * 45 + ')" d="M0 0C' + f(r * .12) + " " + f(-r * .5) + " " + f(r * .62) + " " + f(-r * .8) + " " + f(r * .98) + " " + f(-r * .3) +
      "C" + f(r * .72) + " " + f(-r * .48) + " " + f(r * .36) + " " + f(-r * .38) + ' 0 0Z" fill="' + col + '"/>';
    return s + '<circle cx="' + cx + '" cy="' + cy + '" r="' + f(r * .14) + '" fill="' + col + '"/>';
  }
  function star8(cx, cy, r, c1, c2) {
    var a = r * .72;
    return '<rect x="' + f(cx - a) + '" y="' + f(cy - a) + '" width="' + f(a * 2) + '" height="' + f(a * 2) + '" fill="' + c1 + '"/>' +
      '<rect x="' + f(cx - a) + '" y="' + f(cy - a) + '" width="' + f(a * 2) + '" height="' + f(a * 2) + '" transform="rotate(45 ' + cx + " " + cy + ')" fill="' + c1 + '"/>' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="' + f(r * .64) + '" fill="' + c2 + '"/>';
  }
  function medallion() {
    return '<svg viewBox="0 0 120 120" aria-hidden="true"><defs><radialGradient id="mg" cx=".4" cy=".35"><stop offset="0" stop-color="#fbe7b0"/><stop offset=".6" stop-color="' + GOLD + '"/><stop offset="1" stop-color="#8a6526"/></radialGradient></defs>' +
      star8(60, 60, 58, "url(#mg)", DARK) + '<circle cx="60" cy="60" r="34" fill="none" stroke="' + GOLDL + '" stroke-width="1.2" stroke-dasharray="2 3"/>' + arev(60, 60, 30, "url(#mg)") + "</svg>";
  }
  function coins(n) {
    var h = '<svg class="coins" viewBox="0 0 ' + n * 24 + ' 60" preserveAspectRatio="none" aria-hidden="true"><defs><radialGradient id="cg" cx=".38" cy=".35"><stop offset="0" stop-color="#fff2c6"/><stop offset=".55" stop-color="#d6ae5a"/><stop offset="1" stop-color="#8a6526"/></radialGradient></defs>' +
      '<path d="M0 6H' + n * 24 + '" stroke="' + GOLD + '" stroke-width="2" stroke-dasharray="3 2"/>';
    for (var i = 0; i < n; i++) {
      var cx = 12 + i * 24, L = i % 2 ? 26 : 16;
      h += '<g class="cn" style="animation-delay:-' + f((i % 5) * .35) + 's"><path d="M' + cx + " 6V" + L + '" stroke="' + GOLD + '" stroke-width="1.2"/><circle cx="' + cx + '" cy="' + (L + 10) + '" r="10" fill="url(#cg)" stroke="#8a6526" stroke-width=".8"/>' +
        '<circle cx="' + cx + '" cy="' + (L + 10) + '" r="6.5" fill="none" stroke="#8a6526" stroke-width=".6"/></g>';
    }
    return h + "</svg>";
  }
  // ծրագրի զարդեր՝ յուրաքանչյուրը տարբեր
  function icon(i) {
    var s = '<svg viewBox="0 0 100 100" aria-hidden="true">';
    if (i === 0) s += '<path d="M36 30l5-14 5 9 4-12 4 12 5-9 5 14z" fill="' + GOLD + '"/><circle cx="50" cy="60" r="30" fill="' + RED + '" stroke="' + GOLD + '" stroke-width="2.5"/>' +
      '<path d="M50 40c-9 8-9 32 0 40c9-8 9-32 0-40z" fill="' + DARK + '"/>' + [[42, 54], [58, 54], [46, 66], [54, 66], [50, 58]].map(function (p) { return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="2.6" fill="' + GOLDL + '"/>'; }).join("");
    else if (i === 1) s += '<circle cx="50" cy="50" r="46" fill="' + RED + '" stroke="' + GOLD + '" stroke-width="2.5"/>' + arev(50, 50, 38, GOLDL);
    else if (i === 2) s += '<path d="M50 4v92M4 50h92" stroke="' + GOLD + '" stroke-width="1"/><path d="M50 10c8 10 8 16 0 22c-8-6-8-12 0-22zM50 90c8-10 8-16 0-22c-8 6-8 12 0 22zM10 50c10-8 16-8 22 0c-6 8-12 8-22 0zM90 50c-10-8-16-8-22 0c6 8 12 8 22 0z" fill="' + RED + '" stroke="' + GOLD + '" stroke-width="2"/>' +
      '<rect x="38" y="38" width="24" height="24" transform="rotate(45 50 50)" fill="' + GOLD + '"/><circle cx="50" cy="50" r="6" fill="' + DARK + '"/>';
    else s += star8(50, 50, 48, GOLD, RED) + '<circle cx="50" cy="50" r="22" fill="none" stroke="' + GOLDL + '" stroke-width="1.5"/>' + star8(50, 50, 16, GOLDL, DARK);
    return s + "</svg>";
  }

  function envelope() {
    var n = K.names();
    return '<div class="env" id="env" role="button" aria-label="' + esc(x("hint")) + '"><div class="inside"><div class="orn">' + icon(1) + '</div><div class="nm">' + esc(n[0] || "") +
      '</div><div class="amp">&amp;</div><div class="nm">' + esc(n[1] || "") + "</div></div>" +
      '<div class="door l"><div class="frame"></div></div><div class="door r"><div class="frame"></div></div>' + coins(18) +
      '<div class="top"><div class="caps">' + esc(x("envTop")) + '</div></div><div class="med" id="med">' + medallion() + "</div>" +
      (K.PREVIEW ? "" : '<div class="hint">' + esc(x("hint")) + "</div>") + "</div>";
  }
  function hero() {
    var n = K.names(), d = K.date;
    return '<section class="hero">' + coins(18) + '<div class="wrap"><div class="card rv"><div class="med s">' + medallion() + '</div><div class="caps">' + esc(x("inv")) + "</div>" +
      '<h1 class="nm"><span>' + esc(n[0] || "") + '</span><span class="amp">&amp;</span><span>' + esc(n[1] || "") + "</span></h1>" +
      '<div class="dt3"><div class="s">' + esc(x("wdl")[d.getDay()]) + '</div><div class="d">' + d.getDate() + '</div><div class="s">' + esc(u("monthsGen")[d.getMonth()]) + "</div></div>" +
      '<div class="yr">' + d.getFullYear() + "</div></div></div></section>";
  }
  function story() {
    return '<div class="strip"></div><section class="cream"><div class="wrap"><h2 class="h2 rv">' + esc(x("our")) + '</h2><div class="orn-s rv">' + icon(0) + '</div><p class="p rv">' + esc(t(C.text)) + "</p>" +
      '<div class="cal rv"><div class="cal-h">' + esc(u("months")[K.date.getMonth()]) + " " + K.date.getFullYear() + '</div><div class="cal-g">' + K.calendarCells() + "</div></div></div></section>";
  }
  function countdown() {
    return '<section class="velvet"><div class="wrap"><div class="caps rv">' + esc(x("left")) + '</div><div class="cdn rv" data-cd>' + ["days", "hours", "minutes", "seconds"].map(function (k) {
      return '<div><b data-k="' + k + '">00</b><span>' + esc(u(k)) + "</span></div>";
    }).join("") + "</div></div></section>";
  }
  function program() {
    return '<section class="cream"><div class="wrap"><h2 class="h2 rv">' + esc(x("program")) + "</h2>" + (C.events || []).map(function (e, i) {
      return '<div class="ev rv"><div class="pic ico">' + K.evIcon(e, "diamond-b") + '</div><div class="tm">' + esc(e.time) + '</div><div class="t">' + esc(t(e.title)) +
        '</div><div class="n">' + esc(t(e.place)) + '</div><div class="a">' + esc(t(e.address)) + "</div>" + (e.map ? '<a class="btn" href="' + esc(e.map) + '" target="_blank" rel="noopener">' + esc(u("map")) + "</a>" : "") + "</div>";
    }).join('<div class="sep"></div>') + "</div></section>";
  }
  function dress() {
    if (!C.dresscode) return "";
    return '<div class="strip"></div><section class="velvet"><div class="wrap"><h2 class="h2 rv">' + esc(x("dress")) + '</h2><p class="rv">' + esc(t(C.dresscode.text)) + '</p><div class="dots rv">' +
      (C.dresscode.colors || []).map(function (c) { return '<i style="background:' + esc(c) + '"></i>'; }).join("") + '</div></div></section><div class="strip"></div>';
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
    return '<section class="velvet fin"><div class="wrap"><div class="med s rv">' + medallion() + '</div><div class="caps rv">' + esc(x("fin")) + '</div><div class="nm rv">' + esc(K.names().join(" & ")) + "</div></div></section>" +
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
  // զարդը պտտվում է և անհետանում → թավշե փեղկերը բացվում են → երևում են անունները
  function open() {
    var env = document.getElementById("env"); if (env.dataset.busy) return; env.dataset.busy = "1";
    K.music.play();
    env.classList.add("s1");
    setTimeout(function () { env.classList.add("s2"); }, 900);
    setTimeout(function () { env.classList.add("s3"); }, 3300);
    setTimeout(function () {
      opened = true; document.body.classList.remove("locked");
      document.getElementById("app").insertAdjacentHTML("beforeend", K.chrome()); K.bindChrome(render); K.reveal();
    }, 3900);
    setTimeout(function () { env.remove(); }, 4600);
  }
  render();
})();
