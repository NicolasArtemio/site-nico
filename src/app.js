document.addEventListener("DOMContentLoaded", () => {


    const btnContactHero = document.getElementById('btn-contact');
    const btnContact = document.getElementById('btn-contact2');
    const divApp = document.getElementById("app");

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
            title.innerText = "Contáctanos";
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

            if (!name || !email || !subject || !message) {
                alert("Por favor completa todos los campos");
                return;
            }
            if (name.length < 3) {
                alert("El nombre debe tener al menos 3 caracteres.");
                return;
            } 
            if (name.length > 30) {
                alert("El nombre no puede tener más de 30 caracteres.");
                return;
            }
            if (subject.length < 3) {
                alert("El asunto debe tener al menos 3 caracteres.");
                return;
            }
            if (subject.length > 100) {
                alert("El asunto no puede tener más de 100 caracteres.");
                return;
            }

            if (message.length < 10) {
                alert("El mensaje debe tener al menos 10 caracteres.");
                return;
            }
            const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            if (!emailPattern.test(email)) {
                alert("Por favor ingresa un correo electrónico válido.");
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
                alert(`Gracias ${name}, tu mensaje ha sido enviado`);
                divApp.removeChild(containerMain);
            } catch (error) {
                alert("Hubo un error al enviar el mensaje. Intenta nuevamente.");
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