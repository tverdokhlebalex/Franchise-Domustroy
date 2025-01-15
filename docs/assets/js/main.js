import AOS from "aos";
import "aos/dist/aos.css";

// Инициализация AOS
AOS.init({
  duration: 1500, // Продолжительность анимации
  offset: 150, // Смещение перед анимацией
});

// Дожидаемся, пока DOM будет готов
document.addEventListener("DOMContentLoaded", () => {
  // Проверяем, есть ли на странице canvas с id="financialChart"
  const chartElement = document.getElementById("financialChart");
  if (chartElement) {
    // Инициализируем Chart.js
    const financialChart = new Chart(chartElement, {
      type: "line",
      data: {
        labels: [
          "Q1 2022",
          "Q2 2022",
          "Q3 2022",
          "Q4 2022",
          "Q1 2023",
          "Q2 2023",
          "Q3 2023",
          "Q4 2023",
          "Q1 2024",
          "Q2 2024",
          "Q3 2024",
          "Q4 2024",
        ],
        datasets: [
          {
            label: "Выручка (тыс. ₽)",
            data: [
              1200, 1500, 1800, 2000, 2200, 2500, 2700, 3000, 3200, 3400, 3600,
              3800,
            ],
            borderColor: "#FF5733",
            backgroundColor: "rgba(255, 87, 51, 0.1)",
            fill: true,
            tension: 0.2, // сглаживание линий
          },
          {
            label: "Прибыль (тыс. ₽)",
            data: [100, 130, 150, 170, 190, 220, 240, 260, 280, 300, 320, 350],
            borderColor: "#2471A3",
            backgroundColor: "rgba(36,113,163,0.1)",
            fill: true,
            tension: 0.2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        // Дополнительные настройки анимации
        animation: {
          duration: 1500,
          easing: "easeInOutQuart",
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            display: true,
          },
        },
      },
    });
  }
});
