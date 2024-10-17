const express = require("express")
const router = express.Router();

const ArticuloControlador = require("../controladores/articulo");

// Rutas de prueba

router.get("/ruta-de-prueba", ArticuloControlador.prueba)
router.get("/curso", ArticuloControlador.curso)

// Rutas util

router.post("/crear", ArticuloControlador.crear)
router.get("/conseguir/", ArticuloControlador.listar)
router.get("/ultimos", ArticuloControlador.ultimos)

module.exports = router