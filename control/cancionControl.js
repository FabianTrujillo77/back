const Cancion = require ('../modelos/cancion');

function crearCancion(req, res){
    var cancion = new Cancion();

    var parametros = req.body;

    cancion.nombre = parametros.nombre;
    cancion.artista = parametros.artista;
    cancion.album = parametros.almbum;
    cancion.duracion = parametros.duracion;
    cancion.genero = parametros.genero;
    cancion.portada = null;
    cancion.archivo = parametros.archivo;


    cancion.save((err, cancionNueva)=>{
        if(err){
            res.status(500).send({messaje: "Error en el servidor"});
        }else{
            res.status(200).send({cancion: cancionNueva});
        }
    });
}

// Buscar canciones
function buscarCancion(req,res){
    var parametros = req.body;
    var cancionId = parametros.nombre;
    

    Cancion.findOne({nombre: cancionId}, (err, cancionEncontrada)=>{
        if(err){
            res.status(500).send({message: "Error en el servidor"});
        }else{
            if(!cancionEncontrada){
                res.status(200).send({message:"Cancion no encontrada"});
            }else{
                res.status(200).send({cancion: cancionEncontrada});
            }
        }
    })
}  
        


// Buscar cancion

// Actualizar cancion

// Eliminar cancion

// subir cancion
function subirCancion(req,rep){
    var cancionId = req.param.id;
    var nombreCancion = "No ha subido ninguna cancion...";

    if(req.files){
        var rutaArchivo = req.files.cancion.path;
        var partirArchivo = rutaArchivo.split('\\');
        var nombreArchivo = partirArchivo[2];
        var extencionCancion = nombreArchivo.split('\.');
        var extencionArchivo = extencionCancion[1];

        if(extencionArchivo == "mp3" || extencionArchivo == "AAC" || extencionArchivo == "Wma"){
            Cancion.findByIdAndUpdate(cancionId, {cancion: nombreArchivo}, (err,cancionSubida)=>{
                if(err){
                    res.status(500).send({message:"Error en el servidor"});
                }else{
                    if(!cancionSubida){
                        res.status(200).send({message:"No es posible subir la cancion"});
                    }else{
                        res.status(200).send({cancion: nombreArchivo, cancion:cancionSubida});
                    }
                }
            });
        }else{
            res.status(200).send({message:"Formato invalido"});
        }   
        }else{
            res.status(200).send({message:"No se ha podido subir la cancion"});
        }
    }


module.exports = {
    crearCancion,
    buscarCancion,
    subirCancion
};

