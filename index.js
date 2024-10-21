const { conexion } = require("./basedatos/conexion");
const express = require("express");
const cors = require("cors");

//Inicializar app

console.log("App de node arrancada");

// Conectar a la Base de Datos

conexion();

// Crear el servidor Node

const app = express();
const puerto = 3900;

// Configurar cors

app.use(cors());

// Convertir body a objeto js

app.use(express.json()); // recibir datos con content-type app/json
app.use(express.urlencoded({ extended: true }));

// Crear rutas
const rutas_articulo = require("./rutas/articulo");

// Cargo las rutas
app.use("/api", rutas_articulo);

// Rutas de prueba hardcodeadasS
app.get("/probando", (req, res) => {
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
});

app.get("/", (req, res) => {
  return res.status(200).send(`
        <div>
            <h1>Probando ruta nodejs</h1>
            <p>Creando api rest con node</p>
        </div>
    `);
});

// Crear servidor y escuchar peticiones http

app.listen(puerto, () => {
  console.log("Servidor corriendo en el puerto " + puerto);
});
