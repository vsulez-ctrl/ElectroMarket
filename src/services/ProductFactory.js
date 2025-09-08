// services/ProductFactory.js
export class ProductCreator {
    createProduct() {
        throw new Error('Método abstracto createProduct() debe ser implementado');
    }
    manageProduct() {
        const product = this.createProduct();
        console.log(`Producto creado: ${product.getNombre()}`);
        product.validarDatos();
        return product;
    }
}
export class ArduinoCreator extends ProductCreator {
    createProduct() {
        return new ArduinoProduct();
    }
}
export class SensorCreator extends ProductCreator {
    createProduct() {
        return new SensorProduct();
    }
}
class Product {
    getId() { throw new Error('Método abstracto'); }
    getNombre() { throw new Error('Método abstracto'); }
    getPrecio() { throw new Error('Método abstracto'); }
    validarDatos() { throw new Error('Método abstracto'); }
    getEspecificaciones() { throw new Error('Método abstracto'); }
}
class ArduinoProduct extends Product {
    constructor() {
        super();
        this.id = 1;
        this.nombre = 'Arduino Uno R3';
        this.precio = 25.99;
        this.modelo = 'Uno R3';
        this.voltaje = '5V';
    }
    getId() { return this.id; }
    getNombre() { return this.nombre; }
    getPrecio() { return this.precio; }
    validarDatos() {
        console.log('Validando datos de Arduino...');
        return this.precio > 0 && this.modelo !== '';
    }
    getEspecificaciones() {
        return {
            modelo: this.modelo,
            voltaje: this.voltaje,
            compatibilidad: ['Windows', 'Linux', 'MacOS']
        };
    }
}
class SensorProduct extends Product {
    constructor() {
        super();
        this.id = 2;
        this.nombre = 'Sensor Temperatura DHT22';
        this.precio = 12.50;
        this.tipoSensor = 'Temperatura/Humedad';
        this.unidadMedida = '°C';
    }
    getId() { return this.id; }
    getNombre() { return this.nombre; }
    getPrecio() { return this.precio; }
    validarDatos() {
        console.log('Validando datos de Sensor...');
        return this.precio > 0 && this.tipoSensor !== '';
    }
    getEspecificaciones() {
        return {
            tipoSensor: this.tipoSensor,
            unidadMedida: this.unidadMedida,
            rango: '-40°C a 80°C'
        };
    }
}
export class ProductApplication {
    constructor() {
        this.creator = null;
    }
    initialize(tipoProducto) {
        if (tipoProducto === "arduino") {
            this.creator = new ArduinoCreator();
        } else if (tipoProducto === "sensor") {
            this.creator = new SensorCreator();
        } else {
            throw new Error("Error! Tipo de producto desconocido.");
        }
    }
    main(tipoProducto) {
        this.initialize(tipoProducto);
        return this.creator.manageProduct();
    }
}
