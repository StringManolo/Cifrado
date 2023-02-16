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

  let decipher = crypto.createDecipheriv('ChaCha20-Poly1305', key, revIV, { authTagLength: 16 });
  decipher.setAuthTag( Buffer.from(revTag, 'hex') ); 
  let decryptedChacha = decipher.update(chacha, 'hex', 'utf8');
//  try {
    decryptedChacha += decipher.final('utf8'); 
//  } catch() {
//    console.log("Critical, attack detected, auth missmatch");
//  }
  return decryptedChacha;
}

module.exports = { chacha20, deschacha20 };


