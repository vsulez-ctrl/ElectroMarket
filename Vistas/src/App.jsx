import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./services/AuthContext";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Registro from "./Pages/Registro";
import Microcontroladores from "./Pages/Microcontroladores";
import Actuadores from "./Pages/Actuadores";
import Sensores from "./Pages/Sensores";
import ProductoDetalle from "./Pages/ProductoDetalle";
import MetodoPago from "./Pages/MetodoPago";
import OlvidePassword from "./Pages/OlvidePassword";
import RestablecerPassword from "./Pages/RestablecerPassword";
import HomeAutenticado from "./Pages/HomeAutenticado";


function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/recuperar" element={<OlvidePassword />} />
        <Route path="/olvide-password" element={<OlvidePassword />} />
        <Route path="/restablecer-password" element={<RestablecerPassword />} />
        <Route path="/inicio" element={<HomeAutenticado />} />
        <Route path="productos/microcontroladores" element={<Microcontroladores />} />
        <Route path="productos/actuadores" element={<Actuadores />} />
        <Route path="productos/sensores" element={<Sensores />} />
        <Route path="/metodo-pago" element={<MetodoPago />} />
        <Route path="/productos/:categoria/:id" element={<ProductoDetalle />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;