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

setActiveNav();
initTabs();
initFooterYear();
initContactForm();
