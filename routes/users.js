const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");

// User model
const User = require("../models/User");

//Login page
router.get("/login", (req, res) => res.render("login"));

//Signup page
router.get("/signup", (req, res) => res.render("signup"));

//Register handle
router.post("/signup", (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  //Form validation
  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please fill in all fields" });
  }

  //Check password
  if (password != password2) {
    errors.push({ msg: "Sorry, Password did not match" });
  }

  //Check password length
  if (password.length < 6) {
    errors.push({ msg: "Password should at least be 6 characters" });
  }

  if (errors.length > 0) {
    res.render("signup", {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    // Validation passed
    User.findOne({ email: email }).then((user) => {
      if (user) {
        // Check if user exists
        errors.push({ msg: "Email is already registered" });
        res.render("signup", {
          errors,
          name,
          email,
          password,
          password2,
        });
      } else {
        const newUser = new User({
          name,
          email,
          password,
        });

        // Hash password
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            //Set password to hashed
            newUser.password = hash;
            //Save user to db
            newUser
              .save()
              .then((user) => {
                req.flash(
                  "success_msg",
                  "Successfully registered continue to login"
                );
                res.redirect("/users/login");
              })
              .catch((err) => console.log(err));
          })
        );
      }
    });
  }
});

// Login handle
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
});

// Logout handle
router.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) throw err;

    req.flash("success_msg", "You are logged out.");
    res.redirect("/users/login");
  });
});

module.exports = router;
