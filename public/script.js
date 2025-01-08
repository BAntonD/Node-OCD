document.addEventListener('DOMContentLoaded', () => {
  const operatorSelect = document.getElementById('operator-select');

  // Отримуємо операторів з сервера
  fetch('/operators')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Помилка завантаження операторів');
      }
      return response.json();
    })
    .then((operators) => {
      // Додаємо операторів до випадаючого списку
      operators.forEach((operator) => {
        const option = document.createElement('option');
        option.value = operator.id; // Встановлюємо id як значення
        option.textContent = operator.name; // Відображаємо ім'я
        operatorSelect.appendChild(option);
      });
    })
    .catch((error) => {
      console.error('Помилка:', error.message);
    });
});
