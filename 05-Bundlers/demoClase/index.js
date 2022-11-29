
// var a = require('./week.js');

// console.log(a.name(0));
// console.log(a.number("Lunes"));
//destrcuturing en javascript con es6
// const {nombre, edad, direccion} = require("./datos");
// const imprimirdatos = require("./imprimirDatos");
// console.log("Buenos dias estos son mis datos");
// imprimirdatos(nombre,edad,direccion);
// console.log("Hasta luego");

/// ES6
import {nombre, edad, direccion} from "./datos";
import imprimirdatos from "./imprimirDatos";
console.log("Buenos dias estos son mis datos");
imprimirdatos(nombre,edad,direccion);
console.log("Hasta luego");