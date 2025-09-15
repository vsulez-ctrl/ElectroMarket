const jwt = require("jsonwebtoken");
const ENV = require("../config/ENV")

function autenticar(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }

  const token = authHeader.split(" ")[1]; // "Bearer <token>"
  if (!token) {
    return res.status(401).json({ error: "Formato de token inválido" });
  }

  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET);

     req.usuario = {
      id: decoded.id,
      email: decoded.email,
      rol: decoded.rol,  // 👈 ahora también guardamos el rol
    };
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido o expirado" });
  }
}


function isAdmin(req,res,next){
 try {
    if (req.usuario && req.usuario.rol === "admin") {
      return next();
    }
    return res.status(403).json({ error: "Acceso denegado: no eres admin" });
  } catch (error) {
    return res.status(500).json({ error: "Error en validación de admin" });
  }
}
module.exports = {autenticar, isAdmin};
