const Producto = require("../models/Entidades/Productos");
const pool = require("../config/bd");

class ProductoService {
  constructor() {

  }

  _mapRowToProducto(row) {
  return {
    id: row.id,
    nombre: row.nombre,
    descripcion: row.descripcion,
    precio: parseFloat(row.precio),
    marca: row.marca,
    categoria: row.categoria,
    subcategoria: row.subcategoria,
    stock: parseInt(row.stock),
    disponible: row.disponible,
    imagen: row.imagen_url, // o row.imagen si ya usas alias
    destacado: row.destacado,
  };
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
      console.log(`✅ Retrieved products for category: ${categoria}`);
      console.log(result.rows);
      return result.rows;
    } catch (error) {
      console.error("Error retrieving products by category:", error);
      throw new Error("Database error while fetching products by category.");
    }
  }


  obtenerTodos() {
    return this.productos;
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
