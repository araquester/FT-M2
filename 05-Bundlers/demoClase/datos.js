export const nombre = "Jorge";
export const edad = 20;
export const direccion = "Calle 123";

const unafuncion = () => {
    console.log("Soy una funcion cualquiera");
};
// AHORA EN ES6
// EXPORT - EXPORT DEFAULT
export default unafuncion;


/// TODO ESTO ERA COMMON JS//
// exports.nombre=nombre;
// exports.edad=edad;
// exports.direccion=direccion;



//tambien se pueden enviar funciones




// module.exports = {
//     nombre,
//     edad, 
//     direccion,
//     //unaFuncion,
// };

// console.log(exports);