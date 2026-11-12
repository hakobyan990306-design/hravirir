/* «Ձյունե գունդ» — ապակե գունդ ձմեռային գյուղով, ներսում ձյուն է գալիս. սեղմելիս գունդը թափահարվում է, ձյունը պտտվում է,
   գունդը մոտենում է, և բացվում է էջը՝ ձյունով */
(function () {
  "use strict";
  var K = window.K, C = K.C, esc = K.esc, t = K.t;
  var TXT = { hy: { hint: "Սեղմեք գնդին" }, ru: { hint: "Нажмите на шар" } };
  var globe =
    '<svg class="gl" viewBox="0 0 300 360" aria-hidden="true"><defs>' +
    '<radialGradient id="in" cx=".5" cy=".38" r=".62"><stop offset="0" stop-color="#3a6aa6"/><stop offset=".7" stop-color="#173661"/><stop offset="1" stop-color="#0c1f3c"/></radialGradient>' +
    '<linearGradient id="bs" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e9edf3"/><stop offset=".45" stop-color="#9aa6b6"/><stop offset="1" stop-color="#5c6778"/></linearGradient>' +
    '<radialGradient id="gls" cx=".32" cy=".26" r=".5"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>' +
    '<clipPath id="cp"><circle cx="150" cy="148" r="128"/></clipPath></defs>' +
    '<g clip-path="url(#cp)"><rect width="300" height="300" fill="url(#in)"/>' +
    '<circle cx="210" cy="78" r="16" fill="#fff8de" opacity=".9"/><circle cx="210" cy="78" r="30" fill="#fff8de" opacity=".12"/>' +
    '<ellipse cx="150" cy="248" rx="160" ry="52" fill="#eaf2fb"/><ellipse cx="90" cy="236" rx="80" ry="26" fill="#f7fbff"/>' +
    '<g fill="#1f4a3a"><path d="M78 230 L98 230 L88 168Z"/><path d="M74 216 L102 216 L88 182Z"/><path d="M212 236 L240 236 L226 150Z"/><path d="M206 214 L246 214 L226 166Z"/><path d="M190 238 L206 238 L198 196Z"/></g>' +
    '<g fill="#f7fbff"><path d="M84 186 L92 186 L88 176Z"/><path d="M220 168 L232 168 L226 154Z"/></g>' +
    '<rect x="122" y="196" width="56" height="42" fill="#7a3b2e"/><path d="M114 200 L150 170 L186 200Z" fill="#f7fbff"/><path d="M118 200 L150 174 L182 200" fill="none" stroke="#5a2a20" stroke-width="3"/>' +
    '<rect class="win" x="134" y="208" width="14" height="14" fill="#ffd36e"/><rect x="156" y="214" width="12" height="24" fill="#4a2018"/>' +
    '</g>' +
    '<circle cx="150" cy="148" r="128" fill="url(#gls)"/><circle cx="150" cy="148" r="128" fill="none" stroke="#dfe9f5" stroke-opacity=".6" stroke-width="2"/>' +
    '<path d="M62 268 Q150 300 238 268 L254 320 Q150 350 46 320Z" fill="url(#bs)"/><path d="M46 320 Q150 350 254 320 L250 336 Q150 366 50 336Z" fill="#4a5466"/>' +
    '<text x="150" y="318" text-anchor="middle" font-family="Cinzel, serif" font-size="22" font-weight="600" fill="#24324a" letter-spacing="4">' + esc(C.year || "") + "</text></svg>";

  NY.run({
    txt: TXT,
    env: function () {
      return '<div class="env" id="env" role="button" aria-label="' + esc(NY.x("hint")) + '"><canvas class="fx" id="esnow"></canvas>' +
        '<div class="top"><div class="co">' + esc(C.company || "") + '</div><div class="tt">' + esc(t(C.title)) + "</div></div>" +
        '<div class="gwrap" id="gw">' + globe + '<canvas class="inner" id="isnow"></canvas></div>' +
        '<div class="dt">' + NY.dd() + " · " + NY.tm() + "</div>" +
        (K.PREVIEW ? "" : '<div class="hint">' + esc(NY.x("hint")) + "</div>") + "</div>";
    },
    heroBg: '<canvas class="fx" id="hsnow"></canvas><div class="moon"></div>',
    finBg: '<canvas class="fx" id="fsnow"></canvas>',
    ready: function () {
      NY.snow(document.getElementById("esnow"), { n: 60, max: 2.2 });
      this._in = NY.snow(document.getElementById("isnow"), { n: 70, max: 1.8 });
    },
    after: function () {
      NY.snow(document.getElementById("hsnow"), { n: 70 });
      NY.snow(document.getElementById("fsnow"), { n: 45 });
    },
    open: function (env, done) {
      var self = this;
      env.classList.add("go");
      if (self._in) self._in.storm();
      setTimeout(function () { env.classList.add("zoom"); }, 1500);
      setTimeout(done, 2300);
    }
  });
})();
