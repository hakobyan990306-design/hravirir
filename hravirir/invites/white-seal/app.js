/* «Սպիտակ ծրար» դիզայնի դասավորությունը */
(function () {
  "use strict";
  var K = window.K, C = K.C, esc = K.esc, t = K.t, u = K.u, pad = K.pad, A = window.WSArt;
  var TXT = {
    hy: { hint: "Սեղմեք կնիքին", envTop: "Հրավեր", inv: "Սիրով հրավիրում ենք Ձեզ մեր հարսանիքին", our: "Մեր պատմությունը", program: "Օրվա ծրագիր", dress: "Դրեսկոդ", left: "Մինչև հարսանիք մնաց",
      rsvp: "Կգա՞ք", rsvpLead: "Խնդրում ենք պատասխանել մինչև", fin: "Սիրով սպասում ենք Ձեզ", wdl: ["Կիրակի", "Երկուշաբթի", "Երեքշաբթի", "Չորեքշաբթի", "Հինգշաբթի", "Ուրբաթ", "Շաբաթ"] },
    ru: { hint: "Нажмите на печать", envTop: "Приглашение", inv: "С любовью приглашаем вас на нашу свадьбу", our: "Наша история", program: "Программа дня", dress: "Дресс-код", left: "До свадьбы осталось",
      rsvp: "Вы придёте?", rsvpLead: "Пожалуйста, ответьте до", fin: "С любовью ждём вас", wdl: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"] },
    en: { hint: "Tap the seal", envTop: "Invitation", inv: "Together with our families we invite you to our wedding", our: "Our story", program: "The day", dress: "Dress code", left: "Counting down",
      rsvp: "Will you come?", rsvpLead: "Kindly reply by", fin: "With love", wdl: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] }
  };
  function x(k) { return (TXT[K.lang] || TXT.hy)[k]; }
  function ini() { var n = K.list(C.names && (C.names.hy || C.names)); return (n[0] || "").charAt(0) + (n[1] ? " " + n[1].charAt(0) : ""); }

  // ծրարի մասերը՝ ըստ էկրանի իրական չափի
  function pocketSVG(W, H) {
    return '<svg class="pocket" viewBox="0 0 ' + W + " " + H + '" preserveAspectRatio="none"><defs><filter id="ps" x="-10%" y="-10%" width="120%" height="120%"><feDropShadow dx="0" dy="-3" stdDeviation="5" flood-color="#6b5f48" flood-opacity=".16"/></filter>' +
      '<linearGradient id="pb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fbf9f4"/><stop offset="1" stop-color="#f1ece2"/></linearGradient></defs>' +
      '<path d="M0 0L' + W * .54 + " " + H * .55 + "L0 " + H + 'Z" fill="#f6f2ea" filter="url(#ps)"/>' +
      '<path d="M' + W + " 0L" + W * .46 + " " + H * .55 + "L" + W + " " + H + 'Z" fill="#f3eee5" filter="url(#ps)"/>' +
      '<path d="M0 ' + H + "L" + (W / 2 - 22) + " " + (H * .47 + 12) + "Q" + W / 2 + " " + H * .45 + " " + (W / 2 + 22) + " " + (H * .47 + 12) + "L" + W + " " + H + 'Z" fill="url(#pb)" filter="url(#ps)"/></svg>';
  }
  function flapSVG(W, H) {
    var ty = H * .5;
    return '<svg class="flap" viewBox="0 0 ' + W + " " + H + '" preserveAspectRatio="none"><defs><filter id="fs" x="-10%" y="-10%" width="120%" height="130%"><feDropShadow dx="0" dy="5" stdDeviation="6" flood-color="#6b5f48" flood-opacity=".22"/></filter>' +
      '<linearGradient id="fg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f5f1e9"/><stop offset="1" stop-color="#fdfbf7"/></linearGradient></defs>' +
      '<path d="M-2 0H' + (W + 2) + "L" + (W / 2 + 26) + " " + (ty - 14) + "Q" + W / 2 + " " + (ty + 8) + " " + (W / 2 - 26) + " " + (ty - 14) + 'Z" fill="url(#fg)" filter="url(#fs)"/></svg>';
  }
  function envelope() {
    var g = K.guest(), n = K.names();
    return '<div class="env" id="env" role="button" aria-label="' + esc(x("hint")) + '"><div class="top"><div class="caps">' + esc(x("envTop")) + '</div></div><div class="box" id="box"><div class="back"></div>' +
      '<div class="card"><div class="caps">' + esc(x("inv")) + '</div><div class="script">' + esc(n.join(" & ")) + '</div><div class="sp">' + A.sprig(160, 14) + "</div></div>" +
      '<div class="pocketw" id="pk"></div><div class="flapw" id="fl"></div>' +
      '<div class="bq">' + A.bouquet() + '</div><div class="seal">' + A.seal(esc(ini())) + "</div></div>" +
      (g ? '<div class="to">' + esc(C.dear != null ? t(C.dear) : u("dear")) + "<b>" + esc(g) + "</b></div>" : "") +
      (K.PREVIEW ? "" : '<div class="hint">' + esc(x("hint")) + "</div>") + "</div>";
  }
  function drawEnv() {
    var pk = document.getElementById("pk"), fl = document.getElementById("fl"); if (!pk) return;
    var b = document.getElementById("box").getBoundingClientRect(), W = Math.round(b.width), H = Math.round(b.height);
    pk.innerHTML = pocketSVG(W, H); fl.innerHTML = flapSVG(W, H) + '<div class="fback"></div>';
  }
  function hero() {
    var n = K.names(), d = K.date;
    return '<section class="hero"><div class="corner c1">' + A.sprig(220, 22) + '</div><div class="corner c2">' + A.sprig(220, 22) + '</div><div class="wrap">' +
      '<div class="caps rv">' + esc(x("inv")) + '</div><h1 class="nm rv d1"><span>' + esc(n[0]) + '</span><span class="amp">&amp;</span><span>' + esc(n[1] || "") + "</span></h1>" +
      '<div class="dt3 rv d2"><div class="s">' + esc(x("wdl")[d.getDay()]) + '</div><div class="d">' + d.getDate() + '</div><div class="s">' + esc(u("monthsGen")[d.getMonth()]) + "</div></div>" +
      '<div class="yr rv d2">' + d.getFullYear() + "</div>" + (C.photo ? '<div class="archp rv d3" style="background-image:url(\'' + esc(C.photo) + '\')"></div>' : "") + "</div></section>";
  }
  function story() {
    return '<section class="green"><div class="wrap"><h2 class="h2 rv">' + esc(x("our")) + '</h2><p class="p rv">' + esc(t(C.text)) + "</p>" +
      '<div class="cal rv"><div class="cal-h">' + esc(u("months")[K.date.getMonth()]) + " " + K.date.getFullYear() + '</div><div class="cal-g">' + K.calendarCells() + "</div></div></div></section>";
  }
  function countdown() {
    return '<section style="padding-bottom:20px"><div class="wrap"><div class="caps rv">' + esc(x("left")) + '</div><div class="cdn rv" data-cd>' + ["days", "hours", "minutes", "seconds"].map(function (k) {
      return '<div><b data-k="' + k + '">00</b><span>' + esc(u(k)) + "</span></div>";
    }).join("") + "</div></div></section>";
  }
  function program() {
    return '<section><div class="wrap"><h2 class="h2 rv">' + esc(x("program")) + "</h2>" + (C.events || []).map(function (e) {
      return '<div class="ev rv">' + (e.img ? '<div class="pic"><img alt="" data-wc="' + esc(e.img) + '"></div>' : '<div class="pic ico">' + A.sprig(150, 16) + "</div>") + '<div class="tm">' + esc(e.time) + '</div><div class="t">' + esc(t(e.title)) +
        '</div><div class="n">' + esc(t(e.place)) + '</div><div class="a">' + esc(t(e.address)) + "</div>" + (e.map ? '<a class="btn" href="' + esc(e.map) + '" target="_blank" rel="noopener">' + esc(u("map")) + "</a>" : "") + "</div>";
    }).join("") + "</div></section>";
  }
  function dress() {
    if (!C.dresscode) return "";
    return '<section class="green"><div class="wrap"><h2 class="h2 rv">' + esc(x("dress")) + '</h2><p class="rv">' + esc(t(C.dresscode.text)) + '</p><div class="dots rv">' +
      (C.dresscode.colors || []).map(function (c) { return '<i style="background:' + esc(c) + '"></i>'; }).join("") + "</div></div></section>";
  }
  function rsvp() {
    if (!C.rsvp) return "";
    return '<section><div class="wrap"><h2 class="h2 rv">' + esc(x("rsvp")) + '</h2><p class="rv">' + esc(x("rsvpLead")) + " " + esc(K.deadline()) + "</p>" +
      '<form class="rs rv" id="rf"><label class="radio"><input type="radio" name="attend" value="yes" checked>' + esc(u("yes")) + "</label>" +
      '<label class="radio"><input type="radio" name="attend" value="no">' + esc(u("no")) + "</label>" +
      '<div class="fl"><label for="rn">' + esc(u("name")) + '</label><input id="rn" name="name" required autocomplete="name"></div>' +
      '<div class="fl"><label for="rg">' + esc(u("guests")) + '</label><select id="rg" name="guests">' + [1, 2, 3, 4, 5, 6].map(function (i) { return "<option>" + i + "</option>"; }).join("") + "</select></div>" +
      '<button class="btn fill" type="submit">' + esc(u("send")) + "</button></form></div></section>";
  }
  function fin() {
    return '<section class="fin"><div class="wrap"><div class="sealf rv">' + A.seal(esc(ini())) + '</div><div class="caps rv">' + esc(x("fin")) + '</div><div class="nm rv">' + esc(K.names().join(" & ")) + "</div></div></section>" +
      '<div class="made"><a href="https://hravirir.am" target="_blank" rel="noopener">HRAVIRIR.AM</a></div>';
  }

  var opened = false;
  function render() {
    document.documentElement.lang = K.lang;
    document.title = K.names().join(" & ");
    document.getElementById("app").innerHTML = (opened ? "" : envelope()) + "<main>" + hero() + story() + countdown() + program() + dress() + rsvp() + fin() + "</main>" + (opened ? K.chrome() : "");
    document.body.classList.toggle("locked", !opened);
    if (!opened) { drawEnv(); var e = document.getElementById("env"); if (e && !K.PREVIEW) e.onclick = open; } else K.reveal();
    if (window.Watercolor) window.Watercolor.apply();
    K.countdown(true); K.rsvp(document.getElementById("rf")); K.bindChrome(render);
  }
  // կնիքը պոկվում է → կափարիչը բացվում է → քարտը դուրս է գալիս → ծրարը իջնում է, քարտը մեծանում է
  function open() {
    var env = document.getElementById("env"); if (env.dataset.busy) return; env.dataset.busy = "1";
    K.music.play();
    env.classList.add("s1");
    setTimeout(function () { env.classList.add("s2"); }, 350);
    setTimeout(function () { env.classList.add("s3"); }, 900);
    setTimeout(function () { env.classList.add("s4"); }, 2250);
    setTimeout(function () {
      opened = true; document.body.classList.remove("locked");
      document.getElementById("app").insertAdjacentHTML("beforeend", K.chrome()); K.bindChrome(render); K.reveal();
    }, 2900);
    setTimeout(function () { env.remove(); }, 3500);
  }
  window.addEventListener("resize", drawEnv);
  render();
})();
