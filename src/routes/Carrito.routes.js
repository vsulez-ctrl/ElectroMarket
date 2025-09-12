const express = require("express");
const router = express.Router();
const CarritoController = require("../controller/CarritoController");

// Rutas del carrito
router.post("/:clienteId/agregar", CarritoController.agregarProducto);
router.delete("/:clienteId/eliminar/:productoId", CarritoController.eliminarProducto);
router.put("/:clienteId/actualizar", CarritoController.actualizarCantidad);
router.get("/:clienteId", CarritoController.obtenerCarrito);
router.get("/:clienteId/subtotal", CarritoController.calcularSubtotal);

module.exports = router;
