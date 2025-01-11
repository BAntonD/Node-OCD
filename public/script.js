document.addEventListener('DOMContentLoaded', () => {
  // ------------------- Змінні -------------------
  const operatorSelect = document.getElementById('operator-select');
  const talentSelect = document.getElementById('talent-select');
  const talentDescription = document.getElementById('talent-description');
  const skillSelect = document.getElementById('skill-select');
  const skillDescription = document.getElementById('skill-description');
  const calculateBtn = document.getElementById('calculate-btn');

  // Ліва частина
  const trustLabel = document.getElementById('trust-label');
  const atkLabel = document.getElementById('atk-label');
  const potLabel = document.getElementById('pot-label');
  const traitLabel = document.getElementById('trait-label');
  const modifier1 = document.getElementById('modifier1-input');
  const modifier2 = document.getElementById('modifier2-input');
  const inspiration = document.getElementById('inspiration-input');

  // Права частина (враховуючи ворога)
  const enemyCheckbox = document.getElementById('enemy-checkbox');
  const enemySelect = document.getElementById('enemy-select');
  const defenseInput = document.getElementById('defense-input');
  const resistInput = document.getElementById('resist-input');
  const hpInput = document.getElementById('hp-input');
  const vulnerabilityInput = document.getElementById('vulnerability-input');
  const percentRadio = document.getElementById('vulnerability-percent');
  const valueRadio = document.getElementById('vulnerability-value');
  const defOption = document.getElementById('def-option');
  const resOption = document.getElementById('res-option');
  const nothingOption = document.getElementById('nothing-option');
  const dpsStandard = document.getElementById('dps-standard');
  const damageStandard = document.getElementById('damage-standard');
  const percentStandard = document.getElementById('percent-standard');

  // Початкові дані для ворога
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

  // Завантаження операторів
  fetch('/getOperators')
    .then((response) => response.json())
    .then((data) => {
      data.forEach((operator) => {
        const option = document.createElement('option');
        option.value = operator.id;
        option.textContent = operator.name;
        operatorSelect.appendChild(option);
      });
    });

  // Завантаження характеристик оператора
  operatorSelect.addEventListener('change', () => {
    const operatorId = operatorSelect.value;

    if (operatorId) {
      talentSelect.innerHTML = '<option value="">Вибрати талант</option>';
      skillSelect.innerHTML = '<option value="">Вибрати навичку</option>';
      talentDescription.textContent = 'Опис таланту буде тут';
      skillDescription.textContent = 'Опис навички буде тут';

      fetch(`/operator/${operatorId}`)
        .then((response) => response.json())
        .then((data) => {
          trustLabel.textContent = data.Trust_Attack;
          atkLabel.textContent = data.Attack;
          potLabel.textContent = data.Pot_Attack;
          traitLabel.textContent = data.trait;
        });

      fetch(`/operator/${operatorId}/talents`)
        .then((response) => response.json())
        .then((data) => {
          data.forEach((talent) => {
            const option = document.createElement('option');
            option.value = talent.id;
            option.textContent = talent.name;
            option.dataset.description = talent.description;
            talentSelect.appendChild(option);
          });
        });

      fetch(`/operator/${operatorId}/skills`)
        .then((response) => response.json())
        .then((data) => {
          data.forEach((skill) => {
            const option = document.createElement('option');
            option.value = skill.id;
            option.textContent = skill.name;
            option.dataset.description = skill.description;
            skillSelect.appendChild(option);
          });
        });
    } else {
      trustLabel.textContent = '-';
      atkLabel.textContent = '-';
      potLabel.textContent = '-';
      traitLabel.textContent = '-';

      talentSelect.innerHTML = '<option value="">Вибрати талант</option>';
      skillSelect.innerHTML = '<option value="">Вибрати навичку</option>';
      talentDescription.textContent = 'Опис таланту буде тут';
      skillDescription.textContent = 'Опис навички буде тут';
    }
  });

  // Опис таланту
  talentSelect.addEventListener('change', () => {
    const selectedOption = talentSelect.options[talentSelect.selectedIndex];
    talentDescription.textContent =
      selectedOption?.dataset.description || 'Опис таланту буде тут';
  });

  // Опис навички
  skillSelect.addEventListener('change', () => {
    const selectedOption = skillSelect.options[skillSelect.selectedIndex];
    skillDescription.textContent =
      selectedOption?.dataset.description || 'Опис навички буде тут';
  });

  // Функція для увімкнення/вимкнення полів ворога
  const toggleFields = () => {
    const isEnabled = !enemyCheckbox.checked;
    [defenseInput, resistInput, hpInput, vulnerabilityInput].forEach(
      (input) => (input.disabled = isEnabled),
    );
    [percentRadio, valueRadio, defOption, resOption, nothingOption].forEach(
      (radio) => (radio.disabled = isEnabled),
    );

    if (isEnabled) {
      [defenseInput, resistInput, hpInput, vulnerabilityInput].forEach(
        (input) => (input.value = ''),
      );
      percentRadio.checked = false;
      valueRadio.checked = false;
      nothingOption.checked = true;
    }
  };

  // Оновлення полів ворога
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

  const calculateDamage = (event) => {
    event.preventDefault(); // Запобігаємо перезавантаженню сторінки
    console.log('--- Розрахунок пошкодження ---');

    let damage =
      parseFloat(atkLabel.textContent) +
      parseFloat(trustLabel.textContent) +
      parseFloat(potLabel.textContent);
    console.log('Початкове значення damage:', damage);

    damage *= 1 + parseFloat(modifier1.value || 0) / 100;
    console.log('Після врахування modifier1:', damage);

    damage *= 1 + parseFloat(modifier2.value || 0) / 100;
    console.log('Після врахування modifier2:', damage);

    damage += parseFloat(inspiration.value || 0);
    console.log('Після врахування inspiration:', damage);

    const defense = parseFloat(defenseInput.value || 0);
    console.log('Захист ворога:', defense);

    const resist = parseFloat(resistInput.value || 0);
    console.log('Резист ворога:', resist);

    if (defOption.checked) {
      damage -= defense;
      console.log('Застосовано захист, нове значення damage:', damage);
    } else if (resOption.checked) {
      const resistFactor = Math.max(1 - resist / 100, 0.05);
      damage *= resistFactor;
      console.log('Застосовано резист, нове значення damage:', damage);
    }

    const vulnerabilityValue = parseFloat(vulnerabilityInput.value || 0);
    console.log('Вразливість ворога:', vulnerabilityValue);

    if (percentRadio.checked) {
      damage *= 1 + vulnerabilityValue / 100;
      console.log(
        'Застосовано вразливість у відсотках, нове значення damage:',
        damage,
      );
    } else if (valueRadio.checked) {
      damage += vulnerabilityValue;
      console.log(
        'Застосовано вразливість у значеннях, нове значення damage:',
        damage,
      );
    }

    // Перевірка на мінімум і максимум
    const minDamage = parseFloat(atkLabel.textContent) * 0.5;
    const maxDamage = parseFloat(atkLabel.textContent) * 2;
    damage = Math.max(minDamage, Math.min(damage, maxDamage));

    console.log('Після перевірки на мінімум і максимум damage:', damage);
    dpsStandard.textContent = damage.toFixed(2);
    damageStandard.textContent = damage.toFixed(2);
    percentStandard.textContent = (damage / 100).toFixed(2);
  };

  // Вмикаємо та вимикаємо ворога
  enemyCheckbox.addEventListener('change', toggleFields);
  enemySelect.addEventListener('change', updateEnemyFields);

  // Кнопка для розрахунку
  calculateBtn.addEventListener('click', calculateDamage);

  // Оновлюємо поля при завантаженні
  toggleFields();
});
