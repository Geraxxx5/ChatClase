DOM = document;

let divContenedor = DOM.createElement("div");

DOM.body.appendChild(divContenedor);

DOM.body.style.margin = 0; 

divContenedor.id = "divPadre";
divContenedor.style.width = "100vw";
divContenedor.style.height = "100vh";
divContenedor.style.background = "blueviolet";
divContenedor.style.border = "1px solid black";
divContenedor.style.display = "grid";
divContenedor.style.gridTemplateColumns = "20% 80%";
divContenedor.style.gridTemplateRows = "85% 15%";

let div = DOM.createElement("div");
div.id = "listado-chats";
div.style.background = "blue";
div.style.border = "1px solid black";
div.style.padding = "8px";
div.style.display = "flex";
div.style.flexDirection = "column";
div.style.overflow = "scroll";

let div2 = DOM.createElement("div");
div2.id = "mensaje";
div2.style.background = "pink";
div2.style.border = "1px solid black";
div2.style.display = "flex";
div2.style.flexDirection = "column";
div2.style.alignItems = "flex-end";
div2.style.padding = "20px";
div2.style.overflow = "scroll";


let div3 = DOM.createElement("div");
div3.id = "contenido-perfil";
div3.style.background = "green";
div3.style.display = "flex";
div3.style.justifyContent = "space-around";
div3.style.alignItems = "center";

let div4 = DOM.createElement("div");
div4.id = "contenido-chat";
div4.style.background = "blueviolet";
div4.style.border = "1px solid black";
div4.style.display = "flex";
div4.style.justifyContent = "space-evenly";

let textoArea = DOM.createElement("textarea");
textoArea.id = "mensajeUsuario";
textoArea.style.width = "90%";
textoArea.style.height = "90%";
textoArea.setAttribute('maxLength', '140');

let imgPerfil = DOM.createElement("img");
imgPerfil.style.width = "65px";
imgPerfil.style.height = "65px";
imgPerfil.src = "https://i.pinimg.com/736x/42/6e/f1/426ef1322c4685acdb1134f2ee9ce288.jpg";
imgPerfil.style.borderRadius = "50%";

let nom = DOM.createElement("h3");
nom.innerText = "Gerax";

let but = DOM.createElement("button");
but.id = "butEnv"
but.innerText = "Enviar";
but.onclick

let divp = document.getElementById("divPadre");
if(divp){
    divp.appendChild(div);
    divp.appendChild(div2);
    divp.appendChild(div3);
    divp.appendChild(div4);
}

let divChat = document.getElementById("contenido-chat");
if(divChat){
    divChat.appendChild(textoArea);
    divChat.appendChild(but);
}

let contImagen = document.getElementById("contenido-perfil")
if(contImagen){
    contImagen.appendChild(imgPerfil)
    contImagen.appendChild(nom);
}


async function optenerPosts(){
    let data = await fetch('https://jsonplaceholder.typicode.com/posts',
    {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })    
    console.log("await", data);
    let posts = await data.json();
    console.log(posts);

    // console.log("string", JSON.stringify(posts));
    // let new_json = JSON.parse(JSON.stringify(posts));
    // console.log("new_json", new_json);
    return posts;
}


function crearChat(texto, id){
    let nuevoChat = document.createElement("div");
    nuevoChat.className = "chat";
    nuevoChat.style.width = "100%";
    nuevoChat.style.minHeight = "60px";
    nuevoChat.style.borderRadius = "8px";
    nuevoChat.style.background = "cyan";
    nuevoChat.style.border = "1px solid black";
    nuevoChat.style.marginBottom = "8px";
    nuevoChat.id = id;
    nuevoChat.innerText = texto;
    return nuevoChat;
}

async function crearListoDeChats(){
    // mando a traer los post dummys a una api con get
    let misPosts =  await optenerPosts()
    
    // mando a traer el div donde quiero poner los chats
    let divListados = document.getElementById("listado-chats");
    if(divListados != null){
        // transformamos los dicccionarios a un div de chat
        misPosts.map(post=>{
            let nuevoChat = crearChat(post.title, post.id);
            return nuevoChat
        })
        // recorremos los nuevos chats y los agremos al div de listados
        .forEach(element => {
            divListados.appendChild(element);
        });
    }

}

crearListoDeChats();

function userMessage(message){
    let nuevoMensaje = document.createElement("div");
    nuevoMensaje.style.width = "fit-content";
    nuevoMensaje.style.maxWidth = "200px";
    nuevoMensaje.style.minWidth = "20px";
    nuevoMensaje.style.padding = "5px"
    nuevoMensaje.style.overflowWrap = "break-word";
    nuevoMensaje.innerText = message
    nuevoMensaje.style.borderRadius = "8px";
    nuevoMensaje.style.background = "cyan";
    nuevoMensaje.style.border = "1px solid black";
    nuevoMensaje.style.marginBottom = "8px";
    nuevoMensaje.animate([
        { opacity: '0' }, 
        { opacity: '1' }
    ], { 
        duration: 1000
    });
    return nuevoMensaje;
}

function sendMessage(){
    let message = document.getElementById("mensajeUsuario").value;
    if(message != ""){
        let divMensaje = document.getElementById("mensaje");
        divMensaje.appendChild(userMessage(message));
        let ultimoMensaje = divMensaje.lastChild;
        ultimoMensaje.scrollIntoView();
    }
    textoArea.value = "";
}

let buttonEnviar = DOM.getElementById("butEnv");

buttonEnviar.addEventListener('click',sendMessage);

textoArea.addEventListener('keydown', function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        buttonEnviar.click();
    }
});