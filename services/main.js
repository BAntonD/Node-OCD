// main.js

import {
  toggleFields,
  onEnemyChange,
  onCharacterChange,
  //displayDamageResults,
  updateTalentDescription,
} from './domHandler';
import {} from //calculateDamage,
//updateEnemyStats,
//calculateDPS,
//calculateTotalDamage,
'./damageCalculator';

const enemies = [
  { id: 'enemy1', name: 'Ворог 1', defense: 30, resist: 20, hp: 100 },
  { id: 'enemy2', name: 'Ворог 2', defense: 40, resist: 25, hp: 150 },
  // додаємо інші вороги
];

const talents = [
  { id: 'talent1', name: 'Талант 1', description: 'Опис таланту 1' },
  { id: 'talent2', name: 'Талант 2', description: 'Опис таланту 2' },
  // додаємо інші таланти
];

const modifiers = {
  critChance: 0.2,
  critMultiplier: 2,
  inspirationActive: true,
  inspirationMultiplier: 1.1,
};

const characterStats = {
  attack: 50,
  attackSpeed: 1.5,
  defense: 30,
};

// Встановлюємо обробники подій
document
  .getElementById('enemySelect')
  .addEventListener('change', (e) => onEnemyChange(e, enemies));
document
  .getElementById('characterStatsForm')
  .addEventListener('input', (e) =>
    onCharacterChange(e, characterStats, enemies, modifiers),
  );
document
  .getElementById('talentSelect')
  .addEventListener('change', (e) =>
    updateTalentDescription(e.target.value, talents),
  );
document
  .getElementById('damageTypeSelect')
  .addEventListener('change', (e) => toggleFields(e.target.value));

// Ініціалізуємо сторінку
toggleFields('damage'); // Початкове значення
