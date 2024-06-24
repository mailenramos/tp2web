console.log("hola");

function select_tab(id) {
    document.querySelectorAll(".route").forEach((item) => item.classList.remove("selected"));
    document.querySelector("#" + id).classList.add("selected");
}

async function load_content(id) {
    console.log(`Cargando contenido de ${id}`);
    let container = document.querySelector("#content");
    try {
        let response = await fetch(`paginas/${id}.html`);
        if (response.ok) {
            let content = await response.text();
            container.innerHTML = content;
        } else {
            container.innerHTML = `Error al cargar: /${id}....`;
        }
    } catch (error) {
        container.innerHTML = `Error: ${error.message}`;
    }
}

function push(event) {
    let id = event.target.id;
    select_tab(id);
    document.title = id;
    load_content(id);
    window.history.pushState({ id: id }, `${id}`, `/${id}`);
}

window.onload = (event) => {
    // Agrega esta línea para cargar el contenido de inicio.html por defecto
    load_content('inicio');
    
    document.getElementById("inicio").addEventListener("click", (event) => push(event));
    document.getElementById("contacto").addEventListener("click", (event) => push(event));
    document.getElementById("ranking").addEventListener("click", (event) => push(event));
};

window.addEventListener("popstate", (event) => {
    let estadoId = event.state ? event.state.id : "inicio";
    console.log("estadoId =", estadoId);
    select_tab(estadoId);
    load_content(estadoId);
});