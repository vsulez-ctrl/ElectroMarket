const ENV = require('./src/config/ENV')
const app = require('./src/App');

app.get('/', (req, res) => {
    const html = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Sistema de Gestión con Patrones</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; 
                   background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #333; min-height: 100vh; }
            .container { max-width: 1200px; margin: 0 auto; background: white; 
                        padding: 30px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
            .header { text-align: center; margin-bottom: 40px; padding-bottom: 20px; border-bottom: 2px solid #eee; }
            .header h1 { color: #667eea; font-size: 2.8em; margin-bottom: 10px; }
            .header p { color: #666; font-size: 1.3em; }
            .card { background: #f8f9fa; padding: 25px; margin: 20px 0; border-radius: 12px; border-left: 5px solid; }
            .card:hover { transform: translateY(-5px); }
            .card h3 { margin-top: 0; display: flex; align-items: center; gap: 10px; }
            .singleton { border-left-color: #ff6b6b; background: #fff5f5; }
            .strategy { border-left-color: #4ecdc4; background: #f0f9ff; }
            .factory { border-left-color: #ffd166; background: #fffaf0; }
            .composite { border-left-color: #6a0572; background: #f8f0ff; }
            .patron-info { margin: 15px 0; padding: 15px; background: white; border-radius: 8px; border-left: 3px solid #ddd; }
            .beneficios { background: #e8f5e8; border-left: 3px solid #4caf50; }
            .implementacion { background: #e3f2fd; border-left: 3px solid #2196f3; }
            .status { text-align: center; margin-top: 40px; padding: 20px; background: #4caf50; 
                     color: white; border-radius: 10px; font-weight: bold; font-size: 1.1em; }
            .badge { background: #667eea; color: white; padding: 5px 12px; border-radius: 20px; font-size: 0.9em; font-weight: bold; }
            .codigo { background: #2d2d2d; color: #f8f8f2; padding: 15px; border-radius: 8px; font-family: monospace; margin: 10px 0; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🚀 Sistema de Gestión con Patrones</h1>
                <p>Implementando patrones de diseño en código real</p>
            </div>

            <div class="card singleton">
                <h3>🎯 Singleton - SesionAdministrador</h3>
                <div class="patron-info">
                    <p><strong>Archivo:</strong> modelos/patrones/singleton/SesionAdministrador.js</p>
                    <p><strong>Propósito:</strong> Una única instancia global para gestionar sesiones</p>
                </div>
                <div class="patron-info implementacion">
                    <p><strong>🔧 Cómo se usó:</strong> En Administrador.js para gestionar el estado de sesión</p>
                    <div class="codigo">
// En Administrador.js:<br>
this.sesion = SesionAdministrador.getInstancia();<br>
this.sesion.setSessionData('usuarioId', this.id);
                    </div>
                </div>
            </div>

            <div class="card strategy">
                <h3>🎯 Strategy - Reportes Intercambiables</h3>
                <div class="patron-info">
                    <p><strong>Archivos:</strong> modelos/patrones/estrategia/ReporteVentas.js, ReporteInventario.js</p>
                    <p><strong>Propósito:</strong> Intercambiar algoritmos de reportes en tiempo de ejecución</p>
                </div>
                <div class="patron-info implementacion">
                    <p><strong>🔧 Cómo se usó:</strong> En rutasReporte.js para generar diferentes tipos de reportes</p>
                    <div class="codigo">
// En rutasReporte.js:<br>
let estrategia;<br>
switch(tipo) {<br>
&nbsp;&nbsp;case 'ventas': estrategia = new ReporteVentas(); break;<br>
&nbsp;&nbsp;case 'inventario': estrategia = new ReporteInventario(); break;<br>
}
                    </div>
                </div>
            </div>

            <div class="card factory">
                <h3>🎯 Factory Method - FabricaProducto</h3>
                <div class="patron-info">
                    <p><strong>Archivo:</strong> modelos/patrones/fabrica/FabricaProducto.js</p>
                    <p><strong>Propósito:</strong> Crear diferentes tipos de productos de manera centralizada</p>
                </div>
                <div class="patron-info implementacion">
                    <p><strong>🔧 Cómo se usó:</strong> En Administrador.js para la creación de productos</p>
                    <div class="codigo">
// En Administrador.js:<br>
this.fabrica = new FabricaProducto();<br>
// En rutasProducto.js se usa para crear productos específicos
                    </div>
                </div>
            </div>

            <div class="card composite">
                <h3>🎯 Composite - Estructura de Rutas</h3>
                <div class="patron-info">
                    <p><strong>Archivos:</strong> rutas/rutasAdministrador.js, rutasProducto.js, rutasReporte.js</p>
                    <p><strong>Propósito:</strong> Estructura modular y escalable de endpoints</p>
                </div>
                <div class="patron-info implementacion">
                    <p><strong>🔧 Cómo se usó:</strong> En app.js para montar todas las rutas modularmente</p>
                    <div class="codigo">
// En app.js:<br>
app.use('/administradores', rutasAdministrador);<br>
app.use('/productos', rutasProducto);<br>
app.use('/reportes', rutasReporte);
                    </div>
                </div>
            </div>

            <div class="card">
                <h3>🌐 Endpoints Reales Implementados</h3>
                <p><strong>Administradores:</strong> /administradores <span class="badge">Gestiona sesiones Singleton</span></p>
                <p><strong>Productos:</strong> /productos <span class="badge">Usa Factory Method</span></p>
                <p><strong>Reportes:</strong> /reportes/generar/:tipo <span class="badge">Strategy Pattern</span></p>
            </div>

            <div class="status">
                ✅ Sistema operativo con patrones implementados en código real
            </div>
        </div>
    </body>
    </html>
    `;
    
    res.send(html);
});

// Manejo de errores 404
app.use('*', (req, res) => {
    res.status(404).json({
        exito: false,
        mensaje: 'Ruta no encontrada',
        sugerencia: 'Accede a la ruta principal / para ver la documentación'
    });
});


app.listen(ENV.PORT, () => console.log(`Servidor corriendo en puerto ${ENV.PORT}`));


