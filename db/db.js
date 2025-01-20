// db.js
const mysql = require('mysql2/promise');

// Підключення до бази даних
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '6146320277454',
  database: 'odc-database',
});

// Функція для виконання запитів
const getData = async (sql, params = []) => {
  try {
    const [results] = await db.execute(sql, params);
    return results;
  } catch (err) {
    throw new Error(err.message);
  }
};

// Експортуємо функцію для запитів до бази даних
module.exports = { getData };
