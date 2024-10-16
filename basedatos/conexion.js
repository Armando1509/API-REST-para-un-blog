const mongoose = require("mongoose")

const conexion = async () =>{

try {
    await mongoose.connect("mongodb://localhost:27017/mi_blog")
    console.log("Conectado a la BD mi blog!!");
    
} catch (error) {
    console.log(error);
    throw new Error("No se a podido conectar a la Base de Datos")
}
}

module.exports = {
    conexion
}