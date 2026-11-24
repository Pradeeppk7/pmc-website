const menuButton = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('#site-nav');

function setMenuOpen(isOpen) {
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  siteNav.classList.toggle('is-open', isOpen);
}

menuButton.addEventListener('click', () => {
  setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true');
});
siteNav.addEventListener('click', (event) => {
  if (event.target.closest('a')) setMenuOpen(false);
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    setMenuOpen(false);
    menuButton.focus();
  }
});
window.addEventListener('resize', () => {
  if (window.innerWidth > 700) setMenuOpen(false);
});

const themeButton = document.querySelector('.theme-toggle');
const themeMeta = document.querySelector('meta[name="theme-color"]');
const THEME_KEY = 'pmc-theme';
const THEME_COLORS = { light: '#f8f6f1', dark: '#141412' };

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  themeButton.setAttribute('aria-pressed', String(theme === 'dark'));
  if (themeMeta) themeMeta.setAttribute('content', THEME_COLORS[theme]);
}

function storedTheme() {
  try {
    const value = localStorage.getItem(THEME_KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch (error) {
    return null;
  }
}

applyTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');

themeButton.addEventListener('click', () => {
  const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  try {
    localStorage.setItem(THEME_KEY, next);
  } catch (error) {
    // Storage may be unavailable (e.g. private browsing); the theme still applies for this visit.
  }
});

// Follow the operating system setting until the visitor picks a theme themselves.
if (window.matchMedia) {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
    if (!storedTheme()) applyTheme(event.matches ? 'dark' : 'light');
  });
}
