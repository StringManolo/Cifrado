const { myszkowski, desmyszkowski } = require("./myszkowski.js");
const { vernam, desvernam } = require("./vernam.js");
const { deriveKeyFromText } = require("./sha256kd.js");
const { chacha20, deschacha20 } = require("./chacha20.js");

const crypto = require('crypto');
const zlib = require('zlib');                                                           

const text = "Hola, Hola, Hola";
const key = "abc";
const encrypted = myszkowski(text, key);
const decrypted = desmyszkowski(encrypted, key);

const encryptedVernam = vernam(text, key);
const decryptedVernam = desvernam(encryptedVernam, key);

const derivatedKey = deriveKeyFromText(key);
const concated = chacha20(text, derivatedKey);

const aibeat = myszkowski(vernam(concated, key), key);
const revAibeat = deschacha20(desvernam(desmyszkowski(aibeat, key), key), derivatedKey);

const compressed = zlib.brotliCompressSync(aibeat);
const uncompressed = zlib.brotliDecompressSync(compressed).toString("utf-8");

console.log(`El mensaje original es: ${text}
La clave original es: ${key}

El mensaje original transposicionado es: ${encrypted}
El mensaje original destransposicionado es: ${decrypted}

El mensaje original encryptado con vernam es: ${encryptedVernam}
El mensaje original desencryptado es: ${decryptedVernam}

La clave derivada es: ${deriveKeyFromText(key).toString("hex")}
El mensaje original encryptado con Chacha y que incluye el tag de Poly y el IV es:
${concated}

Chacha20-Poly1305 + Vernam + Myszkowski (Including AuthTag and IV): ${aibeat}
Descifrado: ${revAibeat}

Comprimido es: ${compressed}
Descomprimido es: ${uncompressed}
`);
