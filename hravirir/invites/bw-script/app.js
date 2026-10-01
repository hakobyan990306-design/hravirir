/* «Նուար» դիզայնի դասավորությունը (hravirir.am-ի լուսանկարային ոճը՝ գեղագիր անուններով) */
(function () {
  "use strict";
  var K = window.K, C = K.C, esc = K.esc, t = K.t, u = K.u, pad = K.pad;
  var TXT = {
    hy: { open: "Բացել հրավերը", and: "և", plan: "Ժամանակացույց", where: "Ստորև տեղադրված քարտեզները Ձեզ կօգնեն ավելի արագ գտնել մեր միջոցառման վայրերը և միանալ մեզ։", how: "Ինչպես հասնել",
      rsvp: "Կմիանա՞ք մեզ", rsvpLead: "Խնդրում ենք պատասխանել մինչև", fin: "Սիրով կսպասենք Ձեզ", wd: ["Եկ", "Եք", "Չո", "Հի", "Ու", "Շա", "Կի"] },
    ru: { open: "Открыть приглашение", and: "и", plan: "Расписание", where: "Карты ниже помогут вам быстрее найти места нашего праздника.", how: "Как добраться",
      rsvp: "Вы будете с нами?", rsvpLead: "Пожалуйста, ответьте до", fin: "С любовью ждём вас", wd: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"] },
    en: { open: "Open the invitation", and: "&", plan: "Schedule", where: "The maps below will help you find our venues.", how: "Directions",
      rsvp: "Will you join us?", rsvpLead: "Kindly reply by", fin: "With love, we await you", wd: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"] }
  };
  function x(k) { return (TXT[K.lang] || TXT.hy)[k]; }
  var ICON = {
    home: '<path d="M8 30L32 10L56 30M14 26V54H50V26M26 54V40H38V54"/>',
    heart: '<rect x="8" y="12" width="48" height="42" rx="5"/><path d="M8 24H56M20 6V16M44 6V16M32 47C22 40 20 36 22 32C24 28 30 28 32 33C34 28 40 28 42 32C44 36 42 40 32 47Z"/>',
    rings: '<circle cx="24" cy="38" r="15"/><circle cx="24" cy="38" r="11"/><circle cx="40" cy="30" r="15"/><circle cx="40" cy="30" r="11"/>',
    glasses: '<path d="M14 12H28L26 30C25 36 17 36 16 30ZM36 12H50L48 30C47 36 39 36 38 30ZM21 35V54M43 35V54M14 54H28M36 54H50M14 20H28M36 20H50M31 4L33 9M24 6L27 10M38 6L35 10"/>'
  };
  function icon(k) { return '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICON[k] || ICON.heart) + "</svg>"; }
  function heart() { return '<svg class="hrt" viewBox="0 0 60 56" aria-hidden="true"><path d="M30 52C12 40 3 30 5 18C7 6 22 3 30 16C36 3 54 4 56 17C58 30 46 40 31 51C27 54 20 50 14 47" fill="none" stroke="#e01b24" stroke-width="2.6" stroke-linecap="round"/></svg>'; }
  function cal() {
    var d0 = K.date, y = d0.getFullYear(), m = d0.getMonth(), first = (new Date(y, m, 1).getDay() + 6) % 7, days = new Date(y, m + 1, 0).getDate(), h = "";
    x("wd").forEach(function (w) { h += '<div class="cw">' + w + "</div>"; });
    for (var i = 0; i < first; i++) h += "<div></div>";
    for (var d = 1; d <= days; d++) h += '<div class="cd' + (d === d0.getDate() ? " on" : "") + '">' + d + (d === d0.getDate() ? heart() : "") + "</div>";
    return '<div class="cal rv"><div class="cal-h">' + esc(u("months")[m]) + '</div><div class="cal-g">' + h + "</div></div>";
  }
  function envelope() {
    var n = K.names();
    return '<div class="env" id="env" role="button" aria-label="' + esc(x("open")) + '"><div class="ph" style="background-image:url(\'' + esc(C.photo) + '\')"></div><div class="sh"></div>' +
      '<div class="in"><div class="nm"><span>' + esc(n[0] || "") + "</span><span>" + esc(n[1] || "") + '</span></div><div class="pill">' + esc(x("open")) + '</div></div></div>';
  }
  function hero() {
    var n = K.names();
    return '<section class="hero"><div class="ph" style="background-image:url(\'' + esc(C.photo) + '\')"><i class="shd"></i><div class="ov"><span>' + esc(n[0] || "") + "</span><span>" + esc(n[1] || "") + '</span></div><i class="chev"></i></div><div class="wrap"><h1 class="nm rv">' + esc(n[0] || "") + " <em>&amp;</em> " + esc(n[1] || "") +
      '</h1><div class="hl rv"></div><p class="p rv">' + esc(t(C.text)) + "</p>" + cal() + "</div></section>";
  }
  function countdown() {
    return '<section class="cds"><div class="wrap"><div class="cdn rv" data-cd>' + ["days", "hours", "minutes", "seconds"].map(function (k) {
      return '<div><b data-k="' + k + '">00</b><span>' + esc(u(k)) + "</span></div>";
    }).join("") + "</div></div></section>";
  }
  function gallery() {
    if (!C.gallery || !C.gallery.length) return "";
    return '<section class="gal"><div class="strip rv">' + C.gallery.map(function (g) { return '<div style="background-image:url(\'' + esc(g) + '\')"></div>'; }).join("") + '</div><div class="wrap"><div class="hl long"></div></div></section>';
  }
  function plan() {
    return '<section><div class="wrap"><h2 class="h2 rv">' + esc(x("plan")) + '</h2><div class="hl rv"></div>' + (C.events || []).map(function (e) {
      return '<div class="pl rv"><div class="tm">' + esc(e.time) + '</div><div class="ic">' + icon(e.icon) + '</div><div class="tx"><div class="t">' + esc(t(e.title)) + '</div><div class="n">' + esc(t(e.place)) + "</div></div></div>";
    }).join("") + '<div class="hl rv"></div></div></section>';
  }
  function venues() {
    return '<section><div class="wrap">' + (C.photo2 ? '<div class="duo rv"><div style="background-image:url(\'' + esc(C.gallery && C.gallery[0] || C.photo) + '\')"></div><div style="background-image:url(\'' + esc(C.photo2) + '\')"></div></div>' : "") +
      '<div class="hl rv"></div><p class="p sm rv">' + esc(x("where")) + '</p><div class="hl rv"></div>' + (C.events || []).map(function (e) {
        return '<div class="vn rv"><div class="vt">' + esc(t(e.title)) + '</div><div class="vp">' + esc(t(e.place)) + '</div><div class="va">' + esc(t(e.address)) + "</div>" +
          (e.map ? '<a class="pill" href="' + esc(e.map) + '" target="_blank" rel="noopener">' + esc(x("how")) + "</a>" : "") + '<div class="hl"></div></div>';
      }).join("") + "</div></section>";
  }
  function rsvp() {
    if (!C.rsvp) return "";
    return '<section><div class="wrap"><h2 class="h2 rv">' + esc(x("rsvp")) + '</h2><p class="p sm rv">' + esc(x("rsvpLead")) + " " + esc(K.deadline()) + "</p>" +
      '<form class="rs rv" id="rf"><label class="radio"><input type="radio" name="attend" value="yes" checked>' + esc(u("yes")) + "</label>" +
      '<label class="radio"><input type="radio" name="attend" value="no">' + esc(u("no")) + "</label>" +
      '<div class="fl"><label for="rn">' + esc(u("name")) + '</label><input id="rn" name="name" required autocomplete="name"></div>' +
      '<div class="fl"><label for="rg">' + esc(u("guests")) + '</label><select id="rg" name="guests">' + [1, 2, 3, 4, 5, 6].map(function (i) { return "<option>" + i + "</option>"; }).join("") + "</select></div>" +
      '<button class="pill fill" type="submit">' + esc(u("send")) + "</button></form></div></section>";
  }
  function fin() {
    return '<section class="fin"><div class="wrap"><h2 class="h2 rv">' + esc(x("fin")) + '</h2></div><div class="fph rv" style="background-image:url(\'' + esc(C.photo2 || C.photo) + '\')"></div></section>' +
      '<div class="made"><a href="https://hravirir.am" target="_blank" rel="noopener">HRAVIRIR.AM</a></div>';
  }

  var opened = false;
  function render() {
    document.documentElement.lang = K.lang;
    document.title = K.names().join(" " + x("and") + " ");
    document.getElementById("app").innerHTML = (opened ? "" : envelope()) + "<main>" + hero() + countdown() + gallery() + plan() + venues() + rsvp() + fin() + "</main>" + (opened ? K.chrome() : "");
    document.body.classList.toggle("locked", !opened);
    if (!opened) { var e = document.getElementById("env"); if (e && !K.PREVIEW) e.onclick = open; } else K.reveal();
    K.countdown(true); K.rsvp(document.getElementById("rf")); K.bindChrome(render);
  }
  // լուսանկարը մեղմ մեծանում է և սահուն անցնում էջի վերնամասին
  function open() {
    var env = document.getElementById("env"); if (env.dataset.busy) return; env.dataset.busy = "1";
    K.music.play();
    env.classList.add("s1");
    setTimeout(function () {
      opened = true; document.body.classList.remove("locked");
      document.getElementById("app").insertAdjacentHTML("beforeend", K.chrome()); K.bindChrome(render); K.reveal();
    }, 900);
    setTimeout(function () { env.remove(); }, 1700);
  }
  render();
})();
