const mongoose = require("mongoose");

async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected.");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
  }
}

module.exports = connectToDB;
