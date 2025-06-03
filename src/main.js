const hamburgerIcon = document.querySelector(".menu-icon");
const nav = document.querySelector(".mobile-nav");
const navLinks = document.querySelectorAll(".mobile-nav .nav-menu a");
const closeIcon = document.querySelector(".mobile-nav .menu-close img");
const header = document.querySelector("header");
const allNavLinks = document.querySelectorAll('a[href^="#"]');
const allSections = document.querySelectorAll("section");
let currentActiveId = null;

allNavLinks.forEach((link) => {
  link.addEventListener("click", function () {
    const href = this.getAttribute("href");
    allNavLinks.forEach((el) => {
      if (el.getAttribute("href") === href) {
        el.classList.add("active");
      } else {
        el.classList.remove("active");
      }
    });
  });
});

window.addEventListener("scroll", () => {
  if (window.scrollY > 10) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

hamburgerIcon.addEventListener("click", () => {
  nav.classList.toggle("show");
});

closeIcon.addEventListener("click", () => {
  nav.classList.remove("show");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("show");
  });
});

window.addEventListener("scroll", () => {
  let newActiveId = null;

  allSections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    if (
      rect.top <= viewportHeight * 0.55 &&
      rect.bottom >= viewportHeight * 0.45
    ) {
      newActiveId = section.getAttribute("id");
    }
  });

  if (newActiveId && newActiveId !== currentActiveId) {
    currentActiveId = newActiveId;

    allNavLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (href === `#${currentActiveId}`) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    history.replaceState(null, "", `#${currentActiveId}`);
  }
});
