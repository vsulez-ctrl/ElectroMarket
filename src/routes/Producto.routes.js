const express = require("express");
const router = express.Router();
const ProductoController = require("../controller/ProductoControler");
const ProductoService = require("../service/Producto.service");
const BusquedaService = require("../service/Busqueda.service");

// Instancias de servicios
const productoService = new ProductoService();
const busquedaService = new BusquedaService(productoService);

// Instancia de controller con DI (Inyección de Dependencias)
const productoController = new ProductoController(productoService, busquedaService);

// Rutas
router.get("/", (req, res) => productoController.obtenerTodos(req, res));
router.get("/:id", (req, res) => productoController.obtenerPorId(req, res));
router.get("/categoria/:categoria", (req, res) => productoController.obtenerPorCategoria(req, res));
router.get("/buscar/texto", (req, res) => productoController.buscarProductos(req, res));
router.get("/filtros/disponibles", (req, res) => productoController.obtenerFiltrosDisponibles(req, res));

module.exports = router;
