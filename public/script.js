document.addEventListener('DOMContentLoaded', () => {
  // ------------------- Змінні -------------------
  const operatorSelect = document.getElementById('operator-select');
  const calculateBtn = document.getElementById('calculate-btn');

  // Ліва частина
  const baseAtk = document.getElementById('atk-label');
  const trustAtk = document.getElementById('trust-label');
  const potAtk = document.getElementById('pot-label');
  const talentAtk = document.getElementById('talent-atk-input');
  const modifier1 = document.getElementById('modifier1-input');
  const modifier2 = document.getElementById('modifier2-input');
  const inspiration = document.getElementById('inspiration-input');

  // Права частина
  const enemyCheckbox = document.getElementById('enemy-checkbox');
  const enemySelect = document.getElementById('enemy-select');
  const defenseInput = document.getElementById('defense-input');
  const resistInput = document.getElementById('resist-input');
  const hpInput = document.getElementById('hp-input');
  const vulnerabilityInput = document.getElementById('vulnerability-input');
  const percentRadio = document.getElementById('vulnerability-percent');
  const valueRadio = document.getElementById('vulnerability-value');
  const vulnerabilityRadios = [percentRadio, valueRadio];
  const defOption = document.getElementById('def-option');
  const resOption = document.getElementById('res-option');
  const nothingOption = document.getElementById('nothing-option');
  const parameterRadios = [defOption, resOption, nothingOption];

  // Центральна частина
  const dpsStandard = document.getElementById('dps-standard');
  const damageStandard = document.getElementById('damage-standard');
  const percentStandard = document.getElementById('percent-standard');

  // ------------------- Фіктивні дані -------------------
  const enemies = [
    {
      id: 1,
      name: 'Goblin',
      defense: 50,
      resist: 10,
      hp: 100,
      vulnerability: 20,
    },
    {
      id: 2,
      name: 'Troll',
      defense: 100,
      resist: 30,
      hp: 300,
      vulnerability: 15,
    },
    {
      id: 3,
      name: 'Dragon',
      defense: 200,
      resist: 50,
      hp: 1000,
      vulnerability: 25,
    },
  ];

  // Встановлення початкових значень
  baseAtk.textContent = '1000';
  trustAtk.textContent = '300';
  potAtk.textContent = '100';
  talentAtk.value = '200';
  modifier1.value = '20';
  modifier2.value = '10';
  inspiration.value = '50';

  defenseInput.value = '50';
  resistInput.value = '20';
  hpInput.value = '500';
  vulnerabilityInput.value = '10';
  percentRadio.checked = true;
  defOption.checked = true;

  // ------------------- Функції -------------------

  // Завантаження операторів
  const loadOperators = async () => {
    operatorSelect.innerHTML = '<option>Завантаження...</option>';
    try {
      const response = await fetch('/operators');
      if (!response.ok) throw new Error('Помилка завантаження операторів');
      const operators = await response.json();
      operatorSelect.innerHTML = '<option value="">Вибрати оператора</option>';
      operators.forEach((operator) => {
        const option = document.createElement('option');
        option.value = operator.id;
        option.textContent = operator.name;
        operatorSelect.appendChild(option);
      });
    } catch (error) {
      operatorSelect.innerHTML = '<option>Помилка завантаження</option>';
      console.error('Помилка:', error.message);
    }
  };

  // Увімкнення/вимкнення текстових полів і радіокнопок
  const toggleFields = () => {
    const isEnabled = !enemyCheckbox.checked;
    [defenseInput, resistInput, hpInput, vulnerabilityInput].forEach(
      (input) => (input.disabled = isEnabled),
    );
    [...vulnerabilityRadios, ...parameterRadios].forEach(
      (radio) => (radio.disabled = isEnabled),
    );
    if (isEnabled) {
      // Скидання полів при активному чекбоксі
      [defenseInput, resistInput, hpInput, vulnerabilityInput].forEach(
        (input) => (input.value = ''),
      );
      percentRadio.checked = false;
      valueRadio.checked = false;
      nothingOption.checked = true;
    }
  };

  // Оновлення полів при виборі ворога
  const updateEnemyFields = () => {
    const selectedEnemy = enemies.find(
      (enemy) => enemy.id === parseInt(enemySelect.value, 10),
    );
    if (selectedEnemy && enemyCheckbox.checked) {
      defenseInput.value = selectedEnemy.defense;
      resistInput.value = selectedEnemy.resist;
      hpInput.value = selectedEnemy.hp;
      vulnerabilityInput.value = selectedEnemy.vulnerability;
      percentRadio.checked = true;
      nothingOption.checked = true;
    }
  };

  // Розрахунок пошкодження
  const calculateDamage = () => {
    // Базові значення
    let damage =
      parseFloat(baseAtk.textContent) +
      parseFloat(trustAtk.textContent) +
      parseFloat(potAtk.textContent) +
      parseFloat(talentAtk.value || 0);
    damage *= 1 + parseFloat(modifier1.value || 0) / 100;
    damage *= 1 + parseFloat(modifier2.value || 0) / 100;
    damage += parseFloat(inspiration.value || 0);

    // Захисний ефект
    const defense = parseFloat(defenseInput.value || 0);
    const resist = parseFloat(resistInput.value || 0);
    if (defOption.checked) {
      damage -= defense;
    } else if (resOption.checked) {
      const resistFactor = Math.max(1 - resist / 100, 0.05);
      damage *= resistFactor;
    }

    // Вразливість
    const vulnerabilityValue = parseFloat(vulnerabilityInput.value || 0);
    if (percentRadio.checked) {
      damage *= 1 + vulnerabilityValue / 100;
    } else {
      damage += vulnerabilityValue;
    }

    // Мінімальне пошкодження
    const minDamage = parseFloat(baseAtk.textContent) * 0.05;
    damage = Math.max(damage, minDamage);

    // Оновлення результатів
    dpsStandard.textContent = Math.round(damage);
    damageStandard.textContent = Math.round(damage * 5); // Загальне пошкодження за 5 секунд
    percentStandard.textContent = `${Math.round(
      (damage / parseFloat(baseAtk.textContent)) * 100,
    )}%`;
  };

  // ------------------- Події -------------------

  // Завантаження операторів
  loadOperators();

  // Увімкнення/вимкнення полів
  enemyCheckbox.addEventListener('change', toggleFields);

  // Оновлення полів ворога
  enemySelect.addEventListener('change', updateEnemyFields);

  // Обчислення пошкодження
  calculateBtn.addEventListener('click', calculateDamage);

  // Ініціалізація
  toggleFields();
});
