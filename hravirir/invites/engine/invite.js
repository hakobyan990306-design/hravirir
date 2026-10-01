/* =====================================================================
   HRAVIRIR.AM — Premium վեբ հրավերի շարժիչ
   Յուրաքանչյուր հրավեր սահմանում է window.INVITE = {...} և միացնում այս ֆայլը։
   Տեքստերը կարող են լինել տող կամ {hy:"", ru:"", en:""}։
   URL պարամետրեր.
     ?to=Պետրոսյանների ընտանիք  → անհատական դիմում ծրարի վրա
     ?preview                   → մանրապատկեր (փակ ծրար, առանց կոճակների)
     ?embed                     → ամբողջական, բայց առանց «օրինակ» կոճակի
   ===================================================================== */
(function () {
  "use strict";
  var C = window.INVITE || {};
  var Q = new URLSearchParams(location.search);
  var PREVIEW = Q.has("preview"), EMBED = Q.has("embed") || PREVIEW;
  var LANGS = C.langs && C.langs.length ? C.langs.slice() : ["hy"];
  var lang = LANGS[0];
  try { var sv = localStorage.getItem("inv-lang"); if (sv && LANGS.indexOf(sv) > -1) lang = sv; } catch (e) {}
  if (PREVIEW) { document.documentElement.classList.add("preview"); LANGS = [LANGS[0]]; lang = LANGS[0]; }
  var GUEST = Q.get("to") || C.to || "";

  var UI = {
    hy: {
      tap: "Սեղմեք կնիքին", dear: "Հարգելի՛", scroll: "ներքև",
      save: "Պահեք այս օրը", left: "Մինչև տոնը մնաց", days: "օր", hours: "ժամ", minutes: "րոպե", seconds: "վրկ",
      program: "Օրվա ծրագիր", map: "Ինչպես հասնել", dress: "Դրեսկոդ", gallery: "Մեր պահերը", swipe: "սահեցրեք",
      rsvp: "Կմիանա՞ք մեզ", rsvpLead: "Խնդրում ենք հաստատել Ձեր մասնակցությունը մինչև",
      name: "Անուն, ազգանուն", yes: "Սիրով կգամ", no: "Չեմ կարող գալ", guests: "Հյուրերի քանակ",
      side: "Ում կողմից", note: "Մաղթանք", send: "Ուղարկել", thanks: "Շնորհակալություն",
      thanksText: "Ձեր պատասխանն ստացվել է", tables: "Ձեր սեղանը", tableLead: "Գրեք Ձեր անունը կամ ազգանունը",
      table: "Սեղան", notFound: "Չգտնվեց, փորձեք այլ կերպ գրել", waiting: "Սիրով սպասում ենք Ձեզ", withLove: "Սիրով՝",
      groomP: "Փեսայի ծնողներ", brideP: "Հարսի ծնողներ",
      demo: "Օրինակ", order: "Պատվիրել", back: "Դիզայններ",
      wd: ["Երկ", "Երք", "Չրք", "Հնգ", "Ուրբ", "Շբթ", "Կիր"],
      wdl: ["Կիրակի", "Երկուշաբթի", "Երեքշաբթի", "Չորեքշաբթի", "Հինգշաբթի", "Ուրբաթ", "Շաբաթ"],
      months: ["Հունվար", "Փետրվար", "Մարտ", "Ապրիլ", "Մայիս", "Հունիս", "Հուլիս", "Օգոստոս", "Սեպտեմբեր", "Հոկտեմբեր", "Նոյեմբեր", "Դեկտեմբեր"],
      monthsGen: ["հունվարի", "փետրվարի", "մարտի", "ապրիլի", "մայիսի", "հունիսի", "հուլիսի", "օգոստոսի", "սեպտեմբերի", "հոկտեմբերի", "նոյեմբերի", "դեկտեմբերի"]
    },
    ru: {
      tap: "Нажмите на печать", dear: "Дорогие", scroll: "вниз",
      save: "Сохраните дату", left: "До праздника осталось", days: "дней", hours: "часов", minutes: "минут", seconds: "секунд",
      program: "Программа дня", map: "Как добраться", dress: "Дресс-код", gallery: "Наши моменты", swipe: "листайте",
      rsvp: "Вы с нами?", rsvpLead: "Пожалуйста, подтвердите участие до",
      name: "Имя, фамилия", yes: "С радостью приду", no: "Не смогу прийти", guests: "Количество гостей",
      side: "С чьей стороны", note: "Пожелание", send: "Отправить", thanks: "Спасибо",
      thanksText: "Ваш ответ получен", tables: "Ваш стол", tableLead: "Введите имя или фамилию",
      table: "Стол", notFound: "Не найдено, попробуйте иначе", waiting: "С любовью ждём вас", withLove: "С любовью,",
      groomP: "Родители жениха", brideP: "Родители невесты",
      demo: "Пример", order: "Заказать", back: "Дизайны",
      wd: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
      wdl: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
      months: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
      monthsGen: ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"]
    },
    en: {
      tap: "Tap the seal", dear: "Dear", scroll: "scroll",
      save: "Save the date", left: "Counting down", days: "days", hours: "hours", minutes: "min", seconds: "sec",
      program: "The day", map: "Directions", dress: "Dress code", gallery: "Our moments", swipe: "swipe",
      rsvp: "Will you join us?", rsvpLead: "Kindly reply by",
      name: "Full name", yes: "Joyfully accept", no: "Regretfully decline", guests: "Number of guests",
      side: "Guest of", note: "Your wishes", send: "Send", thanks: "Thank you",
      thanksText: "Your reply has been received", tables: "Your table", tableLead: "Type your first or last name",
      table: "Table", notFound: "Not found, try another spelling", waiting: "We look forward to celebrating with you", withLove: "With love,",
      groomP: "Parents of the groom", brideP: "Parents of the bride",
      demo: "Sample", order: "Order", back: "Designs",
      wd: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
      wdl: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      monthsGen: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    }
  };
  function u(k) { return (UI[lang] || UI.hy)[k]; }
  function t(v) {
    if (v == null) return "";
    if (typeof v !== "object" || Array.isArray(v)) return v;
    return v[lang] != null ? v[lang] : v.hy != null ? v.hy : v[Object.keys(v)[0]];
  }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function list(v) { v = t(v); return v == null || v === "" ? [] : Array.isArray(v) ? v : [v]; }

  var date = new Date(C.date);

  /* ---------- SVG ---------- */
  function orn(cls) {
    return '<svg class="orn ' + (cls || "") + '" viewBox="0 0 220 34" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true">' +
      '<path d="M4 17h66M150 17h66"/><path d="M70 17c10 0 14-8 22-8 6 0 8 4 8 8s-2 8-8 8c-8 0-12-8-22-8zM150 17c-10 0-14-8-22-8-6 0-8 4-8 8s2 8 8 8c8 0 12-8 22-8z"/>' +
      '<path d="M110 5l5 12-5 12-5-12z" fill="currentColor"/><circle cx="4" cy="17" r="2" fill="currentColor"/><circle cx="216" cy="17" r="2" fill="currentColor"/></svg>';
  }
  function cornerSVG() {
    return '<svg viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true">' +
      '<path d="M1 40V1h39"/><path d="M8 34V8h26"/>' +
      '<path d="M8 8c10 0 16 4 18 10 2 5-1 9-5 8-4 0-5-5-2-7"/><path d="M8 8c0 10 4 16 10 18 5 2 9-1 8-5 0-4-5-5-7-2"/>' +
      '<circle cx="8" cy="8" r="2.4" fill="currentColor"/><path d="M40 1c6 0 9 3 9 6M1 40c0 6 3 9 6 9"/></svg>';
  }
  // Դափնու պսակ մոնոգրամով
  function crest(mono, size) {
    var leaves = "", stems = "", R = 38, cx = 50, cy = 52;
    function pt(deg, r) { var a = deg * Math.PI / 180; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; }
    [1, -1].forEach(function (dir) {
      // dir=1 → ձախ ճյուղ (ներքևից դեպի վերև-ձախ), dir=-1 → աջ ճյուղ
      var start = dir > 0 ? 100 : 80, end = dir > 0 ? 225 : -45;
      var a0 = pt(start, R), a1 = pt(end, R);
      stems += '<path d="M' + a0[0].toFixed(1) + " " + a0[1].toFixed(1) + " A" + R + " " + R + " 0 0 " + (dir > 0 ? 1 : 0) + " " + a1[0].toFixed(1) + " " + a1[1].toFixed(1) + '"/>';
      for (var i = 0; i < 8; i++) {
        var th = start + dir * (8 + i * 15), side = i % 2 ? 1 : -1;
        var p = pt(th, R + side * 3.2), rot = th + 90 * dir + side * 28 * dir;
        leaves += '<ellipse cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" rx="5" ry="1.9" transform="rotate(' + rot.toFixed(0) + " " + p[0].toFixed(1) + " " + p[1].toFixed(1) + ')"/>';
      }
    });
    var fs = mono && mono.length > 2 ? 22 : 30;
    return '<svg viewBox="0 0 100 100" aria-hidden="true">' +
      '<g fill="none" stroke="currentColor" stroke-width=".8">' + stems + '</g><g fill="currentColor" opacity=".85">' + leaves + "</g>" +
      '<circle cx="50" cy="52" r="27" fill="none" stroke="currentColor" stroke-width=".7"/>' +
      '<circle cx="50" cy="52" r="24" fill="none" stroke="currentColor" stroke-width=".4" opacity=".6"/>' +
      '<text x="50" y="' + (52 + fs * .33) + '" text-anchor="middle" font-size="' + fs + '" style="font-family:var(--f-script)" fill="currentColor">' + esc(mono || "♥") + "</text></svg>";
  }
  // Մոմե կնիք՝ անկանոն եզրով
  function sealSVG(mono) {
    var pts = [], n = 28;
    for (var i = 0; i < n; i++) {
      var a = i / n * Math.PI * 2, r = 46 + Math.sin(i * 2.7) * 2.2 + Math.cos(i * 1.3) * 1.6;
      pts.push([50 + Math.cos(a) * r, 50 + Math.sin(a) * r]);
    }
    var d = "M" + pts[0][0].toFixed(1) + " " + pts[0][1].toFixed(1);
    for (var j = 1; j <= n; j++) {
      var p = pts[j % n], q = pts[(j - 1) % n], mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2;
      d += " Q" + q[0].toFixed(1) + " " + q[1].toFixed(1) + " " + mx.toFixed(1) + " " + my.toFixed(1);
    }
    var fs = mono && mono.length > 2 ? 24 : 34;
    return '<svg viewBox="0 0 100 100" aria-hidden="true"><defs>' +
      '<radialGradient id="sg" cx="38%" cy="32%" r="75%"><stop offset="0" style="stop-color:var(--seal-l)"/><stop offset=".55" style="stop-color:var(--seal)"/><stop offset="1" style="stop-color:var(--seal-d)"/></radialGradient>' +
      '<radialGradient id="sg2" cx="60%" cy="65%" r="60%"><stop offset="0" style="stop-color:var(--seal)"/><stop offset="1" style="stop-color:var(--seal-l)"/></radialGradient></defs>' +
      '<path d="' + d + 'Z" fill="url(#sg)"/>' +
      '<circle cx="50" cy="50" r="33" fill="url(#sg2)" opacity=".9"/>' +
      '<circle cx="50" cy="50" r="33" fill="none" style="stroke:var(--seal-d)" stroke-width="2" opacity=".55"/>' +
      '<circle cx="50" cy="50" r="29.5" fill="none" style="stroke:var(--seal-l)" stroke-width=".8" opacity=".6"/>' +
      '<text x="50.8" y="' + (51 + fs * .34) + '" text-anchor="middle" font-size="' + fs + '" style="font-family:var(--f-script);fill:var(--seal-l)" opacity=".7">' + esc(mono || "♥") + "</text>" +
      '<text x="50" y="' + (50 + fs * .34) + '" text-anchor="middle" font-size="' + fs + '" style="font-family:var(--f-script);fill:var(--seal-d)">' + esc(mono || "♥") + "</text>" +
      '<ellipse cx="36" cy="30" rx="10" ry="5" fill="#fff" opacity=".18" transform="rotate(-30 36 30)"/></svg>';
  }
  /* =====================================================================
     ԾՐԱՐՆԵՐ — 10 տեսակ, ամբողջ էկրանով։ Ձևերը հաշվարկվում են էկրանի իրական չափով։
     ===================================================================== */
  var ENV_BY_THEME = { "ivory-gold": "v", blush: "round", noir: "wide", sage: "scallop", navy: "doors", burgundy: "ribbon", terracotta: "kraft", sky: "arch", party: "confetti", lavender: "diamond" };
  var LINER_BY_ENV = { v: "damask", round: "dots", wide: "stripes", scallop: "leaves", doors: "stars", ribbon: "damask", kraft: "hatch", arch: "clouds", confetti: "party", diamond: "petals" };
  var envType = C.envelope || ENV_BY_THEME[document.body.dataset.theme] || "v";

  function f1(n) { return Math.round(n * 10) / 10; }
  function linerPattern(kind) {
    var s = 'style="stroke:var(--liner)" fill="none"', f = 'style="fill:var(--liner)"', body;
    switch (kind) {
      case "dots": body = '<pattern id="lp" width="26" height="26" patternUnits="userSpaceOnUse"><circle cx="13" cy="13" r="3" ' + f + ' opacity=".5"/><circle cx="13" cy="7.5" r="2" ' + f + ' opacity=".35"/><circle cx="13" cy="18.5" r="2" ' + f + ' opacity=".35"/><circle cx="7.5" cy="13" r="2" ' + f + ' opacity=".35"/><circle cx="18.5" cy="13" r="2" ' + f + ' opacity=".35"/><circle cx="0" cy="0" r="1.4" ' + f + '/><circle cx="26" cy="26" r="1.4" ' + f + "/></pattern>"; break;
      case "stripes": body = '<pattern id="lp" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="14" height="14" style="fill:var(--liner-bg)"/><rect width="2" height="14" ' + f + ' opacity=".8"/></pattern>'; break;
      case "leaves": body = '<pattern id="lp" width="34" height="34" patternUnits="userSpaceOnUse"><path d="M17 4c5 5 5 11 0 16-5-5-5-11 0-16z" ' + f + ' opacity=".35"/><path d="M17 4v26" ' + s + ' stroke-width=".7" opacity=".6"/><path d="M0 26c4 0 7 3 8 8M34 26c-4 0-7 3-8 8" ' + s + ' stroke-width=".7" opacity=".5"/></pattern>'; break;
      case "stars": body = '<pattern id="lp" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M20 12l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z" ' + f + ' opacity=".7"/><circle cx="4" cy="4" r="1" ' + f + '/><circle cx="34" cy="30" r=".8" ' + f + '/></pattern>'; break;
      case "hatch": body = '<pattern id="lp" width="18" height="18" patternUnits="userSpaceOnUse"><path d="M0 18L18 0M-4 4L4-4M14 22L22 14" ' + s + ' stroke-width=".6" opacity=".45"/><circle cx="9" cy="9" r="1.6" ' + f + ' opacity=".5"/></pattern>'; break;
      case "clouds": body = '<pattern id="lp" width="60" height="40" patternUnits="userSpaceOnUse"><path d="M12 26a6 6 0 0 1 6-8 8 8 0 0 1 15 2 5 5 0 0 1 2 10H14a4 4 0 0 1-2-4z" ' + f + ' opacity=".35"/><circle cx="48" cy="8" r="1.3" ' + f + '/><circle cx="52" cy="34" r="1" ' + f + '/></pattern>'; break;
      case "party": body = '<pattern id="lp" width="30" height="30" patternUnits="userSpaceOnUse"><circle cx="6" cy="6" r="3" style="fill:var(--g1)"/><circle cx="21" cy="12" r="2.5" style="fill:var(--g5)"/><rect x="10" y="20" width="6" height="3" rx="1" transform="rotate(30 13 21)" style="fill:var(--g3)"/><circle cx="26" cy="26" r="2" style="fill:var(--g4)"/></pattern>'; break;
      case "petals": body = '<pattern id="lp" width="32" height="32" patternUnits="userSpaceOnUse"><g transform="translate(16 16)" ' + f + ' opacity=".4"><ellipse rx="3" ry="7" cy="-6"/><ellipse rx="3" ry="7" cy="6"/><ellipse rx="7" ry="3" cx="-6"/><ellipse rx="7" ry="3" cx="6"/></g><circle cx="16" cy="16" r="2" ' + f + '/></pattern>'; break;
      default: body = '<pattern id="lp" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M15 2L28 15 15 28 2 15z" ' + s + ' stroke-width=".8" opacity=".7"/><path d="M15 8L22 15 15 22 8 15z" ' + f + ' opacity=".25"/><circle cx="0" cy="0" r="2" ' + f + '/><circle cx="30" cy="0" r="2" ' + f + '/><circle cx="0" cy="30" r="2" ' + f + '/><circle cx="30" cy="30" r="2" ' + f + "/></pattern>";
    }
    return body;
  }
  function paperDefs(W, H) {
    return '<linearGradient id="gO" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--env-l)"/><stop offset=".75" style="stop-color:var(--env)"/><stop offset="1" style="stop-color:var(--env-d)"/></linearGradient>' +
      '<linearGradient id="gL" x1="0" x2="1"><stop offset="0" style="stop-color:var(--env)"/><stop offset="1" style="stop-color:var(--env-d)"/></linearGradient>' +
      '<linearGradient id="gR" x1="1" x2="0"><stop offset="0" style="stop-color:var(--env)"/><stop offset="1" style="stop-color:var(--env-d)"/></linearGradient>' +
      '<linearGradient id="gB" x1="0" y1="1" x2="0" y2="0"><stop offset="0" style="stop-color:var(--env)"/><stop offset=".85" style="stop-color:var(--env-l)"/><stop offset="1" style="stop-color:var(--env-d)"/></linearGradient>' +
      '<filter id="blr" x="-10%" y="-10%" width="120%" height="130%"><feGaussianBlur stdDeviation="7"/></filter>' + linerPattern(LINER_BY_ENV[envType]);
  }
  // Կափարիչի ձևը՝ ըստ տեսակի
  function flapShape(W, H) {
    var c = W / 2, fh, d, sy;
    switch (envType) {
      case "round":
        fh = H * .5; sy = fh - 6;
        d = "M0 0H" + W + "C" + W + " " + f1(fh * .78) + " " + f1(W * .74) + " " + f1(fh) + " " + c + " " + f1(fh) + "C" + f1(W * .26) + " " + f1(fh) + " 0 " + f1(fh * .78) + " 0 0Z"; break;
      case "arch":
        fh = H * .56; var r = W / 2, y0 = Math.max(fh - r, 10); sy = fh - 40;
        d = "M0 0H" + W + "V" + f1(y0) + "A" + r + " " + r + " 0 0 1 0 " + f1(y0) + "Z"; fh = y0 + r; break;
      case "wide":
        fh = H * .38; sy = fh - 4;
        d = "M0 0H" + W + "L" + f1(c + 10) + " " + f1(fh - 5) + "Q" + c + " " + f1(fh + 2) + " " + f1(c - 10) + " " + f1(fh - 5) + "Z"; break;
      case "scallop":
        fh = H * .52; sy = fh - 14;
        var n = 8, a = c, b = fh, len = Math.sqrt(a * a + b * b), bump = 11;
        d = "M0 0H" + W;
        for (var i = 0; i < n; i++) { // աջ եզր՝ (W,0) → (c,fh)
          var x1 = W - a * (i + 1) / n, y1 = b * (i + 1) / n, mx = W - a * (i + .5) / n, my = b * (i + .5) / n;
          d += "Q" + f1(mx + b / len * bump) + " " + f1(my + a / len * bump) + " " + f1(x1) + " " + f1(y1);
        }
        for (var j = 0; j < n; j++) { // ձախ եզր՝ (c,fh) → (0,0)
          var x2 = c - a * (j + 1) / n, y2 = b - b * (j + 1) / n, mx2 = c - a * (j + .5) / n, my2 = b - b * (j + .5) / n;
          d += "Q" + f1(mx2 - b / len * bump) + " " + f1(my2 + a / len * bump) + " " + f1(x2) + " " + f1(y2);
        }
        d += "Z"; break;
      default: // v, ribbon, kraft, confetti
        fh = H * .52; sy = fh - 8;
        d = "M0 0H" + W + "L" + f1(c + 16) + " " + f1(fh - 11) + "Q" + c + " " + f1(fh + 3) + " " + f1(c - 16) + " " + f1(fh - 11) + "Z";
    }
    return { d: d, fh: fh + 16, sy: sy, tip: fh };
  }
  function buildEnvelope() {
    var cover = document.getElementById("cover"), stage = document.getElementById("stage");
    if (!cover || cover.classList.contains("opening")) return;
    var W = cover.clientWidth, H = cover.clientHeight, c = W / 2, h = "", vb = 'viewBox="0 0 ' + W + " " + H + '" preserveAspectRatio="none"';
    var defs = "<defs>" + paperDefs(W, H) + "</defs>";
    var edge = 'fill="none" style="stroke:var(--liner)" stroke-width="1.2" opacity=".55"';
    var sealY = H / 2;
    // ներսի պատ՝ նախշավոր լայներով
    h += '<svg class="e-inside" ' + vb + ' aria-hidden="true">' + defs + '<rect width="' + W + '" height="' + H + '" style="fill:var(--env-d)"/>' +
      '<rect x="10" y="10" width="' + (W - 20) + '" height="' + f1(H * .62) + '" style="fill:var(--liner-bg)"/><rect x="10" y="10" width="' + (W - 20) + '" height="' + f1(H * .62) + '" fill="url(#lp)"/></svg>';
    h += cardHTML();

    if (envType === "doors") {
      var dw = W / 2;
      ["l", "r"].forEach(function (side) {
        var out = '<rect width="' + dw + '" height="' + H + '" fill="url(#g' + (side === "l" ? "L" : "R") + ')"/>' +
          '<rect x="' + (side === "l" ? 14 : 0) + '" y="14" width="' + (dw - 14) + '" height="' + (H - 28) + '" ' + edge + "/>" +
          '<path d="M' + (side === "l" ? dw : 0) + ' 0V' + H + '" style="stroke:var(--env-d)" stroke-width="2"/>';
        h += '<div class="door ' + side + '"><svg class="face out" viewBox="0 0 ' + dw + " " + H + '" preserveAspectRatio="none">' + defs + out + "</svg>" +
          '<svg class="face in" viewBox="0 0 ' + dw + " " + H + '" preserveAspectRatio="none">' + defs + '<rect width="' + dw + '" height="' + H + '" style="fill:var(--liner-bg)"/><rect width="' + dw + '" height="' + H + '" fill="url(#lp)"/></svg></div>';
      });
    } else if (envType === "diamond") {
      var tip = 12, P = {
        t: "M0 0H" + W + "L" + (c + tip) + " " + (H / 2 - tip * .7) + "Q" + c + " " + (H / 2 + 4) + " " + (c - tip) + " " + (H / 2 - tip * .7) + "Z",
        b: "M0 " + H + "H" + W + "L" + (c + tip) + " " + (H / 2 + tip * .7) + "Q" + c + " " + (H / 2 - 4) + " " + (c - tip) + " " + (H / 2 + tip * .7) + "Z",
        l: "M0 0L" + c + " " + H / 2 + "L0 " + H + "Z",
        r: "M" + W + " 0L" + c + " " + H / 2 + "L" + W + " " + H + "Z"
      }, G = { t: "gO", b: "gB", l: "gL", r: "gR" };
      ["r", "l", "b", "t"].forEach(function (k) {
        h += '<div class="dflap ' + k + '"><svg class="face out" ' + vb + ">" + defs +
          (k === "t" || k === "b" ? '<path d="' + P[k] + '" fill="#000" opacity=".16" filter="url(#blr)" transform="translate(0 ' + (k === "t" ? 5 : -5) + ')"/>' : "") +
          '<path d="' + P[k] + '" fill="url(#' + G[k] + ')"/><path d="' + P[k] + '" ' + edge + '/></svg>' +
          '<svg class="face in" ' + vb + ">" + defs + '<path d="' + P[k] + '" style="fill:var(--liner-bg)"/><path d="' + P[k] + '" fill="url(#lp)"/></svg></div>';
      });
    } else {
      var F = flapShape(W, H);
      sealY = F.sy;
      var ys = f1(Math.min(F.tip + H * .06, H * .64)), yb = f1(Math.min(F.tip + H * .01, H * .6));
      var pl = "M0 0L" + f1(c) + " " + ys + "L0 " + H + "Z", pr = "M" + W + " 0L" + f1(c) + " " + ys + "L" + W + " " + H + "Z",
        pb = "M0 " + H + "L" + f1(c) + " " + yb + "L" + W + " " + H + "Z";
      h += '<svg class="e-pocket" ' + vb + ' aria-hidden="true">' + defs +
        '<path d="' + pl + '" fill="url(#gL)"/><path d="' + pr + '" fill="url(#gR)"/>' +
        '<path d="' + pb + '" fill="#000" opacity=".12" filter="url(#blr)" transform="translate(0 -4)"/><path d="' + pb + '" fill="url(#gB)"/>' +
        '<path d="M0 ' + H + "L" + f1(c) + " " + yb + "L" + W + " " + H + '" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="1"/>' +
        '<path class="fsh" d="' + F.d + '" fill="#000" opacity=".22" filter="url(#blr)" transform="translate(0 7)"/></svg>';
      h += '<div class="e-flap" style="height:' + f1(F.fh) + 'px">' +
        '<svg class="face out" viewBox="0 0 ' + W + " " + f1(F.fh) + '" preserveAspectRatio="none">' + defs + '<path d="' + F.d + '" fill="url(#gO)"/><path d="' + F.d + '" ' + edge + "/></svg>" +
        '<svg class="face in" viewBox="0 0 ' + W + " " + f1(F.fh) + '" preserveAspectRatio="none">' + defs +
          // ներսի կողմը հայելային է, որ բացվելուց հետո սուր ծայրը նայի վերև
          '<g transform="translate(0 ' + f1(F.fh) + ') scale(1 -1)"><path d="' + F.d + '" style="fill:var(--liner-bg)"/><path d="' + F.d + '" fill="url(#lp)"/><path d="' + F.d + '" ' + edge + "/></g></svg></div>";
    }
    // զարդեր
    if (envType === "ribbon") h += '<div class="ribbon"></div>';
    if (envType === "kraft") h += '<div class="twine v"></div><div class="twine h" style="top:' + f1(sealY) + 'px"></div>';
    if (envType === "wide" || envType === "doors") h += '<div class="gframe"></div>';
    if (envType === "confetti") h += '<div class="airmail"></div>';
    h += '<div class="e-noise"></div>';
    stage.innerHTML = h;
    var seal = document.getElementById("seal");
    seal.style.top = f1(sealY) + "px";
  }
  function cardHTML() {
    return '<div class="e-card"><div class="mono">' + crest(mono) + '</div><div class="k">' + esc(t(C.label)) + '</div><div class="n foil">' + esc(namesPlain()) +
      '</div><div class="d">' + pad(date.getDate()) + " · " + pad(date.getMonth() + 1) + " · " + date.getFullYear() + "</div></div>";
  }
  var ICONS = {
    church: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M24 3v7M21 6h6M16 44V22l8-8 8 8v22M9 44V31l7-5M39 44V31l-7-5M6 44h36"/><path d="M20.5 44v-7a3.5 3.5 0 0 1 7 0v7"/><circle cx="24" cy="24" r="2.5"/></svg>',
    rings: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.2"><circle cx="18" cy="29" r="11"/><circle cx="30" cy="29" r="11"/><path d="M14 13l4-5 4 5-4 3.5z"/></svg>',
    glass: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M12 6h10l-1 12a4 4 0 0 1-8 0zM17 22v17M12 41h10M26 6h10l-1 12a4 4 0 0 1-8 0zM31 22v17M26 41h10M13 13h8M27 13h8"/><path d="M22 4l2-2M26 4l-2-2"/></svg>',
    cake: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M8 42h32V26H8zM12 26v-8h24v8M8 32c4 3 8 3 12 0s8-3 12 0 6 2 8 0M18 18v-6M24 18v-6M30 18v-6"/><path d="M18 9c-1-2 0-3 0-4 1 1 2 2 0 4zM24 9c-1-2 0-3 0-4 1 1 2 2 0 4zM30 9c-1-2 0-3 0-4 1 1 2 2 0 4z"/></svg>',
    home: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M6 22L24 8l18 14M10 19v23h28V19M20 42V30h8v12"/></svg>',
    dove: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M6 26c8 0 12-4 16-10 2 6 8 8 14 6l6-6-2 8c-2 8-10 14-20 14-6 0-10-2-14-6zM22 16c-4-6-10-8-14-8 2 6 6 10 12 12"/><circle cx="37" cy="19" r="1"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 22s7-7 7-12a7 7 0 0 0-14 0c0 5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>'
  };

  function names() { var n = list(C.names); return n; }
  function namesPlain() { return names().join(" & "); }
  function namesHTML() {
    var n = names();
    if (n.length === 2) return esc(n[0]) + '<span class="amp">&amp;</span>' + esc(n[1]);
    return n.map(esc).join("<br>");
  }
  function dateText(d) {
    return lang === "en" ? UI.en.months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear()
      : d.getDate() + " " + u("monthsGen")[d.getMonth()] + " " + d.getFullYear();
  }
  var mono = C.monogram || names().map(function (x) { return x.charAt(0); }).join("&");

  /* ---------- Բաժիններ ---------- */
  function sCover() {
    var sp = "";
    for (var i = 0; i < 22; i++) {
      sp += '<i style="left:' + (Math.random() * 100).toFixed(1) + "%;top:" + (Math.random() * 100).toFixed(1) + "%;--s:" + (1.5 + Math.random() * 2.5).toFixed(1) +
        "px;--d:" + (3 + Math.random() * 4).toFixed(1) + "s;--dl:-" + (Math.random() * 6).toFixed(1) + 's"></i>';
    }
    return '<div class="cover" id="cover" data-env="' + envType + '"><div class="sparkles">' + sp + "</div>" +
      '<div class="stage" id="stage"></div>' +
      '<div class="e-top"><div class="e-kicker">' + esc(t(C.label)) + '</div><div class="e-names foil">' + esc(namesPlain()) + '</div><div class="e-date">' +
      pad(date.getDate()) + " · " + pad(date.getMonth() + 1) + " · " + date.getFullYear() + "</div></div>" +
      '<button class="seal" id="seal" aria-label="' + esc(u("tap")) + '">' + sealSVG(mono) + "</button>" +
      '<div class="e-bottom">' + (t(GUEST) ? '<div class="e-to">' + esc(C.dear != null ? t(C.dear) : u("dear")) + "<b>" + esc(t(GUEST)) + "</b></div>" : "") +
      (PREVIEW ? "" : '<div class="e-hint">' + esc(u("tap")) + "</div>") + "</div></div>";
  }

  function sHero() {
    var sub = t(C.subtitle);
    return '<header class="hero"><div class="frame"><span class="c tl">' + cornerSVG() + '</span><span class="c tr">' + cornerSVG() +
      '</span><span class="c bl">' + cornerSVG() + '</span><span class="c br">' + cornerSVG() + "</span></div>" +
      '<div class="wrap"><div class="crest rv">' + crest(mono) + "</div>" +
      '<div class="kicker rv d1">' + esc(t(C.label)) + "</div>" +
      '<h1 class="names foil rv d2">' + namesHTML() + "</h1>" +
      (sub ? '<div class="sub rv d2">' + esc(sub) + "</div>" : "") +
      '<div class="date-month rv d3">' + esc(u("months")[date.getMonth()]) + "</div>" +
      '<div class="date-row rv d3"><span class="side">' + esc(u("wdl")[date.getDay()]) + '</span><span class="day foil">' + pad(date.getDate()) +
      '</span><span class="side">' + pad(date.getHours()) + ":" + pad(date.getMinutes()) + "</span></div>" +
      '<div class="date-year rv d3">' + date.getFullYear() + "</div>" +
      (C.photo ? '<div class="arch rv d4"><img src="' + esc(C.photo) + '" alt="" loading="eager"></div>' : "") +
      '<div><div class="scroll-cue rv d4">' + esc(u("scroll")) + "<i></i></div></div></div></header>";
  }

  function sLetter() {
    var p = C.parents;
    return '<section class="letter"><div class="wrap">' + orn("rv") +
      '<h2 class="h2 foil rv">' + esc(t(C.greeting) || "") + "</h2>" +
      '<p class="body rv d1">' + esc(t(C.text) || "") + "</p>" +
      (p ? '<div class="parents rv d2"><div><div class="kicker">' + esc(u("groomP")) + "</div><div>" + esc(t(p.groom)) + '</div></div><div><div class="kicker">' +
        esc(u("brideP")) + "</div><div>" + esc(t(p.bride)) + "</div></div></div>" : "") +
      '<div class="sign foil rv d2">' + esc(u("withLove")) + " " + esc(namesPlain()) + "</div></div></section>";
  }

  function sCalendar() {
    var y = date.getFullYear(), m = date.getMonth();
    var first = (new Date(y, m, 1).getDay() + 6) % 7, days = new Date(y, m + 1, 0).getDate();
    var cells = u("wd").map(function (w) { return '<div class="w">' + w + "</div>"; }).join("");
    for (var i = 0; i < first; i++) cells += "<div></div>";
    for (var d = 1; d <= days; d++) cells += '<div class="x' + (d === date.getDate() ? " on" : "") + '">' + d + "</div>";
    return '<section class="alt"><div class="wrap"><div class="kicker rv">' + esc(u("save")) + "</div>" +
      '<h2 class="h2 foil rv d1">' + esc(dateText(date)) + "</h2>" +
      '<div class="cal rv d2"><div class="m">' + esc(u("months")[m]) + " " + y + '</div><div class="g">' + cells + "</div></div>" +
      '<div class="kicker rv" style="margin-top:44px">' + esc(u("left")) + "</div>" +
      '<div class="cd rv d1" id="cd">' + ["days", "hours", "minutes", "seconds"].map(function (k) {
        return '<div><b class="foil" data-k="' + k + '">0</b><span>' + esc(u(k)) + "</span></div>";
      }).join("") + "</div></div></section>";
  }

  function sProgram() {
    if (!C.events || !C.events.length) return "";
    return '<section><div class="wrap">' + orn("rv") + '<h2 class="h2 foil rv">' + esc(u("program")) + "</h2>" +
      '<div class="tl">' + C.events.map(function (e) {
        return '<article class="ev rv"><div class="medal">' + (ICONS[e.icon] || ICONS.rings) + "</div>" +
          '<div class="time foil">' + esc(e.time) + "</div><h3>" + esc(t(e.title)) + "</h3>" +
          '<div class="place">' + esc(t(e.place)) + '</div><div class="addr">' + esc(t(e.address)) + "</div>" +
          (e.map ? '<a class="btn" target="_blank" rel="noopener" href="' + esc(e.map) + '">' + ICONS.pin + esc(u("map")) + "</a>" : "") + "</article>";
      }).join("") + "</div></div></section>";
  }

  function sDress() {
    if (!C.dresscode) return "";
    return '<section class="alt"><div class="wrap"><div class="kicker rv">Dress code</div><h2 class="h2 foil rv d1">' + esc(u("dress")) + "</h2>" +
      '<p class="lead rv d2">' + esc(t(C.dresscode.text)) + "</p>" +
      '<div class="sw rv d3">' + (C.dresscode.colors || []).map(function (c) { return '<i style="background:' + esc(c) + '"></i>'; }).join("") + "</div></div></section>";
  }

  function sGallery() {
    var g = Array.isArray(C.gallery) ? C.gallery.filter(Boolean) : [];
    if (!g.length) return "";
    return '<section><div class="wrap">' + orn("rv") + '<h2 class="h2 foil rv">' + esc(u("gallery")) + "</h2>" +
      '<div class="gal rv d1">' + g.map(function (src) { return '<figure><img src="' + esc(src) + '" alt="" loading="lazy"></figure>'; }).join("") + "</div>" +
      '<div class="gal-hint">← ' + esc(u("swipe")) + " →</div></div></section>";
  }

  function sTables() {
    if (!C.tables) return "";
    return '<section class="alt"><div class="wrap"><h2 class="h2 foil rv">' + esc(u("tables")) + "</h2>" +
      '<p class="lead rv d1">' + esc(u("tableLead")) + "</p>" +
      '<div class="form rv d2"><div class="fl" style="margin:0"><label for="tq">' + esc(u("name")) + '</label><input id="tq" type="search" autocomplete="off" enterkeyhint="search"></div>' +
      '<div class="tres" id="tres" aria-live="polite"></div></div></div></section>';
  }

  function sRsvp() {
    if (!C.rsvp) return "";
    var r = C.rsvp, dl = r.deadline ? new Date(r.deadline) : null;
    var dls = dl ? (lang === "en" ? UI.en.months[dl.getMonth()] + " " + dl.getDate() : dl.getDate() + " " + u("monthsGen")[dl.getMonth()]) : "";
    var sides = r.sides ? list(r.sides) : [];
    return '<section id="rsvp"><div class="wrap">' + orn("rv") + '<h2 class="h2 foil rv">' + esc(u("rsvp")) + "</h2>" +
      (dls ? '<p class="lead rv d1">' + esc(u("rsvpLead")) + " " + esc(dls) + "</p>" : "") +
      '<form class="form rv d2" id="rf">' +
      '<div class="fl"><label for="rn">' + esc(u("name")) + '</label><input id="rn" name="name" required autocomplete="name"></div>' +
      '<div class="fl pills"><label><input type="radio" name="attend" value="yes" checked><span>' + esc(u("yes")) + '</span></label><label><input type="radio" name="attend" value="no"><span>' + esc(u("no")) + "</span></label></div>" +
      '<div class="fl"><label for="rg">' + esc(u("guests")) + '</label><select id="rg" name="guests">' + [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) { return "<option>" + n + "</option>"; }).join("") + "</select></div>" +
      (sides.length ? '<div class="fl"><label for="rs">' + esc(u("side")) + '</label><select id="rs" name="side">' + sides.map(function (s) { return "<option>" + esc(s) + "</option>"; }).join("") + "</select></div>" : "") +
      '<div class="fl"><label for="rm">' + esc(u("note")) + '</label><textarea id="rm" name="note" rows="2"></textarea></div>' +
      '<button class="btn solid" type="submit">' + esc(u("send")) + "</button></form></div></section>";
  }

  function sFinal() {
    return '<section class="final alt"><div class="wrap"><div class="crest rv" style="width:84px;height:84px;margin:0 auto 14px;color:var(--accent)">' + crest(mono) + "</div>" +
      '<div class="kicker rv d1">' + esc(t(C.finalText) || u("waiting")) + "</div>" +
      '<div class="names foil rv d2">' + esc(namesPlain()) + "</div>" + orn("rv d3") + "</div></section>" +
      '<div class="made">' + (C.footer ? esc(t(C.footer)) + " · " : "") + '<a href="https://hravirir.am" target="_blank" rel="noopener">HRAVIRIR.AM</a></div>';
  }

  function sFabs() {
    if (PREVIEW) return "";
    var h = '<div class="fabs">';
    if (LANGS.length > 1) h += '<div class="langs glass">' + LANGS.map(function (l) {
      return '<button data-l="' + l + '" class="' + (l === lang ? "on" : "") + '" aria-label="' + l + '">' + { hy: "ՀԱՅ", ru: "РУС", en: "ENG" }[l] + "</button>";
    }).join("") + "</div>";
    if (C.music) h += '<button class="mbtn glass' + (music.on ? " on" : "") + '" id="mb" aria-label="music"><span class="eq"><i></i><i></i><i></i><i></i></span></button>';
    return h + "</div>";
  }
  function sDemo() {
    if (!C.demo || EMBED) return "";
    if (!window.HravirirOrder && !document.getElementById("ho-js")) { var os = document.createElement("script"); os.id = "ho-js"; os.src = "../order.js"; document.head.appendChild(os); }
    return '<div class="demo-pill glass"><a href="' + (C.demo.back || "../../index.html#designs") + '" aria-label="' + esc(u("back")) + '">←</a><a class="go" href="#" data-order="' +
      esc(C.demo.id || "") + '" data-name="' + esc(document.title) + '">' + esc(u("order")) + "</a></div>";
  }

  /* =====================================================================
     «EDITORIAL» ԴԱՍԱՎՈՐՈՒԹՅՈՒՆ (layout: "editorial")
     Լուսանկար ամբողջ էկրանով, մեծ գլխատառ վերնագրեր «ստվեր» բառերով,
     վայրերի գծանկարներ, ծրագրի բլոկ, Ladies / Gentlemen դրեսկոդ, կազմակերպչի կոնտակտ
     ===================================================================== */
  var ED = C.layout === "editorial";
  var UI2 = {
    hy: { locations: "Վայրեր", timing: "Ծրագիր", details: "Մանրամասներ", contact: "Հետադարձ կապ", mapBtn: "Քարտեզ", left2: "Տոնին մնացել է", invited: "invited", ladies: "Ladies", gents: "Gentlemen", church: "Եկեղեցի", hall: "Ռեստորան" },
    ru: { locations: "Локации", timing: "Тайминг", details: "Детали", contact: "Связь", mapBtn: "Карта", left2: "До праздника осталось", invited: "invited", ladies: "Ladies", gents: "Gentlemen", church: "Церковь", hall: "Ресторан" },
    en: { locations: "Locations", timing: "Timing", details: "Details", contact: "Contact", mapBtn: "Map", left2: "Counting down", invited: "invited", ladies: "Ladies", gents: "Gentlemen", church: "Church", hall: "Reception" }
  };
  function u2(k) { return (UI2[lang] || UI2.hy)[k]; }
  function head(ghost, title) {
    return '<div class="sec-head rv"><span class="ghost" aria-hidden="true">' + esc(ghost) + '</span><h2 class="cap">' + esc(title) + "</h2></div>";
  }
  // Գծանկարներ (hravirir.am-ի սեփական)
  var ART = {
    church: '<svg viewBox="0 0 200 130" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M8 126H192"/><path d="M100 4v14M95 9h10"/><path d="M80 40L100 18l20 22"/><path d="M83 40v22h34V40"/>' +
      '<path d="M89 58v-9a3 3 0 0 1 6 0v9M105 58v-9a3 3 0 0 1 6 0v9"/><path d="M52 74l48-14 48 14"/><path d="M56 74v52h88V74"/>' +
      '<path d="M91 126v-20a9 9 0 0 1 18 0v20"/><path d="M66 104V90a5 5 0 0 1 10 0v14M124 104V90a5 5 0 0 1 10 0v14"/><path d="M96 84a4 4 0 0 1 8 0v6h-8z"/>' +
      '<path d="M22 92l17-12 17 12M25 92v34h31"/><path d="M178 92l-17-12-17 12M175 92v34h-31"/><path d="M34 112v-8a3 3 0 0 1 6 0v8M160 112v-8a3 3 0 0 1 6 0v8"/>' +
      '<path d="M56 80h88M83 46h34" opacity=".5"/><path d="M39 80V72M161 80V72M37 74h4M159 74h4"/></svg>',
    hall: '<svg viewBox="0 0 200 130" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M8 126H192M24 122h152M30 118h140"/><path d="M14 58L100 26l86 32z"/><circle cx="100" cy="46" r="6"/><path d="M20 58h160v6H20z"/>' +
      '<path d="M36 64v54M52 64v54M68 64v54M132 64v54M148 64v54M164 64v54"/><path d="M33 68h6M49 68h6M65 68h6M129 68h6M145 68h6M161 68h6M33 114h6M49 114h6M65 114h6M129 114h6M145 114h6M161 114h6"/>' +
      '<path d="M84 118V90a16 16 0 0 1 32 0v28"/><path d="M100 74v44" opacity=".5"/><path d="M22 118V64M178 118V64"/><path d="M40 80h8v14h-8zM152 80h8v14h-8z" opacity=".6"/></svg>',
    home: '<svg viewBox="0 0 200 130" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M8 126H192"/><path d="M40 70L100 30l60 40"/><path d="M50 64v62h100V64"/><path d="M88 126V96h24v30"/><path d="M62 82h16v16H62zM122 82h16v16h-16z"/>' +
      '<path d="M70 82v16M62 90h16M130 82v16M122 90h16"/><path d="M130 48V34h10v20"/><path d="M20 126c0-14 6-22 12-22s12 8 12 22M168 126c0-12 5-18 10-18s10 6 10 18" opacity=".6"/></svg>'
  };
  function roses(cls) {
    function rose(x, y, s) {
      return '<g transform="translate(' + x + " " + y + ") scale(" + s + ')"><path d="M0-15C11-15 15-4 11 5C7 13-7 13-11 5C-15-4-9-13 0-9C7-7 7 2 0 3C-5 3-5-3 0-3"/>' +
        '<path d="M-11 5C-18 2-18-9-9-14M11 5C18 1 17-10 8-15"/></g>';
    }
    function leaf(x, y, r) { return '<g transform="translate(' + x + " " + y + ") rotate(" + r + ')"><path d="M0 0C8-9 22-9 30 0C22 9 8 9 0 0zM0 0H30"/></g>'; }
    return '<svg class="roses ' + (cls || "") + '" viewBox="0 0 170 170" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true">' +
      '<path d="M10 160C40 120 70 90 160 60M60 110C70 80 90 60 120 40"/>' + rose(120, 52, 1.5) + rose(64, 104, 1.1) + rose(150, 100, .9) +
      leaf(30, 138, -40) + leaf(90, 86, -60) + leaf(96, 80, 10) + leaf(140, 70, -20) + leaf(40, 124, 30) + leaf(130, 110, 40) + "</svg>";
  }
  var WA = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3z"/></svg>';

  function eHero() {
    var n = names();
    return '<header class="e-hero"' + (C.photo ? ' style="background-image:url(\'' + esc(C.photo) + '\')"' : "") + '><div class="e-hero-top">' +
      '<span class="ghost amp" aria-hidden="true">&amp;</span><h1 class="e-hn rv">' + n.map(esc).join("<br>") + "</h1></div>" +
      '<div class="e-hero-bottom rv d2"><div class="kicker">' + esc(t(C.label)) + '</div><div class="e-hd">' + pad(date.getDate()) + " · " + pad(date.getMonth() + 1) + " · " + date.getFullYear() + "</div></div></header>";
  }
  function eText() {
    var y = date.getFullYear(), m = date.getMonth();
    var first = (new Date(y, m, 1).getDay() + 6) % 7, days = new Date(y, m + 1, 0).getDate();
    var cells = u("wd").map(function (w) { return '<div class="w">' + w + "</div>"; }).join("");
    for (var i = 0; i < first; i++) cells += "<div></div>";
    for (var d = 1; d <= days; d++) {
      cells += d === date.getDate()
        ? '<div class="x on">' + d + '<svg viewBox="0 0 60 56" aria-hidden="true"><path d="M30 52C12 40 3 30 4 18 5 8 14 3 22 5c4 1 7 4 8 8 2-5 6-8 11-8 9 0 15 7 14 16-1 12-12 22-25 31z" fill="none" stroke-width="1.4"/></svg></div>'
        : '<div class="x">' + d + "</div>";
    }
    return '<section class="e-text"><div class="wrap"><h2 class="cap rv">' + esc(t(C.greeting) || "") + '</h2><p class="e-p rv d1">' + esc(t(C.text) || "") + "</p>" +
      '<div class="e-cal rv d2"><div class="e-cal-h"><span>' + esc(u("months")[m]) + "</span><span>" + y + '</span></div><div class="g">' + cells + "</div></div></div></section>";
  }
  function eLocations() {
    if (!C.events || !C.events.length) return "";
    var homes = 0;
    return '<section class="e-loc"><div class="wrap">' + head("LOCATIONS", u2("locations")) + C.events.map(function (e) {
      var kind = e.art || (e.icon === "church" ? "church" : e.icon === "home" ? "home" : "hall");
      // մատիտային գծանկարներ (core/sketch.js), եթե միացված է, հակառակ դեպքում՝ պարզ ART
      var art = window.MonoSketch ? window.MonoSketch(kind === "home" ? (homes++ ? "house2" : "house") : kind) : ART[kind];
      return '<article class="loc rv"><h3 class="cap">' + esc(t(e.title)) + '</h3><div class="pl">' + esc(t(e.place)) + "</div>" +
        (e.address ? '<div class="ad">' + esc(t(e.address)) + (e.time ? " · " + esc(e.time) : "") + "</div>" : "") +
        '<div class="art">' + art + "</div>" +
        (e.map ? '<a class="sqbtn" target="_blank" rel="noopener" href="' + esc(e.map) + '">' + esc(u2("mapBtn")) + "</a>" : "") + "</article>";
    }).join("") + "</div></section>";
  }
  function eTiming() {
    var tm = C.timing || (C.events || []).map(function (e) { return { time: e.time, text: e.title }; });
    if (!tm.length) return "";
    return '<section class="e-timing">' + roses("r1") + roses("r2") + '<div class="wrap"><div class="gbox rv"><h2 class="gbox-t">TIMING</h2>' +
      tm.map(function (r) { return '<div class="trow"><b>' + esc(r.time) + "</b><span>– " + esc(t(r.text)) + "</span></div>"; }).join("") + "</div></div></section>";
  }
  function eDress() {
    var dc = C.dresscode; if (!dc) return "";
    var ph = (dc.photos || []).filter(Boolean);
    return '<section class="e-dress"><div class="wrap">' + head("DRESS CODE", u("dress")) +
      '<div class="strips rv">' + (dc.colors || []).map(function (c) { return '<i style="background:' + esc(c) + '"></i>'; }).join("") + "</div>" +
      (dc.text ? '<p class="e-p rv">' + esc(t(dc.text)) + "</p>" : "") +
      (dc.ladies ? '<div class="who rv"><div class="scr">' + esc(u2("ladies")) + '</div><p class="e-p">' + esc(t(dc.ladies)) + "</p></div>" : "") +
      (dc.gents ? '<div class="who rv"><div class="scr">' + esc(u2("gents")) + '</div><p class="e-p">' + esc(t(dc.gents)) + "</p></div>" : "") +
      (ph.length ? '<div class="looks rv">' + ph.map(function (s) { return '<img src="' + esc(s) + '" alt="" loading="lazy">'; }).join("") + "</div>" : "") +
      "</div></section>";
  }
  function eRsvp() {
    if (!C.rsvp) return "";
    var r = C.rsvp, dl = r.deadline ? new Date(r.deadline) : null;
    var dls = dl ? (lang === "en" ? UI.en.months[dl.getMonth()] + " " + dl.getDate() : u("monthsGen")[dl.getMonth()] + " " + dl.getDate() + (lang === "hy" ? "-ը" : "")) : "";
    var sides = r.sides ? list(r.sides) : [];
    return '<section class="e-rsvp" id="rsvp">' + roses("r1") + '<div class="wrap"><div class="gbox rv"><div class="rsvp-t">RSVP<span>' + esc(u2("invited")) + "</span></div>" +
      '<p class="gbox-p">' + esc(u("rsvpLead")) + (dls ? " " + esc(dls) : "") + "</p>" +
      '<form id="rf" class="gform"><input name="name" required autocomplete="name" placeholder="' + esc(u("name")) + '" aria-label="' + esc(u("name")) + '">' +
      '<div class="gradio"><label><input type="radio" name="attend" value="yes" checked><span>' + esc(u("yes")) + '</span></label><label><input type="radio" name="attend" value="no"><span>' + esc(u("no")) + "</span></label></div>" +
      '<select name="guests" aria-label="' + esc(u("guests")) + '">' + [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) { return "<option value=\"" + n + "\">" + esc(u("guests")) + ": " + n + "</option>"; }).join("") + "</select>" +
      (sides.length ? '<select name="side" aria-label="' + esc(u("side")) + '">' + sides.map(function (s) { return "<option>" + esc(s) + "</option>"; }).join("") + "</select>" : "") +
      '<input name="note" placeholder="' + esc(u("note")) + '" aria-label="' + esc(u("note")) + '">' +
      '<button type="submit">' + esc(u("send")) + "</button></form></div></div></section>";
  }
  function eDetails() {
    if (!C.details) return "";
    return '<section class="e-details"><div class="wrap">' + head("DETAILS", u2("details")) +
      list(C.details).map(function (p) { return '<p class="e-p rv">' + esc(p) + "</p>"; }).join("") + "</div></section>";
  }
  function eCountdown() {
    return '<section class="e-cdp"' + (C.countdownPhoto ? ' style="background-image:url(\'' + esc(C.countdownPhoto) + '\')"' : "") + '><div class="wrap">' +
      '<h2 class="cap rv">' + esc(u2("left2")) + '</h2><div class="e-cd rv d1" id="cd">' +
      ["days", "hours", "minutes", "seconds"].map(function (k, i) {
        return (i ? '<i>:</i>' : "") + '<div><b data-k="' + k + '">00</b><span>' + esc(u(k)) + "</span></div>";
      }).join("") + "</div></div></section>";
  }
  function eContact() {
    var c = C.contact; if (!c) return "";
    return '<section class="e-contact"><div class="wrap"><h2 class="cap rv">' + esc(u2("contact")) + "</h2>" +
      (c.text ? '<p class="e-p rv d1">' + esc(t(c.text)) + "</p>" : "") +
      '<div class="cname rv d2">' + esc(t(c.name)) + "</div>" +
      '<div class="clinks rv d2">' + (c.whatsapp ? '<a href="https://wa.me/' + esc(c.whatsapp) + '" target="_blank" rel="noopener" aria-label="WhatsApp">' + WA + "</a>" : "") +
      (c.phone ? '<a href="tel:' + esc(c.phone) + '" aria-label="phone"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg></a>' : "") +
      "</div></div></section>";
  }
  function eFinal() {
    return '<section class="e-final"><div class="wrap"><div class="kicker rv">' + esc(t(C.finalText) || u("waiting")) + '</div><div class="e-fn rv d1">' + esc(namesPlain()) + "</div></div></section>" +
      '<div class="made"><a href="https://hravirir.am" target="_blank" rel="noopener">HRAVIRIR.AM</a></div>';
  }
  if (ED) document.body.setAttribute("data-layout", "editorial");

  /* ---------- Հավաքում ---------- */
  var opened = C.cover === false;
  function render() {
    document.documentElement.lang = lang;
    document.title = namesPlain() + " — " + t(C.label);
    var map = ED
      ? { hero: eHero, text: eText, locations: eLocations, timing: eTiming, dress: eDress, gallery: sGallery, tables: sTables, rsvp: eRsvp, details: eDetails, countdown: eCountdown, contact: eContact, final: eFinal }
      : { hero: sHero, text: sLetter, calendar: sCalendar, program: sProgram, dress: sDress, gallery: sGallery, tables: sTables, rsvp: sRsvp, final: sFinal };
    var order = C.sections || (ED
      ? ["hero", "text", "locations", "timing", "dress", "gallery", "tables", "rsvp", "details", "countdown", "contact", "final"]
      : ["hero", "text", "calendar", "program", "dress", "gallery", "tables", "rsvp", "final"]);
    var app = document.getElementById("invite");
    app.innerHTML = (opened ? "" : sCover()) + order.map(function (k) { return map[k] ? map[k]() : ""; }).join("") + (opened ? sDemo() : "") + sFabs();
    document.body.classList.toggle("locked", !opened);
    bind();
  }

  var timer;
  function tick() {
    var el = document.getElementById("cd"); if (!el) return;
    var diff = Math.max(0, date - new Date());
    var v = { days: Math.floor(diff / 864e5), hours: Math.floor(diff / 36e5) % 24, minutes: Math.floor(diff / 6e4) % 60, seconds: Math.floor(diff / 1e3) % 60 };
    el.querySelectorAll("b").forEach(function (b) { b.textContent = ED ? pad(v[b.dataset.k]) : v[b.dataset.k]; });
  }
  var io;
  function reveal() {
    if (io) io.disconnect();
    var els = document.querySelectorAll(".rv");
    if (!("IntersectionObserver" in window)) { els.forEach(function (e) { e.classList.add("in"); }); return; }
    io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }); }, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });
    els.forEach(function (e) { io.observe(e); });
  }

  function openEnvelope() {
    var cover = document.getElementById("cover");
    if (!cover || cover.classList.contains("opening")) return;
    if (C.music) music.play();
    var flap = envType !== "doors" && envType !== "diamond";
    var steps = flap
      ? [[0, "opening"], [300, "shrink"], [300, "open"], [850, "behind"], [1300, "out"], [2900, "end"]]
      : [[0, "opening"], [300, "shrink"], [300, "open"], [1700, "out"], [2900, "end"]];
    steps.forEach(function (s) {
      setTimeout(function () {
        if (s[1] !== "end") { cover.classList.add(s[1]); return; }
        opened = true; cover.classList.add("gone"); document.body.classList.remove("locked");
        document.getElementById("invite").insertAdjacentHTML("beforeend", sDemo());
        reveal();
        setTimeout(function () { cover.remove(); }, 1100);
      }, s[0]);
    });
    if (envType === "confetti") confetti(cover);
  }
  function confetti(cover) {
    var cols = ["var(--g1)", "var(--g2)", "var(--g3)", "var(--g4)", "var(--g5)"], h = "";
    for (var i = 0; i < 70; i++) {
      var a = Math.random() * Math.PI * 2, r = 180 + Math.random() * 320;
      h += '<i style="background:' + cols[i % 5] + ";--x:" + Math.round(Math.cos(a) * r) + "px;--y:" + Math.round(Math.sin(a) * r - 120) + "px;--r:" +
        Math.round(Math.random() * 720) + "deg;animation-delay:" + (Math.random() * .25).toFixed(2) + 's"></i>';
    }
    cover.insertAdjacentHTML("beforeend", '<div class="confetti">' + h + "</div>");
  }
  var rsz;
  window.addEventListener("resize", function () { clearTimeout(rsz); rsz = setTimeout(buildEnvelope, 150); });

  function bind() {
    var seal = document.getElementById("seal");
    if (seal) { buildEnvelope(); if (!PREVIEW) seal.onclick = openEnvelope; }
    clearInterval(timer); tick(); timer = setInterval(tick, 1000);
    if (opened) reveal();

    document.querySelectorAll(".langs button").forEach(function (b) {
      b.onclick = function () {
        if (b.dataset.l === lang) { b.parentNode.classList.toggle("open"); return; }
        lang = b.dataset.l; try { localStorage.setItem("inv-lang", lang); } catch (e) {}
        var y = window.scrollY; render(); window.scrollTo(0, y);
        document.querySelectorAll(".rv").forEach(function (e) { e.classList.add("in"); });
      };
    });
    var mb = document.getElementById("mb");
    if (mb) mb.onclick = function () { music.on ? music.stop() : music.play(); };

    var tq = document.getElementById("tq");
    if (tq) tq.oninput = function () {
      var q = tq.value.trim().toLowerCase(), out = document.getElementById("tres");
      if (q.length < 2) { out.innerHTML = ""; return; }
      var hits = [];
      C.tables.forEach(function (tb) { tb.guests.forEach(function (g) { if (g.toLowerCase().indexOf(q) > -1) hits.push({ g: g, n: tb.table }); }); });
      out.innerHTML = hits.length ? hits.slice(0, 4).map(function (h) {
        return '<div style="margin-bottom:14px"><div class="who">' + esc(h.g) + '</div><div class="num foil">' + esc(u("table")) + " " + esc(h.n) + "</div></div>";
      }).join("") : '<div class="who">' + esc(u("notFound")) + "</div>";
    };

    var f = document.getElementById("rf");
    if (f) f.onsubmit = function (ev) {
      ev.preventDefault();
      var fd = new FormData(f), data = {};
      fd.forEach(function (v, k) { data[k] = v; });
      data.invite = namesPlain();
      var btn = f.querySelector("button"); btn.disabled = true;
      var done = function () { f.outerHTML = '<div class="form thanks"><div class="script foil">' + esc(u("thanks")) + "</div><p class=\"lead\">" + esc(u("thanksText")) + "</p></div>"; };
      var r = C.rsvp;
      if (r.endpoint) fetch(r.endpoint, { method: "POST", mode: "no-cors", body: new URLSearchParams(data) }).then(done, done);
      else if (r.whatsapp && !C.demo) {
        var msg = data.invite + "\n" + data.name + " — " + (data.attend === "yes" ? u("yes") : u("no")) + "\n" + u("guests") + ": " + data.guests + (data.side ? "\n" + data.side : "") + (data.note ? "\n" + data.note : "");
        window.open("https://wa.me/" + r.whatsapp + "?text=" + encodeURIComponent(msg), "_blank"); done();
      } else done();
    };
  }

  /* ---------- Երաժշտություն ---------- */
  var music = {
    on: false, audio: null, ctx: null, loop: null,
    btn: function () { var b = document.getElementById("mb"); if (b) b.classList.toggle("on", this.on); },
    play: function () {
      this.on = true;
      if (typeof C.music === "string") { this.audio = this.audio || new Audio(C.music); this.audio.loop = true; this.audio.play().catch(function () {}); }
      else this.synth();
      this.btn();
    },
    stop: function () {
      this.on = false;
      if (this.audio) this.audio.pause();
      if (this.ctx) { clearTimeout(this.loop); this.ctx.close(); this.ctx = null; }
      this.btn();
    },
    // Օրինակների համար՝ փափուկ «երաժշտական տուփ», իրական հրավերում դրվում է mp3
    synth: function () {
      var AC = window.AudioContext || window.webkitAudioContext; if (!AC || this.ctx) return;
      var ctx = this.ctx = new AC(), self = this;
      var notes = [72, 76, 79, 84, 79, 76, 71, 74, 79, 83, 79, 74, 69, 72, 76, 81, 76, 72, 65, 69, 72, 77, 72, 69];
      function hz(n) { return 440 * Math.pow(2, (n - 69) / 12); }
      (function bar() {
        if (!self.ctx) return;
        var t0 = ctx.currentTime + 0.05;
        notes.forEach(function (n, i) {
          var o = ctx.createOscillator(), g = ctx.createGain(), s = t0 + i * 0.34;
          o.type = "sine"; o.frequency.value = hz(n);
          g.gain.setValueAtTime(0, s); g.gain.linearRampToValueAtTime(0.07, s + 0.02); g.gain.exponentialRampToValueAtTime(0.0008, s + 1.6);
          o.connect(g); g.connect(ctx.destination); o.start(s); o.stop(s + 1.7);
        });
        self.loop = setTimeout(bar, notes.length * 340);
      })();
    }
  };

  render();
})();

/* «Նշումների ռեժիմ»՝ հղման վերջում ?nshum */
(function () { if (/nshum/.test(location.search + location.hash) && !/preview/.test(location.search)) { var s = document.createElement("script"); s.src = "../core/review.js?v=4"; document.head.appendChild(s); } })();
