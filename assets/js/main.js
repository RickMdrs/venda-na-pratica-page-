/* ============================================================
   Vendas na Prática — comportamento da página
   Sem dependências. Tudo client-side (wa.me).
   ============================================================ */
(function () {
  'use strict';

  var C = window.CONFIG || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------- UTMs ---------------- */
  var UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
  var params = new URLSearchParams(location.search);
  var utms = {};
  try { utms = JSON.parse(sessionStorage.getItem('vnp_utms') || '{}'); } catch (e) { utms = {}; }
  UTM_KEYS.forEach(function (k) { if (params.get(k)) utms[k] = params.get(k); });
  try { sessionStorage.setItem('vnp_utms', JSON.stringify(utms)); } catch (e) { /* modo privado */ }

  /* ---------------- Tracking ---------------- */
  function loadScript(src) {
    var s = document.createElement('script'); s.async = true; s.src = src; document.head.appendChild(s);
  }

  if (C.ga4Id) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', C.ga4Id);
    loadScript('https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(C.ga4Id));
  }

  if (C.metaPixelId) {
    /* Meta Pixel base code */
    !function (f, b, e, v, n, t, s) { if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); }; if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = []; t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s); }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', C.metaPixelId);
    window.fbq('track', 'PageView');
  }

  if (C.tiktokPixelId) {
    /* TikTok Pixel base code */
    !function (w, d, t) { w.TiktokAnalyticsObject = t; var ttq = w[t] = w[t] || []; ttq.methods = ['page', 'track', 'identify', 'instances', 'debug', 'on', 'off', 'once', 'ready', 'alias', 'group', 'enableCookie', 'disableCookie', 'holdConsent', 'revokeConsent', 'grantConsent']; ttq.setAndDefer = function (t, e) { t[e] = function () { t.push([e].concat(Array.prototype.slice.call(arguments, 0))); }; }; for (var i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]); ttq.instance = function (t) { for (var e = ttq._i[t] || [], n = 0; n < ttq.methods.length; n++) ttq.setAndDefer(e, ttq.methods[n]); return e; }; ttq.load = function (e, n) { var r = 'https://analytics.tiktok.com/i18n/pixel/events.js'; ttq._i = ttq._i || {}; ttq._i[e] = []; ttq._i[e]._u = r; ttq._t = ttq._t || {}; ttq._t[e] = +new Date(); ttq._o = ttq._o || {}; ttq._o[e] = n || {}; var o = d.createElement('script'); o.type = 'text/javascript'; o.async = !0; o.src = r + '?sdkid=' + e + '&lib=' + t; var a = d.getElementsByTagName('script')[0]; a.parentNode.insertBefore(o, a); }; ttq.load(C.tiktokPixelId); ttq.page(); }(window, document, 'ttq');
  }

  function ga(name, p) {
    if (window.gtag && C.ga4Id) window.gtag('event', name, Object.assign({ transport_type: 'beacon' }, p || {}));
  }
  function fb(name, p) { if (window.fbq && C.metaPixelId) window.fbq('track', name, p || {}); }
  function tt(name, p) { if (window.ttq && C.tiktokPixelId) window.ttq.track(name, p || {}); }

  /* ---------------- WhatsApp ---------------- */
  var ONDE_FRASE = {
    'Concessionária': 'vendo em concessionária',
    'Loja de seminovos': 'vendo em loja de seminovos',
    'Vendo por conta própria': 'vendo por conta própria',
    'Outro ramo': 'trabalho em outro ramo'
  };
  function lowerFirst(s) { return s ? s.charAt(0).toLowerCase() + s.slice(1) : s; }
  function origem() { return utms.utm_source ? ' (origem: ' + utms.utm_source + ')' : ''; }
  function waUrl(text) {
    var num = String(C.whatsapp || '').replace(/\D/g, '');
    if (!num) console.warn('[Vendas na Prática] CONFIG.whatsapp vazio. Preencha em assets/js/config.js.');
    return 'https://wa.me/' + num + '?text=' + encodeURIComponent(text);
  }
  function openWhatsApp(url) {
    // (com 'noopener' o window.open sempre devolve null, então zera o opener na mão)
    var w = window.open(url, '_blank');
    if (w) { try { w.opener = null; } catch (e) { /* ok */ } }
    else window.location.href = url; // popup bloqueado / navegador do TikTok/Instagram
  }

  /* ---------------- Logo (componente isolado) ---------------- */
  function logoHTML(variant) {
    if (C.logoSrc) {
      return '<span class="logo logo--' + variant + '"><img src="' + C.logoSrc + '" alt="Vendas na Prática com Celina Mota" width="180" height="36"></span>';
    }
    var icon =
      '<svg class="logo__ic" viewBox="0 0 32 32" aria-hidden="true">' +
        '<g fill="currentColor"><rect x="3" y="24" width="4" height="5" rx="1"/><rect x="10" y="21" width="4" height="8" rx="1"/><rect x="17" y="18" width="4" height="11" rx="1"/><rect x="24" y="15" width="4" height="14" rx="1"/></g>' +
        '<g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18 12 11l5 3L28 4"/><path d="M22.5 4H28v5.5"/></g>' +
      '</svg>';
    var by = variant === 'full' ? '<span class="logo__by">COM CELINA MOTA</span>' : '';
    return '<span class="logo logo--' + variant + '">' + icon +
      '<span class="logo__txt"><span class="logo__name">VENDAS NA PRÁTICA</span>' + by + '</span></span>';
  }
  $$('[data-logo]').forEach(function (el) { el.innerHTML = logoHTML(el.getAttribute('data-logo')); });

  /* ---------------- Variante do H1 (teste A/B) ---------------- */
  var variant = (params.get('h') || C.heroVariant || 'a').toLowerCase();
  if (C.heroVariants && C.heroVariants[variant] && variant !== 'a') {
    $('#hero-title').innerHTML = C.heroVariants[variant];
  }
  if (C.ga4Id) window.gtag('set', { hero_variant: variant });

  /* ---------------- Conteúdo vindo do config ---------------- */
  function esc(s) { var d = document.createElement('div'); d.textContent = s == null ? '' : String(s); return d.innerHTML; }

  var list = $('#deliver-list');
  (C.entregaveis || []).filter(function (x) { return x.enabled !== false && x.titulo; }).forEach(function (x) {
    var li = document.createElement('li');
    li.className = 'reveal';
    var bonus = /b[oô]nus/i.test(x.tag);
    li.innerHTML = '<span class="deliver__tag' + (bonus ? ' deliver__tag--bonus' : '') + '">' + esc(x.tag) + '</span>' +
      '<span class="deliver__t">' + esc(x.titulo) + '</span>';
    list.appendChild(li);
  });

  if (C.showTestimonials && (C.depoimentos || []).length) {
    var tl = $('#testi-list');
    C.depoimentos.forEach(function (d) {
      var li = document.createElement('li');
      li.innerHTML = '<img src="' + esc(d.img) + '" alt="Depoimento de ' + esc(d.nome) + '" loading="lazy" width="600" height="800">' +
        '<div><b>' + esc(d.nome) + '</b><small>' + esc(d.local) + '</small></div>';
      tl.appendChild(li);
    });
    $('#depoimentos').hidden = false;
  } else if ((C.tiktokVideos || []).length) {
    var vl = $('#video-list');
    C.tiktokVideos.forEach(function (v) {
      var li = document.createElement('li');
      li.innerHTML = '<a href="' + esc(v.url) + '" target="_blank" rel="noopener"><svg class="i"><use href="#i-play"/></svg>' + esc(v.titulo) + '</a>';
      vl.appendChild(li);
    });
    $('#tiktok-videos').hidden = false;
  }

  [['tiktok', C.tiktok], ['instagram', C.instagram]].forEach(function (pair) {
    if (!pair[1]) return;
    var li = $('[data-social="' + pair[0] + '"]');
    li.hidden = false;
    $('a', li).href = pair[1];
  });

  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
  if (C.creditoDev) {
    var cr = $('[data-credit]'); cr.textContent = 'Desenvolvido por ' + C.creditoDev; cr.hidden = false;
  }

  /* ---------------- Header + botão flutuante ---------------- */
  var header = $('.header');
  var fab = $('.fab');
  var ticking = false;
  function onScroll() {
    var y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 12);
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var show = max > 0 && y / max >= 0.3;
    if (fab.classList.contains('is-visible') !== show) {
      fab.classList.toggle('is-visible', show);
      fab.tabIndex = show ? 0 : -1;
    }
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  /* ---------------- Reveal ao rolar ---------------- */
  var reveals = $$('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---------------- FAQ (um aberto por vez) ---------------- */
  $$('.faq__q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq__item');
      var willOpen = !item.classList.contains('is-open');
      $$('.faq__item.is-open').forEach(function (it) {
        it.classList.remove('is-open');
        $('.faq__q', it).setAttribute('aria-expanded', 'false');
      });
      if (willOpen) { item.classList.add('is-open'); btn.setAttribute('aria-expanded', 'true'); }
    });
  });

  /* ---------------- Modal ---------------- */
  var modal = $('#lead-modal');
  var panel = $('.modal__panel', modal);
  var form = $('#lead-form');
  var lastFocus = null;
  var closeTimer = null;

  function focusables() {
    return $$('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])', panel)
      .filter(function (el) { return el.offsetParent !== null; });
  }

  function openModal(section) {
    clearTimeout(closeTimer);
    lastFocus = document.activeElement;
    modal.hidden = false;
    document.body.classList.add('no-scroll');
    void modal.offsetWidth; // força reflow para a transição
    modal.classList.add('is-open');
    ga('form_open', { section: section });
    setTimeout(function () {
      var first = $('#f-nome');
      // no celular, não abre o teclado sozinho em cima do sheet
      (window.matchMedia('(min-width: 640px)').matches ? first : panel.querySelector('.modal__close')).focus();
    }, reduceMotion ? 0 : 320);
  }

  function closeModal() {
    modal.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
    closeTimer = setTimeout(function () { modal.hidden = true; }, reduceMotion ? 0 : 380);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  $$('[data-cta]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var section = btn.getAttribute('data-cta');
      ga('cta_click', { section: section });
      openModal(section);
    });
  });

  $$('[data-close]', modal).forEach(function (el) { el.addEventListener('click', closeModal); });

  modal.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { e.preventDefault(); closeModal(); return; }
    if (e.key !== 'Tab') return;
    var f = focusables(); if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  /* ---------------- Formulário ---------------- */
  var MSG = {
    nome: 'Escreve seu nome pra eu saber com quem estou falando.',
    onde_vende: 'Escolhe onde você vende.',
    travamento: 'Escolhe o que mais te trava hoje.'
  };

  function setError(field, msg) {
    var wrap = field.closest('.field');
    wrap.classList.toggle('has-error', !!msg);
    field.setAttribute('aria-invalid', msg ? 'true' : 'false');
    $('.field__err', wrap).textContent = msg || '';
  }
  function validate(field) {
    var ok = field.value.trim().length > (field.name === 'nome' ? 1 : 0);
    setError(field, ok ? '' : MSG[field.name]);
    return ok;
  }

  $$('input, select', form).forEach(function (field) {
    field.addEventListener('blur', function () { if (field.value) validate(field); });
    field.addEventListener('change', function () { if (field.closest('.field').classList.contains('has-error')) validate(field); });
    field.addEventListener('input', function () { if (field.closest('.field').classList.contains('has-error')) validate(field); });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var fields = $$('input, select', form);
    var firstBad = null;
    fields.forEach(function (f) { if (!validate(f) && !firstBad) firstBad = f; });
    if (firstBad) { firstBad.focus(); return; }

    var nome = form.nome.value.trim().replace(/\s+/g, ' ');
    var onde = form.onde_vende.value;
    var trava = form.travamento.value;

    var text = 'Oi Celina! Sou ' + nome + ', ' + (ONDE_FRASE[onde] || onde) +
      '. Meu maior travamento hoje é: ' + lowerFirst(trava) +
      '. Vim pela sua página e quero saber mais sobre o Vendas na Prática.' + origem();

    // Eventos de conversão (o envio é o momento confirmado: a mensagem sai pronta)
    ga('form_submit', { onde_vende: onde, travamento: trava });
    fb('Lead', { content_name: 'Vendas na Prática', status: onde });
    tt('SubmitForm', { content_name: 'Vendas na Prática' });

    // Webhook opcional (Google Sheets etc.) — não bloqueia o redirect
    if (C.leadWebhookUrl) {
      try {
        fetch(C.leadWebhookUrl, {
          method: 'POST', mode: 'no-cors', keepalive: true,
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(Object.assign({
            nome: nome, onde_vende: onde, travamento: trava,
            pagina: location.href, data: new Date().toISOString()
          }, utms))
        });
      } catch (err) { /* segue pro WhatsApp mesmo assim */ }
    }

    openWhatsApp(waUrl(text));
  });

  /* Link direto (sem formulário) */
  $$('[data-direct]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      fb('Contact', { content_name: 'Vendas na Prática' });
      ga('cta_click', { section: 'direto_' + a.getAttribute('data-direct') });
      openWhatsApp(waUrl('Oi Celina! Vim pela sua página e quero saber mais sobre o Vendas na Prática.' + origem()));
    });
  });
})();
