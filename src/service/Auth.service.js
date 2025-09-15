const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const ENV = require("../config/ENV");
const Cliente = require("../models/Entidades/Cliente");
const Administrador = require("../models/Entidades/Administrador");

class AuthService {
  constructor() {
    // Simulamos una base de datos en memoria
    this.clientes = [];
    this.administradores = []
    this.nextId = 1;
    this.initTestData(); // Opcional: datos de prueba
  }

  // Inicializar con algunos datos de prueba (opcional)
  initTestData() {
    // Solo si no hay clientes, agregar algunos de prueba
    if (this.clientes.length === 0) {
      const hashedPassword = bcrypt.hashSync("123456", 10);
      
      const clientePrueba = new Cliente(
        1,
        "juan@ejemplo.com",
        hashedPassword,
        "Juan Pérez",
        "Calle 123 #45-67",
        "3001234567",
        "cliente"
      );

       const adminPrueba = new Administrador(
        1,
        "admin@ejemplo.com",
        hashedPassword,
        "Admin Principal",
        "Oficina Central",
        "3100000000",
        "admin" // 👈 rol admin
      );
      
      this.clientes.push(clientePrueba);
      this.administradores.push(adminPrueba);
      this.nextId = 2;
      
      
    }
  }

  async registrar(usuarioData) {
    const { nombre, email, password, direccion, telefono, rol } = usuarioData;

    // Verificar si el email ya existe
    const clienteExistente = this.clientes.find(c => c.email === email);
    const admiExistente = this.administradores.find( c=> c.email=== email );
    if (clienteExistente || admiExistente ) {
      throw new Error("El email ya está registrado");
    }

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    let nuevoUsuario;

    if (rol === 'admin'){
      nuevoUsuario = new Administrador(
        this.nextId++,
        email,
         hashedPassword,
        nombre,
        direccion || "",
        telefono || "",
        "admin"
      );
      this.administradores.push(nuevoUsuario)
    }else{
       nuevoUsuario = new Cliente(
        this.nextId++,
        email,
        hashedPassword,
        nombre,
        direccion || '',
        telefono || '',
        "cliente"
      );
  
      this.clientes.push(nuevoUsuario);

    }
    // Crear nuevo usuario
    return nuevoUsuario;
  }

  async login(email, password) {
    // Buscar en clientes y admi
    let usuario = this.clientes.find(c => c.email === email) ||
      this.administradores.find(a => a.email === email);
    
    if (!usuario) {
      throw new Error("Usuario no encontrado");
    }

    // Verificar contraseña
    const esValido = await bcrypt.compare(password, usuario.password);
    if (!esValido) {
      throw new Error("Contraseña incorrecta");
    }
    console.log(usuario.rol)
    // Generar token
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, rol: usuario.rol}, 
      ENV.JWT_SECRET, 
      { expiresIn: "2h" }
    );

    return { token, usuario };
  }

  verificarToken(token) {
    try {
      return jwt.verify(token, ENV.JWT_SECRET);
    } catch (error) {
      throw new Error("Token inválido o expirado");
    }
  }

 
  // Método para obtener todos los clientes (útil para debug)
  obtenerTodosLosClientes() {
    return this.clientes.map(c => c.getInfo());
  }
  obtenerTodosLosAdministradores() {
    return this.administradores.map(c => c.getInfo());
  }
}

module.exports = AuthService;