const path = require('path');
const express = require('express');
const carritoRoutes = require("./Rutas/Carrito.routes");
const productoRoutes = require("./Rutas/Producto.routes");
const AuthRoutes = require("./Rutas/Auth.routes");
const adminRoutes = require("./Rutas/Administrador.routes");
const adminProductoRoutes = require("./Rutas/ProductoAdmi.routes");
const adminReporteRoutes = require("./Rutas/Reporte.routes");

// const cors = require('cors')

const app = express();

app.use(express.static(path.join(__dirname, '../Vistas/dist')));

// ✅ CORS COMENTADO - Ya no es necesario
// app.use(cors({
//   origin: "http://localhost:5173", // tu frontend
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true
// }));

app.use(express.json());

// RUTAS DE API
app.use("/carrito", carritoRoutes);
app.use("/productos", productoRoutes);
app.use("/auth", AuthRoutes);
app.use('/admi/productos', adminProductoRoutes);
app.use('/reportes', adminReporteRoutes);
app.use("/admin", adminRoutes);

//  RUTA CATCH-ALL PARA EL FRONTEND REACT
app.get(/\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../Vistas/dist/index.html'));
});

module.exports = app;