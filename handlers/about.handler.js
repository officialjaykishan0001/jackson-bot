module.exports = function aboutHandler(bot, msg) {
  const chatId = msg.chat.id;

  const aboutMessage = `
About jackson_bot

Hi there! I'm jackson_bot — your friendly AI assistant. I can answer questions in any language you ask! 🌍💬

However... I don’t have real-time access to news or current affairs. That means I might not know the latest cricket score 🏏, political update 🏛️, or this morning's viral trend 😅.
Because this bot uses DeepSeek V3 0324 model.

🛠️ Built by: Jackson (@infinityio)  

🔧 Found a bug?  
Message my creator on Telegram 👉 @infinityio

Thanks for using jackson_bot! 🚀✨
  `;

  bot.sendMessage(chatId, aboutMessage); // no parse_mode = safe
};
