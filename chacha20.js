const crypto = require("crypto");

function chacha20 (text, key) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('ChaCha20-Poly1305', key, iv, { authTagLength: 16 });
  let encryptedChacha = cipher.update(text, 'utf8', 'hex');
  encryptedChacha += cipher.final('hex');
  const tag = cipher.getAuthTag();
  // Preppend the tag and the IV to the text
  const concated = Buffer.concat([iv, tag, Buffer.from(encryptedChacha)]).toString('hex');
  return concated;
}

function deschacha20 (ciphertext, key) {
  const revIV = Buffer.from(ciphertext.slice(0, 24), 'hex');
  const revTag = ciphertext.slice(24, 56);
  const chacha = Buffer.from(ciphertext.slice(56), 'hex').toString()

  /*
    // tag auth check debug code:
    // change revTag from CONST to LET 
    let revTag = ciphertext.slice(24, 56);
    
    // edit the tag to make it missmatch
    revTag = revTag.replace(/[0-9]/g, 7);
  */

  let decipher = crypto.createDecipheriv('ChaCha20-Poly1305', key, revIV, { authTagLength: 16 });
  decipher.setAuthTag( Buffer.from(revTag, 'hex') ); 
  let decryptedChacha = decipher.update(chacha, 'hex', 'utf8');
  try {
    decryptedChacha += decipher.final('utf8'); 
  } catch(err) {
    // Wanna catch auth errors. This means that someone tryied to fool you editting one of your files.
    console.log(`CRITICAL: A REAL ATTACK ON YOUR FILES HAS BEEN DETECTED. THIS IS NOT A JOKE.

Reason: 
SOMEONE REMOVED SOME OF THE ENCRYPTION ON YOUR FILES, REPLACED SOME CONTENT AND ENCRYPTED THEM BACK.

THIS ALLOWS AN ATTACKER TO INCLUDE MALWARE OR EXPLOIT CODE IN YOUR FILES.

FOR SECURITY REASSONS FILES ARE NOT GOING TO BE DECRYPTED.
IF YOU'RE AN EXPERT IN CYBERSECURITY, YOU CAN EDIT THE CODE AND REMOVE THE METHOD .setAuthTag from the decryption function deschacha20 included in the file chacha20.js
** This will remove the files authentication check and you will be able to decrypt the files ** 

This attack has been detected using the algorithm Poly1305
https://en.wikipedia.org/wiki/Poly1305.`);
    process.exit(); 
  }
  return decryptedChacha;
}

module.exports = { chacha20, deschacha20 };


