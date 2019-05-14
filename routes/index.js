var express = require('express');
var router = express.Router();
const axios = require("axios");
var methods = require('../controllers/userController.js')




var helpers = require('handlebars-helpers')();
const Handlebars = require("hbs");

Handlebars.registerHelper(helpers);



router.get('/', function(req, res, next) {
  res.render('index', { title: 'WAG', data2:methods.data.getAllData()});
});

router.post('/users/:id', function(req, res, next) {
  res.json(methods.data.getUserById(req.params.id));
});

router.post('/users/save/data', function(req, res, next) {
 res.json(methods.data.editUserById(req));
});

router.post('/users/mod/delete/:id', function(req, res, next) {
  res.json(methods.data.deleteUser(req.params.id));
});

router.post('/user/perfil/:id', function(req, res, next) {
  res.json(methods.data.getSkills(req.params.id));
});

module.exports = router;
