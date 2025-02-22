document.addEventListener("alpine:init", () => {
  Alpine.data("contactForm", () => ({
    step: 0,
    contactName: "",
    contactPhone: "",
    phoneError: false,

    formatPhoneNumber(event) {
      let value = event.target.value.replace(/\D/g, ""); // Удаляем все, кроме цифр

      if (value.length > 11) {
        value = value.slice(0, 11); // Ограничиваем длину
      }

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

    proceedToCalculation() {
      if (!this.phoneError && this.contactName) {
        console.log("Переход к расчету...");
        this.step = 1; // Переход к следующему шагу
      }
    },
  }));
});
