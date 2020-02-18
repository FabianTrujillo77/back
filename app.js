/*
    va a contener toda la  logica de ruteo de Express.
    Declaracion de rutas, uso del middleware body-parser.
    permisos de acceso a cualquier cliente (permisos al  aplicativo front hecho en Angular)
 */

 const express = require('express'); // importamos Express
 const bodyparser = require('body-parser'); // permitir analizar datos en la URL

 const app = express(); // application Express

 // solicitar las rutas de acceso a cada funcion que ejecutara nuestra aplicacion
 const usuarioRutas = require('./rutas/usuarioRutas');
 const cancionRutas = require('./rutas/cancionRutas');

 // -- MIDDLEWARES
 // Declaramos el analisis d datos con body-parser
 app.use(bodyparser.json());


 // configuracion de permisos de acceso

// consumo de las rutas

app.use('/api', usuarioRutas);
app.use('/api', cancionRutas);

// --FIN DE MIDDLEWARES--

// exportamos el archivo app.js para su uso en la aplicacion o archivo raiz index.js
module.exports = app;
