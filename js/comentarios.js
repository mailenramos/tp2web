
/*function cargar(event){
    event.preventdefault();
    let lista =document.querySelector("#comentariosausejax");
    lista.querySelectorALL

}*/
let id=0;
const url='https://66761ffca8d2b4d072f27cbc.mockapi.io/api/comentarios';
async function recibirComentarios(){
    try{
        const lista=document.querySelector("#comentariosausejax")
        lista.innerHTML= " ";
        let respuesta=await fetch(url);
        let json=await respuesta.json();

        console.table(json);
        for (const comentarios of json) {
           let usuario= comentarios.usuario;
           let fecha = comentarios.fecha;
           let comentario = comentarios.comentario;
           id = comentarios.id;

           lista.innerHTML+= `<li class="comentarioLi">
           <h4>Nombre de usuario: <span class="usuario">${usuario}</span></h4> 
           <h4>Fecha: ${fecha}</h4>

           <p class="comentarioTexto">${comentario}</p>
           </li>`
           
        }

    }catch (error){
        console.log(error);
    }
}
async function subircomentario(e){
    e.preventDefault();
    let usuario=document.querySelector("#usuario").value;
    let fecha=document.querySelector("#fecha").value;
    let comentarioinput=document.querySelector("#comentarioinput").value;

    let comentarios={
        "usuario": usuario,
        "fecha": fecha,
        "comentario":comentarioinput,
    }

    try{
        let respuesta=await fetch(url, {
            "method":"POST",
            "headers": {"Content-type":"application/json"},
            "body":JSON.stringify(comentarios)
        })
        if (respuesta.status===201){
            document.querySelector("#mensaje").innerHTML="Creado"
        }

    }catch(error){
        console.log(error);
    }
}

async function borrarUltimo(){
//'https://66761ffca8d2b4d072f27cbc.mockapi.io/api/comentarios/123'
    try{
        let respuesta=await fetch(`${url}/${id}`, {
            "method":"DELETE"
        })
        if (respuesta.status===200){
            document.querySelector("#mensaje").innerHTML="Eliminado!"
        }

    }catch(error){
        console.log(error);
    }
}

document.querySelector("#btn-borrar").addEventListener("click",borrarUltimo);
document.querySelector("#btn-publicar").addEventListener("click", subircomentario);
recibirComentarios();