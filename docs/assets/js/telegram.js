/**
 * Отправляет данные заявки на серверный скрипт для отправки через Telegram Bot API.
 * @param {Object} data - Объект с данными заявки.
 * @returns {Promise} - Возвращает промис, который резолвится с ответом сервера.
 */
export function sendTelegramData(data) {
  return fetch("api/telegram.php", {
    // либо 'telegram.php', если файл в корне dist
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => response.json());
}
