import { use, useEffect, useMemo, useState } from "react";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import HeroProducto from "./HeroProducto";
import Filtros from "./Filtros";
import ListaProductos from "./ListaProductos";

const PlantillaProductos = ({
  titulo,
  banner,
  obtenerFiltrosIniciales,
  buscarProductos,
}) => {
  const [filtrosDisponibles, setFiltrosDisponibles] = useState({
    
    marcas: [],
    rangoPrecio: { min: "0", max: "0" },
    disponibilidad: false,
    
  });

  const [filtroSeleccionado, setFiltroSeleccionado] = useState({
        marcas: [],
        min: filtrosDisponibles.rangoPrecio.min || 0, 
        max: filtrosDisponibles.rangoPrecio.max || 0,
        disponible: false,
        q: "",
    });

  const [items, setItems] = useState([]);
  const [cargando, setCargando] = useState(false);
  const nf = useMemo(() => new Intl.NumberFormat("es-CO"), []);

  useEffect(() => {
    (async () => {
      try{
      console.log("🔄 Obteniendo filtros iniciales...");
      const data= await obtenerFiltrosIniciales();
      setFiltrosDisponibles(data);
      const minPrecio = parseFloat(data.rangoPrecio.min);
      const maxPrecio = parseFloat(data.rangoPrecio.max);
      setFiltroSeleccionado((previoFiltro) => ({
        ...previoFiltro,
        min: minPrecio,
        max: maxPrecio,
      }));
      console.log("✅ Filtros iniciales obtenidos:", data);
      }catch(error){
        console.error("❌ Error obteniendo filtros iniciales:", error); 
      }
    })();
  }, [obtenerFiltrosIniciales]);


  useEffect(() => {
    (async () => {
      setCargando(true);
      setItems(await buscarProductos());
      setCargando(false);
      console.log("🔎 Buscando productos con filtro:", filtroSeleccionado);
      
    })();
  }, [filtroSeleccionado, buscarProductos]);

  const limpiar = () =>
    setFiltroSeleccionado({
      marcas: [],
      min: filtrosDisponibles.rangoPrecio.min,
      max: filtrosDisponibles.rangoPrecio.max,
      disponible: false,
      q: "",
    });

  return (
    <div className="min-h-screen text-white">
      <Navbar />
      <HeroProducto imagen={banner} titulo={titulo} />

      <div className="max-w-7xl mx-auto px-5 py-8  grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
        <Filtros
          titulo={titulo.toUpperCase()}
          marcas={filtrosDisponibles.marcas}
          rangoPrecioDisponible={filtrosDisponibles.rangoPrecio}
          filtro={filtroSeleccionado}
          setFiltro={setFiltroSeleccionado}
          limpiar={limpiar}
        />

        <main>
          <h2 className="text-2xl font-extrabold tracking-wider mb-6">
            {titulo.toUpperCase()}
          </h2>
          <ListaProductos items={items} cargando={cargando} nf={nf} />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default PlantillaProductos;
