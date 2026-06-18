/* StacklyHub — Shared JavaScript */
document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initNavbar();
  initThemeToggle();
  initScrollReveal();
  initRippleEffect();
  initCountUp();
});

function initPreloader() {
  const loader = document.querySelector('.earth') || document.querySelector('.page-loader');
  if (!loader) return;
  window.addEventListener('load', () => setTimeout(() => loader.classList.add('hidden'), 800));
}

function initNavbar() {
  const hamburger = document.getElementById('hamburger') || document.querySelector('.hamburger');
  const sidebar = document.getElementById('sidebar-left');
  const menu = document.querySelector('.navbar-menu');

  if (hamburger && sidebar) {
    hamburger.addEventListener('click', () => {
      sidebar.classList.toggle('active');
      document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
    });
  }

  if (hamburger && menu && !sidebar) {
    hamburger.addEventListener('click', () => {
      menu.classList.toggle('active');
      hamburger.classList.toggle('active');
      document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    });
    menu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

function initThemeToggle() {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;
  const icon = toggle.querySelector('i');
  const saved = localStorage.getItem('stacklyhub-theme');
  if (saved === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (icon) { icon.classList.replace('fa-moon', 'fa-sun'); }
  }
  toggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('stacklyhub-theme', 'light');
      if (icon) { icon.classList.replace('fa-sun', 'fa-moon'); }
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('stacklyhub-theme', 'dark');
      if (icon) { icon.classList.replace('fa-moon', 'fa-sun'); }
    }
  });
}

function initScrollReveal() {
  const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-zoom, .animate-card');
  if (!els.length) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
  }, { threshold: 0.1 });
  els.forEach(el => observer.observe(el));
}

function initRippleEffect() {
  document.querySelectorAll('.btn-ripple, .neu-button.primary').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size/2}px;top:${e.clientY - rect.top - size/2}px`;
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

function initCountUp() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        const target = parseInt(el.getAttribute('data-count'), 10);
        const suffix = el.getAttribute('data-suffix') || '';
        const start = performance.now();
        const tick = now => {
          const p = Math.min((now - start) / 2000, 1);
          el.textContent = Math.floor((1 - Math.pow(1 - p, 3)) * target).toLocaleString() + suffix;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        observer.unobserve(el);
      }
    }, { threshold: 0.5 });
    observer.observe(el);
  });
}

function initTabs(tabSelector, panelSelector) {
  document.querySelectorAll(tabSelector).forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');
      document.querySelectorAll(tabSelector).forEach(t => t.classList.remove('active'));
      document.querySelectorAll(panelSelector).forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.querySelector(`[data-panel="${target}"]`)?.classList.add('active');
    });
  });
}

function initAccordion(selector) {
  document.querySelectorAll(selector).forEach(item => {
    item.querySelector('.faq-question')?.addEventListener('click', () => {
      const active = item.classList.contains('active');
      item.parentElement.querySelectorAll(selector).forEach(i => i.classList.remove('active'));
      if (!active) item.classList.add('active');
    });
  });
}
