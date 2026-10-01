/* «Ատամհատիկ» դիզայնի դասավորությունը */
(function () {
  "use strict";
  var K = window.K, C = K.C, esc = K.esc, t = K.t, u = K.u, pad = K.pad;
  var TXT = {
    hy: { hint: "Ընտրեք մի առարկա ափսեից", top: "Ատամհատիկ", q: "Ի՞նչ կընտրի", will: "կդառնա", age: "տարեկան", inv: "Սիրով հրավիրում ենք Ձեզ", our: "Մեր փոքրիկը", program: "Օրվա ծրագիր",
      game: "Ի՞նչ կընտրի ափսեից", left: "Մինչև տոնը մնաց", rsvp: "Կգա՞ք", rsvpLead: "Խնդրում ենք պատասխանել մինչև", fin: "Սիրով սպասում ենք Ձեզ", yours: "Ձեր գուշակությունը" },
    ru: { hint: "Выберите предмет с подноса", top: "Атамгатик", q: "Что выберет", will: "станет", age: "годик", inv: "С любовью приглашаем вас", our: "Наш малыш", program: "Программа дня",
      game: "Что выберет с подноса?", left: "До праздника осталось", rsvp: "Вы придёте?", rsvpLead: "Пожалуйста, ответьте до", fin: "С любовью ждём вас", yours: "Ваше предсказание" },
    en: { hint: "Pick an item from the tray", top: "First tooth", q: "What will", will: "will become", age: "year old", inv: "You are invited", our: "Our little one", program: "Schedule",
      game: "What will be picked?", left: "Counting down", rsvp: "Will you come?", rsvpLead: "Kindly reply by", fin: "See you there", yours: "Your guess" }
  };
  function x(k) { return (TXT[K.lang] || TXT.hy)[k]; }
  // հայերենում՝ որոշիչ հոդ (Դավիթը, Մանեն)
  function art(n) { return K.lang !== "hy" || !n ? n : n + (/[աեէիոօ]$/.test(n) ? "ն" : "ը"); }
  function f(v) { return Math.round(v * 10) / 10; }
  var ITEMS = [
    { k: "book", hy: "գիտնական", ru: "учёным", en: "a scientist" }, { k: "coin", hy: "հարուստ", ru: "богатым", en: "rich" },
    { k: "mic", hy: "երգիչ", ru: "певцом", en: "a singer" }, { k: "steth", hy: "բժիշկ", ru: "врачом", en: "a doctor" },
    { k: "brush", hy: "նկարիչ", ru: "художником", en: "an artist" }, { k: "scis", hy: "դիզայներ", ru: "дизайнером", en: "a designer" }
  ];
  function icon(k) {
    var s = '<svg viewBox="0 0 64 64" aria-hidden="true">';
    if (k === "book") s += '<path d="M6 16c8-3 18-3 26 3v34c-8-6-18-6-26-3z" fill="#9cc9e8"/><path d="M58 16c-8-3-18-3-26 3v34c8-6 18-6 26-3z" fill="#bfdcf0"/><path d="M32 19v34" stroke="#5c86a8" stroke-width="2"/><path d="M12 24c5-1 10-1 15 2M12 31c5-1 10-1 15 2M37 26c5-3 10-3 15-2M37 33c5-3 10-3 15-2" stroke="#fff" stroke-width="2" stroke-linecap="round"/>';
    else if (k === "coin") s += '<circle cx="32" cy="34" r="22" fill="#e9b949"/><circle cx="32" cy="32" r="22" fill="#f5cf6a"/><circle cx="32" cy="32" r="16" fill="none" stroke="#d9a93a" stroke-width="2"/><text x="32" y="40" text-anchor="middle" font-size="22" font-family="Arial" font-weight="700" fill="#b98424">֏</text>';
    else if (k === "mic") s += '<rect x="22" y="6" width="20" height="30" rx="10" fill="#8fcfb8"/><path d="M26 14h12M26 20h12M26 26h12" stroke="#fff" stroke-width="2"/><path d="M16 28c0 10 7 16 16 16s16-6 16-16" fill="none" stroke="#6b4a3a" stroke-width="3" stroke-linecap="round"/><path d="M32 44v10M22 56h20" stroke="#6b4a3a" stroke-width="3" stroke-linecap="round"/>';
    else if (k === "steth") s += '<path d="M16 8v16c0 9 7 14 14 14s14-5 14-14V8" fill="none" stroke="#6b4a3a" stroke-width="3" stroke-linecap="round"/><path d="M30 38v6c0 8 6 12 12 12s10-5 10-12v-6" fill="none" stroke="#f3a883" stroke-width="4" stroke-linecap="round"/><circle cx="52" cy="34" r="7" fill="#f3a883"/><circle cx="52" cy="34" r="3" fill="#fff"/><circle cx="16" cy="8" r="3" fill="#6b4a3a"/><circle cx="44" cy="8" r="3" fill="#6b4a3a"/>';
    else if (k === "brush") s += '<path d="M44 6l12 12-24 24-12-12z" fill="#f5cf6a"/><path d="M20 30l12 12-6 6c-4 4-12 6-18 8 2-6 4-14 8-18z" fill="#f3a883"/><path d="M44 6l12 12" stroke="#d9a93a" stroke-width="2"/><circle cx="46" cy="50" r="5" fill="#9cc9e8"/><circle cx="54" cy="40" r="4" fill="#8fcfb8"/>';
    else s += '<circle cx="18" cy="46" r="9" fill="none" stroke="#f3a883" stroke-width="4"/><circle cx="46" cy="46" r="9" fill="none" stroke="#f3a883" stroke-width="4"/><path d="M24 39L46 8M40 39L18 8" stroke="#9aa6b2" stroke-width="5" stroke-linecap="round"/><circle cx="32" cy="30" r="2.5" fill="#6b4a3a"/>';
    return s + "</svg>";
  }
  function tooth() { return '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M14 16c0-8 8-10 18-6 10-4 18-2 18 6 0 8-4 12-5 22-1 8-3 18-7 18-4 0-3-12-6-12s-2 12-6 12c-4 0-6-10-7-18-1-10-5-14-5-22z" fill="#fff" stroke="#9cc9e8" stroke-width="2.5"/><circle cx="25" cy="24" r="2" fill="#6b4a3a"/><circle cx="39" cy="24" r="2" fill="#6b4a3a"/><path d="M27 31c3 3 7 3 10 0" stroke="#f3a883" stroke-width="2" fill="none" stroke-linecap="round"/><circle cx="21" cy="29" r="2.5" fill="#f7c3b0"/><circle cx="43" cy="29" r="2.5" fill="#f7c3b0"/></svg>'; }
  function cake() { return '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M32 6c3 4 3 7 0 9-3-2-3-5 0-9z" fill="#f5cf6a"/><rect x="30" y="15" width="4" height="12" rx="2" fill="#9cc9e8"/><rect x="12" y="27" width="40" height="14" rx="5" fill="#f7c3b0"/><path d="M12 33c5 4 8-2 13 2s8-2 13 2 9-2 14 0" stroke="#fff" stroke-width="3" fill="none"/><rect x="8" y="41" width="48" height="16" rx="5" fill="#8fcfb8"/><path d="M8 48h48" stroke="#fff" stroke-width="2" stroke-dasharray="4 4"/></svg>'; }
  var s0 = 5; function r() { s0 = (s0 * 16807) % 2147483647; return s0 / 2147483647; }
  function shower() {
    var h = "", cols = ["#e9c878", "#f3a883", "#8fcfb8", "#9cc9e8", "#f7c3b0"];
    for (var i = 0; i < 70; i++) {
      var grain = i % 3 !== 0, w = grain ? 5 : 9, hh = grain ? 10 : 9;
      h += '<i style="left:' + f(r() * 100) + "%;width:" + w + "px;height:" + hh + "px;border-radius:" + (grain ? "50%" : "3px") + ";background:" + (grain ? "#e2bd6a" : cols[i % 5]) +
        ";--r:" + f(r() * 720 - 360) + "deg;--d:" + f(1.4 + r() * 1.4) + "s;--dl:" + f(r() * .8) + 's"></i>';
    }
    return '<div class="rain">' + h + "</div>";
  }
  function envelope() {
    var n = K.names(), R = 38;
    return '<div class="env" id="env" aria-label="' + esc(x("hint")) + '"><div class="dotsbg"></div><div class="top"><div class="ttl">' + esc(x("top")) + '</div><div class="q">' + esc(x("q")) + " " + esc(art(n[0] || "")) + "</div></div>" +
      '<div class="tray" id="tray"><div class="plate"></div>' + ITEMS.map(function (it, i) {
        var a = -Math.PI / 2 + i * Math.PI / 3;
        return '<button class="it" data-i="' + i + '" style="left:' + f(50 + Math.cos(a) * R) + "%;top:" + f(50 + Math.sin(a) * R) + '%" aria-label="' + esc(it[K.lang] || it.hy) + '">' + icon(it.k) + "</button>";
      }).join("") + '<div class="mid">' + tooth() + "</div></div>" +
      '<div class="res" id="res"></div>' + shower() + (K.PREVIEW ? "" : '<div class="hint">' + esc(x("hint")) + "</div>") + "</div>";
  }
  var pick = null;
  function hero() {
    var n = K.names(), d = K.date;
    return '<section class="hero"><div class="wrap"><div class="caps rv">' + esc(x("inv")) + '</div><div class="ttl2 rv">' + esc(x("top")) + "</div>" +
      (C.photo ? '<div class="photo rv d1"><div style="background-image:url(\'' + esc(C.photo) + '\')"></div></div>' : "") +
      '<h1 class="nm rv d1">' + esc(n[0] || "") + '</h1><div class="age rv d2"><b>' + esc(C.age || "1") + "</b> " + esc(x("age")) + "</div>" +
      '<div class="dt rv d2">' + d.getDate() + " " + esc(u("monthsGen")[d.getMonth()]) + " · " + pad(d.getHours()) + ":" + pad(d.getMinutes()) + "</div>" +
      (pick != null ? '<div class="guess rv d3"><small>' + esc(x("yours")) + "</small>" + icon(ITEMS[pick].k) + "<span>" + esc(art(n[0] || "")) + " " + esc(x("will")) + " " + esc(ITEMS[pick][K.lang] || ITEMS[pick].hy) + "</span></div>" : "") +
      "</div></section>";
  }
  function story() {
    return '<section class="mint"><div class="wrap"><h2 class="h2 rv">' + esc(x("our")) + '</h2><p class="p rv">' + esc(t(C.text)) + "</p></div></section>";
  }
  function countdown() {
    return '<section><div class="wrap"><div class="caps rv">' + esc(x("left")) + '</div><div class="cdn rv" data-cd>' + ["days", "hours", "minutes", "seconds"].map(function (k, i) {
      return '<div class="c' + i + '"><b data-k="' + k + '">00</b><span>' + esc(u(k)) + "</span></div>";
    }).join("") + "</div></div></section>";
  }
  function program() {
    return '<section class="peach"><div class="wrap"><h2 class="h2 rv">' + esc(x("program")) + "</h2>" + (C.events || []).map(function (e, i) {
      return '<div class="ev rv"><div class="pic ico">' + K.evIcon(e) + '</div><div class="tm">' + esc(e.time) + '</div><div class="t">' + esc(t(e.title)) +
        '</div><div class="n">' + esc(t(e.place)) + '</div><div class="a">' + esc(t(e.address)) + "</div>" + (e.map ? '<a class="btn" href="' + esc(e.map) + '" target="_blank" rel="noopener">' + esc(u("map")) + "</a>" : "") + "</div>";
    }).join("") + "</div></section>";
  }
  function game() {
    return '<section><div class="wrap"><h2 class="h2 rv">' + esc(x("game")) + '</h2><div class="grid rv">' + ITEMS.map(function (it) {
      return "<div>" + icon(it.k) + "<span>" + esc(it[K.lang] || it.hy) + "</span></div>";
    }).join("") + "</div></div></section>";
  }
  function rsvp() {
    if (!C.rsvp) return "";
    return '<section class="mint"><div class="wrap"><h2 class="h2 rv">' + esc(x("rsvp")) + '</h2><p class="rv">' + esc(x("rsvpLead")) + " " + esc(K.deadline()) + "</p>" +
      '<form class="rs rv" id="rf"><label class="radio"><input type="radio" name="attend" value="yes" checked>' + esc(u("yes")) + "</label>" +
      '<label class="radio"><input type="radio" name="attend" value="no">' + esc(u("no")) + "</label>" +
      '<div class="fl"><label for="rn">' + esc(u("name")) + '</label><input id="rn" name="name" required autocomplete="name"></div>' +
      '<div class="fl"><label for="rg">' + esc(u("guests")) + '</label><select id="rg" name="guests">' + [1, 2, 3, 4, 5, 6].map(function (i) { return "<option>" + i + "</option>"; }).join("") + "</select></div>" +
      '<button class="btn fill" type="submit">' + esc(u("send")) + "</button></form></div></section>";
  }
  function fin() {
    return '<section class="fin"><div class="wrap"><div class="ft rv">' + tooth() + '</div><div class="caps rv">' + esc(x("fin")) + '</div><div class="nm rv">' + esc(K.names()[0] || "") + "</div></div></section>" +
      '<div class="made"><a href="https://hravirir.am" target="_blank" rel="noopener">HRAVIRIR.AM</a></div>';
  }

  var opened = false;
  function render() {
    document.documentElement.lang = K.lang;
    document.title = x("top") + " · " + (K.names()[0] || "");
    document.getElementById("app").innerHTML = (opened ? "" : envelope()) + "<main>" + hero() + story() + countdown() + program() + game() + rsvp() + fin() + "</main>" + (opened ? K.chrome() : "");
    document.body.classList.toggle("locked", !opened);
    if (!opened) { var e = document.getElementById("env"); if (e && !K.PREVIEW) e.onclick = open; } else K.reveal();
    K.countdown(true); K.rsvp(document.getElementById("rf")); K.bindChrome(render);
  }
  // հյուրը ընտրում է առարկան → այն բարձրանում է կենտրոն → հատիկ ու կոնֆետ է թափվում → «… կդառնա …»
  function open(ev) {
    var env = document.getElementById("env"); if (env.dataset.busy) return; env.dataset.busy = "1";
    var b = ev && ev.target.closest ? ev.target.closest(".it") : null;
    pick = b ? +b.dataset.i : Math.floor(Math.random() * ITEMS.length);
    K.music.play();
    var chosen = env.querySelector('.it[data-i="' + pick + '"]'); chosen.classList.add("chosen");
    document.getElementById("res").innerHTML = "<b>" + esc(art(K.names()[0] || "")) + "</b> " + esc(x("will")) + "<br><em>" + esc(ITEMS[pick][K.lang] || ITEMS[pick].hy) + "</em>";
    env.classList.add("s1");
    setTimeout(function () { env.classList.add("s2"); }, 600);
    setTimeout(function () { env.classList.add("s3"); }, 3300);
    setTimeout(function () {
      opened = true; document.body.classList.remove("locked");
      var y = window.scrollY; document.querySelector(".hero").outerHTML = hero(); window.scrollTo(0, y);
      document.getElementById("app").insertAdjacentHTML("beforeend", K.chrome()); K.bindChrome(render); K.reveal();
    }, 3800);
    setTimeout(function () { env.remove(); }, 4500);
  }
  render();
})();
