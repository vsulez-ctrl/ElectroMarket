class PagoTarjeta {
  async pagar(monto, datos) {
    if (!datos.numero || !datos.cvv) {
      throw new Error("Datos de tarjeta incompletos");
    }
    return { success: true, metodo: "tarjeta", monto, transaccion: Date.now() };
  }
}

class PagoPayPal {
  async pagar(monto, datos) {
    if (!datos.email) {
      throw new Error("Email de PayPal requerido");
    }
    return { success: true, metodo: "paypal", monto, transaccion: Date.now() };
  }
}

class PagoEfectivo {
  async pagar(monto, datos) {
    return { success: true, metodo: "efectivo", monto, transaccion: Date.now() };
  }
}

module.exports = { PagoTarjeta, PagoPayPal, PagoEfectivo };
