function setActiveNav() {
  const page = document.body.dataset.page;
  if (!page) return;

  document.querySelectorAll("[data-nav]").forEach((link) => {
    link.classList.toggle("active", link.dataset.nav === page);
    if (link.dataset.nav === page) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function initTabs() {
  const tabRoot = document.querySelector("[data-tabs]");
  if (!tabRoot) return;

  const buttons = Array.from(tabRoot.querySelectorAll("[data-tab]"));
  const panels = Array.from(document.querySelectorAll("[data-panel]"));

  const activate = (name) => {
    buttons.forEach((button) => {
      const isActive = button.dataset.tab === name;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-selected", String(isActive));
      button.tabIndex = isActive ? 0 : -1;
    });

    panels.forEach((panel) => {
      panel.classList.toggle("active", panel.dataset.panel === name);
      panel.hidden = panel.dataset.panel !== name;
    });
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => activate(button.dataset.tab));
  });

  const initial = buttons.find((button) => button.classList.contains("active"))?.dataset.tab || buttons[0]?.dataset.tab;
  if (initial) activate(initial);
}

function initFooterYear() {
  const year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());
}

function initContactForm() {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;

  const status = form.querySelector("[data-form-status]");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (status) {
      status.textContent = "Thanks. Your message is queued in this local clone.";
    }
    form.reset();
  });
}

function initFaqAccordion() {
  const faqItems = document.querySelectorAll('[data-faq-item]');
  if (!faqItems.length) return;

  faqItems.forEach((item) => {
    const button = item.querySelector('[data-faq-button]');
    if (!button) return;
    button.addEventListener('click', () => {
      const expanded = item.getAttribute('data-open') === 'true';
      faqItems.forEach((other) => other.setAttribute('data-open', 'false'));
      item.setAttribute('data-open', String(!expanded));
    });
  });
}

function initMobileNav() {
  const nav = document.querySelector('#primary-nav');
  const toggle = document.querySelector('[data-nav-toggle]');
  const overlay = document.querySelector('[data-nav-overlay]');
  if (!nav || !toggle) return;

  const closeNav = () => {
    nav.classList.remove('is-open');
    toggle.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    if (overlay) overlay.classList.remove('is-open');
  };

  const openNav = () => {
    nav.classList.add('is-open');
    toggle.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    if (overlay) overlay.classList.add('is-open');
  };

  toggle.addEventListener('click', () => {
    const open = nav.classList.contains('is-open');
    if (open) {
      closeNav();
    } else {
      openNav();
    }
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (window.matchMedia('(max-width: 960px)').matches) {
        closeNav();
      }
    });
  });

  if (overlay) {
    overlay.addEventListener('click', closeNav);
  }

  window.addEventListener('resize', () => {
    if (!window.matchMedia('(max-width: 960px)').matches) {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      if (overlay) overlay.classList.remove('is-open');
    }
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeNav();
  });
}

setActiveNav();
initTabs();
initFooterYear();
initContactForm();
initFaqAccordion();
initMobileNav();
(() => {
  const menuItems = [
    { label: 'Home', href: 'index.html' },
    { label: 'About', href: 'about.html' },
    { label: 'Products', href: '#products' },
    { label: 'For Clinics', href: '#clinics' },
    { label: 'For Labs', href: '#labs' },
    { label: 'Contact', href: '#contact' },
  ];

  function getHeader() {
    return document.querySelector('header, .header, .navbar, nav');
  }

  function setActiveLink(link) {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const linkPage = link.getAttribute('href').split('#')[0];

    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
      link.classList.add('is-active');
    }
  }

  function findExistingLink(label) {
    const links = Array.from(document.querySelectorAll('a'));
    const normalizedLabel = label.toLowerCase();

    return links.find((link) => link.textContent.trim().toLowerCase() === normalizedLabel);
  }

  function closeMenu() {
    document.body.classList.remove('mobile-menu-open');
    const toggle = document.querySelector('.mobile-menu-toggle');
    const panel = document.querySelector('.mobile-menu-panel');

    if (toggle) {
      toggle.setAttribute('aria-expanded', 'false');
    }

    if (panel) {
      panel.setAttribute('aria-hidden', 'true');
    }
  }

  function openMenu() {
    document.body.classList.add('mobile-menu-open');
    const toggle = document.querySelector('.mobile-menu-toggle');
    const panel = document.querySelector('.mobile-menu-panel');

    if (toggle) {
      toggle.setAttribute('aria-expanded', 'true');
    }

    if (panel) {
      panel.setAttribute('aria-hidden', 'false');
    }
  }

  function createMobileMenu() {
    if (document.querySelector('.mobile-menu-toggle')) {
      return;
    }

    const header = getHeader();

    if (!header) {
      return;
    }

    header.classList.add('site-navbar');

    const toggle = document.createElement('button');
    toggle.className = 'mobile-menu-toggle';
    toggle.type = 'button';
    toggle.setAttribute('aria-label', 'Open menu');
    toggle.setAttribute('aria-controls', 'mobile-menu-panel');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.innerHTML = '<span></span><span></span><span></span>';

    const panel = document.createElement('aside');
    panel.className = 'mobile-menu-panel';
    panel.id = 'mobile-menu-panel';
    panel.setAttribute('aria-hidden', 'true');

    const panelTop = document.createElement('div');
    panelTop.className = 'mobile-menu-top';

    const logo = header.querySelector('img, .logo, .brand, .navbar-brand, a');
    const logoClone = logo ? logo.cloneNode(true) : document.createElement('div');
    logoClone.classList.add('mobile-menu-logo');

    if (!logo) {
      logoClone.innerHTML = 'Appoint <span>my</span> Doctor';
    }

    const closeButton = document.createElement('button');
    closeButton.className = 'mobile-menu-close';
    closeButton.type = 'button';
    closeButton.setAttribute('aria-label', 'Close menu');
    closeButton.innerHTML = '<span></span><span></span>';

    const list = document.createElement('nav');
    list.className = 'mobile-menu-links';
    list.setAttribute('aria-label', 'Mobile navigation');

    menuItems.forEach((item) => {
      const link = document.createElement('a');
      const existingLink = findExistingLink(item.label);
      link.href = existingLink ? existingLink.getAttribute('href') : item.href;
      link.textContent = item.label;
      setActiveLink(link);
      link.addEventListener('click', closeMenu);
      list.appendChild(link);
    });

    const existingDemoLink = findExistingLink('Request Demo');
    const demo = document.createElement('a');
    demo.className = 'mobile-menu-demo';
    demo.href = existingDemoLink ? existingDemoLink.getAttribute('href') : '#request-demo';
    demo.textContent = 'Request Demo';
    demo.addEventListener('click', closeMenu);

    panelTop.append(logoClone, closeButton);
    panel.append(panelTop, list, demo);
    document.body.appendChild(panel);
    header.appendChild(toggle);

    toggle.addEventListener('click', () => {
      if (document.body.classList.contains('mobile-menu-open')) {
        closeMenu();
        return;
      }

      openMenu();
    });

    closeButton.addEventListener('click', closeMenu);

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    });
  }

  document.addEventListener('DOMContentLoaded', createMobileMenu);
})();
