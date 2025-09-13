const express = require("express");
const Administrador = require( '../models/Entidades/Administrador');

const router = express.Router();

// Datos de ejemplo para administradores
const administradores = [
    new Administrador('1', 'Admin Principal', 'admin@empresa.com', 'superadmin'),
    new Administrador('2', 'Admin Secundario', 'admin2@empresa.com', 'admin')
];

// Login de administrador
router.post('/login', (req, res) => {
    try {
        const { email, password } = req.body;
        
        const administrador = administradores.find(a => a.email === email);
        if (administrador) {
            const credenciales = new Map();
            credenciales.set('email', email);
            credenciales.set('password', password);
            
            const loginExitoso = administrador.login(credenciales);
            
            if (loginExitoso) {
                res.json({
                    exito: true,
                    mensaje: 'Login exitoso',
                    administrador: {
                        id: administrador.id,
                        nombre: administrador.nombre,
                        email: administrador.email,
                        rol: administrador.rol
                    }
                });
            } else {
                res.status(401).json({
                    exito: false,
                    mensaje: 'Credenciales inválidas'
                });
            }
        } else {
            res.status(404).json({
                exito: false,
                mensaje: 'Administrador no encontrado'
            });
        }
    } catch (error) {
        res.status(500).json({
            exito: false,
            mensaje: 'Error en el servidor: ' + error.message
        });
    }
});

// Logout de administrador
router.post('/logout', (req, res) => {
    try {
        const { administradorId } = req.body;
        
        const administrador = administradores.find(a => a.id === administradorId);
        if (administrador) {
            administrador.logout();
            res.json({
                exito: true,
                mensaje: 'Logout exitoso'
            });
        } else {
            res.status(404).json({
                exito: false,
                mensaje: 'Administrador no encontrado'
            });
        }
    } catch (error) {
        res.status(500).json({
            exito: false,
            mensaje: 'Error en el servidor: ' + error.message
        });
    }
});

// Generar reporte
router.post('/:id/reportes', (req, res) => {
    try {
        const { id } = req.params;
        const { tipo } = req.body;
        
        const administrador = administradores.find(a => a.id === id);
        if (administrador) {
            const reporte = administrador.generarReporte(tipo);
            res.json({
                exito: true,
                reporte: reporte
            });
        } else {
            res.status(404).json({
                exito: false,
                mensaje: 'Administrador no encontrado'
            });
        }
    } catch (error) {
        res.status(500).json({
            exito: false,
            mensaje: 'Error al generar reporte: ' + error.message
        });
    }
});

// Ver panel de control
router.get('/:id/panel', (req, res) => {
    try {
        const { id } = req.params;
        
        const administrador = administradores.find(a => a.id === id);
        if (administrador) {
            administrador.verPanelControl();
            res.json({
                exito: true,
                mensaje: 'Panel de control mostrado correctamente'
            });
        } else {
            res.status(404).json({
                exito: false,
                mensaje: 'Administrador no encontrado'
            });
        }
    } catch (error) {
        res.status(500).json({
            exito: false,
            mensaje: 'Error al mostrar panel: ' + error.message
        });
    }
});

module.exports = router;