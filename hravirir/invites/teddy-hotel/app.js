/* «Արջուկների հյուրանոց» (երեխայի ծնունդ) — վարդագույն-ոսկե «հյուրանոց». փուչիկների կամար, դրոշակներ, երկփեղկ դուռ,
   արջուկ-դռնապան (փափուկ մորթի՝ SVG ֆիլտրով). սեղմելիս արջուկը գլխարկը բարձրացնում է, դուռը բացվում է, փուչիկները թռչում են */
(function () {
  "use strict";
  var K = window.K, C = K.C, esc = K.esc, t = K.t, u = K.u, pad = K.pad;
  var TXT = {
    hy: { hint: "Սեղմեք դռանը", top: "Ծննդյան տոն", sign: "Teddy Hotel", years: "տարեկան", inv: "Սիրով հրավիրում ենք Ձեզ", our: "Բարի գալուստ", program: "Օրվա ծրագիր", dress: "Դրեսկոդ",
      left: "Ծնունդին մնացել է", rsvp: "Հարցաթերթիկ", rsvpLead: "Խնդրում ենք պատասխանել մինչև", fin: "Սիրով սպասում ենք Ձեզ" },
    ru: { hint: "Нажмите на дверь", top: "День рождения", sign: "Teddy Hotel", years: "", inv: "С любовью приглашаем вас", our: "Добро пожаловать", program: "Программа дня", dress: "Дресс-код",
      left: "До дня рождения осталось", rsvp: "Анкета", rsvpLead: "Пожалуйста, ответьте до", fin: "С любовью ждём вас" },
    en: { hint: "Tap the door", top: "Birthday party", sign: "Teddy Hotel", years: "years old", inv: "You are invited", our: "Welcome", program: "Schedule", dress: "Dress code",
      left: "Counting down", rsvp: "RSVP", rsvpLead: "Kindly reply by", fin: "See you there" }
  };
  function x(k) { return (TXT[K.lang] || TXT.hy)[k]; }
  // ռուսերենում՝ «3 года / 5 лет»
  function years(n) {
    if (K.lang !== "ru") return x("years");
    n = Number(n) || 0; var a = n % 10, b = n % 100;
    return a === 1 && b !== 11 ? "год" : a >= 2 && a <= 4 && (b < 12 || b > 14) ? "года" : "лет";
  }

  /* ---------- արջուկ-դռնապան (մեկ անգամ defs, հետո ցանկացած քանակով) ---------- */
  var DEFS = '<svg class="th-defs" width="0" height="0" aria-hidden="true"><defs>' +
    '<filter id="thFur" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency=".7" numOctaves="3" seed="3" result="n"/>' +
    '<feDisplacementMap in="SourceGraphic" in2="n" scale="5" xChannelSelector="R" yChannelSelector="G" result="d"/><feTurbulence type="fractalNoise" baseFrequency="1.6" numOctaves="1" seed="8" result="g"/>' +
    '<feColorMatrix in="g" type="matrix" values="0 0 0 0 .35  0 0 0 0 .22  0 0 0 0 .12  0 0 0 .4 -.15" result="gt"/><feComposite in="gt" in2="d" operator="in" result="tex"/>' +
    '<feMerge><feMergeNode in="d"/><feMergeNode in="tex"/></feMerge></filter>' +
    '<filter id="thSoft" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="6"/></filter>' +
    '<radialGradient id="thFurG" cx=".42" cy=".35" r=".75"><stop offset="0" stop-color="#ecd3ae"/><stop offset=".55" stop-color="#d7b086"/><stop offset="1" stop-color="#b98d61"/></radialGradient>' +
    '<radialGradient id="thFurH" cx=".45" cy=".38" r=".7"><stop offset="0" stop-color="#f0d9b6"/><stop offset=".6" stop-color="#dcb68c"/><stop offset="1" stop-color="#bf9367"/></radialGradient>' +
    '<radialGradient id="thMuz" cx=".5" cy=".35" r=".7"><stop offset="0" stop-color="#fbf0de"/><stop offset="1" stop-color="#e8cfaa"/></radialGradient>' +
    '<radialGradient id="thEar" cx=".5" cy=".5" r=".6"><stop offset="0" stop-color="#e9c8a3"/><stop offset="1" stop-color="#c79d72"/></radialGradient>' +
    '<linearGradient id="thVest" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e9a6b8"/><stop offset=".6" stop-color="#d98aa1"/><stop offset="1" stop-color="#c47089"/></linearGradient>' +
    '<linearGradient id="thHat" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#c9718d"/><stop offset=".35" stop-color="#eaa7b9"/><stop offset="1" stop-color="#c9718d"/></linearGradient>' +
    '<linearGradient id="thGold" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#b8892f"/><stop offset=".45" stop-color="#f5dc94"/><stop offset="1" stop-color="#b8892f"/></linearGradient>' +
    '<radialGradient id="thBtn" cx=".35" cy=".3"><stop offset="0" stop-color="#fff2c4"/><stop offset=".55" stop-color="#d8b05a"/><stop offset="1" stop-color="#9c7027"/></radialGradient>' +
    '<radialGradient id="thEye" cx=".35" cy=".3"><stop offset="0" stop-color="#5a3a2a"/><stop offset=".5" stop-color="#1e120c"/><stop offset="1" stop-color="#0c0705"/></radialGradient>' +
    '<radialGradient id="thNose" cx=".4" cy=".3"><stop offset="0" stop-color="#7a5040"/><stop offset=".6" stop-color="#3a2219"/><stop offset="1" stop-color="#22130d"/></radialGradient>' +
    '<radialGradient id="thPad" cx=".5" cy=".4"><stop offset="0" stop-color="#f7e6cc"/><stop offset="1" stop-color="#e2c59c"/></radialGradient>' +
    '<radialGradient id="thBlush" cx=".5" cy=".5"><stop offset="0" stop-color="#e9939f" stop-opacity=".5"/><stop offset="1" stop-color="#e9939f" stop-opacity="0"/></radialGradient>' +
    "</defs></svg>";
  function bear(cls) {
    return '<svg class="ted ' + (cls || "") + '" viewBox="0 0 300 400" aria-hidden="true">' +
      '<ellipse cx="150" cy="388" rx="100" ry="10" fill="#7a4a50" opacity=".25" filter="url(#thSoft)"/>' +
      '<g filter="url(#thFur)"><ellipse cx="100" cy="350" rx="46" ry="40" fill="url(#thFurG)"/><ellipse cx="200" cy="350" rx="46" ry="40" fill="url(#thFurG)"/></g>' +
      '<ellipse cx="96" cy="362" rx="26" ry="22" fill="url(#thPad)"/><ellipse cx="204" cy="362" rx="26" ry="22" fill="url(#thPad)"/>' +
      '<g filter="url(#thFur)"><path d="M70 300C62 230 92 192 150 192C208 192 238 230 230 300C226 340 196 360 150 360C104 360 74 340 70 300Z" fill="url(#thFurG)"/></g>' +
      '<path d="M86 228C104 206 124 200 150 200C176 200 196 206 214 228C222 262 222 300 214 334C192 348 172 352 150 352C128 352 108 348 86 334C78 300 78 262 86 228Z" fill="url(#thVest)"/>' +
      '<path d="M150 204L128 206L140 252Z" fill="#f3c3cf" opacity=".9"/><path d="M150 204L172 206L160 252Z" fill="#f3c3cf" opacity=".9"/><path d="M150 210V350" stroke="#b9637d" stroke-width="1.5" opacity=".6"/>' +
      '<path d="M90 334C110 348 130 352 150 352C170 352 190 348 210 334" fill="none" stroke="url(#thGold)" stroke-width="3"/>' +
      [270, 296, 322].map(function (y) { return '<circle cx="134" cy="' + y + '" r="5.5" fill="url(#thBtn)"/><circle cx="166" cy="' + y + '" r="5.5" fill="url(#thBtn)"/>'; }).join("") +
      '<g filter="url(#thFur)"><path d="M86 226C62 236 48 270 52 300C54 316 70 322 80 312C88 290 92 262 100 244Z" fill="url(#thFurG)"/></g>' +
      '<g class="arm"><g filter="url(#thFur)"><path d="M214 226C238 236 252 270 248 300C246 316 230 322 220 312C212 290 208 262 200 244Z" fill="url(#thFurG)"/></g><ellipse cx="234" cy="306" rx="14" ry="12" fill="url(#thPad)" opacity=".9"/></g>' +
      '<ellipse cx="66" cy="306" rx="14" ry="12" fill="url(#thPad)" opacity=".9"/>' +
      '<path d="M150 206C140 196 120 194 122 206C120 218 140 216 150 206C160 216 180 218 178 206C180 194 160 196 150 206Z" fill="#fffaf4" stroke="#e8dccd" stroke-width="1.5"/><ellipse cx="150" cy="206" rx="6" ry="7" fill="#f4ece2" stroke="#e0d2c0"/>' +
      '<g filter="url(#thFur)"><circle cx="82" cy="78" r="34" fill="url(#thFurH)"/><circle cx="218" cy="78" r="34" fill="url(#thFurH)"/></g>' +
      '<circle cx="84" cy="82" r="19" fill="url(#thEar)"/><circle cx="216" cy="82" r="19" fill="url(#thEar)"/>' +
      '<g filter="url(#thFur)"><ellipse cx="150" cy="128" rx="82" ry="76" fill="url(#thFurH)"/></g>' +
      '<ellipse cx="108" cy="150" rx="18" ry="11" fill="url(#thBlush)"/><ellipse cx="192" cy="150" rx="18" ry="11" fill="url(#thBlush)"/>' +
      '<g filter="url(#thFur)"><ellipse cx="150" cy="156" rx="40" ry="31" fill="url(#thMuz)"/></g>' +
      '<path d="M136 140C136 132 164 132 164 140C164 150 156 156 150 158C144 156 136 150 136 140Z" fill="url(#thNose)"/><ellipse cx="144" cy="139" rx="5" ry="2.6" fill="#fff" opacity=".45"/>' +
      '<path d="M150 158V168M150 168C144 176 134 176 130 170M150 168C156 176 166 176 170 170" fill="none" stroke="#3a2219" stroke-width="2.6" stroke-linecap="round"/>' +
      '<g class="eyes"><circle cx="118" cy="118" r="10" fill="url(#thEye)"/><circle cx="182" cy="118" r="10" fill="url(#thEye)"/>' +
      '<circle cx="115" cy="114" r="3.2" fill="#fff" opacity=".9"/><circle cx="179" cy="114" r="3.2" fill="#fff" opacity=".9"/><circle cx="121" cy="122" r="1.4" fill="#fff" opacity=".6"/><circle cx="185" cy="122" r="1.4" fill="#fff" opacity=".6"/></g>' +
      '<g class="hat"><g transform="rotate(-6 150 52)"><ellipse cx="150" cy="70" rx="48" ry="10" fill="#b25e79"/><path d="M102 70V30H198V70Z" fill="url(#thHat)"/>' +
      '<rect x="102" y="56" width="96" height="10" fill="url(#thGold)"/><ellipse cx="150" cy="30" rx="48" ry="10" fill="#efb3c3"/><ellipse cx="150" cy="30" rx="48" ry="10" fill="none" stroke="url(#thGold)" stroke-width="2.5"/>' +
      '<ellipse cx="150" cy="70" rx="48" ry="10" fill="none" stroke="url(#thGold)" stroke-width="2.5"/></g></g></svg>';
  }

  /* ---------- զարդեր ---------- */
  // դրոշակներ (վարդագույն և սպիտակ-վանդակավոր եռանկյուններ՝ կախված կորի վրա)
  function bunting() {
    var s = '<svg class="bunt" viewBox="0 0 400 70" preserveAspectRatio="none" aria-hidden="true"><defs><pattern id="thGing" width="6" height="6" patternUnits="userSpaceOnUse"><rect width="6" height="6" fill="#fff"/>' +
      '<rect width="3" height="6" fill="#f1b9c8" opacity=".75"/><rect width="6" height="3" fill="#f1b9c8" opacity=".75"/></pattern></defs><path d="M-5 8Q200 52 405 8" fill="none" stroke="#c9a36a" stroke-width="1.4"/>';
    for (var i = 0; i < 14; i++) {
      var x0 = -6 + i * 30, xm = x0 + 15, y = function (xx) { var tt = (xx + 5) / 410; return 8 + 88 * tt * (1 - tt); }; // կորի բարձրությունը x կետում
      s += '<path d="M' + x0 + " " + y(x0).toFixed(1) + "L" + (x0 + 28) + " " + y(x0 + 28).toFixed(1) + "L" + xm + " " + (y(xm) + 26).toFixed(1) + 'Z" fill="' + (i % 2 ? "url(#thGing)" : "#e8a0b4") + '"' + (i % 2 ? ' stroke="#ecbccb" stroke-width=".8"' : "") + "/>";
    }
    return s + "</svg>";
  }
  // փուչիկ (դիրքը՝ %-ով կոնտեյների նկատմամբ)
  function bl(c, l, tp, w, d) { return '<i class="bl ' + c + '" style="left:' + l + "%;top:" + tp + "%;width:" + w + "%;--d:" + (d || 0) + 's"></i>'; }
  // փուչիկների կամարը դռան շուրջ
  function arch() {
    var B = [["c", 2, 62, 15], ["p", 6, 50, 13], ["g", 1, 40, 11], ["c", 8, 30, 15], ["p", 18, 20, 12], ["g", 24, 10, 14], ["c", 36, 4, 12], ["p", 45, 1, 14], ["g", 56, 4, 11],
      ["c", 64, 9, 15], ["p", 74, 19, 12], ["g", 78, 30, 14], ["c", 86, 40, 11], ["p", 82, 50, 14], ["g", 88, 61, 12], ["p", -4, 72, 16], ["g", 90, 72, 14], ["c", 30, 12, 9], ["p", 60, 12, 8]];
    return B.map(function (b, i) { return bl(b[0], b[1], b[2], b[3], (i % 7) * .07); }).join("");
  }
  function door() {
    return '<div class="door"><div class="dlight"></div><div class="leaf l"><i></i><i></i><b></b></div><div class="leaf r"><i></i><i></i><b></b></div>' +
      '<div class="sign">' + esc(x("sign")) + "</div></div>";
  }
  function floor() { return '<div class="floor"></div>'; }

  function envelope() {
    var n = K.names();
    return '<div class="env" id="env" role="button" aria-label="' + esc(x("hint")) + '">' + bunting() +
      '<div class="top"><div class="caps">' + esc(x("top")) + '</div><div class="nm">' + esc(n[0] || "") + "</div></div>" +
      floor() + '<div class="stage"><div class="arch">' + door() + arch() + "</div>" + bear("eb") + "</div>" +
      (K.PREVIEW ? "" : '<div class="hint">' + esc(x("hint")) + "</div>") + "</div>";
  }

  /* ---------- բաժիններ ---------- */
  function hero() {
    var n = K.names(), d = K.date;
    return '<section class="hero">' + bunting() + '<div class="wrap"><div class="caps rv">' + esc(x("inv")) + '</div><h1 class="nm rv d1">' + esc(n[0] || "") + "</h1>" +
      (C.age ? '<div class="key rv d1"><b>' + esc(C.age) + "</b><span>" + esc(years(C.age)) + "</span></div>" : "") +
      '<div class="dt rv d2">' + d.getDate() + " " + esc(u("monthsGen")[d.getMonth()]) + " · " + pad(d.getHours()) + ":" + pad(d.getMinutes()) + "</div>" +
      (C.photo ? '<div class="frame rv d2"><div class="ph" style="background-image:url(\'' + esc(C.photo) + '\')"></div></div>' : "") +
      '<div class="hb rv d3">' + bl("p", 2, 30, 20) + bl("g", 14, 8, 15) + bl("c", 76, 24, 20) + bl("g", 84, 0, 14) + bear("hbear") + "</div></div>" + floor() + "</section>";
  }
  function story() {
    return '<section class="gin"><div class="wrap"><h2 class="h2 rv">' + esc(x("our")) + '</h2><p class="p rv">' + esc(t(C.text)) + "</p></div></section>";
  }
  function countdown() {
    return '<section><div class="wrap"><div class="caps rv">' + esc(x("left")) + '</div><div class="cdn rv" data-cd>' + ["days", "hours", "minutes", "seconds"].map(function (k) {
      return '<div><b data-k="' + k + '">00</b><span>' + esc(u(k)) + "</span></div>";
    }).join("") + "</div></div></section>";
  }
  // ծրագրի պատկերակներ՝ տորթ (եթե վերնագրում տորթ/հյուրասիրություն է), եկեղեցի (կնունք), մնացածը՝ փուչիկներ
  function icon(e) {
    var s = String(t(e.title) || "") + " " + String(t(e.place) || "");
    var a = /տորթ|հյուրասիր|սեղան|торт|угощ|стол|cake|dinner/i.test(s) ?
      '<path d="M32 6c3 4 3 7 0 9-3-2-3-5 0-9zM30 15h4v11h-4z"/><path d="M14 26h36v10H14zM8 36h48v18H8z"/><path d="M14 31c4 3 6-2 9 0s6-2 9 0 6-2 9 0 6-2 9 0M8 44c5 4 7-3 12 0s7-3 12 0 7-3 12 0 7-3 12 0"/><path d="M4 58h56"/>' :
      /եկեղեց|վանք|մկրտ|церк|храм|church/i.test(s) ?
      '<path d="M32 4v10M27 8h10"/><path d="M22 28c0-8 4-13 10-14 6 1 10 6 10 14z"/><path d="M20 28h24v6H20zM14 58V36l6-2M50 58V36l-6-2M10 58h44M20 34v24M44 34v24"/><path d="M28 58v-9c0-3 2-5 4-5s4 2 4 5v9"/>' :
      '<ellipse cx="22" cy="20" rx="11" ry="13"/><ellipse cx="42" cy="16" rx="11" ry="13"/><ellipse cx="33" cy="32" rx="10" ry="12"/><path d="M20 33l2 3M44 29l-2 3M33 44l-1 3"/><path d="M22 36C24 46 28 52 30 60M42 32C40 44 36 52 32 60M32 47v13"/><path d="M17 15c1-3 3-5 6-6M37 11c1-3 3-4 6-5"/>';
    return '<svg class="evi" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + a + "</svg>";
  }
  function program() {
    return '<section class="pk"><div class="wrap"><h2 class="h2 rv">' + esc(x("program")) + "</h2>" + (C.events || []).map(function (e) {
      return '<div class="ev rv"><div class="pic ico">' + icon(e) + '</div><div class="tm">' + esc(e.time) + '</div><div class="t">' + esc(t(e.title)) + "</div>" +
        (e.place ? '<div class="n">' + esc(t(e.place)) + "</div>" : "") + (e.address ? '<div class="a">' + esc(t(e.address)) + "</div>" : "") +
        (e.map ? '<a class="btn" href="' + esc(e.map) + '" target="_blank" rel="noopener">' + esc(u("map")) + "</a>" : "") + "</div>";
    }).join("") + "</div></section>";
  }
  function dress() {
    if (!C.dresscode) return "";
    return '<section><div class="wrap"><h2 class="h2 rv">' + esc(x("dress")) + '</h2><p class="rv">' + esc(t(C.dresscode.text)) + '</p><div class="dots rv">' +
      (C.dresscode.colors || []).map(function (c) { return '<i style="background:' + esc(c) + '"></i>'; }).join("") + "</div></div></section>";
  }
  function rsvp() {
    if (!C.rsvp) return "";
    return '<section class="gin"><div class="wrap"><h2 class="h2 rv">' + esc(x("rsvp")) + '</h2><p class="rv">' + esc(x("rsvpLead")) + " " + esc(K.deadline()) + "</p>" +
      '<form class="rs rv" id="rf"><label class="radio"><input type="radio" name="attend" value="yes" checked>' + esc(u("yes")) + "</label>" +
      '<label class="radio"><input type="radio" name="attend" value="no">' + esc(u("no")) + "</label>" +
      '<div class="fl"><label for="rn">' + esc(u("name")) + '</label><input id="rn" name="name" required autocomplete="name"></div>' +
      '<div class="fl"><label for="rg">' + esc(u("guests")) + '</label><select id="rg" name="guests">' + [1, 2, 3, 4, 5, 6].map(function (i) { return "<option>" + i + "</option>"; }).join("") + "</select></div>" +
      '<button class="btn fill" type="submit">' + esc(u("send")) + "</button></form></div></section>";
  }
  function fin() {
    return '<section class="fin">' + bunting() + '<div class="wrap"><div class="caps rv">' + esc(x("fin")) + '</div><div class="nm rv">' + esc(K.names()[0] || "") + "</div>" +
      '<div class="fb rv">' + bl("g", 0, 20, 18) + bl("p", 80, 10, 20) + bear("fbear") + "</div></div>" + floor() + "</section>" +
      '<div class="made"><a href="https://hravirir.am" target="_blank" rel="noopener">HRAVIRIR.AM</a></div>';
  }

  var opened = false;
  function render() {
    document.documentElement.lang = K.lang;
    document.title = x("top") + " · " + (K.names()[0] || "");
    document.getElementById("app").innerHTML = DEFS + (opened ? "" : envelope()) + "<main>" + hero() + story() + countdown() + program() + dress() + rsvp() + fin() + "</main>" + (opened ? K.chrome() : "");
    document.body.classList.toggle("locked", !opened);
    if (!opened) { var e = document.getElementById("env"); if (e && !K.PREVIEW) e.onclick = open; } else K.reveal();
    K.countdown(true); K.rsvp(document.getElementById("rf")); K.bindChrome(render);
  }
  // արջուկը բարձրացնում է գլխարկը → դուռը բացվում է, ներսից լույս → փուչիկները թռչում են → «մտնում ենք» դռնով
  function open() {
    var env = document.getElementById("env"); if (env.dataset.busy) return; env.dataset.busy = "1";
    K.music.play();
    env.classList.add("s1");
    setTimeout(function () { env.classList.add("s2"); }, 700);
    setTimeout(function () { env.classList.add("s3"); }, 2300);
    setTimeout(function () {
      opened = true; document.body.classList.remove("locked");
      document.getElementById("app").insertAdjacentHTML("beforeend", K.chrome()); K.bindChrome(render); K.reveal();
    }, 3300);
    setTimeout(function () { env.remove(); }, 4000);
  }
  render();
})();
