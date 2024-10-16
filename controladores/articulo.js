const validator = require("validator");
const Articulo = require("../modelos/Articulo");
//const { save } = require("mongoose")

const prueba = (req, res) => {
  return res.status(200).json({
    mensaje: "Soy una accion de prueba en mi controlador de articulos",
  });
};

const curso = (req, res) => {
  return res.status(200).json([
    {
      nombre: "conde",
      edad: 35,
      nacionalidad: "mexicana",
    },
    {
      nombre: "Armando",
      edad: 15,
      nacionalidad: "quien sabe",
    },
  ]);
};

const crear = async (req, res) => {
  // Recoger parametros por post a guardar
  let parametro = req.body;

  // Validar datos
  try {
    let validar_titulo =
      !validator.isEmpty(parametro.titulo) &&
      validator.isLength(parametro.titulo, { min: 5, max: undefined });
    let validar_contenido = !validator.isEmpty(parametro.contenido);

    if (!validar_contenido || !validar_titulo) {
      throw new Error("No se ha validado la informacion");
    }
  } catch (error) {
    return res.status(400).json({
      status: "error",
      mensaje: "Faltan datos por enviar",
    });
  }

  // Crear el objeto a guardar
  const articulo = new Articulo(parametro); //metodo automatico pasa los parametros comprando con la tabla

  // Asignar valores a objeto basado en el modelo (manual o automatico)
  // articulo.titulo = parametro.titulo => esta es la manera manual pero si tienes muchos campos tienes que hacer uno por cada uno

  // Guardar el articulo en la base de datos
  try {
    const articuloGuardado = await articulo.save();
    //  DEVOLVER RESULTADO
    return res.status(200).json({
      status: "success",
      articulo: articuloGuardado,
      mensaje: "Artículo creado con éxito!",
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      mensaje: "No se ha guardado el artículo",
    });
  }
};

const listar = async (req, res) => {
  try {
    let consulta = await Articulo.find().sort({ fecha: -1 });

    if (consulta.length === 0) {
      return res.status(400).json({
        status: "error",
        mensaje: "No Hay informacion",
      });
    }
    return res.status(200).json({
      contador: consulta.length,
      parametro: req.params.ultimos,
      status: "success",
      articulo: consulta,
      mensaje: "Aqui tienes la base",
    });
  } catch (error) {
    return res.status(404).json({
      status: "error",
      mensaje: "No hay conexion",
    });
  }
};

const ultimos = async (req, res) => {
    try {
      let consulta = await Articulo.find().sort({ fecha: -1 }).limit(3);
  
      if (consulta.length === 0) {
        return res.status(400).json({
          status: "error",
          mensaje: "No Hay informacion",
        });
      }
      return res.status(200).json({
        contador: consulta.length,
        parametro: req.params.ultimos,
        status: "success",
        articulo: consulta,
        mensaje: "Aqui tienes la base",
      });
    } catch (error) {
      return res.status(404).json({
        status: "error",
        mensaje: "No hay conexion",
      });
    }
  };

  const uno = async (req,res) =>{
    //Recoger un id por la url
    let id = req.params.id;

    //Buscar el articulo
    try {
        let articulo = await Articulo.findById(id)
        if(articulo.length === 0){
            return res.status(400).json({
                status: "error",
                mensaje: "No se encontro el id"
            })
        }
        return res.status(200).json({
            status: "success",
            articulo: articulo,
            mensaje: "Aqui esta el articulo"
        })
    } catch (error) {
        return res.status(404).json({
            status: "estas cabron",
            mensaje: "no conecta esta ma"
        })
    }
  }

  const eliminar = async (req, res) =>{
    let id = req.params.id
    try {
      let articulo = await Articulo.findByIdAndDelete(id)
      if(articulo.length === 0){
        return res.status(400).json({
          status: "error",
          mensaje: "No se encontro el articulo"
        })
      }
      return res.status(200).json({
        status: "Sccess",
        articulo: articulo,
        mensaje: "Se elimino de la base de datos"
      })
    } catch (error) {
      return res.status(404).json({
        status: "no hay conexion",
        mensaje: "no hay conexion con la base de datos"
      })
    }
  }

module.exports = {
  prueba,
  curso,
  crear,
  listar,
  ultimos,
  uno,
  eliminar
};
