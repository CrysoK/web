document.addEventListener('DOMContentLoaded', () => {

    // --- Formulario de Contacto ---
    const contactForm = document.getElementById('contact-form');
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    const mensajeInput = document.getElementById('mensaje');
    const submitButton = document.getElementById('submit-button');
    const nombreError = document.getElementById('nombre-error');
    const emailError = document.getElementById('email-error');
    const mensajeError = document.getElementById('mensaje-error');
    const formSuccessMessage = document.getElementById('form-success-message');

    // Objeto para mapear inputs a sus elementos de error
    const errorMap = {
        nombre: nombreError,
        email: emailError,
        mensaje: mensajeError
    };

    // Función para mostrar un error específico
    const showError = (inputElement, message) => {
        const errorElement = errorMap[inputElement.id];
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
            inputElement.classList.add('input-error');
        }
    };

    // Función para limpiar un error específico
    const clearError = (inputElement) => {
        const errorElement = errorMap[inputElement.id];
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
            inputElement.classList.remove('input-error');
        }
    };

    // Función para validar UN campo específico (llamada en 'blur')
    const validateField = (inputElement) => {
        let isValid = true;
        const value = inputElement.value.trim();
        clearError(inputElement); // Limpiar error previo del campo actual

        switch (inputElement.id) {
            case 'nombre':
                if (value === '') {
                    showError(inputElement, 'El nombre es obligatorio.');
                    isValid = false;
                }
                break;
            case 'email':
                if (value === '') {
                    showError(inputElement, 'El email es obligatorio.');
                    isValid = false;
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    showError(inputElement, 'Por favor, introduce un email válido.');
                    isValid = false;
                }
                break;
            case 'mensaje':
                if (value === '') {
                    showError(inputElement, 'El mensaje es obligatorio.');
                    isValid = false;
                }
                break;
        }
        return isValid;
    };

    // Función para verificar la validez GENERAL del formulario (sin mostrar errores)
    // Usada para habilitar/deshabilitar el botón
    const checkFormValidity = () => {
        const isNombreValid = nombreInput.value.trim() !== '';
        const isEmailValid = emailInput.value.trim() !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);
        const isMensajeValid = mensajeInput.value.trim() !== '';
        return isNombreValid && isEmailValid && isMensajeValid;
    };

    // Función para validar TODO el formulario y MOSTRAR todos los errores (llamada en 'submit')
    const validateFormOnSubmit = () => {
        // Validamos cada campo individualmente (esto mostrará los errores si los hay)
        const isNombreValid = validateField(nombreInput);
        const isEmailValid = validateField(emailInput);
        const isMensajeValid = validateField(mensajeInput);
        return isNombreValid && isEmailValid && isMensajeValid; // Devuelve la validez general
    };

    // --- Event Listeners ---

    // 1. Habilitar/Deshabilitar botón EN TIEMPO REAL (al escribir)
    [nombreInput, emailInput, mensajeInput].forEach(input => {
        input.addEventListener('input', () => {
            // Solo chequea si el form ES válido para habilitar/deshabilitar
            // No muestra errores aquí
            submitButton.disabled = !checkFormValidity();

            // Si el usuario corrige un error, lo oculta inmediatamente
            if (input.classList.contains('input-error')) {
                // Si al escribir, el campo AHORA es válido (según la validación silenciosa), quitar el error
                let shouldClear = false;
                switch (input.id) {
                    case 'nombre': shouldClear = input.value.trim() !== ''; break;
                    case 'email': shouldClear = input.value.trim() !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value); break;
                    case 'mensaje': shouldClear = input.value.trim() !== ''; break;
                }
                if (shouldClear) {
                    clearError(input);
                }
            }
        });
    });

    // 2. Validar campo individual y mostrar error AL SALIR del campo (blur)
    [nombreInput, emailInput, mensajeInput].forEach(input => {
        input.addEventListener('blur', () => {
            validateField(input); // Valida y muestra error si es inválido
            // Actualiza estado del botón por si acaso (aunque 'input' ya lo hace)
            submitButton.disabled = !checkFormValidity();
        });
    });


    // 3. Validar TODO el formulario al intentar ENVIAR
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            formSuccessMessage.style.display = 'none'; // Ocultar mensaje éxito previo

            // Llama a la función que valida todo y MUESTRA los errores
            if (validateFormOnSubmit()) {
                // --- Envío Simulado ---
                console.log('Formulario válido, simulando envío...');
                console.log('Nombre:', nombreInput.value);
                console.log('Email:', emailInput.value);
                console.log('Mensaje:', mensajeInput.value);

                formSuccessMessage.textContent = "¡Mensaje enviado con éxito! Gracias por contactarte.";
                formSuccessMessage.style.display = 'block';

                // Limpiar y deshabilitar
                setTimeout(() => {
                    contactForm.reset(); // Resetea el formulario
                    submitButton.disabled = true; // Deshabilita botón tras reset
                    formSuccessMessage.style.display = 'none';
                    // Asegurarse que los errores visuales también se limpian al resetear
                    [nombreInput, emailInput, mensajeInput].forEach(clearError);
                }, 10000);
                // --- Fin Envío Simulado ---

            } else {
                console.log('Formulario inválido, por favor corrige los errores.');
                // Enfocar el primer campo con error
                const firstErrorInput = contactForm.querySelector('.input-error');
                if (firstErrorInput) {
                    firstErrorInput.focus();
                }
            }
        });
    }


    // --- Resto del script (Fade-in, Footer Year) ---
    const fadeElems = document.querySelectorAll('.fade-in');
    // ... (IntersectionObserver sin cambios) ...
    const appearOptions = { threshold: 0.1 };
    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);
    fadeElems.forEach(elem => appearOnScroll.observe(elem));

    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});
