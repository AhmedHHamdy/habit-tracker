const mongoose = require("mongoose")

const HabitDetail = new mongoose.Schema({
  name: {
    type: String
  },
  date: {
    type: String
  },
  completed: {
    type: Boolean
  },
  habitId: {
    type: String,
  }
})

module.exports = mongoose.model("HabitDetail", HabitDetail)