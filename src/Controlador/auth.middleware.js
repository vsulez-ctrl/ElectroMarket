const jwt = require("jsonwebtoken");
const ENV = require("../config/ENV");
const SeguridadUsuario = require("../Modelo/Entidades/SeguridadUsuario");

async function autenticar(req, res, next) {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.status(401).json({ error: "Token no proporcionado" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "Formato de token inválido" });
    }

    try {
        const decoded = jwt.verify(token, ENV.JWT_SECRET);
        
        // Verificar que no esté bloqueado
        const seguridad = await SeguridadUsuario.obtenerPorUsuarioId(decoded.id);
        if (seguridad.estaBloqueado()) {
            return res.status(401).json({ error: "Cuenta bloqueada temporalmente" });
        }

        req.usuario = {
            id: decoded.id,
            email: decoded.email,
            nombre: decoded.nombre,
            rol: decoded.rol
        };
        
        next();
    } catch (error) {
        return res.status(401).json({ error: "Token inválido o expirado" });
    }
}

function isAdmin(req, res, next) {
    if (req.usuario && req.usuario.rol === "administrador") {
        return next();
    }
    return res.status(403).json({ error: "Acceso denegado: no eres administrador" });
}

module.exports = { autenticar, isAdmin };