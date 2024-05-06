const Habit = require("../models/Habit")

module.exports = {
  postHabit: async (req, res) => {
    const habit = new Habit({
      name: req.body.name,
      date: "2024-05-07",
      userId: req.user.id
    })

    try {
      await habit.save()
      res.redirect("/dashboard")
    } catch (err) {
      console.log(err)
      req.flash("errors", { msg: "Error has occurred" })
    }
  },


  getHabit: async (req, res) => {
    const habitID = req.params.id
    console.log(habitID)

    try {
      const habitDetails = await Habit.find({ _id: habitID })
      console.log(habitDetails)
      return res.render("habit.ejs", { user: req.user, habit: habitDetails})
    } catch (err) {
      console.log(err)
      return res.status(500).send("Internal Server Error")
    }
  }
}