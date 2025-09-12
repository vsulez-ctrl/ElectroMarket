const Usuario = require("./Usuario")
const CarritoCompra = require("../patrones/Singleton/CarritoCompra");
class Cliente extends Usuario{
    constructor(id, email, password, nombre, direccion, telefono){
        super(id, email, password, nombre);
        this.direccion = direccion;
        this.telefono = telefono;
        this.carrito = CarritoCompra.getInstance(id); 
    }

     getInfo() {
        return {
            ...super.getInfo(),
            direccion: this.direccion,
            telefono: this.telefono,
            tipo: 'cliente'
        };
    }
}

module.exports = Cliente;