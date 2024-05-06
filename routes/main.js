const express = require("express")
const router = express.Router()
const homeController = require("../controllers/home")
const authController = require("../controllers/auth")
const { ensureGuest, ensureAuth } = require("../middleware/auth")

// routes

router.get("/", ensureGuest, homeController.getIndex)
router.get("/login", ensureGuest, authController.getLogin)
router.post("/login", authController.postLogin)
router.get("/signup", ensureGuest, authController.getSignup)
router.post("/signup", authController.postSignup)
router.get("/logout", authController.logout)
router.get("/dashboard", ensureAuth, authController.getDashboard)

module.exports = router