const navToggle = document.getElementById("navToggle");
const siteNav = document.getElementById("siteNav");

if (navToggle && siteNav) {
  const setNavState = (isOpen) => {
    siteNav.classList.toggle("open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  };

  navToggle.addEventListener("click", () => {
    const isOpen = !siteNav.classList.contains("open");
    setNavState(isOpen);
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 900) {
        setNavState(false);
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setNavState(false);
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      setNavState(false);
    }
  });
}

if (siteNav) {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const activeLink = siteNav.querySelector(`a[href="${currentPage}"]`);

  if (activeLink) {
    activeLink.classList.add("is-active");
    activeLink.setAttribute("aria-current", "page");
  }
}

const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const heroCard = document.querySelector("[data-hero-card]");

if (heroCard && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const updateHeroCard = (event) => {
    const rect = heroCard.getBoundingClientRect();
    const offsetX = (event.clientX - rect.left) / rect.width - 0.5;
    const offsetY = (event.clientY - rect.top) / rect.height - 0.5;
    const rotateY = offsetX * 8;
    const rotateX = offsetY * -8;

    heroCard.style.transform =
      `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  };

  heroCard.addEventListener("pointermove", updateHeroCard);

  heroCard.addEventListener("pointerleave", () => {
    heroCard.style.transform = "";
  });
}
