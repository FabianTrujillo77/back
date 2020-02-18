/*
se encargara de recibir los datos que el usuario envia desde la vista, procesandolos 
para enviarlos al modelos y que este los pueda corroborar con la BD para posteriormente 
guardarlos. Tambien tendra toda la logica de las consultas, actualizaciones y eliminaciones.
*/

const Usuario = require('../modelos/usuario'); // Importamos el modelo de usuario
const fs = require('fs'); // inportamos el modulo File System de Node
const path = require('path'); // importamos el Modulo Path de Node

// funcion registro de usuario
// req = peticion o request
// res = respuesta 0 response
function crearUsuario(req, res){
    // instaciar el objeto Usuario

    var usuario = new Usuario();
    
    // guardar el cuerpo de la peticion para mejor acceso a los datos que el usuario esta enviando
    // parametros = {"nombre": "", "apellido": "", "correo": "", "contraseña": ""}
    var parametros = req.body;

    // guardamos cada propiedad del json de la peticion en cada propiedad del modelo
    usuario.nombre = parametros.nombre;
    usuario.apellido = parametros.apellido;
    usuario.correo = parametros.correo;
    usuario.contraseña = parametros.contrasena;
    usuario.rol = 'usuario';
    usuario.imagen = null;

    // Guardar y validar los datos
    // db.coleccion.insert()
    usuario.save((err, usuarioNuevo)=>{
        if(err){
            // el primer error a validar  sera a nivel de servidor e infraestructura 500
            // para esto existen states o estados. 
            res.status(500).send({message: "Error en el servidor"});
        } else{
            if(!usuarioNuevo){
                // 404 = pagina no existe
                // 200 = ok pero con una alerta indicamos que hay datos 
                res.status(200).send({
                    message: "No fue posible realizar el registro" })
            }else{
                // 200 = ok
                res.status(200).send({usuario: usuarioNuevo});
            }
        }
    });
}


// Login de Usuario

function login(req,res){
    var parametros = req.body;
    var correoUsuario = parametro.correo;
    var contraUsuario = parametros.contraseña;

    // Buscamos al usuario a traves del correo. usaremos toLowerCase() para evitar problemas de datos

    usuario.findOne({correo: correoUsuario.toLowerCase()}, (err, usuarioLogueado)=>{
        if(err){
            res.status(500).send({message:"Error de servidor"});
        }else{
            if(!usuarioLogueado){
                res.status(200).send({message:"Nos has podido iniciar sesion. Verifica los datos"});
            }else{
                if(usuarioLogueado.contraseña != contraUsuario){
                    res.status(200).send({message:"Contraseña incorrecta"});
                }else{
                    res.status(200).send({usuairo: usuarioLogueado});
                }
            }
        }
    })
}


// Actualizar Usuario

function actualizarUsuario(req, res){


    var usuarioId = req.params.id;
    var nuevosDatosUsuario = req.body;

    Usuario.findByIdAndUpdate(usuarioId, nuevosDatosUsuario, (err, usuarioActualizado)=>{
        if(err){
            res.status(500).send({message: "Error en el servidor"});
        }else{
            if(!usuarioActualizado){
                res.status(200).send({message:"No fue posible actualizar los datos"});
            }else{
                res.status(200).send({usuario: usuarioActualizado})
            }
        }
    });

}

// subir img

function subirImg(req,res){
    var usuarioId= req.params.id;
    var nombreArchivo = "No ha subido ninguna imagen...";

    // validar si efectivamente esta enviando la imagen o el archivo
    if(req.files){
        // vamos a ir analizando la ruta del archivo, el nombre y la extencion
        var rutaArchivo = req.files.imagen.path;
        console.log(rutaArchivo);

        var partirArchivo = rutaArchivo.split('\\');
        console.log(partirArchivo);

        var nombreArchivo = partirArchivo[2];
        console.log(nombreArchivo);


        var extensionImg = nombreArchivo.split('\.');
        console.log(extensionImg);

        var extencionArchivo = extensionImg[1];
        console.log(extencionArchivo);

        // validar si el formato del archivo es aceptable
        if(extencionArchivo == "png" || extencionArchivo == "jpg" || extencionArchivo == "jpeg"){
            // actualizar del usuario, el campo imagen que inicialmente teniamos null
            Usuario.findByIdAndUpdate(usuarioId, {imagen: nombreArchivo}, (err, usuarioConImg)=> {
                if(err){
                    res.status(500).send({message: "Error en el servidor"});
                }else{
                    if(!usuarioConImg){
                        res.status(200).send({message:"No fue posible subir la imagen"})
                    }else{
                        res.status(200).send({imagen: nombreArchivo, usuario: usuarioConImg});
                    }
                }
            }); 
        }else{
            // formato invalido
            res.status(200).send({message:"Formato invalido!! No es una imagen"});
        }
        }else{
            // No existe una imagen para subir
            res.status(200).send({message:"No ha subido ninguna imagen"});
        }

    }

// Mostrar Archivo

function mostrarArchivo(req, res){
    // pedir el archivo que queramos mostrar
    var archivo = req.params.imageFile;
    // verificamos la carpeta para encontrar el archivo
    var ruta = './archivos/usuarios/'+archivo;

    //validar si existe la imagen
    // fs.exists ('el archivo a verificar', (existe o no))
    fs.exists(ruta, (exists)=>{
        if(exists){
            res.sendFile(path.resolve(ruta));
        }else{
            res.status(200).send({message:"Imagen no encontrada"});
        }
    });
}




// Exportacion de las funciones creadas
module.exports = {
    crearUsuario,
    login,
    actualizarUsuario,
    subirImg,
    mostrarArchivo
};