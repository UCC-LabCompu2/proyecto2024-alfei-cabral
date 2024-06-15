/**
 * Muestra el modal con la información de contacto.
 * @method MostrarInfoDeContacto
 * @return {void}
 */
const MostrarInfoDeContacto = () => {
    // Obtener el modal por su clase
    const modal = document.querySelector(".modal");
    // Mostrar el modal estableciendo su estilo display a 'block'
    modal.style.display = "block";
}

/**
 * Cierra el modal con la información de contacto.
 * @method CerrarModal
 * @return {void}
 */
const CerrarModal = () => {
    // Obtener el modal por su clase
    const modal = document.querySelector(".modal");
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
const ManejarClickFueraDelModal = (event) => {
    // Obtener el modal por su clase
    const modal = document.querySelector(".modal");
    // Si el objetivo del clic es el modal (fondo oscurecido), cerrar el modal
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Obtener el botón que abre el modal
const btn = document.querySelector(".info_de_contacto");

// Obtener el elemento <span> que cierra el modal
const span = document.querySelector(".close");

// Cuando el usuario hace clic en el botón, abre el modal
btn.onclick = () => {
    MostrarInfoDeContacto();
}

// Cuando el usuario hace clic en <span> (x), cierra el modal
span.onclick = () => {
    CerrarModal();
}

// Cuando el usuario hace clic fuera del modal, lo cierra
window.onclick = (event) => {
    ManejarClickFueraDelModal(event);
}

let bandera = false;

const dibujar = (event) => {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");

    let posX = event.offsetX;
    let posY = event.offsetY;

    if (bandera) {
        ctx.fillRect(posX, posY, 5, 5);
    }
};

const cargarEventListener = () => {
    const canvas = document.getElementById("myCanvas");

    canvas.addEventListener('mousedown', () => {
        bandera = true;
    });

    canvas.addEventListener('mousemove', dibujar);

    canvas.addEventListener('mouseup', () => {
        bandera = false;
    });
}

const esCanvasVacio = () => {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    const canvasData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < canvasData.data.length; i += 4) {
        if (canvasData.data[i + 3] !== 0) { // Revisar el valor del canal alfa
            return false; // Hay algo dibujado en el canvas
        }
    }
    return true; // El canvas está vacío
}

/**
 * Confirma la reserva validando que se haya ingresado una firma en el canvas.
 * @method confirmarReserva
 * @return {void}
 */
const confirmarReserva = () => {
    if (esCanvasVacio()) {
        alert('Por favor, ingrese su firma antes de confirmar la reserva.');
    } else {
        window.location.href = 'finreserva.html'; // Redirige a la página de finalización de reserva
    }
}

const borrarCanvas = () => {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

/**
 * Valida el formulario de registro.
 * Previene el envío por defecto si alguna validación falla y muestra mensajes de error.
 * @param {Event} event - El evento de envío del formulario.
 * @returns {void}
 */
const ValidarRegistro = (event) => {
    event.preventDefault(); // Evitar el envío del formulario por defecto

    const nombre = document.getElementById('nombre');
    const apellido = document.getElementById('apellido');
    const emailRegistro = document.getElementById('emailRegistro');
    const passwordRegistro = document.getElementById('passwordRegistro');
    const confirmPassword = document.getElementById('confirmPassword');
    const telefono = document.getElementById('telefono');
    const tarjetaCredito = document.getElementById('tarjetaCredito');
    const codigoSeguridad = document.getElementById('codigoSeguridad');

    // Función para validar si un texto contiene solo letras (sin caracteres especiales)
    const contieneSoloLetras = (texto) => {
        return /^[a-zA-Z]+$/.test(texto);
    };

    // Función para validar si un texto contiene solo números
    const contieneSoloNumeros = (texto) => {
        return /^\d+$/.test(texto);
    };

    // Validación del nombre
    if (nombre.value.trim() === '') {
        alert('Por favor, ingrese su nombre.');
        return;
    } else if (!contieneSoloLetras(nombre.value.trim())) {
        alert('El nombre debe contener solo letras.');
        return;
    }

    // Validación del apellido
    if (apellido.value.trim() === '') {
        alert('Por favor, ingrese su apellido.');
        return;
    } else if (!contieneSoloLetras(apellido.value.trim())) {
        alert('El apellido debe contener solo letras.');
        return;
    }

    // Validación del correo electrónico
    if (emailRegistro.value.trim() === '') {
        alert('Por favor, ingrese su correo electrónico.');
        return;
    }

    // Validación de la contraseña
    if (passwordRegistro.value.trim() === '') {
        alert('Por favor, ingrese su contraseña.');
        return;
    } else if (passwordRegistro.value.trim().length < 6) {
        alert('La contraseña debe tener al menos 6 caracteres.');
        return;
    }

    // Validación de confirmación de contraseña
    if (confirmPassword.value.trim() === '' || confirmPassword.value.trim() !== passwordRegistro.value.trim()) {
        alert('Las contraseñas no coinciden. Por favor, inténtelo de nuevo.');
        return;
    }

    // Validación del número de teléfono
    if (telefono.value.trim() === '') {
        alert('Por favor, ingrese su número de teléfono.');
        return;
    } else if (!contieneSoloNumeros(telefono.value.trim())) {
        alert('El número de teléfono debe contener solo números.');
        return;
    }

    // Validación del número de tarjeta de crédito
    if (tarjetaCredito.value.trim() === '') {
        alert('Por favor, ingrese el número de su tarjeta de crédito.');
        return;
    } else if (!contieneSoloNumeros(tarjetaCredito.value.trim())) {
        alert('El número de tarjeta de crédito debe contener solo números.');
        return;
    } else if (tarjetaCredito.value.trim().length !== 16) {
        alert('El número de tarjeta de crédito debe tener exactamente 16 dígitos.');
        return;
    }

    // Validación del código de seguridad de la tarjeta de crédito
    if (codigoSeguridad.value.trim() === '') {
        alert('Por favor, ingrese el código de seguridad de su tarjeta de crédito.');
        return;
    } else if (codigoSeguridad.value.trim().length !== 3 || !contieneSoloNumeros(codigoSeguridad.value.trim())) {
        alert('El código de seguridad debe tener exactamente 3 dígitos y contener solo números.');
        return;
    }

    // Si todas las validaciones pasan, muestra un mensaje de éxito y reinicia los campos del formulario
    alert('Registro exitoso.');

    // Reiniciar valores de los campos del formulario
    nombre.value = '';
    apellido.value = '';
    emailRegistro.value = '';
    passwordRegistro.value = '';
    confirmPassword.value = '';
    telefono.value = '';
    tarjetaCredito.value = '';
    codigoSeguridad.value = '';
}

// Event listener para el formulario de registro
document.getElementById('registroForm').addEventListener('submit', ValidarRegistro);

// /**
//  * Muestra el modal con la información de contacto.
//  * @method MostrarInfoDeContacto
//  * @return {void}
//  */
// let MostrarInfoDeContacto = () => {
//     // Obtener el modal por su clase
//     var modal = document.querySelector(".modal");
//     // Mostrar el modal estableciendo su estilo display a 'block'
//     modal.style.display = "block";
// }
//
// /**
//  * Cierra el modal con la información de contacto.
//  * @method CerrarModal
//  * @return {void}
//  */
// let CerrarModal = () => {
//     // Obtener el modal por su clase
//     var modal = document.querySelector(".modal");
//     // Ocultar el modal estableciendo su estilo display a 'none'
//     modal.style.display = "none";
// }
//
// /**
//  * Maneja el evento de clic en la ventana para cerrar el modal
//  * si se hace clic fuera del contenido del modal.
//  * @method ManejarClickFueraDelModal
//  * @param {Event} event - El evento de clic que se produjo.
//  * @return {void}
//  */
// let ManejarClickFueraDelModal = (event) => {
//     // Obtener el modal por su clase
//     var modal = document.querySelector(".modal");
//     // Si el objetivo del clic es el modal (fondo oscurecido), cerrar el modal
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// }
//
// // Obtener el botón que abre el modal
// var btn = document.querySelector(".info_de_contacto");
//
// // Obtener el elemento <span> que cierra el modal
// var span = document.querySelector(".close");
//
// // Cuando el usuario hace clic en el botón, abre el modal
// btn.onclick = function() {
//     MostrarInfoDeContacto();
// }
//
// // Cuando el usuario hace clic en <span> (x), cierra el modal
// span.onclick = function() {
//     CerrarModal();
// }
//
// // Cuando el usuario hace clic fuera del modal, lo cierra
// window.onclick = function(event) {
//     ManejarClickFueraDelModal(event);
// }
//
// let bandera = false;
// let dibujar = (event) => {
//     const canvas = document.getElementById("myCanvas");
//     const ctx = canvas.getContext("2d");
//
//     let posX = event.offsetX;
//     let posY = event.offsetY;
//
//     if (bandera) {
//         ctx.fillRect(posX, posY, 5, 5);
//     }
// };
// let cargarEventListener = () => {
//     const canvas = document.getElementById("myCanvas");
//
//     canvas.addEventListener('mousedown', () => {
//         bandera = true;
//     });
//
//     canvas.addEventListener('mousemove', dibujar);
//
//     canvas.addEventListener('mouseup', () => {
//         bandera = false;
//     });
// }
// let esCanvasVacio = () => {
//     const canvas = document.getElementById("myCanvas");
//     const ctx = canvas.getContext("2d");
//     const canvasData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//
//     for (let i = 0; i < canvasData.data.length; i += 4) {
//         if (canvasData.data[i + 3] !== 0) { // Revisar el valor del canal alfa
//             return false; // Hay algo dibujado en el canvas
//         }
//     }
//     return true; // El canvas está vacío
// }
//
// /**
//  * Confirma la reserva validando que se haya ingresado una firma en el canvas.
//  * @method confirmarReserva
//  * @return {void}
//  */
// let confirmarReserva = () => {
//     if (esCanvasVacio()) {
//         alert('Por favor, ingrese su firma antes de confirmar la reserva.');
//     } else {
//         window.location.href = 'finreserva.html'; // Redirige a la página de finalización de reserva
//     }
// }
//
// let borrarCanvas = () => {
//     const canvas = document.getElementById("myCanvas");
//     const ctx = canvas.getContext("2d");
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
// }
// /**
//  * Valida el formulario de registro.
//  * Previene el envío por defecto si alguna validación falla y muestra mensajes de error.
//  * @param {Event} event - El evento de envío del formulario.
//  * @returns {void}
//  */
// let ValidarRegistro = (event) => {
//     event.preventDefault(); // Evitar el envío del formulario por defecto
//
//     const nombre = document.getElementById('nombre');
//     const apellido = document.getElementById('apellido');
//     const emailRegistro = document.getElementById('emailRegistro');
//     const passwordRegistro = document.getElementById('passwordRegistro');
//     const confirmPassword = document.getElementById('confirmPassword');
//     const telefono = document.getElementById('telefono');
//     const tarjetaCredito = document.getElementById('tarjetaCredito');
//     const codigoSeguridad = document.getElementById('codigoSeguridad');
//
//     // Función para validar si un texto contiene solo letras (sin caracteres especiales)
//     const contieneSoloLetras = (texto) => {
//         return /^[a-zA-Z]+$/.test(texto);
//     };
//
//     // Función para validar si un texto contiene solo números
//     const contieneSoloNumeros = (texto) => {
//         return /^\d+$/.test(texto);
//     };
//
//     // Validación del nombre
//     if (nombre.value.trim() === '') {
//         alert('Por favor, ingrese su nombre.');
//         return;
//     } else if (!contieneSoloLetras(nombre.value.trim())) {
//         alert('El nombre debe contener solo letras.');
//         return;
//     }
//
//     // Validación del apellido
//     if (apellido.value.trim() === '') {
//         alert('Por favor, ingrese su apellido.');
//         return;
//     } else if (!contieneSoloLetras(apellido.value.trim())) {
//         alert('El apellido debe contener solo letras.');
//         return;
//     }
//
//     // Validación del correo electrónico
//     if (emailRegistro.value.trim() === '') {
//         alert('Por favor, ingrese su correo electrónico.');
//         return;
//     }
//
//     // Validación de la contraseña
//     if (passwordRegistro.value.trim() === '') {
//         alert('Por favor, ingrese su contraseña.');
//         return;
//     } else if (passwordRegistro.value.trim().length < 6) {
//         alert('La contraseña debe tener al menos 6 caracteres.');
//         return;
//     }
//
//     // Validación de confirmación de contraseña
//     if (confirmPassword.value.trim() === '' || confirmPassword.value.trim() !== passwordRegistro.value.trim()) {
//         alert('Las contraseñas no coinciden. Por favor, inténtelo de nuevo.');
//         return;
//     }
//
//     // Validación del número de teléfono
//     if (telefono.value.trim() === '') {
//         alert('Por favor, ingrese su número de teléfono.');
//         return;
//     } else if (!contieneSoloNumeros(telefono.value.trim())) {
//         alert('El número de teléfono debe contener solo números.');
//         return;
//     }
//
//     // Validación del número de tarjeta de crédito
//     if (tarjetaCredito.value.trim() === '') {
//         alert('Por favor, ingrese el número de su tarjeta de crédito.');
//         return;
//     } else if (!contieneSoloNumeros(tarjetaCredito.value.trim())) {
//         alert('El número de tarjeta de crédito debe contener solo números.');
//         return;
//     } else if (tarjetaCredito.value.trim().length !== 16) {
//         alert('El número de tarjeta de crédito debe tener exactamente 16 dígitos.');
//         return;
//     }
//
//     // Validación del código de seguridad de la tarjeta de crédito
//     if (codigoSeguridad.value.trim() === '') {
//         alert('Por favor, ingrese el código de seguridad de su tarjeta de crédito.');
//         return;
//     } else if (codigoSeguridad.value.trim().length !== 3 || !contieneSoloNumeros(codigoSeguridad.value.trim())) {
//         alert('El código de seguridad debe tener exactamente 3 dígitos y contener solo números.');
//         return;
//     }
//
//     // Si todas las validaciones pasan, muestra un mensaje de éxito y reinicia los campos del formulario
//     alert('Registro exitoso.');
//
//     // Reiniciar valores de los campos del formulario
//     nombre.value = '';
//     apellido.value = '';
//     emailRegistro.value = '';
//     passwordRegistro.value = '';
//     confirmPassword.value = '';
//     telefono.value = '';
//     tarjetaCredito.value = '';
//     codigoSeguridad.value = '';
// }
//
// // Event listener para el formulario de registro
// document.getElementById('registroForm').addEventListener('submit', ValidarRegistro);
//
