const express = require('express');
const CancionControl = require('../control/cancionControl');
const multiparty = require('connect-multiparty');
const subirCancionDirectorio = multiparty({uploadDir: './archivos/canciones'})

var api = express.Router();

api.post('/cargarContenido', CancionControl.crearCancion);
api.post('/buscar', CancionControl.buscarCancion);
api.put('/subir-cancion-usuario/: musicFile', subirCancionDirectorio, CancionControl.subirCancion);


module.exports = api;