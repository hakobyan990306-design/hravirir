/* «Էդիտորիալ» (նշանդրեք) — ամսագրի շապիկ. անունների միջև խաչաձև կոլաժ է, սեղմելիս լուսանկարները ցրվում են կողքերով */
(function () {
  "use strict";
  var K = window.K, C = K.C, esc = K.esc, t = K.t, u = K.u, P = window.P;
  P.texts({
    hy: { hint: "Սեղմեք լուսանկարներին", invite: "Նշանադրության հրավեր", inv: "Սիրով հրավիրում ենք Ձեզ մեր նշանադրությանը", left: "Նշանդրեքին մնացել է", loc: "Location", locA: "Վայրը", issue: "Հատուկ թողարկում" },
    ru: { hint: "Нажмите на фотографии", invite: "Приглашение на помолвку", inv: "С любовью приглашаем вас на нашу помолвку", left: "До помолвки осталось", loc: "Location", locA: "Место", issue: "Специальный выпуск" },
    en: { hint: "Tap the photos", invite: "Engagement invitation", inv: "We joyfully invite you to our engagement", left: "Counting down", loc: "Location", locA: "Venue", issue: "Special edition" }
  });
  var pin = '<svg class="pin" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" fill="currentColor"/></svg>';
  function collage(cls) {
    var c = C.collage || [C.photo, C.photo, C.photo];
    return '<div class="cross ' + (cls || "") + '">' + c.slice(0, 3).map(function (s, i) { return '<div class="ci c' + i + '" style="background-image:url(\'' + esc(s) + '\')"></div>'; }).join("") + "</div>";
  }
  function env() {
    var n = K.names();
    return '<div class="env" id="env" role="button" aria-label="' + esc(P.x("hint")) + '"><div class="mast"><span>' + esc(P.x("issue")) + "</span><span>" + P.dots(".") + "</span></div>" +
      '<div class="en n1">' + esc(n[0] || "") + "</div>" + collage("e") + '<div class="en n2">' + esc(n[1] || "") + "</div>" +
      (K.PREVIEW ? "" : '<div class="hint">' + esc(P.x("hint")) + "</div>") + "</div>";
  }
  function main() {
    var n = K.names(), v = (C.events || [])[0] || {};
    return '<section class="hero"><div class="nm1 rv">' + esc(n[0] || "") + "</div>" + collage("h rv d1") + '<div class="nm2 rv d2">' + esc(n[1] || "") + '</div><i class="rule rv"></i>' +
      '<div class="caps rv">' + esc(P.x("dear")) + '</div><p class="p rv">' + P.text() + "</p></section>" +
      '<section class="sd"><div class="sdg rv"><div class="sdp" style="background-image:url(\'' + esc(C.toast || C.photo) + '\')"></div><div class="sdt">Save<br>the<br>date</div></div>' +
      '<div class="dt rv">' + P.dots(".") + '</div><i class="rule rv"></i><p class="p rv">' + esc(P.x("inv")) + "</p>" + P.month("", "") + "</section>" +
      '<section class="loc"><h2 class="lh rv">' + esc(P.x("loc")) + '</h2><div class="lsub rv">' + esc(P.x("locA")) + "</div>" +
      (C.venue ? '<div class="vp rv" style="background-image:url(\'' + esc(C.venue) + '\')"></div>' : "") +
      '<div class="wrap"><div class="rv">' + pin + '</div><div class="vn rv">' + esc(t(v.place)) + '</div><i class="rule s rv"></i><div class="va rv">' + esc(t(v.address)) + '</div><div class="vt rv">' + esc(v.time || "") + "</div>" +
      (v.map ? '<a class="btn rv" href="' + esc(v.map) + '" target="_blank" rel="noopener">' + esc(P.x("how")) + "</a>" : "") + "</div></section>" +
      K.gallery("h2", "bw") +
      P.sec("cds", '<div class="caps rv">' + esc(P.x("left")) + "</div>" + P.cd()) +
      P.sec("", P.dress()) +
      P.sec("rsv", P.rsvp()) +
      P.sec("fin", '<div class="caps rv">' + esc(P.x("fin")) + '</div><div class="fnm rv">' + esc(n.join(" & ")) + "</div>") + P.made();
  }
  P.run({ env: env, main: main, steps: [[0, "s1"], [1300, "s2"]], done: 1900 });
})();
