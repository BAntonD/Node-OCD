// operatorRepository.js
const db = require('../db/db');

// Отримання всіх операторів
const getAllOperators = async () => {
  const sql = 'SELECT id, name FROM operator';
  return await db.getData(sql);
};

// Отримання оператора за id
const getOperatorById = async (id) => {
  const sql =
    'SELECT id, name, trait, Attack, Pot_Attack, Trust_Attack, Aspd FROM operator WHERE id = ?';
  const results = await db.getData(sql, [id]);
  return results.length ? results[0] : null;
};

// Отримання талантів оператора
const getOperatorTalents = async (operatorId) => {
  const sql = 'SELECT id, name, description FROM Talents WHERE id_operator = ?';
  return await db.getData(sql, [operatorId]);
};

// Отримання навичок оператора
const getOperatorSkills = async (operatorId) => {
  const sql = 'SELECT id, name, description FROM Skills WHERE id_operator = ?';
  return await db.getData(sql, [operatorId]);
};

module.exports = {
  getAllOperators,
  getOperatorById,
  getOperatorTalents,
  getOperatorSkills,
};
