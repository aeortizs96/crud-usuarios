var express = require('express');
var router = express.Router();
const usuariosController= require("../controllers/usuariosController");

var multer = require('multer');
var fecha = Date.now();

var rutaAlmacen = multer.diskStorage(
    {
    destination:function(request,file,callback){
        callback(null,'./public/images');
    },
    filename:function(request,file,callback){
        console.log(file);
        callback(null,fecha+"_"+file.originalname);
    }

}
);

var cargar= multer({ storage:rutaAlmacen});

/* GET home page. */
router.get('/',usuariosController.index);
router.get('/crear',usuariosController.crear);

router.post("/",cargar.single("archivo"),usuariosController.guardar);
router.post('/eliminar/:id',usuariosController.eliminar);
router.get('/editar/:id',usuariosController.editar);
router.post("/actualizar",cargar.single("archivo"),usuariosController.actualizar);

module.exports = router;

