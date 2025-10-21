// Microcontroladores.js

import PlantillaProductos from "../components/Productos/PlantillaProductos";
import { obtenerFiltrosDisponibles, buscarProductosPorCategoria } from "../services/productService";
import banner from "../assets/imagenes/productos/HeroProductos/microcontroladores-hero.png";

export default function Microcontroladores() {
  const handleObtenerFiltros = () => {
        return obtenerFiltrosDisponibles('Microcontroladores');
    }
  const handleBuscarProductos = () => {
      return buscarProductosPorCategoria('Microcontroladores');
  }

  return (
    <PlantillaProductos
      titulo="Microcontroladores"
      banner={banner}
      obtenerFiltrosIniciales={handleObtenerFiltros}
      buscarProductos={handleBuscarProductos} 
    />
  
  );
}