const CarritoCompra = require("../patrones/Singleton/CarritoCompra");

class CarritoController {
    // ✅ Agregar producto
    static agregarProducto(req, res) {
        const { clienteId } = req.params;
        const { productoId, cantidad } = req.body;

        try {
            const carrito = CarritoCompra.getInstance(clienteId);
            carrito.agregarItem(productoId, cantidad);
            return res.json({ message: "Producto agregado al carrito", carrito: carrito.getCarrito() });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    // ✅ Eliminar producto
    static eliminarProducto(req, res) {
        const { clienteId, productoId } = req.params;

        try {
            const carrito = CarritoCompra.getInstance(clienteId);
            carrito.eliminarItem(parseInt(productoId));
            return res.json({ message: "Producto eliminado", carrito: carrito.getCarrito() });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    // ✅ Actualizar cantidad
    static actualizarCantidad(req, res) {
        const { clienteId } = req.params;
        const { productoId, cantidad } = req.body;

        try {
            const carrito = CarritoCompra.getInstance(clienteId);
            carrito.actualizarCantidad(productoId, cantidad);
            return res.json({ message: "Cantidad actualizada", carrito: carrito.getCarrito() });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    // ✅ Obtener carrito completo
    static obtenerCarrito(req, res) {
        const { clienteId } = req.params;

        try {
            const carrito = CarritoCompra.getInstance(clienteId);
            return res.json({ carrito: carrito.getCarrito(), total: carrito.getTotal() });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    // ✅ Calcular subtotal y total
    static calcularSubtotal(req, res) {
        const { clienteId } = req.params;

        try {
            const carrito = CarritoCompra.getInstance(clienteId);
            return res.json({ subtotal: carrito.calcularSubtotal(), total: carrito.getTotal() });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

module.exports = CarritoController;
