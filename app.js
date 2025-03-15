
let amigos = []; 
let amigosSorteados = [];

function agregarAmigo(){
    let inputAmigo = document.getElementById("amigo"); //Se captura el input donde el usuario escribe el nombre.
    let nombreAmigo = inputAmigo.value.trim(); // Se guarda el valor del input en una variable y se elimina los espacios en blanco al inicio y al final.
    
    if(!nombreAmigo){
        alert("Por favor, ingrese un nombre");
        return;
    }

    // Normalizar el nombre para evitar duplicados
    let nombreNormalizado = nombreAmigo.toLowerCase();

        if (amigos.some(amigo => amigo.toLowerCase() === nombreNormalizado)) {
        alert("Este nombre ya fue agregado");
        return;
}

    amigos.push(nombreAmigo); //Se agrega el nombre a la lista de amigos.
    inputAmigo.value = ""; //Se limpia el input para que el usuario pueda escribir otro nombre.
    inputAmigo.focus(); //El cursor vuelva al input.

    actualizarLista(); //Se actualiza la lista de amigos en la página.
    actualizarEstadoBotonSortear(); // Habilita el botón si hay al menos un amigo.
}

function actualizarLista(){
    let listaAmigos = document.getElementById("listaAmigos");//Se captura el elemento donde se mostrará la lista de amigos.
    listaAmigos.innerHTML = ""; //Se limpia la lista de amigos para que no se dupliquen los nombres.

    for(let i = 0; i <amigos.length; i++){
        let item = document.createElement("li"); //Se crea un elemento <li> por cada amigo.
        item.textContent = amigos[i]; //Se agrega el nombre del amigo al elemento <li>.
        listaAmigos.appendChild(item); //Se agrega el elemento <li> a la lista de amigos.
    }
}

function sortearAmigo(){
    if (amigos.length === 0){ //Si no hay amigos en la lista, se muestra una alerta.
        alert("No hay amigos para sortear");
        return;//Se detiene la ejecución de la función.
    }
    
    let indiceSorteado = Math.floor(Math.random() * amigos.length);//Se genera un número aleatorio entre 0 y la cantidad de amigos en la lista.
    let amigoSorteado = amigos[indiceSorteado];//Se obtiene el amigo sorteado con el número aleatorio generado.
    
    let resultado = document.getElementById("resultado");//Se captura el elemento donde se mostrará el amigo sorteado.
    resultado.innerHTML = `<h2>El amigo secreto es: ${amigoSorteado}</h2>`; //Se muestra el amigo sorteado en la página.

    amigosSorteados.push(amigoSorteado); // Agregar el amigo sorteado a la nueva lista
    amigos.splice(indiceSorteado, 1); // Eliminarlo de la lista original

    actualizarLista();//Actualizar la lista de amigos en pantalla
    actualizarListaSorteados(); // Mostrar los sorteados en pantalla

    document.getElementById("amigo").disabled = true; // Bloquear el input

    // Si ya no quedan amigos, también deshabilitar el botón de sortear
    if (amigos.length === 0) {
        document.getElementById("botonSortear").disabled = true;
    }
}

function actualizarListaSorteados() {//Función para mostrar la lista de amigos sorteados en la página.
    let listaSorteados = document.getElementById("listaSorteados"); //Se captura el elemento donde se mostrará la lista de amigos sorteados.
    listaSorteados.innerHTML = ""; //Se limpia la lista de amigos sorteados para que no se dupliquen los nombres.

    amigosSorteados.forEach((amigo, index) => {//Se recorre la lista de amigos sorteados con el forEach.
        let item = document.createElement("li");//Se crea un elemento <li> por cada amigo sorteado.
        item.textContent = `${index +1}. ${amigo}`;//Se agrega el nombre del amigo sorteado al elemento <li>.
        listaSorteados.appendChild(item);//Se agrega el elemento <li> a la lista de amigos sorteados.
    });
}

function resetearLista() {
    amigos = []; // Vaciar la lista de amigos
    amigosSorteados = []; // Vaciar la lista de sorteados
    actualizarLista(); // Actualizar la lista de amigos en pantalla
    actualizarListaSorteados(); // Actualizar la lista de sorteados en pantalla
    document.getElementById("resultado").innerHTML = ""; // Borrar el último resultado mostrado
    actualizarEstadoBotonSortear();//Volver a habilitar el botón de sortear
    document.getElementById("amigo").disabled = false; // Habilitar el input
    document.getElementById("botonSortear").disabled = false;// Habilitar el botón "Sortear"
    document.getElementById("amigo").value = ""; // Limpiar el input
}


function actualizarEstadoBotonSortear() {
    let boton = document.getElementById("botonSortear");
        if (boton) {
        boton.disabled = amigos.length === 0;
    }
}

document.getElementById("amigo").addEventListener("keypress", function(event) {//Se agrega un evento al input para que al presionar la tecla "Enter" se ejecute la función agregarAmigo.
    if (event.key === "Enter") {//Se verifica si la tecla presionada es "Enter".
        agregarAmigo();
    }
});

actualizarEstadoBotonSortear();




