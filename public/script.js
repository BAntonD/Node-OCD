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

document.getElementById('calculate-btn').addEventListener('click', () => {
  // Виконати обчислення і оновити результати
  console.log("Calculating...");

});


document.addEventListener('DOMContentLoaded', () => {
  const vulnerabilityInput = document.getElementById('vulnerability-input');
  const percentRadio = document.getElementById('vulnerability-percent');
  const valueRadio = document.getElementById('vulnerability-value');

  // Функція для оновлення плейсхолдера та логіки
  const updatePlaceholder = () => {
    if (percentRadio.checked) {
      vulnerabilityInput.placeholder = 'Введіть відсоток';
    } else if (valueRadio.checked) {
      vulnerabilityInput.placeholder = 'Введіть числове значення';
    }
  };

  // Додаємо обробники подій
  [percentRadio, valueRadio].forEach((radio) =>
    radio.addEventListener('change', updatePlaceholder)
  );

  updatePlaceholder();
});
