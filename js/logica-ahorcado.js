localStorage.setItem("0", "CONTROL");
localStorage.setItem("1", "ELECTRONICA");
localStorage.setItem("2", "MOUSE");
localStorage.setItem("3", "CORAZON");
localStorage.setItem("4", "TELEVISOR");
localStorage.setItem("5", "MATE");
localStorage.setItem("6", "INFORMATICA");
localStorage.setItem("7", "MECANICA");
localStorage.setItem("8", "RATON");
localStorage.setItem("9", "NARANJA");

var palabraElegida = "";
var estado_de_ahorcado = [];
var letras_ya_introducidas = [];
let intentos = 6;

function elegirPalabra() {
  var random = Math.floor(Math.random() * localStorage.length);
  for (let iterator of localStorage.getItem(random)) {
    estado_de_ahorcado.push("-");
  }
  return localStorage.getItem(random);
}

function validarLetra(letra) {
  expresion = /[A-Z]/g;
  if (letra.length == 1 && letra.match(expresion)) {
    return true;
  } else {
    return false;
  }
}

function estadoAhorcadoCompleto() {
  if (estado_de_ahorcado.includes("-")) {
    return false;
  } else {
    return true;
  }
}

function buscarLetra(letra) {
  var indices = [];
  for (const pos in palabraElegida) {
    if (palabraElegida[pos] == letra) {
      indices.push(pos);
    }
  }
  return indices;
}

function actualizarEstadoAhorcado(indices, letra) {
  for (const index in indices) {
    estado_de_ahorcado[indices[index]] = letra;
  }
}

function inicialJuego() {
  // Inicializamos las variables
  intentos = 6;
  estado_de_ahorcado = [];
  letras_ya_introducidas = [];
  palabraElegida = elegirPalabra();
  console.log("PALABRA ELEGIDA : " + palabraElegida);

  document.addEventListener(
    "keydown",
    (event) => {
      var letra_entrante = event.key.toUpperCase();
      if (
        validarLetra(letra_entrante) &&
        letras_ya_introducidas.includes(letra_entrante) == false
      ) {
        letras_ya_introducidas.push(letra_entrante);
        console.log("LETRA INTRODUCIDA : " + letra_entrante);

        // Analizar letra entrante
        var indices = buscarLetra(letra_entrante);
        if (indices.length != 0) {
          // Actualizar estado ahorcado
          actualizarEstadoAhorcado(indices, letra_entrante);
          console.log("ESTADO AHORCADO : " + estado_de_ahorcado);
        } else {
          console.log("ESTADO AHORCADO : " + estado_de_ahorcado);
          intentos = intentos - 1;
          console.log("INTENTOS " + intentos);
        }

        // Evaluar si gano el juego.
        if (intentos > 0 && estadoAhorcadoCompleto()) {
          alert("¡ FELICIDADES GANO EL JUEGO !");
        }

        console.log("**************************");

        if (intentos == 0) {
          alert("¡ PERDISTE !");
        }
      }
    },
    false
  );
}

/* --------------------------------------------------------------------------- */

function incluida(palabra) {
  for (var i = 0, len = localStorage.length; i < len; i++) {
    var key = localStorage.key(i);
    var value = localStorage[key];
    if (value == palabra) {
      return true;
    }
  }
  return false;
}

function guardar() {
  var palabra = document.getElementById("input-text").value.toUpperCase();

  if (incluida(palabra)) {
    alert("La palabra ya se encuentra incluida");
    return;
  }
  localStorage.setItem(localStorage.length, palabra);

  alert("Se guardo con exito");
  window.location.replace("juego.html");
}
