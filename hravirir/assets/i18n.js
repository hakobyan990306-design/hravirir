/* hravirir.am — կայքի եռալեզու թարգմանություն (հայերենը index.html-ում է, այստեղ՝ ռուսերեն և անգլերեն)
   Տարրերը նշված են data-i="tN" բանալիով. լեզուն պահվում է localStorage-ում ("site-lang") և ?lang=ru|en|hy հղումով */
(function () {
  "use strict";
  var D = {
    ru: {
      t1: "Дизайны", t2: "Возможности", t3: "Как это работает", t4: "Цены", t5: "Вопросы", t6: "Заказать",
      t7: "Онлайн-приглашения", t8: "Приглашение, которое гости <em class=\"foil\">откроют с улыбкой</em>",
      t9: "Гость открывает ссылку, нажимает на печать — и конверт раскрывается под музыку. Внутри всё: программа дня, места на карте, дресс-код и кнопка ответа. Больше не нужно печатать, разносить и всех обзванивать.",
      t10: "Смотреть дизайны", t11: "Заказать сейчас", t12: "стартовая цена", t13: "24 часа", t14: "срочное изготовление", t15: "3 языка", t16: "hy · рус · eng",
      t17: "<i></i>Анна подтвердила участие", t18: "👆 Нажмите на печать",
      t19: "Свадьба", t20: "Для самого важного дня", t21: "Помолвка", t22: "Когда она сказала «да»", t23: "Крестины", t24: "Благословенный день малыша", t25: "День рождения", t26: "Детские и юбилейные",
      t27: "Каталог", t28: "Выберите свой дизайн", t29: "Откройте любой пример и посмотрите его так, как увидят ваши гости. Все тексты, цвета и фотографии меняются по вашему желанию.",
      t30: "Все", t31: "Свадьба", t32: "Помолвка", t33: "Крестины", t34: "День рождения",
      t35: "Что в приглашении", t36: "Больше, чем обычное приглашение",
      t37: "Открывающийся конверт", t38: "Гость нажимает на печать, конверт раскрывается и начинает играть музыка.",
      t39: "Таймер и календарь", t40: "Живой обратный отсчёт до праздника и календарь с отмеченной датой.",
      t41: "Программа и карта", t42: "Дом жениха, дом невесты, церковь, банкетный зал — по времени. Одним нажатием гость открывает маршрут в Google Maps.",
      t43: "Подтверждение присутствия", t44: "Гости отвечают прямо из приглашения, а вы точно знаете, на сколько человек заказывать столы.",
      t45: "До 3 языков", t46: "Армянский, русский, английский — переключение одной кнопкой.",
      t47: "Идеально на телефоне", t48: "Адаптировано для любого телефона, планшета и компьютера.",
      t49: "Всё просто", t50: "Как это работает", t51: "Весь процесс онлайн, без встреч.",
      t52: "Выберите дизайн", t53: "Откройте примеры с телефона, как это сделают ваши гости, и выберите дизайн по душе.",
      t54: "Отправьте данные", t55: "Имена, дата, адреса, время, несколько фото. Можно просто отправить голосовое сообщение в Telegram — остальное сделаем мы.",
      t56: "Проверьте и поправьте", t57: "За 1–3 дня (при срочном заказе — за 24 часа) отправим готовую ссылку. Если что-то захотите изменить, исправим бесплатно.",
      t58: "Отправьте гостям", t59: "Одна ссылка — в WhatsApp, Viber, Telegram или Instagram. Каждая семья может получить приглашение со своим именем.",
      t60: "Цены", t61: "Прозрачно и доступно", t62: "Вы платите только за то, что вам нужно.",
      t63: "Онлайн-приглашение", t64: "любой дизайн", t65: "Открывающийся конверт и анимации", t66: "Имена, текст, ваши фото", t67: "Календарь и обратный отсчёт",
      t68: "Программа дня со ссылками на карту", t69: "Индивидуальная ссылка", t70: "Правки, пока результат вам не понравится", t71: "Заказать", t72: "Дополнительные услуги",
      t73: "Заказ", t74: "Информация для приглашения", t75: "Выберите тип мероприятия и заполните то, что хотите видеть в приглашении. Заказ придёт нам в Telegram, и мы свяжемся с вами.",
      t76: "Вопросы", t77: "Частые вопросы",
      t78: "Что такое онлайн-приглашение?", t79: "Это персональный сайт вашего мероприятия: имена, дата, программа, карта, фото и музыка. Вы отправляете гостям одну ссылку, и они открывают её с телефона.",
      t80: "Сколько времени занимает изготовление?", t81: "Обычно 1–3 дня. С услугой «Готовность за 24 часа» (+2.000 ֏) приглашение будет готово за один день.",
      t82: "Можно ли изменить цвета и тексты?", t83: "Да. Все тексты, фото, программа и цвета меняются по вашему желанию. После изготовления вы проверяете, а мы исправляем всё, что нужно.",
      t84: "Как я узнаю, кто придёт?", t85: "С услугой «Подтверждение присутствия» ответы гостей собираются в вашей таблице, и вы в любой момент видите, кто придёт и сколько человек.",
      t86: "Как работает список гостей по столам?", t87: "Гость вводит в приглашении своё имя или фамилию и сразу видит номер своего стола. В зале не будет очередей и путаницы.",
      t88: "Как долго работает ссылка?", t89: "Приглашение доступно до мероприятия и ещё несколько месяцев после, чтобы гости могли пересмотреть его.",
      t90: "Как оплатить?", t91: "После подтверждения заказа мы отправим реквизиты для оплаты (перевод на карту, Idram или наличными).",
      t92: "Начнём", t93: "Ваш праздник заслуживает красивого приглашения", t94: "Не знаете, какой дизайн выбрать? Напишите нам, расскажите о своём празднике — и мы предложим то, что подойдёт именно вам.",
      t95: "Написать в Telegram", t96: "Онлайн-приглашения на свадьбу, помолвку, крестины и день рождения.", t97: "Контакты", t98: "Соцсети", t99: "Дизайны", t100: "Цены",
      copy: "Все права защищены", title: "HRAVIRIR.AM — Онлайн-приглашения", desc: "Красивые онлайн-приглашения на свадьбу, помолвку, крестины и день рождения. От 8.000 ֏, готовность за 24 часа."
    },
    en: {
      t1: "Designs", t2: "Features", t3: "How it works", t4: "Pricing", t5: "FAQ", t6: "Order",
      t7: "Web invitations", t8: "An invitation your guests <em class=\"foil\">open with a smile</em>",
      t9: "Your guest opens the link, taps the seal and the envelope opens to music. Everything is inside: the schedule, venues on the map, dress code and an RSVP button. No more printing, delivering and calling everyone.",
      t10: "See designs", t11: "Order now", t12: "starting price", t13: "24 hours", t14: "express delivery", t15: "3 languages", t16: "hy · рус · eng",
      t17: "<i></i>Anna confirmed attendance", t18: "👆 Tap the seal",
      t19: "Wedding", t20: "For the most important day", t21: "Engagement", t22: "When she said “yes”", t23: "Baptism", t24: "A blessed day for your little one", t25: "Birthday", t26: "Kids & anniversaries",
      t27: "Catalog", t28: "Choose your design", t29: "Open any sample and see it exactly as your guests will. All texts, colors and photos are changed to your wishes.",
      t30: "All", t31: "Wedding", t32: "Engagement", t33: "Baptism", t34: "Birthday",
      t35: "What's inside", t36: "More than an ordinary invitation",
      t37: "Opening envelope", t38: "The guest taps the seal, the envelope opens and the music starts.",
      t39: "Countdown & calendar", t40: "A live countdown to the celebration and a calendar with the date marked.",
      t41: "Schedule & map", t42: "Groom's home, bride's home, church, banquet hall — with times. One tap opens directions in Google Maps.",
      t43: "RSVP", t44: "Guests reply right from the invitation, so you know exactly how many people to plan tables for.",
      t45: "Up to 3 languages", t46: "Armenian, Russian, English — switch with one button.",
      t47: "Perfect on mobile", t48: "Adapted to any phone, tablet and computer.",
      t49: "It's simple", t50: "How it works", t51: "The whole process is online, no meetings needed.",
      t52: "Choose a design", t53: "Open the samples on your phone, just like your guests will, and pick the one you love.",
      t54: "Send your details", t55: "Names, date, addresses, times and a few photos. You can simply send a voice message on Telegram — we'll do the rest.",
      t56: "Review and adjust", t57: "In 1–3 days (24 hours for express orders) we send you the ready link. If you'd like to change anything, we fix it for free.",
      t58: "Send it to your guests", t59: "One link via WhatsApp, Viber, Telegram or Instagram. Each family can receive an invitation with their own name.",
      t60: "Pricing", t61: "Clear and affordable", t62: "You pay only for what you need.",
      t63: "Web invitation", t64: "any design", t65: "Opening envelope and animations", t66: "Names, text, your photos", t67: "Calendar and countdown",
      t68: "Schedule with map links", t69: "Personal link", t70: "Revisions until you love the result", t71: "Order", t72: "Extra services",
      t73: "Order", t74: "Invitation details", t75: "Choose the type of event and fill in what you'd like to see in the invitation. The order comes to us on Telegram and we'll get in touch.",
      t76: "FAQ", t77: "Frequently asked questions",
      t78: "What is a web invitation?", t79: "It's a personal website for your event with names, date, schedule, map, photos and music. You send your guests one link and they open it on their phones.",
      t80: "How long does it take?", t81: "Usually 1–3 days. With the “Ready in 24 hours” service (+2.000 ֏) your invitation is ready in one day.",
      t82: "Can I change the colors and texts?", t83: "Yes. All texts, photos, the schedule and colors are changed to your wishes. After it's made you review it and we correct whatever is needed.",
      t84: "How will I know who is coming?", t85: "With the RSVP service, guests' replies are collected in your own spreadsheet, so you can always see who is coming and with how many people.",
      t86: "How does the seating list work?", t87: "The guest types their name or surname in the invitation and instantly sees their table number. No queues or confusion at the venue.",
      t88: "How long is the link active?", t89: "The invitation is available until the event and for several months after, so guests can look at it again.",
      t90: "How do I pay?", t91: "After the order is confirmed we send the payment details (card transfer, Idram or cash).",
      t92: "Let's start", t93: "Your celebration deserves a beautiful invitation", t94: "Not sure which design to choose? Write to us, tell us about your celebration and we'll suggest the one that suits you best.",
      t95: "Message us on Telegram", t96: "Web invitations for weddings, engagements, baptisms and birthdays.", t97: "Contact", t98: "Social", t99: "Designs", t100: "Pricing",
      copy: "All rights reserved", title: "HRAVIRIR.AM — Web invitations", desc: "Beautiful web invitations for weddings, engagements, baptisms and birthdays. From 8.000 ֏, ready in 24 hours."
    }
  };
  var LANGS = ["hy", "ru", "en"], orig = {}, origTitle = document.title, metaD = document.querySelector('meta[name="description"]'), origDesc = metaD ? metaD.content : "";
  document.querySelectorAll("[data-i]").forEach(function (el) { orig[el.dataset.i] = el.innerHTML; });
  function get() {
    var q = new URLSearchParams(location.search).get("lang");
    if (LANGS.indexOf(q) > -1) return q;
    try { var s = localStorage.getItem("site-lang"); if (LANGS.indexOf(s) > -1) return s; } catch (e) {}
    return "hy";
  }
  var cur = get(), subs = [];
  function apply(l) {
    cur = l; var d = D[l] || {};
    document.documentElement.lang = l;
    document.querySelectorAll("[data-i]").forEach(function (el) { var k = el.dataset.i; el.innerHTML = l === "hy" ? orig[k] : (d[k] || orig[k]); });
    document.title = l === "hy" ? origTitle : d.title; if (metaD) metaD.content = l === "hy" ? origDesc : d.desc;
    document.querySelectorAll("[data-lang]").forEach(function (b) { b.classList.toggle("on", b.dataset.lang === l); });
    try { localStorage.setItem("site-lang", l); localStorage.setItem("inv-lang", l); localStorage.setItem("ho-lang", l); } catch (e) {}
    subs.forEach(function (f) { f(l); });
  }
  window.SiteLang = { get: function () { return cur; }, set: apply, on: function (f) { subs.push(f); } };
  document.addEventListener("click", function (e) { var b = e.target.closest && e.target.closest("[data-lang]"); if (b) { e.preventDefault(); apply(b.dataset.lang); } });
  apply(cur);
})();
