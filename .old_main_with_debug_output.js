const { myszkowski, desmyszkowski } = require("./myszkowski.js");
const { vernam, desvernam } = require("./vernam.js");
const { deriveKeyFromText } = require("./sha256kd.js");

const crypto = require('crypto');
const zlib = require('zlib');                                                           

const text = "Hola me llamo manolo!";
const key = "abc";
const encrypted = myszkowski(text, key);
const decrypted = desmyszkowski(encrypted, key);

const encryptedVernam = vernam(text, key);
const decryptedVernam = desvernam(encryptedVernam, key);

const nonce = crypto.randomBytes(12);
const cipher = crypto.createCipheriv('ChaCha20-Poly1305', deriveKeyFromText(key), nonce, { authTagLength: 16 });
let encryptedChacha = cipher.update(text, 'utf8', 'hex');
encryptedChacha += cipher.final('hex');
const tag = cipher.getAuthTag();                                                        
// Preppend the tag and the IV to the text
const concated = Buffer.concat([nonce, tag, Buffer.from(encryptedChacha)]).toString('hex');

let decipher = crypto.createDecipheriv('ChaCha20-Poly1305', deriveKeyFromText(key), nonce, { authTagLength: 16 });
let decryptedChacha = decipher.update(encryptedChacha, 'hex', 'utf8');
decryptedChacha += decipher.final('utf8');
const compressed = zlib.brotliCompressSync(text);
const uncompressed = zlib.brotliDecompressSync(compressed).toString("utf-8");


// This block is for debug, is not including iv and tag
// beat stand for (Block, Encryption And Transposition)
const beat = myszkowski(vernam(encryptedChacha, key), key);
// reuse decipher
decipher = crypto.createDecipheriv('ChaCha20-Poly1305', deriveKeyFromText(key), nonce, { authTagLength: 16 });
let revBeat = decipher.update( desvernam(desmyszkowski(beat, key), key), 'hex', 'utf-8');
revBeat += decipher.final('utf-8');                                                     


// This block is the good one, including iv and tag before encryption
// AIBEAT stand for (Autentication, IV, Block, Encryption And Transposition)
const aibeat = myszkowski(vernam(concated, key), key);
let revConcated = desvernam(desmyszkowski(aibeat, key), key);
const revIV = Buffer.from(revConcated.slice(0, 24), 'hex');
let revTag = revConcated.slice(24, 56);
revConcated = Buffer.from(revConcated.slice(56), 'hex').toString();


/* edit auth tag to check if it works
// debug only
revTag = revTag.replace(/[0-9]/g, 7);
*/

const aibeatDecipher = crypto.createDecipheriv('ChaCha20-Poly1305', deriveKeyFromText(key), nonce, { authTagLength: 16 });
aibeatDecipher.setAuthTag( Buffer.from(revTag, 'hex') )
let revAibeat = aibeatDecipher.update(revConcated, 'hex', 'utf-8');
try {
revAibeat += aibeatDecipher.final('utf-8');
} catch(err) {
// Wanna catch auth errors. This means that someone tryied to fool you editting one of your files.
console.log(`WARNING, CRITICAL. A REAL ATTACK ON YOUR FILES HAS BEEN DETECTED. THIS IS NOT A JOKE.
SOMEONE REMOVED SOME OF THE ENCRYPTION ON YOUR FILES, REPLACE SOME CONTENT AND ENCRYPTED IT BACK.
THIS CONTENT REPLACED PROBABLY CONTAINS EXPLOIT CODE, THERE NO OTHER REASSON TO DO THAT.
FOR SECURITY REASSONS FILES ARE NOT GOING TO BE DECRYPTED.
IF YOU'RE AN EXPERT IN CYBERSECURITY, YOU CAN EDIT THE CODE AND REMOVE THE METHOD .setAuthTag from the decryption

This attack has been detected using the algorithm Poly1305
https://en.wikipedia.org/wiki/Poly1305.`);
process.exit();
}

console.log(`El mensaje original es: ${text}
La clave original es: ${key}

El mensaje original comprimido es: ${compressed}
El mensaje original descomprimido es: ${uncompressed}

El mensaje original transposicionado es: ${encrypted}
El mensaje original destransposicionado es: ${decrypted}

El mensaje original encryptado con vernam es: ${encryptedVernam}
El mensaje original desencryptado es: ${decryptedVernam}

El mensaje original encryptado con Chacha20-Poly1305 es: ${encryptedChacha}
El mensaje original desencryptado es: ${decryptedChacha}
La clave derivada es: ${deriveKeyFromText(key).toString("hex")}
El nonce utilizado es: ${nonce.toString('hex')}
El tag de Poly1305 es: ${tag.toString('hex')}
El mensaje original encryptado con Chacha y que incluye el tag de Poly y el IV es:
${concated}

Chacha20-Poly1305 + Vernam + Myszkowski: ${beat}
Descifrado: ${revBeat}

Chacha20-Poly1305 + Vernam + Myszkowski (Including AuthTag and IV): ${aibeat}
Descifrado: ${revAibeat}
El nonce utilizado es: ${revIV.toString('hex')}
El tag de Poly1305 es: ${revTag}

`);
