/**
 * Muestra el modal con la información de contacto.
 * @method MostrarInfoDeContacto
 * @return {void}
 */
let MostrarInfoDeContacto = () => {
    // Obtener el modal por su clase
    var modal = document.querySelector(".modal");
    // Mostrar el modal estableciendo su estilo display a 'block'
    modal.style.display = "block";
}

/**
 * Cierra el modal con la información de contacto.
 * @method CerrarModal
 * @return {void}
 */
let CerrarModal = () => {
    // Obtener el modal por su clase
    var modal = document.querySelector(".modal");
    // Ocultar el modal estableciendo su estilo display a 'none'
    modal.style.display = "none";
}

/**
 * Maneja el evento de clic en la ventana para cerrar el modal
 * si se hace clic fuera del contenido del modal.
 * @method ManejarClickFueraDelModal
 * @param {Event} event - El evento de clic que se produjo.
 * @return {void}
 */
let ManejarClickFueraDelModal = (event) => {
    // Obtener el modal por su clase
    var modal = document.querySelector(".modal");
    // Si el objetivo del clic es el modal (fondo oscurecido), cerrar el modal
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Obtener el botón que abre el modal
var btn = document.querySelector(".info_de_contacto");

// Obtener el elemento <span> que cierra el modal
var span = document.querySelector(".close");

// Cuando el usuario hace clic en el botón, abre el modal
btn.onclick = function() {
    MostrarInfoDeContacto();
}

// Cuando el usuario hace clic en <span> (x), cierra el modal
span.onclick = function() {
    CerrarModal();
}

// Cuando el usuario hace clic fuera del modal, lo cierra
window.onclick = function(event) {
    ManejarClickFueraDelModal(event);
}
let bandera=false;

let dibujar = (event) => {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");

    // Obtener la posición del canvas en la página
    let rect = canvas.getBoundingClientRect();

    // Calcular las coordenadas del ratón ajustadas al canvas
    let posX = event.clientX - rect.left;
    let posY = event.clientY - rect.top;

    if (bandera) {
        ctx.fillRect(posX, posY, 5, 5);
    }
};

function cargarEventListener() {
    const canvas = document.getElementById("myCanvas");

    canvas.addEventListener('mousedown', () => {
        bandera = true;
    });

    canvas.addEventListener('mousemove', dibujar);

    canvas.addEventListener('mouseup', () => {
        bandera = false;
    });
}

function borrarCanvas() {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

window.onload = cargarEventListener;