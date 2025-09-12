const FiltroPrecio = require("../patrones/Filtro/FiltroPrecio");
const FiltroMarca = require("../patrones/Filtro/FiltroMarca");
const FiltroDisponibilidad = require("../patrones/Filtro/FiltroDisponibilidad");

class BusquedaService {
  constructor(productService) {
    this.productService = productService; // Dependencia inyectada
  }

  /**
   * Buscar productos por texto (nombre o descripción)
   */
  buscarPorTexto(query) {
    const productos = this.productService.obtenerTodos();
    return productos.filter(
      (p) =>
        p.getNombre().toLowerCase().includes(query.toLowerCase()) ||
        p.descripcion.toLowerCase().includes(query.toLowerCase())
    );
  }

  /**
   * Buscar productos con filtros
   */
  buscarConFiltros(criterios) {
    let productos = this.productService.obtenerTodos();

    let filtros = this.extraerFiltrosDisponibles(criterios);

    filtros.forEach((filtro) => {
      if (filtro.esValido()) {
        productos = filtro.aplicar(productos);
      }
    });

    return productos;
  }

  /**
   * Retorna los filtros que se pueden aplicar al catálogo
   */
  obtenerFiltrosDisponibles() {
    return {
      marcas: this.productService.obtenerMarcasDisponibles(),
      categorias: this.productService.obtenerCategoriasDisponibles(),
      rangoPrecio: this.productService.obtenerRangoPrecio(),
      disponibilidad: true,
    };
  }

  /**
   * Aplica filtros manualmente a una lista de productos
   */
  aplicarFiltros(productos, criterios) {
    let filtros = this.extraerFiltrosDisponibles(criterios);

    filtros.forEach((filtro) => {
      if (filtro.esValido()) {
        productos = filtro.aplicar(productos);
      }
    });

    return productos;
  }

  /**
   * Convierte los criterios en instancias de filtros
   */
  extraerFiltrosDisponibles(criterios) {
    let filtros = [];

    if (criterios.precioMin !== undefined && criterios.precioMax !== undefined) {
      filtros.push(new FiltroPrecio(criterios.precioMin, criterios.precioMax));
    }

    if (criterios.marcas && criterios.marcas.length > 0) {
      filtros.push(new FiltroMarca(criterios.marcas));
    }

    if (criterios.soloDisponibles !== undefined) {
      filtros.push(new FiltroDisponibilidad(criterios.soloDisponibles));
    }

    return filtros;
  }
}

module.exports = BusquedaService;
