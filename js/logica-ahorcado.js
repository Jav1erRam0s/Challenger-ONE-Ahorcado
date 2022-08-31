var lista_de_palabras = [
  "ELECTRONICA",
  "MOUSE",
  "CORAZON",
  "TELEVISOR",
  "MATE",
  "INFORMATICA",
  "MECANICA",
  "RATON",
  "NARANJA",
  "CONTROL",
];

var palabraElegida = "";
var estado_de_ahorcado = [];
var letras_ya_introducidas = [];
let intentos = 6;

function elegirPalabra() {
  var random = Math.floor(Math.random() * lista_de_palabras.length);
  for (let iterator of lista_de_palabras[random]) {
    estado_de_ahorcado.push("-");
  }
  console.log(lista_de_palabras);
  return lista_de_palabras[random];
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

function guardar() {
  var palabra = "MARADONA";
  if (lista_de_palabras.includes(palabra)) {
    alert("La palabra ya se encuentra incluida");
    return;
  }
  lista_de_palabras.push(palabra);
  alert("Se guardo con exito");
}
