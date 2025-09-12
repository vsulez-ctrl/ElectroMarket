const bcrypt = require('bcrypt');

class Usuario
{
    constructor(id,email, password, nombre){
        this.id = id
        this.email = email,
        this.password = password,
        this.nombre = nombre
    }

    async autenticar(email, password)
    {

    }

    getInfo()
    {
        return{
            id: this.id,
            email: this.email,
            nombre: this.nombre

        };
    }

    async actualizarDatos(nombre,email, password)
    {

    }

}


module.exports = Usuario;