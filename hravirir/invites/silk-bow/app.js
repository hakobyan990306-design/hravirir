/* «Մետաքսե ժապավեն» — կամարաձև քարտը կապված է բորդո ժապավենով. սեղմելիս կապը արձակվում է, ժապավենի ծայրերը սահում են կողքերով */
(function () {
  "use strict";
  var K = window.K, C = K.C, esc = K.esc, t = K.t, u = K.u, P = window.P;
  P.texts({
    hy: { hint: "Սեղմեք ժապավենին", env: "Հրավեր" },
    ru: { hint: "Потяните за ленту", env: "Приглашение" },
    en: { hint: "Untie the ribbon", env: "Invitation" }
  });
  // իրական ատլասե բանտ՝ օղակների ներսի ծալքերով, փայլով, V-կտրվածքով ծայրերով և ճմռթված հանգույցով
  function bow(id) {
    var g = "g" + id, A = "url(#" + g + ")", B = "url(#" + g + "b)", H = "url(#" + g + "h)", T = "url(#" + g + "t)";
    function loop() {
      return '<path d="M110 70C92 38 58 16 30 22C6 28 4 62 24 82C44 102 86 94 110 76Z" fill="' + A + '"/>' +
        '<path d="M106 71C88 52 60 40 42 45C30 49 31 65 45 73C63 83 90 79 106 73Z" fill="' + B + '"/>' +
        '<path d="M106 66C84 40 52 26 32 31" fill="none" stroke="' + H + '" stroke-width="5" stroke-linecap="round"/>' +
        '<path d="M24 80C40 96 78 92 104 76" fill="none" stroke="#3d0710" stroke-opacity=".35" stroke-width="1.4"/>' +
        '<path d="M62 30C70 40 80 52 92 62" fill="none" stroke="#fff" stroke-opacity=".16" stroke-width="2"/>';
    }
    return '<svg class="bow" viewBox="0 0 220 170" aria-hidden="true"><defs>' +
      '<linearGradient id="' + g + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#c84052"/><stop offset=".35" stop-color="#a1283a"/><stop offset=".7" stop-color="#7c1726"/><stop offset="1" stop-color="#560d17"/></linearGradient>' +
      '<linearGradient id="' + g + 'b" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#4a0a13"/><stop offset="1" stop-color="#7a1625"/></linearGradient>' +
      '<linearGradient id="' + g + 'h" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#ffd9de" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>' +
      '<linearGradient id="' + g + 't" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#6a1220"/><stop offset=".45" stop-color="#b3354a"/><stop offset=".6" stop-color="#d45a6c"/><stop offset="1" stop-color="#7c1726"/></linearGradient>' +
      '<filter id="' + g + 's" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="6" stdDeviation="5" flood-color="#3a0610" flood-opacity=".45"/></filter></defs><g filter="url(#' + g + 's)">' +
      // ծայրեր
      '<path d="M103 80C96 104 84 128 68 162L84 154L92 168C102 132 110 106 114 84Z" fill="' + T + '"/><path d="M103 82C98 104 90 126 80 152L86 157C96 128 104 104 108 84Z" fill="#3d0710" opacity=".35"/>' +
      '<path d="M117 80C126 104 142 126 160 158L144 152L137 167C126 132 114 106 108 84Z" fill="' + T + '"/><path d="M119 84C126 106 138 128 150 150L144 153C132 128 122 106 114 86Z" fill="#fff" opacity=".12"/>' +
      // օղակներ
      loop() + '<g transform="translate(220 0) scale(-1 1)">' + loop() + "</g>" +
      // հանգույց
      '<path d="M97 55C104 50 117 50 124 56C129 66 129 80 123 89C116 94 104 94 97 88C91 79 91 64 97 55Z" fill="' + A + '"/>' +
      '<path d="M101 60C107 69 107 79 103 87M119 59C114 69 114 79 118 87" fill="none" stroke="#3d0710" stroke-opacity=".4" stroke-width="1.3"/>' +
      '<path d="M104 58C108 56 113 56 116 58" fill="none" stroke="#ffd9de" stroke-opacity=".6" stroke-width="2" stroke-linecap="round"/></g></svg>';
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
