const mongoose = require("mongoose")

const HabitSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  date: {
    type: String
  },
  userId: {
    type: String,
    unique: true
  }
})

module.exports = mongoose.model("Habit", HabitSchema) 