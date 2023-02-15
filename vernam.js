// Cifra un mensaje utilizando la clave proporcionada
function vernam(mensaje, clave) {
  let cifrado = "";
  for (let i = 0; i < mensaje.length; i++) {
    let asciiMensaje = mensaje.charCodeAt(i);
    let asciiClave = clave.charCodeAt(i % clave.length);
    let asciiCifrado = (asciiMensaje + asciiClave) % 256;
    cifrado += String.fromCharCode(asciiCifrado);
  }
  return cifrado;
}

// Descifra un mensaje utilizando la clave proporcionada
function desvernam(cifrado, clave) {
  let mensaje = "";
  for (let i = 0; i < cifrado.length; i++) {
    let asciiCifrado = cifrado.charCodeAt(i);
    let asciiClave = clave.charCodeAt(i % clave.length);
    let asciiMensaje = (asciiCifrado - asciiClave + 256) % 256;
    mensaje += String.fromCharCode(asciiMensaje);
  }
  return mensaje;
}

module.exports = { vernam, desvernam };
