/* David Genty — portfolio sécurité : menu mobile, section active, apparition douce. */
(function () {
  'use strict';
  document.documentElement.classList.add('js');

  // Menu mobile
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('menu');
  function closeMenu() {
    if (!nav) return;
    nav.classList.remove('is-open');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  }
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
  }

  // Formulaire de contact (Web3Forms) : validation, envoi sans quitter la page, message de retour.
  var form = document.getElementById('formulaire');
  if (form) {
    var status = form.querySelector('.form-status');
    var button = form.querySelector('button[type="submit"]');
    var setStatus = function (html, kind) {
      status.innerHTML = html;
      status.className = 'form-status' + (kind ? ' is-' + kind : '');
    };
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var firstInvalid = null;
      form.querySelectorAll('[required]').forEach(function (el) {
        var ok = el.type === 'checkbox' ? el.checked : el.checkValidity() && el.value.trim() !== '';
        el.setAttribute('aria-invalid', ok ? 'false' : 'true');
        if (!ok && !firstInvalid) firstInvalid = el;
      });
      if (firstInvalid) {
        setStatus('Merci de compléter les champs obligatoires (*) avec une adresse e-mail valide.', 'error');
        firstInvalid.focus();
        return;
      }
      if (form.botcheck && form.botcheck.checked) return; // robot probable
      var key = form.access_key.value;
      if (!key || key === 'A_REMPLACER') {
        setStatus('Le formulaire n’est pas encore activé. En attendant, vous pouvez me contacter via <a href="https://www.linkedin.com/in/david--genty/" target="_blank" rel="noopener noreferrer">LinkedIn</a>.', 'error');
        return;
      }
      var data = {};
      new FormData(form).forEach(function (v, k) { data[k] = v; });
      data.replyto = data.email;
      button.disabled = true;
      setStatus('Envoi en cours…');
      fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      }).then(function (r) { return r.json().then(function (j) { return { ok: r.ok && j.success, j: j }; }); })
        .then(function (res) {
          if (res.ok) {
            form.reset();
            setStatus('Merci, votre message a bien été envoyé. Je vous réponds rapidement.', 'ok');
          } else {
            throw new Error((res.j && res.j.message) || 'envoi refusé');
          }
        })
        .catch(function () {
          setStatus('L’envoi n’a pas abouti. Réessayez plus tard ou contactez-moi via <a href="https://www.linkedin.com/in/david--genty/" target="_blank" rel="noopener noreferrer">LinkedIn</a>.', 'error');
        })
        .then(function () { button.disabled = false; });
    });
    form.addEventListener('input', function (e) {
      if (e.target.getAttribute('aria-invalid') === 'true') e.target.setAttribute('aria-invalid', 'false');
    });
  }

  if (!('IntersectionObserver' in window)) return;

  // Section active dans la navigation
  var links = {};
  document.querySelectorAll('.main-nav a[href^="#"]').forEach(function (a) { links[a.getAttribute('href').slice(1)] = a; });
  var spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var link = links[entry.target.id];
      if (!link) return;
      if (entry.isIntersecting) {
        Object.keys(links).forEach(function (k) { links[k].classList.remove('is-active'); });
        link.classList.add('is-active');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  Object.keys(links).forEach(function (id) { var s = document.getElementById(id); if (s) spy.observe(s); });

  // Apparition douce des blocs
  var items = document.querySelectorAll('.step, .entry, .method-card, .cert, .action-card, .extra-card');
  var reveal = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); reveal.unobserve(entry.target); }
    });
  }, { threshold: 0.12 });
  items.forEach(function (el) { el.classList.add('reveal'); reveal.observe(el); });
})();
