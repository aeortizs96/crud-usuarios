var conexion=require('../config/conexion');
var usuario=require("../model/usuario");
var borrar= require("fs");

module.exports={

    index:function(req,res){

        usuario.obtener(conexion,function(err,datos){
            console.log(datos);
            //render: the rendering is for example when all the data already processed are string objects etc. they are embedded in the view that would be the designed page, making the content dynamic.
            res.render('usuarios/index', { title: 'Aplicacion',usuarios:datos });
        });

    
    },
    crear:function(req,res){
        res.render('usuarios/crear');
    },
    guardar:function(req,res){
        console.log(req.body);
        console.log(req.file.filename);
        usuario.insertar(conexion,req.body,req.file,function(err,datos){
             res.redirect('/usuarios');
            
        });
    },
    eliminar:function(req,res){
        console.log("Recepcion de datos");
        console.log(req.params.id);

        usuario.retornarDatosID(conexion,req.params.id,function(err,registros){
            var nombreImagen= "public/images/" +(registros[0].imagen);
            if(borrar.existsSync(nombreImagen)){
                borrar.unlinkSync(nombreImagen);
            }
            usuario.borrar(conexion,req.params.id,function(err){
                 res.redirect('/usuarios');

            });
            
        });

    },
    editar:function(req,res){
        usuario.retornarDatosID(conexion,req.params.id,function(err,registros){
            console.log(registros[0]);
            res.render('usuarios/editar',{usuario:registros[0]})
        });
    },
    actualizar:function name(req,res){
        console.log(req.body.nombre);


        if(req.file){
            if(req.file.filename){
                
                usuario.retornarDatosID(conexion,req.body.id,function(err,registros){
                    var nombreImagen= "public/images/" +(registros[0].imagen);
                    if(borrar.existsSync(nombreImagen)){
                        borrar.unlinkSync(nombreImagen);
                    }

                    usuario.actualizarArchivo(conexion,req.body,req.file,function(err){});
                                       
                });

            }
        }

        if(req.body.nombre){
            usuario.actualizar(conexion,req.body,function(err){ });
        }
        if(req.body.apellido){
            usuario.actualizar(conexion,req.body,function(err){ });
        }
        if(req.body.edad){
            usuario.actualizar(conexion,req.body,function(err){ });
        }
        if(req.body.correo){
            usuario.actualizar(conexion,req.body,function(err){ });
        }
        if(req.body.nacionalidad){
            usuario.actualizar(conexion,req.body,function(err){ });
        }
        if(req.body.ci){
            usuario.actualizar(conexion,req.body,function(err){ });
        }

          res.redirect('/usuarios');

    }

}