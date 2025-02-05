// Привязываем функцию калькулятора к глобальному объекту window,
// чтобы AlpineJS мог её найти через x-data="franchiseCalculator()".
window.franchiseCalculator = function () {
  return {
    // Начальный шаг: 0 – ввод контактных данных; затем 1 – выбор параметров; 2 – итоговый расчет.
    step: 0,

    // Параметры магазина
    storeFormatIndex: 0,
    storeFormats: [
      { label: "150–300 м²", avg: 225 },
      { label: "350–500 м²", avg: 425 },
      { label: "500–1000 м²", avg: 750 },
    ],
    // Тип оборудования: "new" (новое) или "used" (б/у)
    equipmentType: "new",
    // Товарная наполненность (руб/кв.м)
    productContent: 3500,
    // Ставка аренды (руб/кв.м)
    rentRate: 350,

    // Формат сотрудничества: "start", "standard", "business"
    cooperationFormat: "start",

    // Контактные данные
    contactName: "",
    contactPhone: "",

    // Геттер для площади магазина (среднее значение выбранного диапазона)
    get area() {
      return this.storeFormats[this.storeFormatIndex].avg;
    },
    // Стоимость оборудования = площадь × (ставка оборудования)
    // Для нового оборудования: 4500 руб/кв.м, для б/у: 2500 руб/кв.м.
    get equipmentCost() {
      return this.area * (this.equipmentType === "new" ? 4500 : 2500);
    },
    // Вложения в ассортимент = вложения (руб/кв.м) × площадь
    get productInvestment() {
      return this.productContent * this.area;
    },
    // Базовая стоимость = оборудование + вложения
    get baseCost() {
      return this.equipmentCost + this.productInvestment;
    },
    // Арендные расходы (в месяц) = ставка аренды × площадь
    get rentExpensePerMonth() {
      return this.rentRate * this.area;
    },
    // Итоговая стоимость франшизы:
    // Для "Старт": итог = базовая стоимость.
    // Для "Стандарт": итог = базовая стоимость + стартовый взнос (300000 руб).
    // Для "Бизнес": итог = базовая стоимость + единоразовая выплата (500000 руб).
    get finalCost() {
      if (this.cooperationFormat === "start") {
        return this.baseCost;
      } else if (this.cooperationFormat === "standard") {
        return this.baseCost + 300000;
      } else if (this.cooperationFormat === "business") {
        return this.baseCost + 500000;
      }
      return this.baseCost;
    },
    // Отформатированная итоговая стоимость
    get formattedCost() {
      return this.formatPrice(this.finalCost);
    },
    // Метод для форматирования числовых значений (разделители)
    formatPrice(value) {
      return new Intl.NumberFormat("ru-RU").format(Math.round(value));
    },
    // Расшифровка калькуляции для прозрачности
    get breakdown() {
      let result = `<p>Стоимость оборудования: ${this.formatPrice(
        this.equipmentCost
      )} ₽</p>
                      <p>Вложения в ассортимент: ${this.formatPrice(
                        this.productInvestment
                      )} ₽</p>
                      <p>Базовая стоимость (оборудование + ассортимент): ${this.formatPrice(
                        this.baseCost
                      )} ₽</p>
                      <p>Арендные расходы: ${this.formatPrice(
                        this.rentExpensePerMonth
                      )} ₽/мес</p>`;
      if (this.cooperationFormat === "start") {
        result += `<p>Роялти: 5% от прибыли (примерно 142000 ₽/мес)</p>`;
      } else if (this.cooperationFormat === "standard") {
        result += `<p>Стартовый взнос: ${this.formatPrice(300000)} ₽</p>
                     <p>Роялти: 3% от прибыли (примерно 5000 ₽/мес)</p>
                     <p class="note">* При уменьшении или увеличении стартового взноса процент роялти варьируется. Предложение обговаривается индивидуально с менеджером.</p>`;
      } else if (this.cooperationFormat === "business") {
        result += `<p>Единоразовая выплата: ${this.formatPrice(500000)} ₽</p>`;
      }
      return result;
    },
    // Переход с шага 0 (контактные данные) к шагу 1 (параметры магазина)
    proceedToCalculation() {
      if (!this.contactName.trim() || !this.contactPhone.trim()) {
        alert("Пожалуйста, заполните имя и контактный телефон.");
        return;
      }
      this.step = 1;
    },
    // Переход ко второму шагу (параметры -> итог)
    goToStep2() {
      this.step = 2;
    },
    // Отправка заявки
    submitRequest() {
      if (!this.contactName.trim() || !this.contactPhone.trim()) {
        alert("Пожалуйста, заполните имя и телефон.");
        return;
      }
      // Подготовка данных для отправки
      const data = {
        name: this.contactName,
        phone: this.contactPhone,
        area: this.area,
        equipmentCost: this.equipmentCost,
        productInvestment: this.productInvestment,
        baseCost: this.baseCost,
        rentExpensePerMonth: this.rentExpensePerMonth,
        cooperationFormat: this.cooperationFormat,
        finalCost: this.finalCost,
      };

      // Отправляем данные на серверный скрипт (telegram.php)
      fetch("https://franchise-domustroy-backend.onrender.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.success) {
            alert("Заявка отправлена! Наш менеджер свяжется с Вами.");
            this.contactName = "";
            this.contactPhone = "";
          } else {
            alert("Ошибка при отправке заявки: " + result.error);
          }
        })
        .catch((error) => {
          console.error(error);
          alert("Ошибка при отправке заявки.");
        });
    },
  };
};
