const express = require('express');
const router = express.Router();

//Login page
router.get('/login', (req,res) => res.render("login"));

//Signup page
router.get('/signup', (req,res) => res.render("signup"));

module.exports = router;