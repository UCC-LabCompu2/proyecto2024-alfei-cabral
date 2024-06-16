const MostrarInfoDeContacto = () => {
    // Obtener el modal por su clase
    const modal = document.querySelector(".modal");
    // Mostrar el modal estableciendo su estilo display a 'block'
    modal.style.display = "block";
}

const CerrarModal = () => {
    // Obtener el modal por su clase
    const modal = document.querySelector(".modal");
    // Ocultar el modal estableciendo su estilo display a 'none'
    modal.style.display = "none";
}

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
    const contieneSoloLetras = (texto) => {
        return /^[a-zA-Z]+$/.test(texto);
    };
    const contieneSoloNumeros = (texto) => {
        return /^\d+$/.test(texto);
    };
    if (nombre.value.trim() === '') {
        alert('Por favor, ingrese su nombre.');
        return;
    } else if (!contieneSoloLetras(nombre.value.trim())) {
        alert('El nombre debe contener solo letras.');
        return;
    }
    if (apellido.value.trim() === '') {
        alert('Por favor, ingrese su apellido.');
        return;
    } else if (!contieneSoloLetras(apellido.value.trim())) {
        alert('El apellido debe contener solo letras.');
        return;
    }
    if (emailRegistro.value.trim() === '') {
        alert('Por favor, ingrese su correo electrónico.');
        return;
    }
    if (passwordRegistro.value.trim() === '') {
        alert('Por favor, ingrese su contraseña.');
        return;
    } else if (passwordRegistro.value.trim().length < 6) {
        alert('La contraseña debe tener al menos 6 caracteres.');
        return;
    }
    if (confirmPassword.value.trim() === '' || confirmPassword.value.trim() !== passwordRegistro.value.trim()) {
        alert('Las contraseñas no coinciden. Por favor, inténtelo de nuevo.');
        return;
    }
    if (telefono.value.trim() === '') {
        alert('Por favor, ingrese su número de teléfono.');
        return;
    } else if (!contieneSoloNumeros(telefono.value.trim())) {
        alert('El número de teléfono debe contener solo números.');
        return;
    }
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
    if (codigoSeguridad.value.trim() === '') {
        alert('Por favor, ingrese el código de seguridad de su tarjeta de crédito.');
        return;
    } else if (codigoSeguridad.value.trim().length !== 3 || !contieneSoloNumeros(codigoSeguridad.value.trim())) {
        alert('El código de seguridad debe tener exactamente 3 dígitos y contener solo números.');
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
}
document.getElementById('registroForm').addEventListener('submit', ValidarRegistro);




