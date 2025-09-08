const { PagoTarjeta, PagoPayPal, PagoEfectivo } = require("./PaymentStrategies");

class PaymentService {
  constructor() {
    this.metodos = {
      tarjeta: new PagoTarjeta(),
      paypal: new PagoPayPal(),
      efectivo: new PagoEfectivo(),
    };
    this.strategy = null;
  }

  setStrategy(metodo) {
    if (!this.metodos[metodo]) {
      throw new Error("Método de pago no soportado");
    }
    this.strategy = this.metodos[metodo];
  }

  async procesarPago(monto, datos) {
    if (!this.strategy) {
      throw new Error("No se seleccionó estrategia de pago");
    }
    return this.strategy.pagar(monto, datos);
  }

  getAvailableMethods() {
    return Object.keys(this.metodos);
  }
}

module.exports = PaymentService;
    