const express = require("express");
const CarritoCompra = require("../models/CarritoCompra");
const PaymentService = require("../services/PaymentService");

const router = express.Router();

// GET carrito actual
router.get("/cart/:userId", (req, res) => {
  const carrito = CarritoCompra.getInstance(req.params.userId);
  res.json(carrito.getTotal());
});

// POST agregar item
router.post("/cart/:userId/add", (req, res) => {
  const { productId, nombre, precio, cantidad } = req.body;
  const carrito = CarritoCompra.getInstance(req.params.userId);
  carrito.agregarItem(productId, nombre, precio, cantidad);
  res.json(carrito.getTotal());
});

// GET métodos de pago disponibles
router.get("/payment-methods", (req, res) => {
  const service = new PaymentService();
  res.json(service.getAvailableMethods());
});

// POST procesar pago
router.post("/checkout/:userId/pay", async (req, res) => {
  try {
    const { metodo, datos } = req.body;
    const carrito = CarritoCompra.getInstance(req.params.userId);
    const { total } = carrito.getTotal();

    const service = new PaymentService();
    service.setStrategy(metodo);

    const result = await service.procesarPago(total, datos);

    res.json({ success: true, result });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
