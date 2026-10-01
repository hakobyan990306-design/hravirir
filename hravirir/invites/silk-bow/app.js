/* «Մետաքսե ժապավեն» — կամարաձև քարտը կապված է բորդո ժապավենով. սեղմելիս կապը արձակվում է, ժապավենի ծայրերը սահում են կողքերով */
(function () {
  "use strict";
  var K = window.K, C = K.C, esc = K.esc, t = K.t, u = K.u, P = window.P;
  P.texts({
    hy: { hint: "Սեղմեք ժապավենին", env: "Հրավեր" },
    ru: { hint: "Потяните за ленту", env: "Приглашение" },
    en: { hint: "Untie the ribbon", env: "Invitation" }
  });
  // բանտ՝ երկու օղակ, երկու ծայր և հանգույց
  function bow(id) {
    var g = "g" + id;
    return '<svg class="bow" viewBox="0 0 200 150" aria-hidden="true"><defs><linearGradient id="' + g + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#b23444"/><stop offset=".55" stop-color="#8a1c2b"/><stop offset="1" stop-color="#5e0f1a"/></linearGradient>' +
      '<linearGradient id="' + g + 'h" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".45"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>' +
      '<path class="tl" d="M94 78L62 142L78 134L86 149L104 82Z" fill="url(#' + g + ')"/><path class="tr" d="M106 78L138 142L122 134L114 149L96 82Z" fill="url(#' + g + ')"/>' +
      '<path d="M100 72C72 26 18 14 18 54C18 92 70 96 100 72Z" fill="url(#' + g + ')"/><path d="M100 72C128 26 182 14 182 54C182 92 130 96 100 72Z" fill="url(#' + g + ')"/>' +
      '<path d="M96 70C72 40 34 30 30 52" fill="none" stroke="url(#' + g + 'h)" stroke-width="5" stroke-linecap="round"/><path d="M104 70C128 40 166 30 170 52" fill="none" stroke="url(#' + g + 'h)" stroke-width="5" stroke-linecap="round"/>' +
      '<path d="M100 72C84 56 52 50 40 60M100 72C116 56 148 50 160 60" fill="none" stroke="#4a0a14" stroke-opacity=".35" stroke-width="1.2"/>' +
      '<ellipse cx="100" cy="74" rx="14" ry="17" fill="#7a1624"/><ellipse cx="96" cy="68" rx="5" ry="7" fill="#fff" opacity=".22"/></svg>';
  }
  function mono() {
    var i = P.ini("");
    return '<div class="mono"><svg viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="60" cy="60" r="51" fill="none" stroke="currentColor" stroke-width=".5" stroke-dasharray="1.5 3"/></svg>' +
      "<b>" + esc(i.charAt(0)) + "</b><i>" + esc(i.charAt(1)) + "</i></div>";
  }
  function env() {
    var n = K.names();
    return '<div class="env" id="env" role="button" aria-label="' + esc(P.x("hint")) + '"><div class="ecard"><div class="in">' + mono() + '<div class="caps">' + esc(P.x("env")) + "</div>" +
      '<div class="enm">' + esc(n[0] || "") + " &amp; " + esc(n[1] || "") + '</div></div><div class="band"><i class="bl"></i><i class="br"></i></div><div class="bw">' + bow("e") + '</div><div class="edt">' + P.dots(" · ") + "</div></div>" +
      (K.PREVIEW ? "" : '<div class="hint">' + esc(P.x("hint")) + "</div>") + "</div>";
  }
  function hero() {
    var d = K.date;
    return '<section class="hero"><div class="arch rv">' + mono() + '<div class="caps">' + esc(P.x("invite")) + "</div>" + P.names("") +
      '<div class="ribbon"><i></i>' + bow("h") + '</div><div class="dstack"><b>' + P.d2(d.getDate()) + "</b><b>" + P.d2(d.getMonth() + 1) + "</b><b>" + d.getFullYear() + "</b></div>" +
      '<div class="wd">' + esc(P.x("wdl")[d.getDay()]) + "</div></div>" + K.photo("silk") + "</section>";
  }
  function main() {
    return hero() +
      P.sec("txt", '<div class="caps rv">' + esc(P.x("dear")) + '</div><p class="p big rv">' + P.text() + "</p>" + P.month("", "")) +
      K.gallery("h2", "soft") +
      P.sec("soft", '<h2 class="h2 rv">' + esc(P.x("program")) + "</h2>" + P.program("cards", "double-a")) +
      P.sec("", '<div class="caps rv">' + esc(P.x("left")) + "</div>" + P.cd()) +
      P.sec("soft", P.dress()) +
      P.sec("", P.rsvp()) +
      P.sec("fin", mono() + '<div class="caps rv">' + esc(P.x("fin")) + '</div><div class="nm fnm rv">' + esc(K.names().join(" & ")) + "</div>") + P.made();
  }
  P.run({ env: env, main: main, steps: [[0, "s1"], [1150, "s2"]], done: 1900 });
})();
