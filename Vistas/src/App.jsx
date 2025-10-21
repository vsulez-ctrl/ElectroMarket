import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Registro from "./Pages/Registro";

// ⬇️ importa la nueva vista HU-4
import Microcontroladores from "./Pages/Microcontroladores";
import Actuadores from "./Pages/Actuadores";
import Sensores from "./Pages/Sensores";
import ProductoDetalle from "./Pages/ProductoDetalle";
// Nueva página de método de pago
import MetodoPago from "./Pages/MetodoPago";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

        {/* ⬇️ nueva ruta HU-4 */}
        <Route path="productos/microcontroladores" element={<Microcontroladores />} />
        <Route path="productos/actuadores" element={<Actuadores />} />
        <Route path="productos/sensores" element={<Sensores />} />
        {/* Página para seleccionar método de pago */}
        <Route path="/metodo-pago" element={<MetodoPago />} />
        <Route path="/productos/:categoria/:id" element={<ProductoDetalle />} />
      </Routes>
    </>
  );
}

export default App;
