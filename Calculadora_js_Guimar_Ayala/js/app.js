var mdCalculadora = (function(document, undefined){
  var error_op = "La operación no existe.";
// los variables de las operaciones
  var newVal = false,
      maxLen = 9,
      nOp1 = 0,
      nOp2 = 0,
      result = 0,
      hasPoint = false;
      screenVal = "0",
      idBOp = "";
// los variables id de los teclados
  var btnsId  = {
    btn_onc  : "on",
    btn_sign : "sign",
    btn_raiz : "raiz",
    btn_div  : "dividido",
    btn_por  : "por",
    btn_menos: "menos",
    btn_punto: "punto",
    btn_igual: "igual",
    btn_mas  : "mas"
  };

  var domBtns;

  function initVars(){
    newVal = false;
    maxLen = 9;
    nOp1 = 0;
    nOp2 = 0;
    result = 0;
    hasPoint = false;
    screenVal = "0",
    idBOp = "";
  }
// los funcion llamando la clase
  var getBtns = function(){
    domBtns = document.getElementsByClassName("tecla");
  }

  var subscribeEvents = function(){
    for(var i = 0, len = domBtns.length; i < len; i++) {
        domBtns[i].onclick = events.eBtnClick;
    }
  }

  var events = {
    eBtnClick: function(e){
      switch (this.id) {
        case btnsId.btn_onc  :
          initVars();
          writeDisplay(screenVal);
          break;
        case btnsId.btn_sign :
          setSign();
          writeDisplay(screenVal);
          break;
        case btnsId.btn_raiz :
          break;
        case btnsId.btn_punto:
          addPoint();
          break;
        case btnsId.btn_igual:
          solveOp();
          break;
        case btnsId.btn_mas  :
        case btnsId.btn_menos:
        case btnsId.btn_por  :
        case btnsId.btn_div  :
          addBasicOps(this.id);
          break;
        default:
          addNumber(this.id);
      }
    }
  }

  function writeDisplay(value){
    if (value.length > maxLen) value = "ERROR";
    document.getElementById("display").innerHTML = value;
  }

  function solveOp(){
    if (screenVal.endsWith(".")) screenVal = screenVal.substr(0,screenVal.length-1);
    if (screenVal.length > maxLen) return;
    if (idBOp == ""){
      return;
    } else {
      nOp2 = Number(screenVal);
      switch (idBOp) {
        case btnsId.btn_mas:
          result = add(nOp1, nOp2);
          break;
        case btnsId.btn_menos:
          result = substract(nOp1, nOp2);
          break;
        case btnsId.btn_por:
          result = multiply(nOp1, nOp2);
          break;
        case btnsId.btn_div:
          result = divide(nOp1, nOp2);
          break;
        default:
          alert(error_op);
          return;
      }
      nOp2 = 0;
      screenVal = String(result);
      nOp1 = result;
    }
    if (screenVal.search(".") == - 1) maxLen = 9;
    else maxLen = 10;
    newVal = true;
    writeDisplay(screenVal);
    hasPoint = false;
    idBOp = "";
    maxLen = 9;
  }

  function setSign(){
    result = Number(screenVal);
    result = -1 * result;
    screenVal = String(result);
  }

  function addPoint(){
    if (hasPoint == true) return;
    if (screenVal.length > maxLen) return;
    if (newVal == false && screenVal.length == maxLen) return;
    if (newVal == true || screenVal == "0") screenVal = "0";
    screenVal = screenVal + ".";
    writeDisplay(screenVal);
    maxLen = 10;
    hasPoint = true;
    newVal = false;
  }

  function addNumber(id){
    if (screenVal.length > maxLen) return;
    if (newVal == false && screenVal.length == maxLen) return;
    if (newVal == true || screenVal == "0") screenVal = "";
    screenVal = screenVal + id;
    writeDisplay(screenVal);
    newVal = false;
  }

  function addBasicOps(id){
    if (screenVal.endsWith(".")) screenVal = screenVal.substr(0,screenVal.length-1);
    if (screenVal.length > maxLen) return;
    if (idBOp == ""){
      nOp1 = Number(screenVal);
    } else {
      nOp2 = Number(screenVal);
      switch (idBOp) {
        case btnsId.btn_mas:
          result = add(nOp1, nOp2);
          break;
        case btnsId.btn_menos:
          result = substract(nOp1, nOp2);
          break;
        case btnsId.btn_por:
          result = multiply(nOp1, nOp2);
          break;
        case btnsId.btn_div:
          result = divide(nOp1, nOp2);
          break;
        default:
          alert(error_op);
          return;
      }
      if (id != idBOp) {
            idBOp = id;
      }
      nOp2 = 0;
      screenVal = String(result);
      nOp1 = result;
    }
    if (screenVal.search(".") == - 1) maxLen = 9;
    else maxLen = 10;
    newVal = true;
    writeDisplay(screenVal);
    hasPoint = false;
    idBOp = id;
  }

// el inicio de las funciones Suma, Resta, Multiplicación, División y Raiz Cuadrada
  function add (v1, v2){
    return v1 + v2;
  }

  function substract (v1, v2){
    return v1 - v2;
  }

  function multiply (v1, v2){
    return v1 * v2;
  }

  function divide (v1, v2){
    return v1 / v2;
  }

// el fin de las funciones Suma, Resta, Multiplicación, División y Raiz Cuadrada

  var initialize = function(){
    initVars()
    getBtns();
    subscribeEvents();
  }

  return{
      init: initialize
  }

})(document);

mdCalculadora.init();
