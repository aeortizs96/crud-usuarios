var express = require('express');
var router = express.Router();
const librosController= require("../controllers/usuariosController");


/* GET home page. */
router.get('/',function(req,res,next){
  res.send("Bienvenido al CRUD");
});

module.exports = router;
