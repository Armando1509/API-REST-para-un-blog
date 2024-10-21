const validator = require("validator")

const validarArticulo = (parametro) =>{
    
    let validar_titulo =
      !validator.isEmpty(parametro.titulo) &&
      validator.isLength(parametro.titulo, { min: 5, max: undefined });
    let validar_contenido = !validator.isEmpty(parametro.contenido);

    if (!validar_contenido || !validar_titulo) {
      throw new Error("No se ha validado la informacion");
    }
}

module.exports = {
    validarArticulo
}