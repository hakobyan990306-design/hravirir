/* «Կինո» դիզայնի դասավորությունը */
(function () {
  "use strict";
  var K = window.K, C = K.C, esc = K.esc, t = K.t, u = K.u, pad = K.pad;
  var TXT = {
    hy: { hint: "Սեղմեք տոմսին", hall: "Կինոդահլիճ «Սեր»", ticket: "Հրավիրատոմս", premiere: "Պրեմիերա", row: "Շարք 1 · Տեղ ♥", admit: "Մուտք երկուսի համար",
      story: "Սիրո պատմություն", starring: "Գլխավոր դերերում", director: "Ռեժիսոր", fate: "Ճակատագիր", musicBy: "Երաժշտություն", hearts: "Մեր սրտերը",
      plot: "Սյուժե", left: "Մինչև պրեմիերան մնաց", program: "Սեանսներ", dress: "Դրեսկոդ", rsvp: "Ամրագրեք Ձեր տեղը", rsvpLead: "Խնդրում ենք պատասխանել մինչև", end: "Վերջ", fin: "Սա միայն սկիզբն է" },
    ru: { hint: "Нажмите на билет", hall: "Кинозал «Любовь»", ticket: "Пригласительный билет", premiere: "Премьера", row: "Ряд 1 · Место ♥", admit: "Вход для двоих",
      story: "История любви", starring: "В главных ролях", director: "Режиссёр", fate: "Судьба", musicBy: "Музыка", hearts: "Наши сердца",
      plot: "Сюжет", left: "До премьеры осталось", program: "Сеансы", dress: "Дресс-код", rsvp: "Забронируйте место", rsvpLead: "Пожалуйста, ответьте до", end: "Конец", fin: "Это только начало" },
    en: { hint: "Tap the ticket", hall: "Cinema «Love»", ticket: "Invitation ticket", premiere: "Premiere", row: "Row 1 · Seat ♥", admit: "Admit two",
      story: "A love story", starring: "Starring", director: "Directed by", fate: "Fate", musicBy: "Music by", hearts: "Our hearts",
      plot: "The plot", left: "Premiere in", program: "Showtimes", dress: "Dress code", rsvp: "Reserve your seat", rsvpLead: "Kindly reply by", end: "The end", fin: "It's only the beginning" }
  };
  function x(k) { return (TXT[K.lang] || TXT.hy)[k]; }
  function dd() { var d = K.date; return pad(d.getDate()) + "." + pad(d.getMonth() + 1) + "." + d.getFullYear(); }
  function barcode() { var h = "", s = 7; for (var i = 0; i < 34; i++) { s = (s * 16807) % 2147483647; h += '<i style="width:' + (1 + s % 3) + 'px"></i>'; } return '<div class="bc">' + h + "</div>"; }

  function envelope() {
    var n = K.names();
    return '<div class="env" id="env" role="button" aria-label="' + esc(x("hint")) + '"><div class="grain"></div>' +
      '<div class="tk" id="tk"><div class="main"><div class="k1">' + esc(x("hall")) + '</div><div class="k2">' + esc(x("ticket")) + '</div><div class="k3">' + esc(x("premiere")) + '</div><div class="k4">' + esc(n.join(" & ")) + "</div>" +
      '<div class="k5"><span>' + dd() + "</span><span>" + pad(K.date.getHours()) + ":" + pad(K.date.getMinutes()) + "</span></div><div class=\"k6\">" + esc(x("row")) + '</div></div>' +
      '<div class="stub"><div class="adm">' + esc(x("admit")) + "</div>" + barcode() + "</div></div>" +
      '<div class="leader"><svg viewBox="0 0 200 200" aria-hidden="true"><circle cx="100" cy="100" r="92" fill="none" stroke="#efe7da" stroke-width="2"/><circle cx="100" cy="100" r="74" fill="none" stroke="#efe7da" stroke-width="1.4"/>' +
      '<path d="M100 0V200M0 100H200" stroke="#efe7da" stroke-width="1.2"/><path class="sweep" d="M100 100L100 8A92 92 0 0 1 100 8Z" fill="rgba(239,231,218,.25)"/></svg><b id="cnt">3</b></div>' +
      (K.PREVIEW ? "" : '<div class="hint">' + esc(x("hint")) + "</div>") + "</div>";
  }
  function hero() {
    var n = K.names();
    return '<section class="hero" id="hero"><div class="ph"' + (C.photo ? ' style="background-image:url(\'' + esc(C.photo) + '\')"' : "") + '></div><div class="shade"></div><i class="bar t"></i><i class="bar b"></i>' +
      '<div class="wrap"><div class="tag">' + esc(x("story")) + '</div><h1 class="nm"><span>' + esc(n[0] || "") + '</span><em>&amp;</em><span>' + esc(n[1] || "") + "</span></h1>" +
      '<div class="prem">' + esc(x("premiere")) + " · " + dd() + "</div>" +
      '<div class="credits"><span><small>' + esc(x("starring")) + "</small>" + esc(n.join(" · ")) + "</span><span><small>" + esc(x("director")) + "</small>" + esc(x("fate")) + "</span><span><small>" + esc(x("musicBy")) + "</small>" + esc(x("hearts")) + "</span></div></div></section>";
  }
  function story() {
    return '<section><div class="wrap"><h2 class="h2 rv">' + esc(x("plot")) + '</h2><p class="p rv">' + esc(t(C.text)) + "</p>" +
      '<div class="cal rv"><div class="cal-h">' + esc(u("months")[K.date.getMonth()]) + " " + K.date.getFullYear() + '</div><div class="cal-g">' + K.calendarCells() + "</div></div></div></section>";
  }
  function countdown() {
    return '<section class="band"><div class="film"></div><div class="wrap"><div class="caps rv">' + esc(x("left")) + '</div><div class="cdn rv" data-cd>' + ["days", "hours", "minutes", "seconds"].map(function (k) {
      return '<div><b data-k="' + k + '">00</b><span>' + esc(u(k)) + "</span></div>";
    }).join("") + '</div></div><div class="film"></div></section>';
  }
  function program() {
    return '<section><div class="wrap"><h2 class="h2 rv">' + esc(x("program")) + "</h2>" + (C.events || []).map(function (e, i) {
      return '<div class="st rv"><div class="l"><div class="tm">' + esc(e.time) + '</div><div class="no">№ 0' + (i + 1) + '</div></div><div class="r"><div class="t">' + esc(t(e.title)) + '</div><div class="n">' + esc(t(e.place)) +
        '</div><div class="a">' + esc(t(e.address)) + "</div>" + (e.map ? '<a class="btn" href="' + esc(e.map) + '" target="_blank" rel="noopener">' + esc(u("map")) + "</a>" : "") + "</div></div>";
    }).join("") + "</div></section>";
  }
  function dress() {
    if (!C.dresscode) return "";
    return '<section class="band"><div class="wrap"><h2 class="h2 rv">' + esc(x("dress")) + '</h2><p class="rv">' + esc(t(C.dresscode.text)) + '</p><div class="dots rv">' +
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
    return '<section class="fin"><div class="wrap"><div class="end rv"><s>' + esc(x("end")) + '</s></div><div class="caps rv">' + esc(x("fin")) + '</div><div class="nm rv">' + esc(K.names().join(" & ")) + "</div></div></section>" +
      '<div class="made"><a href="https://hravirir.am" target="_blank" rel="noopener">HRAVIRIR.AM</a></div>';
  }

  var opened = false;
  function render() {
    document.documentElement.lang = K.lang;
    document.title = K.names().join(" & ");
    document.getElementById("app").innerHTML = (opened ? "" : envelope()) + "<main>" + hero() + story() + countdown() + program() + dress() + rsvp() + fin() + "</main>" + (opened ? K.chrome() : "");
    document.body.classList.toggle("locked", !opened);
    if (opened || K.PREVIEW) document.getElementById("hero").classList.add("go");
    if (!opened) { var e = document.getElementById("env"); if (e && !K.PREVIEW) e.onclick = open; } else K.reveal();
    K.countdown(true); K.rsvp(document.getElementById("rf")); K.bindChrome(render);
  }
  // տոմսը պատռվում է → ժապավենի հետհաշվարկ 3-2-1 → էկրանը բացվում է ֆիլմի պաստառով
  function open() {
    var env = document.getElementById("env"); if (env.dataset.busy) return; env.dataset.busy = "1";
    K.music.play();
    env.classList.add("s1");
    var c = document.getElementById("cnt");
    setTimeout(function () { env.classList.add("s2"); }, 1000);
    setTimeout(function () { c.textContent = "2"; }, 1800);
    setTimeout(function () { c.textContent = "1"; }, 2600);
    setTimeout(function () { env.classList.add("s3"); document.getElementById("hero").classList.add("go"); }, 3400);
    setTimeout(function () {
      opened = true; document.body.classList.remove("locked");
      document.getElementById("app").insertAdjacentHTML("beforeend", K.chrome()); K.bindChrome(render); K.reveal();
    }, 3600);
    setTimeout(function () { env.remove(); }, 4300);
  }
  render();
})();
