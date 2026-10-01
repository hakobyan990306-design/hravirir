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

  var K = {
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
    // Հայտնվելու անիմացիա՝ .rv → .rv.in
    reveal: function () {
      if (K._io) K._io.disconnect();
      var els = document.querySelectorAll(".rv");
      if (!("IntersectionObserver" in window) || PREVIEW) { els.forEach(function (e) { e.classList.add("in"); }); return; }
      K._io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); K._io.unobserve(e.target); } }); }, { threshold: 0.12, rootMargin: "0px 0px -5% 0px" });
      els.forEach(function (e) { K._io.observe(e); });
    },
    // RSVP ձև՝ պատասխանը Google Sheets կամ WhatsApp
    rsvp: function (form, thanksHTML) {
      if (!form) return;
      form.onsubmit = function (ev) {
        ev.preventDefault();
        var fd = new FormData(form), data = {};
        fd.forEach(function (v, k) { data[k] = v; });
        data.invite = K.names().join(" & ");
        var btn = form.querySelector("button"); if (btn) btn.disabled = true;
        var done = function () { form.outerHTML = thanksHTML || '<div class="thanks"><div class="thanks-t">' + K.esc(K.u("thanks")) + "</div><p>" + K.esc(K.u("thanksText")) + "</p></div>"; };
        var r = C.rsvp || {};
        if (r.endpoint) fetch(r.endpoint, { method: "POST", mode: "no-cors", body: new URLSearchParams(data) }).then(done, done);
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
  // օրինակ-էջերում պատվերի պատուհանը բացվում է հենց այստեղ
  if (C.demo && !K.EMBED) { var os = document.createElement("script"); os.src = "../order.js"; document.head.appendChild(os); }
  // «Նշումների ռեժիմ»՝ հղման վերջում ?nshum
  if (/nshum/.test(location.search + location.hash) && !PREVIEW) { var rs = document.createElement("script"); rs.src = "../core/review.js?v=5"; document.head.appendChild(rs); }
})();
