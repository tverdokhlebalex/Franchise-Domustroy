// Глобально, чтобы Alpine мог найти
window.franchiseCalculator = function () {
  return {
    // Текущий шаг: 0 – ввод данных, 1 – параметры, 2 – итог
    step: 0,

    // Поля контактных данных
    contactName: "",
    contactPhone: "",
    phoneError: false,

    // Параметры магазина
    storeFormatIndex: 0,
    storeFormats: [
      { label: "150–300 м²", avg: 225 },
      { label: "350–500 м²", avg: 425 },
      { label: "500–1000 м²", avg: 750 },
    ],
    equipmentType: "new",
    productContent: 3500,
    rentRate: 350,
    cooperationFormat: "start",

    // Валидация телефона (пример)
    formatPhoneNumber(event) {
      let value = event.target.value.replace(/\D/g, "");
      if (value.length > 11) value = value.slice(0, 11);
      // +7 (...)
      let formatted = "+7 ";
      if (value.length > 1) formatted += "(" + value.slice(1, 4);
      if (value.length > 4) formatted += ") " + value.slice(4, 7);
      if (value.length > 7) formatted += "-" + value.slice(7, 9);
      if (value.length > 9) formatted += "-" + value.slice(9, 11);
      this.contactPhone = formatted;
    },
    validatePhone() {
      this.phoneError = !/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(
        this.contactPhone
      );
    },

    // Геттеры
    get area() {
      return this.storeFormats[this.storeFormatIndex].avg;
    },
    get equipmentCost() {
      return this.area * (this.equipmentType === "new" ? 4500 : 2500);
    },
    get productInvestment() {
      return this.productContent * this.area;
    },
    get baseCost() {
      return this.equipmentCost + this.productInvestment;
    },
    get rentExpensePerMonth() {
      return this.rentRate * this.area;
    },
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
    get formattedCost() {
      return new Intl.NumberFormat("ru-RU").format(Math.round(this.finalCost));
    },
    get breakdown() {
      let result = `<p>Стоимость оборудования: ${this.formatPrice(
        this.equipmentCost
      )} ₽</p>
                   <p>Вложения в ассортимент: ${this.formatPrice(
                     this.productInvestment
                   )} ₽</p>
                   <p>Базовая стоимость: ${this.formatPrice(
                     this.baseCost
                   )} ₽</p>
                   <p>Арендные расходы: ${this.formatPrice(
                     this.rentExpensePerMonth
                   )} ₽/мес</p>`;
      if (this.cooperationFormat === "start") {
        result += `<p>Роялти: 5% от прибыли (~142000 ₽/мес)</p>`;
      } else if (this.cooperationFormat === "standard") {
        result += `<p>Стартовый взнос: 300000 ₽</p>
                   <p>Роялти: 3% от прибыли (~5000 ₽/мес)</p>`;
      } else if (this.cooperationFormat === "business") {
        result += `<p>Единоразовая выплата: 500000 ₽</p>`;
      }
      return result;
    },
    // форматирование:
    formatPrice(value) {
      return new Intl.NumberFormat("ru-RU").format(Math.round(value));
    },

    // Переход к шагу 1
    proceedToCalculation() {
      // простая проверка
      if (
        !this.contactName.trim() ||
        !this.contactPhone.trim() ||
        this.phoneError
      ) {
        alert("Заполните корректно имя и телефон!");
        return;
      }
      this.step = 1;
    },
    // Переход к шагу 2
    goToStep2() {
      this.step = 2;
    },
    // Отправка заявки
    submitRequest() {
      if (!this.contactName.trim() || !this.contactPhone.trim()) {
        alert("Пожалуйста, заполните имя и телефон.");
        return;
      }
      // Пример отправки fetch...
      alert("Заявка отправлена! Менеджер свяжется с вами.");
      // Сброс шагов/полей:
      this.step = 0;
      this.contactName = "";
      this.contactPhone = "";
    },
  };
};
