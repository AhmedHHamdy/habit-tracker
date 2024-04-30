const express = require("express")
const app = express()
const logger = require("morgan")
const connectDB = require("./config/database")
const passport = require("passport")
const session = require("express-session")
const MongoStore = require("connect-mongo")

require("dotenv").config("./config/.env")

require("./config/passport")(passport)

app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(logger("dev"))

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_STRING })
  })
)

app.use(passport.initialize())
app.use(passport.session())

const PORT = 2121

connectDB().then(() => app.listen(PORT, () => {
  console.log("Server is running, you better catch it")
}))









