const express = require('express');
const carritoRoutes = require("./Rutas/Carrito.routes");
const productoRoutes = require("./Rutas/Producto.routes");
const AuthRoutes = require("./Rutas/Auth.routes");
const adminRoutes = require("./Rutas/Administrador.routes");
const adminProductoRoutes = require("./Rutas/ProductoAdmi.routes");
const adminReporteRoutes = require("./Rutas/Reporte.routes");

const cors = require('cors')

const app = express();
app.use(cors({
  origin: "http://localhost:5173", // tu frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));



app.use(express.json());


app.use("/carrito", carritoRoutes);
app.use("/productos", productoRoutes);
app.use("/auth",AuthRoutes);

app.use('/admi/productos', adminProductoRoutes);
app.use('/reportes', adminReporteRoutes);

app.use("/admin", adminRoutes)

module.exports = app;