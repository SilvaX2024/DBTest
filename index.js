const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const dotenv = require("dotenv");
const methodOverride = require("method-override");
const app = express();

dotenv.config();

//------------ Passport Configuration ------------//
require("./config/passport")(passport);

//------------ DB Configuration ------------//
const db = require("./config/key").MongoURI;
app.use(express.static("public"));
//------------ Mongo Connection ------------//
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((err) => console.log(err));
//------------ EJS Configuration ------------//
app.use(expressLayouts);
app.use("/assets", express.static("./assets"));
app.set("view engine", "ejs");

app.use(flash({ sessionKeyName: "flashMessage" }));
//------------ Bodyparser Configuration ------------//
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(express.json());
//------------ Express session Configuration ------------//
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

//------------ Passport Middlewares ------------//
app.use(passport.initialize());
app.use(passport.session());

//------------ Connecting flash ------------//
app.use(flash());

//------------ Global variables ------------//
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});
//------------ Routes ------------//
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
app.use("/crud", require("./routes/crud"));

const PORT = 3006;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("*", (req, res) => {
  res.status(404).render("404");
});
