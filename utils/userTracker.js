const User = require("../models/user.model");

async function saveUserIfNew(user) {
  try {
    const existing = await User.findOne({ telegramId: user.id });

    if (!existing) {
      await User.create({
        telegramId: user.id,
        username: user.username || "",
        firstName: user.first_name || "",
        lastName: user.last_name || "",
        languageCode: user.language_code || "",
      });
      console.log(`✅ New user added: ${user.username || user.first_name}`);
    }
  } catch (err) {
    console.error("❌ Error saving user:", err.message);
  }
}

async function getUserCount() {
  return await User.countDocuments();
}

module.exports = {
  saveUserIfNew,
  getUserCount,
};
