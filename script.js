// variables
const navbar = document.querySelector("nav");
const menuHamburger = document.querySelector(".hamburger");
const navlinks = document.querySelector(".links");

let LastScrollValue = 0;

//Cacher ou réveler la Navbar
window.addEventListener("scroll", () => {
  const menuIsOpen = navlinks.classList.contains("mobile-menu");
  if (menuIsOpen) {
    navbar.style.top = 0;
    return;
  }
  if (window.scrollY > LastScrollValue) {
    navbar.style.top = "-400px";
  } else {
    navbar.style.top = 0;
  }

  LastScrollValue = window.scrollY;
});

// Menu hamburger
menuHamburger.addEventListener("click", () => {
  navlinks.classList.toggle("mobile-menu");
});

// Carousel
const cards = Array.from(document.querySelectorAll(".card"));
const prevBtn = document.querySelector(".carousel-arrow.left");
const nextBtn = document.querySelector(".carousel-arrow.right");

let currentIndex = 0; // index de la carte active (0 = Projet 1)

function updateCarousel() {
  const total = cards.length;

  const prevIndex = (currentIndex - 1 + total) % total;
  const nextIndex = (currentIndex + 1) % total;

  cards.forEach((card, index) => {
    card.classList.remove("prev", "active", "next");

    if (index === currentIndex) {
      card.classList.add("active");
    } else if (index === prevIndex) {
      card.classList.add("prev");
    } else if (index === nextIndex) {
      card.classList.add("next");
    }
  });
}

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % cards.length;
  updateCarousel();
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + cards.length) % cards.length;
  updateCarousel();
});

// init
updateCarousel();

// Pastilles carousel storytelling
function setupDots(carouselSelector) {
  const carousel = document.querySelector(carouselSelector);
  const fiches = Array.from(carousel.querySelectorAll(".fiche"));
  const dots = Array.from(carousel.querySelectorAll(".dot"));

  function updateDots() {
    const carouselRect = carousel.getBoundingClientRect();
    let activeIndex = 0;
    let maxVisible = 0;

    fiches.forEach((fiche, index) => {
      const rect = fiche.getBoundingClientRect();
      // hauteur visible de la fiche dans le viewport du carrousel
      const visible =
        Math.min(rect.bottom, carouselRect.bottom) -
        Math.max(rect.top, carouselRect.top);

      if (visible > maxVisible) {
        maxVisible = visible;
        activeIndex = index;
      }
    });

    dots.forEach((dot, i) => dot.classList.toggle("active", i === activeIndex));
  }

  carousel.addEventListener("scroll", updateDots);
  updateDots();
}
// un carrousel pour les travaux, un pour les études
setupDots(".storytelling .carousel-story:nth-child(1)");
setupDots(".storytelling .carousel-story:nth-child(2)");
