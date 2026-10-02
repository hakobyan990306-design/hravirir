/* «Սիրո մեղեդի» (ձայնապնակ) դիզայնի դասավորությունը */
(function () {
  "use strict";
  var K = window.K, C = K.C, esc = K.esc, t = K.t, u = K.u, pad = K.pad;
  var TXT = {
    hy: { hint: "Սեղմեք ձայնապնակին", side: "Կողմ Ա", title: "Սիրո մեղեդի", inv: "Սիրով հրավիրում ենք Ձեզ մեր հարսանիքին", our: "Մեր երգը", program: "Օրվա ծրագիր", dress: "Դրեսկոդ", left: "Հարսանիքին մնացել է",
      now: "Հիմա հնչում է", rsvp: "Հարցաթերթիկ", rsvpLead: "Խնդրում ենք պատասխանել մինչև", fin: "Սիրով սպասում ենք Ձեզ" },
    ru: { hint: "Нажмите на пластинку", side: "Сторона А", title: "Мелодия любви", inv: "С любовью приглашаем вас на нашу свадьбу", our: "Наша песня", program: "Программа дня", dress: "Дресс-код", left: "До свадьбы осталось",
      now: "Сейчас играет", rsvp: "Анкета", rsvpLead: "Пожалуйста, ответьте до", fin: "С любовью ждём вас" },
    en: { hint: "Tap the record", side: "Side A", title: "Love melody", inv: "We joyfully invite you to our wedding", our: "Our song", program: "Schedule", dress: "Dress code", left: "Counting down",
      now: "Now playing", rsvp: "RSVP", rsvpLead: "Kindly reply by", fin: "With love" }
  };
  function x(k) { return (TXT[K.lang] || TXT.hy)[k]; }
  function dshort() { var d = K.date; return pad(d.getDate()) + "." + pad(d.getMonth() + 1) + "." + d.getFullYear(); }

  function record(cls) {
    var n = K.names();
    return '<div class="rec ' + (cls || "") + '"><div class="grooves"></div><div class="shine"></div><div class="label"><div class="lt">' + esc(x("side")) + '</div><div class="ln">' + esc(n[0] || "") +
      '</div><div class="la">&amp;</div><div class="ln">' + esc(n[1] || "") + '</div><div class="ld">' + dshort() + '</div><i class="hole"></i></div></div>';
  }
  function arm() {
    return '<svg class="arm" viewBox="0 0 90 260" aria-hidden="true"><circle cx="60" cy="30" r="24" fill="#2b2a26"/><circle cx="60" cy="30" r="15" fill="#b9b4a6"/><circle cx="60" cy="30" r="5" fill="#2b2a26"/>' +
      '<path d="M60 30L60 180Q60 212 34 232" fill="none" stroke="#d9d4c6" stroke-width="6" stroke-linecap="round"/><path d="M60 30L60 180Q60 212 34 232" fill="none" stroke="#8f8a7d" stroke-width="1.5"/>' +
      '<rect x="14" y="226" width="30" height="20" rx="3" transform="rotate(36 29 236)" fill="#2b2a26"/><rect x="50" y="8" width="20" height="14" rx="3" fill="#8f8a7d"/></svg>';
  }
  function envelope() {
    var n = K.names();
    return '<div class="env" id="env" role="button" aria-label="' + esc(x("hint")) + '"><div class="stage">' + record("r1") +
      '<div class="sleeve"><div class="sl-in"><div class="sl-t">' + esc(x("title")) + '</div><div class="sl-circ"></div><div class="sl-n">' + esc(n.join(" & ")) + '</div><div class="sl-d">' + dshort() + "</div></div></div>" +
      arm() + "</div>" + (K.PREVIEW ? "" : '<div class="hint">' + esc(x("hint")) + "</div>") + "</div>";
  }
  function hero() {
    var n = K.names();
    return '<section class="hero"><div class="wrap"><div class="caps rv">' + esc(x("inv")) + '</div><h1 class="nm rv d1"><span>' + esc(n[0] || "") + '</span><span class="amp">&amp;</span><span>' + esc(n[1] || "") + "</span></h1>" +
      '<div class="spin rv d2">' + record("r2") + "</div>" +
      '<div class="player rv d3"><div class="np">' + esc(x("now")) + '</div><div class="song">' + esc(n.join(" & ")) + " — " + dshort() + '</div><div class="bar"><i></i></div>' +
      '<div class="tms"><span>1:24</span><span>3:47</span></div><div class="ctl"><span class="cb sm"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7h3c4.5 0 6.5 10 11 10h2M16.5 4.5L19 7l-2.5 2.5M3 17h3c1.6 0 2.8-1.3 3.9-3M13.4 10C14.4 8.3 15.6 7 17 7h2M16.5 14.5L19 17l-2.5 2.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span class="cb"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="5" width="2.4" height="14" rx="1.2" fill="currentColor"/><path d="M19 6.2v11.6a1 1 0 0 1-1.55.83L9.6 13.2a1.4 1.4 0 0 1 0-2.4l7.85-5.43A1 1 0 0 1 19 6.2z" fill="currentColor"/></svg></span><button type="button" class="cb pp" data-music aria-label="play"><svg viewBox="0 0 24 24" aria-hidden="true" class="i-play"><path d="M8.5 5.6v12.8a1.1 1.1 0 0 0 1.7.92l9.6-6.4a1.1 1.1 0 0 0 0-1.84l-9.6-6.4a1.1 1.1 0 0 0-1.7.92z" fill="currentColor"/></svg><svg viewBox="0 0 24 24" aria-hidden="true" class="i-pause"><rect x="7" y="5.5" width="3.6" height="13" rx="1.3" fill="currentColor"/><rect x="13.4" y="5.5" width="3.6" height="13" rx="1.3" fill="currentColor"/></svg></button><span class="cb"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="16.6" y="5" width="2.4" height="14" rx="1.2" fill="currentColor"/><path d="M5 6.2v11.6a1 1 0 0 0 1.55.83l7.85-5.43a1.4 1.4 0 0 0 0-2.4L6.55 5.37A1 1 0 0 0 5 6.2z" fill="currentColor"/></svg></span><span class="cb sm hrt"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.3a4.3 4.3 0 0 1 7.5 2.5C19.5 15.4 12 20 12 20z" fill="currentColor"/></svg></span></div></div>' + K.photo() + '</div></section>';
  }
  function story() {
    return '<section class="olive"><div class="wrap"><h2 class="h2 rv">' + esc(x("our")) + '</h2><p class="p rv">' + esc(t(C.text)) + "</p>" +
      '<div class="cal rv"><div class="cal-h">' + esc(u("months")[K.date.getMonth()]) + " " + K.date.getFullYear() + '</div><div class="cal-g">' + K.calendarCells() + "</div></div></div></section>";
  }
  function countdown() {
    return '<section><div class="wrap"><div class="caps rv">' + esc(x("left")) + '</div><div class="cdn rv" data-cd>' + ["days", "hours", "minutes", "seconds"].map(function (k) {
      return '<div><b data-k="' + k + '">00</b><span>' + esc(u(k)) + "</span></div>";
    }).join("") + '</div><div class="eq rv">' + new Array(24).join("<i></i>") + "</div></div></section>";
  }
  function program() {
    var side = ["A1", "A2", "B1", "B2", "B3", "B4"];
    return '<section class="cream2"><div class="wrap"><h2 class="h2 rv">' + esc(x("program")) + '</h2><div class="tracks">' + (C.events || []).map(function (e, i) {
      return '<div class="tr rv"><div class="no">' + side[i] + '</div><div class="info"><div class="t">' + esc(t(e.title)) + '</div><div class="n">' + esc(t(e.place)) + '</div><div class="a">' + esc(t(e.address)) + "</div>" +
        (e.map ? '<a class="btn" href="' + esc(e.map) + '" target="_blank" rel="noopener">' + esc(u("map")) + "</a>" : "") + '</div><div class="tm">' + esc(e.time) + "</div></div>";
    }).join("") + "</div></div></section>";
  }
  function dress() {
    if (!C.dresscode) return "";
    return '<section class="olive"><div class="wrap"><h2 class="h2 rv">' + esc(x("dress")) + '</h2><p class="rv">' + esc(t(C.dresscode.text)) + '</p><div class="dots rv">' +
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
    return '<section class="olive fin"><div class="wrap"><div class="mini rv">' + record("r3") + '</div><div class="caps rv">' + esc(x("fin")) + '</div><div class="nm rv">' + esc(K.names().join(" & ")) + "</div></div></section>" +
      '<div class="made"><a href="https://hravirir.am" target="_blank" rel="noopener">HRAVIRIR.AM</a></div>';
  }

  var opened = false;
  function render() {
    document.documentElement.lang = K.lang;
    document.title = K.names().join(" & ");
    document.getElementById("app").innerHTML = (opened ? "" : envelope()) + "<main>" + hero() + story() + K.gallery() + countdown() + program() + dress() + rsvp() + fin() + "</main>" + (opened ? K.chrome() : "");
    document.body.classList.toggle("locked", !opened);
    if (!opened) { var e = document.getElementById("env"); if (e && !K.PREVIEW) e.onclick = open; } else K.reveal();
    K.countdown(true); K.rsvp(document.getElementById("rf")); K.bindChrome(render);
  }
  // ձայնապնակը դուրս է գալիս շապիկից → պտտվում է → ասեղն իջնում է → մեծանում ու բացում է էջը
  function open() {
    var env = document.getElementById("env"); if (env.dataset.busy) return; env.dataset.busy = "1";
    env.classList.add("s1");
    setTimeout(function () { env.classList.add("s2"); }, 1100);
    setTimeout(function () { env.classList.add("s3"); K.music.play(); }, 1900);
    setTimeout(function () { env.classList.add("s4"); }, 3300);
    setTimeout(function () {
      opened = true; document.body.classList.remove("locked");
      document.getElementById("app").insertAdjacentHTML("beforeend", K.chrome()); K.bindChrome(render); K.reveal();
    }, 3900);
    setTimeout(function () { env.remove(); }, 4500);
  }
  render();
})();
