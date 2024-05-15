const { MongoErrorLabel } = require("mongodb")
const Habit = require("../models/Habit")
const HabitDetail = require("../models/HabitDetail")

module.exports = {
  postHabit: async (req, res) => {
    const habit = new Habit({
      name: req.body.name,
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
      const habit = await Habit.find({ _id: habitID })
      const habitDetails = await HabitDetail.find({ habitId: habitID }).sort({date: 1}).lean()

      let streak = 0
      let largestStreak = 0

      for (let i = 0; i < habitDetails.length-1; i++) {
        const currentDate = new Date(habitDetails[i].date)
        const nexDate = new Date(habitDetails[i+1].date)

        const timeDifference = nexDate.getTime() - currentDate.getTime()
        const oneDay = 24 * 60 * 60 * 1000

        if (timeDifference <= oneDay && habitDetails[i].completed && habitDetails[i+1].completed) {
          streak++
          console.log(streak)
        } else {
          if (habitDetails[i].completed) {
            streak++
            largestStreak = Math.max(streak, largestStreak)
          }
          streak = 0;
        }


      }

      if (habitDetails.length > 0 && habitDetails[habitDetails.length - 1].completed) {
        streak++
        console.log(streak)
        largestStreak = Math.max(largestStreak, streak)

      }


      
      console.log("Largest streak based on consecutive dates:", largestStreak);

 

      // console.log(habitDetails)
      return res.render("habit.ejs", { user: req.user, habit: habit, habitId: habitID, habitDetails: habitDetails, largestStreak: largestStreak})
    } catch (err) {
      console.log(err)
      return res.status(500).send("Internal Server Error")
    }
  },


  postDay: async (req, res) => {


    try {
      const habit = await Habit.findById({ _id: req.body.id})

      // Find habit details by date and habitId
      const habitDetailData = await HabitDetail.findOne({ 
        date: req.body.date,
        habitId: req.body.id 
      });

      if (habitDetailData) {
        req.flash("errors", { msg: "Date is already been committed"})
        return res.redirect(`/habit/${req.body.id}`)
      }

      console.log(req.body)

      const habitDetail = new HabitDetail ({
        name: habit.name,
        date: req.body.date,
        habitId: req.body.id,
        completed: true
      })
  
      await habitDetail.save()
      res.redirect(`/habit/${req.body.id}`)
    } catch (err) {
      console.log(err)
      req.flash("errors", { msg: "Error has occurred" })
    }
  }
}