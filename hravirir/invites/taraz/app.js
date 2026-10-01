/* «Տարազ» դիզայնի դասավորությունը */
(function () {
  "use strict";
  var K = window.K, C = K.C, esc = K.esc, t = K.t, u = K.u, pad = K.pad;
  var TXT = {
    hy: { hint: "Սեղմեք զարդին", envTop: "Հարսանյաց հրավեր", inv: "Սիրով հրավիրում ենք Ձեզ մեր հարսանիքին", our: "Օրհնյալ օջախ", program: "Օրվա ծրագիր", dress: "Դրեսկոդ", left: "Հարսանիքին մնացել է",
      rsvp: "Հարցաթերթիկ", rsvpLead: "Խնդրում ենք պատասխանել մինչև", fin: "Սիրով սպասում ենք Ձեզ", wdl: ["Կիրակի", "Երկուշաբթի", "Երեքշաբթի", "Չորեքշաբթի", "Հինգշաբթի", "Ուրբաթ", "Շաբաթ"] },
    ru: { hint: "Нажмите на узор", envTop: "Свадебное приглашение", inv: "С любовью приглашаем вас на нашу свадьбу", our: "Благословенный очаг", program: "Программа дня", dress: "Дресс-код", left: "До свадьбы осталось",
      rsvp: "Анкета", rsvpLead: "Пожалуйста, ответьте до", fin: "С любовью ждём вас", wdl: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"] },
    en: { hint: "Tap the ornament", envTop: "Wedding invitation", inv: "We joyfully invite you to our wedding", our: "A blessed home", program: "Schedule", dress: "Dress code", left: "Counting down",
      rsvp: "RSVP", rsvpLead: "Kindly reply by", fin: "With love", wdl: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] }
  };
  function x(k) { return (TXT[K.lang] || TXT.hy)[k]; }
  function f(v) { return Math.round(v * 10) / 10; }
  var RED = "#8c1c24", DARK = "#5e0f18", GOLD = "#c9a04e", GOLDL = "#ecd49a", CREAM = "#f5ead6";

  // Հավերժության նշան (արևախաչ)
  function arev(cx, cy, r, col) {
    var s = "";
    for (var i = 0; i < 8; i++) s += '<path transform="translate(' + cx + " " + cy + ") rotate(" + i * 45 + ')" d="M0 0C' + f(r * .12) + " " + f(-r * .5) + " " + f(r * .62) + " " + f(-r * .8) + " " + f(r * .98) + " " + f(-r * .3) +
      "C" + f(r * .72) + " " + f(-r * .48) + " " + f(r * .36) + " " + f(-r * .38) + ' 0 0Z" fill="' + col + '"/>';
    return s + '<circle cx="' + cx + '" cy="' + cy + '" r="' + f(r * .14) + '" fill="' + col + '"/>';
  }
  function star8(cx, cy, r, c1, c2) {
    var a = r * .72;
    return '<rect x="' + f(cx - a) + '" y="' + f(cy - a) + '" width="' + f(a * 2) + '" height="' + f(a * 2) + '" fill="' + c1 + '"/>' +
      '<rect x="' + f(cx - a) + '" y="' + f(cy - a) + '" width="' + f(a * 2) + '" height="' + f(a * 2) + '" transform="rotate(45 ' + cx + " " + cy + ')" fill="' + c1 + '"/>' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="' + f(r * .64) + '" fill="' + c2 + '"/>';
  }
  function medallion() {
    return '<svg viewBox="0 0 120 120" aria-hidden="true"><defs><radialGradient id="mg" cx=".4" cy=".35"><stop offset="0" stop-color="#fbe7b0"/><stop offset=".6" stop-color="' + GOLD + '"/><stop offset="1" stop-color="#8a6526"/></radialGradient></defs>' +
      star8(60, 60, 58, "url(#mg)", DARK) + '<circle cx="60" cy="60" r="34" fill="none" stroke="' + GOLDL + '" stroke-width="1.2" stroke-dasharray="2 3"/>' + arev(60, 60, 30, "url(#mg)") + "</svg>";
  }
  function coins(n) {
    var h = '<svg class="coins" viewBox="0 0 ' + n * 24 + ' 60" preserveAspectRatio="none" aria-hidden="true"><defs><radialGradient id="cg" cx=".38" cy=".35"><stop offset="0" stop-color="#fff2c6"/><stop offset=".55" stop-color="#d6ae5a"/><stop offset="1" stop-color="#8a6526"/></radialGradient></defs>' +
      '<path d="M0 6H' + n * 24 + '" stroke="' + GOLD + '" stroke-width="2" stroke-dasharray="3 2"/>';
    for (var i = 0; i < n; i++) {
      var cx = 12 + i * 24, L = i % 2 ? 26 : 16;
      h += '<g class="cn" style="animation-delay:-' + f((i % 5) * .35) + 's"><path d="M' + cx + " 6V" + L + '" stroke="' + GOLD + '" stroke-width="1.2"/><circle cx="' + cx + '" cy="' + (L + 10) + '" r="10" fill="url(#cg)" stroke="#8a6526" stroke-width=".8"/>' +
        '<circle cx="' + cx + '" cy="' + (L + 10) + '" r="6.5" fill="none" stroke="#8a6526" stroke-width=".6"/></g>';
    }
    return h + "</svg>";
  }
  // ծրագրի զարդեր՝ յուրաքանչյուրը տարբեր
  function icon(i) {
    var s = '<svg viewBox="0 0 100 100" aria-hidden="true">';
    if (i === 0) s += '<path d="M36 30l5-14 5 9 4-12 4 12 5-9 5 14z" fill="' + GOLD + '"/><circle cx="50" cy="60" r="30" fill="' + RED + '" stroke="' + GOLD + '" stroke-width="2.5"/>' +
      '<path d="M50 40c-9 8-9 32 0 40c9-8 9-32 0-40z" fill="' + DARK + '"/>' + [[42, 54], [58, 54], [46, 66], [54, 66], [50, 58]].map(function (p) { return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="2.6" fill="' + GOLDL + '"/>'; }).join("");
    else if (i === 1) s += '<circle cx="50" cy="50" r="46" fill="' + RED + '" stroke="' + GOLD + '" stroke-width="2.5"/>' + arev(50, 50, 38, GOLDL);
    else if (i === 2) s += '<path d="M50 4v92M4 50h92" stroke="' + GOLD + '" stroke-width="1"/><path d="M50 10c8 10 8 16 0 22c-8-6-8-12 0-22zM50 90c8-10 8-16 0-22c-8 6-8 12 0 22zM10 50c10-8 16-8 22 0c-6 8-12 8-22 0zM90 50c-10-8-16-8-22 0c6 8 12 8 22 0z" fill="' + RED + '" stroke="' + GOLD + '" stroke-width="2"/>' +
      '<rect x="38" y="38" width="24" height="24" transform="rotate(45 50 50)" fill="' + GOLD + '"/><circle cx="50" cy="50" r="6" fill="' + DARK + '"/>';
    else s += star8(50, 50, 48, GOLD, RED) + '<circle cx="50" cy="50" r="22" fill="none" stroke="' + GOLDL + '" stroke-width="1.5"/>' + star8(50, 50, 16, GOLDL, DARK);
    return s + "</svg>";
  }

  // Ազգային տարազով զույգ. փեսան՝ չուխա գազիրներով, արծաթե գոտի, փափախ, երկարաճիտ կոշիկներ,
  // հարսը՝ կարմիր թավշե զգեստ ոսկե ասեղնագործությամբ, ոսկե գոտի, ճակատնոց մետաղադրամներով, սպիտակ քող, հյուսեր
  function couple() {
    var SK = "#e9bc95", SKd = "#d29e78", HAIR = "#2b1a14", CH = "#262230", CHl = "#3a3448", SIL = "#d9dde2", s = "";
    s += '<svg class="cpl" viewBox="0 0 260 330" aria-hidden="true"><defs>' +
      '<linearGradient id="dr" x1="0" x2="1"><stop offset="0" stop-color="#7e121c"/><stop offset=".45" stop-color="#b3212d"/><stop offset="1" stop-color="#6e0f18"/></linearGradient>' +
      '<linearGradient id="ch" x1="0" x2="1"><stop offset="0" stop-color="#1c1924"/><stop offset=".5" stop-color="' + CHl + '"/><stop offset="1" stop-color="#1a1722"/></linearGradient>' +
      '<linearGradient id="gd" x1="0" x2="1"><stop offset="0" stop-color="#a87a2c"/><stop offset=".5" stop-color="#f1d58a"/><stop offset="1" stop-color="#a87a2c"/></linearGradient></defs>' +
      '<ellipse cx="130" cy="318" rx="110" ry="8" fill="rgba(0,0,0,.18)"/>';
    // ——— Փեսա ———
    s += '<path d="M65 232L63 274H81L84 232ZM86 232L89 274H107L105 232Z" fill="#1d1a24"/><path d="M66 268L64 312H80L82 268ZM88 268L90 312H106L104 268Z" fill="#141217"/><path d="M62 306H82V314H60ZM88 306H108V314H90Z" fill="#0b0a0d"/>' + // կոշիկներ
      '<path d="M60 92Q85 84 110 92L118 240Q85 252 52 240Z" fill="url(#ch)"/>' + // չուխա
      '<path d="M85 96L78 160L85 240L92 160Z" fill="#141217" opacity=".55"/>' +
      '<path d="M76 88L85 132L94 88Z" fill="#8c1c24"/><path d="M76 88L85 132L94 88" fill="none" stroke="url(#gd)" stroke-width="1.6"/>' + // ներքնաշապիկ
      '<path d="M60 92L48 192Q50 198 56 196L68 112Z" fill="url(#ch)"/><circle cx="52" cy="198" r="6" fill="' + SK + '"/>' + // ձախ ձեռք
      '<path d="M108 94Q122 120 128 178L120 182Q112 140 102 112Z" fill="url(#ch)"/>'; // աջ ձեռք դեպի հարսը
    for (var g = 0; g < 6; g++) s += '<rect x="' + (64) + '" y="' + (100 + g * 7) + '" width="9" height="4.4" rx="1.6" fill="' + SIL + '"/><rect x="' + (97) + '" y="' + (100 + g * 7) + '" width="9" height="4.4" rx="1.6" fill="' + SIL + '"/>';
    s += '<path d="M62 152H108V160H62Z" fill="' + SIL + '"/><path d="M62 152H108" stroke="#9aa0a8" stroke-width=".8"/><rect x="80" y="150" width="10" height="12" rx="2" fill="#f1d58a" stroke="#a87a2c"/>' + // արծաթե գոտի
      '<path d="M90 162L94 200L91 204L87 166Z" fill="' + SIL + '" stroke="#8a9098" stroke-width=".8"/>' + // դաշույն
      '<rect x="80" y="74" width="10" height="12" fill="' + SKd + '"/><ellipse cx="85" cy="62" rx="13" ry="15" fill="' + SK + '"/>' +
      '<path d="M76 70Q85 76 94 70Q90 74 85 74Q80 74 76 70Z" fill="' + HAIR + '"/><circle cx="80" cy="60" r="1.3" fill="#2b1a14"/><circle cx="90" cy="60" r="1.3" fill="#2b1a14"/>' +
      '<path d="M70 52Q70 26 85 24Q100 26 100 52Z" fill="#1e1a1c"/>'; // փափախ
    for (var p = 0; p < 18; p++) s += '<circle cx="' + (72 + (p % 6) * 5.2) + '" cy="' + (30 + Math.floor(p / 6) * 7) + '" r="2.4" fill="#3a3436"/>';
    // ——— Հարս ———
    s += '<path d="M196 70Q232 120 226 236L204 240Q210 150 188 80Z" fill="#fff" opacity=".5"/>' + // քող
      '<path d="M158 92Q175 86 192 92L190 150H160Z" fill="url(#dr)"/>' + // իրան
      '<path d="M160 150H190L222 306Q175 318 128 306Z" fill="url(#dr)"/>' + // փեշ
      '<path d="M170 156L175 306L180 156Z" fill="#f6ead6"/>' + // ներքնազգեստ
      '<path d="M175 92V150M170 156L156 306M180 156L194 306" stroke="url(#gd)" stroke-width="2"/>' +
      '<path d="M131 300Q175 312 219 300" stroke="url(#gd)" stroke-width="5" fill="none"/>' +
      '<path d="M134 294Q175 305 216 294" stroke="#f1d58a" stroke-width="1" stroke-dasharray="3 3" fill="none"/>' +
      '<path d="M158 146H192V160H158Z" fill="url(#gd)"/><circle cx="175" cy="153" r="5" fill="' + SIL + '" stroke="#a87a2c"/>' + // գոտի
      '<path d="M160 94Q146 130 130 176L138 182Q156 140 168 108Z" fill="url(#dr)"/><path d="M126 174Q133 168 141 174L142 186Q133 181 124 186Z" fill="#f6ead6"/><circle cx="127" cy="182" r="5.5" fill="' + SK + '"/>' + // ձեռքը փեսային
      '<path d="M190 94Q200 130 204 168L196 170Q192 140 184 110Z" fill="url(#dr)"/><path d="M193 164Q201 158 209 164L211 177Q201 172 191 177Z" fill="#f6ead6"/><circle cx="201" cy="182" r="5.2" fill="' + SK + '"/>' + // աջ թև
      '<rect x="170" y="76" width="10" height="12" fill="' + SKd + '"/><ellipse cx="175" cy="64" rx="12" ry="14" fill="' + SK + '"/>' +
      '<path d="M163 60Q163 44 175 44Q187 44 187 60Q183 52 175 52Q167 52 163 60Z" fill="' + HAIR + '"/>' +
      '<path d="M165 66Q160 100 164 140" stroke="' + HAIR + '" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M185 66Q190 100 186 140" stroke="' + HAIR + '" stroke-width="5" fill="none" stroke-linecap="round"/>' + // հյուսեր
      '<circle cx="170" cy="63" r="1.2" fill="#2b1a14"/><circle cx="180" cy="63" r="1.2" fill="#2b1a14"/><path d="M172 70Q175 72 178 70" stroke="#b5544c" stroke-width="1.2" fill="none"/>' +
      '<path d="M160 50Q175 38 190 50L188 56Q175 46 162 56Z" fill="#8c1c24" stroke="url(#gd)" stroke-width="1.2"/>'; // ճակատնոց
    for (var c = 0; c < 7; c++) s += '<circle cx="' + (163 + c * 4) + '" cy="' + (57 + Math.abs(c - 3) * -.6 + 0) + '" r="1.9" fill="#f1d58a" stroke="#a87a2c" stroke-width=".4"/>';
    for (var nk = 0; nk < 7; nk++) s += '<circle cx="' + (166 + nk * 3) + '" cy="' + (92 + Math.sin(nk / 6 * Math.PI) * 5) + '" r="1.7" fill="#f1d58a"/>'; // վզնոց
    return s + "</svg>";
  }
  function envelope() {
    var n = K.names();
    return '<div class="env" id="env" role="button" aria-label="' + esc(x("hint")) + '"><div class="inside"><div class="orn cp">' + couple() + '</div><div class="nm">' + esc(n[0] || "") +
      '</div><div class="amp">&amp;</div><div class="nm">' + esc(n[1] || "") + "</div></div>" +
      '<div class="door l"><div class="frame"></div></div><div class="door r"><div class="frame"></div></div>' +
      '<div class="top"><div class="caps">' + esc(x("envTop")) + '</div></div><div class="med" id="med">' + medallion() + "</div>" +
      (K.PREVIEW ? "" : '<div class="hint">' + esc(x("hint")) + "</div>") + "</div>";
  }
  function hero() {
    var n = K.names(), d = K.date;
    return '<section class="hero">' + '<div class="wrap"><div class="card rv"><div class="med s">' + medallion() + '</div><div class="caps">' + esc(x("inv")) + "</div>" +
      '<h1 class="nm"><span>' + esc(n[0] || "") + '</span><span class="amp">&amp;</span><span>' + esc(n[1] || "") + "</span></h1>" +
      '<div class="dt3"><div class="s">' + esc(x("wdl")[d.getDay()]) + '</div><div class="d">' + d.getDate() + '</div><div class="s">' + esc(u("monthsGen")[d.getMonth()]) + "</div></div>" +
      '<div class="yr">' + d.getFullYear() + "</div></div>" + '<div class="cpl-h rv d2">' + couple() + "</div>" + K.photo() + "</div></section>";
  }
  function story() {
    return '<div class="strip"></div><section class="cream"><div class="wrap"><h2 class="h2 rv">' + esc(x("our")) + '</h2><div class="orn-s rv">' + icon(0) + '</div><p class="p rv">' + esc(t(C.text)) + "</p>" +
      '<div class="cal rv"><div class="cal-h">' + esc(u("months")[K.date.getMonth()]) + " " + K.date.getFullYear() + '</div><div class="cal-g">' + K.calendarCells() + "</div></div></div></section>";
  }
  function countdown() {
    return '<section class="velvet"><div class="wrap"><div class="caps rv">' + esc(x("left")) + '</div><div class="cdn rv" data-cd>' + ["days", "hours", "minutes", "seconds"].map(function (k) {
      return '<div><b data-k="' + k + '">00</b><span>' + esc(u(k)) + "</span></div>";
    }).join("") + "</div></div></section>";
  }
  function program() {
    return '<section class="cream"><div class="wrap"><h2 class="h2 rv">' + esc(x("program")) + "</h2>" + (C.events || []).map(function (e, i) {
      return '<div class="ev rv"><div class="pic ico">' + K.evIcon(e, "diamond-b") + '</div><div class="tm">' + esc(e.time) + '</div><div class="t">' + esc(t(e.title)) +
        '</div><div class="n">' + esc(t(e.place)) + '</div><div class="a">' + esc(t(e.address)) + "</div>" + (e.map ? '<a class="btn" href="' + esc(e.map) + '" target="_blank" rel="noopener">' + esc(u("map")) + "</a>" : "") + "</div>";
    }).join('<div class="sep"></div>') + "</div></section>";
  }
  function dress() {
    if (!C.dresscode) return "";
    return '<div class="strip"></div><section class="velvet"><div class="wrap"><h2 class="h2 rv">' + esc(x("dress")) + '</h2><p class="rv">' + esc(t(C.dresscode.text)) + '</p><div class="dots rv">' +
      (C.dresscode.colors || []).map(function (c) { return '<i style="background:' + esc(c) + '"></i>'; }).join("") + '</div></div></section><div class="strip"></div>';
  }
  function rsvp() {
    if (!C.rsvp) return "";
    return '<section class="cream"><div class="wrap"><h2 class="h2 rv">' + esc(x("rsvp")) + '</h2><p class="rv">' + esc(x("rsvpLead")) + " " + esc(K.deadline()) + "</p>" +
      '<form class="rs rv" id="rf"><label class="radio"><input type="radio" name="attend" value="yes" checked>' + esc(u("yes")) + "</label>" +
      '<label class="radio"><input type="radio" name="attend" value="no">' + esc(u("no")) + "</label>" +
      '<div class="fl"><label for="rn">' + esc(u("name")) + '</label><input id="rn" name="name" required autocomplete="name"></div>' +
      '<div class="fl"><label for="rg">' + esc(u("guests")) + '</label><select id="rg" name="guests">' + [1, 2, 3, 4, 5, 6].map(function (i) { return "<option>" + i + "</option>"; }).join("") + "</select></div>" +
      '<button class="btn fill" type="submit">' + esc(u("send")) + "</button></form></div></section>";
  }
  function fin() {
    return '<section class="velvet fin"><div class="wrap"><div class="med s rv">' + medallion() + '</div><div class="caps rv">' + esc(x("fin")) + '</div><div class="nm rv">' + esc(K.names().join(" & ")) + "</div></div></section>" +
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
  // զարդը պտտվում է և անհետանում → թավշե փեղկերը բացվում են → երևում են անունները
  function open() {
    var env = document.getElementById("env"); if (env.dataset.busy) return; env.dataset.busy = "1";
    K.music.play();
    env.classList.add("s1");
    setTimeout(function () { env.classList.add("s2"); }, 900);
    setTimeout(function () { env.classList.add("s3"); }, 3300);
    setTimeout(function () {
      opened = true; document.body.classList.remove("locked");
      document.getElementById("app").insertAdjacentHTML("beforeend", K.chrome()); K.bindChrome(render); K.reveal();
    }, 3900);
    setTimeout(function () { env.remove(); }, 4600);
  }
  render();
})();
