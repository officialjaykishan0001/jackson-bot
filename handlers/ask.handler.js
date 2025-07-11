const askAI = require("../services/ai.service");

module.exports = async function askHandler(bot, msg, match) {
  const chatId = msg.chat.id;

  if (!match[1]) {
    return bot.sendMessage(
      msg.chat.id,
      "❗ Please provide a question after `/ask`."
    );
  }
  
  const question = match[1];

  await bot.sendChatAction(chatId, "typing");
  bot.sendMessage(chatId, "Thinking.");
  const answer = await askAI(question);
  bot.sendMessage(chatId, answer, { parse_mode: "Markdown" });
};
