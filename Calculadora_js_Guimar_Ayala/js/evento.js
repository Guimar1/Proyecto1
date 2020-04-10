// Se cambia el tamaño de la img
function cambiaTamanio(){
  if (document.images) {
    document.images.logo.width=200;
    document.images.logo.height=200;
  } else {
    logo = document.getElementsByClassName("teclado");
    logo.width = 200;
    logo.height = 200;
  }
}
