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
    toggle.setAttribute('aria-expanded', 'false');
    if (overlay) overlay.classList.remove('is-open');
  };

  const openNav = () => {
    nav.classList.add('is-open');
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
