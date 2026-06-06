(function () {
  const MENU_ITEMS = {
    en: [
      { key: "nav.home", label: "Home", href: "/" },
      { key: "nav.trampo", label: "App Brazil", href: "/trampoapp/" },
      { key: "nav.about", label: "About Us", href: "/about-us/" },
      { key: "nav.privacy", label: "Privacy Policy", href: "/privacy-policy/" },
      { key: "nav.terms", label: "Terms of Use", href: "/terms/" },
      { key: "nav.lgpd", label: "LGPD & Data Consent", href: "/lgpd-consent/" }
    ],
    pt: [
      { key: "nav.home", label: "Início", href: "/" },
      { key: "nav.trampo", label: "App Brasil", href: "/trampoapp/" },
      { key: "nav.about", label: "Sobre nós", href: "/about-us/" },
      { key: "nav.privacy", label: "Política de Privacidade", href: "/privacy-policy/" },
      { key: "nav.terms", label: "Termos de Uso", href: "/terms/" },
      { key: "nav.lgpd", label: "LGPD e Consentimento de Dados", href: "/lgpd-consent/" }
    ]
  };

  const CONTACT_LABEL = {
    en: "WhatsApp",
    pt: "Falar no WhatsApp"
  };
  const CONTACT_HREF = "https://wa.me/5548988405089?text=Ol%C3%A1%20Gabriel%2C%20vi%20o%20site%20da%20Motion%20Lab%20e%20quero%20saber%20mais.";

  const EMAIL_LABEL = {
    en: "Email",
    pt: "Enviar e-mail"
  };
  const EMAIL_HREF = "mailto:contato@motionlab.com.br";

  function getPageKind() {
    const path = window.location.pathname.replace(/\/index\.html$/, "/");

    if (path === "/" || path === "/about-us/") return "b2b";
    if (path === "/trampoapp/") return "trampo";
    if (path === "/privacy-policy/" || path === "/terms/" || path === "/lgpd-consent/") return "legal";

    return "b2b";
  }

  function getDefaultLanguage() {
    const params = new URLSearchParams(window.location.search);
    const requested = params.get("lang");

    if (requested === "en" || requested === "pt") return requested;

    try {
      const stored = window.localStorage.getItem("motionlab_language");
      if (stored === "en" || stored === "pt") return stored;
    } catch (error) {
      // Ignore storage availability issues.
    }

    return getPageKind() === "b2b" ? "en" : "pt";
  }

  function getHeaderCtaLabel(language) {
    const pageKind = getPageKind();

    if (pageKind === "b2b") return language === "pt" ? "Ver Trampo Beta" : "APP Beta";
    if (pageKind === "trampo") return language === "pt" ? "Quero participar" : "Join waitlist";

    return language === "pt" ? "Quero participar" : "Join waitlist";
  }

  function getSidebarCtaLabel(language) {
    const pageKind = getPageKind();

    if (pageKind === "b2b") return language === "pt" ? "Ver Trampo Beta" : "View Trampo Beta";
    if (pageKind === "trampo") return language === "pt" ? "Quero participar" : "Join waitlist";

    return language === "pt" ? "Quero participar" : "Join waitlist";
  }

  function getCtaHref() {
    const pageKind = getPageKind();

    if (pageKind === "b2b") return "/trampoapp/";
    if (pageKind === "trampo") return "#collector-form";

    return "/trampoapp/#collector-form";
  }

  function injectStyles() {
    if (document.getElementById("motionlab-menu-styles")) return;

    const style = document.createElement("style");
    style.id = "motionlab-menu-styles";

    style.textContent = `
      .motion-menu-button {
        display: none;
        align-items: center;
        justify-content: center;
        width: 42px;
        height: 42px;
        border: 1px solid #e5e7eb;
        border-radius: 12px;
        background: #ffffff;
        cursor: pointer;
        box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
        z-index: 10001;
        flex-shrink: 0;
      }

      .motion-menu-button span {
        display: block;
        width: 20px;
        height: 2px;
        background: #111827;
        border-radius: 99px;
        position: relative;
      }

      .motion-menu-button span::before,
      .motion-menu-button span::after {
        content: "";
        position: absolute;
        left: 0;
        width: 20px;
        height: 2px;
        background: #111827;
        border-radius: 99px;
      }

      .motion-menu-button span::before {
        top: -7px;
      }

      .motion-menu-button span::after {
        top: 7px;
      }

      .motion-sidebar-overlay {
        position: fixed;
        inset: 0;
        background: rgba(15, 23, 42, 0.45);
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.25s ease;
        z-index: 9998;
      }

      .motion-sidebar {
        position: fixed;
        top: 0;
        right: 0;
        width: min(86vw, 380px);
        height: 100vh;
        background: #ffffff;
        transform: translateX(100%);
        transition: transform 0.25s ease;
        z-index: 9999;
        padding: 28px;
        box-shadow: -24px 0 60px rgba(15, 23, 42, 0.18);
        display: flex;
        flex-direction: column;
      }

      .motion-sidebar-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 16px;
        margin-bottom: 34px;
      }

      .motion-sidebar-title {
        font-size: 18px;
        font-weight: 900;
        color: #111827;
        letter-spacing: -0.04em;
      }

      .motion-sidebar-close {
        width: 42px;
        height: 42px;
        border: 1px solid #e5e7eb;
        border-radius: 12px;
        background: #ffffff;
        font-size: 24px;
        line-height: 1;
        cursor: pointer;
      }

      .motion-sidebar-nav {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      .motion-sidebar-nav a {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 0;
        border-bottom: 1px solid #f1f5f9;
        font-size: 15px;
        font-weight: 800;
        color: #111827;
        text-decoration: none;
        text-transform: uppercase;
        letter-spacing: 0.08em;
      }

      .motion-sidebar-nav a::after {
        content: "→";
        color: #0b57d0;
        font-size: 18px;
      }

      .motion-sidebar-cta {
        margin-top: 28px;
        display: block;
        width: 100%;
        background: #0b57d0;
        color: #ffffff !important;
        text-align: center;
        padding: 16px 18px;
        border-radius: 12px;
        font-size: 13px;
        font-weight: 900;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        text-decoration: none;
        box-shadow: 0 14px 28px rgba(11, 87, 208, 0.22);
      }

      .motion-sidebar-contact {
        margin-top: 12px;
        display: block;
        width: 100%;
        background: #ffffff;
        color: #111827 !important;
        text-align: center;
        padding: 16px 18px;
        border-radius: 12px;
        font-size: 13px;
        font-weight: 900;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        text-decoration: none;
        border: 1px solid #e5e7eb;
      }

      .motion-sidebar-footer {
        margin-top: auto;
        padding-top: 28px;
        font-size: 12px;
        line-height: 1.6;
        color: #64748b;
      }

      body.motion-sidebar-open {
        overflow: hidden;
      }

      body.motion-sidebar-open .motion-sidebar-overlay {
        opacity: 1;
        pointer-events: auto;
      }

      body.motion-sidebar-open .motion-sidebar {
        transform: translateX(0);
      }

      @media (min-width: 769px) {
        .motion-enhanced-topbar .motion-main-row {
          display: grid !important;
          grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr) !important;
          align-items: center !important;
          gap: 24px !important;
        }

        .motion-enhanced-topbar .motion-logo-link {
          grid-column: 1 !important;
          justify-self: start !important;
          min-width: 0 !important;
        }

        .motion-enhanced-topbar .motion-desktop-nav {
          grid-column: 2 !important;
          justify-self: center !important;
        }

        .motion-enhanced-topbar .motion-header-actions {
          grid-column: 3 !important;
          justify-self: end !important;
          display: flex !important;
          align-items: center !important;
          justify-content: flex-end !important;
          gap: 12px !important;
          min-width: 0 !important;
        }
      }

      @media (max-width: 768px) {
        .motion-menu-button {
          display: inline-flex !important;
        }

        .motion-old-mobile-nav {
          display: none !important;
        }

        .motion-enhanced-topbar .motion-desktop-nav {
          display: none !important;
        }

        .motion-enhanced-topbar .motion-main-row {
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          gap: 8px !important;
          padding-top: 12px !important;
          padding-bottom: 12px !important;
          flex-wrap: nowrap !important;
        }

        .motion-enhanced-topbar .motion-logo-link {
          flex: 1 1 auto !important;
          min-width: 0 !important;
        }

        .motion-enhanced-topbar .motion-header-actions {
          display: flex !important;
          align-items: center !important;
          gap: 8px !important;
          flex-shrink: 0 !important;
        }

        .motion-logo-img {
          max-width: 145px !important;
          height: auto !important;
        }

        .motion-mobile-cta {
          font-size: 11px !important;
          font-weight: 900 !important;
          padding: 11px 14px !important;
          border-radius: 9px !important;
          letter-spacing: 0.09em !important;
          white-space: nowrap !important;
          flex-shrink: 0 !important;
          line-height: 1 !important;
        }
      }

      @media (max-width: 430px) {
        .motion-logo-img {
          max-width: 128px !important;
        }

        .motion-mobile-cta {
          font-size: 10px !important;
          font-weight: 900 !important;
          padding: 10px 12px !important;
          letter-spacing: 0.08em !important;
        }

        .motion-menu-button {
          width: 40px;
          height: 40px;
        }
      }

      @media (max-width: 380px) {
        .motion-logo-img {
          max-width: 118px !important;
        }

        .motion-mobile-cta {
          font-size: 9.5px !important;
          padding: 9px 10px !important;
        }

        .motion-menu-button {
          width: 38px;
          height: 38px;
        }
      }

      @media (min-width: 769px) {
        .motion-sidebar,
        .motion-sidebar-overlay {
          display: none !important;
        }
      }
    `;

    document.head.appendChild(style);
  }

  function createSidebar() {
    if (document.querySelector(".motion-sidebar")) return;

    const overlay = document.createElement("div");
    overlay.className = "motion-sidebar-overlay";
    overlay.setAttribute("aria-hidden", "true");

    const sidebar = document.createElement("aside");
    sidebar.className = "motion-sidebar";
    sidebar.setAttribute("aria-label", "Menu lateral Motion Lab");

    const language = getDefaultLanguage();
    const navLinks = MENU_ITEMS[language].map((item) => {
      return `<a href="${item.href}" data-motion-nav="${item.key}">${item.label}</a>`;
    }).join("");

    sidebar.innerHTML = `
      <div class="motion-sidebar-header">
        <div class="motion-sidebar-title">Motion Lab</div>
        <button class="motion-sidebar-close" type="button" aria-label="Fechar menu">×</button>
      </div>

      <nav class="motion-sidebar-nav">
        ${navLinks}
      </nav>

      <a class="motion-sidebar-cta" href="${getCtaHref()}" data-motion-cta="sidebar">
        ${getSidebarCtaLabel(language)}
      </a>

      <a class="motion-sidebar-contact" href="${CONTACT_HREF}" target="_blank" rel="noopener">
        ${CONTACT_LABEL[language]}
      </a>

      <a class="motion-sidebar-contact" href="${EMAIL_HREF}">
        ${EMAIL_LABEL[language]}
      </a>

      <div class="motion-sidebar-footer" data-motion-sidebar-description>
        ${language === "pt" ? "Camada de aquisição de dados físicos para IA física na América Latina." : "Physical-world data acquisition layer for embodied AI in Latin America."}
      </div>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(sidebar);

    overlay.addEventListener("click", closeMenu);

    sidebar.querySelector(".motion-sidebar-close").addEventListener("click", closeMenu);

    sidebar.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
  }

  function openMenu() {
    document.body.classList.add("motion-sidebar-open");
  }

  function closeMenu() {
    document.body.classList.remove("motion-sidebar-open");
  }

  function findTopNav() {
    return (
      document.querySelector("nav.fixed.top-0") ||
      document.querySelector("nav.fixed") ||
      document.querySelector("body > nav") ||
      document.querySelector("nav")
    );
  }

  function enhanceHeader() {
    const topNav = findTopNav();

    if (!topNav) return;

    topNav.classList.add("motion-enhanced-topbar");

    const logoImg = topNav.querySelector("img");
    if (logoImg) {
      logoImg.classList.add("motion-logo-img");

      const logoLink = logoImg.closest("a");
      if (logoLink) logoLink.classList.add("motion-logo-link");
    }

    const allRows = Array.from(topNav.querySelectorAll("div"));

    allRows.forEach((row) => {
      const className = row.getAttribute("class") || "";

      if (className.includes("justify-between") && className.includes("items-center")) {
        row.classList.add("motion-main-row");
      }

      if (className.includes("md:hidden")) {
        row.classList.add("motion-old-mobile-nav");
      }

      if (className.includes("md:flex")) {
        row.classList.add("motion-desktop-nav");
      }
    });

    const headerLinks = Array.from(topNav.querySelectorAll("a"));

    headerLinks.forEach((link) => {
      const text = link.textContent.trim().toUpperCase();

      if (
        text.includes("QUERO PARTICIPAR") ||
        text.includes("APP BETA") ||
        text.includes("VIEW TRAMPO BETA") ||
        text.includes("VER TRAMPO BETA") ||
        text.includes("JOIN WAITLIST") ||
        text.includes("TALK TO GABRIEL") ||
        text.includes("CONTACT")
      ) {
        link.classList.add("motion-mobile-cta");
        link.setAttribute("href", getCtaHref());
        link.setAttribute("data-motion-cta", "top");
        link.textContent = getHeaderCtaLabel(getDefaultLanguage());
      }
    });

    const mainRow = topNav.querySelector(".motion-main-row") || topNav;
    const cta = topNav.querySelector(".motion-mobile-cta");
    let actions = topNav.querySelector(".motion-header-actions");

    if (cta && !actions) {
      actions = document.createElement("div");
      actions.className = "motion-header-actions";
      cta.insertAdjacentElement("beforebegin", actions);
      actions.appendChild(cta);
    }

    const existingButton = topNav.querySelector(".motion-menu-button");
    if (existingButton) return;

    const button = document.createElement("button");
    button.className = "motion-menu-button";
    button.type = "button";
    button.setAttribute("aria-label", "Abrir menu");
    button.innerHTML = "<span></span>";
    button.addEventListener("click", openMenu);

    if (cta && cta.parentElement) {
      cta.insertAdjacentElement("afterend", button);
    } else if (actions) {
      actions.appendChild(button);
    } else {
      mainRow.appendChild(button);
    }
  }

  function init() {
    injectStyles();
    createSidebar();
    enhanceHeader();
    window.dispatchEvent(new CustomEvent("motionlab:menu-ready"));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
