const TelegramApiBot = require("node-telegram-bot-api");
const config = require("./botConfig");

const token = config.token;

const bot = new TelegramApiBot(token, { polling: true });

bot.setMyCommands([
  { command: "/info", description: "Информация о сайте" },
  { command: "/communication", description: "Связь с администрацией" },
  { command: "/function", description: "Функции бота" },
  { command: "/menu", description: "Меню бота" },
]);

const start = () => {
  bot.on("message", async (msg, match) => {
    const text = msg.text;
    const chatId = msg.chat.id;
    if (text === "/start") {
      return bot.sendMessage(
        `${chatId}`,
        `Привет, ${msg.from.first_name}, Вы запустили бота сайта Language Learner` +
          ` ,что бы запустить меню: введите /menu`
      );
    } else if (text === "/info" || text === "Информация о сайте") {
      bot.sendMessage(
        `${chatId}`,
        "Сайт Language Learner создан для изучения иностранных языков." +
          " Зарегистрируйтесь, добавьте интересующие вас слова и практикуйтесь" +
          " Что бы ознакомится с исходным кодом проекта, перейдите на GitHub проекта" +
          " - https://github.com/97Dmitry/language_learner_site"
      );
    } else if (text === "/communication" || text === "Связь с администрацией") {
      return bot.sendMessage(
        `${chatId}`,
        "Для связи используйте https://t.me/PM_White"
      );
    } else if (text === "/menu") {
      return bot.sendMessage(`${chatId}`, "Menu", {
        reply_markup: {
          keyboard: [
            [
              {
                text: "Связь с администрацией",
              },
              {
                text: "Информация о сайте",
              },
            ],
            [
              {
                text: "Закрыть клавиатуру",
              },
            ],
          ],
        },
      });
    } else if (text === "Закрыть клавиатуру") {
      bot.sendMessage(`${chatId}`, "Закрываю", {
        reply_markup: {
          remove_keyboard: true,
        },
      });
    } else if (text === "/function") {
      return bot.sendMessage(`${chatId}`, "Inline keyboard", {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Купить товар",
                callback_data: "Что бы что-то купить...",
              },
            ],
            [
              {
                text: "Продать свой товар",
                callback_data: "Что бы разместить свой товар...",
              },
            ],
          ],
        },
      });
    } else {
      await bot.sendMessage(`${chatId}`, "Таких слов я не понимаю(");
      await bot.sendSticker(
        `${chatId}`,
        "CAACAgUAAxkBAAECFAABYFSW6VKZFVl2VOCgZmk_v7MK3AcAAngBAAIeQaUI9QcDyQvOvfMeBA"
      );
      return bot.sendMessage(
        `${chatId}`,
        "Вы можете узнать список доступных команд, написав /function"
      );
    }
  });
  bot.on("callback_query", (query) => {
    bot.sendMessage(`${query.message.chat.id}`, query.data);
  });
};

start();
