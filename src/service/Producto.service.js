const Producto = require("../models/Entidades/Producto");

class ProductoService {
  constructor() {

    this.productos = [
      new Producto(1, "Laptop ASUS", "Laptop Gamer", 3500, "Electrónica", "ASUS", 20, 2),
      new Producto(2, "Celular Samsung", "Smartphone Galaxy", 1200, "Electrónica", "Samsung", 15, 1),
      new Producto(3, "Audífonos Sony", "Auriculares inalámbricos", 300, "Accesorios", "Sony", 50, 5),
    ];
  }

  
  getById(productId) {
    return this.productos.find(p => p.getId() === productId) || null;
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


  obtenerPorCategoria(categoria) {
    return this.productos.filter(p => p.getCategoria() === categoria);
  }


  obtenerTodos() {
    return this.productos;
  }
}

module.exports = ProductoService;
