const Usuario = require("./Usuario")

class Cliente extends Usuario{
    constructor(id, email, password, nombre, direccion, telefono){
        super(id, email, password, nombre);
        this.direccion = direccion;
        this.telefono = telefono;
        this.carrito = null; 
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