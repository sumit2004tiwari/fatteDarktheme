const hamburgerIcon = document.querySelector(".menu-icon");
const nav = document.querySelector(".mobile-nav");
const navLinks = document.querySelectorAll(".mobile-nav .nav-menu a");
const closeIcon = document.querySelector(".mobile-nav .menu-close img");
const header = document.querySelector("header");
const allNavLinks = document.querySelectorAll('a[href^="#"]');
const allSections = document.querySelectorAll("section");
const themeToggle = document.querySelector(".theme-toggle");

const container = document.getElementById("cardItems");
let cards = Array.from(container.children);

// STEP 1: Clone all cards once for infinite loop illusion
cards.forEach(card => {
  const clone = card.cloneNode(true);
  container.appendChild(clone);
});

cards = Array.from(container.children); // update list with clones

let currentIndex = 0;
const cardWidth = cards[0].offsetWidth + 20; // width + gap (adjust if needed)

function highlightCard(index) {
  cards.forEach((card, i) => {
    card.classList.remove("active");
  });

  const realIndex = index % (cards.length / 2); // only apply zoom to original cards
  cards[realIndex].classList.add("active");

  container.scrollTo({
    left: index * cardWidth,
    behavior: "smooth"
  });

  // RESET SCROLL after full loop to prevent overflow
  if (index >= cards.length / 2) {
    setTimeout(() => {
      container.scrollTo({ left: 0, behavior: "auto" });
    }, 400); // let the last scroll finish before jumping
    currentIndex = 0;
  }
}

highlightCard(currentIndex);

setInterval(() => {
  currentIndex++;
  highlightCard(currentIndex);
}, 1000);







  
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

// resume crausel 
 const resume = document.querySelector('.resume');
 const resumeItems = document.querySelectorAll('.resume-item'); 