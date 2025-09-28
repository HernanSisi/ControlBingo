//* Formateo de inputs de monto
function formatoMonto(input) {
    // Quitamos todo lo que no sea número
        let valor = input.value.replace(/\D/g, "");
        if (valor) {
            // Formateamos con separador de miles estilo Argentina/Latam
            valor = new Intl.NumberFormat("es-AR").format(valor);
            input.value = "$" + valor;
        } else {
            input.value = "";
        }
}

const inputs = document.getElementsByClassName("monto");
for (let input of inputs) {
    input.addEventListener("input", () => {
        formatoMonto(input);
    }); 
    formatoMonto(input); // Formateamos al cargar la página
}

//* Historial de numeros

function agregarNumeroAlHistorial(numero) {
    const historial = document.getElementById("historial");
    const nuevoNumero = document.createElement("div");
    nuevoNumero.classList.add("numero-historico");
    nuevoNumero.textContent = numero;
    historial.prepend(nuevoNumero);
    // Limitar a los últimos 15 números
    while (historial.children.length > 15) {
        historial.removeChild(historial.lastChild);
    }
}
function removerDelHistorial(numero) {
    const historial = document.getElementById("historial");
    const numerosHistorico = historial.getElementsByClassName("numero-historico");
    for (let numDiv of numerosHistorico) {
        if (numDiv.textContent === numero) {
            historial.removeChild(numDiv);
            break;
        }
    }
}

function actualizarUltimoNumero(numero) {
    const ultimoNumeroDiv = document.getElementById("ultimo-numero");
    ultimoNumeroDiv.textContent = numero;
}

//* Cambiar estado de numero

function cambiarEstadoNumero(numeroDiv) {
    if (numeroDiv.classList.contains("numero-sin-salir")) {
        numeroDiv.classList.remove("numero-sin-salir");
        numeroDiv.classList.add("numero-que-salio");
        agregarNumeroAlHistorial(numeroDiv.textContent);
        actualizarUltimoNumero(numeroDiv.textContent);
    } else if (numeroDiv.classList.contains("numero-que-salio")) {
        numeroDiv.classList.remove("numero-que-salio");
        numeroDiv.classList.add("numero-sin-salir");
        removerDelHistorial(numeroDiv.textContent);
        if (document.getElementById("ultimo-numero").textContent === numeroDiv.textContent) {
            const historial = document.getElementById("historial");
            if (historial.firstChild) {
                actualizarUltimoNumero(historial.firstChild.textContent);
            } else {
                actualizarUltimoNumero("");
            }
        }
    }
}

//? Asignar eventos a los numeros
const numeros = document.getElementsByClassName("numero");
for (let numero of numeros) {
    numero.addEventListener("click", () => {
        cambiarEstadoNumero(numero);
    });
}

//* Reiniciar jugada

function reiniciarJugada() {
    const numeros = document.getElementsByClassName("numero");
    for (let numero of numeros) {
        numero.classList.remove("numero-que-salio");
        numero.classList.add("numero-sin-salir");
    }
    document.getElementById("historial").innerHTML = "";
    document.getElementById("ultimo-numero").textContent = "";
}
document.getElementById("boton-reinicio").addEventListener("click", reiniciarJugada);


