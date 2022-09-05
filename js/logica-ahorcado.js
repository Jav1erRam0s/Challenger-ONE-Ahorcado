/* ---------------------------- INICIALIZACION --------------------------- */

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

function reiniciarGraf() {
  // Fondo
  var pantalla = document.querySelector("canvas");
  var pincel = pantalla.getContext("2d");
  pincel.fillStyle = "grey";
  pincel.fillRect(0, 0, 300, 500);
  pincel.fill();

  pincel.fillStyle = "red";
  pincel.beginPath();
  pincel.lineWidth = 10;

  // Base
  pincel.moveTo(50, 375);
  pincel.lineTo(250, 375);

  // Mastil
  pincel.moveTo(100, 25);
  pincel.lineTo(100, 375);

  pincel.moveTo(100, 25);
  pincel.lineTo(200, 25);

  pincel.moveTo(200, 25);
  pincel.lineTo(200, 75);

  pincel.stroke();
}

function limpiarPanelTexto() {
  var pantalla = document.getElementById("panelText");
  var pincel = pantalla.getContext("2d");
  pincel.fillStyle = "grey";
  pincel.fillRect(0, 0, 300, 70);
  pincel.fill();
}

function limpiarPanelLetrasUsadas() {
  var pantalla = document.getElementById("panelLetrasUsadas");
  var pincel = pantalla.getContext("2d");
  pincel.fillStyle = "grey";
  pincel.fillRect(0, 0, 700, 70);
  pincel.fill();
}

/* --------------------------- DIBUJAR GRAFICO --------------------------- */

function actualizarGrafico(intentos) {
  var pantalla = document.querySelector("canvas");
  var pincel = pantalla.getContext("2d");
  pincel.fillStyle = "black";
  pincel.beginPath();
  pincel.lineWidth = 10;
  if (intentos == 5) {
    // Cabeza
    pincel.arc(200, 100, 30, 0, 2 * 3.14);
  } else if (intentos == 4) {
    // Cuerpo
    pincel.moveTo(200, 130);
    pincel.lineTo(200, 250);
  } else if (intentos == 3) {
    // Brazo izquierdo
    pincel.moveTo(200, 160);
    pincel.lineTo(250, 210);
  } else if (intentos == 2) {
    // Brazo derecho
    pincel.moveTo(200, 160);
    pincel.lineTo(150, 210);
  } else if (intentos == 1) {
    // Pierna izquierda
    pincel.moveTo(200, 250);
    pincel.lineTo(250, 300);
  } else if (intentos == 0) {
    // Pierna derecha
    pincel.moveTo(200, 250);
    pincel.lineTo(150, 300);
  }
  pincel.stroke();
  pincel.fill();
}

function escribirPanelTexto() {
  var pantalla = document.getElementById("panelText");
  var pincel = pantalla.getContext("2d");

  var texto = "";
  for (index in estado_de_ahorcado) {
    texto = texto + estado_de_ahorcado[index];
  }

  pincel.font = "35px Georgia";
  pincel.fillStyle = "black";
  pincel.textAlign = "center";
  pincel.fillText(texto, 150, 45);
}

function escribirPanelLetrasUsadas() {
  var pantalla = document.getElementById("panelLetrasUsadas");
  var pincel = pantalla.getContext("2d");

  var texto = "";
  for (index in letras_ya_introducidas) {
    texto = texto + " " + letras_ya_introducidas[index];
  }

  pincel.font = "25px Georgia";
  pincel.fillStyle = "red";
  pincel.textAlign = "center";
  pincel.fillText(texto, 350, 45);
}
/* -------------------------------- JUEGO -------------------------------- */

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
  // inicialGraf y panelText
  reiniciarGraf();
  limpiarPanelTexto();
  // Inicializamos las variables
  intentos = 6;
  estado_de_ahorcado = [];
  letras_ya_introducidas = [];
  palabraElegida = elegirPalabra();
  escribirPanelTexto();
  limpiarPanelLetrasUsadas();
  //console.log("PALABRA ELEGIDA : " + palabraElegida);

  document.addEventListener(
    "keydown",
    (event) => {
      var letra_entrante = event.key.toUpperCase();
      if (
        validarLetra(letra_entrante) &&
        letras_ya_introducidas.includes(letra_entrante) == false &&
        intentos > 0 &&
        estadoAhorcadoCompleto() == false
      ) {
        letras_ya_introducidas.push(letra_entrante);
        limpiarPanelLetrasUsadas();
        escribirPanelLetrasUsadas();
        //console.log("LETRA INTRODUCIDA : " + letra_entrante);

        // Analizar letra entrante
        var indices = buscarLetra(letra_entrante);
        if (indices.length != 0) {
          // Actualizar estado ahorcado
          actualizarEstadoAhorcado(indices, letra_entrante);
          //console.log("ESTADO AHORCADO : " + estado_de_ahorcado);
          limpiarPanelTexto();
          escribirPanelTexto();
        } else {
          //console.log("ESTADO AHORCADO : " + estado_de_ahorcado);
          intentos = intentos - 1;
          actualizarGrafico(intentos);
          //console.log("INTENTOS " + intentos);
        }

        // Evaluar si gano el juego.
        if (intentos > 0 && estadoAhorcadoCompleto()) {
          alert("¡ FELICIDADES GANO EL JUEGO !");
        }

        //console.log("**************************");

        if (intentos == 0) {
          alert("¡ PERDISTE ! La palabra era : " + palabraElegida);
        }
      }
    },
    false
  );
}

/* ------------------------ GUARDAR PALABRA NUEVA ------------------------ */

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

/* ----------------------------------------------------------------------- */
