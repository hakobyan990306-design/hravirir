/* «Մոնոգրամ» դիզայնի դասավորությունը */
(function () {
  "use strict";
  var K = window.K, C = K.C, esc = K.esc, t = K.t, u = K.u, pad = K.pad;
  var TXT = {
    hy: { hint: "Սեղմեք", hint2: "հրավերը բացելու համար", and: "և", dear: "Սիրելի՛ հյուրեր", left: "Մեր հարսանիքին մնացել է…", places: "Հասցեներ", timing: "Օրվա ծրագիր",
      details: "Մանրամասներ", dress: "Դրեսկոդ", quiz: "Հյուրերի հարցաթերթիկ", quizT: "Հյուրի հարցաթերթիկ", photos: "Լուսանկարներ", fin: ["Սիրով", "կսպասենք"],
      q1: "Կկարողանա՞ք ներկա գտնվել", q1h: "Խնդրում ենք անպայման պատասխանել", maybe: "Կտեղեկացնեմ ավելի ուշ",
      q2: "Ինչպե՞ս ներկայանալ", q3: "Ո՞ւմ կողմից եք", q3h: "Սա կօգնի ճիշտ դասավորել սեղանները", groomSide: "Փեսայի կողմից", brideSide: "Հարսի կողմից", note: "Նշումներ (սննդային նախընտրություն և այլն)",
      prev: "← Ետ", next: "Առաջ →", menu: ["Հրավեր", "Հասցեներ", "Օրակարգ", "Դրեսկոդ", "Հարցաթերթիկ"], band: "Մեր պատմությունը", group: "Միանալու համար սեղմեք տեսախցիկին" },
    ru: { hint: "Нажмите", hint2: "чтобы открыть приглашение", and: "и", dear: "Дорогие гости", left: "До нашей свадьбы осталось…", places: "Адреса", timing: "Программа дня",
      details: "Детали", dress: "Дресс-код", quiz: "Анкета гостя", quizT: "Анкета гостя", photos: "Фотографии", fin: ["С любовью", "ждём вас"],
      q1: "Сможете ли вы присутствовать?", q1h: "Пожалуйста, обязательно ответьте", maybe: "Сообщу позже",
      q2: "Как вас представить?", q3: "С чьей вы стороны?", q3h: "Это поможет правильно рассадить гостей", groomSide: "Со стороны жениха", brideSide: "Со стороны невесты", note: "Примечания (пожелания по меню и т. д.)",
      prev: "← Назад", next: "Далее →", menu: ["Приглашение", "Адреса", "Программа", "Дресс-код", "Анкета"], band: "Наша история", group: "Чтобы присоединиться, нажмите на камеру" }
  };
  function x(k) { return (TXT[K.lang] || TXT.hy)[k]; }
  function initials() { return K.list(C.names && (C.names.hy || C.names)).map(function (n) { return n.charAt(0); }); }

  function sketch(k) { return window.MonoSketch(k); }
  var ICON = {
    pin: '<svg class="ic" viewBox="0 0 34 34" fill="none" stroke="#555" stroke-width="1"><path d="M17 31s10-10 10-17a10 10 0 0 0-20 0c0 7 10 17 10 17z"/><circle cx="17" cy="14" r="4"/></svg>',
    house: '<path d="M8 24L25 10l17 14M12 21v19h26V21"/><path d="M21 40V30h8v10"/>',
    home2: '<path d="M8 24L25 10l17 14M12 21v19h26V21"/><path d="M25 36c-6-4-8-8-5-10c2-1 4 0 5 2c1-2 3-3 5-2c3 2 1 6-5 10z"/>',
    rings: '<circle cx="19" cy="30" r="10"/><circle cx="31" cy="30" r="10"/><path d="M16 17l3-5h6l3 5-6 3z"/>',
    glasses: '<path d="M14 8h9l-1 12a4 4 0 0 1-7 0zM18.5 24v14M14 38h9"/><path d="M27 10l9 2-3 11a4 4 0 0 1-7-2zM29 25l-3 13M23 37l7 2"/><path d="M24 4l1-3M28 5l3-2M20 5l-2-2"/>',
    cake: '<path d="M10 42h30M13 42V32h24v10M16 32v-8h18v8M20 24v-6h10v6"/><path d="M25 18v-5M25 9c-2 2-1 4 0 4c1 0 2-2 0-4z"/><path d="M13 36c3 2 5 2 8 0s5-2 8 0 5 2 8 0"/>',
    fire: '<path d="M18 16v-8M18 16l-6-5M18 16l6-5M18 16h-8M18 16h8M18 16l-5 6M18 16l5 6M18 16v8"/><path d="M34 28v-6M34 28l-5-3M34 28l5-3M34 28l-4 5M34 28l4 5M34 28h6M34 28h-6"/><path d="M18 24c0 8-4 12-6 18M34 33c0 4 1 6 2 9"/>'
  };
  function ico(k) { return '<svg viewBox="0 0 50 50" fill="none" stroke="#6a6a6a" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">' + ICON[k] + "</svg>"; }
  var HEART = '<svg viewBox="0 0 50 50" aria-hidden="true"><path d="M25 42C9 31 4 21 9 13c4-6 12-5 16 3c3-7 11-10 16-4c6 8-1 19-17 31c-3 2-6 1-9-2"/></svg>';
  var CAM = '<svg viewBox="0 0 130 90" class="draw rv" aria-hidden="true"><rect x="10" y="22" width="110" height="60" rx="8"/><path d="M40 22l7-10h24l7 10"/><circle cx="62" cy="52" r="20"/><circle cx="62" cy="52" r="12"/>' +
    '<path d="M22 16h12v6M96 32h14M18 34h10"/><path class="h" d="M56 46a8 8 0 0 1 8-3M14 70h26M84 70h32"/></svg>';

  function monoSVG(cls) {
    var i = initials();
    return '<svg viewBox="0 0 120 140" aria-hidden="true" class="' + (cls || "") + '"><text x="4" y="78" font-size="92">' + esc(i[0] || "") + '</text><text x="50" y="128" font-size="92">' + esc(i[1] || "") + "</text>" +
      '<line x1="18" y1="94" x2="112" y2="94"/></svg>';
  }
  function envelope() {
    var d = K.date;
    return '<div class="env" id="env" role="button" aria-label="' + esc(x("hint")) + '"><div class="num n1">' + pad(d.getDate()) + '</div><div class="num n2">' + pad(d.getMonth() + 1) + "</div>" +
      '<div class="mono">' + monoSVG() + "</div>" + (K.PREVIEW ? "" : '<div class="env-hint"><b>' + esc(x("hint")) + "</b>" + esc(x("hint2")) + "</div>") + "</div>";
  }
  function bar() {
    var i = initials(), ids = ["invite", "places", "timing", "dress", "rsvp"];
    return '<header class="bar" id="bar"><a class="mg" href="#top">' + esc(i[0] || "") + "<i>" + esc(i[1] || "") + '</i></a><button class="burger" id="burger" aria-label="menu"><i></i><i></i><i></i></button></header>' +
      '<nav class="menu" id="menu">' + x("menu").map(function (m, k) { return '<a href="#' + ids[k] + '">' + esc(m) + "</a>"; }).join("") + "</nav>";
  }
  function hero() {
    var n = K.names(), d = K.date;
    return '<section class="hero" id="top"><div class="bg" style="background-image:url(\'' + esc(C.photo) + '\')"></div><div class="in-h"><h1 class="nm"><span>' + esc(n[0]) + '</span><span class="and">' + esc(x("and")) +
      "</span><span>" + esc(n[1] || "") + '</span></h1><div class="dt">' + pad(d.getDate()) + "." + pad(d.getMonth() + 1) + "." + d.getFullYear() + '</div></div><div class="scroll"></div></section>';
  }
  function invite() {
    var d = K.date;
    return '<section id="invite"><div class="wrap"><h2 class="h2 rv">' + esc(x("dear")) + '</h2><p class="p rv">' + t(C.text) + "</p>" +
      '<div class="cal rv"><div class="cal-h"><span>' + esc(u("months")[d.getMonth()]) + "</span><span>" + d.getFullYear() + '</span></div><div class="cal-g">' + K.calendarCells(HEART) + "</div></div></div></section>";
  }
  function collage() {
    var g = C.gallery || [], i = initials();
    return '<section style="padding-top:0"><div class="wrap"><div class="collage"><div class="wm">' + esc(i[0] || "") + "<i>" + esc(i[1] || "") + "</i></div>" +
      '<div class="ph a rv" style="background-image:url(\'' + esc(g[0] || C.photo) + '\')"></div><div class="ph b rv d2" style="background-image:url(\'' + esc(g[1] || C.photo) + '\')"></div>' +
      '<div class="band rv d3">' + esc(x("band")) + "</div></div></div></section>";
  }
  function countdown() {
    var k = ["days", "hours", "minutes", "seconds"];
    return '<section style="padding-top:10px"><div class="wrap"><div class="cd-t rv">' + esc(x("left")) + '</div><div class="cdn rv" data-cd>' + k.map(function (s, i) {
      return (i ? '<div class="c">:</div>' : "") + '<div><b data-k="' + s + '">00</b><span>' + esc(u(s)) + "</span></div>";
    }).join("") + "</div></div></section>";
  }
  function places() {
    return '<section id="places"><div class="wrap"><h2 class="h2 rv">' + esc(x("places")) + "</h2>" + (C.events || []).map(function (e) {
      return '<div class="place rv">' + ICON.pin + '<div class="ttl">' + esc(t(e.title)) + '</div><div class="tm">' + esc(e.time) + '</div><div class="txt"><b>' + esc(t(e.place)) + "</b><br>" + esc(t(e.address)) + "</div>" +
        sketch(e.sketch || "house") + (e.map ? '<a class="btn" href="' + esc(e.map) + '" target="_blank" rel="noopener">' + esc(u("map")) + "</a>" : "") + "</div>";
    }).join("") + "</div></section>";
  }
  function timing() {
    return '<section id="timing" style="background:var(--mist)"><div class="wrap"><h2 class="h2 rv">' + esc(x("timing")) + '</h2><div class="tl rv">' + (C.timing || []).map(function (it, i) {
      return '<div class="ti rv">' + ico(it.icon) + '<div class="tm">' + esc(it.time) + '</div><div class="lb">' + esc(t(it.text)) + "</div></div>";
    }).join("") + "</div></div></section>";
  }
  function details() {
    var s = "";
    if (C.details) s += '<section><div class="wrap"><h2 class="h2 rv">' + esc(x("details")) + '</h2><svg class="heart rv" viewBox="0 0 24 24"><path d="M12 21C5 15.5 2 12 2 8.2 2 5.3 4.3 3 7.1 3c2 0 3.8 1.1 4.9 2.8C13.1 4.1 14.9 3 16.9 3 19.7 3 22 5.3 22 8.2c0 3.8-3 7.3-10 12.8z"/></svg>' +
      '<div class="note rv">' + esc(t(C.details)) + "</div></div></section>";
    if (C.dresscode) s += '<section id="dress" style="padding-top:20px"><div class="wrap"><h2 class="h2 rv">' + esc(x("dress")) + '</h2><p class="p rv">' + esc(t(C.dresscode.text)) + '</p><div class="dots rv">' +
      (C.dresscode.colors || []).map(function (c) { return '<i style="background:' + esc(c) + '"></i>'; }).join("") + "</div></div></section>";
    return s;
  }
  function quiz() {
    if (!C.rsvp) return "";
    var opts = [1, 2, 3, 4, 5].map(function (i) { return "<option>" + i + "</option>"; }).join("");
    return '<section class="dark" id="rsvp"><div class="wrap"><h2 class="h2 rv">' + esc(x("quiz")) + '</h2><form class="qz rv" id="rf" novalidate><div class="qz-h"><span>' + esc(x("quizT")) + '</span><span class="qz-n">1/3</span></div><div class="qz-bar"><i></i></div>' +
      '<div class="st on" data-s="1"><div class="q">' + esc(x("q1")) + '</div><div class="qh">' + esc(x("q1h")) + "</div>" +
      '<label class="radio"><input type="radio" name="attend" value="yes">' + esc(u("yes")) + '</label><label class="radio"><input type="radio" name="attend" value="maybe">' + esc(x("maybe")) +
      '</label><label class="radio"><input type="radio" name="attend" value="no">' + esc(u("no")) + "</label></div>" +
      '<div class="st" data-s="2"><div class="q">' + esc(x("q2")) + '</div><div class="fl"><label for="rn">' + esc(u("name")) + '</label><input id="rn" name="name" autocomplete="name"></div>' +
      '<div class="fl"><label for="rg">' + esc(u("guests")) + '</label><select id="rg" name="guests">' + opts + "</select></div></div>" +
      '<div class="st" data-s="3"><div class="q">' + esc(x("q3")) + '</div><div class="qh">' + esc(x("q3h")) + "</div>" +
      '<label class="radio"><input type="radio" name="side" value="' + esc(x("groomSide")) + '">' + esc(x("groomSide")) + '</label><label class="radio"><input type="radio" name="side" value="' + esc(x("brideSide")) + '">' + esc(x("brideSide")) + "</label>" +
      '<div class="fl"><label for="rt">' + esc(x("note")) + '</label><textarea id="rt" name="note"></textarea></div></div>' +
      '<div class="qz-nav"><button type="button" class="prev" disabled>' + esc(x("prev")) + '</button><button type="button" class="next">' + esc(x("next")) + '</button><button type="submit" class="sub" hidden>' + esc(u("send")) + "</button></div></form></div></section>";
  }
  function bindQuiz() {
    var f = document.getElementById("rf"); if (!f) return;
    var s = 1, st = f.querySelectorAll(".st");
    function show() {
      st.forEach(function (e) { e.classList.toggle("on", +e.dataset.s === s); });
      f.querySelector(".qz-n").textContent = s + "/3"; f.querySelector(".qz-bar i").style.width = (s / 3 * 100) + "%";
      f.querySelector(".prev").disabled = s === 1; f.querySelector(".next").hidden = s === 3; f.querySelector(".sub").hidden = s !== 3;
    }
    function ok() {
      if (s === 1) { var a = f.querySelector('[name="attend"]:checked'); if (!a) { f.querySelector(".st.on").animate([{ transform: "translateX(-6px)" }, { transform: "translateX(6px)" }, { transform: "none" }], 300); return false; } }
      if (s === 2) { var n = f.querySelector('[name="name"]'); n.classList.toggle("bad", !n.value.trim()); if (!n.value.trim()) { n.focus(); return false; } }
      return true;
    }
    f.querySelector(".next").onclick = function () { if (ok()) { s++; show(); } };
    f.querySelector(".prev").onclick = function () { if (s > 1) { s--; show(); } };
    K.rsvp(f, '<div class="thanks"><div class="thanks-t">' + esc(u("thanks")) + "</div><p>" + esc(u("thanksText")) + "</p></div>");
  }
  function last() {
    var n = K.names();
    return (C.photoGroup !== undefined ? '<section><div class="wrap"><h2 class="h2 rv">' + esc(x("photos")) + '</h2><p class="p rv">' + esc(t(C.photoText)) + "<br><br>" + esc(x("group")) + "</p>" +
      (C.photoGroup ? '<a class="cam" href="' + esc(C.photoGroup) + '" target="_blank" rel="noopener" aria-label="Telegram">' + CAM + "</a>" : '<div class="cam">' + CAM + "</div>") + "</div></section>" : "") +
      '<section class="fin"><div class="wrap"><div class="big rv"><span>' + esc(x("fin")[0]) + "</span><span>" + esc(x("fin")[1]) + '</span></div><div class="nm rv">' + esc(n.join(" & ")) + "</div></div></section>" +
      '<div class="made"><a href="https://hravirir.am" target="_blank" rel="noopener">HRAVIRIR.AM</a></div>';
  }

  var opened = false;
  function prep() {
    // ամեն գծի համար pathLength=1, որ բոլորը «նկարվեն» միաժամանակ ավարտվելով
    document.querySelectorAll(".draw path, .draw line, .draw circle, .draw rect, .cal-g .cd svg path").forEach(function (p) { p.setAttribute("pathLength", "1"); });
  }
  function bindBar() {
    var b = document.getElementById("burger"); if (!b) return;
    b.onclick = function () { document.body.classList.toggle("menu-open"); };
    document.querySelectorAll("#menu a").forEach(function (a) { a.onclick = function () { document.body.classList.remove("menu-open"); }; });
  }
  function onScroll() {
    var bar = document.getElementById("bar"); if (bar) bar.classList.toggle("on", window.scrollY > window.innerHeight * .6);
  }
  function render() {
    document.documentElement.lang = K.lang;
    document.title = K.names().join(" & ");
    document.getElementById("app").innerHTML = (opened ? "" : envelope()) + bar() + "<main>" + hero() + invite() + collage() + countdown() + places() + timing() + details() + quiz() + last() + "</main>" + (opened ? K.chrome() : "");
    document.body.classList.toggle("locked", !opened);
    prep(); bindBar(); bindQuiz(); onScroll();
    if (!opened) { var e = document.getElementById("env"); if (e && !K.PREVIEW) e.onclick = open; if (K.PREVIEW) document.querySelector(".hero").classList.add("go"); }
    else { document.querySelector(".hero").classList.add("go"); K.reveal(); }
    K.countdown(true); K.bindChrome(render);
  }
  function open() {
    var env = document.getElementById("env"); if (env.classList.contains("open")) return;
    K.music.play(); env.classList.add("open");
    setTimeout(function () { document.querySelector(".hero").classList.add("go"); }, 700);
    setTimeout(function () {
      opened = true; document.body.classList.remove("locked");
      document.getElementById("app").insertAdjacentHTML("beforeend", K.chrome()); K.bindChrome(render); K.reveal();
    }, 1500);
    setTimeout(function () { env.remove(); }, 2100);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  render();
})();
