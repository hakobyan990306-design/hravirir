/* զննարկչի ներդիրի լոգո (favicon)՝ բոլոր հրավիրատոմսերում */
(function () {
  var s = document.currentScript; if (!s || document.querySelector('link[rel~="icon"][data-k]')) return;
  [["icon", "favicon.svg", "image/svg+xml"], ["icon", "favicon-48.png", "image/png"], ["apple-touch-icon", "favicon-180.png", ""]].forEach(function (f) {
    var l = document.createElement("link"); l.rel = f[0]; l.href = new URL("../../assets/" + f[1], s.src).href; if (f[2]) l.type = f[2]; l.setAttribute("data-k", ""); document.head.appendChild(l);
  });
  document.querySelectorAll('link[rel~="icon"]:not([data-k])').forEach(function (l) { l.remove(); });
})();
/* =====================================================================
   HRAVIRIR.AM — ընդհանուր օգնական ֆունկցիաներ բոլոր դիզայնների համար
   Յուրաքանչյուր դիզայն ունի իր HTML/CSS/JS-ը, իսկ այստեղ միայն
   լեզուներն են, հետհաշվարկը, RSVP-ն, երաժշտությունը և անիմացիաները։
   ===================================================================== */
(function () {
  "use strict";
  var C = window.INVITE || {};
  var Q = new URLSearchParams(location.search);
  var LANGS = C.langs && C.langs.length ? C.langs.slice() : ["hy"];
  var lang = LANGS[0];
  try { var sv = localStorage.getItem("inv-lang"); if (sv && LANGS.indexOf(sv) > -1) lang = sv; } catch (e) {}
  var PREVIEW = Q.has("preview");
  if (PREVIEW) { document.documentElement.classList.add("preview"); lang = LANGS[0]; LANGS = [lang]; }

  // Կատալոգի փոքր նախադիտումներում (?preview) լուսանկարները բեռնվում են փոքր չափով՝ էջը արագ է աշխատում
  if (PREVIEW) (function small(o) {
    for (var k in o) { var v = o[k];
      if (typeof v === "string" && /images\.unsplash\.com/.test(v)) o[k] = v.replace(/([?&])w=\d+/, "$1w=420").replace(/([?&])q=\d+/, "$1q=60");
      else if (v && typeof v === "object") small(v); }
  })(C);
  var UI = {
    hy: { days: "օր", hours: "ժամ", minutes: "րոպե", seconds: "վրկ", map: "Քարտեզ", send: "Ուղարկել", thanks: "Շնորհակալություն", thanksText: "Ձեր պատասխանն ստացվել է",
      name: "Անուն, ազգանուն", yes: "Այո, սիրով կգամ", no: "Ցավոք, չեմ կարող գալ", maybe: "Կտեղեկացնեմ ավելի ուշ", guests: "Հյուրերի քանակ", note: "Եթե գալու եք զույգով, գրեք բոլորի անունները",
      tap: "Սեղմեք", back: "Դիզայններ", order: "Պատվիրել", dear: "Հարգելի՛",
      wd: ["Երկ", "Երք", "Չրք", "Հնգ", "Ուրբ", "Շբթ", "Կիր"],
      months: ["Հունվար", "Փետրվար", "Մարտ", "Ապրիլ", "Մայիս", "Հունիս", "Հուլիս", "Օգոստոս", "Սեպտեմբեր", "Հոկտեմբեր", "Նոյեմբեր", "Դեկտեմբեր"],
      monthsGen: ["հունվարի", "փետրվարի", "մարտի", "ապրիլի", "մայիսի", "հունիսի", "հուլիսի", "օգոստոսի", "սեպտեմբերի", "հոկտեմբերի", "նոյեմբերի", "դեկտեմբերի"] },
    ru: { days: "дней", hours: "часов", minutes: "минут", seconds: "секунд", map: "Карта", send: "Отправить", thanks: "Спасибо", thanksText: "Ваш ответ получен",
      name: "Имя и фамилия", yes: "Да, с удовольствием приду", no: "К сожалению, не смогу", maybe: "Сообщу позже", guests: "Количество гостей", note: "Если вы будете с парой, напишите все имена",
      tap: "Нажмите", back: "Дизайны", order: "Заказать", dear: "Дорогие",
      wd: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
      months: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
      monthsGen: ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"] },
    en: { days: "days", hours: "hours", minutes: "min", seconds: "sec", map: "Map", send: "Send", thanks: "Thank you", thanksText: "Your reply has been received",
      name: "Full name", yes: "Yes, with pleasure", no: "Sorry, I can't make it", maybe: "I'll let you know later", guests: "Number of guests", note: "If you're coming as a couple, list all names",
      tap: "Tap", back: "Designs", order: "Order", dear: "Dear",
      wd: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
      months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      monthsGen: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] }
  };

  // Օրինակներում (INVITE.demo) ամսաթիվը միշտ մոտ է՝ այսօրվանից 37 օր հետո, որ հետհաշվարկը փոքր թվեր ցույց տա
  if (C.demo && C.date && !C._shifted) {
    var _d0 = new Date(C.date), _d1 = new Date(); _d1.setHours(_d0.getHours(), _d0.getMinutes(), 0, 0); _d1.setDate(_d1.getDate() + 37);
    var _dt = _d1 - _d0; C.date = _d1; C._shifted = true;
    if (C.rsvp && C.rsvp.deadline) C.rsvp.deadline = new Date(+new Date(C.rsvp.deadline) + _dt);
  }  var K = {
    C: C, Q: Q, PREVIEW: PREVIEW, EMBED: Q.has("embed") || PREVIEW,
    get lang() { return lang; }, LANGS: LANGS,
    date: new Date(C.date),
    u: function (k) { return (UI[lang] || UI.hy)[k]; },
    t: function (v) {
      if (v == null) return "";
      if (typeof v !== "object" || Array.isArray(v)) return v;
      return v[lang] != null ? v[lang] : v.hy != null ? v.hy : v[Object.keys(v)[0]];
    },
    esc: function (s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); },
    pad: function (n) { return (n < 10 ? "0" : "") + n; },
    list: function (v) { v = K.t(v); return v == null || v === "" ? [] : Array.isArray(v) ? v : [v]; },
    names: function () { return K.list(C.names); },
    guest: function () { return K.t(Q.get("to") || C.to || ""); },
    dateLong: function (d) {
      d = d || K.date;
      return lang === "en" ? UI.en.months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear()
        : d.getDate() + " " + K.u("monthsGen")[d.getMonth()] + " " + d.getFullYear();
    },
    deadline: function () {
      if (!C.rsvp || !C.rsvp.deadline) return "";
      var d = new Date(C.rsvp.deadline);
      return lang === "en" ? UI.en.months[d.getMonth()] + " " + d.getDate() : K.u("monthsGen")[d.getMonth()] + " " + d.getDate() + (lang === "hy" ? "-ը" : "");
    },
    // Օրացույցի բջիջները (երկուշաբթիից)
    calendarCells: function (mark) {
      var d0 = K.date, y = d0.getFullYear(), m = d0.getMonth();
      var first = (new Date(y, m, 1).getDay() + 6) % 7, days = new Date(y, m + 1, 0).getDate();
      var h = K.u("wd").map(function (w) { return '<div class="cw">' + w + "</div>"; }).join("");
      for (var i = 0; i < first; i++) h += "<div></div>";
      for (var d = 1; d <= days; d++) h += d === d0.getDate() ? '<div class="cd on">' + (mark || "") + "<span>" + d + "</span></div>" : '<div class="cd"><span>' + d + "</span></div>";
      return h;
    },
    // Հետհաշվարկ՝ [data-cd] տարրերի մեջ <b data-k="days|hours|minutes|seconds">
    countdown: function (padIt) {
      function tick() {
        var diff = Math.max(0, K.date - new Date());
        var v = { days: Math.floor(diff / 864e5), hours: Math.floor(diff / 36e5) % 24, minutes: Math.floor(diff / 6e4) % 60, seconds: Math.floor(diff / 1e3) % 60 };
        document.querySelectorAll("[data-cd] [data-k]").forEach(function (b) { b.textContent = padIt ? K.pad(v[b.dataset.k]) : v[b.dataset.k]; });
      }
      clearInterval(K._cd); tick(); K._cd = setInterval(tick, 1000);
    },
    // Հրավերի ներքևի «HRAVIRIR.AM» հղումը՝ լոգոյով և կայքի հասցեով (հասցեն փոխելու համար փոխեք միայն SITE-ը)
    SITE: "https://hravirir.pages.dev/",
    // հյուրերի պատասխանները գնում են Google Apps Script → ամեն զույգի համար առանձին աղյուսակ
    RSVP_URL: "https://script.google.com/macros/s/AKfycbxwpQ4fQYogsMWe6JtavVDFtuv2jrBSEHksYU3XxNaxAaEufzuWk8xQHzP2aJhLrFKM/exec",
    LOGO: '<svg class="k-logo" viewBox="370 370 540 540" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M395 585A251 251 0 0 1 883 585M395 695A251 251 0 0 0 883 695" stroke="#FFC000" stroke-width="22"/><path d="M703 480C700 530 650 620 605 660C590 674 575 684 566 674C548 652 512 610 512 594C514 586 524 590 545 606C600 650 680 720 735 775C748 787 760 800 769 791" stroke="currentColor" stroke-width="18"/></svg>',
    brand: function () {
      document.querySelectorAll('a[href*="hravirir.am"], a[href*="hravirir.pages.dev"]').forEach(function (a) {
        a.href = K.SITE; a.target = "_blank"; a.rel = "noopener";
        if (!a.querySelector(".k-logo")) { a.classList.add("k-brand"); a.insertAdjacentHTML("afterbegin", K.LOGO); }
      });
    },
    // Ներքևի անունները (օր.՝ «Դավիթ & Նարե»)՝ միշտ մեկ տողում. եթե չեն տեղավորվում, տառաչափը փոքրանում է
    fitNames: function () {
      var n = K.names(), main = document.querySelector("main"); if (n.length < 2 || !main) return;
      var first = main.querySelector("section");
      main.querySelectorAll("*").forEach(function (el) {
        if ([].some.call(el.children, function (c) { return !/amp/.test(c.className); }) || (first && first.contains(el))) return;
        [].forEach.call(el.children, function (c) { c.style.display = "inline"; });
        var tx = el.textContent; if (tx.indexOf(n[0]) < 0 || tx.indexOf(n[1]) < 0 || tx.length > n[0].length + n[1].length + 14) return;
        el.style.whiteSpace = "nowrap"; el.style.fontSize = "";
        var box = getComputedStyle(el).display === "inline" ? el.parentElement : el, cs = getComputedStyle(box);
        var avail = box.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight); if (!avail) return;
        var r = document.createRange(); r.selectNodeContents(el);
        var fs = parseFloat(getComputedStyle(el).fontSize), i = 0;
        while (r.getBoundingClientRect().width > avail && fs > 14 && i++ < 80) { fs -= 1; el.style.fontSize = fs + "px"; }
      });
    },    // Հայտնվելու անիմացիա՝ .rv → .rv.in
    reveal: function () {
      if (K._io) K._io.disconnect();
      var els = document.querySelectorAll(".rv");
      if (!("IntersectionObserver" in window) || PREVIEW) { els.forEach(function (e) { e.classList.add("in"); }); K.fitNames(); K.brand(); return; }
      K._io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); K._io.unobserve(e.target); } }); }, { threshold: 0.12, rootMargin: "0px 0px -5% 0px" });
      els.forEach(function (e) { K._io.observe(e); });
      K.fitNames(); K.brand(); if (document.fonts && document.fonts.ready) document.fonts.ready.then(K.fitNames);
    },
    // RSVP ձև՝ պատասխանը Google Sheets կամ WhatsApp
    rsvp: function (form, thanksHTML) {
      if (!form) return;
      // հարսանիքում՝ «Ում կողմից եք հրավիրված» (հարսի / փեսայի)
      if (K.isWedding() && !form.querySelector('[name="side"]')) {
        var SD = { hy: ["Ում կողմից եք հրավիրված", "Հարսի", "Փեսայի", "Հարսի կողմից", "Փեսայի կողմից"], ru: ["С чьей стороны вы приглашены", "Невесты", "Жениха", "Со стороны невесты", "Со стороны жениха"], en: ["Invited by", "The bride", "The groom", "Bride's side", "Groom's side"] }[lang] || [];
        var box = document.createElement("div"); box.className = "k-side";
        box.innerHTML = '<div class="fl"><label>' + K.esc(SD[0]) + '</label></div><label class="radio"><input type="radio" name="side" value="' + K.esc(SD[3]) + '" required>' + K.esc(SD[1]) + '</label><label class="radio"><input type="radio" name="side" value="' + K.esc(SD[4]) + '">' + K.esc(SD[2]) + "</label>";
        var first = form.querySelector(".fl"); if (first) form.insertBefore(box, first); else form.appendChild(box);
      }
      // սխալի հաղորդագրությունները՝ հրավերի լեզվով (ոչ թե բրաուզերի)
      var VM = { hy: ["Խնդրում ենք լրացնել այս դաշտը", "Խնդրում ենք ընտրել տարբերակներից մեկը"], ru: ["Пожалуйста, заполните это поле", "Пожалуйста, выберите один из вариантов"], en: ["Please fill in this field", "Please choose one of the options"] }[lang] || [];
      form.querySelectorAll("input, select, textarea").forEach(function (i) {
        i.addEventListener("invalid", function () { i.setCustomValidity(i.type === "radio" || i.type === "checkbox" ? VM[1] : VM[0]); });
        var clr = function () { form.querySelectorAll('[name="' + i.name + '"]').forEach(function (j) { j.setCustomValidity(""); }); };
        i.addEventListener("input", clr); i.addEventListener("change", clr);
      });
      form.onsubmit = function (ev) {
        ev.preventDefault();
        var fd = new FormData(form), data = {};
        fd.forEach(function (v, k) { data[k] = v; });
        data.invite = K.names().join(" & ");
        var btn = form.querySelector("button"); if (btn) btn.disabled = true;
        var done = function () { form.outerHTML = thanksHTML || '<div class="thanks"><div class="thanks-t">' + K.esc(K.u("thanks")) + "</div><p>" + K.esc(K.u("thanksText")) + "</p></div>"; };
        var r = C.rsvp || {};
        var ep = r.endpoint || (C.demo || r.mode === "whatsapp" ? "" : K.RSVP_URL);
        if (ep) {
          data.kind = "rsvp"; data.lang = lang; data.email = r.email || "";
          data.key = r.key || (location.pathname.match(/invites\/([\w-]+)/) || [])[1] || "invite";
          fetch(ep, { method: "POST", mode: "no-cors", body: new URLSearchParams(data) }).then(done, done);
        }
        else if (r.whatsapp && !C.demo) {
          var msg = data.invite + "\n" + data.name + " — " + (data.attend === "yes" ? K.u("yes") : data.attend === "maybe" ? K.u("maybe") : K.u("no")) + (data.guests ? "\n" + K.u("guests") + ": " + data.guests : "") +
            (data.side ? "\n" + data.side : "") + (data.note ? "\n" + data.note : "");
          window.open("https://wa.me/" + r.whatsapp + "?text=" + encodeURIComponent(msg), "_blank"); done();
        } else done();
      };
    },
    // Երաժշտություն
    music: {
      on: false, audio: null, ctx: null, loop: null,
      sync: function () { document.querySelectorAll("[data-music]").forEach(function (b) { b.classList.toggle("on", K.music.on); }); },
      play: function () {
        if (!C.music) return;
        this.on = true;
        if (typeof C.music === "string") { this.audio = this.audio || new Audio(C.music); this.audio.loop = true; this.audio.play().catch(function () {}); }
        else this.synth();
        this.sync();
      },
      stop: function () {
        this.on = false;
        if (this.audio) this.audio.pause();
        if (this.ctx) { clearTimeout(this.loop); this.ctx.close(); this.ctx = null; }
        this.sync();
      },
      toggle: function () { this.on ? this.stop() : this.play(); },
      synth: function () { // օրինակների համար՝ փափուկ «երաժշտական տուփ»
        var AC = window.AudioContext || window.webkitAudioContext; if (!AC || this.ctx) return;
        var ctx = this.ctx = new AC(), self = this, notes = [72, 76, 79, 84, 79, 76, 71, 74, 79, 83, 79, 74, 69, 72, 76, 81, 76, 72, 65, 69, 72, 77, 72, 69];
        (function bar() {
          if (!self.ctx) return;
          var t0 = ctx.currentTime + 0.05;
          notes.forEach(function (n, i) {
            var o = ctx.createOscillator(), g = ctx.createGain(), s = t0 + i * 0.34;
            o.type = "sine"; o.frequency.value = 440 * Math.pow(2, (n - 69) / 12);
            g.gain.setValueAtTime(0, s); g.gain.linearRampToValueAtTime(0.07, s + 0.02); g.gain.exponentialRampToValueAtTime(0.0008, s + 1.6);
            o.connect(g); g.connect(ctx.destination); o.start(s); o.stop(s + 1.7);
          });
          self.loop = setTimeout(bar, notes.length * 340);
        })();
      }
    },
    // զույգի գլխավոր լուսանկարը (INVITE.photo)՝ կամարաձև շրջանակով
    photo: function (cls) {
      return C.photo ? '<div class="k-photo rv d3 ' + (cls || "") + '"><img src="' + K.esc(C.photo) + '" alt="" loading="lazy"></div>' : "";
    },
    // զույգի լուսանկարների բաժին (INVITE.gallery = [նկարներ])՝ սահող շարք
    gallery: function (h2cls, secCls) {
      if (!C.gallery || !C.gallery.length) return "";
      var T = { hy: "Մեր պահերը", ru: "Наши моменты", en: "Our moments" }[lang] || "";
      return '<section class="k-gal ' + (secCls || "") + '">' + (C.galleryTitle === false ? "" : '<div class="wrap"><h2 class="' + (h2cls || "h2") + ' rv">' + K.esc(T) + "</h2></div>") + '<div class="k-gal-s rv">' +
        C.gallery.map(function (g) { return '<div><img src="' + K.esc(g) + '" alt="" loading="lazy"></div>'; }).join("") + "</div></section>";
    },
    // հարսանիք է, եթե ծրագրում կա պսակադրություն կամ փեսայի/հարսի տուն (կամ INVITE.type = "wedding")
    isWedding: function () {
      if (C.type) return C.type === "wedding";
      var s = JSON.stringify(C.events || C.timing || []);
      return /Պսակադր|Փեսայի տուն|Հարսի տուն|Венчание|Дом жениха|Дом невесты/.test(s);
    },
    // Ծրագրի կետի պատկերակը՝ ըստ վայրի տեսակի. տուն / եկեղեցի / սրահ (գույնը՝ currentColor)
    evIcon: function (e) {
      function s(v) { if (!v) return ""; if (typeof v === "string") return v; return Object.keys(v).map(function (k) { return v[k]; }).join(" "); }
      var title = s(e && (e.title || e.text)), place = s(e && (e.place || e.address)), all = title + " " + place;
      var HOUSE = /տուն|օջախ|дом|home|house/i, CHURCH = /եկեղեց|պսակ|մկրտ|վանք|տաճար|կնունք|венч|церк|храм|крещ|монаст|собор|church|cathedral|baptism|wedding ceremony/i;
      var HALL = /հանդես|ընթրիք|սեղան|տորթ|խնջույք|ռեստորան|սրահ|банкет|ужин|стол|торт|ресторан|зал|reception|dinner|party|restaurant|hall/i;
      var kind = HOUSE.test(title) ? "home" : HALL.test(title) ? "hall" : CHURCH.test(all) ? "church" : HOUSE.test(place) ? "home" : "hall";
      // style = «ձև-տարբերակ», օր.՝ "thin-b". ձևեր՝ line, thin, bold, arch, stamp, diamond, sketch, glow, double. տարբերակներ (նկարներ)՝ a, b, c
      var st = String(arguments[1] || C.iconStyle || "line-a").split("-"), look = st[0], v = st[1] || "a";
      var D = {
        a: {
          home: '<path d="M10 30L32 11L54 30"/><path d="M16 25V54H48V25"/><path d="M27 54V40H37V54"/><path d="M40 18V11H46V23"/><rect x="20" y="31" width="7" height="6"/><rect x="37" y="31" width="7" height="6"/>',
          church: '<path d="M32 4V14M27 8H37"/><path d="M22 28C22 20 26 15 32 14C38 15 42 20 42 28Z"/><path d="M20 28H44V34H20Z"/><path d="M14 54V36L20 34M50 54V36L44 34"/><path d="M14 54H50"/><path d="M20 34V54M44 34V54"/><path d="M28 54V45C28 42 30 40 32 40C34 40 36 42 36 45V54"/><path d="M24 30V32M32 30V32M40 30V32"/>',
          hall: '<path d="M8 22L32 10L56 22Z"/><path d="M8 22H56"/><path d="M12 26V50M22 26V50M42 26V50M52 26V50"/><path d="M28 50V38C28 35 30 33 32 33C34 33 36 35 36 38V50"/><path d="M6 54H58M9 50H55"/><circle cx="32" cy="18" r="2"/>'
        },
        b: { // տնակ սրտով, հայկական եկեղեցի կոնաձև գմբեթով, տոնական սեղան ջահով
          home: '<path d="M6 31L32 9L58 31"/><path d="M12 27V54H52V27"/><path d="M27 54V44C27 41 29 39 32 39C35 39 37 41 37 44V54"/><path d="M32 33C30 31 27 31 27 34C27 36 32 38 32 38C32 38 37 36 37 34C37 31 34 31 32 33Z"/><path d="M4 54H60"/><path d="M6 48V54M10 48V54M54 48V54M58 48V54M4 50H12M52 50H60"/>',
          church: '<path d="M32 3V9M29 5.5H35"/><path d="M24 22L32 9L40 22Z"/><path d="M25 22H39V34H25Z"/><path d="M29 26V30M35 26V30"/><path d="M12 54V38L25 34M52 54V38L39 34"/><path d="M12 38H52"/><path d="M10 54H54"/><path d="M28 54V47C28 44.5 30 43 32 43C34 43 36 44.5 36 47V54"/><path d="M17 44V48M47 44V48"/>',
          hall: '<path d="M32 4V10"/><path d="M20 12C24 18 40 18 44 12"/><path d="M20 12V16M32 13V18M44 12V16"/><path d="M8 38H56"/><path d="M10 38C10 44 12 46 14 46M54 38C54 44 52 46 50 46"/><path d="M14 46V56M50 46V56"/><path d="M22 26H28L27 33C26.5 35 23.5 35 23 33Z"/><path d="M25 35V38"/><path d="M36 26H42L41 33C40.5 35 37.5 35 37 33Z"/><path d="M39 35V38"/>'
        },
        c: { // երկհարկանի տուն, զանգակատնով մատուռ, ռեստորանի կափարիչ-ափսե
          home: '<path d="M14 24L32 10L50 24"/><path d="M18 21V54H46V21"/><path d="M18 36H46"/><path d="M14 36H50V39H14Z"/><path d="M28 54V45H36V54"/><rect x="23" y="25" width="6" height="7"/><rect x="35" y="25" width="6" height="7"/><path d="M42 15V9H46V18"/><path d="M44 6C42 4 46 3 44 1"/>',
          church: '<path d="M46 2V8M43 4.5H49"/><path d="M41 18L46 8L51 18Z"/><path d="M41 18H51V54H41Z"/><path d="M44 22H48V27H44Z"/><path d="M10 54V32L26 20L41 32"/><path d="M10 54H41"/><path d="M21 54V45C21 42.5 23 41 25.5 41C28 41 30 42.5 30 45V54"/><path d="M26 27V33M23 30H29"/>',
          hall: '<path d="M10 44C10 30 20 21 32 21C44 21 54 30 54 44"/><path d="M6 44H58"/><path d="M8 48H56"/><path d="M32 21V17"/><circle cx="32" cy="15" r="2.5"/><path d="M18 36C20 31 24 28 28 27"/><path d="M14 54H50"/>'
        }
      };
      var art = (D[v] || D.a)[kind], sw = look === "thin" ? 1.4 : look === "bold" ? 3.4 : 2.2, frame = "", inner = art;
      if (look === "arch") { frame = '<path d="M4 62V30C4 14 16 2 32 2C48 2 60 14 60 30V62Z" stroke-width="1.6"/>'; inner = '<g transform="translate(9 12) scale(.72)">' + art + "</g>"; }
      else if (look === "stamp") { frame = '<rect x="3" y="3" width="58" height="58" rx="2" stroke-width="1.4" stroke-dasharray="3 3"/><rect x="8" y="8" width="48" height="48" stroke-width="1"/>'; inner = '<g transform="translate(12 12) scale(.62)">' + art + "</g>"; }
      else if (look === "diamond") { frame = '<path d="M32 1L63 32L32 63L1 32Z" stroke-width="1.6"/><path d="M32 6L58 32L32 58L6 32Z" stroke-width=".8" stroke-dasharray="1 3"/><circle cx="32" cy="1" r="1.5"/><circle cx="63" cy="32" r="1.5"/><circle cx="32" cy="63" r="1.5"/><circle cx="1" cy="32" r="1.5"/>'; inner = '<g transform="translate(17 17) scale(.47)">' + art + "</g>"; }
      else if (look === "sketch") inner = '<g opacity=".45" transform="translate(1.2 .8) rotate(1.2 32 32)">' + art + "</g>" + art;
      else if (look === "double") inner = '<g stroke-width="4.6">' + art + '</g><g stroke="var(--k-bg, #fff)" stroke-width="1.6">' + art + "</g>";
      var defs = "";
      if (look === "glow") { defs = '<defs><linearGradient id="evg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f6e2a8"/><stop offset=".5" stop-color="#c9a24f"/><stop offset="1" stop-color="#f1d58e"/></linearGradient></defs>'; }
      return '<svg class="evi evi-' + kind + " evi-" + look + '" viewBox="0 0 64 64" fill="none" stroke="' + (look === "glow" ? "url(#evg)" : "currentColor") + '" stroke-width="' + sw + '" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"' +
        (look === "glow" ? ' style="filter:drop-shadow(0 0 6px rgba(240,210,140,.55))"' : "") + ">" + defs + frame + inner + "</svg>";
    },
    // Լողացող կոճակներ (լեզու, երաժշտություն) և «Օրինակ» կոճակ
    chrome: function () {
      var h = "";
      if (!PREVIEW) {
        h += '<div class="k-fabs">';
        if (LANGS.length > 1) h += '<div class="k-langs">' + LANGS.map(function (l) {
          return '<button data-l="' + l + '"' + (l === lang ? ' class="on"' : "") + ">" + { hy: "ՀԱՅ", ru: "РУС", en: "ENG" }[l] + "</button>";
        }).join("") + "</div>";
        if (C.music) h += '<button class="k-music' + (K.music.on ? " on" : "") + '" data-music aria-label="music"><i></i><i></i><i></i><i></i></button>';
        h += "</div>";
      }
      if (C.demo && !K.EMBED) h += '<div class="k-demo"><a href="../../index.html#designs" aria-label="' + K.esc(K.u("back")) + '">←</a><a class="go" href="#" data-order="' +
        K.esc(C.demo.id || "") + '" data-name="' + K.esc(C.demo.name || document.title) + '">' + K.esc(K.u("order")) + "</a></div>";
      return h;
    },
    bindChrome: function (rerender) {
      document.querySelectorAll(".k-langs button").forEach(function (b) {
        b.onclick = function () {
          if (b.dataset.l === lang) { b.parentNode.classList.toggle("open"); return; }
          lang = b.dataset.l; try { localStorage.setItem("inv-lang", lang); } catch (e) {}
          document.documentElement.lang = lang;
          var y = window.scrollY; rerender(); window.scrollTo(0, y);
          document.querySelectorAll(".rv").forEach(function (e) { e.classList.add("in"); });
        };
      });
      document.querySelectorAll("[data-music]").forEach(function (b) { b.onclick = function () { K.music.toggle(); }; });
    }
  };
  window.K = K;
  // Yandex Navigator. <a data-nav="lat,lon" href="վեբ-քարտեզ"> → հեռախոսում բացվում է հավելվածը (Android՝ intent, iPhone՝ yandexnavi://), չլինելու դեպքում՝ Yandex Maps վեբ
  K.navHref = function (ll) { return "https://yandex.com/maps/?rtext=~" + ll + "&rtt=auto"; };
  document.addEventListener("click", function (ev) {
    var a = ev.target.closest && ev.target.closest("a[data-nav]"); if (!a) return;
    var ll = a.dataset.nav.split(","), web = K.navHref(a.dataset.nav), q = "build_route_on_map?lat_to=" + ll[0] + "&lon_to=" + ll[1], ua = navigator.userAgent;
    if (/Android/i.test(ua)) { ev.preventDefault(); location.href = "intent://" + q + "#Intent;scheme=yandexnavi;package=ru.yandex.yandexnavi;S.browser_fallback_url=" + encodeURIComponent(web) + ";end"; }
    else if (/iPhone|iPad|iPod/i.test(ua)) {
      ev.preventDefault(); var t0 = Date.now();
      var tm = setTimeout(function () { if (!document.hidden && Date.now() - t0 < 3000) location.href = web; }, 1500);
      document.addEventListener("visibilitychange", function h() { if (document.hidden) { clearTimeout(tm); document.removeEventListener("visibilitychange", h); } });
      location.href = "yandexnavi://" + q;
    }
  });
  // օրինակ-էջերում պատվերի պատուհանը բացվում է հենց այստեղ
  if (C.demo && !K.EMBED) { var os = document.createElement("script"); os.src = "../order.js"; document.head.appendChild(os); }
  // «Նշումների ռեժիմ»՝ հղման վերջում ?nshum
  if (/nshum/.test(location.search + location.hash) && !PREVIEW) { var rs = document.createElement("script"); rs.src = "../core/review.js?v=5"; document.head.appendChild(rs); }
})();
