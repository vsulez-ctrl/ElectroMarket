import PlantillaProductos from "../components/Productos/PlantillaProductos";
import { obtenerFiltrosDisponibles, buscarProductosPorCategoria } from "../services/productService";
import banner from "../assets/imagenes/productos/HeroProductos/sensor-hero.png";

export default function Sensores() {
  const handleObtenerFiltros = () => {
        return obtenerFiltrosDisponibles('Sensores');
    }
  const handleBuscarProductos = () => {
      return buscarProductosPorCategoria('Sensores');
  }
  return (
    <PlantillaProductos
      titulo="Sensores"
      banner={banner}
      obtenerFiltrosIniciales={handleObtenerFiltros}
      buscarProductos={handleBuscarProductos}
      rangoPrecio={{ min: 15000, max: 300000 }}
    />
  );
}
