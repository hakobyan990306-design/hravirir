/* «Շամպայն» (հոբելյան) դիզայնի դասավորությունը */
(function () {
  "use strict";
  var K = window.K, C = K.C, esc = K.esc, t = K.t, u = K.u, pad = K.pad;
  var TXT = {
    hy: { hint: "Սեղմեք շշին", top: "Հոբելյանի հրավեր", years: "ՏԱՐԻ", plan: "Օրվա ծրագիր", where: "Որտեղ", dress: "Դրեսկոդ", left: "Հոբելյանին մնացել է",
      rsvp: "Հարցաթերթիկ", rsvpLead: "Խնդրում ենք պատասխանել մինչև", fin: "Սիրով սպասում եմ Ձեզ" },
    ru: { hint: "Нажмите на бутылку", top: "Приглашение на юбилей", years: "ЛЕТ", plan: "Программа дня", where: "Где", dress: "Дресс-код", left: "До юбилея осталось",
      rsvp: "Анкета", rsvpLead: "Пожалуйста, ответьте до", fin: "С любовью жду вас" },
    en: { hint: "Tap the bottle", top: "Anniversary invitation", years: "YEARS", plan: "Schedule", where: "Where", dress: "Dress code", left: "Counting down",
      rsvp: "RSVP", rsvpLead: "Kindly reply by", fin: "Looking forward to seeing you" }
  };
  function x(k) { return (TXT[K.lang] || TXT.hy)[k]; }
  function f(v) { return Math.round(v * 10) / 10; }
  var s0 = 21; function r() { s0 = (s0 * 16807) % 2147483647; return s0 / 2147483647; }

  function bottle() {
    return '<svg viewBox="0 0 100 330" aria-hidden="true"><defs>' +
      '<linearGradient id="gl" x1="0" x2="1"><stop offset="0" stop-color="#0d2a1f"/><stop offset=".3" stop-color="#1f4d3a"/><stop offset=".45" stop-color="#3c7a5f"/><stop offset=".6" stop-color="#173d2e"/><stop offset="1" stop-color="#081a13"/></linearGradient>' +
      '<linearGradient id="fo" x1="0" x2="1"><stop offset="0" stop-color="#8a6630"/><stop offset=".4" stop-color="#f0dcaa"/><stop offset=".6" stop-color="#c9a15c"/><stop offset="1" stop-color="#7f6232"/></linearGradient></defs>' +
      '<g class="cork"><path d="M40 6c0-8 20-8 20 0v26H40z" fill="#d8b98a"/><path d="M36 30h28v8H36z" fill="#b8955f"/></g>' +
      '<path d="M38 36h24v44c0 16 30 34 30 70v166c0 7-5 12-12 12H20c-7 0-12-5-12-12V150c0-36 30-54 30-70z" fill="url(#gl)"/>' +
      '<path d="M37 34h26v58c6 10 14 18 20 28H17c6-10 14-18 20-28z" fill="url(#fo)"/>' +
      '<path d="M20 170h60v86H20z" fill="#fbf4e2"/><path d="M24 174h52v78H24z" fill="none" stroke="#b8904f" stroke-width="1"/>' +
      '<text x="50" y="222" text-anchor="middle" font-family="Cinzel, serif" font-size="34" fill="#9a7438">' + esc(C.age || "") + "</text>" +
      '<text x="50" y="240" text-anchor="middle" font-family="Cinzel, serif" font-size="7" letter-spacing="2" fill="#9a7438">' + esc(x("years")) + "</text>" +
      '<path d="M24 150c4-30 20-40 22-68" stroke="#fff" stroke-width="3" opacity=".18" fill="none"/></svg>';
  }
  function bokeh(n) { var h = ""; for (var i = 0; i < n; i++) { var s = 20 + r() * 70; h += '<i style="left:' + f(r() * 100) + "%;top:" + f(r() * 100) + "%;width:" + f(s) + "px;height:" + f(s) + "px;animation-delay:-" + f(r() * 6) + 's"></i>'; } return '<div class="bokeh">' + h + "</div>"; }
  function burst() {
    var h = "", cols = ["#f0dcaa", "#cfaa62", "#fbeec6", "#b98f4b", "#ffffff"];
    for (var i = 0; i < 60; i++) { var a = -Math.PI / 2 + (r() - .5) * 2.2, d = 180 + r() * 360;
      h += '<i class="c" style="background:' + cols[i % 5] + ";--x:" + f(Math.cos(a) * d) + "px;--y:" + f(Math.sin(a) * d + 200) + "px;--r:" + f(r() * 900) + "deg;--dl:" + f(r() * .25) + 's"></i>'; }
    for (var j = 0; j < 18; j++) { var b = -Math.PI / 2 + (r() - .5) * .9, e = 40 + r() * 120; h += '<i class="f" style="--x:' + f(Math.cos(b) * e) + "px;--y:" + f(Math.sin(b) * e) + "px;--dl:" + f(r() * .15) + 's"></i>'; }
    return '<div class="burst">' + h + "</div>";
  }
  function envelope() {
    var g = K.guest();
    return '<div class="env" id="env" role="button" aria-label="' + esc(x("hint")) + '">' + bokeh(16) + '<div class="top"><div class="caps">' + esc(x("top")) + "</div>" + (g ? "<b>" + esc(g) + "</b>" : "") + "</div>" +
      '<div class="big foil">' + esc(C.age || "") + '</div><div class="bottle" id="seal">' + bottle() + "</div>" + burst() + (K.PREVIEW ? "" : '<div class="hint">' + esc(x("hint")) + "</div>") + "</div>";
  }
  function glasses() {
    return '<svg class="glasses" viewBox="0 0 90 60" fill="none" stroke="#cfaa62" stroke-width="1.3"><path d="M22 6h14l-2 18a5 5 0 0 1-10 0zM29 29v22M22 52h14"/><path d="M54 6h14l-2 18a5 5 0 0 1-10 0zM61 29v22M54 52h14"/><path d="M45 4v-3M40 6l-2-2M50 6l2-2"/></svg>';
  }
  function hero() {
    var n = K.names(), d = K.date;
    return '<section class="hero">' + bokeh(10) + '<div class="wrap" style="position:relative"><div class="caps rv">' + esc(x("top")) + '</div><div class="age foil rv d1">' + esc(C.age || "") + '</div><div class="ys rv d1">' + esc(x("years")) + "</div>" +
      '<div class="nm foil rv d2">' + esc(n[0] || "") + '</div><div class="line"></div><div class="dt rv d2">' + pad(d.getDate()) + " · " + pad(d.getMonth() + 1) + " · " + d.getFullYear() + "</div>" +
      glasses() + (C.photo ? '<div class="photo rv d3" style="background-image:url(\'' + esc(C.photo) + '\')"></div>' : "") + "</div></section>";
  }
  function body() {
    var v = C.venue, s = '<section class="band"><div class="wrap"><p class="p rv">' + esc(t(C.text)) + "</p></div></section>" +
      '<section><div class="wrap"><div class="caps rv">' + esc(x("left")) + '</div><div class="cdn rv" data-cd>' + ["days", "hours", "minutes", "seconds"].map(function (k) {
        return '<div><b data-k="' + k + '">00</b><span>' + esc(u(k)) + "</span></div>"; }).join("") + "</div></div></section>";
    if (C.timing) s += '<section class="band"><div class="wrap"><h2 class="h2 foil rv">' + esc(x("plan")) + '</h2><div class="plan rv">' + C.timing.map(function (it) {
      return "<div><b>" + esc(it.time) + "</b><span>" + esc(t(it.text)) + "</span></div>"; }).join("") + "</div></div></section>";
    if (v) s += '<section><div class="wrap"><h2 class="h2 foil rv">' + esc(x("where")) + '</h2><div class="place rv">' + (v.img ? '<img alt="" data-wc="' + esc(v.img) + '">' : '<div class="ico">' + K.evIcon(v, "glow-c") + "</div>") +
      '<div class="n">' + esc(t(v.place)) + '</div><div class="a">' + esc(t(v.address)) + "</div>" + (v.map ? '<a class="btn" href="' + esc(v.map) + '" target="_blank" rel="noopener">' + esc(u("map")) + "</a>" : "") + "</div>" +
      (C.dresscode ? '<h2 class="h2 foil rv" style="margin-top:56px">' + esc(x("dress")) + '</h2><p class="rv">' + esc(t(C.dresscode.text)) + '</p><div class="dots rv">' +
        (C.dresscode.colors || []).map(function (c) { return '<i style="background:' + esc(c) + '"></i>'; }).join("") + "</div>" : "") + "</div></section>";
    if (C.rsvp) s += '<section class="band"><div class="wrap"><h2 class="h2 foil rv">' + esc(x("rsvp")) + '</h2><p class="rv">' + esc(x("rsvpLead")) + " " + esc(K.deadline()) + "</p>" +
      '<form class="rs rv" id="rf"><label class="radio"><input type="radio" name="attend" value="yes" checked>' + esc(u("yes")) + "</label>" +
      '<label class="radio"><input type="radio" name="attend" value="no">' + esc(u("no")) + "</label>" +
      '<div class="fl"><label for="rn">' + esc(u("name")) + '</label><input id="rn" name="name" required autocomplete="name"></div>' +
      '<div class="fl"><label for="rg">' + esc(u("guests")) + '</label><select id="rg" name="guests">' + [1, 2, 3, 4, 5, 6].map(function (i) { return "<option>" + i + "</option>"; }).join("") + "</select></div>" +
      '<button class="btn fill" type="submit">' + esc(u("send")) + "</button></form></div></section>";
    return s + '<section class="fin"><div class="wrap">' + glasses() + '<div class="caps rv" style="margin-top:14px">' + esc(x("fin")) + '</div><div class="nm foil rv">' + esc(K.names()[0] || "") + "</div></div></section>" +
      '<div class="made"><a href="https://hravirir.am" target="_blank" rel="noopener">HRAVIRIR.AM</a></div>';
  }

  var opened = false;
  function render() {
    document.documentElement.lang = K.lang;
    document.title = K.names()[0] || "";
    document.getElementById("app").innerHTML = (opened ? "" : envelope()) + "<main>" + hero() + body() + "</main>" + (opened ? K.chrome() : "");
    document.body.classList.toggle("locked", !opened);
    if (!opened) { var e = document.getElementById("env"); if (e && !K.PREVIEW) e.onclick = open; } else K.reveal();
    if (window.Watercolor) window.Watercolor.apply();
    K.countdown(true); K.rsvp(document.getElementById("rf")); K.bindChrome(render);
  }
  // խցանը թռչում է, փրփուր և ոսկե կոնֆետի, հայտնվում է մեծ թիվը
  function open() {
    var env = document.getElementById("env"); if (env.classList.contains("open")) return;
    K.music.play(); env.classList.add("open");
    setTimeout(function () {
      opened = true; document.body.classList.remove("locked");
      document.getElementById("app").insertAdjacentHTML("beforeend", K.chrome()); K.bindChrome(render); K.reveal();
    }, 3000);
    setTimeout(function () { env.remove(); }, 3400);
  }
  render();
})();
