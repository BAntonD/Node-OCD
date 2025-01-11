document.addEventListener('DOMContentLoaded', () => {
  const operatorSelect = document.getElementById('operator-select');
  const talentSelect = document.getElementById('talent-select');
  const talentDescription = document.getElementById('talent-description');
  const skillSelect = document.getElementById('skill-select');
  const skillDescription = document.getElementById('skill-description');

  const trustLabel = document.getElementById('trust-label');
  const atkLabel = document.getElementById('atk-label');
  const potLabel = document.getElementById('pot-label');
  const traitLabel = document.getElementById('trait-label');

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

  operatorSelect.addEventListener('change', () => {
    const operatorId = operatorSelect.value;

    if (operatorId) {
      // Очищення полів талантів, навичок та їх описів
      talentSelect.innerHTML = '<option value="">Вибрати талант</option>';
      skillSelect.innerHTML = '<option value="">Вибрати навичку</option>';
      talentDescription.textContent = 'Опис таланту буде тут';
      skillDescription.textContent = 'Опис навички буде тут';

      // Завантаження характеристик оператора
      fetch(`/operator/${operatorId}`)
        .then((response) => response.json())
        .then((data) => {
          trustLabel.textContent = data.Trust_Attack;
          atkLabel.textContent = data.Attack;
          potLabel.textContent = data.Pot_Attack;
          traitLabel.textContent = data.trait;
        });

      // Завантаження талантів
      fetch(`/operator/${operatorId}/talents`)
        .then((response) => response.json())
        .then((data) => {
          data.forEach((talent) => {
            const option = document.createElement('option');
            option.value = talent.id;
            option.textContent = talent.name;
            talentSelect.appendChild(option);
          });
        });
    }
  });

  talentSelect.addEventListener('change', () => {
    const talentId = talentSelect.value;

    if (talentId) {
      // Завантаження опису таланту
      fetch(`/talent/${talentId}`)
        .then((response) => response.json())
        .then((data) => {
          talentDescription.textContent = data.description;
        });
    }
  });

  skillSelect.addEventListener('change', () => {
    const skillId = skillSelect.value;

    if (skillId) {
      // Завантаження опису навички
      fetch(`/skill/${skillId}`)
        .then((response) => response.json())
        .then((data) => {
          skillDescription.textContent = data.description;
        });
    }
  });

  // Обчислення пошкоджень
  document
    .getElementById('calculate-btn')
    .addEventListener('click', (event) => {
      event.preventDefault();

      const operatorId = operatorSelect.value;
      const talentId = talentSelect.value;
      const skillId = skillSelect.value;

      // Запит на сервер для обчислення результатів
      fetch(`/calculateDPS`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          operatorId,
          talentId,
          skillId,
          // Тут додатково додаємо інші параметри
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Виведення результатів
          document.getElementById('dps-standard').textContent =
            data.dpsStandard;
          document.getElementById('damage-standard').textContent =
            data.damageStandard;
          document.getElementById('percent-standard').textContent =
            data.percentStandard;

          document.getElementById('dps-crit').textContent = data.dpsCrit;
          document.getElementById('damage-crit').textContent = data.damageCrit;
          document.getElementById('percent-crit').textContent =
            data.percentCrit;

          document.getElementById('dps-average').textContent = data.dpsAverage;
          document.getElementById('damage-average').textContent =
            data.damageAverage;
          document.getElementById('percent-average').textContent =
            data.percentAverage;
        });
    });
});
