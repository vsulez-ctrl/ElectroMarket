const express = require('express');
const carritoRoutes = require("./routes/Carrito.routes");
const productoRoutes = require("./routes/Producto.routes");
const clienteRoutes = require("./routes/Auth.routes");

const app = express();

app.use(express.json());


app.use("/carrito", carritoRoutes);
app.use("/productos", productoRoutes);
app.use("/clientes", clienteRoutes);

module.exports = app;