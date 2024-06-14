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
