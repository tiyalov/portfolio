const root = document.documentElement;
const themeToggles = document.querySelectorAll(".theme-toggle");
const languageToggles = document.querySelectorAll("[data-language]");
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const menuClose = document.querySelector(".menu-close");
const mobileQuery = window.matchMedia("(max-width: 700px)");
const fieldDisclosures = document.querySelectorAll(".field-disclosure");
const mobileNavGroups = document.querySelectorAll(".mobile-nav-group");
const typingText = document.querySelector(".typing-text");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const translations = {
  en: {
    pageTitle: "Tia | Portfolio",
    portfolioWord: "PORTFOLIO",
    webSection: "Web Design & Development",
    graphicSection: "Graphic Design",
    heroTitle: "Hi, I'm Tia",
    role: "Frontend Developer & Multimedia Designer",
    mainNavLabel: "Main navigation",
    mobileNavLabel: "Mobile navigation",
    siteMenuLabel: "Site menu",
    languageLabel: "Language",
    languageText: "LANGUAGE",
    navigation: "NAVIGATION",
    appearance: "APPEARANCE",
    bytecraft: "ByteCraft Asset Vault",
    bytecraftTag: "WEB DEV / NEO-BRUTALISM",
    bytecraftDescription: "A high-contrast Neo-Brutalist developer asset landing page with custom UI components and interactive clipboard code snippets.",
    viewDemo: "View",
    atayTag: "WEB DESIGN / ÄTÄY",
    atayDescription: "A considered web experience with a distinctive visual identity and responsive layout.",
    webDesignHorizon: "WEB DESIGN / HORIZON PEAK",
    horizonDescription: "A polished web design project built to make its content easy to explore.",
    webDesignApartma: "WEB DESIGN / APARTMA IZOLA",
    apartmaDescription: "A welcoming, responsive web presence for an apartment in Izola.",
    intruderAlertTag: "WEB APP / SMARTKLIK",
    intruderAlertDescription: "An app that alerts you to suspicious activity and helps you stay aware of what is happening around you.",
    freezrTag: "WEB APP / FREEZR",
    freezrDescription: "An app to help you keep track of the things in your fridge and stay organized with what you have at home.",
    tidyShotTag: "WEB APP / TIDYSHOT",
    tidyShotDescription: "An app to clear your gallery by swiping and quickly sorting through your photos.",
    dashioTag: "WEB APP / DASHIO",
    dashioDescription: "A dashcam app for your phone that helps you capture and review driving moments.",
    viewSite: "View",
    emptyProjects: "New projects in progress.",
    copyright: "© 2026 Tia. All rights reserved.",
    footerNote: "DESIGNED WITH INTENTION",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    darkMode: "Dark mode",
    lightMode: "Light mode",
    enableDarkMode: "Enable dark mode",
    enableLightMode: "Enable light mode"
  },
  sl: {
    pageTitle: "Tia | Portfolio",
    portfolioWord: "PORTFOLIO",
    webSection: "Spletno oblikovanje in razvoj",
    graphicSection: "Grafično oblikovanje",
    heroTitle: "Živjo, sem Tia",
    role: "Frontend razvijalka in multimedijska oblikovalka",
    mainNavLabel: "Glavna navigacija",
    mobileNavLabel: "Mobilna navigacija",
    siteMenuLabel: "Meni spletnega mesta",
    languageLabel: "Jezik",
    languageText: "JEZIK",
    navigation: "NAVIGACIJA",
    appearance: "VIDEZ",
    bytecraft: "ByteCraft Asset Vault",
    bytecraftTag: "SPLETNI RAZVOJ / NEO-BRUTALIZEM",
    bytecraftDescription: "Visokokontrastna predstavitvena stran za razvojna orodja z lastnimi komponentami in interaktivnimi izseki kode za kopiranje.",
    viewDemo: "Ogled",
    atayTag: "SPLETNO OBLIKOVANJE / ÄTÄY",
    atayDescription: "Premišljena spletna izkušnja z izrazito vizualno podobo in prilagodljivo postavitvijo.",
    webDesignHorizon: "SPLETNO OBLIKOVANJE / HORIZON PEAK",
    horizonDescription: "Dovršena spletna zasnova, ki omogoča preprosto raziskovanje vsebine.",
    webDesignApartma: "SPLETNO OBLIKOVANJE / APARTMA IZOLA",
    apartmaDescription: "Prijetna in prilagodljiva spletna predstavitev apartmaja v Izoli.",
    intruderAlertTag: "SPLETNA APLIKACIJA / SMARTKLIK",
    intruderAlertDescription: "Aplikacija, ki vas opozori na sumljive dejavnosti in vam pomaga ostati obveščeni o dogajanju okoli vas.",
    freezrTag: "SPLETNA APLIKACIJA / FREEZR",
    freezrDescription: "Aplikacija, ki vam pomaga slediti stvarem v hladilniku in ostati organizirani glede tega, kar imate doma.",
    tidyShotTag: "SPLETNA APLIKACIJA / TIDYSHOT",
    tidyShotDescription: "Aplikacija za čiščenje galerije z podrsavanjem in hitrim razvrščanjem fotografij.",
    dashioTag: "SPLETNA APLIKACIJA / DASHIO",
    dashioDescription: "Aplikacija za dashcam za telefon, ki pomaga zajemati in pregledovati vožnje.",
    viewSite: "Ogled",
    emptyProjects: "Novi projekti so v pripravi.",
    copyright: "© 2026 Tia. Vse pravice pridržane.",
    footerNote: "OBLIKOVANO Z NAMENOM",
    openMenu: "Odpri meni",
    closeMenu: "Zapri meni",
    darkMode: "Temni način",
    lightMode: "Svetli način",
    enableDarkMode: "Vklopi temni način",
    enableLightMode: "Vklopi svetli način"
  }
};
let isMobile = null;
let currentLanguage = "en";
let typingTimer;

