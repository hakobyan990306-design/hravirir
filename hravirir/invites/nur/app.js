/* «Նուռ» — նռնագույն ծրար՝ կամարաձև վերին և ստորին փեղկերով. կնիքը կիսվում է, փեղկերը բացվում են վեր ու վար */
(function () {
  "use strict";
  var K = window.K, C = K.C, esc = K.esc, t = K.t, u = K.u, P = window.P;
  P.texts({
    hy: { hint: "Սեղմեք կնիքին", top: "Դուք հրավիրված եք մեր հարսանիքին", note: "Այս հրավերը պատահական չէ. մեզ համար կարևոր է, որ այդ օրը մեր կողքին լինեն ամենամտերիմ մարդիկ։" },
    ru: { hint: "Нажмите на печать", top: "Вы приглашены на нашу свадьбу", note: "Это приглашение не случайно: нам важно, чтобы в этот день рядом были самые близкие люди." },
    en: { hint: "Tap the seal", top: "You are invited to our wedding", note: "This invitation is not by chance: we want our closest people beside us on this day." }
  });
  function pom(w) {
    return '<svg class="pom" viewBox="0 0 60 64" width="' + w + '" aria-hidden="true"><path d="M24 10L22 3L27 7L30 1L33 7L38 3L36 10Z" fill="#c9a04e"/><circle cx="30" cy="36" r="24" fill="#8e1b25"/><circle cx="30" cy="36" r="24" fill="none" stroke="#c9a04e" stroke-width="1.4"/>' +
      '<path d="M16 26A18 18 0 0 1 28 16" stroke="#e46a6a" stroke-width="3" fill="none" stroke-linecap="round" opacity=".7"/>' +
      [[24, 34], [32, 30], [38, 38], [28, 42], [22, 44], [35, 46], [30, 36]].map(function (p) { return '<ellipse cx="' + p[0] + '" cy="' + p[1] + '" rx="2.4" ry="3" fill="#f2c6a6" opacity=".9"/>'; }).join("") + "</svg>";
  }
  // ազգային զարդագիծ՝ ձախ և աջ, մեջտեղում նուռ
  function orn() {
    var side = '<svg viewBox="0 0 120 30" aria-hidden="true"><g fill="none" stroke="#c9a04e" stroke-width="1.3" stroke-linecap="round"><path d="M4 15H40"/><path d="M40 15C50 3 62 3 66 15C70 27 82 27 92 15C98 8 108 8 116 15"/>' +
      '<path d="M66 15C62 22 54 22 52 15C50 8 58 6 60 11"/><path d="M92 15C96 22 104 22 106 15"/><circle cx="46" cy="15" r="2.2" fill="#c9a04e"/><path d="M14 9L20 15L14 21L8 15Z"/></g></svg>';
    return '<div class="orn rv"><span>' + side + "</span>" + pom(40) + '<span class="fl">' + side + "</span></div>";
  }
  function seal(half) {
    return '<svg viewBox="0 0 110 110" aria-hidden="true"><defs><radialGradient id="ws' + half + '" cx=".4" cy=".35" r=".75"><stop offset="0" stop-color="#fff8e8"/><stop offset=".6" stop-color="#e9dcc0"/><stop offset="1" stop-color="#b9a47c"/></radialGradient></defs>' +
      '<path d="M55 4C70 6 78 2 88 14C100 22 104 34 104 52C106 70 98 84 86 94C74 104 62 106 48 104C32 104 18 96 10 82C2 68 4 54 6 40C10 24 20 12 34 8C42 4 48 3 55 4Z" fill="url(#ws' + half + ')"/>' +
      '<circle cx="55" cy="55" r="33" fill="none" stroke="#a48c62" stroke-width="1.2" opacity=".7"/><g transform="translate(37 34) scale(.6)">' + pom(60).replace(/<\/?svg[^>]*>/g, "").replace(/#8e1b25/g, "#d9c7a2").replace(/#c9a04e/g, "#a48c62").replace(/#e46a6a|#f2c6a6/g, "#f7efdc") + "</g></svg>";
  }
  function env() {
    return '<div class="env" id="env" role="button" aria-label="' + esc(P.x("hint")) + '"><div class="pt"><div class="tt">' + esc(P.x("top")) + '</div></div><div class="pb"><div class="tb">' + esc(P.x("note")) + "</div></div>" +
      '<div class="seal"><div class="sh l">' + seal("l") + '</div><div class="sh r">' + seal("r") + "</div></div>" + (K.PREVIEW ? "" : '<div class="hint">' + esc(P.x("hint")) + "</div>") + "</div>";
  }
  function main() {
    var n = K.names();
    return '<section class="hero"' + (C.photo ? ' style="--ph:url(\'' + esc(C.photo) + '\')"' : "") + '><div class="tint"></div><div class="hc"><div class="caps rv">' + esc(P.x("invite")) + "</div>" +
      '<h1 class="nm rv d1"><span class="n1">' + esc(n[0] || "") + '</span><span class="amp">&amp;</span><span class="n2">' + esc(n[1] || "") + "</span></h1>" + orn() + '<div class="dt rv d2">' + P.dots("/") + "</div></div></section>" +
      P.sec("iv", '<p class="p rv">' + P.text() + "</p>") +
      P.sec("mar", '<div class="caps rv">' + esc(P.x("left")) + "</div>" + P.cd("roll")) +
      P.sec("iv", '<h2 class="h2 rv">' + esc(P.x("program")) + "</h2>" + P.program("cards", "double-b")) +
      K.gallery("h2", "mar") +
      P.sec("iv", P.dress()) +
      P.sec("mar", P.rsvp()) +
      P.sec("fin iv", pom(54) + '<div class="caps rv">' + esc(P.x("fin")) + '</div><div class="fnm rv">' + esc(n.join(" & ")) + "</div>") + P.made();
  }
  // հետհաշվարկի թվերը «գլորվում» են ամեն փոփոխությանը
  function roll() {
    document.querySelectorAll(".roll b").forEach(function (b) {
      new MutationObserver(function () {
        if (b.dataset.v === b.textContent) return; b.dataset.v = b.textContent;
        b.classList.remove("go"); void b.offsetWidth; b.classList.add("go");
      }).observe(b, { childList: true });
    });
  }
  P.run({ env: env, main: main, post: roll, steps: [[0, "s1"], [500, "s2"], [1700, "s3"]], done: 2300 });
})();
