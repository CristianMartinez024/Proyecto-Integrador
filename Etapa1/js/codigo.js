class Cliente {
    constructor(id, nombre, apellido, dni, email, password) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.email = email;
        this.password = password;
    }
}

class Cuenta {
    constructor(codigo, saldoInicial, clienteId) {
        this.codigo = codigo;
        this.saldo = saldoInicial;
        this.clienteId = clienteId;
        this.movimientos = [];
    }

    depositar(monto) {
        this.saldo += monto;
        this.movimientos.push(new Movimiento("depósito", monto, new Date()));
    }

    retirar(monto) {
        if (monto <= this.saldo) {
            this.saldo -= monto;
            this.movimientos.push(new Movimiento("retiro", monto, new Date()));
        } else {
            console.log("Fondos insuficientes");
        }
    }
}

class Movimiento {
    constructor(tipo, monto, fecha) {
        this.tipo = tipo;
        this.monto = monto;
        this.fecha = fecha;
    }
}

class SistemaFintech {
    constructor() {
        this.clientes = [];
        this.cuentas = [];
    }

    crearCliente(id, nombre, apellido, dni, email, password) {
        const cliente = new Cliente(id, nombre, apellido, dni, email, password);
        this.clientes.push(cliente);
        return cliente;
    }

    crearCuenta(codigo, saldoInicial, clienteId) {
        const cuenta = new Cuenta(codigo, saldoInicial, clienteId);
        this.cuentas.push(cuenta);
        return cuenta;
    }

    buscarCuentaPorCodigo(codigo) {
        return this.cuentas.find(cuenta => cuenta.codigo === codigo);
    }
}

const sistema = new SistemaFintech();

function crearCliente() {
    const id = sistema.clientes.length + 1;
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const dni = document.getElementById("dni").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    sistema.crearCliente(id, nombre, apellido, dni, email, password);
    alert("Cliente creado exitosamente");
}

function crearCuenta() {
    const codigo = document.getElementById("codigoCuenta").value;
    const saldoInicial = parseFloat(document.getElementById("saldoInicial").value);
    const clienteId = 1; // ID fijo de ejemplo

    sistema.crearCuenta(codigo, saldoInicial, clienteId);
    alert("Cuenta creada exitosamente");
}

function realizarMovimiento() {
    const codigoCuenta = document.getElementById("codigoCuentaMovimiento").value;
    const monto = parseFloat(document.getElementById("monto").value);
    const tipo = document.getElementById("tipoMovimiento").value;
    const cuenta = sistema.buscarCuentaPorCodigo(codigoCuenta);

    if (cuenta) {
        tipo === "depósito" ? cuenta.depositar(monto) : cuenta.retirar(monto);
        alert(`Movimiento de ${tipo} realizado`);
    } else {
        alert("Cuenta no encontrada");
    }
}

function consultarSaldo() {
    const codigoCuenta = document.getElementById("codigoCuentaConsulta").value;
    const cuenta = sistema.buscarCuentaPorCodigo(codigoCuenta);

    if (cuenta) {
        document.getElementById("resultadoSaldo").innerText = `Saldo actual: ${cuenta.saldo}`;
    } else {
        document.getElementById("resultadoSaldo").innerText = "Cuenta no encontrada";
    }
}
