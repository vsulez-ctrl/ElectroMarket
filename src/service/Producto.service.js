const Producto = require("../models/Entidades/Producto");

class ProductoService {
  constructor() {

    this.productos = [
      new Producto(
        1,
        "Arduino UNO R3",
        "Microcontrolador basado en ATmega328P, ideal para proyectos electrónicos",
        120,
        "Microcontroladores",
        "Arduino",
        30,
        5
      ),
      new Producto(
        2,
        "ESP32 WiFi + Bluetooth",
        "Microcontrolador de alto rendimiento con conectividad inalámbrica",
        150,
        "Microcontroladores",
        "Espressif",
        25,
        5
      ),
      new Producto(
        3,
        "Sensor de Temperatura DHT22",
        "Sensor digital de temperatura y humedad de alta precisión",
        40,
        "Sensores",
        "Adafruit",
        50,
        10
      ),
      new Producto(
        4,
        "Sensor Ultrasónico HC-SR04",
        "Sensor para medir distancias mediante ultrasonido",
        25,
        "Sensores",
        "Generic",
        60,
        10
      ),
      new Producto(
        5,
        "Servo Motor SG90",
        "Actuador de rotación de 180 grados, ideal para proyectos de robótica",
        30,
        "Actuadores",
        "TowerPro",
        80,
        10
      ),
      new Producto(
        6,
        "Motor DC 12V",
        "Motor eléctrico de corriente directa, para proyectos de mecatrónica",
        45,
        "Actuadores",
        "Generic",
        40,
        5
      )
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
