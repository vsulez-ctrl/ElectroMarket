class FabricaProducto {
    static contadorProductos = 0;
    static productosCreados = new Map();

    crearProducto(tipo, datos) {
        let fabricaConcreta;
        
        if (tipo === 'arduino') {
            fabricaConcreta = new CrearA();
        } else if (tipo === 'sensor') {
            fabricaConcreta = new EliminarA();
        } else {
            throw new Error('Tipo de producto no válido');
        }

        const producto = fabricaConcreta.crearProducto(datos);
        this.registrarProducto(producto);
        return producto;
    }

    registrarProducto(producto) {
        FabricaProducto.contadorProductos++;
        const tipo = producto.constructor.name;
        const count = FabricaProducto.productosCreados.get(tipo) || 0;
        FabricaProducto.productosCreados.set(tipo, count + 1);
        return true;
    }

    getTotalProductosCreados() {
        return FabricaProducto.contadorProductos;
    }

    getProductosPorTipo() {
        return Object.fromEntries(FabricaProducto.productosCreados);
    }
}

module.exports = FabricaProducto;