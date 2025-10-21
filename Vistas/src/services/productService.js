

// ===========================================================
// === FUNCIONES COMUNES DE FILTRADO =========================
// ===========================================================
function filtrarProductos(productos, { marcas = [], min = 0, max = Number.MAX_SAFE_INTEGER, disponible = false, q = "" } = {}) {
  const query = q.trim().toLowerCase();
  return productos.filter(p => {
    if (marcas.length && !marcas.includes(p.marca)) return false;
    if (p.precio < min || p.precio > max) return false;
    if (disponible && p.stock <= 0) return false;
    if (query && !(p.nombre.toLowerCase().includes(query) || p.marca.toLowerCase().includes(query))) return false;
    return true;
  });
}

// ===========================================================
// === MICROCONTROLADORES ====================================
// ===========================================================
export async function obtenerMarcasMicro() {
  return Array.from(new Set(MICRO.map(p => p.marca)));
}

export async function buscarMicrocontroladores(filtro) {
  return filtrarProductos(MICRO, filtro);
}

// ===========================================================
// === SENSORES ==============================================
// ===========================================================
export async function obtenerMarcasSensores() {
  return Array.from(new Set(SENSORES.map(p => p.marca)));
}

export async function buscarSensores(filtro) {
  return filtrarProductos(SENSORES, filtro);
}

// ===========================================================
// === ACTUADORES ============================================
// ===========================================================
export async function obtenerMarcasActuadores() {
  return Array.from(new Set(ACTUADORES.map(p => p.marca)));
}

export async function buscarActuadores(filtro) {
  return filtrarProductos(ACTUADORES, filtro);
}


const API_URL = "http://localhost:3000"; // cambia si usas otro puerto o dominio

// 🔹 Buscar productos con filtros
export async function buscarProductos(filtro, categoria) {
  try {
    const params = new URLSearchParams();

    // Agregamos parámetros dinámicamente
    if (categoria) params.append("categoria", categoria);
    if (filtro.q) params.append("query", filtro.q);
    if (filtro.min) params.append("precioMin", filtro.min);
    if (filtro.max) params.append("precioMax", filtro.max);
    if (filtro.marcas?.length) params.append("marcas", filtro.marcas.join(","));
    if (filtro.disponible) params.append("soloDisponibles", "true");

    const res = await fetch(`${API_URL}/productos/buscar?${params.toString()}`);
    if (!res.ok) throw new Error(`Error al buscar productos (${res.status})`);
    
    const data = await res.json();
    console.log("✅ Productos filtrados obtenidos:", data);
    return data;
  } catch (error) {
    console.error("❌ Error al buscar productos:", error);
    return [];
  }
}

// 🔹 Obtener productos por categoría
export async function buscarProductosPorCategoria(categoria) {
  try {
    const res = await fetch(`${API_URL}/productos/categoria/${categoria}`);
    if (!res.ok) throw new Error(`Error al obtener productos de ${categoria}`);
    const data = await res.json();
    console.log("✅ Productos por categoría:", data);
    return data;
  } catch (error) {
    console.error("❌ Error buscando productos por categoría:", error);
    return [];
  }
}


// 🔹 Obtener producto por ID
export async function obtenerProductoPorId(id) {
  try {
    const res = await fetch(`${API_URL}/productos/${id}`);
    console.log(`🔍 Buscando producto por ID: ${id}`);

    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`Error al obtener producto: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("❌ Error buscando producto por ID:", error);
    return null;
  }
}

// 🔹 Obtener marcas disponibles desde backend

export  async function obtenerFiltrosDisponibles(categoria){
  try
  {
    const res = await fetch(`${API_URL}/productos/buscar/filtros/${categoria}`);
    if (!res.ok) throw new Error("Error al obtener filtros disponibles");
    const data = await res.json();
    console.log("✅ Filtros disponibles obtenidos:", data);
    return data;
  }catch(error){
    console.error("❌ Error obteniendo filtros disponibles:", error);
    return {
      marcas: [],
      rangoPrecio: {
        min: "0",
        max: "0"
    }
    };
  } 
} 

