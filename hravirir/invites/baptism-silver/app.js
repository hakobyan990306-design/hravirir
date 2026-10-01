/* «Կնունք. կապույտ-արծաթ» դիզայնի դասավորությունը */
(function () {
  "use strict";
  var K = window.K, C = K.C, esc = K.esc, t = K.t, u = K.u, pad = K.pad;

  var TXT = {
    hy: { top: "Կնունքի հրավեր", hint: "Սեղմեք ժապավենին", lead1: "Սիրով հրավիրում ենք Ձեզ", lead2: { boy: "մեր որդու", girl: "մեր դստեր", kids: "մեր երեխաների" }, bap: "կնունքին",
      at: "Ժամը", church: "Մկրտություն", feast: "Տոնական սեղան", left: "Կնունքին մնացել է", rsvp: "Հարցաթերթիկ", rsvpLead: "Խնդրում ենք պատասխանել մինչև", waiting: "Սիրով սպասում ենք Ձեզ",
      wdl: ["Կիրակի", "Երկուշաբթի", "Երեքշաբթի", "Չորեքշաբթի", "Հինգշաբթի", "Ուրբաթ", "Շաբաթ"] },
    ru: { top: "Приглашение на крестины", hint: "Нажмите на ленту", lead1: "С любовью приглашаем вас", lead2: { boy: "на крещение нашего сына", girl: "на крещение нашей дочери", kids: "на крещение наших детей" }, bap: "крестины",
      at: "В", church: "Крещение", feast: "Праздничный стол", left: "До крестин осталось", rsvp: "Анкета", rsvpLead: "Пожалуйста, ответьте до", waiting: "С любовью ждём вас",
      wdl: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"] },
    en: { top: "Baptism invitation", hint: "Tap the ribbon", lead1: "Please join us for the", lead2: { boy: "of our son", girl: "of our daughter", kids: "of our children" }, bap: "baptism",
      at: "At", church: "Baptism", feast: "Reception", left: "Counting down", rsvp: "RSVP", rsvpLead: "Kindly reply by", waiting: "We look forward to seeing you",
      wdl: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] }
  };
  function x(k) { return (TXT[K.lang] || TXT.hy)[k]; }

  var BOW = '<svg viewBox="0 0 150 120" aria-hidden="true"><defs>' +
    '<linearGradient id="st" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".45" stop-color="#eef2f7"/><stop offset=".7" stop-color="#d7dfea"/><stop offset="1" stop-color="#f7f9fc"/></linearGradient>' +
    '<linearGradient id="sd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e3e9f1"/><stop offset="1" stop-color="#c7d2e0"/></linearGradient></defs>' +
    '<path d="M68 58C54 70 44 104 36 116l12-2 6 6c4-16 12-40 20-58z" fill="url(#sd)"/><path d="M82 58c14 12 22 44 30 58l-12-2-6 6c-4-16-10-40-18-58z" fill="url(#sd)"/>' +
    '<path d="M70 52C54 30 18 18 12 34c-6 18 28 30 58 24z" fill="url(#st)"/><path d="M80 52c16-22 52-34 58-18 6 18-28 30-58 24z" fill="url(#st)"/>' +
    '<path d="M68 50C52 36 26 30 22 38" fill="none" stroke="#c9d3e0" stroke-width="1.2"/><path d="M82 50c16-14 42-20 46-12" fill="none" stroke="#c9d3e0" stroke-width="1.2"/>' +
    '<rect x="64" y="44" width="22" height="20" rx="7" fill="url(#st)" stroke="#cfd8e4"/></svg>';
  var CROSS = '<svg class="cross" viewBox="0 0 26 38" aria-hidden="true"><defs><linearGradient id="cs" x1="0" x2="1"><stop offset="0" stop-color="#9aa4b2"/><stop offset=".5" stop-color="#eef2f6"/><stop offset="1" stop-color="#9aa4b2"/></linearGradient></defs>' +
    '<path d="M11 0h4v11h11v4H15v23h-4V15H0v-4h11z" fill="url(#cs)"/></svg>';
  var SEP = '<svg class="sep" viewBox="0 0 160 18" aria-hidden="true"><path d="M0 9h62M98 9h62" stroke="#c6ced9"/><path d="M80 2l7 7-7 7-7-7z" fill="none" stroke="#b8c0cc"/><circle cx="80" cy="9" r="2" fill="#b8c0cc"/></svg>';
  function waves(cls) {
    return '<div class="waves ' + cls + '"><svg viewBox="0 0 400 190" preserveAspectRatio="none" aria-hidden="true"><defs>' +
      '<linearGradient id="wa' + cls + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fb4dc"/><stop offset="1" stop-color="#bcd6ee"/></linearGradient>' +
      '<linearGradient id="wb' + cls + '" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#dfeaf6"/><stop offset=".5" stop-color="#a9c7e7"/><stop offset="1" stop-color="#dfeaf6"/></linearGradient>' +
      '<linearGradient id="ws' + cls + '" x1="0" x2="1"><stop offset="0" stop-color="#9aa4b2"/><stop offset=".3" stop-color="#ffffff"/><stop offset=".6" stop-color="#b8c0cc"/><stop offset="1" stop-color="#eef2f6"/></linearGradient>' +
      '<filter id="wf' + cls + '"><feGaussianBlur stdDeviation="2.5"/></filter></defs>' +
      '<g class="w2"><path d="M-20 0H420V150C360 176 320 120 250 140S130 190 60 150S-10 140-20 160Z" fill="url(#wb' + cls + ')" opacity=".75" filter="url(#wf' + cls + ')"/></g>' +
      '<g class="w1"><path d="M-20 0H420V110C350 140 300 80 230 104S110 150 40 112S-10 100-20 118Z" fill="url(#wa' + cls + ')"/>' +
      '<path d="M-20 118C-10 100 0 104 40 112S160 128 230 104S350 140 420 110" fill="none" stroke="url(#ws' + cls + ')" stroke-width="3.5"/></g></svg></div>';
  }
  function glitter(n) {
    var h = '<div class="glit">';
    for (var i = 0; i < n; i++) h += '<i style="left:' + ((i * 37) % 100) + "%;top:" + (i % 2 ? (4 + (i * 7) % 14) : (84 + (i * 5) % 12)) + "%;--d:" + (2.4 + (i % 5) * .5) + "s;--dl:-" + (i % 7) * .4 + 's"></i>';
    return h + "</div>";
  }

  /* ---------- Բաժիններ ---------- */
  function envelope() {
    var g = K.guest();
    return '<div class="env" id="env"><div class="door l"></div><div class="door r"></div><div class="ribbon"></div>' +
      '<div class="env-tx top"><div class="s">' + esc(x("top")) + "</div></div>" +
      '<button class="bow" id="seal" aria-label="' + esc(x("hint")) + '">' + BOW + "</button>" +
      '<div class="env-tx bot">' + (g ? esc(C.dear != null ? t(C.dear) : u("dear")) + "<b>" + esc(g) + "</b>" : "") + (K.PREVIEW ? "" : '<div class="env-hint">' + esc(x("hint")) + "</div>") + "</div></div>";
  }
  function page1() {
    var d = K.date;
    return '<section class="p1">' + waves("top") + waves("bot") + glitter(22) + '<div class="in">' +
      (C.photo ? '<div class="oval rv"><img src="' + esc(C.photo) + '" alt=""></div>' : "") +
      '<div class="nm silver rv d1">' + esc(K.names().join(" & ")) + '</div><div class="dt rv d2">' + pad(d.getDate()) + "." + pad(d.getMonth() + 1) + "." + d.getFullYear() + "</div></div></section>";
  }
  function place(e) {
    return '<div class="place rv"><h3>' + esc(t(e.title)) + '</h3><div class="t">' + esc(e.time) + '</div><div class="n">' + esc(t(e.place)) + '</div><div class="a">' + esc(t(e.address)) + "</div>" +
      (e.map ? '<a class="btn" href="' + esc(e.map) + '" target="_blank" rel="noopener">' + esc(u("map")) + "</a>" : "") + "</div>";
  }
  function page2() {
    var d = K.date, n = K.names();
    return '<section class="p2"><div class="wrap">' + CROSS + '<div class="lead rv">' + esc(x("lead1")) + '</div><div class="lead rv">' + esc(x("lead2")[C.kind || "boy"]) + "</div>" +
      '<div class="bap silver rv">' + esc(x("bap")) + '</div><div class="child rv">' + n.map(esc).join(" & ") + "</div>" +
      '<div class="line rv"><span>' + esc(x("wdl")[d.getDay()]) + "</span><b>" + pad(d.getDate()) + "</b><span>" + esc(x("at")) + " " + pad(d.getHours()) + ":" + pad(d.getMinutes()) + "</span></div>" +
      '<div class="mon rv">' + esc(u("months")[d.getMonth()]) + " " + d.getFullYear() + "</div>" + SEP +
      (C.events || []).map(place).join("") + "</div></section>";
  }
  function page3() {
    var cd = '<section class="p3"><div class="wrap"><div class="h2 silver rv">' + esc(x("left")) + '</div><div class="cdn rv" data-cd>' + ["days", "hours", "minutes", "seconds"].map(function (k) {
      return '<div><b data-k="' + k + '">00</b><span>' + esc(u(k)) + "</span></div>";
    }).join("") + "</div>";
    var rs = !C.rsvp ? "" : SEP + '<div class="h2 silver rv" style="margin-top:30px">' + esc(x("rsvp")) + '</div><p class="rv">' + esc(x("rsvpLead")) + " " + esc(K.deadline()) + "</p>" +
      '<form class="rs rv" id="rf"><label class="radio"><input type="radio" name="attend" value="yes" checked>' + esc(u("yes")) + "</label>" +
      '<label class="radio"><input type="radio" name="attend" value="no">' + esc(u("no")) + "</label>" +
      '<div class="fl"><label for="rn">' + esc(u("name")) + '</label><input id="rn" name="name" required autocomplete="name"></div>' +
      '<div class="fl"><label for="rg">' + esc(u("guests")) + '</label><select id="rg" name="guests">' + [1, 2, 3, 4, 5, 6].map(function (i) { return "<option>" + i + "</option>"; }).join("") + "</select></div>" +
      '<button class="btn solid" type="submit">' + esc(u("send")) + "</button></form>";
    return cd + rs + "</div></section>";
  }
  function fin() {
    return '<section class="fin">' + waves("bot") + glitter(10) + '<div class="wrap" style="position:relative;z-index:3"><div class="caps rv">' + esc(t(C.finalText) || x("waiting")) + "</div>" +
      '<div class="nm silver rv d1">' + esc(K.names().join(" & ")) + "</div></div></section>" +
      '<div class="made"><a href="https://hravirir.am" target="_blank" rel="noopener">HRAVIRIR.AM</a></div>';
  }

  /* ---------- Հավաքում ---------- */
  var opened = false;
  function render() {
    document.documentElement.lang = K.lang;
    document.title = K.names().join(" & ") + " — " + x("top");
    document.getElementById("app").innerHTML = (opened ? "" : envelope()) + "<main>" + page1() + page2() + page3() + fin() + "</main>" + (opened ? K.chrome() : "");
    document.body.classList.toggle("locked", !opened);
    if (!opened) { var s = document.getElementById("seal"); if (s && !K.PREVIEW) s.onclick = open; }
    else K.reveal();
    K.countdown(true); K.rsvp(document.getElementById("rf")); K.bindChrome(render);
  }
  function open() {
    var env = document.getElementById("env"); if (env.classList.contains("open")) return;
    K.music.play(); env.classList.add("open");
    setTimeout(function () {
      opened = true; document.body.classList.remove("locked");
      document.getElementById("app").insertAdjacentHTML("beforeend", K.chrome()); K.bindChrome(render); K.reveal();
    }, 1900);
    setTimeout(function () { env.remove(); }, 2400);
  }
  render();
})();
