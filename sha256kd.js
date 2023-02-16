const crypto = require("crypto");

function deriveKeyFromText(textKey) {
  // Convertir la clave de texto en un búfer de datos
  const keyBuffer = Buffer.from(textKey, 'utf-8');

  // Calcular el hash SHA-256 de la clave de texto
  const hash = crypto.createHash('sha256').update(keyBuffer).digest();

  // Devolver los primeros 32 bytes del hash como la nueva clave
  return hash.slice(0, 32);
}

module.exports = { deriveKeyFromText };
