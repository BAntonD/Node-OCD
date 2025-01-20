// operatorController.js
const operatorRepository = require('../repositories/operatorRepository');

const getOperators = async (req, res) => {
  try {
    const operators = await operatorRepository.getAllOperators();
    res.json(operators);
  } catch (err) {
    console.error('Помилка при отриманні операторів:', err.message);
    res.status(500).send('Помилка сервера');
  }
};

const getOperatorById = async (req, res) => {
  const { id } = req.params;
  try {
    const operator = await operatorRepository.getOperatorById(id);
    if (!operator) {
      return res.status(404).send('Оператор не знайдений');
    }
    res.json(operator);
  } catch (err) {
    console.error('Помилка при отриманні оператора:', err.message);
    res.status(500).send('Помилка сервера');
  }
};

const getTalents = async (req, res) => {
  const operatorId = req.params.id;
  try {
    const talents = await operatorRepository.getOperatorTalents(operatorId);
    res.json(talents);
  } catch (err) {
    console.error('Помилка при отриманні талантів:', err.message);
    res.status(500).send('Помилка сервера');
  }
};

const getSkills = async (req, res) => {
  const operatorId = req.params.id;
  try {
    const skills = await operatorRepository.getOperatorSkills(operatorId);
    res.json(skills);
  } catch (err) {
    console.error('Помилка при отриманні навичок:', err.message);
    res.status(500).send('Помилка сервера');
  }
};

module.exports = { getOperators, getOperatorById, getTalents, getSkills };
