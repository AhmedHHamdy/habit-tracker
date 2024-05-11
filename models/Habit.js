const mongoose = require("mongoose")

const HabitSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  userId: {
    type: String,
  }
})

module.exports = mongoose.model("Habit", HabitSchema) 