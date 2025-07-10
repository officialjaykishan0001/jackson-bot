require("dotenv").config({});
const TelegramBot = require("node-telegram-bot-api");
const askHandler = require("./handlers/ask.handler");
const helpHandler = require("./handlers/help.handler");
const aboutHandler = require("./handlers/about.handler");

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    `👋 Hello! I'm Jackson, here to answer anything you ask.\nType /ask followed by your question to get started.`
  );
});

bot.onText(/\/about/, (msg) => aboutHandler(bot, msg));

bot.onText(/\/help/, (msg) => helpHandler(bot, msg));

bot.onText(/\/ask (.+)/, (msg, match) => askHandler(bot, msg, match));

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (
    text.startsWith("/ask") ||
    text.startsWith("/start") ||
    text.startsWith("/help") ||
    text.startsWith('/about')
  )
    return;


  bot.sendMessage(
    chatId,
    "Opps, I didn't understand that.You can use:\n /help – To see available commands ):"
  );
});
module.exports = bot;
