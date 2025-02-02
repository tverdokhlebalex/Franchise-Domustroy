window.franchiseCalculator = function () {
  return {
    // Шаг: 1 – выбор параметров, 2 – выбор формата сотрудничества и расчёт стоимости
    step: 1,

    // Параметры магазина:
    storeFormatIndex: 0,
    storeFormats: [
      { label: "150–300 м²", avg: 225 },
      { label: "350–500 м²", avg: 425 },
      { label: "500–1000 м²", avg: 750 },
    ],
    // Тип оборудования: "new" (новое) или "used" (б/у)
    equipmentType: "new",
    // Товарная наполненность (вложения в товарный ассортимент, руб/кв.м)
    productContent: 3500,
    // Ставка аренды (руб/кв.м)
    rentRate: 350,

    // Формат сотрудничества: "start", "standard" или "business"
    cooperationFormat: "start",

    // Контактные данные
    contactName: "",
    contactPhone: "",

    // Вычисление базовой стоимости франшизы:
    // Функция складывает стоимость оборудования, вложения в ассортимент и годовую арендную плату,
    // а затем добавляет корректирующую сумму в зависимости от выбранного формата сотрудничества.
    computeBaseCost() {
      const area = this.storeFormats[this.storeFormatIndex].avg;
      const equipmentCost = this.equipmentType === "new" ? 100000 : 50000;
      const productInvestment = this.productContent * area;
      const rentExpense = this.rentRate * area * 12;
      let base = equipmentCost + productInvestment + rentExpense;
      if (this.cooperationFormat === "standard") {
        base += 200000;
      } else if (this.cooperationFormat === "business") {
        base += 400000;
      }
      return base;
    },

    // Форматирование цены (добавляет разделители)
    formatPrice(value) {
      return new Intl.NumberFormat("ru-RU").format(Math.round(value));
    },

    // Геттер для отформатированной стоимости франшизы
    get formattedCost() {
      return this.formatPrice(this.computeBaseCost());
    },

    // Переход ко второму шагу калькулятора
    goToStep2() {
      this.step = 2;
    },

    // Отправка заявки: проверяет заполненность контактных полей и выводит уведомление
    submitRequest() {
      if (!this.contactName.trim() || !this.contactPhone.trim()) {
        alert("Пожалуйста, заполните имя и телефон.");
        return;
      }
      alert("Заявка отправлена! Наш менеджер свяжется с Вами.");
      // Опционально: сброс контактных данных
      this.contactName = "";
      this.contactPhone = "";
    },
  };
};
