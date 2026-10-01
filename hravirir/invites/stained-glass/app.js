/* «Վիտրաժ» դիզայնի դասավորությունը */
(function () {
  "use strict";
  var K = window.K, C = K.C, esc = K.esc, t = K.t, u = K.u, pad = K.pad;
  var TXT = {
    hy: { hint: "Սեղմեք պատուհանին", envTop: "Հարսանյաց հրավեր", inv: "Սիրով հրավիրում ենք Ձեզ մեր պսակադրությանը և հարսանյաց հանդեսին", our: "Մեր խոսքը", program: "Օրվա ծրագիր", dress: "Դրեսկոդ", left: "Հարսանիքին մնացել է",
      rsvp: "Հարցաթերթիկ", rsvpLead: "Խնդրում ենք պատասխանել մինչև", fin: "Սիրով սպասում ենք Ձեզ", wdl: ["Կիրակի", "Երկուշաբթի", "Երեքշաբթի", "Չորեքշաբթի", "Հինգշաբթի", "Ուրբաթ", "Շաբաթ"] },
    ru: { hint: "Нажмите на окно", envTop: "Свадебное приглашение", inv: "С любовью приглашаем вас на наше венчание и свадебное торжество", our: "Наши слова", program: "Программа дня", dress: "Дресс-код", left: "До свадьбы осталось",
      rsvp: "Анкета", rsvpLead: "Пожалуйста, ответьте до", fin: "С любовью ждём вас", wdl: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"] },
    en: { hint: "Tap the window", envTop: "Wedding invitation", inv: "We joyfully invite you to our wedding ceremony and celebration", our: "Our words", program: "Schedule", dress: "Dress code", left: "Counting down",
      rsvp: "RSVP", rsvpLead: "Kindly reply by", fin: "With love", wdl: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] }
  };
  function x(k) { return (TXT[K.lang] || TXT.hy)[k]; }
  function f(v) { return Math.round(v * 10) / 10; }
  var LEAD = "#2b2426", RUBY = "#b3263a", SAPH = "#2458a6", EMER = "#2f7d57", AMB = "#e2a93b", VIO = "#6c3f8f", PALE = "#f3e3b8";
  var uid = 0;

  // վարդյակ-պատուհան
  function rose(cx, cy, R) {
    var s = '<circle cx="' + cx + '" cy="' + cy + '" r="' + R + '" fill="' + PALE + '" stroke="' + LEAD + '" stroke-width="2.4"/>', cols = [RUBY, SAPH, EMER, AMB];
    for (var i = 0; i < 12; i++) s += '<circle cx="' + f(cx + Math.cos(i * Math.PI / 6) * R * .86) + '" cy="' + f(cy + Math.sin(i * Math.PI / 6) * R * .86) + '" r="' + f(R * .1) + '" fill="' + (i % 2 ? SAPH : RUBY) + '" stroke="' + LEAD + '" stroke-width="1.4"/>';
    for (var j = 0; j < 12; j++) s += '<ellipse cx="' + f(cx + R * .5) + '" cy="' + cy + '" rx="' + f(R * .26) + '" ry="' + f(R * .13) + '" transform="rotate(' + j * 30 + " " + cx + " " + cy + ')" fill="' + cols[j % 4] + '" stroke="' + LEAD + '" stroke-width="1.4"/>';
    s += '<circle cx="' + cx + '" cy="' + cy + '" r="' + f(R * .22) + '" fill="' + AMB + '" stroke="' + LEAD + '" stroke-width="1.6"/>';
    for (var k = 0; k < 6; k++) s += '<path d="M' + cx + " " + cy + "L" + f(cx + Math.cos(k * Math.PI / 3) * R * .22) + " " + f(cy + Math.sin(k * Math.PI / 3) * R * .22) + '" stroke="' + LEAD + '" stroke-width="1"/>';
    return s + '<circle cx="' + cx + '" cy="' + cy + '" r="' + f(R * .08) + '" fill="' + RUBY + '" stroke="' + LEAD + '" stroke-width="1.2"/>';
  }
  // քառաթերթ մեդալիոն
  function quatre(cx, cy, r, c1, c2) {
    var s = "", o = r * .52;
    [[o, 0], [-o, 0], [0, o], [0, -o]].forEach(function (p) { s += '<circle cx="' + f(cx + p[0]) + '" cy="' + f(cy + p[1]) + '" r="' + f(r * .5) + '" fill="' + c1 + '" stroke="' + LEAD + '" stroke-width="1.6"/>'; });
    s += '<rect x="' + f(cx - r * .42) + '" y="' + f(cy - r * .42) + '" width="' + f(r * .84) + '" height="' + f(r * .84) + '" transform="rotate(45 ' + cx + " " + cy + ')" fill="' + c2 + '" stroke="' + LEAD + '" stroke-width="1.6"/>';
    return s + '<circle cx="' + cx + '" cy="' + cy + '" r="' + f(r * .2) + '" fill="' + AMB + '" stroke="' + LEAD + '" stroke-width="1.3"/>';
  }
  var ARCH = "M0 400V140A170 170 0 0 1 100 0A170 170 0 0 1 200 140V400Z";
  // ամբողջ պատուհանը (200×400)՝ կիսվում է երկու փեղկի
  function windowArt() {
    var id = "sg" + (++uid);
    return '<defs><clipPath id="' + id + 'c"><path d="' + ARCH + '"/></clipPath>' +
      '<pattern id="' + id + 'q" width="20" height="28" patternUnits="userSpaceOnUse"><rect width="20" height="28" fill="#e8d7a6"/><path d="M10 0L20 14L10 28L0 14Z" fill="#f6ead0" stroke="' + LEAD + '" stroke-width="1"/></pattern>' +
      '<radialGradient id="' + id + 'g" cx=".5" cy=".42" r=".7"><stop offset="0" stop-color="#fff6d8" stop-opacity=".75"/><stop offset=".6" stop-color="#fff6d8" stop-opacity=".1"/><stop offset="1" stop-color="#3a2a10" stop-opacity=".35"/></radialGradient></defs>' +
      '<g clip-path="url(#' + id + 'c)"><rect x="0" y="0" width="200" height="400" fill="url(#' + id + 'q)"/>' +
      [170, 250, 320].map(function (y) { return '<path d="M0 ' + y + 'H200" stroke="' + LEAD + '" stroke-width="2.6"/>'; }).join("") +
      rose(100, 112, 60) +
      quatre(50, 215, 30, SAPH, RUBY) + quatre(150, 215, 30, SAPH, RUBY) +
      quatre(50, 290, 26, EMER, AMB) + quatre(150, 290, 26, EMER, AMB) +
      quatre(50, 358, 26, RUBY, VIO) + quatre(150, 358, 26, RUBY, VIO) +
      '<path d="' + ARCH + '" fill="none" stroke="' + LEAD + '" stroke-width="30"/><path d="' + ARCH + '" fill="none" stroke="' + SAPH + '" stroke-width="25"/>' +
      '<path d="' + ARCH + '" fill="none" stroke="' + RUBY + '" stroke-width="25" stroke-dasharray="9 9"/><path d="' + ARCH + '" fill="none" stroke="' + LEAD + '" stroke-width="27" stroke-dasharray="1.6 7.4" stroke-dashoffset="-8.2"/>' +
      '<rect width="200" height="400" fill="url(#' + id + 'g)"/></g>' +
      '<path d="' + ARCH + '" fill="none" stroke="#5b4f4a" stroke-width="9"/><path d="' + ARCH + '" fill="none" stroke="#8a7a70" stroke-width="2.5"/>' +
      '<path d="M100 2V400" stroke="#4a3f3c" stroke-width="5"/>';
  }
  function leaf(side) {
    var vb = side === "l" ? "-8 -8 108 416" : "100 -8 108 416";
    return '<div class="leaf ' + side + '"><svg viewBox="' + vb + '" preserveAspectRatio="none" aria-hidden="true">' + windowArt() + "</svg></div>";
  }
  // փոքր վիտրաժ-զարդ՝ ծրագրի ամեն կետի համար իր գույնով
  function medal(i) {
    var sets = [[SAPH, RUBY], [RUBY, EMER], [AMB, SAPH], [EMER, VIO]], c = sets[i % 4];
    return '<svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="47" fill="' + PALE + '" stroke="#b8904f" stroke-width="2.5"/>' + quatre(50, 50, 40, c[0], c[1]) + "</svg>";
  }
  function roseMini() { return '<svg viewBox="0 0 140 140" aria-hidden="true"><circle cx="70" cy="70" r="68" fill="none" stroke="#b8904f" stroke-width="2"/>' + rose(70, 70, 62) + "</svg>"; }

  function envelope() {
    var n = K.names();
    return '<div class="env" id="env" role="button" aria-label="' + esc(x("hint")) + '"><div class="stone"></div><div class="top"><div class="caps">' + esc(x("envTop")) + "</div></div>" +
      '<div class="win" id="win"><div class="light"><div class="in"><div class="nm">' + esc(n[0] || "") + '</div><div class="amp">&amp;</div><div class="nm">' + esc(n[1] || "") + "</div></div></div>" + leaf("l") + leaf("r") + "</div>" +
      '<div class="rays"></div>' + (K.PREVIEW ? "" : '<div class="hint">' + esc(x("hint")) + "</div>") + "</div>";
  }
  function hero() {
    var n = K.names(), d = K.date;
    return '<section class="hero"><div class="glow"></div><div class="wrap"><div class="arch rv"><div class="rw">' + roseMini() + "</div>" +
      '<div class="caps">' + esc(x("inv")) + '</div><h1 class="nm"><span>' + esc(n[0] || "") + '</span><span class="amp">&amp;</span><span>' + esc(n[1] || "") + "</span></h1>" +
      '<div class="dt"><span>' + pad(d.getDate()) + "</span><i></i><span>" + pad(d.getMonth() + 1) + "</span><i></i><span>" + d.getFullYear() + "</span></div>" +
      '<div class="wd">' + esc(x("wdl")[d.getDay()]) + " · " + pad(d.getHours()) + ":" + pad(d.getMinutes()) + "</div></div></div></section>";
  }
  function story() {
    return '<section class="band"><div class="wrap"><h2 class="h2 rv">' + esc(x("our")) + '</h2><p class="p rv">' + esc(t(C.text)) + "</p>" +
      '<div class="cal rv"><div class="cal-h">' + esc(u("months")[K.date.getMonth()]) + " " + K.date.getFullYear() + '</div><div class="cal-g">' + K.calendarCells() + "</div></div></div></section>";
  }
  function countdown() {
    return '<section><div class="wrap"><div class="caps rv">' + esc(x("left")) + '</div><div class="cdn rv" data-cd>' + ["days", "hours", "minutes", "seconds"].map(function (k) {
      return '<div><b data-k="' + k + '">00</b><span>' + esc(u(k)) + "</span></div>";
    }).join("") + "</div></div></section>";
  }
  function program() {
    return '<section class="band"><div class="wrap"><h2 class="h2 rv">' + esc(x("program")) + "</h2>" + (C.events || []).map(function (e, i) {
      return '<div class="ev rv"><div class="pic ico">' + K.evIcon(e) + '</div><div class="tm">' + esc(e.time) + '</div><div class="t">' + esc(t(e.title)) +
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
    return '<section class="band"><div class="wrap"><h2 class="h2 rv">' + esc(x("rsvp")) + '</h2><p class="rv">' + esc(x("rsvpLead")) + " " + esc(K.deadline()) + "</p>" +
      '<form class="rs rv" id="rf"><label class="radio"><input type="radio" name="attend" value="yes" checked>' + esc(u("yes")) + "</label>" +
      '<label class="radio"><input type="radio" name="attend" value="no">' + esc(u("no")) + "</label>" +
      '<div class="fl"><label for="rn">' + esc(u("name")) + '</label><input id="rn" name="name" required autocomplete="name"></div>' +
      '<div class="fl"><label for="rg">' + esc(u("guests")) + '</label><select id="rg" name="guests">' + [1, 2, 3, 4, 5, 6].map(function (i) { return "<option>" + i + "</option>"; }).join("") + "</select></div>" +
      '<button class="btn fill" type="submit">' + esc(u("send")) + "</button></form></div></section>";
  }
  function fin() {
    return '<section class="fin"><div class="glow"></div><div class="wrap"><div class="rw rv">' + roseMini() + '</div><div class="caps rv">' + esc(x("fin")) + '</div><div class="nm rv">' + esc(K.names().join(" & ")) + "</div></div></section>" +
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
  // ապակին լուսավորվում է → փեղկերը բացվում են դեպի դուրս → լույսը լցնում է էկրանը
  function open() {
    var env = document.getElementById("env"); if (env.dataset.busy) return; env.dataset.busy = "1";
    K.music.play();
    env.classList.add("s1");
    setTimeout(function () { env.classList.add("s2"); }, 450);
    setTimeout(function () { env.classList.add("s3"); }, 2600);
    setTimeout(function () {
      opened = true; document.body.classList.remove("locked");
      document.getElementById("app").insertAdjacentHTML("beforeend", K.chrome()); K.bindChrome(render); K.reveal();
    }, 3300);
    setTimeout(function () { env.remove(); }, 4000);
  }
  render();
})();
