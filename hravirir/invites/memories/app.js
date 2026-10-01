/* «Հուշեր» — սև-սպիտակ լուսանկարներ պատառոտված թղթի եզրերով, մեծ հետհաշվարկ, ծրագիր՝ գծային պատկերակներով, Instagram և «Ձեր երգը». բացումը՝ սպիտակ դաջված ծրար */
(function () {
  "use strict";
  var K = window.K, C = K.C, esc = K.esc, t = K.t, u = K.u, P = window.P;
  P.texts({
    hy: { hint: "Սեղմեք կնիքին", wed: "Ամուսնանում ենք", left: "Մնացել է", wait: "Սպասում ենք Ձեզ\nմեր հարսանիքին", insta: "Instagram", instaT: "Ոչինչ բաց չթողնելու համար նշեք մեզ Ձեր լուսանկարներում և պատմություններում այս հեշթեգով։", instaB: "Բացել Instagram-ը",
      song: "Ձեր երգը", songT: "Տոնը դուք եք ստեղծում։ Ասեք, թե որ երգը պետք է անպայման հնչի, և մենք կավելացնենք այն երեկոյի ցանկում։", songL: "Երգի առաջարկ (ըստ ցանկության)", songB: "Առաջարկել երգ" },
    ru: { hint: "Нажмите на печать", wed: "Мы женимся", left: "Осталось", wait: "Ждём вас\nна нашей свадьбе", insta: "Instagram", instaT: "Чтобы ничего не потерять, отмечайте нас на фото и в сторис с этим хештегом.", instaB: "Открыть Instagram",
      song: "Ваша песня", songT: "Праздник создаёте вы. Подскажите, какая песня обязательно должна прозвучать, и мы добавим её в плейлист вечера.", songL: "Ваша песня (по желанию)", songB: "Предложить песню" },
    en: { hint: "Tap the seal", wed: "We are getting married", left: "Counting down", wait: "We look forward\nto seeing you at our wedding", insta: "Instagram", instaT: "Tag us in your photos and stories with this hashtag so we do not miss a thing.", instaB: "Open Instagram",
      song: "Your song", songT: "You make the party. Tell us which song must be played and we will add it to the playlist.", songL: "Song suggestion (optional)", songB: "Suggest a song" }
  });
  // գծային պատկերակներ (currentColor)
  var IC = {
    church: '<path d="M24 4v8M20 8h8M14 22l10-8 10 8M16 21v21h16V21M10 42h28M21 42v-8a3 3 0 0 1 6 0v8M24 26v3"/>',
    rings: '<circle cx="19" cy="28" r="10"/><circle cx="30" cy="28" r="10"/><path d="M27 10l3-4 3 4-3 4z"/>',
    glasses: '<path d="M14 6h8l-1 11a3 3 0 0 1-6 0zM15.5 12h6M18 20v16M13 36h10M26 6h8l1 11a3 3 0 0 1-6 0zM26.5 12h6M32 20v16M27 36h10M24 5l-1-3M21 5l-3-2M27 5l3-2"/>',
    plate: '<circle cx="24" cy="25" r="11"/><circle cx="24" cy="25" r="7"/><path d="M8 12v8a2 2 0 0 0 4 0v-8M10 20v18M40 12c-3 2-3 8 0 10v16"/>',
    disco: '<circle cx="24" cy="27" r="12"/><path d="M12 27h24M14 21h20M14 33h20M24 15c-5 6-5 18 0 24M24 15c5 6 5 18 0 24M24 9v6M34 6l1.5 3 3 1.5-3 1.5-1.5 3-1.5-3-3-1.5 3-1.5z"/>',
    home: '<path d="M8 22L24 9l16 13M12 19v21h24V19M20 40V29h8v11"/>',
    camera: '<rect x="8" y="12" width="20" height="24" rx="2" transform="rotate(-8 18 24)"/><rect x="20" y="12" width="20" height="24" rx="2" transform="rotate(8 30 24)"/><path d="M27 22l-3 3-2-2"/>',
    music: '<path d="M18 34V12l18-4v22"/><circle cx="14" cy="34" r="4"/><circle cx="32" cy="30" r="4"/><path d="M18 18l18-4"/>'
  };
  function ic(k) { return '<svg class="ic rv" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (IC[k] || IC.glasses) + "</svg>"; }
  function icFor(e) {
    var s = (t(e.title) || "") + " " + ((e.title && e.title.ru) || "");
    return /Պսակ|Венч|Ceremony/i.test(s) ? "church" : /տուն|Дом|home/i.test(s) ? "home" : /Ընթրիք|ужин|dinner/i.test(s) ? "plate" : /Պար|Танц|dance|party/i.test(s) ? "disco" : /Նշան|Помолв/i.test(s) ? "rings" : "glasses";
  }
  // պատառոտված թղթի եզր
  function torn(pos, seed) {
    var s = seed || 3, pts = [], x = 0;
    function r() { s = (s * 16807) % 2147483647; return s / 2147483647; }
    while (x < 100) { pts.push([x, 6 + r() * 12]); x += 1.5 + r() * 4; }
    pts.push([100, 6 + r() * 10]);
    var d = "M0 30L" + pts.map(function (p) { return p[0].toFixed(1) + " " + p[1].toFixed(1); }).join("L") + "L100 30Z";
    var d2 = "M0 30L" + pts.map(function (p, i) { return p[0].toFixed(1) + " " + (p[1] + 2.5 + (i % 3)).toFixed(1); }).join("L") + "L100 30Z";
    return '<svg class="torn ' + pos + '" viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden="true"><path d="' + d + '" fill="#d6d3cd"/><path d="' + d2 + '" fill="var(--bg)"/></svg>';
  }
  function photo(src, cls, seed) { return src ? '<div class="tp ' + (cls || "") + '"><div class="im" style="background-image:url(\'' + esc(src) + '\')"></div>' + torn("top", seed) + torn("bot", seed + 7) + "</div>" : ""; }
  function env() { var n = K.names(); return P.wenv({ letter: (n[0] || "").charAt(0), hint: P.x("hint"), top: esc(n.join(" & ")) }); }
  function main() {
    var n = K.names(), d = K.date, g = C.gallery || [];
    var dateRow = '<div class="drow rv"><span>' + esc(P.x("wdl")[d.getDay()]) + "</span><b>" + d.getDate() + "</b><span>" + esc(u("monthsGen")[d.getMonth()]) + "</span></div>";
    var venues = (C.events || []).filter(function (e) { return e.place; }).map(function (e) {
      return '<div class="vn">' + ic(icFor(e)) + '<h3 class="rv">' + esc(t(e.title)) + '</h3><p class="rv">' + esc(e.time) + " · " + esc(t(e.place)) + "<br>" + esc(t(e.address)) + "</p>" +
        (e.map ? '<a class="pill rv" href="' + esc(e.map) + '" target="_blank" rel="noopener">' + esc(P.x("how")) + "</a>" : "") + "</div>";
    }).join("");
    var plan = (C.plan || C.events || []).map(function (e) { return '<div class="pl">' + ic(e.icon || icFor(e)) + '<b class="rv">' + esc(e.time) + '</b><span class="rv">' + esc(t(e.title)) + "</span></div>"; }).join("");
    var tag = C.hashtag || "#" + n.join("").replace(/\s+/g, "");
    var rs = P.rsvp().replace('<button class="btn fill"', '<div class="fl"><label for="rsong">' + esc(P.x("songL")) + '</label><input id="rsong" name="note"></div><button class="btn fill"');
    return '<section class="hero"><div class="im"' + (C.photo ? ' style="background-image:url(\'' + esc(C.photo) + '\')"' : "") + '></div><div class="hc"><div class="caps rv">' + esc(P.x("wed")) + '</div><h1 class="nm rv d1">' + esc(n[0] || "") + ' <span class="amp">&amp;</span> ' + esc(n[1] || "") + '</h1><div class="dt rv d2">' + P.dots(".") + "</div></div>" + torn("bot", 11) + "</section>" +
      P.sec("cd", '<div class="caps rv">' + esc(P.x("left")) + "</div>" + P.cd("big") + '<p class="p wt rv">' + esc(P.x("wait")).replace(/\n/g, "<br>") + "</p>" + dateRow) +
      P.sec("vs", venues) +
      photo(g[0], "tall", 21) +
      P.sec("plan", '<h2 class="h2 rv">' + esc(P.x("program")) + "</h2>" + plan) +
      photo(g[1], "", 31) +
      P.sec("ig", ic("camera") + '<h3 class="rv">' + esc(P.x("insta")) + '</h3><p class="p rv">' + esc(P.x("instaT")) + '</p><div class="tag rv">' + esc(tag) + "</div>" +
        (C.instagram ? '<a class="pill rv" href="https://instagram.com/' + esc(String(C.instagram).replace("@", "")) + '" target="_blank" rel="noopener">' + esc(P.x("instaB")) + "</a>" : "")) +
      P.sec("song", ic("music") + '<h3 class="rv">' + esc(P.x("song")) + '</h3><p class="p rv">' + esc(P.x("songT")) + '</p><a class="pill rv" href="#rf">' + esc(P.x("songB")) + "</a>") +
      photo(g[2], "", 41) +
      P.sec("", P.dress()) +
      P.sec("rsv", rs) +
      P.sec("fin", '<div class="caps rv">' + esc(P.x("fin")) + '</div><div class="fnm rv">' + esc(n.join(" & ")) + "</div>") + P.made();
  }
  P.run({ env: env, main: main, steps: P.wenvSteps, done: P.wenvDone });
})();
