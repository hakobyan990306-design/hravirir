/* =====================================================================
   «Pro» շարքի ընդհանուր բաժինները (silk-bow, olive-seal, noir-rings, polaroid,
   mono-walk, editorial, nur, terra)։ Ամեն դիզայն տալիս է իր բացումը, իր CSS-ը
   և բաժինների հերթականությունը, իսկ այստեղ միայն HTML կառուցողներն են։
   ===================================================================== */
(function () {
  "use strict";
  var K = window.K, C = K.C, esc = K.esc, t = K.t, u = K.u;
  var BASE = {
    hy: { inv: "Սիրով հրավիրում ենք Ձեզ մեր հարսանիքին", invite: "Հարսանյաց հրավեր", dear: "Սիրելի՛ բարեկամներ և ընկերներ", program: "Օրվա ծրագիր", dress: "Դրեսկոդ", left: "Հարսանիքին մնացել է",
      rsvp: "Հարցաթերթիկ", rsvpLead: "Խնդրում ենք պատասխանել մինչև", fin: "Սիրով սպասում ենք Ձեզ", how: "Ինչպես հասնել", save: "Save the Date", place: "Վայրը", open: "Բացել",
      wdl: ["Կիրակի", "Երկուշաբթի", "Երեքշաբթի", "Չորեքշաբթի", "Հինգշաբթի", "Ուրբաթ", "Շաբաթ"] },
    ru: { inv: "С любовью приглашаем вас на нашу свадьбу", invite: "Свадебное приглашение", dear: "Дорогие родные и друзья", program: "Программа дня", dress: "Дресс-код", left: "До свадьбы осталось",
      rsvp: "Анкета", rsvpLead: "Пожалуйста, ответьте до", fin: "С любовью ждём вас", how: "Как добраться", save: "Save the Date", place: "Место", open: "Открыть",
      wdl: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"] },
    en: { inv: "We joyfully invite you to our wedding", invite: "Wedding invitation", dear: "Dear family and friends", program: "Schedule", dress: "Dress code", left: "Counting down",
      rsvp: "RSVP", rsvpLead: "Kindly reply by", fin: "With love", how: "Directions", save: "Save the Date", place: "Venue", open: "Open",
      wdl: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] }
  };
  var OVER = {};
  var P = {
    // դիզայնի սեփական տեքստերը՝ բազայի վրա
    texts: function (o) { OVER = o || {}; },
    x: function (k) { var L = K.lang, o = OVER[L] || OVER.hy || {}; return o[k] != null ? o[k] : (BASE[L] || BASE.hy)[k]; },
    // եթե հրավերում կա C.engagement/տեսակը, «Հարսանիքին» → «Նշանդրեքին»
    ini: function (sep) { var n = K.list(C.names && (C.names.hy || C.names)); return (n[0] || "").charAt(0) + (sep == null ? "" : sep) + (n[1] ? n[1].charAt(0) : ""); },
    d2: function (n) { return (n < 10 ? "0" : "") + n; },
    dots: function (sep) { var d = K.date; return P.d2(d.getDate()) + (sep || ".") + P.d2(d.getMonth() + 1) + (sep || ".") + d.getFullYear(); },
    // անուններ. kind = "stack" (իրար տակ) | "line" (մեկ տողում)
    names: function (cls, amp) {
      var n = K.names();
      return '<h1 class="nm ' + (cls || "") + '"><span class="n1">' + esc(n[0] || "") + '</span><span class="amp">' + (amp || "&amp;") + '</span><span class="n2">' + esc(n[1] || "") + "</span></h1>";
    },
    // տեքստը (\n → <br>)
    text: function (v) { return esc(t(v == null ? C.text : v)).replace(/\n/g, "<br>"); },
    // ամբողջ ամսվա օրացույց
    month: function (cls, mark) {
      return '<div class="cal ' + (cls || "") + ' rv"><div class="cal-h">' + esc(u("months")[K.date.getMonth()]) + '</div><div class="cal-y">' + K.date.getFullYear() + '</div><div class="cal-g">' + K.calendarCells(mark) + "</div></div>";
    },
    // միայն այդ շաբաթը (երկուշաբթի → կիրակի)
    week: function (cls) {
      var d0 = K.date, s = new Date(d0), wd = (d0.getDay() + 6) % 7; s.setDate(d0.getDate() - wd);
      var h = "", w = u("wd");
      for (var i = 0; i < 7; i++) { var d = new Date(s); d.setDate(s.getDate() + i); h += '<div class="wk-d' + (i === wd ? " on" : "") + '"><i>' + esc(w[i]) + "</i><b>" + d.getDate() + "</b></div>"; }
      return '<div class="wk ' + (cls || "") + ' rv"><div class="cal-h">' + esc(u("months")[d0.getMonth()]) + '</div><div class="wk-g">' + h + "</div></div>";
    },
    cd: function (cls) {
      return '<div class="cdn ' + (cls || "") + ' rv" data-cd>' + ["days", "hours", "minutes", "seconds"].map(function (k, i) {
        return (i ? '<i class="cs"></i>' : "") + '<div><b data-k="' + k + '">00</b><span>' + esc(u(k)) + "</span></div>";
      }).join("") + "</div>";
    },
    // ծրագիր. kind = "cards" | "list" | "line"; icon = K.evIcon ոճը կամ false
    program: function (kind, icon) {
      var ev = C.events || [];
      return '<div class="prg prg-' + kind + '">' + ev.map(function (e, i) {
        var ic = icon ? '<div class="pic ico">' + K.evIcon(e, icon) + "</div>" : "";
        var b = e.map ? '<a class="btn" href="' + esc(e.map) + '" target="_blank" rel="noopener">' + esc(P.x("how")) + "</a>" : "";
        if (kind === "list") return '<div class="ev rv"><div class="tm">' + esc(e.time) + '</div><div class="bd"><div class="t">' + esc(t(e.title)) + "</div>" + (e.place ? '<div class="n">' + esc(t(e.place)) + "</div>" : "") + '<div class="a">' + esc(t(e.address)) + "</div>" + b + "</div></div>";
        if (kind === "line") return '<div class="ev rv"><div class="dot"></div><div class="tm">' + esc(e.time) + '</div><div class="t">' + esc(t(e.title)) + "</div>" + (e.place ? '<div class="n">' + esc(t(e.place)) + "</div>" : "") + '<div class="a">' + esc(t(e.address)) + "</div>" + b + "</div>";
        return '<div class="ev rv">' + ic + '<div class="t">' + esc(t(e.title)) + '</div><div class="tm">' + esc(e.time) + "</div>" + (e.place ? '<div class="n">' + esc(t(e.place)) + "</div>" : "") + '<div class="a">' + esc(t(e.address)) + "</div>" + b + "</div>";
      }).join("") + "</div>";
    },
    dress: function (h2) {
      if (!C.dresscode) return "";
      return '<h2 class="' + (h2 || "h2") + ' rv">' + esc(P.x("dress")) + '</h2><p class="p rv">' + esc(t(C.dresscode.text)) + '</p><div class="dots rv">' +
        (C.dresscode.colors || []).map(function (c) { return '<i style="background:' + esc(c) + '"></i>'; }).join("") + "</div>";
    },
    rsvp: function (h2) {
      if (!C.rsvp) return "";
      return '<h2 class="' + (h2 || "h2") + ' rv">' + esc(P.x("rsvp")) + '</h2><p class="p rv">' + esc(P.x("rsvpLead")) + " " + esc(K.deadline()) + "</p>" +
        '<form class="rs rv" id="rf"><label class="radio"><input type="radio" name="attend" value="yes" checked>' + esc(u("yes")) + "</label>" +
        '<label class="radio"><input type="radio" name="attend" value="no">' + esc(u("no")) + "</label>" +
        '<div class="fl"><label for="rn">' + esc(u("name")) + '</label><input id="rn" name="name" required autocomplete="name"></div>' +
        '<div class="fl"><label for="rg">' + esc(u("guests")) + '</label><select id="rg" name="guests">' + [1, 2, 3, 4, 5, 6].map(function (i) { return "<option>" + i + "</option>"; }).join("") + "</select></div>" +
        '<button class="btn fill" type="submit">' + esc(u("send")) + "</button></form>";
    },
    sec: function (cls, inner) { return '<section class="' + (cls || "") + '"><div class="wrap">' + inner + "</div></section>"; },
    made: function () { return '<div class="made"><a href="https://hravirir.am" target="_blank" rel="noopener">HRAVIRIR.AM</a></div>'; },
    // render/բացում. o.env() → բացման HTML, o.main() → բաժիններ, o.steps = [[ms, "class"], …], o.done = ms, o.after(env)
    run: function (o) {
      var opened = false;
      function render() {
        document.documentElement.lang = K.lang;
        document.title = K.names().join(" & ");
        document.getElementById("app").innerHTML = (opened ? "" : o.env()) + "<main>" + o.main() + "</main>" + (opened ? K.chrome() : "");
        document.body.classList.toggle("locked", !opened);
        if (!opened) { var e = document.getElementById("env"); if (e && !K.PREVIEW) e.onclick = open; if (o.ready) o.ready(e); } else K.reveal();
        K.countdown(true); K.rsvp(document.getElementById("rf")); K.bindChrome(render);
        if (o.post) o.post();
      }
      function open(ev) {
        var env = document.getElementById("env"); if (!env || env.dataset.busy) return;
        if (o.guard && !o.guard(ev)) return;
        env.dataset.busy = "1"; K.music.play();
        (o.steps || []).forEach(function (s) { setTimeout(function () { env.classList.add(s[1]); }, s[0]); });
        setTimeout(function () {
          opened = true; document.body.classList.remove("locked"); scrollTo(0, 0);
          document.getElementById("app").insertAdjacentHTML("beforeend", K.chrome()); K.bindChrome(render); K.reveal();
        }, o.done || 2400);
        setTimeout(function () { env.remove(); }, (o.done || 2400) + 900);
      }
      render();
    }
  };
  window.P = P;
})();
