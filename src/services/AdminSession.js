//AdminSession.js
class AdminSession {
    static #instancia = null;
    constructor() {
        this.sessionData = new Map();
        this.loginTime = new Date();
        console.log('Nueva sesión administrativa creada');
    }
    static getInstancia() {
        if (AdminSession.#instancia === null) {
            AdminSession.#instancia = new AdminSession();
        }
        return AdminSession.#instancia;
    }
    validarSesion() {
        return this.sessionData.has('usuarioId') && 
               this.sessionData.has('email');
    }
    cerrarSesion() {
        this.sessionData.clear();
        console.log('Sesión cerrada');
    }
    actualizarActividad() {
        this.sessionData.set('ultimaActividad', new Date());
    }
    getSessionData() {
        return Object.fromEntries(this.sessionData);
    }
    setSessionData(clave, valor) {
        this.sessionData.set(clave, valor);
    }
}
export { AdminSession };
