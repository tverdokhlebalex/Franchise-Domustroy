window.franchiseCalculator = function () {
  return {
    // Шаг: 1 – выбор параметров, 2 – выбор формата сотрудничества и расчёт стоимости
    step: 1,

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

    // Вычисляемая площадь магазина (среднее значение выбранного диапазона)
    get area() {
      return this.storeFormats[this.storeFormatIndex].avg;
    },
    // Стоимость оборудования = площадь × (ставка оборудования)
    // Для нового оборудования: 4500 руб/кв.м, для б/у: 2500 руб/кв.м
    get equipmentCost() {
      return this.area * (this.equipmentType === "new" ? 4500 : 2500);
    },
    // Инвестиции в ассортимент = вложения (руб/кв.м) × площадь
    get productInvestment() {
      return this.productContent * this.area;
    },
    // Базовая стоимость (оборудование + вложения)
    get baseCost() {
      return this.equipmentCost + this.productInvestment;
    },
    // Арендные расходы (в месяц) = ставка аренды × площадь
    get rentExpensePerMonth() {
      return this.rentRate * this.area;
    },
    // Итоговая стоимость франшизы зависит от формата сотрудничества:
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
    // Метод для форматирования чисел (разделители)
    formatPrice(value) {
      return new Intl.NumberFormat("ru-RU").format(Math.round(value));
    },
    // Расшифровка расчёта для прозрачности
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
        result += `<p>Роялти: 5% от прибыли (примерно 4000 ₽/мес)</p>`;
      } else if (this.cooperationFormat === "standard") {
        result += `<p>Стартовый взнос: ${this.formatPrice(300000)} ₽</p>
                     <p>Роялти: 3% от прибыли (примерно 5000 ₽/мес)</p>
                     <p class="note">* При уменьшении или увеличении стартового взноса процент роялти варьируется. Предложение обговаривается индивидуально с менеджером.</p>`;
      } else if (this.cooperationFormat === "business") {
        result += `<p>Единоразовая выплата: ${this.formatPrice(500000)} ₽</p>`;
      }
      return result;
    },
    // Переход ко второму шагу
    goToStep2() {
      this.step = 2;
    },
    // Отправка заявки
    submitRequest() {
      if (!this.contactName.trim() || !this.contactPhone.trim()) {
        alert("Пожалуйста, заполните имя и телефон.");
        return;
      }
      alert("Заявка отправлена! Наш менеджер свяжется с Вами.");
      this.contactName = "";
      this.contactPhone = "";
    },
  };
};
