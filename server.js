const express = require("express");
const passport = require("passport")
const app = express();
const session = require("express-session")
const MongoStore = require("connect-mongo")
const connectDB = require("./config/database")
const logger = require("morgan")
const mainRoutes = require("./routes/main")

const PORT = 2121

require("dotenv").config({ path: "./config/.env"})

require("./config/passport")(passport)

app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logger("dev"))

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_STRING})
  })
)

app.use(passport.initialize())
app.use(passport.session())

app.use("/", mainRoutes)

connectDB().then(() => app.listen(PORT, () => {
  console.log("Server is running, you better catch it")
}))









