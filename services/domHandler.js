// domHandler.js

import {
  //calculateDPS,
  calculateTotalDamage,
  updateEnemyStats,
} from './damageCalculator';

// Функція для оновлення полів вводу
function toggleFields(selectedOption) {
  const damageFields = document.querySelectorAll('.damage-fields');
  const defenseFields = document.querySelectorAll('.defense-fields');
  const talentFields = document.querySelectorAll('.talent-fields');

  // Вимикаємо всі поля за замовчуванням
  damageFields.forEach((field) => (field.disabled = true));
  defenseFields.forEach((field) => (field.disabled = true));
  talentFields.forEach((field) => (field.disabled = true));

  // Вмикаємо поля залежно від вибору
  if (selectedOption === 'damage') {
    damageFields.forEach((field) => (field.disabled = false));
  } else if (selectedOption === 'defense') {
    defenseFields.forEach((field) => (field.disabled = false));
  } else if (selectedOption === 'talents') {
    talentFields.forEach((field) => (field.disabled = false));
  }
}

// Обробник зміни вибору ворога
function onEnemyChange(event, enemies) {
  const enemyId = event.target.value;
  const enemy = updateEnemyStats(enemyId, enemies);

  if (enemy) {
    document.getElementById('enemyHP').textContent = enemy.hp;
    document.getElementById('enemyDefense').textContent = enemy.defense;
    document.getElementById('enemyResist').textContent = enemy.resist;
  }
}

// Обробник зміни характеристик персонажа
function onCharacterChange(event, characterStats, enemies, modifiers) {
  const totalDamage = calculateTotalDamage(characterStats, enemies, modifiers);
  document.getElementById('totalDamage').textContent = totalDamage.toFixed(2);
}

// Функція для відображення результатів розрахунку
function displayDamageResults(damage) {
  document.getElementById('damageResult').textContent =
    `Шкода: ${damage.toFixed(2)}`;
}

// Оновлення навичок та талантів
function updateTalentDescription(talentId, talents) {
  const talent = talents.find((t) => t.id === talentId);
  document.getElementById('talentDescription').textContent = talent
    ? talent.description
    : 'Опис відсутній';
}

export {
  toggleFields,
  onEnemyChange,
  onCharacterChange,
  displayDamageResults,
  updateTalentDescription,
};
