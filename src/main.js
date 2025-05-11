const hamburgerIcon = document.querySelector(".hamburger-icon");
const nav = document.querySelector(".sm-nav");
const navLinks = document.querySelectorAll(".sm-nav .nav-links a");
const closeIcon = document.querySelector(".sm-nav .close-icon img");
const header = document.querySelector("header");
const links = document.querySelectorAll(".nav-links a");

links.forEach((link) => {
  link.addEventListener("click", function () {
    links.forEach((el) => el.classList.remove("active"));
    this.classList.add("active");
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
