require("dotenv").config({});
const TelegramBot = require("node-telegram-bot-api");
const askHandler = require("./handlers/ask.handler");
const helpHandler = require("./handlers/help.handler");
const aboutHandler = require("./handlers/about.handler");
const { saveUserIfNew } = require("./utils/userTracker");
// _______________________________________________________________
// The express setup is just here to deploy the bot for free on render to avoid background worker (paid service).
const express = require("express");
const connectToDB = require("./config/db");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
// _____________________________________________________________________

connectToDB();

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const user = msg.from;

  await saveUserIfNew(user);

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
    text.startsWith("/about") ||
    text.startsWith("/users")
  )
    return;

  bot.sendMessage(
    chatId,
    "Opps, I didn't understand that.You can use:\n /help – To see available commands ):"
  );
});


bot.onText(/\/users/, async (msg) => {
  const ADMIN_ID = 6425499888;
  if (msg.from.id !== ADMIN_ID) {
    return bot.sendMessage(msg.chat.id, "❌ You're not authorized to use this command.");
  }

  const total = await getUserCount();
  bot.sendMessage(msg.chat.id, `👥 Total unique users: ${total}`);
});

