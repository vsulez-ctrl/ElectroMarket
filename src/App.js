const express = require('express');
const carritoRoutes = require("./routes/Carrito.routes");
const productoRoutes = require("./routes/Producto.routes");

const app = express();

app.use(express.json());


app.use("/carrito", carritoRoutes);
app.use("/producto", productoRoutes);

module.exports = app;