function applyDisclosureHeights() {
  fieldDisclosures.forEach((disclosure) => {
    const content = disclosure.querySelector(".section-content");
    if (!content) return;
    const isOpen = disclosure.classList.contains("is-open");
    content.style.maxHeight = isOpen ? `${content.scrollHeight}px` : "0px";
    content.style.opacity = isOpen ? "1" : "0";
    content.setAttribute("data-open", String(isOpen));
    content.setAttribute("aria-hidden", String(!isOpen));
    content.inert = !isOpen;
    disclosure.querySelector(".section-summary").setAttribute("aria-expanded", String(isOpen));
  });
}

function typeIntro() {
  const intro = translations[currentLanguage].heroTitle;
  typingText.textContent = "";
  let characterIndex = 0;
  const typeNextCharacter = () => {
    typingText.textContent = intro.slice(0, characterIndex + 1);
    characterIndex += 1;
    if (characterIndex < intro.length) typingTimer = window.setTimeout(typeNextCharacter, 95);
  };
  typingTimer = window.setTimeout(typeNextCharacter, 250);
}

function setLanguage(language, save = true) {
  currentLanguage = language;
  const dictionary = translations[language];
  root.lang = language;
  document.title = dictionary.pageTitle;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = dictionary[element.dataset.i18n];
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
    element.setAttribute("aria-label", dictionary[element.dataset.i18nAria]);
  });
  document.querySelector(".hero h1").setAttribute("aria-label", dictionary.heroTitle);
  languageToggles.forEach((toggle) => {
    toggle.setAttribute("aria-pressed", String(toggle.dataset.language === language));
  });
  if (typingTimer) window.clearTimeout(typingTimer);
  typingText.textContent = dictionary.heroTitle;
  const menuIsOpen = mobileMenu.classList.contains("is-open");
  menuToggle.setAttribute("aria-label", dictionary[menuIsOpen ? "closeMenu" : "openMenu"]);
  menuClose.setAttribute("aria-label", dictionary.closeMenu);
  setTheme(root.dataset.theme === "dark" ? "dark" : "light", false);
  if (save) localStorage.setItem("tia-portfolio-language", language);
}

if (!reduceMotion.matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".field-section, .project-card, .field-empty").forEach((element) => {
    element.classList.add("reveal");
    revealObserver.observe(element);
  });
}

function setTheme(theme, save = true) {
  const isDark = theme === "dark";
  const dictionary = translations[currentLanguage];
  root.dataset.theme = isDark ? "dark" : "light";
  themeToggles.forEach((toggle) => {
    toggle.setAttribute("aria-checked", String(isDark));
    toggle.setAttribute("aria-label", dictionary[isDark ? "enableLightMode" : "enableDarkMode"]);
    toggle.querySelector("span").textContent = dictionary[isDark ? "lightMode" : "darkMode"];
  });
  document.querySelector('meta[name="theme-color"]').content = isDark ? "#171717" : "#f7f7f5";
  if (save) {
    localStorage.setItem("tia-portfolio-theme", isDark ? "dark" : "light");
  }
}

