document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       WHATSAPP DA JKL ENGENHARIA
    ========================================= */

    const whatsappNumber = "5562994832282";


    /* =========================================
       FORMULÁRIO DE AGENDAMENTO
    ========================================= */

    const form = document.getElementById("scheduleForm");

    if (form) {

        form.addEventListener("submit", function (event) {

            event.preventDefault();

            const nameElement =
                document.getElementById("clientName");

            const phoneElement =
                document.getElementById("clientPhone");

            const serviceElement =
                document.getElementById("serviceType");

            const dateElement =
                document.getElementById("scheduleDate");

            const messageElement =
                document.getElementById("clientMessage");


            const name = nameElement
                ? nameElement.value.trim()
                : "";

            const phone = phoneElement
                ? phoneElement.value.trim()
                : "";

            const service = serviceElement
                ? serviceElement.value
                : "";

            const date = dateElement
                ? dateElement.value
                : "";

            const message = messageElement
                ? messageElement.value.trim()
                : "";


            if (
                name === "" ||
                phone === "" ||
                service === "" ||
                date === ""
            ) {

                alert(
                    "Preencha nome, telefone, serviço e data."
                );

                return;
            }


            /* =====================================
               FORMATA DATA
            ===================================== */

            let formattedDate = date;

            if (date.indexOf("-") !== -1) {

                const parts = date.split("-");

                if (parts.length === 3) {

                    formattedDate =
                        parts[2] +
                        "/" +
                        parts[1] +
                        "/" +
                        parts[0];
                }
            }


            /* =====================================
               MENSAGEM
            ===================================== */

            let text =
                "Olá! Vim pelo site da JKL Engenharia.%0A%0A";

            text +=
                "*SOLICITAÇÃO DE ATENDIMENTO*%0A%0A";

            text +=
                "*Nome:* " +
                encodeURIComponent(name) +
                "%0A";

            text +=
                "*Telefone:* " +
                encodeURIComponent(phone) +
                "%0A";

            text +=
                "*Serviço:* " +
                encodeURIComponent(service) +
                "%0A";

            text +=
                "*Data desejada:* " +
                encodeURIComponent(formattedDate) +
                "%0A";

            text += "%0A*Mensagem:*%0A";

            text +=
                encodeURIComponent(
                    message || "Não informado."
                );


            /* =====================================
               ABRIR WHATSAPP
            ===================================== */

            const url =
                "https://wa.me/" +
                whatsappNumber +
                "?text=" +
                text;

            window.open(url, "_blank");

        });
    }


    /* =========================================
       DATA MÍNIMA
    ========================================= */

    const dateInput =
        document.getElementById("scheduleDate");

    if (dateInput) {

        const today = new Date();

        const year =
            today.getFullYear();

        const month =
            String(today.getMonth() + 1)
                .padStart(2, "0");

        const day =
            String(today.getDate())
                .padStart(2, "0");

        dateInput.min =
            year + "-" + month + "-" + day;
    }


    /* =========================================
       MÁSCARA DE TELEFONE
    ========================================= */

    const phoneInput =
        document.getElementById("clientPhone");

    if (phoneInput) {

        phoneInput.addEventListener(
            "input",
            function () {

                let value =
                    phoneInput.value
                        .replace(/\D/g, "");

                if (value.length > 11) {
                    value =
                        value.substring(0, 11);
                }

                if (value.length <= 10) {

                    value = value.replace(
                        /^(\d{2})(\d)/,
                        "($1) $2"
                    );

                    value = value.replace(
                        /(\d{4})(\d)/,
                        "$1-$2"
                    );

                } else {

                    value = value.replace(
                        /^(\d{2})(\d)/,
                        "($1) $2"
                    );

                    value = value.replace(
                        /(\d{5})(\d)/,
                        "$1-$2"
                    );
                }

                phoneInput.value = value;

            }
        );
    }


    /* =========================================
       ANIMAÇÃO DOS CARDS
    ========================================= */

    const cards =
        document.querySelectorAll(
            ".service-card, .process-card, .project-card, .testimonial-card"
        );

    if (
        "IntersectionObserver" in window
    ) {

        const observer =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "show"
                                );

                                observer.unobserve(
                                    entry.target
                                );
                            }
                        }
                    );

                },
                {
                    threshold: 0.15
                }
            );


        cards.forEach(
            function (card) {

                card.classList.add(
                    "scroll-animation"
                );

                observer.observe(card);
            }
        );

    } else {

        cards.forEach(
            function (card) {

                card.classList.add("show");

            }
        );
    }


    /* =========================================
       SCROLL SUAVE
    ========================================= */

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );

    links.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    const id =
                        link.getAttribute("href");

                    if (
                        !id ||
                        id === "#"
                    ) {
                        return;
                    }

                    const target =
                        document.querySelector(id);

                    if (!target) {
                        return;
                    }

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );
        }
    );


    /* =========================================
       TESTE
    ========================================= */

    console.log(
        "JKL Engenharia carregada corretamente."
    );

});