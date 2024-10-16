const validator = require("validator");

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

const crear = (req, res) => {
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

  // Asignar valores a objeto basado en el modelo (manual o automatico)

  // Devolver el resultado

  return res.status(200).json({
    mensaje: "Accion Guardada",
    parametro,
  });
};

module.exports = {
  prueba,
  curso,
  crear,
};
