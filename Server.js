const ENV = require('./src/config/ENV')
const app = require('./src/App');
const EmailService = require('./src/Servicios/Email.service');

async function inicializarServicios() {
    const emailService = new EmailService();
    const correoConfigurado = await emailService.verificarConexion();
    
    if (correoConfigurado) {
        console.log('📧 Servicio de correo: CONFIGURADO ✓');
    } else {
        console.log('⚠️ Servicio de correo: NO CONFIGURADO - Los códigos no se enviarán');
    }
}

inicializarServicios();

app.listen(ENV.PORT, () => console.log(`Servidor corriendo en puerto ${ENV.PORT}`));

app.listen(ENV.PORT, () => console.log("🌐 Frontend disponible en: http://localhost:3000"));
