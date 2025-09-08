// models/categories/CategoryComposite.js
export class CategoryComponent {
    // Interface Component - Operaciones comunes
    getId() { throw new Error('Método abstracto: getId'); }
    getNombre() { throw new Error('Método abstracto: getNombre'); }
    mostrar() { throw new Error('Método abstracto: mostrar'); }
    obtenerProductos() { throw new Error('Método abstracto: obtenerProductos'); }
    agregarComponente(componente) { throw new Error('Método abstracto: agregarComponente'); }
    removerComponente(id) { throw new Error('Método abstracto: removerComponente'); }
    buscarProducto(nombre) { throw new Error('Método abstracto: buscarProducto'); }
}

export class Category extends CategoryComponent {
    // Composite - Puede tener hijos
    constructor(id, nombre, descripcion = '') {
        super();
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.componentes = [];
        this.activo = true;
        this.fechaCreacion = new Date();
    }

    getId() { return this.id; }
    getNombre() { return this.nombre; }

    mostrar() {
        let resultado = ` ${this.nombre}\n`;
        this.componentes.forEach(componente => {
            resultado += `  ↳ ${componente.mostrar()}\n`;
        });
        return resultado;
    }

    obtenerProductos() {
        return this.componentes.flatMap(componente => componente.obtenerProductos());
    }

    agregarComponente(componente) {
        this.componentes.push(componente);
        return true;
    }

    removerComponente(id) {
        const index = this.componentes.findIndex(c => c.getId() === id);
        if (index !== -1) {
            this.componentes.splice(index, 1);
            return true;
        }
        return false;
    }

    buscarProducto(nombre) {
        for (const componente of this.componentes) {
            const producto = componente.buscarProducto(nombre);
            if (producto) return producto;
        }
        return null;
    }
}

export class ProductItem extends CategoryComponent {
    // Leaf - Objeto final sin hijos
    constructor(producto) {
        super();
        this.producto = producto;
    }

    getId() { return this.producto.id; }
    getNombre() { return this.producto.nombre; }

    mostrar() {
        return `${this.producto.nombre} - $${this.producto.precio}`;
    }

    obtenerProductos() {
        return [this.producto];
    }

    agregarComponente(componente) {
        throw new Error(' ProductItem no puede tener componentes hijos');
    }

    removerComponente(id) {
        return false;
    }

    buscarProducto(nombre) {
        return this.producto.nombre.toLowerCase().includes(nombre.toLowerCase()) 
            ? this.producto 
            : null;
    }
}
