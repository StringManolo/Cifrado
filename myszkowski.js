function myszkowski(texto, clave) {                                                       // Eliminamos todos los espacios del texto
  // texto = texto.replace(/\s/g, '');
                                                                                          // Obtenemos la longitud de la clave y del texto                                        const longitud_clave = clave.length;
  const longitud_texto = texto.length;

  // Creamos una matriz de longitud_clave x longitud_texto
  const matriz = new Array(longitud_clave);
  for (let i = 0; i < longitud_clave; i++) {                                                matriz[i] = new Array(longitud_texto);
  }

  // Rellenamos la matriz con el texto plano
  let indice = 0;
  for (let j = 0; j < longitud_texto; j++) {
    for (let i = 0; i < longitud_clave; i++) {
      matriz[i][j] = texto.charAt(indice);
      indice++;
      if (indice >= longitud_texto) {
        break;
      }
    }
    if (indice >= longitud_texto) {
      break;                                                                                }
  }

  // Ordenamos la clave alfabéticamente
  const clave_ordenada = clave.split('').sort().join('');
                                                                                          // Obtenemos el orden de la clave
  const orden_clave = new Array(longitud_clave);
  for (let i = 0; i < longitud_clave; i++) {
    const letra = clave.charAt(i);
    orden_clave[i] = clave_ordenada.indexOf(letra);
  }

  // Construimos el texto cifrado
  let texto_cifrado = '';                                                                 for (let i = 0; i < longitud_clave; i++) {
    const columna = orden_clave.indexOf(i);
    for (let j = 0; j < longitud_texto; j++) {
      if (matriz[columna][j]) {
        texto_cifrado += matriz[columna][j];
      }
    }                                                                                     }                                                                                     
  return texto_cifrado;
}

function desmyszkowski(texto_cifrado, clave) {
  // Obtenemos la longitud de la clave y del texto cifrado                                const longitud_clave = clave.length;
  const longitud_texto_cifrado = texto_cifrado.length;

  // Creamos una matriz de longitud_clave x longitud_texto_cifrado
  const matriz = new Array(longitud_clave);
  for (let i = 0; i < longitud_clave; i++) {
    matriz[i] = new Array(longitud_texto_cifrado);
  }                                                                                     
  // Obtenemos el número de columnas de la matriz
  const numero_columnas = Math.ceil(longitud_texto_cifrado / longitud_clave);

  // Obtenemos el número de letras adicionales en la última columna de la matriz
  const letras_adicionales = (longitud_clave * numero_columnas) - longitud_texto_cifrado;                                                                                                                                                                                 // Ordenamos la clave alfabéticamente
  const clave_ordenada = clave.split('').sort().join('');

  // Obtenemos el orden de la clave                                                       const orden_clave = new Array(longitud_clave);
  for (let i = 0; i < longitud_clave; i++) {                                                const letra = clave.charAt(i);
    orden_clave[i] = clave_ordenada.indexOf(letra);
  }

  // Llenamos la matriz con el texto cifrado
  let indice = 0;
  for (let i = 0; i < longitud_clave; i++) {
    const columna = orden_clave.indexOf(i);
    let letras_columna = numero_columnas;
    if (columna >= longitud_clave - letras_adicionales) {
      letras_columna = numero_columnas - 1;
    }
    for (let j = 0; j < letras_columna; j++) {                                                matriz[columna][j] = texto_cifrado.charAt(indice);
      indice++;
    }
  }

  // Construimos el texto plano
  let texto_plano = '';                                                                   for (let j = 0; j < numero_columnas; j++) {                                               for (let i = 0; i < longitud_clave; i++) {
      if (matriz[i][j]) {
        texto_plano += matriz[i][j];
      }
    }
  }                                                                                     
  return texto_plano;                                                                   }


module.exports = { myszkowski, desmyszkowski };
