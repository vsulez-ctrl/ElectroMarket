const CarritoCompra = require("../Modelo/patrones/Singleton/CarritoCompra");;
class CarritoController {
    // ✅ Agregar producto - Updated to get clienteId from req
    static agregarProducto(req, res) {
        const clienteId = req.clienteId; // From auth middleware
        const { productoId, cantidad } = req.body;

        try {
            const carrito = CarritoCompra.getInstance(clienteId);
            carrito.agregarItem(productoId, cantidad);
            return res.json({ 
                message: "Producto agregado al carrito", 
                carrito: carrito.getCarrito() 
            });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    // ✅ Eliminar producto - Updated to get clienteId from req
    static eliminarProducto(req, res) {
        const clienteId = req.clienteId; // From auth middleware
        const { productoId } = req.params;

        try {
            const carrito = CarritoCompra.getInstance(clienteId);
            carrito.eliminarItem(parseInt(productoId));
            return res.json({ 
                message: "Producto eliminado", 
                carrito: carrito.getCarrito() 
            });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    // ✅ Actualizar cantidad - Updated to get clienteId from req
    static actualizarCantidad(req, res) {
        const clienteId = req.clienteId; // From auth middleware
        const { productoId, cantidad } = req.body;

        try {
            const carrito = CarritoCompra.getInstance(clienteId);
            carrito.actualizarCantidad(productoId, cantidad);
            return res.json({ 
                message: "Cantidad actualizada", 
                carrito: carrito.getCarrito() 
            });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    // ✅ Obtener carrito completo - Updated to get clienteId from req
    static obtenerCarrito(req, res) {
        const clienteId = req.clienteId; // From auth middleware

        try {
            const carrito = CarritoCompra.getInstance(clienteId);
            return res.json({ 
                carrito: carrito.getCarrito(), 
                total: carrito.getTotal() 
            });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }


    static calcularSubtotal(req, res) {
        const clienteId = req.clienteId; // From auth middleware

        try {
            const carrito = CarritoCompra.getInstance(clienteId);
            return res.json({ 
                subtotal: carrito.calcularSubtotalTotal(), 
                total: carrito.getTotal() 
            });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    
}

module.exports = CarritoController;