import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser } from './authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    
    const handleStorageChange = () => {
      console.log("🔄 [AUTH CONTEXT] Evento de cambio detectado - Recargando estado");
      checkAuth();
    };

    window.addEventListener('authStateChange', handleStorageChange);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('authStateChange', handleStorageChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const checkAuth = () => {
    console.log("🔄 [AUTH CONTEXT] Verificando autenticación...");
    const currentUser = getCurrentUser();
    console.log("👤 [AUTH CONTEXT] Usuario encontrado:", currentUser);
    setUser(currentUser);
    setLoading(false);
  };

  const login = (userData) => {
    console.log("✅ [AUTH CONTEXT] Login exitoso - Actualizando estado:", userData);
    setUser(userData);
    // Forzar actualización inmediata en todos los componentes
    window.dispatchEvent(new Event('authStateChange'));
  };

  const logout = () => {
    console.log("🚪 [AUTH CONTEXT] Logout - Limpiando estado");
    setUser(null);
    window.dispatchEvent(new Event('authStateChange'));
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};