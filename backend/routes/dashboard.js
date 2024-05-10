const express = require('express');
const router = express.Router();

const PasswordManager = require("./binding.js");
var passwordManager = new PasswordManager("123");

/* GET home page. */
router.get('/', function(req, res, next) {

  const fetch = require('node-fetch');

  let url = "http://localhost:3000/dashboard/data";

  let settings = { method: "Get" };
  
  fetch(url, settings)
      .then(res => res.json())
      .then((json) => {
        res.render('dashboard', {title: 'Dashboard', json:json});
      });
});

router.get('/data', function(req, res, next) {

  passwordManager.insertPassword("123");
  passwordManager.insertSite("bunler.com");
  passwordManager.insertPassword("12dd3");
  passwordManager.insertSite("bunldder.com");
  passwordManager.insertPassword("12dd3");
  passwordManager.insertSite("bunldder.com");

  let jsonFile = passwordManager.exportToString();
  res.json(jsonFile);
});

router.post('/', function(req, res, next) {
    try {

      passwordManager.insertSite(req.body.website);
      passwordManager.insertPassword(req.body.password);

      passwordManager.exportJson();
      let jsonFile = require('../data/passwords.json');
      res.render('dashboard', { title: 'Dashboard', data: jsonFile });

    } catch (error) {
      res.status(500).json({ message: "Something went wrong"});
    }
});

module.exports = router;