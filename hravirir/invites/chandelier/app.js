/* «Ջահ» դիզայնի դասավորությունը */
(function () {
  "use strict";
  var K = window.K, C = K.C, esc = K.esc, t = K.t, u = K.u, pad = K.pad, A = window.ChArt;
  var TXT = {
    hy: { hint: "Սեղմեք բանալուն", invite: "Հարսանյաց հրավեր", dear: "Սիրելի՛ հարազատներ և ընկերներ", lead: "Սիրով հրավիրում ենք Ձեզ", left: "Հարսանիքին մնացել է",
      program: "Օրվա ծրագիր", dress: "Դրեսկոդ", rsvp: "Հարցաթերթիկ", rsvpLead: "Խնդրում ենք հաստատել Ձեր մասնակցությունը մինչև", note: "Մաղթանք կամ նշում", love: "Սիրով՝",
      wdl: ["Կիրակի", "Երկուշաբթի", "Երեքշաբթի", "Չորեքշաբթի", "Հինգշաբթի", "Ուրբաթ", "Շաբաթ"] },
    ru: { hint: "Нажмите на ключ", invite: "Приглашение на свадьбу", dear: "Дорогие родные и друзья", lead: "С любовью приглашаем вас", left: "До свадьбы осталось",
      program: "Программа дня", dress: "Дресс-код", rsvp: "Анкета", rsvpLead: "Пожалуйста, подтвердите участие до", note: "Пожелание или комментарий", love: "С любовью,",
      wdl: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"] },
    en: { hint: "Tap the key", invite: "Wedding invitation", dear: "Dear family and friends", lead: "With love we invite you", left: "Counting down",
      program: "Schedule", dress: "Dress code", rsvp: "RSVP", rsvpLead: "Kindly reply by", note: "Wishes or notes", love: "With love,",
      wdl: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] }
  };
  function x(k) { return (TXT[K.lang] || TXT.hy)[k]; }

  function envelope() {
    var g = K.guest();
    return '<div class="env" id="env"><div class="lockw" id="lockw">' + A.lock() + '<div class="kbow">' + A.bow() + "</div></div>" +
      '<button class="key" id="seal" aria-label="' + esc(x("hint")) + '">' + A.key() + "</button>" +
      '<div class="env-names">' + esc(K.names().join(" & ")) + "</div>" +
      (g ? '<div class="env-to">' + esc(C.dear != null ? t(C.dear) : u("dear")) + "<b>" + esc(g) + "</b></div>" : "") +
      (K.PREVIEW ? "" : '<div class="env-hint">' + esc(x("hint")) + "</div>") + "</div>";
  }
  function hero() {
    var n = K.names(), d = K.date;
    return '<section class="hero">' + (C.heroBg ? '<img class="hbg" alt="" data-wc="' + esc(C.heroBg) + '" data-wcw="820">' : '<div class="arch">' + A.arches() + "</div>") + '<div class="wash"></div><div class="chand">' + A.chandelier() + "</div>" +
      '<div class="txt wrap"><div class="caps">' + esc(x("invite")) + '</div><h1 class="nm foil"><span>' + esc(n[0]) + '</span><span class="amp">&amp;</span><span>' + esc(n[1] || "") + "</span></h1>" +
      '<div class="dt">' + pad(d.getDate()) + " · " + pad(d.getMonth() + 1) + " · " + d.getFullYear() + "</div></div></section>";
  }
  function invite() {
    var d = K.date;
    return '<section><div class="wrap"><div class="caps rv">' + esc(x("dear")) + '</div><div class="lead foil rv">' + esc(x("lead")) + '</div><p class="p rv">' + esc(t(C.text)) + "</p>" +
      (C.photo ? '<div class="oval rv" style="background-image:url(\'' + esc(C.photo) + '\')"></div>' : "") + '<p class="p rv">' + esc(t(C.text2)) + "</p>" +
      '<div class="dline rv">' + esc(x("wdl")[d.getDay()]) + " · " + esc(K.dateLong()) + "</div></div></section>";
  }
  function countdown() {
    return '<section style="padding-top:10px"><div class="wrap"><div class="caps rv">' + esc(x("left")) + '</div><div class="cdn rv" data-cd>' + ["days", "hours", "minutes", "seconds"].map(function (k) {
      return '<div><b data-k="' + k + '">00</b><span>' + esc(u(k)) + "</span></div>";
    }).join("") + "</div></div></section>";
  }
  function program() {
    var ev = C.events || []; if (!ev.length) return "";
    return '<section style="padding-top:20px">' + A.garland() + '<div class="wrap" style="margin-top:26px"><h2 class="h2 foil rv">' + esc(x("program")) + "</h2>" + ev.map(function (e) {
      return '<div class="ev rv"><div class="pic">' + (e.img ? '<img class="wcimg" alt="" data-wc="' + esc(e.img) + '">' : window.MonoSketch ? window.MonoSketch(e.sketch || "house") : "") + '</div><div class="tm">' + esc(e.time) + '</div><div class="t">' + esc(t(e.title)) +
        '</div><div class="n foil">' + esc(t(e.place)) + '</div><div class="a">' + esc(t(e.address)) + "</div>" +
        (e.map ? '<a class="btn" href="' + esc(e.map) + '" target="_blank" rel="noopener">' + esc(u("map")) + "</a>" : "") + "</div>";
    }).join("") + "</div></section>";
  }
  function dress() {
    if (!C.dresscode) return "";
    return '<section class="dress"><i class="cols l"></i><i class="cols r"></i>' + A.garland() + '<div class="wrap" style="margin-top:26px"><h2 class="h2 foil rv">' + esc(x("dress")) + '</h2><p class="rv">' + esc(t(C.dresscode.text)) +
      '</p><div class="dots rv">' + (C.dresscode.colors || []).map(function (c) { return '<i style="background:' + esc(c) + '"></i>'; }).join("") + "</div></div></section>";
  }
  function rsvp() {
    if (!C.rsvp) return "";
    return '<section>' + A.garland() + '<div class="wrap" style="margin-top:26px"><h2 class="h2 foil rv">' + esc(x("rsvp")) + '</h2><p class="rv">' + esc(x("rsvpLead")) + " " + esc(K.deadline()) + "</p>" +
      '<form class="rs rv" id="rf"><label class="radio"><input type="radio" name="attend" value="yes" checked>' + esc(u("yes")) + "</label>" +
      '<label class="radio"><input type="radio" name="attend" value="no">' + esc(u("no")) + "</label>" +
      '<div class="fl"><label for="rn">' + esc(u("name")) + '</label><input id="rn" name="name" required autocomplete="name"></div>' +
      '<div class="fl"><label for="rg">' + esc(u("guests")) + '</label><select id="rg" name="guests">' + [1, 2, 3, 4, 5, 6].map(function (i) { return "<option>" + i + "</option>"; }).join("") + "</select></div>" +
      '<div class="fl"><label for="rt">' + esc(x("note")) + '</label><textarea id="rt" name="note"></textarea></div>' +
      '<button class="btn fill" type="submit">' + esc(u("send")) + "</button></form></div></section>";
  }
  function fin() {
    return '<section class="fin"><div class="wrap"><div class="mini rv">' + A.chandelier() + '</div><div class="caps rv">' + esc(x("love")) + '</div><div class="nm foil rv">' + esc(K.names().join(" & ")) + "</div></div></section>" +
      '<div class="made"><a href="https://hravirir.am" target="_blank" rel="noopener">HRAVIRIR.AM</a></div>';
  }

  var opened = false;
  function render() {
    document.documentElement.lang = K.lang;
    document.title = K.names().join(" & ");
    document.getElementById("app").innerHTML = (opened ? "" : envelope()) + "<main>" + hero() + invite() + countdown() + program() + dress() + rsvp() + fin() + "</main>" + (opened ? K.chrome() : "");
    document.body.classList.toggle("locked", !opened);
    if (!opened) { var s = document.getElementById("seal"); if (s && !K.PREVIEW) s.onclick = open; if (K.PREVIEW) document.querySelector(".hero").classList.add("go"); }
    else { document.querySelector(".hero").classList.add("go"); K.reveal(); }
    if (window.Watercolor) window.Watercolor.apply();   // լուսանկարները՝ ջրաներկ նկարի տեսքով
    K.countdown(true); K.rsvp(document.getElementById("rf")); K.bindChrome(render);
  }
  /* Բացում՝ ինչպես օրինակում.
     1) բանալին պտտվում է (գլխիկը ձախից անցնում է աջ) և կանգնում անցքի աջ կողմում՝ ծայրով դեպի անցքը
     2) սահում է անցքի մեջ. անցքից ներս մտած մասը թաքնվում է (clip-path)
     3) շրջվում է դեպի էկրանի խորքը (կարճանում է), մնում է գլխիկը՝ դեմքով
     4) գլխիկը պտտվում է 90°, մտնում անցքի մեջ, անցքից լույս է գալիս, կողպեքը բացվում է */
  function open() {
    var env = document.getElementById("env"), key = document.getElementById("seal"), ksvg = key.querySelector("svg"), kb = document.querySelector(".kbow");
    if (env.dataset.busy) return; env.dataset.busy = "1";
    K.music.play();
    key.style.animation = "none"; void key.offsetWidth;
    var ls = document.querySelector("#lockw > svg").getBoundingClientRect();
    var hx = ls.left + ls.width * (108 / 216), hy = ls.top + ls.height * (125 / 268);   // անցքի կենտրոնը (lock viewBox՝ -8 -4 216 268)
    var kr = key.getBoundingClientRect(), W = kr.width, H = kr.height, tip = W * 20 / 220;
    var dx0 = hx + 8 - (kr.left + tip), dy = hy - (kr.top + H / 2), ins = W * .3, dx1 = dx0 - 8 - ins, cut = tip + ins;
    var T = function (x, extra) { return "translate(" + x + "px," + dy + "px)" + (extra || ""); };
    var clip = function (px) { return "inset(-30px -30px -30px " + px + "px)"; };
    // 1
    ksvg.animate([{ transform: "rotate(180deg)" }, { transform: "rotate(0deg)" }], { duration: 950, easing: "cubic-bezier(.5,0,.2,1)", fill: "forwards" });
    key.animate([
      { transform: "translate(0,0) scale(1)" },
      { transform: "translate(" + dx0 * .55 + "px," + (dy - 46) + "px) scale(1.1)", offset: .5 },
      { transform: T(dx0, " scale(1)") }
    ], { duration: 950, easing: "cubic-bezier(.5,0,.2,1)", fill: "forwards" });
    // 2
    setTimeout(function () {
      key.animate([{ transform: T(dx0), clipPath: clip(tip - 8) }, { transform: T(dx1), clipPath: clip(cut) }],
        { duration: 850, easing: "ease-in-out", fill: "forwards" });
    }, 960);
    // 3
    setTimeout(function () {
      key.style.transformOrigin = cut + "px 50%";
      key.animate([
        { transform: T(dx1, " scaleX(1)"), clipPath: clip(cut), opacity: 1 },
        { transform: T(dx1, " scaleX(.2)"), clipPath: clip(cut), opacity: 1, offset: .8 },
        { transform: T(dx1, " scaleX(.12)"), clipPath: clip(cut), opacity: 0 }
      ], { duration: 650, easing: "ease-in", fill: "forwards" });
    }, 1830);
    // 4
    setTimeout(function () {
      kb.animate([
        { opacity: 0, transform: "translate(-20%,-50%) scale(.55)" },
        { opacity: 1, transform: "translate(-50%,-50%) scale(1) rotate(0deg)", offset: .2 },
        { opacity: 1, transform: "translate(-50%,-50%) scale(1) rotate(90deg)", offset: .72 },
        { opacity: 0, transform: "translate(-50%,-50%) scale(.3) rotate(90deg)" }
      ], { duration: 1500, easing: "ease-in-out", fill: "forwards" });
    }, 2250);
    setTimeout(function () { env.classList.add("open"); }, 3580);
    setTimeout(function () { document.querySelector(".hero").classList.add("go"); }, 4500);
    setTimeout(function () {
      opened = true; document.body.classList.remove("locked");
      document.getElementById("app").insertAdjacentHTML("beforeend", K.chrome()); K.bindChrome(render); K.reveal();
    }, 5100);
    setTimeout(function () { env.remove(); }, 5700);
  }
  render();
})();
