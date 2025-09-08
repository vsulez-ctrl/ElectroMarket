class CarritoCompra {
  constructor(userId) {
    if (!userId) throw new Error("userId requerido");
    this.userId = userId;
    this.items = [];
  }

  static getInstance(userId) {
    if (!CarritoCompra.instances) {
      CarritoCompra.instances = new Map();
    }
    if (!CarritoCompra.instances.has(userId)) {
      CarritoCompra.instances.set(userId, new CarritoCompra(userId));
    }
    return CarritoCompra.instances.get(userId);
  }

  agregarItem(productId, nombre, precio, cantidad) {
    const existente = this.items.find(i => i.productId === productId);
    if (existente) {
      existente.cantidad += cantidad;
    } else {
      this.items.push({ productId, nombre, precio, cantidad });
    }
  }

  getCarrito() {
    return this.items;
  }

  getTotal() {
    const total = this.items.reduce((sum, i) => sum + i.precio * i.cantidad, 0);
    return { total, items: this.items };
  }
}

module.exports = CarritoCompra;
