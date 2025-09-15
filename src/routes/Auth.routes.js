const express = require("express");
const AuthController = require("../controller/AuthController");

const router = express.Router();

// Ruta para registrar nuevo cliente
router.post("/registrar", AuthController.registrar);

// Ruta para hacer login y obtener token
router.post("/login", AuthController.login);

// Ruta para verificar si el token es válido (opcional)
router.get("/verificar", AuthController.verificarToken);

// Ruta para debug - ver todos los clientes (opcional, remover en producción)
router.get("/clientes", AuthController.obtenerClientes);

router.get("/administradores", AuthController.obtenerAdministradores);

module.exports = router;