document.addEventListener('DOMContentLoaded', () => {
  const operatorSelect = document.getElementById('operator-select');
  const talentSelect = document.getElementById('talent-select');
  const talentDescription = document.getElementById('talent-description');
  const skillSelect = document.getElementById('skill-select');
  const skillDescription = document.getElementById('skill-description');

  // Поля для відображення характеристик оператора
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

  // При виборі оператора
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
            option.dataset.description = talent.description;
            talentSelect.appendChild(option);
          });
        });

      // Завантаження навичок
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
      // Скинути всі поля, якщо оператор не вибраний
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

  // Показати опис таланту
  talentSelect.addEventListener('change', () => {
    const selectedOption = talentSelect.options[talentSelect.selectedIndex];
    if (selectedOption && selectedOption.dataset.description) {
      talentDescription.textContent = selectedOption.dataset.description;
    } else {
      talentDescription.textContent = 'Опис таланту буде тут';
    }
  });

  // Показати опис навички
  skillSelect.addEventListener('change', () => {
    const selectedOption = skillSelect.options[skillSelect.selectedIndex];
    if (selectedOption && selectedOption.dataset.description) {
      skillDescription.textContent = selectedOption.dataset.description;
    } else {
      skillDescription.textContent = 'Опис навички буде тут';
    }
  });
});
