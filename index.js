const express = require('express');
const path = require('path');
const app = express();

// Налаштування статичних файлів
app.use(express.static(path.join(__dirname, 'public')));

// Рендеринг сторінки
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Запуск сервера
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущено на http://localhost:${PORT}`);
});
