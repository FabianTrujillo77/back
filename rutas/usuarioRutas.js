/*
    vamos a crear el manejo de rutas  de express para nuestra API
    se encargara de manejar las rutas del lado backend 
*/

const express = require ('express');
const UsuarioControl = require ('../control/usuarioControl'); // Importamos el controlador de las funciones
const multiparty = require('connect-multiparty'); // importamos el paquete connect-multiparty para poder subir los archivos
const subirImgDirectorio = multiparty({uploadDir: './archivos/usuarios'}) // Ruta archivos

var api = express.Router(); // cargamos el manejador de rutas de express


/*
    estos son denominados metodos HTTP y hacen parte de las caracteristicas de una API
    POST  agregar datos
    GET  obtener datos
    PUT actualizar datos
    DELETE eliminar datos
*/

// declaracion de las rutas que daran paso a la ejecucion de las funcioness
// Ruta registro de usuario
api.post('/registro', UsuarioControl.crearUsuario);
// En el caso de un login o un inicio de saesión, utilizamos el método post en vez de get.
api.post('/loginUsuario', UsuarioControl.login);
//Ruta actualizar datos usuario
api.put('/actualizarUsuario/:Id', UsuarioControl.actualizarUsuario);

// Ruta subir imagen usuario
api.put('/subir-imagen-usuario/:id', subirImgDirectorio, UsuarioControl.subirImg);

//Ruta mostrar archivo
api.get('/obtener-imagen-usuario/:imageFile',subirImgDirectorio, UsuarioControl.mostrarArchivo);

// Exportacion del archivo usuarioRutas
module.exports = api;
