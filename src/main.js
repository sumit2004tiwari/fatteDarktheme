const hamburgerIcon = document.querySelector(".menu-icon");
const nav = document.querySelector(".mobile-nav");
const navLinks = document.querySelectorAll(".mobile-nav .nav-menu a");
const closeIcon = document.querySelector(".mobile-nav .menu-close img");
const header = document.querySelector("header");
const allNavLinks = document.querySelectorAll('a[href^="#"]');
const allSections = document.querySelectorAll("section");
const themeToggle = document.querySelector(".theme-toggle");

const container = document.getElementById("cardItems");
const cards = Array.from(container.children);

// Clone cards for infinite loop effect
cards.forEach(card => {
  const clone = card.cloneNode(true);
  container.appendChild(clone);
});

// Scroll automatically
let scrollSpeed = 1;
function autoScroll() {
  container.scrollLeft += scrollSpeed;

  // Reset to start for infinite effect
  if (container.scrollLeft >= container.scrollWidth / 2) {
    container.scrollLeft = 0;
  }
}
setInterval(autoScroll, 16);




  
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

function setTheme(theme) {
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
    document.documentElement.classList.remove("light");
  } else {
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("light");
  }
  localStorage.setItem("theme", theme);
}

function getInitialTheme() {
  const storedTheme = localStorage.getItem("theme");
  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }
  return prefersDarkScheme.matches ? "dark" : "light";
}

// Set initial theme on page load
setTheme(getInitialTheme());

// Toggle theme on icon click
themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.classList.contains("dark") ? "dark" : "light";
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  setTheme(newTheme);
});