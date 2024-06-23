let id = 0;
const url = 'https://66761ffca8d2b4d072f27cbc.mockapi.io/api/comentarios';

async function recibirComentarios() {
    try {
        const lista = document.getElementById("comentarios-lista");
        lista.innerHTML = "";
        let respuesta = await fetch(url);
        let json = await respuesta.json();

        console.table(json);
        json.forEach(comentario => {
            let { id, usuario, fecha, comentario: textoComentario } = comentario;

            // Crear elementos HTML para el comentario y los botones de editar y eliminar
            let li = document.createElement('li');
            li.classList.add('comentarioLi');
            li.innerHTML = `
                <h4>Nombre de usuario: <span class="usuario">${usuario}</span></h4> 
                <h4>Fecha: ${fecha}</h4>
                <p class="comentarioTexto">${textoComentario}</p>
                <button class="btn-borrar" data-id="${id}">Borrar</button>
                <button class="btn-editar" data-id="${id}">Editar</button>
            `;
            lista.appendChild(li);

            // Agregar eventos a los botones de editar y eliminar
            li.querySelector('.btn-borrar').addEventListener('click', borrarComentario);
            li.querySelector('.btn-editar').addEventListener('click', editarComentario);
        });

    } catch (error) {
        console.log(error);
    }
}

async function borrarComentario(event) {
    let comentarioId = event.target.dataset.id;
    try {
        let respuesta = await fetch(`${url}/${comentarioId}`, {
            method: "DELETE"
        });
        if (respuesta.status === 200) {
            document.querySelector("#mensaje").innerHTML = "Comentario Eliminado.";
            recibirComentarios(); // Recargar los comentarios después de borrar uno
        }

    } catch (error) {
        console.log(error);
    }
}

async function editarComentario(event) {
    let comentarioId = event.target.dataset.id;
    let usuario = document.querySelector("#usuario").value;
    let fecha = document.querySelector("#fecha").value;
    let comentarioInput = document.querySelector("#comentarioinput").value;

    let comentario = {
        "usuario": usuario,
        "fecha": fecha,
        "comentario": comentarioInput,
    };

    try {
        let respuesta = await fetch(`${url}/${comentarioId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(comentario)
        });
        if (respuesta.status === 200) {
            document.querySelector("#mensaje").innerHTML = "Comentario Editado.";
            recibirComentarios(); // Recargar los comentarios después de editar uno
        }

    } catch (error) {
        console.log(error);
    }
}

async function subirComentario(e) {
    e.preventDefault();
    let usuario = document.querySelector("#usuario").value;
    let fecha = document.querySelector("#fecha").value;
    let comentarioInput = document.querySelector("#comentarioinput").value;

    let comentario = {
        "usuario": usuario,
        "fecha": fecha,
        "comentario": comentarioInput,
    };

    try {
        let respuesta = await fetch(url, {
            "method": "POST",
            "headers": { "Content-type": "application/json" },
            "body": JSON.stringify(comentario)
        });
        if (respuesta.status === 201) {
            document.querySelector("#mensaje").innerHTML = "Comentario Creado.";
            recibirComentarios(); // Recargar los comentarios después de crear uno
        }

    } catch (error) {
        console.log(error);
    }
}

document.querySelector("#btn-publicar").addEventListener("click", subirComentario);
recibirComentarios();
