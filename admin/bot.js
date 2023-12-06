const { Telegraf } = require('telegraf');
const bot = new Telegraf('');

// Обработчик команды /start
bot.start((ctx) => ctx.reply('Привет! Я твой Telegram-бот.'));

// Обработчик текстовых сообщений
bot.on('text', (ctx) => {
  // Вывод текста из сообщения
  const text = ctx.message.text;
  // Отправка ответа
  ctx.reply(`Ты написал: ${text}`);
});

// Запуск бота
bot.launch();
