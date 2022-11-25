const btnAmigos = document.querySelector("#boton")
const btnSearch = document.querySelector("#search")
const btnDelete = document.querySelector("#delete")
const listaAmigos = document.querySelector("#lista")
const amigoSearch = document.querySelector("#amigo")
const respuestaDelDelete = document.querySelector("#success")
const inputSearch = document.querySelector("#input")
const inputDelete = document.querySelector("#inputDelete")

function showFriends() {
    listaAmigos.innerHTML = ""
    fetch("http://localhost:5000/amigos")
    .then(r => r.json())
    .then(amigos => {
        for (let i = 0; i < amigos.length; i++) {
            let li = `<li>${amigos[i].name} <button onclick="deleteFriend(${amigos[i].id})">X</button></li>`
            listaAmigos.innerHTML += li
        }
    })
    .catch(err => listaAmigos.innerHTML = "Error no tenes amigos")
}

function searchFriend() {
    let id = inputSearch.value
    inputSearch.value = ""
    fetch(`http://localhost:5000/amigos/${id}`)
    .then(r => r.json())
    .then(amigo => {
        amigoSearch.innerText = amigo.name
    })
    .catch(err => amigoSearch.innerText = `No se encontro al amigo con el id = ${id}`)
}

function deleteFriend(id) {
    if(typeof id !== "number") {
        id = inputDelete.value
    }
    inputDelete.value = ""
    fetch(`http://localhost:5000/amigos/${id}`, {
        method: "DELETE"
    })
    .then(r => r.json())
    .then(r => {
        respuestaDelDelete.innerText = `El amigo fue eliminado de la lista`
        showFriends()
    })
}

btnAmigos.addEventListener("click", showFriends)
btnSearch.addEventListener("click", searchFriend)
btnDelete.addEventListener("click", deleteFriend)