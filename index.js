/*
    va a contener la conexion de Node con nuestra base de datos mongo a traves de mongoose.
*/

const mongoose = require ('mongoose'); // inportamos mongoose para la conexion
const app = require('./app'); // vamos a inportar la logica de express
const port = 4000; // declaramos el puerto que deseemos

//vamos a crear la logica de la conexion con la BD
// el metodo conect recibe dos parametros, el primero la ruta de la BD a  enlazar
// y el segundo sera una funcion que a su vez recibira los parametros de error y respuesta
mongoose.connect('mongodb://localhost:27017/bitfy', (err, res)=>{
    if(err){
        console.log(`El error es: ${err}`);
    }else{
        console.log(`conexion exitosa!!!`);
        app.listen(port, ()=>{
            console.log(`puerto: ${port}`);
        })
    }
});