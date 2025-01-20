// enemyRepository.js
const db = require('../db/db');

// Отримання всіх ворогів
const getAllEnemies = async () => {
  const sql = 'SELECT id, name FROM enemies';
  return await db.getData(sql);
};

// Отримання ворога за id
const getEnemyById = async (id) => {
  const sql =
    'SELECT name, Defense, res, Resist, MaxHp FROM enemies WHERE id = ?';
  const results = await db.getData(sql, [id]);
  return results.length ? results[0] : null;
};

module.exports = {
  getAllEnemies,
  getEnemyById,
};
