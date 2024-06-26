const express = require("express")
const router = express.Router()
const habitController = require("../controllers/habit")
const { ensureAuth } = require("../middleware/auth")

router.get("/:id", ensureAuth, habitController.getHabit)
router.post("/addHabit", habitController.postHabit)
router.post("/commitDay", habitController.postDay)

module.exports = router