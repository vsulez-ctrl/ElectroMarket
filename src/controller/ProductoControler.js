class ProductoController {
  constructor(productoService, busquedaService) {
    this.productoService = productoService;
    this.busquedaService = busquedaService;
  }

  /**
   * Obtener todos los productos
   */
  obtenerTodos(req, res) {
    try {
      const productos = this.productoService.obtenerTodos();
      res.json(productos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Obtener producto por ID
   */
  async obtenerPorId(req, res) {
    try {
      const { id } = req.params;
      const producto = await this.productoService.obtenerPorId(parseInt(id));

      if (!producto) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }

      res.json(producto);
  
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Buscar productos con texto o filtros
   */
  buscarProductos(req, res) {
    try {
      const { query, categoria, precioMin, precioMax, marcas, soloDisponibles } =
        req.query;

      let productos = [];

      if (query) {
        // búsqueda por texto
        productos = this.busquedaService.buscarPorTexto(query);
      } else {
        // búsqueda con filtros
        productos = this.busquedaService.buscarConFiltros({
          categoria,
          precioMin: precioMin ? parseFloat(precioMin) : undefined,
          precioMax: precioMax ? parseFloat(precioMax) : undefined,
          marcas: marcas ? marcas.split(",") : [],
          soloDisponibles: soloDisponibles === "true",
        });
      }

      res.json(productos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Obtener productos por categoría
   */
  async obtenerPorCategoria(req, res) {
    try {
      const { categoria } = req.params;
      console.log("heyy");
      const productos = await this.productoService.obtenerPorCategoria(categoria);
      console.log("heyy");
      res.json(productos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Obtener filtros disponibles
   */
 obtenerFiltrosBusqueda(req, res) {
  try {
    const { query } = req.query;
    const filtros = this.busquedaService.obtenerFiltrosDisponibles(query || "");
    res.json(filtros);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
}

module.exports = ProductoController;
