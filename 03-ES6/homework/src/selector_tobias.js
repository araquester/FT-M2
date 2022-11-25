var traverseDomAndCollectElements = function(matchFunc, startEl = document.body) {
      var resultSet = [];  // recorre el árbol del DOM y recolecta elementos que matchien en resultSet
      // usa matchFunc para identificar elementos que matchien  // TU CÓDIGO AQUÍ
      if(matchFunc(startEl)) resultSet.push(startEl)  for (let i = 0; i < startEl.children.length; i++) {
        let res = traverseDomAndCollectElements(matchFunc,startEl.children[i])
        //                 true o false
        resultSet = [...resultSet, ...res]  }
      return resultSet
    };// Detecta y devuelve el tipo de selector
    // devuelve uno de estos tipos: id, class, tag.class, tag//    Clase      id         tag          tag.class
    // .claseUno    #idUno     div          div.claseUno
    var selectorTypeMatcher = function(selector) {
      // tu código aquí
      if(selector[0] === "#") return "id"
      if(selector[0] === ".") return "class"
      // if(selector.split(".").length === 2) return "tag.class"
      if(selector.includes(".")) return "tag.class"
      // for (let i = 0; i < selector.length; i++) {
      //   if(selector[i] === ".") return "tag.class"
      // }
      return "tag"
    };// NOTA SOBRE LA FUNCIÓN MATCH
    // recuerda, la función matchFunction devuelta toma un elemento como un
    // parametro y devuelve true/false dependiendo si el elemento
    // matchea el selector.// ID
    //<body>  <div>    <h1>
    //idOne | idTwo |  id3 ==== #idTwo//CLASS
    // <div className: "classOne classRandom"//TAG
    //DIV === DIV//TAG.CLASS
    //div.classOne
    //h1.classRandom//div
    //h1//classOne
    //classRandomvar matchFunctionMaker = function(selector) {
      const selectorType = selectorTypeMatcher(selector); // id | class | tag.class | tag
      let matchFunction;
      if (selectorType === "id") {
        matchFunction = function (elem) {
         return "#" + elem.id  === selector
         //      #  +  idTwo       #idTwo
        }
      } else if (selectorType === "class") {
        matchFunction = function (elem) {
          for (const clase of elem.classList) {
            if("." + clase === selector) return true
          }
          return false
        }
      } else if (selectorType === "tag") {
        matchFunction = function (elem) {
         return elem.tagName === selector.toUpperCase()
        }
      } else if (selectorType === "tag.class") {
        matchFunction = function (elem) {
          let [tag,clase] = selector.split(".")      return matchFunctionMaker(tag)(elem) && matchFunctionMaker("." + clase)(elem)
          //        true                                     true
        }
      }
      return matchFunction;
    };var $ = function(selector) {
      var elements;
      var selectorMatchFunc = matchFunctionMaker(selector);
      elements = traverseDomAndCollectElements(selectorMatchFunc);
      return elements;
    };