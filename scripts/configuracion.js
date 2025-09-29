//% Previsualizar logos al seleccionarlos
const imgIzq = document.getElementById("Logo-Izquierda");
imgIzq.addEventListener("change", function () {
    const file = imgIzq.files[0];
    if (file.size > 2 * 1024 * 1024) {
        alert("El archivo es demasiado grande. El tamaño máximo permitido es de 2 MB.");
        imgIzq.value = ""; // Limpiar el input
        return;
    }
    const reader = new FileReader();
    reader.onload = function (e) {
        const base64Image = e.target.result;
        document.getElementById("previsualizar-izquierda").src = base64Image;
    };
    reader.readAsDataURL(file);
});
const imgDer = document.getElementById("Logo-Derecha");
imgDer.addEventListener("change", function () {
    const file = imgDer.files[0];
    if (file.size > 2 * 1024 * 1024) {
        alert("El archivo es demasiado grande. El tamaño máximo permitido es de 2 MB.");
        imgIzq.value = ""; // Limpiar el input
        return;
    }
    const reader = new FileReader();
    reader.onload = function (e) {
        const base64Image = e.target.result;
        document.getElementById("previsualizar-Derecha").src = base64Image;
    };
    reader.readAsDataURL(file);
});

//% Recuperar configuracion previa al cargar la página
window.addEventListener("load", () => {
    data = localStorage.getItem("LogoIzquierda");
    if (data) document.getElementById("previsualizar-izquierda").src = data;
    data = localStorage.getItem("LogoDerecha");
    if (data) document.getElementById("previsualizar-Derecha").src = data;
    data = localStorage.getItem("titulo-principal");
    if (data !== null) document.getElementById("titulo-principal").value = data;
    data = localStorage.getItem("mostrar-informacion-juego");
    if (data === 'true') {
        document.getElementById("activador-informacion-juego").checked = true;
    } else {
        document.getElementById("activador-informacion-juego").checked = false;
    }
});

//% Guardar configuracion en localStorage al enviar el formulario
document.getElementById('form-configuracion').addEventListener("submit", function(event) {
    event.preventDefault();
    localStorage.setItem("titulo-principal", document.getElementById('titulo-principal').value);
    localStorage.setItem("mostrar-informacion-juego",document.getElementById('activador-informacion-juego').checked);
    //! Guardar logo Izquierda
    imagen = document.getElementById('Logo-Izquierda');
    if (imagen.files.length > 0) {
        const lectorIzq = new FileReader();
        lectorIzq.onload = function (e) {
            const base64Image = e.target.result;
            localStorage.setItem("LogoIzquierda", base64Image);
        };
        lectorIzq.readAsDataURL(imagen.files[0]);
    }
    
    //! Guardar logo Derecha
    imagen = document.getElementById('Logo-Derecha');
    if (imagen.files.length > 0) {
        const lectorDer = new FileReader();
        lectorDer.onload = function (e) {
            const base64Image = e.target.result;
            localStorage.setItem("LogoDerecha", base64Image);
        };
        lectorDer.readAsDataURL(imagen.files[0]);
    }
    alert("La configuracion se guardo correctamente.");
});
