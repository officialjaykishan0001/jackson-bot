module.exports = function helpHandler(bot, msg) {
  const chatId = msg.chat.id;

  const helpMessage = `
👋 *Welcome to Jackson Bot!*  
I'm your friendly AI assistant here to answer your questions in *any language* you speak!

🧠 *Commands you can use:*

/start – Basic welcome intro.
/ask <your question> – I’ll answer anything you ask!  
/about - Information about bot.
/help – Show this help message again.  


🌍 I reply in the language you ask — just start typing!

Feel free to try me out. I’m always here. 🤖
`;

  bot.sendMessage(chatId, helpMessage, { parse_mode: "Markdown" });
};
