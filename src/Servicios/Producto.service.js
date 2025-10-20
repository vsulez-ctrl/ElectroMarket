const Producto = require("../Modelo/Entidades/Productos");
const pool = require("../config/bd");

class ProductoService {
  constructor() {

  }

 

  async obtenerPorId(productId) {
    const query = 'SELECT * FROM productos WHERE id = $1';
    try
    {
      const result = await pool.query(query, [productId]);
      if (result.rows.length > 0) {
        return result.rows[0]; // Producto no encontrado
      }else{
        return []
      }
    
    }
    catch (error) {
      console.error("Error retrieving product by ID:", error);
      throw new Error("Database error while fetching product by ID.");
    }
    

  }

  checkStock(productId, cantidadSolicitada) {
    const producto = this.getById(productId);
    if (!producto) throw new Error("Producto no encontrado");
    return producto.getStock() >= cantidadSolicitada;
  }


  actualizarStock(productId, cantidad) {
    const producto = this.getById(productId);
    if (!producto) throw new Error("Producto no encontrado");
    producto.setStock(cantidad);
    return producto;
  }


  async obtenerPorCategoria(categoria) {
   const query = 'SELECT * FROM productos WHERE categoria = $1 AND disponible = TRUE ORDER BY nombre';
    try {
      const result = await pool.query(query, [categoria]);
      console.log("datos obtenidos");
      return result.rows;
    } catch (error) {
     
      throw new Error("Database error while fetching products by category.");
    }
  }
async obtenerFiltrosDisponibles(categoria) {
    
    const precioResultado = await pool.query(
        "SELECT MIN(precio) AS min, MAX(precio) AS max FROM productos WHERE categoria = $1", [categoria]
    );

    
    const marcasResultado = await pool.query(
        "SELECT DISTINCT marca FROM productos WHERE categoria = $1 ORDER BY marca ASC", [categoria]
    );
    console.log("✅ Retrieved available filters for category:", categoria);
    console.log({
        marcas: marcasResultado.rows.map(row => row.marca),
        rangoPrecio: {
            min: precioResultado.rows[0].min || 0, // Manejar caso de no resultados
            max: precioResultado.rows[0].max || 0,
        },
        disponibilidad: false
    });
    return {
        marcas: marcasResultado.rows.map(row => row.marca),
        rangoPrecio: {
            min: precioResultado.rows[0].min || 0, // Manejar caso de no resultados
            max: precioResultado.rows[0].max || 0,
        },
        disponibilidad: false
    };
}

  async obtenerTodos() {
    const query = 'SELECT * FROM productos WHERE disponible = TRUE ORDER BY nombre';
    try {
      const result = await pool.query(query);
      console.log("✅ Retrieved all products");
      return result.rows;
    } catch(error) {
      console.error("Error retrieving all products:", error);
      throw new Error("Database error while fetching all products.");
    }
  }

   obtenerMarcasDisponibles() {
    return [...new Set(this.productos.map((p) => p.marca))];
  }

  obtenerCategoriasDisponibles() {
    return [...new Set(this.productos.map((p) => p.categoria))];
  }

  obtenerRangoPrecio() {
    const precios = this.productos.map((p) => p.precio);
    return {
      min: Math.min(...precios),
      max: Math.max(...precios),
    };
  }

}

module.exports = ProductoService;
