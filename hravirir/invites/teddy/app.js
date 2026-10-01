/* «Արջուկ» — սեռի բացահայտում / baby shower. բեժ ջրաներկ արջուկներ, օդապարիկներ, ամպեր, դրոշակներ, վանդակավոր նախշ,
   «Աղջի՞կ, թե՞ տղա» գուշակություն. բացումը՝ ժանյակե եզրով բեժ ծրար արջուկ-կպչուկով */
(function () {
  "use strict";
  var K = window.K, C = K.C, esc = K.esc, t = K.t, u = K.u, P = window.P;
  P.texts({
    hy: { hint: "Սեղմեք ծրարին", invite: "Սեռի բացահայտում", sub: "Աղջի՞կ, թե՞ տղա", lead: "Շուտով մեր տանը նոր ժպիտ կլուսավորի բոլորիս կյանքը", scroll: "Թերթեք ներքև",
      parents: "Ծնողներ", parT: "Ուզում ենք գաղտնիքը բացահայտել մեզ ամենահարազատ մարդկանց հետ", ev: "Սեռի բացահայտում", left: "Մնացել է", dress: "Դրեսկոդ", gift: "Նվերի գաղափար",
      guessH: "Ո՞վ է լինելու", girl: "Արքայադուստր", boy: "Արքայազն", gBtn: "Աղջիկ է", bBtn: "Տղա է", gNote: "Գուշակություն՝ աղջիկ", bNote: "Գուշակություն՝ տղա", saved: "Ձեր գուշակությունը կուղարկվի հարցաթերթիկի հետ",
      fin: "Սպասում ենք Ձեզ" },
    ru: { hint: "Нажмите на конверт", invite: "Гендер-пати", sub: "Мальчик или девочка?", lead: "Скоро в нашем доме появится новая улыбка", scroll: "Листайте вниз",
      parents: "Родители", parT: "Мы хотим раскрыть секрет вместе с самыми близкими людьми", ev: "Гендер-пати", left: "Осталось", dress: "Дресс-код", gift: "Идея подарка",
      guessH: "Кто же это будет?", girl: "Принцесса", boy: "Принц", gBtn: "Девочка", bBtn: "Мальчик", gNote: "Угадывает: девочка", bNote: "Угадывает: мальчик", saved: "Ваш вариант отправится вместе с анкетой",
      fin: "Ждём вас" },
    en: { hint: "Tap the envelope", invite: "Gender reveal", sub: "Boy or girl?", lead: "Soon a new little smile will light up our home", scroll: "Scroll down",
      parents: "Parents", parT: "We want to reveal the secret with our closest people", ev: "Gender reveal", left: "Counting down", dress: "Dress code", gift: "Gift idea",
      guessH: "Who will it be?", girl: "Princess", boy: "Prince", gBtn: "It's a girl", bBtn: "It's a boy", gNote: "Guess: girl", bNote: "Guess: boy", saved: "Your guess will be sent with the RSVP",
      fin: "See you there" }
  });
  var uid = 0;
  // ջրաներկ արջուկ. bow՝ ժապավենի գույն, opt.bal՝ օդապարիկներ ձեռքին
  function bear(bow, opt) {
    opt = opt || {}; var id = "b" + (++uid);
    var g = '<defs><radialGradient id="' + id + 'f" cx=".42" cy=".35" r=".75"><stop offset="0" stop-color="#f1d6b2"/><stop offset=".7" stop-color="#d9aa78"/><stop offset="1" stop-color="#c18e5c"/></radialGradient>' +
      '<filter id="' + id + 'w" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="' + uid + '"/><feDisplacementMap in="SourceGraphic" scale="1.6"/></filter></defs>';
    var F = "url(#" + id + "f)", L = "#f4e2c8";
    var s = '<svg class="bear" viewBox="0 0 120 140" aria-hidden="true">' + g + '<ellipse cx="60" cy="134" rx="34" ry="4" fill="#b98f6a" opacity=".18"/><g filter="url(#' + id + 'w)">';
    if (opt.bal) s += '<path d="M86 84C92 60 96 40 98 24M86 84C88 62 84 44 78 30" stroke="#a88866" stroke-width=".8" fill="none"/><ellipse cx="99" cy="16" rx="11" ry="13" fill="#d8c3a8"/><ellipse cx="77" cy="20" rx="10" ry="12" fill="#b9a083"/><ellipse cx="96" cy="11" rx="3" ry="4" fill="#fff" opacity=".5"/>';
    s += '<ellipse cx="38" cy="122" rx="14" ry="10" fill="' + F + '"/><ellipse cx="82" cy="122" rx="14" ry="10" fill="' + F + '"/><ellipse cx="38" cy="123" rx="7" ry="6" fill="' + L + '"/><ellipse cx="82" cy="123" rx="7" ry="6" fill="' + L + '"/>' +
      '<ellipse cx="60" cy="100" rx="31" ry="27" fill="' + F + '"/><ellipse cx="60" cy="104" rx="17" ry="15" fill="' + L + '"/>' +
      '<ellipse cx="31" cy="96" rx="9" ry="15" transform="rotate(25 31 96)" fill="' + F + '"/><ellipse cx="89" cy="' + (opt.bal ? 86 : 96) + '" rx="9" ry="15" transform="rotate(' + (opt.bal ? -40 : -25) + " 89 " + (opt.bal ? 86 : 96) + ')" fill="' + F + '"/>' +
      '<circle cx="35" cy="28" r="12" fill="' + F + '"/><circle cx="85" cy="28" r="12" fill="' + F + '"/><circle cx="35" cy="28" r="6.5" fill="#efcfae"/><circle cx="85" cy="28" r="6.5" fill="#efcfae"/>' +
      '<circle cx="60" cy="52" r="31" fill="' + F + '"/><ellipse cx="60" cy="63" rx="14" ry="11" fill="' + L + '"/></g>' +
      '<ellipse cx="60" cy="57.5" rx="4.6" ry="3.4" fill="#5a3a28"/><path d="M60 61V65M55.5 66.5C58 68.5 62 68.5 64.5 66.5" stroke="#5a3a28" stroke-width="1.3" fill="none" stroke-linecap="round"/>' +
      '<circle cx="48" cy="48" r="2.7" fill="#3b2618"/><circle cx="72" cy="48" r="2.7" fill="#3b2618"/><circle cx="48.8" cy="47.2" r=".8" fill="#fff"/><circle cx="72.8" cy="47.2" r=".8" fill="#fff"/>' +
      '<circle cx="42" cy="60" r="5" fill="#ee9f96" opacity=".32"/><circle cx="78" cy="60" r="5" fill="#ee9f96" opacity=".32"/>';
    if (bow) s += '<path d="M60 80L46 72C42 70 40 82 46 84L60 82L74 84C80 82 78 70 74 72Z" fill="' + bow + '"/><circle cx="60" cy="81" r="3.6" fill="' + bow + '" stroke="rgba(0,0,0,.15)" stroke-width=".6"/>';
    return s + "</svg>";
  }
  function hotair(c1, c2) {
    return '<svg class="hab" viewBox="0 0 60 80" aria-hidden="true"><path d="M30 4C14 4 6 16 6 28C6 42 20 50 24 58H36C40 50 54 42 54 28C54 16 46 4 30 4Z" fill="' + c1 + '"/>' +
      '<path d="M30 4C24 12 22 24 24 58H36C38 24 36 12 30 4Z" fill="' + c2 + '"/><path d="M24 58L26 66M36 58L34 66" stroke="#a88866" stroke-width=".8"/><rect x="25" y="66" width="10" height="8" rx="1.5" fill="#b98f6a"/></svg>';
  }
  function cloud(cls) { return '<svg class="cl ' + (cls || "") + '" viewBox="0 0 120 50" aria-hidden="true"><g fill="#fff"><circle cx="30" cy="32" r="16"/><circle cx="52" cy="22" r="20"/><circle cx="76" cy="28" r="17"/><circle cx="94" cy="34" r="12"/><rect x="18" y="32" width="86" height="16" rx="8"/></g></svg>'; }
  function bunting() {
    var s = '<svg class="bunt" viewBox="0 0 300 50" preserveAspectRatio="none" aria-hidden="true"><defs><pattern id="gh" width="6" height="6" patternUnits="userSpaceOnUse"><rect width="6" height="6" fill="#f3e6d4"/><rect width="3" height="6" fill="#d8bf9c" opacity=".55"/><rect width="6" height="3" fill="#d8bf9c" opacity=".55"/></pattern></defs><path d="M0 6Q150 30 300 6" stroke="#a88866" fill="none" stroke-width="1"/>';
    for (var i = 0; i < 13; i++) { var x = 6 + i * 22.5, y = 6 + Math.sin(i / 12 * Math.PI) * 11.5; s += '<path d="M' + x + " " + y + "L" + (x + 18) + " " + (y + .5) + "L" + (x + 9) + " " + (y + 20) + 'Z" fill="' + (i % 2 ? "url(#gh)" : "#c9a882") + '"/>'; }
    return s + "</svg>";
  }
  function star(cls) { return '<svg class="st ' + (cls || "") + '" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 0L12 8L20 10L12 12L10 20L8 12L0 10L8 8Z" fill="#cfae7e"/></svg>'; }
  function env() {
    return '<div class="env" id="env" role="button" aria-label="' + esc(P.x("hint")) + '">' + bunting() + cloud("e1") + cloud("e2") + hotair("#e7d2b6", "#cfae86").replace('class="hab"', 'class="hab e"') +
      '<div class="ebox"><div class="ecard"><b>BA</b>' + bear("#c9a882") + "<b>BY</b></div>" +
      '<svg class="eflap" viewBox="0 0 100 60" preserveAspectRatio="none" aria-hidden="true"><path d="M0 0H100L50 56Z" fill="#e9d6bb"/><path d="M0 0L50 56L100 0" fill="none" stroke="#fff" stroke-width="1.6" stroke-dasharray="2.6 1.4"/></svg>' +
      '<div class="efront"></div><div class="estk">' + bear("") + "</div></div>" +
      '<div class="ett">' + esc(P.x("invite")) + "</div>" + (K.PREVIEW ? "" : '<div class="hint">' + esc(P.x("hint")) + "</div>") + "</div>";
  }
  function main() {
    var n = K.names(), d = K.date, ev = (C.events || [])[0] || {};
    var guess = '<div class="gs"><div class="gc rv">' + bear("#efb0bd") + "<b>" + esc(P.x("girl")) + '?</b><button type="button" class="gb g" data-g="g">' + esc(P.x("gBtn")) + "</button></div>" +
      '<div class="gc rv">' + bear("#a9c6e2") + "<b>" + esc(P.x("boy")) + '?</b><button type="button" class="gb b" data-g="b">' + esc(P.x("bBtn")) + "</button></div></div>" + '<div class="gsv" hidden>' + esc(P.x("saved")) + "</div>";
    var rs = P.rsvp().replace('<button class="btn fill"', '<input type="hidden" name="note" id="rguess"><button class="btn fill"');
    return '<section class="hero">' + bunting() + cloud("c1") + cloud("c2") + star("s1") + star("s2") + star("s3") +
      '<div class="ttl rv"><b>BA</b>' + bear("#c9a882", { bal: 1 }) + "<b>BY</b></div>" +
      '<div class="sub rv d1">' + esc(t(C.subtitle) || P.x("sub")) + '</div><p class="p lead rv d2">' + esc(P.x("lead")) + '</p><div class="down rv d3"><i></i>' + esc(P.x("scroll")) + "</div></section>" +
      P.sec("letter", hotair("#e7d2b6", "#cfae86") + cloud("c3") + '<p class="p rv">' + P.text() + "</p>" + bear("", {}).replace('class="bear"', 'class="bear sm rv"')) +
      P.sec("par", '<div class="caps rv">' + esc(P.x("parents")) + '</div><div class="pn rv">' + esc(n[0] || "") + '<span>&amp;</span>' + esc(n[1] || "") + '</div><p class="p rv">' + esc(P.x("parT")) + "</p>") +
      '<section class="evs"><div class="arch rv">' + bear("#c9a882").replace('class="bear"', 'class="bear peek"') + '<div class="scr">' + esc(P.x("ev")) + '</div><div class="wd">' + esc(P.x("wdl")[d.getDay()]) + '</div><div class="dd">' + P.d2(d.getDate()) + '</div><div class="mo">' + esc(u("months")[d.getMonth()]) + '</div><div class="tm">' + esc(ev.time || "") + "</div></div>" +
        '<div class="loc rv"><svg class="pin" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" fill="currentColor"/></svg><b>' + esc(t(ev.place) || "") + "</b><span>" + esc(t(ev.address) || "") + "</span>" +
        (ev.map ? '<a class="btn" href="' + esc(ev.map) + '" target="_blank" rel="noopener">' + esc(P.x("how")) + "</a>" : "") + "</div></section>" +
      P.sec("cds", '<div class="caps rv">' + esc(P.x("left")) + "</div>" + P.cd()) +
      P.sec("two", '<div class="ib rv"><svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"><path d="M18 6h4l2 4 2-4h4l-2 10 8 26H12l8-26z"/></svg><b>' + esc(P.x("dress")) + "</b><span>" + esc(t(C.dresscode && C.dresscode.text) || "") + "</span></div>" +
        '<div class="ib rv"><svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"><rect x="8" y="20" width="32" height="20" rx="2"/><path d="M6 14h36v6H6zM24 14v26M24 14c-4-8-12-8-10-2 1 2 6 2 10 2zM24 14c4-8 12-8 10-2-1 2-6 2-10 2z"/></svg><b>' + esc(P.x("gift")) + "</b><span>" + esc(t(C.gift) || "") + "</span></div>") +
      P.sec("guess", '<h2 class="h2 rv">' + esc(P.x("guessH")) + "</h2>" + guess) +
      P.sec("rsv", P.rsvp ? rs : "") +
      P.sec("fin", bear("#c9a882", { bal: 1 }).replace('class="bear"', 'class="bear sm rv"') + '<div class="scr rv">' + esc(P.x("fin")) + '</div><div class="fnm rv">' + esc(n.join(" & ")) + "</div>") + P.made();
  }
  function post() {
    document.querySelectorAll(".gb").forEach(function (b) {
      b.onclick = function () {
        document.querySelectorAll(".gb").forEach(function (x) { x.classList.toggle("on", x === b); });
        var h = document.getElementById("rguess"); if (h) h.value = P.x(b.dataset.g === "g" ? "gNote" : "bNote");
        var s = document.querySelector(".gsv"); if (s) s.hidden = false;
      };
    });
  }
  P.run({ env: env, main: main, post: post, steps: [[0, "s1"], [600, "s2"], [1700, "s3"]], done: 2300 });
})();
