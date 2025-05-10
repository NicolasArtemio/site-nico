document.addEventListener("DOMContentLoaded", () => {


    const btnContactHero = document.getElementById('btn-contact');
    const btnContact = document.getElementById('btn-contact2');
    const divApp = document.getElementById("app");

    /** Mostrar modal de mensaje */
        const showMessageModal = (message) => {
        // Verifica si ya existe un modal previo y lo elimina
        const existingModal = document.getElementById("response-modal");
        if (existingModal) existingModal.remove();

        const modal = document.createElement("DIV");
        modal.id = "response-modal";
        modal.classList.add("modal-overlay");

        const modalContent = document.createElement("DIV");
        modalContent.classList.add("modal-content");

        const closeBtn = document.createElement("SPAN");
        closeBtn.innerText = "×";
        closeBtn.classList.add("modal-close");
        closeBtn.addEventListener("click", () => modal.remove());

        const messagePara = document.createElement("P");
        messagePara.innerText = message;

        modalContent.appendChild(closeBtn);
        modalContent.appendChild(messagePara);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        // Cierre al hacer clic fuera
        modal.addEventListener("click", (e) => {
            if (e.target === modal) modal.remove();
        });
    }

    const showFieldError = (inputElement, message) => {
        // Elimina cualquier error anterior
        const existingError = inputElement.parentElement.querySelector(".field-error");
        if (existingError) existingError.remove();

        const error = document.createElement("SPAN");
        error.innerText = message;
        error.classList.add("field-error");
        
        // Añadir el mensaje de error debajo del input
        inputElement.parentElement.appendChild(error);

        // Resalta el campo con borde rojo
        inputElement.classList.add('input-error'); 

        // Eliminar el mensaje de error después de 3 segundos
        setTimeout(() => {
            error.remove();
            inputElement.classList.remove('input-error');  // Elimina el borde rojo después de 3 segundos
        }, 3000);  // 3000 milisegundos = 3 segundos
    }

    const validateField = (inputElement, condition, errorMessage) => {
        if (!condition) {
            showFieldError(inputElement, errorMessage);
            return false;
        }
        inputElement.classList.remove('input-error'); // Si pasa la validación, elimina el borde rojo
        return true;
    }

/* Función para abrir el modal */
const openModal = () => {
    const containerMain = document.createElement("DIV");
    containerMain.classList.add("bg-white", "container-modal", "modal-container");

    const btnClose = document.createElement('BUTTON');
    btnClose.innerText = "X";
    btnClose.classList.add('btn-close', 'close-button');

    containerMain.appendChild(btnClose);
    divApp.appendChild(containerMain);

    const formContact = document.createElement("FORM");
    formContact.classList.add("contact-form");

    const title = document.createElement("H2");
    title.innerText = "Contáctame";
    title.classList.add("modal-title");

    formContact.appendChild(title);
    containerMain.appendChild(formContact);

    const containerInputs = document.createElement("DIV");
    containerInputs.classList.add("container-inputs", "input-container");
    formContact.appendChild(containerInputs);

    const inputName = document.createElement("INPUT");
    inputName.setAttribute("type", "text");
    inputName.setAttribute("placeholder", "Nombre");
    inputName.classList.add("input-field");
    containerInputs.appendChild(inputName);

    const inputEmail = document.createElement("INPUT");
    inputEmail.setAttribute("type", "email");
    inputEmail.setAttribute("placeholder", "Correo electrónico");
    inputEmail.classList.add("input-field");
    containerInputs.appendChild(inputEmail);

    const inputSubject = document.createElement("INPUT");
    inputSubject.setAttribute("type", "text");
    inputSubject.setAttribute("placeholder", "Asunto");
    inputSubject.classList.add("input-field");
    containerInputs.appendChild(inputSubject);

    const inputMessage = document.createElement("TEXTAREA");
    inputMessage.setAttribute("placeholder", "Mensaje");
    inputMessage.classList.add("textarea-field");
    containerInputs.appendChild(inputMessage);

    const btnSubmit = document.createElement("BUTTON");
    btnSubmit.setAttribute("type", "submit");
    btnSubmit.innerText = "Enviar";
    btnSubmit.classList.add("btn-submit");
    containerInputs.appendChild(btnSubmit);

    btnClose.addEventListener("click", () => {
        divApp.removeChild(containerMain);
    });

    btnSubmit.addEventListener("click", async (e) => {
        e.preventDefault();

        const name = inputName.value.trim();
        const email = inputEmail.value.trim();
        const subject = inputSubject.value.trim();
        const message = inputMessage.value.trim();

        let isValid = true;

        // Validación de los campos
        isValid &= validateField(inputName, name && name.length >= 3 && name.length <= 30, "El nombre debe tener entre 3 y 30 caracteres.");
        isValid &= validateField(inputEmail, /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email), "Por favor ingresa un correo electrónico válido.");
        isValid &= validateField(inputSubject, subject && subject.length >= 3 && subject.length <= 100, "El asunto debe tener entre 3 y 100 caracteres.");
        isValid &= validateField(inputMessage, message && message.length >= 10, "El mensaje debe tener al menos 10 caracteres.");

        if (!isValid) {
            showMessageModal("Por complete todos los campos.");
            return;
        }

        const templateParams = {
            from_name: name,
            from_email: email,
            subject: subject,
            message: message
        };

        btnSubmit.disabled = true;
        btnSubmit.innerText = "Enviando...";

        try {
            const response = await emailjs.send("service_heiramg", "template_2qpstft", templateParams);
            showMessageModal(`Gracias ${name}, tu mensaje ha sido enviado`);
            divApp.removeChild(containerMain);
        } catch (error) {
            showMessageModal("Hubo un error al enviar el mensaje. Intenta nuevamente.");
            console.error("EmailJS error:", error);
        } finally {
            btnSubmit.disabled = false;
            btnSubmit.innerText = "Enviar";
        }
    });
};




    btnContactHero.addEventListener("click", () => {
        openModal();

    });

    btnContact.addEventListener("click", () => {
        openModal();
    });


})