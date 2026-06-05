(function () {
  const body = document.body;
  const base = body.dataset.base || "";
  const page = body.dataset.page || "";

  const navItems = [
    { id: "home", href: "index.html", label: "Главная" },
    { id: "incident", href: "pages/incident.html", label: "Срочная помощь" },
    { id: "schemes", href: "pages/schemes.html", label: "Схемы" },
    { id: "contacts", href: "pages/contacts.html", label: "Куда обращаться" },
    { id: "checklist", href: "pages/checklist.html", label: "Чеклист" },
    { id: "materials", href: "pages/materials.html", label: "Материалы" },
    { id: "sources", href: "pages/sources.html", label: "Источники" },
  ];

  function link(path) {
    return base + path;
  }

  function navLink(item) {
    const current = page === item.id ? ' aria-current="page"' : "";
    return `<a href="${link(item.href)}"${current}>${item.label}</a>`;
  }

  const headerHtml = `
    <a class="skip-link" href="#main-content">Перейти к содержанию</a>
    <header class="site-header">
      <div class="container header-shell">
        <div class="header-row">
          <div>
            <a class="brand" href="${link("index.html")}">Антимошенник · Норильск</a>
            <p class="brand-note">Памятка для жителей г. Норильска</p>
          </div>
          <div class="header-controls">
            <div class="text-size-control" role="group" aria-label="Размер текста">
              <button type="button" class="text-size-btn" data-text-size="normal" aria-pressed="true">Стандарт</button>
              <button type="button" class="text-size-btn" data-text-size="medium" aria-pressed="false">Средний</button>
              <button type="button" class="text-size-btn" data-text-size="large" aria-pressed="false">Большой</button>
            </div>
            <button type="button" class="control-btn" data-menu-toggle aria-expanded="false" aria-controls="site-nav">Меню</button>
          </div>
        </div>
        <div class="nav-shell" id="site-nav">
          <nav class="nav-all" aria-label="Навигация по сайту">
            ${navItems.map(navLink).join("")}
          </nav>
        </div>
      </div>
    </header>
  `;

  const footerHtml = `
    <footer class="site-footer">
      <div class="container">
        <p class="footer-city">г. Норильск · информационный портал по защите от мошенничества</p>
        <p class="footer-partners">При поддержке Администрации и прокуратуры г. Норильска</p>
        <p>Последнее обновление: 01.06.2026</p>
        <p>
          Сайт носит информационный характер и не заменяет юридическую консультацию.
          <a href="${link("pages/sources.html")}">Список источников</a>.
        </p>
      </div>
    </footer>
  `;

  const headerSlot = document.getElementById("site-header");
  const footerSlot = document.getElementById("site-footer");
  if (headerSlot) headerSlot.outerHTML = headerHtml;
  if (footerSlot) footerSlot.outerHTML = footerHtml;

  const menuBtn = document.querySelector("[data-menu-toggle]");
  const navShell = document.getElementById("site-nav");
  const mobileQuery = window.matchMedia("(max-width: 860px)");

  function setMenuOpen(isOpen) {
    if (!navShell || !menuBtn) return;
    navShell.classList.toggle("open", isOpen);
    menuBtn.setAttribute("aria-expanded", String(isOpen));
    menuBtn.textContent = isOpen ? "Закрыть" : "Меню";
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  if (menuBtn && navShell) {
    menuBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      setMenuOpen(!navShell.classList.contains("open"));
    });

    navShell.querySelectorAll("a").forEach((navLinkEl) => {
      navLinkEl.addEventListener("click", () => {
        if (mobileQuery.matches) {
          closeMenu();
        }
      });
    });

    document.addEventListener("click", (event) => {
      if (!navShell.classList.contains("open")) return;
      const insideMenu = navShell.contains(event.target);
      const clickedBtn = menuBtn.contains(event.target);
      if (!insideMenu && !clickedBtn && mobileQuery.matches) {
        closeMenu();
      }
    });

    mobileQuery.addEventListener("change", () => {
      if (!mobileQuery.matches) {
        closeMenu();
      }
    });
  }
})();
