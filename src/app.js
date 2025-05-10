document.addEventListener("DOMContentLoaded", () => {


    const btnContactHero = document.getElementById('btn-contact');
    const btnContact = document.getElementById('btn-contact2');
    const divApp = document.getElementById("app");

    const openModal = () => {
        const containerMain = document.createElement("DIV");
        containerMain.classList.add("bg-white", "container-modal");

        const btnClose = document.createElement('BUTTON');
        btnClose.innerText = "X";
        btnClose.classList.add('btn-close');

        containerMain.appendChild(btnClose);
        divApp.appendChild(containerMain);

        const formContact = document.createElement("FORM");
        const title = document.createElement("H2");
        title.innerText = "Contáctanos";

        formContact.appendChild(title);
        containerMain.appendChild(formContact);
        const containerInputs = document.createElement("DIV");
        containerInputs.classList.add("container-inputs");
        formContact.appendChild(containerInputs);
        const inputName = document.createElement("INPUT");
        inputName.setAttribute("type", "text");
        inputName.setAttribute("placeholder", "Nombre");
        containerInputs.appendChild(inputName);
        const inputEmail = document.createElement("INPUT");
        inputEmail.setAttribute("type", "email");
        inputEmail.setAttribute("placeholder", "Correo electrónico");
        containerInputs.appendChild(inputEmail);
        const inputSubject = document.createElement("INPUT");
        inputSubject.setAttribute("type", "text");
        inputSubject.setAttribute("placeholder", "Asunto");
        containerInputs.appendChild(inputSubject);
        const inputMessage = document.createElement("TEXTAREA");
        inputMessage.setAttribute("placeholder", "Mensaje");
        containerInputs.appendChild(inputMessage);
        const btnSubmit = document.createElement("BUTTON");
        btnSubmit.setAttribute("type", "submit");
        btnSubmit.innerText = "Enviar";
        containerInputs.appendChild(btnSubmit);

        btnClose.addEventListener("click", () => {
            divApp.removeChild(containerMain);
        });

        btnSubmit.addEventListener("click", (e) => {
            e.preventDefault();

            const name = inputName.value;
            const email = inputEmail.value;
            const subject = inputSubject.value;
            const message = inputMessage.value;

            // Validación de campos
            if (name === "" || email === "" ||  subject === "" || message === "" ) {
                alert("Por favor completa todos los campos");
                return;
            }

            // Validación de correo electrónico
            const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            if (!emailPattern.test(email)) {
                alert("Por favor ingresa un correo electrónico válido.");
                return;
            }

            // Enviar los datos del formulario a través de EmailJS
            const templateParams = {
                from_name: name,        // nombre ingresado por el usuario
                from_email: email,      // email ingresado por el usuario
                subject: subject,       // asunto ingresado
                message: message        // mensaje escrito
            };


            emailjs.send("service_heiramg", "template_2qpstft", templateParams)
                .then(function (response) {
                    alert(`Gracias ${name}, tu mensaje ha sido enviado`);
                    divApp.removeChild(containerMain);
                }, function (error) {
                    alert("Hubo un error al enviar el mensaje. Intenta nuevamente.");
                    console.error("EmailJS error:", error);
                });
        });
    };


    btnContactHero.addEventListener("click", () => {
        openModal();

    });

    btnContact.addEventListener("click", () => {
        openModal();
    });


})