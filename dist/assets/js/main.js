import AOS from "aos";
import "aos/dist/aos.css";

// Инициализация AOS
AOS.init({
  duration: 1500, // Продолжительность анимации (в мс)
  offset: 150, // Смещение (в пикселях) перед активацией анимации
});

//ПРЕИМУЩЕСТВА
// Складывание карточек для мобильных
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".advantage-card");

  if (window.innerWidth <= 768) {
    let zIndex = cards.length;

    cards.forEach((card) => {
      card.style.zIndex = zIndex--;
    });
  }
});
