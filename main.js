(function () {
  'use strict';

  var root = document.documentElement;
  var header = document.getElementById('header');
  var nav = document.querySelector('.nav');
  var toggle = document.querySelector('.nav-toggle');

  function setNavOpen(open) {
    if (!nav || !toggle) return;
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      setNavOpen(!nav.classList.contains('is-open'));
    });
  }

  document.querySelectorAll('.nav-list a').forEach(function (link) {
    link.addEventListener('click', function () {
      setNavOpen(false);
    });
  });

  var lastScroll = 0;
  function onScroll() {
    if (!header) return;
    var y = window.scrollY || window.pageYOffset;
    if (y > 60) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
    lastScroll = y;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Theme (default: dark) */
  function getTheme() {
    return root.classList.contains('theme-light') ? 'light' : 'dark';
  }
  function applyTheme(theme) {
    root.classList.remove('theme-dark', 'theme-light');
    root.classList.add(theme === 'light' ? 'theme-light' : 'theme-dark');
    localStorage.setItem('ieeee-theme', theme);
    document.querySelectorAll('.theme-btn').forEach(function (btn) {
      var isActive = btn.getAttribute('data-theme') === theme;
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
  }
  document.querySelectorAll('.theme-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyTheme(btn.getAttribute('data-theme'));
    });
  });
  applyTheme(getTheme());

  /* Scroll reveal (respect prefers-reduced-motion) */
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReducedMotion) {
    var revealSections = document.querySelectorAll('.section.reveal');
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0 });
    revealSections.forEach(function (el) { observer.observe(el); });
  } else {
    document.querySelectorAll('.section.reveal').forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* Starfield: varied stars, random twinkle, mouse parallax (default dark theme ensured in head script) */
  var starsEl = document.getElementById('bg-stars');
  if (starsEl) {
    var sizePool = ['xs', 'xs', 's', 's', 's', 'm', 'm', 'm', 'l', 'xl'];
    var variantPool = ['', '', '', '', 'soft', 'warm'];
    var count = 130;
    for (var i = 0; i < count; i++) {
      var star = document.createElement('div');
      var size = sizePool[Math.floor(Math.random() * sizePool.length)];
      var variant = variantPool[Math.floor(Math.random() * variantPool.length)];
      star.className = 'star star--' + size + (variant ? ' star--' + variant : '');
      var doTwinkle = Math.random() < 0.42;
      if (doTwinkle) {
        star.classList.add('star--twinkle');
        star.style.animationDuration = (1.8 + Math.random() * 4.2).toFixed(2) + 's';
        star.style.animationDelay = (Math.random() * 4).toFixed(2) + 's';
      }
      star.style.left = (Math.random() * 100) + '%';
      star.style.top = (Math.random() * 100) + '%';
      starsEl.appendChild(star);
    }
    var mouseX = 0, mouseY = 0;
    var currentX = 0, currentY = 0;
    var parallaxStrength = 52;
    var smooth = 0.1;
    var aurora1 = document.getElementById('aurora-1');
    var aurora2 = document.getElementById('aurora-2');
    var aurora3 = document.getElementById('aurora-3');
    function lerp(a, b, t) { return a + (b - a) * t; }
    function onMouseMove(e) {
      var w = window.innerWidth;
      var h = window.innerHeight;
      mouseX = (e.clientX - w * 0.5) / w * parallaxStrength;
      mouseY = (e.clientY - h * 0.5) / h * parallaxStrength;
    }
    function animateStars() {
      currentX = lerp(currentX, mouseX, smooth);
      currentY = lerp(currentY, mouseY, smooth);
      starsEl.style.transform = 'translate(' + currentX + 'px, ' + currentY + 'px)';
      if (aurora1) aurora1.style.transform = 'translate(' + (currentX * 0.32) + 'px, ' + (currentY * 0.32) + 'px) translateZ(-80px)';
      if (aurora2) aurora2.style.transform = 'translate(' + (currentX * 0.58) + 'px, ' + (currentY * 0.58) + 'px) translateZ(-40px)';
      if (aurora3) aurora3.style.transform = 'translate(calc(-50% + ' + (currentX * -0.5) + 'px), ' + (currentY * -0.5) + 'px) translateZ(-20px)';
      requestAnimationFrame(animateStars);
    }
    document.addEventListener('mousemove', onMouseMove, { passive: true });
    requestAnimationFrame(animateStars);
  }

  /* Click feedback: layered tech ripple at cursor */
  var clickContainer = document.getElementById('click-feedback-container');
  if (clickContainer) {
    document.addEventListener('click', function (e) {
      var x = e.clientX;
      var y = e.clientY;
      var el = document.createElement('div');
      el.className = 'click-feedback';
      el.style.left = x + 'px';
      el.style.top = y + 'px';
      el.innerHTML = '<span class="click-feedback__core"></span>' +
        '<span class="click-feedback__ring click-feedback__ring--1"></span>' +
        '<span class="click-feedback__ring click-feedback__ring--2"></span>' +
        '<span class="click-feedback__ring click-feedback__ring--3"></span>';
      clickContainer.appendChild(el);
      setTimeout(function () {
        if (el.parentNode) el.parentNode.removeChild(el);
      }, 850);
    }, { passive: true });
  }
})();
