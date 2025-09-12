const AuthService = require("../service/Auth.service");

// Crear una instancia única del servicio (Singleton pattern)
const authService = new AuthService();

class AuthController {
    static async registrar(req, res) {
        try {
            const { nombre, email, password, direccion, telefono } = req.body;

            // Validaciones básicas
            if (!nombre || !email || !password) {
                return res.status(400).json({
                    error: "Nombre, email y contraseña son obligatorios"
                });
            }

            if (password.length < 6) {
                return res.status(400).json({
                    error: "La contraseña debe tener al menos 6 caracteres"
                });
            }

            // Registrar cliente
            const nuevoCliente = await authService.registrar({
                nombre,
                email,
                password,
                direccion,
                telefono
            });

            res.status(201).json({
                message: "Cliente registrado exitosamente",
                cliente: nuevoCliente.getInfo()
            });

        } catch (error) {
            res.status(400).json({
                error: error.message
            });
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body;

            // Validaciones básicas
            if (!email || !password) {
                return res.status(400).json({
                    error: "Email y contraseña son obligatorios"
                });
            }

            // Hacer login
            const resultado = await authService.login(email, password);

            res.json({
                message: "Login exitoso",
                token: resultado.token,
                cliente: resultado.usuario.getInfo()
            });

        } catch (error) {
            res.status(401).json({
                error: error.message
            });
        }
    }

    static verificarToken(req, res) {
        try {
            const authHeader = req.headers["authorization"];
            if (!authHeader) {
                return res.status(401).json({ error: "Token no proporcionado" });
            }

            const token = authHeader.split(" ")[1];
            if (!token) {
                return res.status(401).json({ error: "Formato de token inválido" });
            }

            const decoded = authService.verificarToken(token);
            
            res.json({
                message: "Token válido",
                cliente: {
                    id: decoded.id,
                    email: decoded.email
                }
            });

        } catch (error) {
            res.status(401).json({
                error: error.message
            });
        }
    }

    // Método adicional para debug - obtener todos los clientes
    static obtenerClientes(req, res) {
        try {
            const clientes = authService.obtenerTodosLosClientes();
            res.json({
                clientes: clientes
            });
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    }
}

module.exports = AuthController;