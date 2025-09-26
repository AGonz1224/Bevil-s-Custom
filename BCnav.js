// Author: Alberto Gonzalez
// Started:  09/26/2025
// Updated:  09/26/2025
// Filename: BCnav.js

// Handles the burger menu overlay: open/close, Esc, click-outside, and link click.
(function () {
    const burger = document.querySelector('.burger');
    const menu = document.getElementById('siteMenu');
    if (!burger || !menu) return;
  
    const closeBtn = menu.querySelector('.site-menu__close');
    const backdrop = menu.querySelector('.site-menu__bg');
    const links = Array.from(menu.querySelectorAll('.site-menu__links a'));
    let lastFocused = null;
  
    function openMenu() {
      lastFocused = document.activeElement;
      menu.classList.add('is-open');
      menu.setAttribute('aria-hidden', 'false');
      burger.setAttribute('aria-expanded', 'true');
      document.body.classList.add('no-scroll');
      closeBtn.focus();
    }
  
    function closeMenu() {
      menu.classList.remove('is-open');
      menu.setAttribute('aria-hidden', 'true');
      burger.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('no-scroll');
      if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
      else burger.focus();
    }
  
    burger.addEventListener('click', () => {
      if (menu.classList.contains('is-open')) closeMenu();
      else openMenu();
    });
  
    closeBtn.addEventListener('click', closeMenu);
    backdrop.addEventListener('click', closeMenu);
  
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) closeMenu();
    });
  
    links.forEach(a => a.addEventListener('click', closeMenu));
  })();
  