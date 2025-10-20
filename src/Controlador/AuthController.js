const AuthService = require("../Servicios/Auth.service");
// Crear una instancia única del servicio (Singleton pattern)
const authService = new AuthService();

class AuthController {
    static async registrar(req, res) {
        try {
            const { nombre, email, password, direccion, telefono, rol } = req.body;

            // Validaciones básicas
            if (!nombre || !email || !password) {
                return res.status(400).json({
                    error: "Nombre, email y contraseña son obligatorios"
                });
            }

            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

            if (!passwordRegex.test(password)) {
                return res.status(400).json({
                    error: "La contraseña debe tener mínimo 8 caracteres, incluyendo al menos 1 mayúscula, 1 minúscula, 1 número y 1 símbolo (!@#$%^&*)."
                });
            }

            // Registrar cliente
            const nuevoUsuario = await authService.registrar({
                nombre,
                email,
                password,
                direccion,
                telefono,
                rol: rol || "cliente"
            });

            res.status(201).json({
                message: "Usuario registrado exitosamente",
                usuario: nuevoUsuario.getInfo()
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
                usuario: resultado.usuario.getInfo()
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
     static obtenerAdministradores(req, res) {
        try {
            const administradores = authService.obtenerTodosLosAdministradores();
            res.json({
                admin: administradores
            });
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    }
}

module.exports = AuthController;