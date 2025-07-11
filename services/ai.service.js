const { SYSTEM_PROMPT } = require('../config/persona');

async function askAI(question) {
  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.DEEP_SEEK_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-chat-v3-0324:free",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: question },
        ],
      }),
    });

    const data = await res.json();
    console.log(data)
    return data.choices[0].message.content.trim();
  } catch (err) {
    console.error("AI Error:", err.message);
    return "Oops! I've hit my request limit for now. Please try again after sometime."
  }
}

module.exports = askAI;
