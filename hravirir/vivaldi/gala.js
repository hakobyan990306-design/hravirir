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
      ["ticket", "Մեծ խաղարկություն"],   // հաճախորդի խնդրանքով, 12.11.2026
      ["glass", "Կեսգիշերի կախարդական դիմավորում"],
      ["note", "Պարային խելահեղ ռիթմեր մինչև ուշ գիշեր"],
      ["fire", "Հրավառությու՜ն"]
    ],
    artists: [
      { name: "Տաթև Ասատրյան", role: "Երգչուհի", photo: "/vivaldi/tatev.jpg" },
      { name: "Էռնեստ Հովհաննիսյան", role: "Երգիչ", photo: "/vivaldi/ernest.jpg" },
      { name: "Վիվալդի բենդ", role: "Կենդանի երաժշտություն", photo: "/vivaldi/hall2.jpg", band: true }
    ],
    halls: ["/vivaldi/hall1.jpg", "/vivaldi/hall2.jpg", "/vivaldi/hall3.jpg", "/vivaldi/hall4.jpg", "/vivaldi/hall5.jpg"],
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
    ticket: '<path d="M3 7.5A1.5 1.5 0 0 1 4.5 6h15A1.5 1.5 0 0 1 21 7.5v2.2a2.3 2.3 0 0 0 0 4.6v2.2a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 16.5v-2.2a2.3 2.3 0 0 0 0-4.6z"/><path d="M15 6v12" stroke-dasharray="1.6 1.8"/><path d="M9 9.3l.8 1.6 1.8.3-1.3 1.3.3 1.8-1.6-.9-1.6.9.3-1.8-1.3-1.3 1.8-.3z"/>',
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
      '<div class="in"><img class="logo" src="/vivaldi/logo.png" alt="Vivaldi Hall">' +
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
        return '<figure class="a rv' + (a.band ? " band" : "") + '"><div class="ph"><img src="' + a.photo + '" alt="' + a.name + '" loading="lazy">' + (a.band ? '<img class="bl" src="/vivaldi/logo.png" alt="">' : "") + "</div>" +
          '<figcaption><b>' + a.name + "</b><small>" + a.role + "</small></figcaption></figure>";
      }).join("") + "</div></div></section>";
    // դահլիճ (o.noHall՝ առանց այս բաժնի. վերջնական տարբերակում հաճախորդը խնդրեց հանել)
    if (!o.noHall) h += '<section class="hall"><div class="w"><div class="eye rv">OUR HALL</div><h2 class="h2 rv">Տոնական դահլիճը</h2></div>' +
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
    h += '<section class="fin"><div class="w">' + orn + '<p class="big rv">' + D.fin + '</p><img class="logo rv" src="/vivaldi/logo.png" alt="Vivaldi Hall"></div></section>' +
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

  // «Jingle Bells» (Ջ. Փիերփոնթ, 1857, հանրային սեփականություն)՝ նվագում է հենց էջը Web Audio-ով.
  // ցելեստա (մեղեդի), բաս, ակորդներ և սահնակի զանգակներ, ֆայլ չի պահանջվում
  var music = (function () {
    var ac, master, on = false, timer, next = 0, idx = 0, SEQ = [];
    var BPM = 132, Q = 60 / BPM;
    function f(n) { var m = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }, s = n.length > 2 ? 1 : 0, o = +n[n.length - 1]; return 440 * Math.pow(2, (m[n[0]] + s + (o - 4) * 12 - 9) / 12); }
    // մեղեդի. [նոտա, տևողություն քառորդներով], "-"՝ դադար
    var verse = "D4 1,B4 1,A4 1,G4 1,D4 3,D4 .5,D4 .5,D4 1,B4 1,A4 1,G4 1,E4 4,E4 1,C5 1,B4 1,A4 1,F#4 4,D5 1,D5 1,C5 1,A4 1,B4 4," +
      "D4 1,B4 1,A4 1,G4 1,D4 4,D4 1,B4 1,A4 1,G4 1,E4 3,E4 1,E4 1,C5 1,B4 1,A4 1,D5 1,D5 1,D5 1,D5 1,E5 1,D5 1,C5 1,A4 1,G4 2,D5 2";
    var ch1 = "B4 1,B4 1,B4 2,B4 1,B4 1,B4 2,B4 1,D5 1,G4 1.5,A4 .5,B4 4,C5 1,C5 1,C5 1.5,C5 .5,C5 1,B4 1,B4 1,B4 .5,B4 .5,B4 1,A4 1,A4 1,B4 1,A4 2,D5 2";
    var ch2 = "B4 1,B4 1,B4 2,B4 1,B4 1,B4 2,B4 1,D5 1,G4 1.5,A4 .5,B4 4,C5 1,C5 1,C5 1.5,C5 .5,C5 1,B4 1,B4 1,B4 .5,B4 .5,D5 1,D5 1,C5 1,A4 1,G4 4";
    // ակորդներ՝ ամեն տակտին (4 քառորդ)
    var CH = { G: ["G2", "B3", "D4"], C: ["C3", "E4", "G3"], D: ["D3", "F#3", "A3"], E: ["E3", "G3", "B3"], A: ["A2", "C#4", "E4"] };
    var chords = "G G G C C D D G G G G C C G D G  G G G G C G D D  G G G G C D G".split(/\s+/);   // 16 + 8 + 7 տակտ
    function parse(s) { return s.split(",").map(function (x) { var p = x.split(" "); return [p[0], +p[1]]; }); }
    SEQ = parse(verse).concat(parse(ch1), parse(ch2));
    var total = SEQ.reduce(function (a, n) { return a + n[1]; }, 0);
    function celesta(t, fr, dur, v) {
      [1, 2, 3.01, 4.2].forEach(function (h, k) {
        var o = ac.createOscillator(), g = ac.createGain(); o.type = "sine"; o.frequency.value = fr * h;
        var a = v * [1, .35, .12, .06][k]; g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(a, t + .006); g.gain.exponentialRampToValueAtTime(.0001, t + Math.min(1.6, dur * Q + .7) / (1 + k * .6));
        o.connect(g); g.connect(master); o.start(t); o.stop(t + 2);
      });
    }
    function pad(t, fr, dur, v, type) {
      var o = ac.createOscillator(), g = ac.createGain(), lp = ac.createBiquadFilter(); o.type = type || "triangle"; o.frequency.value = fr; lp.type = "lowpass"; lp.frequency.value = 1200;
      g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(v, t + .03); g.gain.setTargetAtTime(0, t + dur * .8, .15);
      o.connect(lp); lp.connect(g); g.connect(master); o.start(t); o.stop(t + dur + 1);
    }
    var noise;
    function bells(t, v) {
      var s = ac.createBufferSource(), hp = ac.createBiquadFilter(), bp = ac.createBiquadFilter(), g = ac.createGain();
      s.buffer = noise; hp.type = "highpass"; hp.frequency.value = 6500; bp.type = "peaking"; bp.frequency.value = 9000; bp.gain.value = 8;
      g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(.0001, t + .16);
      s.connect(hp); hp.connect(bp); bp.connect(g); g.connect(master); s.start(t); s.stop(t + .2);
    }
    function schedule() {
      while (next < ac.currentTime + .4) {
        var n = SEQ[idx], beat = SEQ.slice(0, idx).reduce(function (a, x) { return a + x[1]; }, 0);
        if (n[0] !== "-") celesta(next, f(n[0]), n[1], .16);
        // ակորդ և բաս տակտի սկզբին
        if (beat % 4 === 0) { var c = CH[chords[(beat / 4) % chords.length]] || CH.G; pad(next, f(c[0]) / 2, 4 * Q, .14, "triangle"); c.forEach(function (x) { pad(next, f(x), 4 * Q, .025, "sine"); }); }
        // զանգակներ ութերորդականներով, 2-րդ և 4-րդ զարկին՝ ուժեղ
        for (var e = 0; e < n[1] * 2; e++) { var bt = beat + e / 2; if (bt % 1 === 0 || Math.random() < .9) bells(next + e * Q / 2, bt % 2 === 1 ? .22 : .09); }
        next += n[1] * Q; idx = (idx + 1) % SEQ.length;
        if (idx === 0) next += 2 * Q;   // կարճ դադար կրկնությունից առաջ
      }
    }
    function sync() { document.querySelectorAll(".mus").forEach(function (b) { b.classList.toggle("on", on); }); }
    // window.GALA_SONG = "song.mp3"՝ սինթեզի փոխարեն նվագում է այդ ֆայլը
    var au;
    return {
      start: function () {
        if (window.GALA_SONG) {
          au = au || new Audio(window.GALA_SONG); au.loop = true; au.volume = .8;
          au.play().then(function () { on = true; sync(); }).catch(function () {}); on = true; sync(); return;
        }
        try {
          if (!ac) {
            ac = new (window.AudioContext || window.webkitAudioContext)(); master = ac.createGain(); master.gain.value = .55;
            var comp = ac.createDynamicsCompressor(); master.connect(comp); comp.connect(ac.destination);
            noise = ac.createBuffer(1, ac.sampleRate * .25, ac.sampleRate); var d = noise.getChannelData(0); for (var i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
          }
          ac.resume(); if (on) return; on = true; next = ac.currentTime + .15; timer = setInterval(schedule, 100); sync();
        } catch (e) {}
      },
      stop: function () { on = false; clearInterval(timer); if (ac) ac.suspend(); if (au) au.pause(); sync(); },
      toggle: function () { on ? this.stop() : this.start(); },
      isOn: function () { return on; }
    };
  })();
  // երաժշտության կոճակը՝ վերևի աջ անկյունում
  function musBtn() {
    var b = document.createElement("button"); b.className = "mus"; b.type = "button"; b.setAttribute("aria-label", "Երաժշտություն");
    b.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M12 3.5c-3 0-5 2.3-5 5.2v4.1L5 16h14l-2-3.2V8.7c0-2.9-2-5.2-5-5.2zM10 18.5a2 2 0 0 0 4 0"/></svg><i></i>';
    b.onclick = function () { music.toggle(); }; b.classList.toggle("on", music.isOn()); document.body.appendChild(b);
  }

  window.G = { D: D, page: page, music: music, reveal: reveal, countdown: countdown, carousel: carousel, sparkle: sparkle, burst: burst,
    // բացման էկրանից հետո՝ էջը միացնել
    start: function () { document.body.classList.remove("locked"); reveal(); countdown(); carousel(); musBtn(); } };
  // երաժշտությունը միանում է բացման էկրանի սեղմումով (բրաուզերները ձայն թույլ են տալիս միայն սեղմումից հետո)
  document.addEventListener("click", function h(e) { if (e.target.closest && e.target.closest("#env")) { music.start(); document.removeEventListener("click", h, true); } }, true);
})();
