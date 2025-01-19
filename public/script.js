document.addEventListener('DOMContentLoaded', () => {
  // ------------------- Змінні -------------------
  const operatorSelect = document.getElementById('operator-select');
  const talentSelect = document.getElementById('talent-select');
  const talentDescription = document.getElementById('talent-description');
  const skillSelect = document.getElementById('skill-select');
  const skillDescription = document.getElementById('skill-description');
  const calculateBtn = document.getElementById('calculate-btn');

  // ------------------- Змінні -------------------
  const aspdLabel = document.getElementById('aspd-label');
  const talentAtkInput = document.getElementById('talent-atk-input');

  // Ліва частина
  const trustLabel = document.getElementById('trust-label');
  const atkLabel = document.getElementById('atk-label');
  const potLabel = document.getElementById('pot-label');
  const traitLabel = document.getElementById('trait-label');
  const inspiration = document.getElementById('inspiration-input');

  // Права частина (враховуючи ворога)
  const enemyCheckbox = document.getElementById('enemy-checkbox');
  const enemySelect = document.getElementById('enemy-select');
  const defenseInput = document.getElementById('defense-input');
  const resistInput = document.getElementById('resist-input');
  const hpInput = document.getElementById('hp-input');
  const vulnerabilityInput = document.getElementById('vulnerability-input');
  const percentRadio = document.getElementById('vulnerability-percent');
  const defOption = document.getElementById('def-option');
  const resOption = document.getElementById('res-option');
  const nothingOption = document.getElementById('nothing-option');
  const magicResistInput = document.getElementById('magic-resist-input');

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

  // Метод для вимкнення/увімкнення полів залежно від чекбокса ворога та вибору радіо кнопок
  const toggleFields = () => {
    const isEnemyDisabled = !enemyCheckbox.checked; // Якщо ворог вимкнений

    // Якщо чекбокс увімкнений, вимикаємо селект і скидаємо значення
    if (enemyCheckbox.checked) {
      enemySelect.disabled = true;
      enemySelect.value = ''; // Скидаємо значення на "Вибрати ворога"
    } else {
      // Якщо чекбокс вимкнений, дозволяємо редагувати селект
      enemySelect.disabled = false;
    }

    // Вимикаємо поля HP та Абсолютний резист, якщо чекбокс ворога вимкнений
    [hpInput, resistInput].forEach((input) => {
      input.disabled = isEnemyDisabled;
    });

    // Вимикаємо або вмикаємо поле захисту (defense-input)
    if (isEnemyDisabled || !defOption.checked) {
      defenseInput.disabled = true;
    } else {
      defenseInput.disabled = false;
    }

    // Вимикаємо або вмикаємо поле магічного резисту (magic-resist-input)
    if (isEnemyDisabled || !resOption.checked) {
      magicResistInput.disabled = true;
    } else {
      magicResistInput.disabled = false;
    }
  };

  // Додаємо обробники подій
  defOption.addEventListener('change', toggleFields);
  resOption.addEventListener('change', toggleFields);
  nothingOption.addEventListener('change', toggleFields);
  enemyCheckbox.addEventListener('change', toggleFields);

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
          aspdLabel.textContent = data.Aspd;
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

  // Завантаження ворогів
  fetch('/enemies')
    .then((response) => response.json())
    .then((data) => {
      data.forEach((enemy) => {
        const option = document.createElement('option');
        option.value = enemy.id;
        option.textContent = enemy.name;
        enemySelect.appendChild(option);
      });
    });

  // Завантаження характеристик ворога
  enemySelect.addEventListener('change', () => {
    const enemyId = enemySelect.value;

    if (enemyId) {
      fetch(`/enemy/${enemyId}`)
        .then((response) => response.json())
        .then((data) => {
          // Заповнення полів характеристик ворога
          defenseInput.value = data.Defense;
          magicResistInput.value = data.res;
          resistInput.value = data.Resist;
          hpInput.value = data.MaxHp;
        });
    } else {
      // Очищення полів, якщо ворог не вибраний
      defenseInput.value = '';
      magicResistInput.value = '';
      resistInput.value = '';
      hpInput.value = '';
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

  // Функція для розрахунку пошкоджень
  function calculateDamage() {
    console.log('=== Початок розрахунку Атаки ===');

    // Отримуємо базове значення атаки
    let Atk = parseFloat(atkLabel.textContent) || 0;
    console.log(`Базова атака: ${Atk}`);

    // Додаємо Потенціал, якщо чекбокс увімкнений
    if (document.getElementById('pot-checkbox').checked) {
      const potValue = parseFloat(potLabel.textContent) || 0;
      Atk += potValue;
      console.log(`Додано Потенціал (Pot): ${potValue}, Нова Атака: ${Atk}`);
    } else {
      console.log('Потенціал не враховується (чекбокс вимкнений)');
    }

    // Додаємо Траст, якщо чекбокс увімкнений
    if (document.getElementById('trust-checkbox').checked) {
      const trustValue = parseFloat(trustLabel.textContent) || 0;
      Atk += trustValue;
      console.log(`Додано Траст (Trust): ${trustValue}, Нова Атака: ${Atk}`);
    } else {
      console.log('Траст не враховується (чекбокс вимкнений)');
    }

    // Додаємо значення з поля Talent Atk
    const talentAtkValue = parseFloat(talentAtkInput.value) || 0;
    Atk += talentAtkValue;
    console.log(`Додано Talent Atk: ${talentAtkValue}, Нова Атака: ${Atk}`);

    console.log(`=== Кінцева Атака: ${Atk} ===`);

    // ------------------- Модифікатори -------------------

    // 1(+) Модифікатор
    const modifierPlusValue =
      parseFloat(document.getElementById('modifierPlus-input').value) || 0;
    Atk *= 1 + modifierPlusValue / 100;
    console.log(
      `Додано 1(+) Модифікатор: ${modifierPlusValue}%, Нова Атака: ${Atk}`,
    );

    // 2(*) Модифікатори
    const modifier1Value =
      parseFloat(document.getElementById('modifier1-input').value) || 0;
    const modifier2Value =
      parseFloat(document.getElementById('modifier2-input').value) || 0;
    const modifier3Value =
      parseFloat(document.getElementById('modifier3-input').value) || 0;

    if (modifier1Value != 0) {
      Atk *= modifier1Value / 100;
    }
    console.log(
      `Додано 2(*) Модифікатор 1: ${modifier1Value}%, Нова Атака: ${Atk}`,
    );

    if (modifier2Value != 0) {
      Atk *= modifier2Value / 100;
    }
    console.log(
      `Додано 2(*) Модифікатор 2: ${modifier2Value}%, Нова Атака: ${Atk}`,
    );

    if (modifier3Value != 0) {
      Atk *= modifier3Value / 100;
    }
    console.log(
      `Додано 2(*) Модифікатор 3: ${modifier3Value}%, Нова Атака: ${Atk}`,
    );

    // Отримуємо фінальний розмір шкоди (standartDamage)
    const standartDamage = Atk;
    console.log(
      `=== Кінцева Атака(після модифікаторів): ${standartDamage} ===`,
    );

    // ------------------- Крит -------------------

    // Обчислюємо критичний модифікатор, якщо є значення
    const critChanceValue =
      parseFloat(document.getElementById('crit-chance-input').value) || 0;
    const critModifierValue =
      parseFloat(document.getElementById('crit-modifier-input').value) || 0;
    const isCrit = critChanceValue > 0 && critModifierValue > 0;
    let critDamage = standartDamage; // Якщо немає критичного удару, використовуємо стандартний damage
    if (isCrit) {
      critDamage = standartDamage * (critModifierValue / 100);
      console.log(
        `Обчислений Крит: ${critDamage}, Шанс крита: ${critChanceValue}%, Модифікатор крита: ${critModifierValue}%`,
      );
    } else {
      console.log('Крит не враховується (Шанс або модифікатор не введено)');
    }

    // ------------------- Враховуємо Inspiration -------------------

    const inspirationValue = parseFloat(inspiration.value) || 0;

    // Додаємо Inspiration до стандартного damage
    const finalStandartDamage = standartDamage + inspirationValue;
    console.log(
      `Додано Inspiration: ${inspirationValue}, Фінальна стандартна шкода: ${finalStandartDamage}`,
    );

    // Додаємо Inspiration до критичної шкоди, якщо вона була обчислена
    if (isCrit) {
      critDamage += inspirationValue;
      console.log(
        `Додано Inspiration до критичної шкоди: ${inspirationValue}, Фінальна критична шкода: ${critDamage}`,
      );
    }

    // Виводимо результати
    console.log(
      `=== Кінцева стандартна шкода(після Inspiration): ${finalStandartDamage} ===`,
    );
    if (critChanceValue > 0 && critModifierValue > 0) {
      console.log(
        `=== Кінцева критична шкода(після Inspiration): ${critDamage} ===`,
      );
    }

    // ------------------- Захист або Резист -------------------

    const defOptionSelected = document.getElementById('def-option').checked;
    const resOptionSelected = document.getElementById('res-option').checked;
    const nothingOptionSelected =
      document.getElementById('nothing-option').checked;

    const defenseValue = parseFloat(defenseInput.value) || 0;
    const resistValue = parseFloat(magicResistInput.value) || 0;

    let finalDamage = finalStandartDamage;
    let finalCritDamage = critDamage;

    if (defOptionSelected) {
      finalDamage -= defenseValue; // Віднімаємо захист
      console.log(
        `Захист враховано, віднято: ${defenseValue}, Нова шкода: ${finalDamage}`,
      );
      if (isCrit) {
        finalCritDamage -= defenseValue;
        console.log(
          `Захист враховано, віднято для криту: ${defenseValue}, Нова критична шкода: ${finalCritDamage}`,
        );
      }
    } else if (resOptionSelected) {
      finalDamage *= 1 - resistValue / 100; // Множимо на резист
      console.log(
        `Резист враховано, множимо на: (1 - ${resistValue} / 100), Нова шкода: ${finalDamage}`,
      );
      if (isCrit) {
        finalCritDamage *= 1 - resistValue / 100;
        console.log(
          `Резист враховано, множимо на: (1 - ${resistValue} / 100), Нова шкода: ${finalCritDamage}`,
        );
      }
    } else if (nothingOptionSelected) {
      console.log(
        'Нічого не змінюється (немає вибору для захисту або резисту)',
      );
    }

    // Якщо пошкодження менше 5% фінальної шкоди, встановлюємо його на 5%
    if (finalDamage < finalStandartDamage * 0.05) {
      finalDamage = finalStandartDamage * 0.05;
      console.log(
        `Шкода менше 5% від початкової, встановлено на 5%: ${finalDamage}`,
      );
    }
    if (isCrit) {
      if (finalCritDamage < critDamage * 0.05 && isCrit) {
        finalCritDamage = critDamage * 0.05;
        console.log(
          `Шкода критична менше 5% від початкової, встановлено на 5%: ${finalCritDamage}`,
        );
      }
    }
    // Виводимо остаточну шкоду
    console.log(`=== Остаточна шкода: ${finalDamage} ===`);
    if (isCrit) {
      console.log(`=== Остаточна критична шкода: ${finalCritDamage} ===`);
    }

    // ------------------- Абсолютний Резист -------------------

    // Враховуємо абсолютний резист
    const absoluteResistValue =
      parseFloat(document.getElementById('resist-input').value) || 0;
    console.log(absoluteResistValue);
    if (absoluteResistValue > 0) {
      finalDamage *= 1 - absoluteResistValue / 100; // Множимо на резист
      console.log(
        `Абсолютний резист враховано, множимо на: (1 - ${absoluteResistValue} / 100), Нова шкода: ${finalDamage}`,
      );
      if (isCrit) {
        finalCritDamage *= 1 - absoluteResistValue / 100;
        console.log(
          `Абсолютний резист враховано, множимо на: (1 - ${absoluteResistValue} / 100), Нова шкода: ${finalCritDamage}`,
        );
      }
    } else {
      console.log(`Абсолютний резіст відсутній`);
    }
    console.log(`=== Остаточна шкода: ${finalDamage} ===`);
    if (isCrit) {
      console.log(`=== Остаточна критична шкода: ${finalCritDamage} ===`);
    }

    // ------------------- Вразливість -------------------

    const vulnerabilityValue =
      parseFloat(document.getElementById('vulnerability-input').value) || 0;
    const vulnerabilityType = document.querySelector(
      'input[name="vulnerability-type"]:checked',
    ).value; // Відсоток чи значення

    if (vulnerabilityValue > 0) {
      if (vulnerabilityType === 'percent') {
        finalDamage *= 1 + vulnerabilityValue / 100; // Якщо відсоток
        console.log(
          `Вразливість враховано (Відсоток): ${vulnerabilityValue}%, Нова шкода: ${finalDamage}`,
        );
        if (isCrit) {
          finalCritDamage *= 1 + vulnerabilityValue / 100; // Якщо крит
          console.log(
            `Вразливість враховано для криту (Відсоток): ${vulnerabilityValue}%, Нова критична шкода: ${finalCritDamage}`,
          );
        }
      } else if (vulnerabilityType === 'value') {
        finalDamage += vulnerabilityValue; // Якщо числове значення
        console.log(
          `Вразливість враховано (Числове значення): ${vulnerabilityValue}, Нова шкода: ${finalDamage}`,
        );
        if (isCrit) {
          finalCritDamage += vulnerabilityValue; // Якщо крит
          console.log(
            `Вразливість враховано для криту (Числове значення): ${vulnerabilityValue}, Нова критична шкода: ${finalCritDamage}`,
          );
        }
      }
    } else {
      console.log(`Немає ефекту вразливості у ворога`);
    }

    // Виводимо остаточну шкоду
    console.log(`=== Остаточна шкода: ${finalDamage} ===`);
    if (isCrit) {
      console.log(`=== Остаточна критична шкода: ${finalCritDamage} ===`);
    }

    // ------------------- ASPD -------------------

    // Отримуємо значення ASPD
    let aspdValue =
      parseFloat(document.getElementById('aspd-label').textContent) || 0;
    console.log(`ASPD початкове значення: ${aspdValue}`);

    // Додаємо або віднімаємо Interval Attack
    const talentIntervalValue =
      parseFloat(document.getElementById('talent-interval-input').value) || 0;
    aspdValue += talentIntervalValue;
    console.log(
      `Додано / Віднято Interval Attack: ${talentIntervalValue}, Нова ASPD: ${aspdValue}`,
    );

    // Коригуємо ASPD з врахуванням Talent ASPD
    const talentAspdValue =
      parseFloat(document.getElementById('talent-aspd-input').value) || 0;
    aspdValue = aspdValue / (1 + talentAspdValue / 100);
    console.log(
      `Коригування ASPD з Talent ASPD: ${talentAspdValue}%, Нова ASPD: ${aspdValue}`,
    );
    if (aspdValue < 0.05) {
      aspdValue = 0.06;
    }
    //Виводимо ASPD
    console.log(`=== Остаточне значення ASPD: ${aspdValue} ===`);

    // ------------------- Середнє Пошкодження -------------------

    // Отримуємо HP ворога
    const enemyHp = parseFloat(document.getElementById('hp-input').value) || 0;
    console.log(`HP ворога: ${enemyHp}`);

    // Обчислюємо середнє пошкодження
    const averageDamage =
      finalDamage * (1 - critChanceValue / 100) +
      (finalCritDamage * critChanceValue) / 100;
    console.log(`Середнє пошкодження: ${averageDamage}`);

    // Обчислюємо DPS
    const dpsStandard = finalDamage / aspdValue;
    const dpsCrit = finalCritDamage / aspdValue;
    const dpsAverage = averageDamage / aspdValue;
    console.log(`DPS стандартне: ${dpsStandard}`);
    console.log(`DPS критичне: ${dpsCrit}`);
    console.log(`DPS середнє: ${dpsAverage}`);

    // Виводимо значення на сторінку
    document.getElementById('dps-standard').textContent =
      dpsStandard.toFixed(2);
    document.getElementById('damage-standard').textContent =
      finalDamage.toFixed(2);
    document.getElementById('percent-standard').textContent =
      ((finalDamage / enemyHp) * 100).toFixed(2) + '%';
    if (isCrit) {
      document.getElementById('dps-crit').textContent = dpsCrit.toFixed(2);
      document.getElementById('damage-crit').textContent =
        finalCritDamage.toFixed(2);
      document.getElementById('percent-crit').textContent =
        ((finalCritDamage / enemyHp) * 100).toFixed(2) + '%';
      document.getElementById('dps-average').textContent =
        dpsAverage.toFixed(2);
      document.getElementById('damage-average').textContent =
        averageDamage.toFixed(2);
      document.getElementById('percent-average').textContent =
        ((averageDamage / enemyHp) * 100).toFixed(2) + '%';
    } else {
      document.getElementById('dps-crit').textContent = ' ';
      document.getElementById('damage-crit').textContent = ' ';
      document.getElementById('percent-crit').textContent = ' ';
      document.getElementById('dps-average').textContent = ' ';
      document.getElementById('damage-average').textContent = ' ';
      document.getElementById('percent-average').textContent = ' ';
    }
  }

  // Вмикаємо та вимикаємо ворога
  enemySelect.addEventListener('change', updateEnemyFields);

  // Кнопка для розрахунку
  calculateBtn.addEventListener('click', calculateDamage);

  // Оновлюємо поля при завантаженні
  toggleFields();
});
