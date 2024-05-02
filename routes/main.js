const express = require("express")
const router = express.Router()
const homeController = require("../controllers/home")
// const authController = require("../controllers/auth")
const { ensureGuest } = require("../middleware/auth")

// routes

router.get("/", ensureGuest, homeController.getIndex)

module.exports = router