// $("#boton").click(()=>{
//     $("#lista").empty();
//      $.get("http://localhost:5000/amigos",verElementos);
//  });
// Utiliza el evento click en un boton para hacer que al hacer click en el mismo aparezca en el DOM una lista
// con todos los amigos que el servidor nos devolvera al hacer un GET a la ruta http://localhost:5000/amigos
// $("#boton").click() añado el evento de click
//   ********** Asi me salio el amigo 0 ***************/
// $("#boton").click(()=>{
//     $.get("http://localhost:5000/amigos",function(data){
//         let amigo = document.createElement("li")
//         amigo.textContent = data[0].name
//         $("#lista").append(amigo)
//     });
// });
//  Creo una funcion que recibe un array y cada elemento lo crea como <li> y lo agrega a la ul con id=lista 
const verElementos = (response) => {
    response.forEach(amigo => {
    $(`<li>${amigo.name} X </li>`).appendTo("#lista");
    });
}
// le pongo accion de click al boton qye recibe los datos de localhost de amigos y corra la funcíon de recibir
// el array
$("#boton").click(()=>{
    $("#lista").empty();
     $.get("http://localhost:5000/amigos",verElementos);
 });
//  Para conseguir los datos de un amigo en particular del servidor
//  puedes hacer un GET nuestro servidor concatenando el id del amigo que queremos encontrar
//  , Por ej: http://localhost:5000/amigos/1 le pediria al servidor el amigo con id = 1
$("#search").click(()=>{
    //creo la variable que me da lo que este escrito en el input con la casilla cero porque es un string
    const id =  $("#input")[0].value
    //obtengo la informacion de mi servidor
    $.get(`http://localhost:5000/amigos/${id}`,(respuesta)=>{
        //console.log(respuesta);
        $("#amigo").text(respuesta.name) 
    }
    )
})
// Un input que reciba el id de un amigo y un boton "borrar". Al hacer click en el boton,
// borraremos el amigo del servidor haciendo un DELETE a nuestro servidor, concatenando
// el id del usuario que queremos borrar. 
// Por ej: http://localhost:5000/amigos/2 le pediria al servidor el amigo con id = 2
$("#delete").click(()=>{
    const id = $("#inputDelete")[0].value;
    $.ajax({
     url:`http://localhost:5000/amigos/${id}`,
     type: "DELETE",
     success: (response) => {
         alert("Amigo eliminado");
         $("#lista").empty();
         verElementos(response);
     },
    });
 });