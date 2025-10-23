import api from "./api";

export const login = async (credentials) => {
  try {
    console.log("🔗 [FRONTEND] === INICIANDO LOGIN ===");
    
    const requestData = {
      email: credentials.email,
      password: credentials.password
    };

    console.log("📤 [FRONTEND] Enviando datos al backend...");
    
    const response = await api.post("/auth/login", requestData);
    
    console.log("✅ [FRONTEND] === RESPUESTA COMPLETA ===");
    console.log("📦 [FRONTEND] Status:", response.status);
    console.log("📦 [FRONTEND] Datos:", JSON.stringify(response.data, null, 2));
    console.log("🔍 [FRONTEND] requiereVerificacion:", response.data.requiereVerificacion);
    console.log("🔍 [FRONTEND] Tipo de requiereVerificacion:", typeof response.data.requiereVerificacion);
    console.log("🔍 [FRONTEND] usuarioId:", response.data.usuarioId);
    console.log("🔍 [FRONTEND] email:", response.data.email);
    
    // Si es login directo (sin verificación)
    if (response.data.token && !response.data.requiereVerificacion) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.usuario));
      forceAuthUpdate(); // ✅ Disparar actualización
    }
    
    return response;
  } catch (error) {
    console.error("❌ [FRONTEND] === ERROR EN LOGIN ===");
    console.error("💥 [FRONTEND] Error:", error);
    
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    
    throw new Error("Error de conexión con el servidor");
  }
};

export const verificarCodigo = async (usuarioId, codigo) => {
  try {
    console.log("🔗 [FRONTEND VERIFICACIÓN] === INICIANDO VERIFICACIÓN ===");
    console.log("👤 Usuario ID:", usuarioId);
    console.log("🔢 Código:", codigo);
    
    const requestData = {
      usuarioId: usuarioId,
      codigo: codigo
    };

    console.log("📤 [FRONTEND] Enviando datos de verificación...");
    
    const response = await api.post("/auth/verificar-codigo", requestData);
    
    console.log("✅ [FRONTEND VERIFICACIÓN] === RESPUESTA COMPLETA ===");
    console.log("📦 Status:", response.status);
    console.log("📦 Headers:", response.headers);
    console.log("📦 Datos:", JSON.stringify(response.data, null, 2));
    console.log("🔍 Token recibido:", response.data.token ? "PRESENTE" : "AUSENTE");
    console.log("🔍 Message recibido:", response.data.message);
    console.log("🔍 Usuario recibido:", response.data.usuario ? "PRESENTE" : "AUSENTE");
    
    if (response.data.token) {
      console.log("✅ [FRONTEND] Token recibido - Guardando en localStorage");
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.usuario));
      forceAuthUpdate(); // ✅ Disparar actualización
    } else {
      console.log("❌ [FRONTEND] No se recibió token en la respuesta");
      throw new Error("No se recibió token después de la verificación");
    }
    
    return response;
  } catch (error) {
    console.error("❌ [FRONTEND VERIFICACIÓN] === ERROR EN VERIFICACIÓN ===");
    console.error("💥 [FRONTEND] Error:", error);
    
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    
    throw new Error("Error de conexión con el servidor");
  }
};

export const reenviarCodigo = async (usuarioId) => {
  try {
    console.log("🔗 [FRONTEND] Reenviando código...");
    
    const requestData = {
      usuarioId: usuarioId
    };

    const response = await api.post("/auth/reenviar-codigo", requestData);
    console.log("✅ [FRONTEND] Código reenviado");
    
    return response;
  } catch (error) {
    console.error("❌ [FRONTEND] Error reenviando código:", error);
    
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    
    throw new Error("Error de conexión con el servidor");
  }
};

export const register = async (userData) => {
  try {
    console.log("🔗 [FRONTEND] Intentando registrar usuario...");
    
    const requestData = {
      ...userData,
      password: userData.password
    };

    const response = await api.post("/auth/registrar", requestData);
    console.log("✅ [FRONTEND] Registro exitoso:", response.data);
    return response;
  } catch (error) {
    console.error("❌ [FRONTEND] Error en registro:", error);
    
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    
    throw new Error("Error de conexión con el servidor");
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  forceAuthUpdate(); // ✅ Disparar actualización al cerrar sesión
};

export const getCurrentUser = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

// ✅ Función para forzar actualización del estado de autenticación
export const forceAuthUpdate = () => {
  console.log("🔄 [AUTH SERVICE] Forzando actualización de autenticación");
  window.dispatchEvent(new Event('authStateChange'));
};