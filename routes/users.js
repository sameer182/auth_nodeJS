const express = require('express');
const router = express.Router();

//Login page
router.get('/login', (req, res) => res.render("login"));

//Signup page
router.get('/signup', (req, res) => res.render("signup"));

//Register handle
router.post('/signup', (req, res) => {
  const {name, email, password, password2} = req.body;
  let errors = [];

  //Form validation
  if(!name || !email || !password || !password2) {
    errors.push({ msg: "Please fill in all fields"});
  }

  //Check password
  if(password != password2) {
    errors.push({ msg: "Sorry, Password did not match"});
  }

  //Check password length
  if(password.length < 6) {
    errors.push({ msg: "Password should at least be 6 characters"});
  }

  if(errors.length > 0) {
    res.render('signup', {
        errors, 
        name,
        email,
        password,
        password2
    });
  } else {
    res.send('pass');
  }

});

module.exports = router;