const express = require('express');
const carritoRoutes = require("./routes/Carrito.routes");
const productoRoutes = require("./routes/Producto.routes");
const AuthRoutes = require("./routes/Auth.routes");

const adminRoutes = require("./routes/Administrador.routes")
const adminProductoRoutes = require("./routes/ProductoAdmi.routes")
const adminReporteRoutes = require("./routes/Reporte.routes")

const app = express();

app.use(express.json());


app.use("/carrito", carritoRoutes);
app.use("/productos", productoRoutes);
app.use("/auth",AuthRoutes);

app.use('/admi/productos', adminProductoRoutes);
app.use('/reportes', adminReporteRoutes);

app.use("/admin", adminRoutes)

module.exports = app;