// enemyController.js
const enemyRepository = require('../repositories/enemyRepository');

const getEnemies = async (req, res) => {
  try {
    const enemies = await enemyRepository.getAllEnemies();
    res.json(enemies);
  } catch (err) {
    console.error('Помилка при отриманні ворогів:', err.message);
    res.status(500).send('Помилка сервера');
  }
};

const getEnemyById = async (req, res) => {
  const { id } = req.params;
  try {
    const enemy = await enemyRepository.getEnemyById(id);
    if (!enemy) {
      return res.status(404).send('Ворог не знайдений');
    }
    res.json(enemy);
  } catch (err) {
    console.error('Помилка при отриманні ворога:', err.message);
    res.status(500).send('Помилка сервера');
  }
};

module.exports = { getEnemies, getEnemyById };
