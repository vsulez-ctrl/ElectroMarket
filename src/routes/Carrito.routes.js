const express = require("express");
const CarritoController = require("../controller/CarritoController");
const autenticar = require("../middlewares/auth.middleware");

const router = express.Router();

// Using static methods directly from CarritoController
router.post("/agregar", autenticar, CarritoController.agregarProducto);

router.delete("/eliminar/:productoId", autenticar, CarritoController.eliminarProducto);

router.put("/actualizar", autenticar, CarritoController.actualizarCantidad);

router.get("/", autenticar, CarritoController.obtenerCarrito);

router.get("/subtotal", autenticar, CarritoController.calcularSubtotal);

module.exports = router;