document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#formulario");
    const divcaptcha = document.querySelector("#divCaptcha");
    const divresultado = document.querySelector("#divresultado");

    if (form && divcaptcha) {
        let random1 = Math.floor(Math.random() * 11);
        let random2 = Math.floor(Math.random() * 11);

        divcaptcha.innerHTML = `${random1} + ${random2}`;

        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            const resultado = random1 + random2;
            const captcha = formData.get("captcha");

            if (parseInt(captcha) === resultado) {
                divcaptcha.innerHTML = "Correcto";
                divresultado.innerHTML = "Formulario enviado.";
                form.reset();
            } else {
                divcaptcha.innerHTML = "Incorrecto";
                divresultado.innerHTML = "Formulario no enviado.";
                form.reset();
            }
        });
    }
});
