/*

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

  // Маршрут для отримання оператора за id
  app.get('/operator/:id', (req, res) => {
    const { id } = req.params;
    const sql =
      'SELECT id, name, trait, Attack, Pot_Attack, Trust_Attack, Aspd FROM operator WHERE id = ?';

    db.query(sql, [id], (err, results) => {
      if (err) {
        console.error('Помилка отримання даних з бази:', err.message);
        return res.status(500).send('Помилка сервера');
      }

      if (results.length === 0) {
        return res.status(404).send('Оператор не знайдений');
      }

      res.json(results[0]); // Повертаємо тільки один запис
    });
  });

  // Отримання списку операторів
  app.get('/getOperators', (req, res) => {
    const sql = 'SELECT id, name FROM operator';
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Помилка отримання операторів:', err.message);
        res.status(500).send('Помилка сервера');
        return;
      }
      res.json(results);
    });
  });

  // Отримання талантів оператора
  app.get('/operator/:id/talents', (req, res) => {
    const operatorId = req.params.id;
    const sql = 'SELECT id, name, description FROM Talents WHERE id_operator = ?';
    db.query(sql, [operatorId], (err, results) => {
      if (err) {
        console.error('Помилка отримання талантів:', err.message);
        res.status(500).send('Помилка сервера');
        return;
      }
      res.json(results);
    });
  });

  // Отримання навичок оператора
  app.get('/operator/:id/skills', (req, res) => {
    const operatorId = req.params.id;
    const sql = 'SELECT id, name, description FROM Skills WHERE id_operator = ?';
    db.query(sql, [operatorId], (err, results) => {
      if (err) {
        console.error('Помилка отримання навичок:', err.message);
        res.status(500).send('Помилка сервера');
        return;
      }
      res.json(results);
    });
  });

  // Маршрут для отримання ворогів
  app.get('/enemies', (req, res) => {
    const sql = 'SELECT id, name FROM enemies'; // Вибираємо id та name для всіх ворогів
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Помилка отримання даних з бази:', err.message);
        return res.status(500).send('Помилка сервера');
      }
      res.json(results); // Повертаємо JSON з результатами
    });
  });

  // Маршрут для отримання ворога за id
  app.get('/enemy/:id', (req, res) => {
    const { id } = req.params;
    const sql =
      'SELECT name, Defense, res, Resist, MaxHp FROM enemies WHERE id = ?'; // Вибираємо потрібні поля

    db.query(sql, [id], (err, results) => {
      if (err) {
        console.error('Помилка отримання даних з бази:', err.message);
        return res.status(500).send('Помилка сервера');
      }

      if (results.length === 0) {
        return res.status(404).send('Ворог не знайдений');
      }

      res.json(results[0]); // Повертаємо тільки один запис
    });
  });

  // Запуск сервера
  app.listen(port, () => {
    console.log(`Сервер працює на http://localhost:${port}`);
  });
*/

const express = require('express');
const path = require('path');
const operatorController = require('./controllers/operatorController.js');
const enemyController = require('./controllers/enemyController');

const app = express();
const port = 3000;

// Вказуємо Express, де шукати статичні файли
app.use(express.static(path.join(__dirname, 'public')));

app.use('/services', express.static(path.join(__dirname, 'services')));
console.log('Services directory:', path.join(__dirname, 'services'));

// Віддача index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Роутинг для операторів
app.get('/operators', operatorController.getOperators);
app.get('/operator/:id', operatorController.getOperatorById);
app.get('/operator/:id/talents', operatorController.getTalents);
app.get('/operator/:id/skills', operatorController.getSkills);

// Роутинг для ворогів
app.get('/enemies', enemyController.getEnemies);
app.get('/enemy/:id', enemyController.getEnemyById);

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер працює на http://localhost:${port}`);
});
