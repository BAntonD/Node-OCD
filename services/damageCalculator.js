// damageCalculator.js

// Функція для обчислення шкоди (DPS)
function calculateDamage(baseAttack, enemyDefense, modifiers) {
  let damage = baseAttack - enemyDefense; // Базовий розрахунок пошкоджень

  // Врахування модифікаторів
  if (modifiers.critChance > Math.random()) {
    damage *= modifiers.critMultiplier;
  }
  if (modifiers.inspirationActive) {
    damage *= modifiers.inspirationMultiplier;
  }

  return damage;
}

// Функція для обробки вибору ворога
function updateEnemyStats(enemyId, enemies) {
  const enemy = enemies.find((e) => e.id === enemyId);
  return enemy ? enemy : null; // Повертаємо знайденого ворога або null
}

// Обчислення DPS для персонажа
function calculateDPS(characterStats, enemy, modifiers) {
  const baseDamage = calculateDamage(
    characterStats.attack,
    enemy.defense,
    modifiers,
  );
  return baseDamage * characterStats.attackSpeed; // DPS = Шкода * швидкість атаки
}

// Обчислення загальної шкоди для всіх характеристик
function calculateTotalDamage(characterStats, enemies, modifiers) {
  let totalDamage = 0;
  enemies.forEach((enemy) => {
    totalDamage += calculateDPS(characterStats, enemy, modifiers);
  });
  return totalDamage;
}

export {
  calculateDamage,
  updateEnemyStats,
  calculateDPS,
  calculateTotalDamage,
};
