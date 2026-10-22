/* Գևորգ & Արևիկ — բացումը «Մոնոխրոմ քայլ»-ի (mono-walk) պես, մնացածը՝ «Նուար»-ի (bw-script) պես.
   + հասցեներ, Yandex նավիգատոր (nav), նշում հյուրերին */
(function () {
  "use strict";
  var K = window.K, C = K.C, esc = K.esc, t = K.t, u = K.u, pad = K.pad;
  var TXT = {
    hy: { inv: "Սիրով հրավիրում ենք Ձեզ՝", plan: "Օրվա ծրագիր", how: "Ինչպես հասնել", left: "Հարսանիքին մնացել է", love: "Սիրով՝", and: "և", y: "թ.",
      rsvp: "Հարցաթերթիկ", rsvpLead: "Խնդրում ենք պատասխանել մինչև", share: "Կիսվել հղումով", made: "Հրավիրատոմսը ստեղծվել է", by: "-ի կողմից",
      cover: "Հարսանյաց հրավեր", hint: "Սեղմեք էկրանին",
      // հարցաթերթիկի դաշտ. պատասխանը գնում է աղյուսակի «Նշում» սյունակ
      songL: "Ո՞ր երգը կցանկանայիք, որ հնչի մեր հարսանիքին" }
  };
  function x(k) { return (TXT[K.lang] || TXT.hy)[k]; }
  var pi = 0;
  function photo() { var p = (C.photos || [])[pi++]; return p ? '<div class="ph rv"><img src="' + esc(p) + '" alt="" loading="lazy"></div>' : ""; }
  // մեծատառը ձեռքով՝ CSS uppercase-ը «և»-ն դարձնում է «ԵՒ» (ԳԵՒՈՐԳ), պետք է՝ ԳԵՎՈՐԳ
  function caps(s) { return String(s || "").replace(/և/g, "եվ").toUpperCase(); }
  function paras(v) { return K.list(v).map(function (s) { return '<p class="s rv">' + esc(s) + "</p>"; }).join(""); }

  // ---------- բացման էկրան (mono-walk) ----------
  function env() {
    var n = K.names().map(caps);
    return '<div class="env" id="env" role="button" aria-label="' + esc(x("hint")) + '"><div class="eph" style="background-image:url(\'' + esc(C.cover || C.photo) + '\')"></div>' +
      '<div class="bar t"></div><div class="bar b"></div>' +
      '<div class="mid"><div class="caps">' + esc(x("cover")) + '</div><i class="ln"></i><div class="en">' + esc(n[0] || "") + " · " + esc(n[1] || "") + "</div></div>" +
      (K.PREVIEW ? "" : '<div class="hint">' + esc(x("hint")) + "</div>") + "</div>";
  }

  // ---------- հիմնական էջ (bw-script) ----------
  function page() {
    var n = K.names(), d = K.date; pi = 0;
    return '<div class="col">' + (C.music ? '<div class="topbar"><button class="play" type="button" data-music aria-label="music"><i></i></button></div>' : "") +
      '<section class="hero"><img src="' + esc(C.photo) + '" alt="' + esc(n.join(" " + x("and") + " ")) + '">' +
      // անունները՝ բացման էկրանի պես (բարակ մեծատառեր), ոչ թե գեղագիր
      '<div class="sh sh2"></div><div class="mid hmid"><div class="caps">' + esc(x("cover")) + '</div><i class="ln"></i><h1 class="en">' + esc(caps(n[0])) + " · " + esc(caps(n[1])) + '</h1></div><i class="chev"></i></section>' +
      '<section class="tx">' + paras(C.invite) + "</section>" + photo() +
      '<section class="tx"><div class="date rv">' + pad(d.getDate()) + "." + pad(d.getMonth() + 1) + "." + d.getFullYear() + esc(x("y")) + "</div>" + paras(C.text) + "</section>" + photo() +
      '<section class="tx"><h2 class="h2 rv">' + esc(x("plan")) + "</h2>" + (C.events || []).map(function (e) {
        return '<div class="ev rv"><div class="tm">' + esc(e.time) + '</div><div class="t">' + esc(t(e.title)) + "</div>" + (e.place ? '<div class="pl">' + esc(t(e.place)) + "</div>" : "") +
          (e.address ? '<div class="ad">' + esc(t(e.address)) + "</div>" : "") +
          (e.map ? '<a class="pill" href="' + esc(e.map) + '"' + (e.nav ? ' data-nav="' + esc(e.nav) + '"' : "") + ' target="_blank" rel="noopener">' + esc(x("how")) + "</a>" : "") + "</div>";
      }).join("") +
      (C.note ? '<div class="note rv"><i></i><p>' + esc(t(C.note)) + "</p><i></i></div>" : "") + "</section>" + photo() +
      '<section class="tx"><h2 class="h2 rv">' + esc(x("left")) + '</h2><div class="cdn rv" data-cd>' + ["days", "hours", "minutes", "seconds"].map(function (k) {
        return '<div><b data-k="' + k + '">00</b><span>' + esc(u(k)) + "</span></div>"; }).join("") + "</div>" +
      (C.rsvp ? '<h2 class="h2 rv" style="margin-top:56px">' + esc(x("rsvp")) + '</h2><p class="s rv">' + esc(x("rsvpLead")) + " " + esc(K.deadline()) + "</p>" +
        '<form class="rs rv" id="rf"><label class="radio"><input type="radio" name="attend" value="yes" checked>' + esc(u("yes")) + "</label>" +
        '<label class="radio"><input type="radio" name="attend" value="no">' + esc(u("no")) + "</label>" +
        '<div class="fl"><label for="rn">' + esc(u("name")) + '</label><input id="rn" name="name" required autocomplete="name"></div>' +
        '<div class="fl"><label for="rg">' + esc(u("guests")) + '</label><select id="rg" name="guests">' + [1, 2, 3, 4, 5, 6].map(function (i) { return "<option>" + i + "</option>"; }).join("") + "</select></div>" +
        (C.song ? '<div class="fl"><label for="rsong">' + esc(x("songL")) + '</label><input id="rsong" name="note"></div>' : "") +
        '<button class="pill fill" type="submit">' + esc(u("send")) + "</button></form>" : "") +
      '<h2 class="h2 sig rv">' + esc(x("love")) + " " + esc(n[0] || "") + " " + esc(x("and")) + " " + esc(n[1] || "") + "</h2></section>" + photo() +
      '<footer class="ft"><button class="share" type="button">↗ ' + esc(x("share")) + '</button>' + /* WhatsApp/Telegram պատկերակները հանված են՝ վերջում միայն HRAVIRIR-ի լոգոն (հաճախորդի խնդրանքով) */
      "<div>" + esc(x("made")) + ' <a href="https://hravirir.am" target="_blank" rel="noopener">www.hravirir.am</a>' + esc(x("by")) + "</div></footer></div>";
  }

  var opened = K.PREVIEW;
  function render() {
    document.documentElement.lang = K.lang;
    document.title = K.names().join(" " + x("and") + " ");
    document.getElementById("app").innerHTML = (opened ? "" : env()) + "<main>" + page() + "</main>" + K.chrome();
    document.body.classList.toggle("locked", !opened);
    if (opened) K.reveal(); else document.getElementById("env").onclick = open;
    K.countdown(false); K.rsvp(document.getElementById("rf")); K.bindChrome(render); K.music.sync();
    var sh = document.querySelector(".share");
    if (sh) sh.onclick = function () { if (navigator.share) navigator.share({ title: document.title, url: location.href }).catch(function () {}); else if (navigator.clipboard) navigator.clipboard.writeText(location.href); };
  }
  function open() {
    var e = document.getElementById("env"); if (!e || e.dataset.busy) return;
    e.dataset.busy = "1"; K.music.play();
    [[0, "s1"], [700, "s2"], [1700, "s3"]].forEach(function (s) { setTimeout(function () { e.classList.add(s[1]); }, s[0]); });
    setTimeout(function () { opened = true; document.body.classList.remove("locked"); scrollTo(0, 0); K.reveal(); }, 2300);
    setTimeout(function () { e.remove(); }, 3000);
  }
  render();
})();
