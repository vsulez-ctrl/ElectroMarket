const path = require('path');
const express = require('express');
const carritoRoutes = require("./Rutas/Carrito.routes");
const productoRoutes = require("./Rutas/Producto.routes");
const AuthRoutes = require("./Rutas/Auth.routes");
const adminRoutes = require("./Rutas/Administrador.routes");
const adminProductoRoutes = require("./Rutas/ProductoAdmi.routes");
const adminReporteRoutes = require("./Rutas/Reporte.routes");

const app = express();

app.use(express.static(path.join(__dirname, '../Vistas/dist')));

app.use(express.json());

app.use("/carrito", carritoRoutes);
app.use("/productos", productoRoutes);
app.use("/auth", AuthRoutes);
app.use('/admi/productos', adminProductoRoutes);
app.use('/reportes', adminReporteRoutes);
app.use("/admin", adminRoutes);

const frontendRoutes = [
  '/',
  '/inicio',
  '/login',
  '/registro',
  '/recuperar',
  '/restablecer-password',
  '/productos/microcontroladores',
  '/productos/actuadores', 
  '/productos/sensores',
  '/metodo-pago',
  '/productos/:categoria/:id'
];

frontendRoutes.forEach(route => {
  app.get(route, (req, res) => {
    res.sendFile(path.join(__dirname, '../Vistas/dist/index.html'));
  });
});

module.exports = app;