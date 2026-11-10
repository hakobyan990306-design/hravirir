/* Vivaldi Hall · Ամանորյա գալա ընթրիք 2027 — 3 տարբերակի ընդհանուր բովանդակությունը և վարքը.
   Պատվեր 11.11.2026 (Instagram՝ vivaldihall, հեռ.՝ 091902777), միայն հայերեն, 10.000 ֏ = 8.000 + 24 ժամում 2.000.
   Ամեն տարբերակ (1/, 2/, 3/) ունի իր բացման էկրանը և ոճը, իսկ այստեղի G.page()-ը կառուցում է էջի բաժինները։
   Արտիստների լուսանկարները՝ tatev.jpg (կին երգչուհի), ernest.jpg (տղամարդ երգիչ). */
(function () {
  "use strict";
  var D = {
    date: "2026-12-31T22:00",
    midnight: "2027-01-01T00:00",
    lead: "Դեկտեմբերի 31-ին Վիվալդի հոլը սիրով հրավիրում է Ձեզ տարվա ամենաշքեղ, ամենաջերմ, ամենաընտանեկան ու ամենակախարդական տոնական երեկոյին։",
    fin: "Դիմավորե՛ք 2027 թվականը այնտեղ, որտեղ Նոր տարին վերածվում է անմոռանալի հեքիաթի։",
    wait: [
      ["mic", "Կենդանի երաժշտություն և տպավորիչ շոու-ծրագիր"],
      ["dish", "Շքեղ ամանորյա հյուրասիրություն"],
      ["gift", "Հեքիաթային անակնկալներ ու նվերներ"],
      ["glass", "Կեսգիշերի կախարդական դիմավորում"],
      ["note", "Պարային խելահեղ ռիթմեր մինչև ուշ գիշեր"],
      ["fire", "Հրավառությու՜ն"]
    ],
    artists: [
      { name: "Տաթև Ասատրյան", role: "Երգչուհի", photo: "../tatev.jpg" },
      { name: "Էռնեստ Հովհաննիսյան", role: "Երգիչ", photo: "../ernest.jpg" },
      { name: "Վիվալդի բենդ", role: "Կենդանի երաժշտություն", photo: "../hall2.jpg", band: true }
    ],
    halls: ["../hall1.jpg", "../hall2.jpg", "../hall3.jpg", "../hall4.jpg", "../hall5.jpg"],
    menu: [
      ["Սառը նախուտեստներ", ["Ձկան տեսականի", "Մսի տեսականի", "Պանրի տեսականի", "Բանջարեղենի ափսե", "Ձիթապտուղ, կիտրոն", "Քամած մածուն", "Թթվի տեսականի"]],
      ["Աղցաններ", ["Ասիական", "Շեֆ", "Գուրման"]],
      ["Տաք ուտեստներ", ["Խորովածի սեթ", "Գրիլ բանջարեղեն", "Պլեճ", "Ստերլյադ, բրինձ, անանասի խորոված", "Թփով տոլմա"]],
      ["", ["Հացի զամբյուղ", "Մրգի զամբյուղ"]],
      ["Ըմպելիքներ", ["Օղի՝ Mamont", "Գինի՝ Երևան", "Փրփրուն գինի", "Թեյ, սուրճ", "Ջրեղեն, կոլա, կոմպոտ"]]
    ],
    phones: ["+374 91 902 777", "+374 91 904 777"],
    address: "Երևան, Ազատության պողոտա 24/44",
    map: "https://yandex.ru/navi/org/vivaldi_holl/196505711765?si=tqy1fhxrx331mah0tfrg33132w",
    insta: "https://instagram.com/vivaldihall"
  };

  // ոսկե գծային պատկերակներ (stroke = currentColor)
  var IC = {
    mic: '<rect x="9" y="2.5" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21.5M8.5 21.5h7"/>',
    dish: '<path d="M3 16.5h18M4.5 16.5a7.5 7.5 0 0 1 15 0M12 7.5V6M10.5 6h3M2.5 19.5h19"/>',
    gift: '<rect x="3.5" y="9" width="17" height="4" rx=".6"/><path d="M5 13v8h14v-8M12 9v12M12 9c-1.5-3-5.5-4.2-6-1.8C5.6 9 9.5 9 12 9zm0 0c1.5-3 5.5-4.2 6-1.8C18.4 9 14.5 9 12 9z"/>',
    glass: '<path d="M6 2.5h5l-.4 6a2.1 2.1 0 0 1-4.2 0zM13 2.5h5l-.4 6a2.1 2.1 0 0 1-4.2 0zM8.5 10.6v8.4M15.5 10.6v8.4M6 19.5h5M13 19.5h5"/><path d="M11.5 1l1-1M12 3.5l1.5-.5" opacity=".7"/>',
    note: '<path d="M9 18.5V5l11-2v13"/><circle cx="6.5" cy="18.5" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/><path d="M9 9l11-2"/>',
    fire: '<path d="M12 12V2M12 12l7-6M12 12l-7-6M12 12l9 1M12 12l-9 1M12 12l6 7M12 12l-6 7M12 12v9"/><circle cx="12" cy="12" r="1.3"/>',
    tel: '<path d="M5 3.5h3.5l1.8 4.6-2.3 1.4a11 11 0 0 0 6.5 6.5l1.4-2.3 4.6 1.8V19a1.8 1.8 0 0 1-1.9 1.8C10.4 20.3 3.7 13.6 3.2 5.4A1.8 1.8 0 0 1 5 3.5z"/>',
    pin: '<path d="M12 21.5s7-6.3 7-12a7 7 0 0 0-14 0c0 5.7 7 12 7 12z"/><circle cx="12" cy="9.5" r="2.5"/>',
    ig: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.3" cy="6.7" r="1" fill="currentColor"/>'
  };
  function ic(k) { return '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + IC[k] + "</svg>"; }
  var orn = '<div class="orn rv" aria-hidden="true"><i></i><svg viewBox="0 0 24 24"><path d="M12 2l2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2z" fill="currentColor"/></svg><i></i></div>';
  function pad(n) { return (n < 10 ? "0" : "") + n; }

  function page(o) {
    o = o || {};
    var h = "";
    // գլխավոր
    h += '<section class="hero" id="hero">' + (o.heroBg || "") +
      '<div class="in"><img class="logo" src="../logo.png" alt="Vivaldi Hall">' +
      '<div class="eye">NEW YEAR GALA</div><h1 class="ny"><span>ՆՈՐ ՏԱՐԻ</span><b>2027</b></h1>' +
      '<div class="scr-t">Ամանորյա գալա ընթրիք</div>' +
      '<div class="when"><span>31 ԴԵԿՏԵՄԲԵՐԻ</span><i></i><span>22:00</span></div></div>' +
      '<a class="scroll" href="#lead"><span>ԹԵՐԹԵՔ ՆԵՐՔԵՎ</span><i></i></a></section>';
    // հրավեր
    h += '<section class="lead" id="lead"><div class="w">' + orn + '<p class="big rv">' + D.lead + "</p></div></section>";
    // սպասվում է
    h += '<section class="wait"><div class="w"><div class="eye rv">VIVALDI HALL</div><h2 class="h2 rv">Ձեզ սպասվում է</h2><div class="list">' +
      D.wait.map(function (x, i) { return '<div class="it rv" style="--d:' + (i * 80) + 'ms">' + ic(x[0]) + "<p>" + x[1] + "</p></div>"; }).join("") + "</div></div></section>";
    // շոու
    h += '<section class="show"><div class="w"><div class="eye rv">LIVE SHOW</div><h2 class="h2 rv">Շոու-ծրագիր</h2><div class="art">' +
      D.artists.map(function (a) {
        return '<figure class="a rv' + (a.band ? " band" : "") + '"><div class="ph"><img src="' + a.photo + '" alt="' + a.name + '" loading="lazy">' + (a.band ? '<img class="bl" src="../logo.png" alt="">' : "") + "</div>" +
          '<figcaption><b>' + a.name + "</b><small>" + a.role + "</small></figcaption></figure>";
      }).join("") + "</div></div></section>";
    // դահլիճ
    h += '<section class="hall"><div class="w"><div class="eye rv">OUR HALL</div><h2 class="h2 rv">Տոնական դահլիճը</h2></div>' +
      '<div class="car rv" id="car">' + D.halls.map(function (p) { return '<div class="sl"><img src="' + p + '" alt="" loading="lazy"></div>'; }).join("") + "</div>" +
      '<div class="dots" id="dots">' + D.halls.map(function (_, i) { return "<i" + (i ? "" : ' class="on"') + "></i>"; }).join("") + "</div></section>";
    // մենյու
    h += '<section class="menu"><div class="w"><div class="card rv"><div class="eye">MENU</div><h2 class="h2">Ամանորյա մենյու</h2>' +
      D.menu.map(function (g) {
        return '<div class="grp">' + (g[0] ? '<div class="gt"><i></i><span>' + g[0] + "</span><i></i></div>" : '<div class="gt gt0"><i></i></div>') + "<ul>" + g[1].map(function (x) { return "<li>" + x + "</li>"; }).join("") + "</ul></div>";
      }).join("") + "</div></div></section>";
    // հետհաշվարկ
    h += '<section class="cd"><div class="w"><div class="eye rv">COUNTDOWN</div><h2 class="h2 rv">Մինչև 2027-ը մնաց</h2><div class="cdn rv" id="cdn">' +
      [["d", "օր"], ["h", "ժամ"], ["m", "րոպե"], ["s", "վայրկյան"]].map(function (x) { return '<div><b data-k="' + x[0] + '">00</b><span>' + x[1] + "</span></div>"; }).join("") + "</div></div></section>";
    // ամրագրում
    h += '<section class="book"><div class="w"><div class="card rv"><div class="eye">RESERVATION</div><h2 class="h2">Ամրագրում</h2><p class="p">Ամրագրումների համար զանգահարե՛ք՝</p>' +
      D.phones.map(function (p) { return '<a class="btn" href="tel:' + p.replace(/\s/g, "") + '">' + ic("tel") + "<span>" + p + "</span></a>"; }).join("") +
      '<div class="addr">' + ic("pin") + "<span>" + D.address + "</span></div>" +
      '<a class="btn ghost" href="' + D.map + '" target="_blank" rel="noopener">Ինչպես հասնել</a>' +
      '<a class="ig" href="' + D.insta + '" target="_blank" rel="noopener">' + ic("ig") + "<span>@vivaldihall</span></a></div></div></section>";
    // ավարտ
    h += '<section class="fin"><div class="w">' + orn + '<p class="big rv">' + D.fin + '</p><img class="logo rv" src="../logo.png" alt="Vivaldi Hall"></div></section>' +
      '<div class="made"><a href="https://hravirir.am" target="_blank" rel="noopener">HRAVIRIR.AM</a></div>';
    return h;
  }

  // բաժինները հայտնվում են թերթելիս
  function reveal() {
    var els = document.querySelectorAll(".rv");
    if (!("IntersectionObserver" in window)) { els.forEach(function (e) { e.classList.add("in"); }); return; }
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }); }, { rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (e) { io.observe(e); });
  }
  // հետհաշվարկ մինչև 2027-ի կեսգիշեր (Երևանի ժամով)
  function countdown() {
    var end = Date.parse(D.midnight + ":00+04:00"), box = document.getElementById("cdn");
    if (!box) return;
    function tick() {
      var s = Math.max(0, Math.floor((end - Date.now()) / 1000)), v = { d: Math.floor(s / 86400), h: Math.floor(s / 3600) % 24, m: Math.floor(s / 60) % 60, s: s % 60 };
      box.querySelectorAll("b").forEach(function (b) { b.textContent = pad(v[b.dataset.k]); });
    }
    tick(); setInterval(tick, 1000);
  }
  // դահլիճի սահիչ՝ կետերով
  function carousel() {
    var c = document.getElementById("car"), d = document.querySelectorAll("#dots i");
    if (!c) return;
    c.addEventListener("scroll", function () {
      var w = c.firstElementChild.offsetWidth, i = Math.round(c.scrollLeft / (w + 14));
      d.forEach(function (x, k) { x.classList.toggle("on", k === i); });
    }, { passive: true });
  }
  // ոսկե փայլեր / ձյուն ֆոնի վրա (canvas)
  function sparkle(cv, o) {
    o = o || {};
    if (!cv || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var g = cv.getContext("2d"), W, H, P = [], n = o.n || 70, col = o.colors || ["255,221,150", "255,240,205", "232,190,110"];
    function size() { var r = window.devicePixelRatio || 1; W = cv.clientWidth; H = cv.clientHeight; cv.width = W * r; cv.height = H * r; g.setTransform(r, 0, 0, r, 0, 0); }
    function mk(y) { return { x: Math.random() * W, y: y == null ? Math.random() * H : y, r: .6 + Math.random() * (o.max || 2.2), v: .15 + Math.random() * .55, w: Math.random() * 6.28, c: col[Math.random() * col.length | 0], a: .35 + Math.random() * .6 }; }
    size(); window.addEventListener("resize", size);
    for (var i = 0; i < n; i++) P.push(mk());
    (function f(t) {
      g.clearRect(0, 0, W, H);
      P.forEach(function (p, i) {
        p.y += p.v; p.w += .02; p.x += Math.sin(p.w) * .3;
        if (p.y > H + 5) P[i] = mk(-5);
        var tw = .55 + .45 * Math.sin(t / 400 + p.w * 3);
        g.beginPath(); g.fillStyle = "rgba(" + p.c + "," + (p.a * tw).toFixed(3) + ")"; g.shadowColor = "rgba(" + p.c + ",.9)"; g.shadowBlur = p.r * 4;
        g.arc(p.x, p.y, p.r, 0, 6.283); g.fill();
      });
      requestAnimationFrame(f);
    })(0);
  }
  // ոսկե կոնֆետի/հրավառություն՝ բացման պահին
  function burst(cv, x, y, o) {
    o = o || {};
    if (!cv || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var g = cv.getContext("2d"), r = window.devicePixelRatio || 1, W = cv.clientWidth, H = cv.clientHeight, P = [], t0 = performance.now();
    cv.width = W * r; cv.height = H * r; g.setTransform(r, 0, 0, r, 0, 0);
    var col = o.colors || ["#ffe3a3", "#f3c56b", "#fff4d6", "#c8913a", "#b3162f"];
    (o.points || [[x, y]]).forEach(function (pt, k) {
      for (var i = 0; i < (o.n || 90); i++) {
        var a = Math.random() * 6.283, s = 2 + Math.random() * (o.speed || 7);
        P.push({ x: pt[0], y: pt[1], vx: Math.cos(a) * s, vy: Math.sin(a) * s - (o.lift || 1.5), c: col[Math.random() * col.length | 0], r: 1 + Math.random() * 2.4, d: (pt[2] || 0) });
      }
    });
    (function f(t) {
      var e = t - t0; g.clearRect(0, 0, W, H); var alive = false;
      P.forEach(function (p) {
        if (e < p.d) { alive = true; return; }
        p.vx *= .985; p.vy = p.vy * .985 + .07; p.x += p.vx; p.y += p.vy;
        var a = Math.max(0, 1 - (e - p.d) / (o.life || 2200)); if (a > 0) alive = true;
        g.globalAlpha = a; g.fillStyle = p.c; g.shadowColor = p.c; g.shadowBlur = 8; g.beginPath(); g.arc(p.x, p.y, p.r, 0, 6.283); g.fill();
      });
      g.globalAlpha = 1;
      if (alive) requestAnimationFrame(f); else g.clearRect(0, 0, W, H);
    })(t0);
  }

  window.G = { D: D, page: page, reveal: reveal, countdown: countdown, carousel: carousel, sparkle: sparkle, burst: burst,
    // բացման էկրանից հետո՝ էջը միացնել
    start: function () { document.body.classList.remove("locked"); reveal(); countdown(); carousel(); } };
})();
