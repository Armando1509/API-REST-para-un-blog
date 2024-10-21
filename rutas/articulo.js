const express = require("express")
const multer = require("multer")
const router = express.Router();

const almacenamiento = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null,'./imagenes/articulos')
    },
    filename: (req, file, cb) =>{
        cb(null, "articulo" + Date.now() + file.originalname)
    }
})

const subidas = multer({storage: almacenamiento})

const ArticuloControlador = require("../controladores/articulo");

// Rutas de prueba

router.get("/ruta-de-prueba", ArticuloControlador.prueba)
router.get("/curso", ArticuloControlador.curso)

// Rutas util

router.post("/crear", ArticuloControlador.crear)
router.get("/conseguir/", ArticuloControlador.listar)
router.get("/ultimos", ArticuloControlador.ultimos)
router.get("/articulo/:id", ArticuloControlador.uno)
router.delete("/eliminar/:id", ArticuloControlador.eliminar)
router.put("/editar/:id", ArticuloControlador.editar)
router.post("/subir-imagen/:id", [subidas.single("file0")], ArticuloControlador.subir)

module.exports = router
