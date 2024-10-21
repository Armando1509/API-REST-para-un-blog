const fs = require("fs");
const path = require("path");
const validator = require("validator");
const Articulo = require("../modelos/Articulo");
const { validarArticulo } = require("../helper/validar");

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
    validarArticulo(parametro);
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

const uno = async (req, res) => {
  //Recoger un id por la url
  let id = req.params.id;

  //Buscar el articulo
  try {
    let articulo = await Articulo.findById({ _id: id });
    if (articulo.length === 0) {
      return res.status(400).json({
        status: "error",
        mensaje: "No se encontro el id",
      });
    }
    return res.status(200).json({
      status: "success",
      articulo: articulo,
      mensaje: "Aqui esta el articulo",
    });
  } catch (error) {
    return res.status(404).json({
      status: "estas cabron",
      mensaje: "no conecta esta ma",
    });
  }
};

const eliminar = async (req, res) => {
  let id = req.params.id;
  try {
    let articulo = await Articulo.findByIdAndDelete({ _id: id });
    if (articulo.length === 0) {
      return res.status(400).json({
        status: "error",
        mensaje: "No se encontro el articulo",
      });
    }
    return res.status(200).json({
      status: "Sccess",
      articulo: articulo,
      mensaje: "Se elimino de la base de datos",
    });
  } catch (error) {
    return res.status(404).json({
      status: "no hay conexion",
      mensaje: "no hay conexion con la base de datos",
    });
  }
};

const editar = async (req, res) => {
  // Recoger id de articulo a editar
  let id = req.params.id;
  // Recoger datos del articulo del body
  let parametro = req.body;
  // Validar datos
  try {
    validarArticulo(parametro);
  } catch (error) {
    return res.status(400).json({
      status: "error",
      mensaje: "Faltan datos por enviar",
    });
  }
  // Buscar y actualizar el articulo
  try {
    let articulo = await Articulo.findOneAndUpdate({ _id: id }, parametro, {
      new: true,
    });
    if (articulo.length === 0) {
      return res.status(400).json({
        status: "error",
        mensaje: "No se encontro el articulo",
      });
    }
    return res.status(200).json({
      status: "Success",
      articulo: articulo,
      mensaje: "Se Actualizo el articulo de la base de datos",
    });
  } catch (error) {
    return res.status(404).json({
      status: "no hay conexion",
      mensaje: "no hay conexion con la base de datos",
    });
  }
};

const subir = async (req, res) => {
  // Configurar multer en rutas

  // Recoger el fichero de imagen subido
  if (!req.file && !req.files) {
    return res.status(404).json({
      status: "Error",
      mensaje: "No subiste imagen",
    });
  }

  // Nombre del archivo
  let archivo = req.file.originalname;
  // Extension del archivo
  let archivo_split = archivo.split(".");
  let extension = archivo_split[1];

  // Comprobar si la extension es correcta
  if (
    extension != "png" &&
    extension != "jpg" &&
    extension != "jpeg" &&
    extension != "gif"
  ) {
    // Borrar archivo y dar respuesta
    fs.unlink(req.file.path, (error) => {
      return res.status(400).json({
        status: "error",
        mensaje: "Imagen invalida",
      });
    });
  } else {
    // Recoger id de articulo a editar
    let id = req.params.id;

    // Buscar y actualizar el articulo
    try {
      let articulo = await Articulo.findOneAndUpdate(
        { _id: id },
        { imagen: req.file.filename }, //aqio solo agrego el parametro de la imagen ya obtenido arriba
        { new: true }
      );
      if (articulo.length === 0) {
        return res.status(400).json({
          status: "error",
          mensaje: "No se encontro el articulo",
        });
      }
      return res.status(200).json({
        status: "Success",
        articulo: articulo,
        mensaje: "Se Actualizo el articulo de la base de datos",
        fichero: req.file,
      });
    } catch (error) {
      return res.status(404).json({
        status: "no hay conexion",
        mensaje: "no hay conexion con la base de datos",
      });
    }
  }
};

const imagen = (req, res) => {
  let fichero = req.params.fichero;
  let ruta_fisica = path.join(__dirname, "../imagenes/articulos", fichero);

  fs.stat(ruta_fisica, fs.constants.F_OK, (error, existe) => {
    if (existe) {
      return res.sendFile(path.resolve(ruta_fisica));
    } else {
      return res.status(404).json({
        status: "error",
        mensaje: "La imagen no existe",
        existe,
        fichero,
        ruta_fisica,
      });
    }
  });
};

const buscar = async (req, res) => {
  // Sacar el string de busqueda
  let busqueda = req.params.busqueda;
  // Find OR
  try {
    let articulosEncontrados = await Articulo.find({
      $or: [
        //significa buscar coincidencias dentro del array siguien esto de mongo
        { titulo: { $regex: busqueda, $options: "i" } }, // regex es es para que busque en el campo de titulo la palabra mandada por busqueda
        { contenido: { $regex: busqueda, $options: "i" } }, // options es la expresion que indica que no importa si son mayusculas o minusculas por eso la i ya que no distingue entre ellas
      ],
    }).sort({ fecha: -1 });

    if (!articulosEncontrados || articulosEncontrados.length <= 0) {
      return res.status(400).json({
        status: "error",
        mensaje: "No se encontraron articulos",
      });
    } else {
      return res.status(200).json({
        status: "success",
        articulos: articulosEncontrados,
      });
    }
  } catch (error) {
    return res.status(404).json({
      status: "error",
      mensaje: "No hay conexion",
    });
  }
};

module.exports = {
  prueba,
  curso,
  crear,
  listar,
  ultimos,
  uno,
  eliminar,
  editar,
  subir,
  imagen,
  buscar,
};
