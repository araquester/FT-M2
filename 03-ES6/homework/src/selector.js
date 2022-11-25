var traverseDomAndCollectElements = function(matchFunc, startEl) {
  var resultSet = [];

  if (typeof startEl === "undefined") {
    startEl = document.body;
  }

  // recorre el árbol del DOM y recolecta elementos que matchien en resultSet
  // usa matchFunc para identificar elementos que matchien

  // TU CÓDIGO AQUÍ
  
  //condicion base para la recursividad, si es true
  //tomo el elemento y lo agrego a resulset
  if(matchFunc(startEl)) resultSet.push(startEl);
  for(let i=0;i<startEl.children.length;i++){
    let result = traverseDomAndCollectElements(matchFunc, startEl.children[i]);
    resultSet = [...resultSet,...result];
  }
  return resultSet;
};

// Detecta y devuelve el tipo de selector
// devuelve uno de estos tipos: id, class, tag.class, tag


var selectorTypeMatcher = function(selector) {
  // tu código aquí
  if(selector[0]==="#") return "id"
  if(selector[0]===".") return "class"
  if(selector.includes(".")) return "tag.class"
  return "tag"
};

// NOTA SOBRE LA FUNCIÓN MATCH
// recuerda, la función matchFunction devuelta toma un elemento como un
// parametro y devuelve true/false dependiendo si el elemento
// matchea el selector.

var matchFunctionMaker = function(selector) {
  var selectorType = selectorTypeMatcher(selector);
  var matchFunction;
  if (selectorType === "id") { 
    //como el id es unico busco que el nombre del id
    //sea igual al nombre del selector
    matchFunction = (element)=>"#"+element.id===selector
  } else if (selectorType === "class") {
    //si es class yo voy a tener varias elementos
    //los cuales los puedo tener en un arreglo con
    //el metodo classlist, con el if los voy buscando
    //y cuando encuentre uno devuelve true al final
    //sino lo encontro devuelve false
    matchFunction = (element)=>{
      for (const cls of element.classList){
        if("."+ cls === selector) return true;
      }
      return false
      
    }
  } else if (selectorType === "tag.class") {
    matchFunction = (element) => {
    //ya llegado aqui me llego un selector tipo 
    // div.redondo donde div es el tag y redondo
    // es la clase, con el split divido esa cadena
    // en las dos partes que necesito div.redondo
    // ====> split (".") ====> ["div","redondo"]
    //               ↑      
    const [miTag, miClass] = selector.split(".");
    
    return (
      matchFunctionMaker(miTag)(element) &&
      matchFunctionMaker(`.` + `${miClass}`)(element)
);
};
  } else if (selectorType === "tag") {
    matchFunction = (element)=>{
      if(element.tagName.toLowerCase()===selector){
        return true;
      }else{
        return false;
      }
    }
  } 
  return matchFunction;
};

//creo la funcion signo de pesos que recibe un selector
//que puede ser tag,id, class
var $ = function(selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};
