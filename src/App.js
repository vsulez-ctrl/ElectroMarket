const express = require('express');
const carritoRoutes = require("./routes/Carrito.routes");
const productoRoutes = require("./routes/Producto.routes");
const clienteRoutes = require("./routes/Auth.routes");

const rutasAdministrador = require("./routes/Administrador.routes")
const rutasProducto = require("./routes/ProductoAdmi.routes")
const rutasReporte = require("./routes/Reporte.routes")

const app = express();

app.use(express.json());


app.use("/carrito", carritoRoutes);
app.use("/productos", productoRoutes);
app.use("/clientes", clienteRoutes);

app.use('/administradores', rutasAdministrador);
app.use('/productos', rutasProducto);
app.use('/reportes', rutasReporte);

module.exports = app;