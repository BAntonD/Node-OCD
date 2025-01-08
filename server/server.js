const express = require('express');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const port = 3000;

// Підключення до бази даних
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '6146320277454',
  database: 'odc-database',
});

// Перевірка підключення
db.connect((err) => {
  if (err) {
    console.error('Помилка підключення до бази даних:', err.message);
    return;
  }
  console.log('Підключено до бази даних!');
});

// Додаємо статичні файли
app.use(express.static(path.join(__dirname, '../public')));

// Головна сторінка
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Маршрут для отримання операторів
app.get('/operators', (req, res) => {
  const sql = 'SELECT id, name FROM operator'; // Вибираємо id та name
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Помилка отримання даних з бази:', err.message);
      res.status(500).send('Помилка сервера');
      return;
    }
    res.json(results); // Повертаємо JSON з результатами
  });
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер працює на http://localhost:${port}`);
});
