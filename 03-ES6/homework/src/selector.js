var traverseDomAndCollectElements = function (matchFunc, startEl = document.body) {
  var resultSet = [];

  /* if (typeof startEl === "undefined") {
    startEl = document.body;
  } */

  // recorre el árbol del DOM y recolecta elementos que matchien en resultSet
  // usa matchFunc para identificar elementos que matchien

  // TU CÓDIGO AQUÍ
  if (matchFunc(startEl)) resultSet.push(startEl);
  for (let i = 0; i < startEl.children.length; i++) {
    const element = traverseDomAndCollectElements(matchFunc, startEl.children[i]); // startEl.children[i];
    resultSet = [...resultSet, ...element];
  }
  return resultSet;
};

// Detecta y devuelve el tipo de selector
// devuelve uno de estos tipos: id, class, tag.class, tag


var selectorTypeMatcher = function (selector) {
  // tu código aquí

  //si empieza con . --> clase

  //si empieza  con # --> id

  //si no tiene . ni # --> tag

  //si tiene . en el medio  --> tag.class

  if (selector[0] === '.') return 'class';

  if (selector[0] === '#') return 'id';

  for (let i = 0; i < selector.length; i++) {
    if (selector[i] === '.') return 'tag.class';

  }
  return 'tag';

};

// NOTA SOBRE LA FUNCIÓN MATCH
// recuerda, la función matchFunction devuelta toma un elemento como un
// parametro y devuelve true/false dependiendo si el elemento
// matchea el selector.

var matchFunctionMaker = function (selector) {
  var selectorType = selectorTypeMatcher(selector);
  var matchFunction;
  if (selectorType === "id") {
    matchFunction = (el) => `#${el.id}` === selector;
  } else if (selectorType === "class") {
    matchFunction = (el) => {
      for (let i = 0; i < el.classList.length; i++) {
        if ('.' + el.classList[i] === selector)
          return true;
      }
      return false;
    } //el.classList.contains(selector.substring(1)); //`.${el.class}` === selector;

  } else if (selectorType === "tag.class") {
    matchFunction = function (el) {
      let arr = [tagSearch, classSearch] = selector.split('.');
      return matchFunctionMaker(tagSearch)(el) && matchFunctionMaker('.' + classSearch)(el);
    }

  } else if (selectorType === "tag") {
    matchFunction = function (el) {
      return el.tagName.toLowerCase() === selector; //selector.toUppercase
    }
  }
  return matchFunction;
};

var $ = function (selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};
