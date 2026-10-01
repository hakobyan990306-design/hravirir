/* «Մոմ» (կնունք) դիզայնի դասավորությունը */
(function () {
  "use strict";
  var K = window.K, C = K.C, esc = K.esc, t = K.t, u = K.u, pad = K.pad;
  var TXT = {
    hy: { hint: "Սեղմեք՝ մոմը վառելու համար", top: "Սուրբ մկրտություն", inv: "Սիրով հրավիրում ենք Ձեզ մեր որդու կնունքին", our: "Լույսի օրը", program: "Օրվա ծրագիր", left: "Կնունքին մնացել է",
      rsvp: "Հարցաթերթիկ", rsvpLead: "Խնդրում ենք պատասխանել մինչև", fin: "Սիրով սպասում ենք Ձեզ", verse: "«Դուք եք աշխարհի լույսը»", ref: "Մատթ. 5:14" },
    ru: { hint: "Нажмите, чтобы зажечь свечу", top: "Святое крещение", inv: "С любовью приглашаем вас на крестины нашего сына", our: "День света", program: "Программа дня", left: "До крестин осталось",
      rsvp: "Анкета", rsvpLead: "Пожалуйста, ответьте до", fin: "С любовью ждём вас", verse: "«Вы — свет мира»", ref: "Мф. 5:14" },
    en: { hint: "Tap to light the candle", top: "Holy baptism", inv: "You are invited to our son's baptism", our: "A day of light", program: "Schedule", left: "Counting down",
      rsvp: "RSVP", rsvpLead: "Kindly reply by", fin: "With love", verse: "“You are the light of the world”", ref: "Matt. 5:14" }
  };
  function x(k) { return (TXT[K.lang] || TXT.hy)[k]; }

  function candle(lit) {
    return '<div class="cnd' + (lit ? " lit" : "") + '"><div class="flame"><i></i></div><div class="wick"></div><div class="wax"><i class="drip d1"></i><i class="drip d2"></i><span class="band"></span></div></div>';
  }
  function cross() {
    return '<svg viewBox="0 0 100 120" aria-hidden="true"><g fill="none" stroke="#c9a45f" stroke-width="3" stroke-linecap="round">' +
      '<path d="M50 8V112M20 44H80"/><path d="M50 8c-6 4-6 10 0 14c6-4 6-10 0-14zM50 112c-6-4-6-10 0-14c6 4 6 10 0 14zM20 44c4-6 10-6 14 0c-4 6-10 6-14 0zM80 44c-4-6-10-6-14 0c4 6 10 6 14 0z"/>' +
      '<circle cx="50" cy="44" r="9"/></g></svg>';
  }
  function envelope() {
    var n = K.names();
    return '<div class="env" id="env" role="button" aria-label="' + esc(x("hint")) + '"><div class="glow"></div><div class="top"><div class="caps">' + esc(x("top")) + '</div><div class="nm">' + esc(n[0] || "") + "</div></div>" +
      '<div class="stand">' + candle(false) + '</div><div class="spark"></div>' + (K.PREVIEW ? "" : '<div class="hint">' + esc(x("hint")) + "</div>") + "</div>";
  }
  function hero() {
    var n = K.names(), d = K.date;
    return '<section class="hero"><div class="halo"></div><div class="wrap"><div class="hc rv">' + cross() + '</div><div class="caps rv">' + esc(x("inv")) + '</div><h1 class="nm rv d1">' + esc(n[0] || "") + "</h1>" +
      (C.photo ? '<div class="photo rv d2" style="background-image:url(\'' + esc(C.photo) + '\')"></div>' : "") +
      '<div class="dt rv d2">' + d.getDate() + " " + esc(u("monthsGen")[d.getMonth()]) + " " + d.getFullYear() + "</div>" + (C.godparents ? '<div class="gp rv d3">' + esc(t(C.godparents)) + "</div>" : "") + "</div></section>";
  }
  function story() {
    return '<section class="warm"><div class="wrap"><h2 class="h2 rv">' + esc(x("our")) + '</h2><p class="p rv">' + esc(t(C.text)) + '</p><div class="verse rv">' + esc(x("verse")) + "<small>" + esc(x("ref")) + "</small></div>" +
      '<div class="cal rv"><div class="cal-h">' + esc(u("months")[K.date.getMonth()]) + " " + K.date.getFullYear() + '</div><div class="cal-g">' + K.calendarCells() + "</div></div></div></section>";
  }
  function countdown() {
    return '<section><div class="wrap"><div class="caps rv">' + esc(x("left")) + '</div><div class="cdn rv" data-cd>' + ["days", "hours", "minutes", "seconds"].map(function (k) {
      return '<div><b data-k="' + k + '">00</b><span>' + esc(u(k)) + "</span></div>";
    }).join("") + "</div></div></section>";
  }
  function program() {
    return '<section class="warm"><div class="wrap"><h2 class="h2 rv">' + esc(x("program")) + "</h2>" + (C.events || []).map(function (e, i) {
      return '<div class="ev rv"><div class="pic ico">' + K.evIcon(e, "glow-b") + '</div><div class="tm">' + esc(e.time) + '</div><div class="t">' + esc(t(e.title)) +
        '</div><div class="n">' + esc(t(e.place)) + '</div><div class="a">' + esc(t(e.address)) + "</div>" + (e.map ? '<a class="btn" href="' + esc(e.map) + '" target="_blank" rel="noopener">' + esc(u("map")) + "</a>" : "") + "</div>";
    }).join("") + "</div></section>";
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
    return '<section class="fin"><div class="wrap"><div class="fc rv">' + candle(true) + '</div><div class="caps rv">' + esc(x("fin")) + '</div><div class="nm rv">' + esc(K.names()[0] || "") + "</div></div></section>" +
      '<div class="made"><a href="https://hravirir.am" target="_blank" rel="noopener">HRAVIRIR.AM</a></div>';
  }

  var opened = false;
  function render() {
    document.documentElement.lang = K.lang;
    document.title = x("top") + " · " + (K.names()[0] || "");
    document.getElementById("app").innerHTML = (opened ? "" : envelope()) + "<main>" + hero() + story() + countdown() + program() + rsvp() + fin() + "</main>" + (opened ? K.chrome() : "");
    document.body.classList.toggle("locked", !opened);
    if (!opened) { var e = document.getElementById("env"); if (e && !K.PREVIEW) e.onclick = open; } else K.reveal();
    K.countdown(true); K.rsvp(document.getElementById("rf")); K.bindChrome(render);
  }
  // կայծ → պատրույգը վառվում է → լույսը տարածվում է ու լցնում էկրանը
  function open() {
    var env = document.getElementById("env"); if (env.dataset.busy) return; env.dataset.busy = "1";
    K.music.play();
    env.classList.add("s1");
    setTimeout(function () { env.querySelector(".cnd").classList.add("lit"); env.classList.add("s2"); }, 500);
    setTimeout(function () { env.classList.add("s3"); }, 2300);
    setTimeout(function () {
      opened = true; document.body.classList.remove("locked");
      document.getElementById("app").insertAdjacentHTML("beforeend", K.chrome()); K.bindChrome(render); K.reveal();
    }, 3300);
    setTimeout(function () { env.remove(); }, 4000);
  }
  render();
})();
