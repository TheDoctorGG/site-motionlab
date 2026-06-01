(function () {
  const MENU_ITEMS = [
    { label: "Home", href: "/" },
    { label: "App Brazil", href: "/trampoapp/" },
    { label: "About Us", href: "/about-us/" },
    { label: "Privacy Policy", href: "/privacy-policy/" },
    { label: "Terms of Use", href: "/terms/" },
    { label: "LGPD & Data Consent", href: "/lgpd-consent/" }
  ];

  const CTA_LABEL = "Quero participar";
  const CTA_HREF = "/trampoapp/#collector-form";

  const CONTACT_LABEL = "Falar no WhatsApp";
  const CONTACT_HREF = "https://wa.me/5548988405089?text=Olá%20Gabriel%2C%20vi%20a%20landing%20page%20da%20Motion%20Lab%20e%20quero%20saber%20mais.";

  function injectStyles() {
    const style = document.createElement("style");

    style.textContent = `
      .motion-menu-button {
        display: none;
        align-items: center;
        justify-content: center;
        width: 44px;
        height: 44px;
        border: 1px solid #e5e7eb;
        border-radius: 12px;
        background: #ffffff;
        cursor: pointer;
        box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
        z-index: 10001;
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

      @media (max-width: 768px) {
        .motion-menu-button {
          display: inline-flex !important;
        }

        .motion-desktop-nav,
        .motion-nav-link-to-hide {
          display: none !important;
        }

        .motion-logo-img {
          max-width: 215px !important;
          height: auto !important;
        }

        .motion-mobile-cta {
          font-size: 11px !important;
          padding: 12px 14px !important;
          border-radius: 8px !important;
          letter-spacing: 0.08em !important;
          white-space: nowrap !important;
        }
      }

      @media (max-width: 430px) {
        .motion-logo-img {
          max-width: 185px !important;
        }

        .motion-mobile-cta {
          font-size: 10px !important;
          padding: 11px 12px !important;
        }

        .motion-menu-button {
          width: 42px;
          height: 42px;
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
    const overlay = document.createElement("div");
    overlay.className = "motion-sidebar-overlay";
    overlay.setAttribute("aria-hidden", "true");

    const sidebar = document.createElement("aside");
    sidebar.className = "motion-sidebar";
    sidebar.setAttribute("aria-label", "Menu lateral Motion Lab");

    const navLinks = MENU_ITEMS.map((item) => {
      return `<a href="${item.href}">${item.label}</a>`;
    }).join("");

    sidebar.innerHTML = `
      <div class="motion-sidebar-header">
        <div class="motion-sidebar-title">Motion Lab</div>
        <button class="motion-sidebar-close" type="button" aria-label="Fechar menu">×</button>
      </div>

      <nav class="motion-sidebar-nav">
        ${navLinks}
      </nav>

      <a class="motion-sidebar-cta" href="${CTA_HREF}">
        ${CTA_LABEL}
      </a>

      <a class="motion-sidebar-contact" href="${CONTACT_HREF}" target="_blank" rel="noopener">
        ${CONTACT_LABEL}
      </a>

      <div class="motion-sidebar-footer">
        Physical-world data acquisition layer for embodied AI in Latin America.
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

  function enhanceHeader() {
    const header = document.querySelector("header") || document.querySelector("nav")?.closest("header");

    if (!header) return;

    const logoImg = header.querySelector("img");
    if (logoImg) {
      logoImg.classList.add("motion-logo-img");
    }

    const headerLinks = Array.from(header.querySelectorAll("a"));

    headerLinks.forEach((link) => {
      const text = link.textContent.trim().toUpperCase();

      if (
        text === "HOME" ||
        text === "APP BRAZIL" ||
        text === "APP (BRAZIL)" ||
        text === "ABOUT US"
      ) {
        link.classList.add("motion-nav-link-to-hide");

        const nearestNav = link.closest("nav");
        if (nearestNav) {
          nearestNav.classList.add("motion-desktop-nav");
        }
      }

      if (
        text.includes("QUERO PARTICIPAR") ||
        text.includes("TALK TO GABRIEL") ||
        text.includes("CONTACT")
      ) {
        link.classList.add("motion-mobile-cta");
      }
    });

    const existingButton = header.querySelector(".motion-menu-button");
    if (existingButton) return;

    const button = document.createElement("button");
    button.className = "motion-menu-button";
    button.type = "button";
    button.setAttribute("aria-label", "Abrir menu");
    button.innerHTML = "<span></span>";
    button.addEventListener("click", openMenu);

    const cta = header.querySelector(".motion-mobile-cta");

    if (cta && cta.parentElement) {
      cta.insertAdjacentElement("afterend", button);
    } else {
      header.appendChild(button);
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    injectStyles();
    createSidebar();
    enhanceHeader();
  });
})();