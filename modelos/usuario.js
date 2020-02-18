/*
    el modelo es la representacion en codigo  de la estructura  de nuestras tablas (colleciones en Mongo)
    de nuestra base de datos.
*/

const mongoose = require('mongoose'); // Importamos mongoose
const Schema = mongoose.Schema; // creamos un objeto Schema para nuestra coleccion

// crearemos una instancia del objeto Schema 
var UsuarioSchema = new Schema({
    nombre: String,
    apellido: String,
    correo: String,
    contraseña: String,
    rol: String,
    imagen: String
});


// Exportar el Schema
// mongoose .model recibe dos parametros que son el nombre de la coleccion
// y la estructura o el esquema (Schema) de la coleccion.

module.exports = mongoose.model('Usuario', UsuarioSchema);