function guardarConfiguracion() {
    const tituloPrincipal = document.getElementById('titulo-principal').value;
    const logoIzquierdaInput = document.getElementById('Logo-Izquierda');
    const logoDerechaInput = document.getElementById('Logo-Derecha');
    const mostrarInfoJuego = document.getElementById('activador-informacion-juego').checked;
}





const imgIzq = document.getElementById("inputFile");
const preview = document.getElementById("preview");

imgIzq.addEventListener("change", function () {
    const file = imgIzq.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const base64Image = e.target.result;

        // Guardar en localStorage
        localStorage.setItem("miImagen", base64Image);

        // Mostrar en <img>
        preview.src = base64Image;
    };

    reader.readAsDataURL(file); // Convierte la imagen a Base64
});

// Recuperar al recargar la página
window.addEventListener("load", () => {
    const data = localStorage.getItem("miImagen");
    if (data) {
        preview.src = data;
    }
});