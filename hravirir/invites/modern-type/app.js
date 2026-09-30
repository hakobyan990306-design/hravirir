/* «Մինիմալ» դիզայնի դասավորությունը */
(function () {
  "use strict";
  var K = window.K, C = K.C, esc = K.esc, t = K.t, u = K.u, pad = K.pad;
  var TXT = {
    hy: { hint: "Սեղմեք էկրանին", w: ["Մենք", "ասում", "ենք", "«Այո»"], save: "Պահեք օրը", our: "Խոսք", program: "Ծրագիր", dress: "Դրեսկոդ", left: "Մնաց",
      rsvp: "Կգա՞ք", rsvpLead: "Պատասխանեք մինչև", fin: "Սպասում ենք Ձեզ" },
    ru: { hint: "Нажмите на экран", w: ["Мы", "говорим", "«Да»", "♥"], save: "Сохраните дату", our: "Слово", program: "Программа", dress: "Дресс-код", left: "Осталось",
      rsvp: "Вы придёте?", rsvpLead: "Ответьте до", fin: "Ждём вас" },
    en: { hint: "Tap the screen", w: ["We", "say", "«Yes»", "♥"], save: "Save the date", our: "A word", program: "Schedule", dress: "Dress code", left: "Left",
      rsvp: "Will you come?", rsvpLead: "Reply by", fin: "See you there" }
  };
  function x(k) { return (TXT[K.lang] || TXT.hy)[k]; }

  function envelope() {
    var d = K.date;
    return '<div class="env" id="env" role="button" aria-label="' + esc(x("hint")) + '"><div class="lines">' + x("w").map(function (w, i) {
      return '<div class="ln l' + i + '"><span>' + esc(w) + "</span></div>";
    }).join("") + '</div><div class="date"><b>' + pad(d.getDate()) + "</b><i></i><b>" + pad(d.getMonth() + 1) + "</b><i></i><b>" + String(d.getFullYear()).slice(2) + "</b></div>" +
      (K.PREVIEW ? "" : '<div class="hint">' + esc(x("hint")) + " →</div>") + '<div class="wipe"></div></div>';
  }
  function hero() {
    var n = K.names(), d = K.date;
    return '<section class="hero"><div class="wrap"><div class="tag rv">' + esc(x("save")) + '</div><h1 class="nm rv d1"><span>' + esc(n[0] || "") + '</span><em>+</em><span>' + esc(n[1] || "") + "</span></h1>" +
      '<div class="big rv d2"><b>' + pad(d.getDate()) + '</b><div><span>' + esc(u("months")[d.getMonth()]) + "</span><span>" + d.getFullYear() + "</span><span>" + pad(d.getHours()) + ":" + pad(d.getMinutes()) + "</span></div></div></div></section>";
  }
  function story() {
    return '<section class="dark"><div class="wrap"><div class="lab rv">01 — ' + esc(x("our")) + '</div><p class="lead rv">' + esc(t(C.text)) + "</p></div></section>";
  }
  function countdown() {
    return '<section><div class="wrap"><div class="lab rv">02 — ' + esc(x("left")) + '</div><div class="cdn rv" data-cd>' + ["days", "hours", "minutes", "seconds"].map(function (k) {
      return '<div><b data-k="' + k + '">00</b><span>' + esc(u(k)) + "</span></div>";
    }).join("") + '</div><div class="cal rv"><div class="cal-h">' + esc(u("months")[K.date.getMonth()]) + " " + K.date.getFullYear() + '</div><div class="cal-g">' + K.calendarCells() + "</div></div></div></section>";
  }
  function program() {
    return '<section class="grey"><div class="wrap"><div class="lab rv">03 — ' + esc(x("program")) + "</div>" + (C.events || []).map(function (e, i) {
      return '<div class="ev rv"><div class="no">0' + (i + 1) + '</div><div class="tm">' + esc(e.time) + '</div><div class="t">' + esc(t(e.title)) + '</div><div class="n">' + esc(t(e.place)) +
        '</div><div class="a">' + esc(t(e.address)) + "</div>" + (e.map ? '<a class="btn" href="' + esc(e.map) + '" target="_blank" rel="noopener">' + esc(u("map")) + " ↗</a>" : "") + "</div>";
    }).join("") + "</div></section>";
  }
  function dress() {
    if (!C.dresscode) return "";
    return '<section><div class="wrap"><div class="lab rv">04 — ' + esc(x("dress")) + '</div><p class="rv">' + esc(t(C.dresscode.text)) + '</p><div class="dots rv">' +
      (C.dresscode.colors || []).map(function (c) { return '<i style="background:' + esc(c) + '"></i>'; }).join("") + "</div></div></section>";
  }
  function rsvp() {
    if (!C.rsvp) return "";
    return '<section class="dark"><div class="wrap"><div class="lab rv">05 — ' + esc(x("rsvp")) + '</div><p class="rv">' + esc(x("rsvpLead")) + " " + esc(K.deadline()) + "</p>" +
      '<form class="rs rv" id="rf"><label class="radio"><input type="radio" name="attend" value="yes" checked>' + esc(u("yes")) + "</label>" +
      '<label class="radio"><input type="radio" name="attend" value="no">' + esc(u("no")) + "</label>" +
      '<div class="fl"><label for="rn">' + esc(u("name")) + '</label><input id="rn" name="name" required autocomplete="name"></div>' +
      '<div class="fl"><label for="rg">' + esc(u("guests")) + '</label><select id="rg" name="guests">' + [1, 2, 3, 4, 5, 6].map(function (i) { return "<option>" + i + "</option>"; }).join("") + "</select></div>" +
      '<button class="btn fill" type="submit">' + esc(u("send")) + " →</button></form></div></section>";
  }
  function fin() {
    var n = K.names();
    return '<section class="fin"><div class="wrap"><div class="lab rv">' + esc(x("fin")) + '</div><div class="nm rv">' + esc(n[0] || "") + "<em>+</em>" + esc(n[1] || "") + "</div></div></section>" +
      '<div class="made"><a href="https://hravirir.am" target="_blank" rel="noopener">HRAVIRIR.AM</a></div>';
  }

  var opened = false;
  function render() {
    document.documentElement.lang = K.lang;
    document.title = K.names().join(" + ");
    document.getElementById("app").innerHTML = (opened ? "" : envelope()) + "<main>" + hero() + story() + countdown() + program() + dress() + rsvp() + fin() + "</main>" + (opened ? K.chrome() : "");
    document.body.classList.toggle("locked", !opened);
    if (!opened) { var e = document.getElementById("env"); if (e && !K.PREVIEW) e.onclick = open; } else K.reveal();
    K.countdown(true); K.rsvp(document.getElementById("rf")); K.bindChrome(render);
  }
  // տողերը հերթով դուրս են սահում կողքերով → ժանգագույն շերտը սրբում է էկրանը
  function open() {
    var env = document.getElementById("env"); if (env.dataset.busy) return; env.dataset.busy = "1";
    K.music.play();
    env.classList.add("s1");
    setTimeout(function () { env.classList.add("s2"); }, 1100);
    setTimeout(function () {
      opened = true; document.body.classList.remove("locked");
      document.getElementById("app").insertAdjacentHTML("beforeend", K.chrome()); K.bindChrome(render); K.reveal();
    }, 1900);
    setTimeout(function () { env.classList.add("s3"); }, 1950);
    setTimeout(function () { env.remove(); }, 2900);
  }
  render();
})();
