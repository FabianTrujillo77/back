const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var CancionSchema = new Schema({
    nombre: String,
    artista: String,
    album: String,
    duracion: String,
    genero: String,
    portada: String, 
    archivo: String
});


module.exports = mongoose.model('cancion', CancionSchema);
