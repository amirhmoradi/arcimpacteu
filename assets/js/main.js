/* ==========================================================================
   Arc IMPACT - Main JavaScript
   Vanilla JS for static archery coaching website. No build step.
   ========================================================================== */

(function () {
  'use strict';

  // -- Configuration (override via <body data-worker-url="...">) --
  const WORKER_URL =
    (document.body && document.body.getAttribute('data-worker-url')) ||
    'https://contact.arcimpact.eu/api/contact';
  const SCROLL_OFFSET = 80;
  const COUNTER_DURATION = 2000;

  // -- Utility --
  function debounce(fn, ms) {
    let timer;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(fn.bind(this, ...arguments), ms);
    };
  }

  function qs(sel, ctx) { return (ctx || document).querySelector(sel); }
  function qsa(sel, ctx) { return (ctx || document).querySelectorAll(sel); }

  // =======================================================================
  // 1. Mobile Navigation
  // =======================================================================
  function initMobileNav() {
    const hamburger = qs('.hamburger');
    const mobileMenu = qs('.mobile-menu');
    const overlay = qs('.mobile-menu-overlay');
    if (!hamburger || !mobileMenu) return;

    function toggle(open) {
      const isOpen = typeof open === 'boolean' ? open : !mobileMenu.classList.contains('active');
      hamburger.classList.toggle('active', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      mobileMenu.classList.toggle('active', isOpen);
      if (overlay) {
        overlay.classList.toggle('active', isOpen);
        overlay.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
      }
      document.body.classList.toggle('menu-open', isOpen);
    }

    hamburger.addEventListener('click', function () { toggle(); });
    if (overlay) overlay.addEventListener('click', function () { toggle(false); });
    qsa('a', mobileMenu).forEach(function (link) {
      link.addEventListener('click', function () { toggle(false); });
    });
  }

  // =======================================================================
  // 2. Sticky Header
  // =======================================================================
  function initStickyHeader() {
    var header = qs('.site-header');
    if (!header) return;

    var scrolled = false;
    var ticking = false;
    var SCROLL_ON = 64;
    var SCROLL_OFF = 16;

    function applyScrollState(y) {
      var next = scrolled;
      if (!scrolled && y > SCROLL_ON) next = true;
      if (scrolled && y < SCROLL_OFF) next = false;
      if (next !== scrolled) {
        scrolled = next;
        header.classList.toggle('scrolled', scrolled);
      }
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        applyScrollState(window.scrollY || window.pageYOffset || 0);
        ticking = false;
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // =======================================================================
  // 3. Smooth Scroll
  // =======================================================================
  function initSmoothScroll() {
    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href^="#"]');
      if (!link) return;
      var id = link.getAttribute('href');
      if (id === '#') return;
      var target = qs(id);
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  }

  // =======================================================================
  // 4. Scroll Animations
  // =======================================================================
  function initScrollAnimations() {
    var els = qsa('[data-animate]');
    if (!els.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var delay = entry.target.getAttribute('data-delay') || 0;
          setTimeout(function () {
            entry.target.classList.add('is-visible');
          }, parseInt(delay, 10));
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    els.forEach(function (el) { observer.observe(el); });
  }

  // =======================================================================
  // 5. Counter Animation
  // =======================================================================
  function initCounters() {
    var counters = qsa('[data-counter]');
    if (!counters.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var target = parseInt(el.getAttribute('data-counter'), 10);
        var suffix = el.getAttribute('data-suffix') || '';
        var start = 0;
        var startTime = null;

        function step(ts) {
          if (!startTime) startTime = ts;
          var progress = Math.min((ts - startTime) / COUNTER_DURATION, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          var current = Math.floor(eased * target);
          el.textContent = current + suffix;
          if (progress < 1) requestAnimationFrame(step);
          else el.textContent = target + suffix;
        }

        requestAnimationFrame(step);
        observer.unobserve(el);
      });
    }, { threshold: 0.3 });

    counters.forEach(function (el) { observer.observe(el); });
  }

  // =======================================================================
  // 6. Objective Bars Animation
  // =======================================================================
  function initObjectiveBars() {
    var bars = qsa('.objective-bar-fill');
    if (!bars.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    bars.forEach(function (bar) { observer.observe(bar); });
  }

  // =======================================================================
  // 7. Testimonial Carousel
  // =======================================================================
  function initCarousels() {
    qsa('.carousel').forEach(function (carousel) {
      var track = qs('.carousel-track', carousel);
      var slides = qsa('.carousel-slide', carousel);
      var prevBtn = qs('.carousel-btn-prev', carousel);
      var nextBtn = qs('.carousel-btn-next', carousel);
      var dotsContainer = qs('.carousel-dots', carousel);
      if (!track || slides.length === 0) return;

      var current = 0;
      var autoplayTimer = null;
      var slidesPerView = getSlidesPerView();

      function getSlidesPerView() {
        if (window.innerWidth >= 1024) return 3;
        if (window.innerWidth >= 768) return 2;
        return 1;
      }

      function maxIndex() {
        return Math.max(0, slides.length - slidesPerView);
      }

      function goTo(idx) {
        current = Math.max(0, Math.min(idx, maxIndex()));
        var pct = current * (100 / slidesPerView);
        track.style.transform = 'translateX(-' + pct + '%)';
        updateDots();
      }

      function next() { goTo(current >= maxIndex() ? 0 : current + 1); }
      function prev() { goTo(current <= 0 ? maxIndex() : current - 1); }

      function updateDots() {
        if (!dotsContainer) return;
        qsa('.carousel-dot', dotsContainer).forEach(function (dot, i) {
          dot.classList.toggle('active', i === current);
        });
      }

      function buildDots() {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';
        var total = maxIndex() + 1;
        for (var i = 0; i < total; i++) {
          var dot = document.createElement('button');
          dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
          dot.setAttribute('aria-label', 'Slide ' + (i + 1));
          dot.addEventListener('click', (function (idx) { return function () { goTo(idx); resetAutoplay(); }; })(i));
          dotsContainer.appendChild(dot);
        }
      }

      function startAutoplay() {
        stopAutoplay();
        autoplayTimer = setInterval(next, 5000);
      }

      function stopAutoplay() {
        if (autoplayTimer) clearInterval(autoplayTimer);
      }

      function resetAutoplay() {
        stopAutoplay();
        startAutoplay();
      }

      if (prevBtn) prevBtn.addEventListener('click', function () { prev(); resetAutoplay(); });
      if (nextBtn) nextBtn.addEventListener('click', function () { next(); resetAutoplay(); });

      carousel.addEventListener('mouseenter', stopAutoplay);
      carousel.addEventListener('mouseleave', startAutoplay);

      // Touch support
      var touchStartX = 0;
      var touchEndX = 0;
      track.addEventListener('touchstart', function (e) {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });
      track.addEventListener('touchend', function (e) {
        touchEndX = e.changedTouches[0].screenX;
        var diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
          if (diff > 0) next(); else prev();
          resetAutoplay();
        }
      }, { passive: true });

      window.addEventListener('resize', debounce(function () {
        slidesPerView = getSlidesPerView();
        buildDots();
        goTo(Math.min(current, maxIndex()));
      }, 200));

      buildDots();
      startAutoplay();
    });
  }

  // =======================================================================
  // 8. Gallery Lightbox
  // =======================================================================
  function initLightbox() {
    var lightbox = qs('.lightbox');
    if (!lightbox) return;
    var img = qs('img', lightbox);
    var closeBtn = qs('.lightbox-close', lightbox);
    var prevBtn = qs('.lightbox-prev', lightbox);
    var nextBtn = qs('.lightbox-next', lightbox);
    var galleryItems = [];
    var currentIdx = 0;

    qsa('.gallery-item').forEach(function (item, i) {
      var src = item.getAttribute('data-full') || qs('img', item).src;
      galleryItems.push(src);
      item.addEventListener('click', function () {
        currentIdx = i;
        open(src);
      });
    });

    function open(src) {
      img.src = src;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function close() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }

    function showNext() {
      currentIdx = (currentIdx + 1) % galleryItems.length;
      img.src = galleryItems[currentIdx];
    }

    function showPrev() {
      currentIdx = (currentIdx - 1 + galleryItems.length) % galleryItems.length;
      img.src = galleryItems[currentIdx];
    }

    if (closeBtn) closeBtn.addEventListener('click', close);
    if (prevBtn) prevBtn.addEventListener('click', showPrev);
    if (nextBtn) nextBtn.addEventListener('click', showNext);

    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) close();
    });

    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    });
  }

  // =======================================================================
  // 9. Language Switcher
  // =======================================================================
  function initLanguageSwitcher() {
    qsa('.lang-btn').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var lang = this.getAttribute('data-lang');
        if (lang) {
          localStorage.setItem('arc-impact-lang', lang);
          var href = this.getAttribute('href');
          if (href) window.location.href = href;
        }
      });
    });
  }

  // =======================================================================
  // 9b. Contact form URL prefill (?sujet=…&arme=…&niveau=…)
  // =======================================================================
  function initContactPrefill() {
    var form = qs('#contact-form');
    if (!form) return;
    var params = new URLSearchParams(window.location.search);
    var map = [
      ['sujet', 'sujet'],
      ['arme', 'arme'],
      ['niveau', 'niveau'],
    ];
    map.forEach(function (pair) {
      var raw = params.get(pair[0]);
      if (raw == null || raw === '') return;
      var val = raw;
      try {
        val = decodeURIComponent(raw.replace(/\+/g, ' '));
      } catch (e) {
        val = raw;
      }
      var el = qs('[name="' + pair[1] + '"]', form);
      if (!el) return;
      if (el.tagName === 'SELECT') {
        var opt = Array.prototype.find.call(el.options, function (o) {
          return o.value === val;
        });
        if (opt) el.value = val;
      } else {
        el.value = val;
      }
    });
  }

  // =======================================================================
  // 10. Contact Form
  // =======================================================================
  function initContactForm() {
    var form = qs('#contact-form');
    if (!form) return;

    var formOpenedAt = Date.now();
    var successMsg = qs('.form-success-message');
    var errorMsg = qs('.form-error-message');
    var submitBtn = qs('[type="submit"]', form);
    var submitText = submitBtn ? submitBtn.textContent : '';

    function validate() {
      var valid = true;
      qsa('[required]', form).forEach(function (input) {
        var group = input.closest('.form-group');
        var val = input.value.trim();
        if (!val) {
          if (group) group.classList.add('error');
          valid = false;
        } else {
          if (group) group.classList.remove('error');
        }
      });

      var emailInput = qs('[type="email"]', form);
      if (emailInput && emailInput.value) {
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value.trim())) {
          var g = emailInput.closest('.form-group');
          if (g) g.classList.add('error');
          valid = false;
        }
      }

      return valid;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (successMsg) successMsg.style.display = 'none';
      if (errorMsg) errorMsg.style.display = 'none';

      if (!validate()) return;

      // Anti-spam checks
      var hp = qs('.form-hp input', form);
      if (hp && hp.value) return;
      if (Date.now() - formOpenedAt < 3000) return;

      // Show loading
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = '...';
      }

      var data = {};
      qsa('input, textarea, select', form).forEach(function (el) {
        if (el.name && !el.closest('.form-hp')) {
          data[el.name] = el.value;
        }
      });

      var turnDiv = qs('.cf-turnstile', form);
      if (turnDiv) {
        var tsField = qs('input[name="cf-turnstile-response"], textarea[name="cf-turnstile-response"]', form);
        if (!tsField || !tsField.value) {
          if (errorMsg) errorMsg.style.display = 'block';
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = submitText;
          }
          return;
        }
        data['cf-turnstile-response'] = tsField.value;
      }

      fetch(WORKER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      .then(function (res) {
        if (!res.ok) throw new Error('Server error');
        return res.json();
      })
      .then(function () {
        if (successMsg) successMsg.style.display = 'block';
        form.reset();
        formOpenedAt = Date.now();
        if (window.turnstile) {
          var w = qs('.cf-turnstile', form);
          if (w && w.getAttribute('data-widget-id')) {
            try { window.turnstile.reset(w.getAttribute('data-widget-id')); } catch (e) {}
          } else {
            try { window.turnstile.reset(); } catch (e2) {}
          }
        }
      })
      .catch(function () {
        if (errorMsg) errorMsg.style.display = 'block';
      })
      .finally(function () {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = submitText;
        }
      });
    });

    // Live validation clearing
    qsa('input, textarea, select', form).forEach(function (input) {
      input.addEventListener('input', function () {
        var group = this.closest('.form-group');
        if (group) group.classList.remove('error');
      });
      input.addEventListener('change', function () {
        var group = this.closest('.form-group');
        if (group) group.classList.remove('error');
      });
    });
  }

  // =======================================================================
  // 11. Back to Top
  // =======================================================================
  function initBackToTop() {
    var btn = qs('.back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', debounce(function () {
      btn.classList.toggle('visible', window.scrollY > 500);
    }, 100), { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // =======================================================================
  // 12. Active Nav Highlight
  // =======================================================================
  function initActiveNav() {
    var sections = qsa('section[id]');
    if (!sections.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.id;
          qsa('.nav-link').forEach(function (link) {
            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { threshold: 0.2, rootMargin: '-80px 0px -50% 0px' });

    sections.forEach(function (section) { observer.observe(section); });
  }

  // =======================================================================
  // 13. Hero parallax-like slow zoom
  // =======================================================================
  function initHero() {
    var hero = qs('.hero');
    if (hero) {
      setTimeout(function () { hero.classList.add('loaded'); }, 100);
    }
  }

  // =======================================================================
  // Init everything on DOM ready
  // =======================================================================
  document.addEventListener('DOMContentLoaded', function () {
    [
      initHero,
      initMobileNav,
      initStickyHeader,
      initSmoothScroll,
      initScrollAnimations,
      initCounters,
      initObjectiveBars,
      initCarousels,
      initLightbox,
      initLanguageSwitcher,
      initContactPrefill,
      initContactForm,
      initBackToTop,
      initActiveNav,
    ].forEach(function (fn) {
      try {
        fn();
      } catch (e) {
        console.error('Arc IMPACT init:', fn.name || fn, e);
      }
    });
  });

})();
