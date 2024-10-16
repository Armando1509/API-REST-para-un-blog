
const prueba = (req, res) =>{
    return res.status(200).json({
        mensaje: "Soy una accion de prueba en mi controlador de articulos"
    })
}

const curso = (req, res) =>{
    
    return res.status(200).json([{
        nombre: "conde",
        edad: 35,
        nacionalidad: "mexicana"
    },
    {
        nombre: "Armando",
        edad: 15,
        nacionalidad: "quien sabe"
    }
])
    
}

const crear = (req,res) => {

    // Recoger parametros por post a guardar

    // Validar datos

    // Crear el objeto a guardar

    // Asignar valores a objeto basado en el modelo (manual o automatico)

    // Devolver el resultado

    return res.status(200).json({
        mensaje:"Accion Guardada"
    })
}

module.exports = {
    prueba,
    curso,
    crear
}