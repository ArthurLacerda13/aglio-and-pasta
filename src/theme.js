// Theme Switcher for Aglio & Pasta (Dark / Light)
export function getCurrentTheme() {
  const saved = localStorage.getItem('aglio_theme');
  if (saved && ['dark', 'light'].includes(saved)) {
    return saved;
  }
  return 'dark'; // Default luxury theme is dark
}

export function setTheme(theme) {
  const root = document.documentElement;
  if (theme === 'light') {
    root.classList.add('light');
    root.classList.remove('dark');
    root.setAttribute('data-theme', 'light');
  } else {
    root.classList.add('dark');
    root.classList.remove('light');
    root.setAttribute('data-theme', 'dark');
  }
  localStorage.setItem('aglio_theme', theme);
  updateThemeIcons(theme);
}

export function toggleTheme() {
  const current = getCurrentTheme();
  const next = current === 'dark' ? 'light' : 'dark';
  setTheme(next);
}

export function updateThemeIcons(theme = getCurrentTheme()) {
  const icons = document.querySelectorAll('.theme-toggle-icon');
  icons.forEach(icon => {
    if (theme === 'light') {
      icon.className = 'fa-solid fa-moon theme-toggle-icon text-amber-600 hover:text-amber-700 transition-colors text-base';
    } else {
      icon.className = 'fa-solid fa-sun theme-toggle-icon text-amber-400 hover:text-amber-300 transition-colors text-base';
    }
  });

  const tooltips = document.querySelectorAll('.theme-toggle-btn');
  tooltips.forEach(btn => {
    btn.setAttribute('title', theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode');
    btn.setAttribute('aria-label', theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode');
  });
}

export function initTheme() {
  const initialTheme = getCurrentTheme();
  setTheme(initialTheme);

  document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleTheme();
    });
  });
}
