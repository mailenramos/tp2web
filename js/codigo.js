document.addEventListener("DOMContentLoaded", () => {
    const contenedornav = document.querySelector("#contenedor-nav");
    const modoOscuro = document.querySelector("#modoOscuro");
    const botonmenu = document.querySelector("#boton-menu");
    const form = document.querySelector("#formulario");
    const divcaptcha = document.querySelector("#divCaptcha");
    const divresultado = document.querySelector("#divresultado");

    modoOscuro.addEventListener("click", cambiarModo);
    botonmenu.addEventListener("click", desplegar);
    form.addEventListener("submit", verificar);

    let random1 = Math.floor(Math.random() * 11);
    let random2 = Math.floor(Math.random() * 11);

    divcaptcha.innerHTML = `${random1} + ${random2}`;

    if (localStorage.getItem("modoOscuro") === "true") {
        document.body.classList.add("modoOscuro");
    }

    function cambiarModo() {
        document.body.classList.toggle("modoOscuro");

        if (document.body.classList.contains("modoOscuro")) {
            localStorage.setItem("modoOscuro", "true");
            modo.innerHTML = "CLARO";
        } else {
            localStorage.setItem("modoOscuro", "false");
            modo.innerHTML = "OSCURO";
        }
    }

    function desplegar() {
        contenedornav.classList.toggle('desplegado');
    }

    function verificar(e) {
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
    }
});
