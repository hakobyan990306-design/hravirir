/* «Նուար» — hravirir.am-ի լուսանկարային հրավերը գեղագիր տառերով (օր.՝ saro-diana).
   տեքստը և մեծ սև-սպիտակ նկարները հերթափոխվում են */
(function () {
  "use strict";
  var K = window.K, C = K.C, esc = K.esc, t = K.t, u = K.u, pad = K.pad;
  var TXT = {
    hy: { inv: "Սիրով հրավիրում ենք Ձեզ՝", plan: "Օրվա ծրագիր", how: "Ինչպես հասնել", left: "Հարսանիքին մնացել է", love: "Սիրով՝", and: "և", y: "թ.",
      rsvp: "Հարցաթերթիկ", rsvpLead: "Խնդրում ենք պատասխանել մինչև", share: "Կիսվել հղումով", made: "Հրավիրատոմսը ստեղծվել է", by: "-ի կողմից" },
    ru: { inv: "С любовью приглашаем вас", plan: "Программа дня", how: "Как добраться", left: "До свадьбы осталось", love: "С любовью,", and: "и", y: "г.",
      rsvp: "Анкета", rsvpLead: "Пожалуйста, ответьте до", share: "Поделиться ссылкой", made: "Приглашение создано", by: "" },
    en: { inv: "We invite you", plan: "Schedule", how: "Directions", left: "Counting down", love: "With love,", and: "&", y: "",
      rsvp: "RSVP", rsvpLead: "Kindly reply by", share: "Share the link", made: "Made by", by: "" }
  };
  function x(k) { return (TXT[K.lang] || TXT.hy)[k]; }
  function logo() { return '<svg viewBox="0 0 60 60" aria-hidden="true"><circle cx="30" cy="30" r="26" fill="#fff" stroke="#f2c230" stroke-width="2.4"/><path d="M18 40C22 28 26 18 30 14C27 26 26 34 28 42M28 30C33 26 38 26 40 30C36 31 33 33 31 38" fill="none" stroke="#555" stroke-width="1.6" stroke-linecap="round"/></svg>'; }
  var pi = 0;
  function photo() { var p = (C.photos || [])[pi++]; return p ? '<div class="ph rv"><img src="' + esc(p) + '" alt="" loading="lazy"></div>' : ""; }
  function page() {
    var n = K.names(), d = K.date; pi = 0;
    return '<div class="col"><div class="topbar"><button class="play" type="button" data-music aria-label="music"><i></i></button></div>' +
      '<section class="hero"><img src="' + esc(C.photo) + '" alt="' + esc(n.join(" " + x("and") + " ")) + '">' +
      // heroBaked՝ եթե անուններն արդեն գրված են նկարի վրա
      (C.heroBaked ? "" : '<div class="sh"></div><h1 class="nm"><span>' + esc(n[0] || "") + "</span><span>" + esc(n[1] || "") + "</span></h1>") + '<i class="chev"></i></section>' +
      '<section class="tx"><h2 class="h2 rv">' + esc(x("inv")) + '</h2><p class="s rv">' + esc(t(C.invite)) + "</p></section>" + photo() +
      '<section class="tx"><div class="date rv">' + pad(d.getDate()) + "." + pad(d.getMonth() + 1) + "." + d.getFullYear() + esc(x("y")) + '</div><p class="s rv">' + esc(t(C.text)) + "</p></section>" + photo() +
      '<section class="tx"><h2 class="h2 rv">' + esc(x("plan")) + "</h2>" + (C.events || []).map(function (e) {
        return '<div class="ev rv"><div class="tm">' + esc(e.time) + '</div><div class="t">' + esc(t(e.title)) + "</div>" + (e.place ? '<div class="pl">' + esc(t(e.place)) + "</div>" : "") +
          (e.map ? '<a class="pill" href="' + esc(e.map) + '" target="_blank" rel="noopener">' + esc(x("how")) + "</a>" : "") + "</div>";
      }).join("") + "</section>" + photo() +
      '<section class="tx"><h2 class="h2 rv">' + esc(x("left")) + '</h2><div class="cdn rv" data-cd>' + ["days", "hours", "minutes", "seconds"].map(function (k) {
        return '<div><b data-k="' + k + '">00</b><span>' + esc(u(k)) + "</span></div>"; }).join("") + "</div>" +
      (C.rsvp ? '<h2 class="h2 rv" style="margin-top:56px">' + esc(x("rsvp")) + '</h2><p class="s rv">' + esc(x("rsvpLead")) + " " + esc(K.deadline()) + "</p>" +
        '<form class="rs rv" id="rf"><label class="radio"><input type="radio" name="attend" value="yes" checked>' + esc(u("yes")) + "</label>" +
        '<label class="radio"><input type="radio" name="attend" value="no">' + esc(u("no")) + "</label>" +
        '<div class="fl"><label for="rn">' + esc(u("name")) + '</label><input id="rn" name="name" required autocomplete="name"></div>' +
        '<div class="fl"><label for="rg">' + esc(u("guests")) + '</label><select id="rg" name="guests">' + [1, 2, 3, 4, 5, 6].map(function (i) { return "<option>" + i + "</option>"; }).join("") + "</select></div>" +
        '<button class="pill fill" type="submit">' + esc(u("send")) + "</button></form>" : "") +
      '<h2 class="h2 sig rv">' + esc(x("love")) + " " + esc(n[0] || "") + " " + esc(x("and")) + " " + esc(n[1] || "") + "</h2></section>" + photo() +
      '<footer class="ft"><button class="share" type="button">↗ ' + esc(x("share")) + '</button><div class="soc"><a href="https://wa.me/?text=' + encodeURIComponent(location.href) + '" target="_blank" rel="noopener" aria-label="WhatsApp">' +
      '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-3.9-4.7-4.1-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.3 0 .5l-.3.5-.4.4c-.1.1-.3.3-.1.6.2.3.7 1.2 1.6 2 1.1 1 2 1.3 2.3 1.4.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.3z"/></svg></a>' +
      '<a href="https://t.me/share/url?url=' + encodeURIComponent(location.href) + '" target="_blank" rel="noopener" aria-label="Telegram"><svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm4.8 6.8-1.6 7.7c-.1.6-.5.7-1 .4l-2.7-2-1.3 1.3c-.1.1-.3.3-.6.3l.2-2.8 5-4.6c.2-.2 0-.3-.3-.1l-6.2 3.9-2.7-.8c-.6-.2-.6-.6.1-.9l10.5-4c.5-.2.9.1.6 1z"/></svg></a></div>' +
      "<div>" + esc(x("made")) + ' <a href="https://hravirir.am" target="_blank" rel="noopener">www.hravirir.am</a>' + esc(x("by")) + "</div></footer></div>";
  }
  function render() {
    document.documentElement.lang = K.lang;
    document.title = K.names().join(" " + x("and") + " ");
    document.getElementById("app").innerHTML = "<main>" + page() + "</main>" + K.chrome();
    K.reveal(); K.countdown(false); K.rsvp(document.getElementById("rf")); K.bindChrome(render); K.music.sync();
    var sh = document.querySelector(".share");
    if (sh) sh.onclick = function () { if (navigator.share) navigator.share({ title: document.title, url: location.href }).catch(function () {}); else if (navigator.clipboard) navigator.clipboard.writeText(location.href); };
  }
  render();
})();
