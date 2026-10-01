/* «Ավիատոմս» դիզայնի դասավորությունը */
(function () {
  "use strict";
  var K = window.K, C = K.C, esc = K.esc, t = K.t, u = K.u, pad = K.pad;
  var TXT = {
    hy: { hint: "Սեղմեք տոմսին", bp: "Ավիատոմս", air: "Սիրո ավիաուղիներ", from: "Մեկնում", to: "Ժամանում", fromV: "ՆՇԱՆԱԾ", toV: "ԱՄՈՒՍՆԱՑԱԾ", pax: "Ուղևորներ", date: "Ամսաթիվ", board: "Նստեցում",
      flight: "Չվերթ", seat: "Տեղ", gate: "Դարպաս", stamp: "Նստեցված", inv: "Սիրով հրավիրում ենք Ձեզ մեր հարսանիքին", our: "Մեր ճանապարհը", program: "Օրվա ծրագիր", left: "Հարսանիքին մնացել է",
      dress: "Դրեսկոդ", rsvp: "Հարցաթերթիկ", rsvpLead: "Խնդրում ենք պատասխանել մինչև", fin: "Բարի թռիչք և սիրով սպասում ենք Ձեզ", st: "Ժամանակին" },
    ru: { hint: "Нажмите на билет", bp: "Посадочный талон", air: "Авиалинии любви", from: "Вылет", to: "Прилёт", fromV: "ПОМОЛВЛЕНЫ", toV: "ЖЕНАТЫ", pax: "Пассажиры", date: "Дата", board: "Посадка",
      flight: "Рейс", seat: "Место", gate: "Выход", stamp: "Посадка завершена", inv: "С любовью приглашаем вас на нашу свадьбу", our: "Наш путь", program: "Программа дня", left: "До свадьбы осталось",
      dress: "Дресс-код", rsvp: "Анкета", rsvpLead: "Пожалуйста, ответьте до", fin: "Приятного полёта — ждём вас с любовью", st: "По расписанию" },
    en: { hint: "Tap the ticket", bp: "Boarding pass", air: "Love Airlines", from: "From", to: "To", fromV: "ENGAGED", toV: "MARRIED", pax: "Passengers", date: "Date", board: "Boarding",
      flight: "Flight", seat: "Seat", gate: "Gate", stamp: "Boarded", inv: "We joyfully invite you to our wedding", our: "Our journey", program: "Schedule", left: "Counting down",
      dress: "Dress code", rsvp: "RSVP", rsvpLead: "Kindly reply by", fin: "Have a nice flight — see you there", st: "On time" }
  };
  function x(k) { return (TXT[K.lang] || TXT.hy)[k]; }
  function dd() { var d = K.date; return pad(d.getDate()) + "." + pad(d.getMonth() + 1) + "." + d.getFullYear(); }
  function plane() { return '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M60 30c0-2-2-4-5-4H40L26 6h-6l7 20H14l-5-7H4l3 13-3 13h5l5-7h13l-7 20h6l14-20h15c3 0 5-2 5-4z" fill="currentColor"/></svg>'; }
  function barcode() { var h = "", s = 3; for (var i = 0; i < 40; i++) { s = (s * 16807) % 2147483647; h += '<i style="width:' + (1 + s % 3) + 'px"></i>'; } return '<div class="bc">' + h + "</div>"; }
  function pass(cls) {
    var n = K.names(), d = K.date;
    return '<div class="pass ' + (cls || "") + '"><div class="ph"><span>' + esc(x("air")) + "</span><b>" + plane() + "</b><span>" + esc(x("bp")) + "</span></div>" +
      '<div class="route"><div><small>' + esc(x("from")) + "</small><b>" + esc(x("fromV")) + '</b></div><div class="pl">' + plane() + '</div><div><small>' + esc(x("to")) + "</small><b>" + esc(x("toV")) + "</b></div></div>" +
      '<div class="pax"><small>' + esc(x("pax")) + '</small><div class="nm">' + esc(n.join(" & ")) + "</div></div>" +
      '<div class="grid"><div><small>' + esc(x("date")) + "</small><b>" + dd() + "</b></div><div><small>" + esc(x("board")) + "</small><b>" + pad(d.getHours()) + ":" + pad(d.getMinutes()) + "</b></div>" +
      "<div><small>" + esc(x("flight")) + "</small><b>" + esc(C.flight || "HY 1") + "</b></div><div><small>" + esc(x("seat")) + "</small><b>♥</b></div></div>" +
      '<div class="cut"></div><div class="stub">' + barcode() + '</div><div class="stamp"><span>' + esc(x("stamp")) + "</span><b>✓</b></div></div>";
  }
  function envelope() {
    return '<div class="env" id="env" role="button" aria-label="' + esc(x("hint")) + '"><i class="cl a"></i><i class="cl b"></i><i class="cl c"></i>' + pass("p1") +
      '<div class="jet">' + plane() + '</div><i class="trail"></i>' + (K.PREVIEW ? "" : '<div class="hint">' + esc(x("hint")) + "</div>") + "</div>";
  }
  function hero() {
    return '<section class="hero"><i class="cl a"></i><i class="cl b"></i><div class="wrap"><div class="caps rv">' + esc(x("inv")) + '</div><div class="rv d1">' + pass("p2") + "</div></div></section>";
  }
  function story() {
    return '<section class="white"><div class="wrap"><h2 class="h2 rv">' + esc(x("our")) + '</h2><p class="p rv">' + esc(t(C.text)) + "</p>" +
      '<div class="cal rv"><div class="cal-h">' + esc(u("months")[K.date.getMonth()]) + " " + K.date.getFullYear() + '</div><div class="cal-g">' + K.calendarCells() + "</div></div></div></section>";
  }
  function countdown() {
    return '<section><div class="wrap"><div class="caps rv">' + esc(x("left")) + '</div><div class="cdn rv" data-cd>' + ["days", "hours", "minutes", "seconds"].map(function (k) {
      return '<div><b data-k="' + k + '">00</b><span>' + esc(u(k)) + "</span></div>";
    }).join("") + "</div></div></section>";
  }
  function program() {
    return '<section class="white"><div class="wrap"><h2 class="h2 rv">' + esc(x("program")) + '</h2><div class="board rv"><div class="bh"><span>' + plane() + esc(x("program")) + "</span></div>" + (C.events || []).map(function (e, i) {
      return '<div class="row"><div class="tm">' + esc(e.time).split("").map(function (ch, j) { return '<i style="--d:' + ((i * 5 + j) * .05).toFixed(2) + 's">' + ch + "</i>"; }).join("") + '</div><div class="inf"><div class="t">' + esc(t(e.title)) +
        '</div><div class="n">' + esc(t(e.place)) + '</div><div class="a">' + esc(t(e.address)) + '</div><div class="ft"><span class="ok">● ' + esc(x("st")) + "</span>" +
        (e.map ? '<a href="' + esc(e.map) + '" target="_blank" rel="noopener">' + esc(u("map")) + " →</a>" : "") + "</div></div></div>";
    }).join("") + "</div></div></section>";
  }
  function dress() {
    if (!C.dresscode) return "";
    return '<section><div class="wrap"><h2 class="h2 rv">' + esc(x("dress")) + '</h2><p class="rv">' + esc(t(C.dresscode.text)) + '</p><div class="dots rv">' +
      (C.dresscode.colors || []).map(function (c) { return '<i style="background:' + esc(c) + '"></i>'; }).join("") + "</div></div></section>";
  }
  function rsvp() {
    if (!C.rsvp) return "";
    return '<section class="white"><div class="wrap"><h2 class="h2 rv">' + esc(x("rsvp")) + '</h2><p class="rv">' + esc(x("rsvpLead")) + " " + esc(K.deadline()) + "</p>" +
      '<form class="rs rv" id="rf"><label class="radio"><input type="radio" name="attend" value="yes" checked>' + esc(u("yes")) + "</label>" +
      '<label class="radio"><input type="radio" name="attend" value="no">' + esc(u("no")) + "</label>" +
      '<div class="fl"><label for="rn">' + esc(u("name")) + '</label><input id="rn" name="name" required autocomplete="name"></div>' +
      '<div class="fl"><label for="rg">' + esc(u("guests")) + '</label><select id="rg" name="guests">' + [1, 2, 3, 4, 5, 6].map(function (i) { return "<option>" + i + "</option>"; }).join("") + "</select></div>" +
      '<button class="btn fill" type="submit">' + esc(u("send")) + "</button></form></div></section>";
  }
  function fin() {
    return '<section class="fin"><i class="cl a"></i><i class="cl c"></i><div class="wrap"><div class="fp rv">' + plane() + '</div><div class="caps rv">' + esc(x("fin")) + '</div><div class="nm rv">' + esc(K.names().join(" & ")) + "</div></div></section>" +
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
  // կնիք «Նստեցված» → ինքնաթիռը թռչում է → տոմսը իջնում է → երկինք
  function open() {
    var env = document.getElementById("env"); if (env.dataset.busy) return; env.dataset.busy = "1";
    K.music.play();
    env.classList.add("s1");
    setTimeout(function () { env.classList.add("s2"); }, 900);
    setTimeout(function () { env.classList.add("s3"); }, 2600);
    setTimeout(function () {
      opened = true; document.body.classList.remove("locked");
      document.getElementById("app").insertAdjacentHTML("beforeend", K.chrome()); K.bindChrome(render); K.reveal();
    }, 3200);
    setTimeout(function () { env.remove(); }, 3900);
  }
  render();
})();
