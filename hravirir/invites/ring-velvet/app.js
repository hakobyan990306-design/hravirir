/* «Մատանի» դիզայնի դասավորությունը */
(function () {
  "use strict";
  var K = window.K, C = K.C, esc = K.esc, t = K.t, u = K.u, pad = K.pad;
  var TXT = {
    hy: { invite: "Նշանդրեքի հրավեր", hint: "Բացեք տուփը", lead: "Մենք որոշել ենք միասին լինել ամբողջ կյանքում և ուզում ենք այդ օրը կիսել Ձեզ հետ", plan: "Օրվա ծրագիր", dress: "Դրեսկոդ", left: "Նշանդրեքին մնացել է", rsvp: "Հարցաթերթիկ", rsvpLead: "Խնդրում ենք պատասխանել մինչև", ours: "Մեր պատմությունը",
      wdl: ["Կիրակի", "Երկուշաբթի", "Երեքշաբթի", "Չորեքշաբթի", "Հինգշաբթի", "Ուրբաթ", "Շաբաթ"] },
    ru: { invite: "Приглашение на помолвку", hint: "Откройте шкатулку", lead: "Мы решили быть вместе всю жизнь и хотим разделить этот день с вами", plan: "Программа дня", dress: "Дресс-код", left: "До помолвки осталось", rsvp: "Анкета", rsvpLead: "Пожалуйста, ответьте до", ours: "Наша история",
      wdl: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"] },
    en: { invite: "Engagement invitation", hint: "Open the box", lead: "We decided to spend our lives together and would love to share this day with you", plan: "Schedule", dress: "Dress code", left: "Counting down", rsvp: "RSVP", rsvpLead: "Kindly reply by", ours: "Our story",
      wdl: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] }
  };
  function x(k) { return (TXT[K.lang] || TXT.hy)[k]; }

  var RING = '<svg viewBox="0 0 100 100" aria-hidden="true"><defs><linearGradient id="rg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f4e3b8"/><stop offset=".45" stop-color="#b8955a"/><stop offset="1" stop-color="#f1dfb3"/></linearGradient>' +
    '<linearGradient id="dm" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".5" stop-color="#cfe8e3"/><stop offset="1" stop-color="#ffffff"/></linearGradient></defs>' +
    '<ellipse cx="50" cy="66" rx="30" ry="27" fill="none" stroke="url(#rg)" stroke-width="7"/><path d="M38 34l6-10h12l6 10-12 12z" fill="url(#dm)" stroke="#b8955a" stroke-width="1.5"/><path d="M38 34h24M44 24l6 10 6-10M50 46V34" stroke="#b8955a" stroke-width=".8" fill="none"/></svg>';
  var LINE = '<svg class="ringline" viewBox="0 0 70 24" aria-hidden="true"><circle cx="28" cy="12" r="9" fill="none" stroke="#d6b77a" stroke-width="1.3"/><circle cx="42" cy="12" r="9" fill="none" stroke="#d6b77a" stroke-width="1.3"/><path d="M0 12h17M53 12h17" stroke="#d6b77a" stroke-width=".8"/></svg>';

  function envelope() {
    var g = K.guest(), sp = "";
    for (var i = 0; i < 18; i++) { var a = i / 18 * Math.PI * 2, r = 70 + (i % 3) * 30; sp += '<i style="--x:' + Math.round(Math.cos(a) * r) + "px;--y:" + Math.round(Math.sin(a) * r) + "px;--dl:" + (0.9 + (i % 6) * .08).toFixed(2) + 's"></i>'; }
    return '<div class="env" id="env"><div class="env-to"><div class="cap">' + esc(x("invite")) + "</div>" + (g ? "<b>" + esc(g) + "</b>" : "") + "</div>" +
      '<button class="rbox" id="seal" aria-label="' + esc(x("hint")) + '"><span class="base"></span><span class="cush"></span><span class="ring">' + RING + '</span><span class="lid"><i>' + esc(K.names().map(function (n) { return n.charAt(0); }).join("")) + "</i></span></button>" +
      '<div class="spark">' + sp + "</div>" + (K.PREVIEW ? "" : '<div class="env-hint">' + esc(x("hint")) + "</div>") + "</div>";
  }
  function hero() {
    var n = K.names(), d = K.date;
    return '<section class="hero dark"><div class="wrap"><div class="cap rv">' + esc(x("invite")) + '</div><h1 class="nm foil rv" style="margin-top:18px"><span>' + esc(n[0]) + '</span></h1><div class="amp rv">&amp;</div><h1 class="nm foil rv"><span>' + esc(n[1] || "") + "</span></h1>" +
      LINE + '<div class="dt rv"><div class="s">' + esc(x("wdl")[d.getDay()]) + '</div><div><div class="d foil">' + d.getDate() + '</div></div><div class="s">' + esc(u("monthsGen")[d.getMonth()]) + "</div></div>" +
      '<div class="y rv">' + d.getFullYear() + '</div><p class="lead rv">' + esc(t(C.lead) || x("lead")) + "</p></div></section>";
  }
  function story() {
    return '<section><div class="wrap"><div class="cap rv">' + esc(x("ours")) + '</div><h2 class="h2 rv">' + esc(t(C.greeting)) + "</h2>" +
      (C.photo ? '<div class="frame rv" style="background-image:url(\'' + esc(C.photo) + '\')"></div>' : "") + '<p class="p rv">' + esc(t(C.text)) + "</p></div></section>";
  }
  function plan() {
    var ev = C.events || []; if (!ev.length) return "";
    return '<section style="background:#efe7d6"><div class="wrap"><h2 class="h2 rv">' + esc(x("plan")) + "</h2>" + ev.map(function (e) {
      return '<div class="ev rv"><div class="tm">' + esc(e.time) + '</div><div class="t">' + esc(t(e.title)) + '</div><div class="n">' + esc(t(e.place)) + '</div><div class="a">' + esc(t(e.address) || "") + "</div>" +
        (e.map ? '<a class="btn" href="' + esc(e.map) + '" target="_blank" rel="noopener">' + esc(u("map")) + "</a>" : "") + "</div>";
    }).join("") +
      (C.dresscode ? '<h2 class="h2 rv" style="margin-top:56px">' + esc(x("dress")) + '</h2><p class="rv">' + esc(t(C.dresscode.text)) + '</p><div class="dots rv">' + (C.dresscode.colors || []).map(function (c) { return '<i style="background:' + esc(c) + '"></i>'; }).join("") + "</div>" : "") +
      "</div></section>";
  }
  function last() {
    var s = '<section class="dark"><div class="wrap"><div class="cap rv">' + esc(x("left")) + '</div><div class="cdn rv" data-cd style="margin-top:14px">' + ["days", "hours", "minutes", "seconds"].map(function (k) {
      return '<div><b data-k="' + k + '">00</b><span>' + esc(u(k)) + "</span></div>";
    }).join("") + "</div></div></section>";
    if (C.rsvp) s += '<section><div class="wrap"><h2 class="h2 rv">' + esc(x("rsvp")) + '</h2><p class="rv">' + esc(x("rsvpLead")) + " " + esc(K.deadline()) + "</p>" +
      '<form class="rs rv" id="rf"><label class="radio"><input type="radio" name="attend" value="yes" checked>' + esc(u("yes")) + "</label>" +
      '<label class="radio"><input type="radio" name="attend" value="no">' + esc(u("no")) + "</label>" +
      '<div class="fl"><label for="rn">' + esc(u("name")) + '</label><input id="rn" name="name" required autocomplete="name"></div>' +
      '<div class="fl"><label for="rg">' + esc(u("guests")) + '</label><select id="rg" name="guests">' + [1, 2, 3, 4, 5, 6].map(function (i) { return "<option>" + i + "</option>"; }).join("") + "</select></div>" +
      '<button class="btn fill" type="submit">' + esc(u("send")) + "</button></form></div></section>";
    return s + '<section class="fin dark"><div class="wrap"><div class="cap rv">' + esc(t(C.finalText) || "") + '</div><div class="nm foil rv" style="margin-top:12px">' + esc(K.names().join(" & ")) + "</div>" + LINE + "</div></section>" +
      '<div class="made"><a href="https://hravirir.am" target="_blank" rel="noopener">HRAVIRIR.AM</a></div>';
  }

  var opened = false;
  function render() {
    document.documentElement.lang = K.lang;
    document.title = K.names().join(" & ");
    document.getElementById("app").innerHTML = (opened ? "" : envelope()) + "<main>" + hero() + story() + K.gallery() + plan() + last() + "</main>" + (opened ? K.chrome() : "");
    document.body.classList.toggle("locked", !opened);
    if (!opened) { var s = document.getElementById("seal"); if (s && !K.PREVIEW) s.onclick = open; } else K.reveal();
    K.countdown(true); K.rsvp(document.getElementById("rf"), '<div class="thanks rs"><div class="thanks-t">' + esc(u("thanks")) + "</div><p>" + esc(u("thanksText")) + "</p></div>"); K.bindChrome(render);
  }
  function open() {
    var env = document.getElementById("env"); if (env.classList.contains("open")) return;
    K.music.play(); env.classList.add("open");
    setTimeout(function () {
      opened = true; document.body.classList.remove("locked");
      document.getElementById("app").insertAdjacentHTML("beforeend", K.chrome()); K.bindChrome(render); K.reveal();
    }, 2700);
    setTimeout(function () { env.remove(); }, 3000);
  }
  render();
})();