function syncDisclosureMode() {
  const nextIsMobile = mobileQuery.matches;
  if (nextIsMobile === isMobile) return;
  isMobile = nextIsMobile;
  if (!isMobile && mobileMenu.classList.contains("is-open")) {
    closeMobileMenu(false);
  }
  fieldDisclosures.forEach((disclosure) => {
    disclosure.querySelector(".section-summary").tabIndex = 0;
    if (disclosure.classList.contains("is-open") && !isMobile) {
      disclosure.setAttribute("data-open-desktop", "true");
    }
  });
  applyDisclosureHeights();
}

function closeMobileMenu(returnFocus = true) {
  mobileMenu.classList.remove("is-open");
  mobileMenu.setAttribute("aria-hidden", "true");
  mobileMenu.inert = true;
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", translations[currentLanguage].openMenu);
  document.body.style.overflow = "";
  if (returnFocus) menuToggle.focus();
}

function openMobileMenu() {
  mobileMenu.classList.add("is-open");
  mobileMenu.setAttribute("aria-hidden", "false");
  mobileMenu.inert = false;
  menuToggle.setAttribute("aria-expanded", "true");
  menuToggle.setAttribute("aria-label", translations[currentLanguage].closeMenu);
  document.body.style.overflow = "hidden";
  mobileMenu.querySelector(".mobile-nav-summary").focus();
}

const savedTheme = localStorage.getItem("tia-portfolio-theme");
setTheme(savedTheme === "dark" ? "dark" : "light", false);
setLanguage(localStorage.getItem("tia-portfolio-language") === "sl" ? "sl" : "en", false);
fieldDisclosures.forEach((disclosure) => {
  const summary = disclosure.querySelector(".section-summary");
  const content = disclosure.querySelector(".section-content");
  summary.setAttribute("aria-expanded", "false");
  content.setAttribute("aria-hidden", "true");
  content.inert = true;
  summary.addEventListener("click", (event) => {
    event.preventDefault();
    if (disclosure.classList.contains("is-open")) {
      content.style.maxHeight = `${content.getBoundingClientRect().height}px`;
      content.style.opacity = "1";
      content.offsetHeight;
      disclosure.classList.remove("is-open");
      summary.setAttribute("aria-expanded", "false");
      content.setAttribute("data-open", "false");
      content.setAttribute("aria-hidden", "true");
      content.inert = true;
      content.style.maxHeight = "0px";
      content.style.opacity = "0";
      return;
    }
    disclosure.classList.add("is-open");
    summary.setAttribute("aria-expanded", "true");
    content.setAttribute("aria-hidden", "false");
    content.inert = false;
    content.style.maxHeight = `${content.scrollHeight}px`;
    content.style.opacity = "1";
    content.setAttribute("data-open", "true");
  });
});
mobileNavGroups.forEach((group) => {
  const summary = group.querySelector(".mobile-nav-summary");
  const panel = group.querySelector(".mobile-project-list");
  summary.setAttribute("aria-expanded", "false");
  panel.setAttribute("aria-hidden", "true");
  panel.inert = true;
  panel.style.maxHeight = "0px";
  summary.addEventListener("click", (event) => {
    event.preventDefault();
    if (group.classList.contains("is-open")) {
      panel.style.maxHeight = `${panel.getBoundingClientRect().height}px`;
      panel.offsetHeight;
      group.classList.remove("is-open");
      summary.setAttribute("aria-expanded", "false");
      panel.setAttribute("aria-hidden", "true");
      panel.inert = true;
      panel.style.maxHeight = "0px";
      panel.style.opacity = "0";
      return;
    }
    group.classList.add("is-open");
    summary.setAttribute("aria-expanded", "true");
    panel.setAttribute("aria-hidden", "false");
    panel.inert = false;
    panel.style.maxHeight = `${panel.scrollHeight}px`;
    panel.style.opacity = "1";
  });
});
if (!reduceMotion.matches) typeIntro();
applyDisclosureHeights();
syncDisclosureMode();

themeToggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    setTheme(root.dataset.theme === "dark" ? "light" : "dark");
  });
});
languageToggles.forEach((toggle) => {
  toggle.addEventListener("click", () => setLanguage(toggle.dataset.language));
});

menuToggle.addEventListener("click", () => {
  if (mobileMenu.classList.contains("is-open")) closeMobileMenu(false);
  else openMobileMenu();
});
menuClose.addEventListener("click", () => closeMobileMenu());
mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => closeMobileMenu(false));
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (mobileMenu.classList.contains("is-open")) closeMobileMenu();
  }
  if (event.key === "Tab" && mobileMenu.classList.contains("is-open")) {
    const focusable = mobileMenu.querySelectorAll('a[href], button:not([disabled]), summary');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});
mobileQuery.addEventListener("change", syncDisclosureMode);
window.addEventListener("resize", syncDisclosureMode);
