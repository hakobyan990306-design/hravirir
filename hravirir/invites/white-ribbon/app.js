/* «Ժապավեն» (կնունք) դիզայնի դասավորությունը. սպիտակ ծրար՝ կապված երկնագույն ատլասե ժապավենով */
(function () {
  "use strict";
  var K = window.K, C = K.C, esc = K.esc, t = K.t, u = K.u, A = window.WRArt;
  var TXT = {
    hy: { hint: "Քանդեք ժապավենը", envTop: "Հրավեր կնունքի", holy: "Սուրբ Մկրտություն", lead: { boy: "Սիրով հրավիրում ենք Ձեզ մեր որդու կնունքին", girl: "Սիրով հրավիրում ենք Ձեզ մեր դստեր կնունքին" },
      program: "Օրվա ծրագիր", dress: "Դրեսկոդ", left: "Կնունքին մնացել է", rsvp: "Հարցաթերթիկ", rsvpLead: "Խնդրում ենք պատասխանել մինչև", fin: "Սիրով սպասում ենք Ձեզ",
      godp: "Կնքահայր և կնքամայր", wdl: ["Կիրակի", "Երկուշաբթի", "Երեքշաբթի", "Չորեքշաբթի", "Հինգշաբթի", "Ուրբաթ", "Շաբաթ"] },
    ru: { hint: "Развяжите ленту", envTop: "Приглашение на крестины", holy: "Святое Крещение", lead: { boy: "С любовью приглашаем вас на крестины нашего сына", girl: "С любовью приглашаем вас на крестины нашей дочери" },
      program: "Программа дня", dress: "Дресс-код", left: "До крестин осталось", rsvp: "Анкета", rsvpLead: "Пожалуйста, ответьте до", fin: "С любовью ждём вас",
      godp: "Крёстные", wdl: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"] },
    en: { hint: "Untie the ribbon", envTop: "Baptism invitation", holy: "Holy Baptism", lead: { boy: "With love we invite you to our son's baptism", girl: "With love we invite you to our daughter's baptism" },
      program: "Schedule", dress: "Dress code", left: "Counting down", rsvp: "RSVP", rsvpLead: "Kindly reply by", fin: "With love",
      godp: "Godparents", wdl: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] }
  };
  function x(k) { return (TXT[K.lang] || TXT.hy)[k]; }

  function pocketSVG(W, H) {
    return '<svg class="pocket" viewBox="0 0 ' + W + " " + H + '" preserveAspectRatio="none"><defs><filter id="ps" x="-10%" y="-10%" width="120%" height="120%"><feDropShadow dx="0" dy="-3" stdDeviation="5" flood-color="#51657a" flood-opacity=".14"/></filter></defs>' +
      '<path d="M0 0L' + W * .54 + " " + H * .55 + "L0 " + H + 'Z" fill="#f7f9fb" filter="url(#ps)"/><path d="M' + W + " 0L" + W * .46 + " " + H * .55 + "L" + W + " " + H + 'Z" fill="#f3f6f9" filter="url(#ps)"/>' +
      '<path d="M0 ' + H + "L" + (W / 2 - 22) + " " + (H * .47 + 12) + "Q" + W / 2 + " " + H * .45 + " " + (W / 2 + 22) + " " + (H * .47 + 12) + "L" + W + " " + H + 'Z" fill="#fcfdfe" filter="url(#ps)"/></svg>';
  }
  function flapSVG(W, H) {
    var ty = H * .5;
    return '<svg class="flap" viewBox="0 0 ' + W + " " + H + '" preserveAspectRatio="none"><defs><filter id="fs" x="-10%" y="-10%" width="120%" height="130%"><feDropShadow dx="0" dy="5" stdDeviation="6" flood-color="#51657a" flood-opacity=".2"/></filter></defs>' +
      '<path d="M-2 0H' + (W + 2) + "L" + (W / 2 + 26) + " " + (ty - 14) + "Q" + W / 2 + " " + (ty + 8) + " " + (W / 2 - 26) + " " + (ty - 14) + 'Z" fill="#fdfeff" filter="url(#fs)"/></svg><div class="fback"></div>';
  }
  function envelope() {
    var g = K.guest(), n = K.names();
    return '<div class="env" id="env" role="button" aria-label="' + esc(x("hint")) + '"><div class="top"><div class="cl">' + A.cloud(70) + '</div><div class="caps">' + esc(x("envTop")) + '</div></div><div class="box" id="box"><div class="back"></div>' +
      '<div class="card"><div class="cr">' + A.cross() + '</div><div class="caps">' + esc(x("holy")) + '</div><div class="script">' + esc(n[0] || "") + "</div></div>" +
      '<div class="pocketw" id="pk"></div><div class="flapw" id="fl"></div>' +
      '<div class="rib h l"></div><div class="rib h r"></div><div class="rib v t"></div><div class="rib v b"></div><div class="bow">' + A.bow() + "</div></div>" +
      (g ? '<div class="to">' + esc(C.dear != null ? t(C.dear) : u("dear")) + "<b>" + esc(g) + "</b></div>" : "") +
      (K.PREVIEW ? "" : '<div class="hint">' + esc(x("hint")) + "</div>") + "</div>";
  }
  function drawEnv() {
    var pk = document.getElementById("pk"), fl = document.getElementById("fl"); if (!pk) return;
    var b = document.getElementById("box").getBoundingClientRect(); pk.innerHTML = pocketSVG(Math.round(b.width), Math.round(b.height)); fl.innerHTML = flapSVG(Math.round(b.width), Math.round(b.height));
  }
  function hero() {
    var n = K.names(), d = K.date;
    return '<section class="hero"><div class="sky"><div class="c1">' + A.cloud(100) + '</div><div class="c2">' + A.cloud(100) + '</div><div class="c3">' + A.cloud(100) + "</div></div>" +
      '<div class="wrap"><div class="cr rv">' + A.cross() + '</div><div class="caps rv">' + esc(x("holy")) + '</div><h1 class="nm rv d1">' + esc(n[0] || "") + "</h1>" +
      '<p class="lead rv d2">' + esc(x("lead")[C.kind === "girl" ? "girl" : "boy"]) + "</p>" +
      '<div class="dt3 rv d2"><div class="s">' + esc(x("wdl")[d.getDay()]) + '</div><div class="d">' + d.getDate() + '</div><div class="s">' + esc(u("monthsGen")[d.getMonth()]) + "</div></div>" +
      '<div class="yr rv d2">' + d.getFullYear() + "</div>" + (C.photo ? '<div class="archp rv d3" style="background-image:url(\'' + esc(C.photo) + '\')"></div>' : "") + "</div></section>";
  }
  function story() {
    return '<section class="soft"><div class="gy l">' + A.gyps(180) + '</div><div class="wrap"><p class="p rv">' + esc(t(C.text)) + "</p>" +
      (C.godparents ? '<div class="caps rv" style="margin-top:28px">' + esc(x("godp")) + '</div><div class="gp rv">' + esc(t(C.godparents)) + "</div>" : "") + "</div></section>" +
      '<section style="padding:40px 0 16px"><div class="wrap"><div class="caps rv">' + esc(x("left")) + '</div><div class="cdn rv" data-cd>' + ["days", "hours", "minutes", "seconds"].map(function (k) {
        return '<div><b data-k="' + k + '">00</b><span>' + esc(u(k)) + "</span></div>"; }).join("") + "</div></div></section>";
  }
  function program() {
    return '<section><div class="wrap"><h2 class="h2 rv">' + esc(x("program")) + "</h2>" + (C.events || []).map(function (e) {
      return '<div class="ev rv">' + (e.img ? '<div class="pic"><img alt="" data-wc="' + esc(e.img) + '"></div>' : '<div class="pic ico">' + K.evIcon(e, "thin-c") + "</div>") + '<div class="tm">' + esc(e.time) + '</div><div class="t">' + esc(t(e.title)) +
        '</div><div class="n">' + esc(t(e.place)) + '</div><div class="a">' + esc(t(e.address)) + "</div>" + (e.map ? '<a class="btn" href="' + esc(e.map) + '" target="_blank" rel="noopener">' + esc(u("map")) + "</a>" : "") + "</div>";
    }).join("") + "</div></section>" +
      (C.dresscode ? '<section class="soft"><div class="wrap"><h2 class="h2 rv">' + esc(x("dress")) + '</h2><p class="rv">' + esc(t(C.dresscode.text)) + '</p><div class="dots rv">' +
        (C.dresscode.colors || []).map(function (c) { return '<i style="background:' + esc(c) + '"></i>'; }).join("") + "</div></div></section>" : "");
  }
  function rsvp() {
    return (C.rsvp ? '<section><div class="wrap"><h2 class="h2 rv">' + esc(x("rsvp")) + '</h2><p class="rv">' + esc(x("rsvpLead")) + " " + esc(K.deadline()) + "</p>" +
      '<form class="rs rv" id="rf"><label class="radio"><input type="radio" name="attend" value="yes" checked>' + esc(u("yes")) + "</label>" +
      '<label class="radio"><input type="radio" name="attend" value="no">' + esc(u("no")) + "</label>" +
      '<div class="fl"><label for="rn">' + esc(u("name")) + '</label><input id="rn" name="name" required autocomplete="name"></div>' +
      '<div class="fl"><label for="rg">' + esc(u("guests")) + '</label><select id="rg" name="guests">' + [1, 2, 3, 4, 5, 6].map(function (i) { return "<option>" + i + "</option>"; }).join("") + "</select></div>" +
      '<button class="btn fill" type="submit">' + esc(u("send")) + "</button></form></div></section>" : "") +
      '<section class="fin soft"><div class="wrap"><div class="bowf rv">' + A.bow() + '</div><div class="caps rv">' + esc(x("fin")) + '</div><div class="nm rv">' + esc(K.names()[0] || "") + "</div></div></section>" +
      '<div class="made"><a href="https://hravirir.am" target="_blank" rel="noopener">HRAVIRIR.AM</a></div>';
  }

  var opened = false;
  function render() {
    document.documentElement.lang = K.lang;
    document.title = K.names()[0] || "";
    document.getElementById("app").innerHTML = (opened ? "" : envelope()) + "<main>" + hero() + story() + program() + rsvp() + "</main>" + (opened ? K.chrome() : "");
    document.body.classList.toggle("locked", !opened);
    if (!opened) { drawEnv(); var e = document.getElementById("env"); if (e && !K.PREVIEW) e.onclick = open; } else K.reveal();
    if (window.Watercolor) window.Watercolor.apply();
    K.countdown(true); K.rsvp(document.getElementById("rf")); K.bindChrome(render);
  }
  // հանգույցը քանդվում է → ժապավենները սահում են կողքերով → կափարիչը բացվում է → քարտը դուրս է գալիս
  function open() {
    var env = document.getElementById("env"); if (env.dataset.busy) return; env.dataset.busy = "1";
    K.music.play();
    [["s1", 0], ["s2", 750], ["s3", 1300], ["s4", 2650]].forEach(function (s) { setTimeout(function () { env.classList.add(s[0]); }, s[1]); });
    setTimeout(function () {
      opened = true; document.body.classList.remove("locked");
      document.getElementById("app").insertAdjacentHTML("beforeend", K.chrome()); K.bindChrome(render); K.reveal();
    }, 3300);
    setTimeout(function () { env.remove(); }, 3900);
  }
  window.addEventListener("resize", drawEnv);
  render();
})();
