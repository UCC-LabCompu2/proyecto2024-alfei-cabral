/**
 * Muestra la información de contacto en un modal.
 * @method MostrarInfoDeContacto
 */
const MostrarInfoDeContacto = () => {
    const modal = document.querySelector(".modal");
    modal.style.display = "block";
}
/**
 * Cierra el modal de información de contacto.
 * @method CerrarModal
 */
const CerrarModal = () => {
    const modal = document.querySelector(".modal");
    modal.style.display = "none";
}
/**
 * Maneja el evento de hacer clic fuera del modal para cerrarlo.
 * @method ManejarClickFueraDelModal
 * @param {Event} event - El evento de clic.
 */
const ManejarClickFueraDelModal = (event) => {
    const modal = document.querySelector(".modal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

/**
 * Valida si todos los campos obligatorios del formulario de reserva están completos.
 * Habilita o deshabilita el botón de alquiler en función de la validación.
 * @method validarCampos
 */
const validarCampos = () => {
    const ciudad = document.getElementById('ciudadIndex').value;
    const deporte = document.getElementById('deporteIndex').value;
    const dia = document.getElementById('dia').value;
    const hora = document.getElementById('hora').value;
    const botonAlquila = document.getElementById('alquiler');
    if (ciudad && deporte && dia && hora) {
        botonAlquila.removeAttribute('disabled');
        botonAlquila.style.opacity = 1;
    } else {
        botonAlquila.setAttribute('disabled', 'disabled');
        botonAlquila.style.opacity = 0.5;
    }
}
/**
 * Maneja el clic en el botón de alquiler para guardar los datos seleccionados en localStorage.
 * @method manejarAlquilerClick
 * @param {Event} event - El evento de clic.
 */
const manejarAlquilerClick = (event) => {
    if (document.getElementById('alquiler').hasAttribute('disabled')) {
        event.preventDefault(); // Evita la redirección si el botón está deshabilitado
        return;
    }
    const horario = document.getElementById('hora').value;
    const fecha = document.getElementById('dia').value;
    const ciudad = document.getElementById('ciudadIndex').value;
    const deporte = document.getElementById('deporteIndex').value;
    localStorage.setItem('horarioReserva', horario);
    localStorage.setItem('ciudadReserva', ciudad);
    localStorage.setItem('fechaReserva', fecha);
    localStorage.setItem('deporteReserva', deporte);

    window.location.href = 'Alquiler.html';
}
let bandera ;
/**
 * Dibuja en el canvas cuando el ratón está presionado.
 * @method dibujar
 * @param {MouseEvent} event - El evento de movimiento del ratón.
 */
const dibujar = (event) => {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");

    let posX = event.offsetX;
    let posY = event.offsetY;

    if (bandera) {
        ctx.fillRect(posX, posY, 5, 5);
    }
};
/**
 * Verifica si el canvas está vacío.
 * @method esCanvasVacio
 * @returns {boolean} - Devuelve true si el canvas está vacío, false en caso contrario.
 */
const esCanvasVacio = () => {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    const canvasData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < canvasData.data.length; i += 4) {
        if (canvasData.data[i + 3] !== 0) {
            return false;
        }
    }
    return true;
}
/**
 * Confirma la reserva verificando que el canvas no esté vacío.
 * Redirige a la página de finalización de reserva si la firma está presente.
 * @method confirmarReserva
 */
const confirmarReserva = () => {
    if (esCanvasVacio()) {
        alert('Por favor, ingrese su firma antes de confirmar la reserva.');
    } else {
        window.location.href = 'finreserva.html';
    }
}
/**
 * Borra el contenido del canvas.
 * @method borrarCanvas
 */
const borrarCanvas = () => {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
/**
 * Valida si un correo electrónico tiene un formato correcto.
 * @method validarEmail
 * @param {string} email - El correo electrónico a validar.
 * @returns {boolean} - Devuelve true si el correo electrónico es válido, false en caso contrario.
 */
const validarEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
/**
 * Valida el formulario de registro, muestra mensajes de error cuando se ingresan datos invalidos.
 * @method ValidarRegistro
 * @param {Event} event - El evento de submit del formulario.
 */
const ValidarRegistro = (event) => {
    event.preventDefault();
    const nombre = document.getElementById('nombre');
    const apellido = document.getElementById('apellido');
    const emailRegistro = document.getElementById('emailRegistro');
    const passwordRegistro = document.getElementById('passwordRegistro');
    const confirmPassword = document.getElementById('confirmPassword');
    const telefono = document.getElementById('telefono');
    const tarjetaCredito = document.getElementById('tarjetaCredito');
    const codigoSeguridad = document.getElementById('codigoSeguridad');

    const contieneSoloLetras = (texto) => /^[a-zA-Z]+$/.test(texto);
    const contieneSoloNumeros = (texto) => /^\d+$/.test(texto);

    if (nombre.value.trim() === '') {
        alert('Por favor, ingrese su nombre.');
        return;
    } else if (!contieneSoloLetras(nombre.value.trim())) {
        alert('El nombre debe contener solo letras.');
        nombre.value = '';
        return;
    }

    if (apellido.value.trim() === '') {
        alert('Por favor, ingrese su apellido.');
        return;
    } else if (!contieneSoloLetras(apellido.value.trim())) {
        alert('El apellido debe contener solo letras.');
        apellido.value = '';
        return;
    }
    if (emailRegistro.value.trim() === '') {
        alert('Por favor, ingrese su correo electrónico.');
        return;
    } else if (!validarEmail(emailRegistro.value.trim())) {
        alert('Por favor, ingrese un correo electrónico válido.');
        emailRegistro.value = '';
        return;
    }
    if (passwordRegistro.value.trim() === '') {
        alert('Por favor, ingrese su contraseña.');
        return;
    } else if (passwordRegistro.value.trim().length < 6) {
        alert('La contraseña debe tener al menos 6 caracteres.');
        passwordRegistro.value = '';
        confirmPassword.value = '';
        return;
    }

    if (confirmPassword.value.trim() === '' || confirmPassword.value.trim() !== passwordRegistro.value.trim()) {
        alert('Las contraseñas no coinciden. Por favor, inténtelo de nuevo.');
        confirmPassword.value = '';
        passwordRegistro.value = '';
        return;
    }

    if (telefono.value.trim() === '') {
        alert('Por favor, ingrese su número de teléfono.');
        return;
    } else if (!contieneSoloNumeros(telefono.value.trim())) {
        alert('El número de teléfono debe contener solo números.');
        telefono.value = '';
        return;
    }

    if (tarjetaCredito.value.trim() === '') {
        alert('Por favor, ingrese el número de su tarjeta de crédito.');
        return;
    } else if (!contieneSoloNumeros(tarjetaCredito.value.trim())) {
        alert('El número de tarjeta de crédito debe contener solo números.');
        tarjetaCredito.value = '';
        return;
    } else if (tarjetaCredito.value.trim().length !== 12 &&
        tarjetaCredito.value.trim().length !== 16 &&
        tarjetaCredito.value.trim().length !== 18) {
        alert('El número de tarjeta de crédito debe tener 12, 16 o 18 dígitos.');
        tarjetaCredito.value = '';
        return;
    }

    if (codigoSeguridad.value.trim() === '') {
        alert('Por favor, ingrese el código de seguridad de su tarjeta de crédito.');
        return;
    } else if (codigoSeguridad.value.trim().length !== 3 &&
        codigoSeguridad.value.trim().length !== 4 ||
        !contieneSoloNumeros(codigoSeguridad.value.trim())) {
        alert('El código de seguridad debe tener 3 o 4 dígitos y contener solo números.');
        codigoSeguridad.value = '';
        return;
    }
    alert('Registro exitoso.');
    nombre.value = '';
    apellido.value = '';
    emailRegistro.value = '';
    passwordRegistro.value = '';
    confirmPassword.value = '';
    telefono.value = '';
    tarjetaCredito.value = '';
    codigoSeguridad.value = '';
    window.location.href = 'Index.html';
}
const validarInicioSesion = (event) => {
    event.preventDefault();
    const emailInicioSesion = document.getElementById('email');
    const passwordInicioSesion = document.getElementById('password');

    if (emailInicioSesion.value.trim() === '') {
        alert('Por favor, ingrese su correo electrónico.');
        return;
    } else if (!validarEmail(emailInicioSesion.value.trim())) {
        alert('Por favor, ingrese un correo electrónico válido.');
        emailInicioSesion.value = '';
        return;
    }
    if (passwordInicioSesion.value.trim() === '') {
        alert('Por favor, ingrese su contraseña.');
        return;
    } else if (passwordInicioSesion.value.trim().length < 6) {
        alert('La contraseña debe tener al menos 6 caracteres.');
        passwordInicioSesion.value = '';
        return;
    }
    alert('Inicio de Sesióna exitoso.');
    emailInicioSesion.value = '';
    passwordInicioSesion.value = '';
    window.location.href = 'Index.html';
}
/**
 * Toma los datos del localStorage y los muestra en el canvas
 * @method canvasFinReserva
 */
const canvasFinReserva = () => {

    const horarioReserva = localStorage.getItem('horarioReserva');
    const ciudadReserva = localStorage.getItem('ciudadReserva');
    const deporteReserva = localStorage.getItem('deporteReserva');
    const fechaReserva = localStorage.getItem('fechaReserva');

    const canvas = document.getElementById('infoReservaCanvas');
    const ctx = canvas.getContext('2d');
    const margenX = 20;
    let margenY1 = 0;
    let margenY2 = 0;
    let margenY3 = 0;
    let margenY4 = 0;
    const targetY1 = 30;
    const targetY2 = 60;
    const targetY3 = 90;
    const targetY4 = 120;
    const speed = 2;
    ctx.font = '20px Arial';
    ctx.fillStyle = '#333';
    const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (horarioReserva && ciudadReserva && deporteReserva && fechaReserva) {
            if (margenY1 < targetY1) margenY1 += speed;
            if (margenY2 < targetY2) margenY2 += speed;
            if (margenY3 < targetY3) margenY3 += speed;
            if (margenY4 < targetY4) margenY4 += speed;

            ctx.fillText(`Horario: ${horarioReserva}`, margenX, margenY1);
            ctx.fillText(`Ciudad: ${ciudadReserva}`, margenX, margenY2);
            ctx.fillText(`Deporte: ${deporteReserva}`, margenX, margenY3);
            ctx.fillText(`Fecha: ${fechaReserva}`, margenX, margenY4);

            requestAnimationFrame(draw);
        } else {
            console.error('No se encontraron datos de reserva en el almacenamiento local.');
        }
    };

    draw();
};