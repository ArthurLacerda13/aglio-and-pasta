import { initI18n, setLanguage, getCurrentLang } from './i18n.js';
import { initTheme, toggleTheme, getCurrentTheme } from './theme.js';

document.addEventListener('DOMContentLoaded', function () {
  // Initialize i18n & Theme
  initI18n();
  initTheme();

  const navbar = document.getElementById('main-navbar') || document.getElementById('main-header');
  const mobileToggle = document.getElementById('mobile-menu-toggle') || document.getElementById('mobile-menu-btn');
  const mobileClose = document.getElementById('mobile-menu-close');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileOverlay = document.getElementById('mobile-overlay');

  // Scroll effect on navbar
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // Mobile menu open / close
  function openMenu() {
    mobileMenu?.classList.add('open');
    mobileMenu?.classList.remove('hidden');
    mobileOverlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenu?.classList.remove('open');
    if (!mobileMenu?.classList.contains('mobile-menu')) {
      mobileMenu?.classList.add('hidden');
    }
    mobileOverlay?.classList.remove('open');
    document.body.style.overflow = '';
  }

  mobileToggle?.addEventListener('click', (e) => {
    e.stopPropagation();
    if (mobileMenu?.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  mobileClose?.addEventListener('click', closeMenu);
  mobileOverlay?.addEventListener('click', closeMenu);

  // Close mobile menu when clicking nav links inside it
  mobileMenu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Language dropdown toggle logic
  const langDropdownToggle = document.getElementById('lang-dropdown-toggle');
  const langDropdownMenu = document.getElementById('lang-dropdown-menu');

  if (langDropdownToggle && langDropdownMenu) {
    langDropdownToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      langDropdownMenu.classList.toggle('hidden');
    });

    document.addEventListener('click', (e) => {
      if (!langDropdownToggle.contains(e.target) && !langDropdownMenu.contains(e.target)) {
        langDropdownMenu.classList.add('hidden');
      }
    });
  }

  // Active nav link highlighting
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    const cleanHref = href.replace('./', '').replace('../', '').replace('/', '');
    const cleanPath = currentPath.replace('/', '');

    if ((cleanPath === '' || cleanPath === 'index.html') && (cleanHref === '' || cleanHref === 'index.html')) {
      link.classList.add('active');
    } else if (cleanHref !== '' && cleanHref !== 'index.html' && currentPath.includes(cleanHref)) {
      link.classList.add('active');
    }
  });
});
