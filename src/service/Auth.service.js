const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const ENV = require("../config/ENV");
const Cliente = require("../models/Entidades/Cliente");

class AuthService {
  constructor() {
    // Simulamos una base de datos en memoria
    this.clientes = [];
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
        "3001234567"
      );
      
      this.clientes.push(clientePrueba);
      this.nextId = 2;
      
      console.log("Cliente de prueba creado: juan@ejemplo.com / 123456");
    }
  }

  async registrar(clienteData) {
    const { nombre, email, password, direccion, telefono } = clienteData;

    // Verificar si el email ya existe
    const clienteExistente = this.clientes.find(c => c.email === email);
    if (clienteExistente) {
      throw new Error("El email ya está registrado");
    }

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Crear nuevo cliente
    const nuevoCliente = new Cliente(
      this.nextId++,
      email,
      hashedPassword,
      nombre,
      direccion || '',
      telefono || ''
    );

    this.clientes.push(nuevoCliente);
    return nuevoCliente;
  }

  async login(email, password) {
    // Buscar cliente por email
    const cliente = this.clientes.find(c => c.email === email);
    if (!cliente) {
      throw new Error("Cliente no encontrado");
    }

    // Verificar contraseña
    const esValido = await bcrypt.compare(password, cliente.password);
    if (!esValido) {
      throw new Error("Contraseña incorrecta");
    }

    // Generar token
    const token = jwt.sign(
      { id: cliente.id, email: cliente.email }, 
      ENV.JWT_SECRET, 
      { expiresIn: "1h" }
    );

    return { token, usuario: cliente };
  }

  verificarToken(token) {
    try {
      return jwt.verify(token, ENV.JWT_SECRET);
    } catch (error) {
      throw new Error("Token inválido o expirado");
    }
  }

  // Método para obtener cliente por ID (útil para debug)
  obtenerClientePorId(id) {
    return this.clientes.find(c => c.id === parseInt(id));
  }

  // Método para obtener todos los clientes (útil para debug)
  obtenerTodosLosClientes() {
    return this.clientes.map(c => c.getInfo());
  }
}

module.exports = AuthService;