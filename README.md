# Cifrado
Symmetric key encryption on development. 

### Output
```
El mensaje original es: Hola me llamo manolo!
La clave original es: abc

El mensaje original comprimido es:

�Hola me llamo manolo!                                                                  El mensaje original descomprimido es: Hola me llamo manolo!
                                                                                        El mensaje original transposicionado es: Haeloalo  a nolmlmmo!
El mensaje original destransposicionado es: Hola me llamo manolo!

El mensaje original encryptado con vernam es: ©ÑÏÂÐÆÏÍÃÐÐÐÂÐÒÍÑ
El mensaje original desencryptado es: Hola me llamo manolo!

El mensaje original encryptado con Chacha20-Poly1305 es: fde4a30fe25b27f4394d696be4cf1ed45fab2851bc                                                                             El mensaje original desencryptado es: Hola me llamo manolo!
La clave derivada es: ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad
El nonce utilizado es: 8712dd31b9db9a5613c4d0ed
El tag de Poly1305 es: 8908749d6b142a246a2154d7785d38b7
El mensaje original encryptado con Chacha y que incluye el tag de Poly y el IV es:
8712dd31b9db9a5613c4d0ed8908749d6b142a246a2154d7785d38b7666465346133306665323562323766343339346436393662653463663165643435666162323835316263                                                                                                                            Chacha20-Poly1305 + Vernam + Myszkowski: ÇÆÇÅÇÆÃÈÆÃÄÈÈÅÉÅÆÈÅÆ
Descifrado: Hola me llamo manolo!

Chacha20-Poly1305 + Vernam + Myszkowski (Including AuthTag and IV): ÄÃÅÃÆÆÃÇÆÃÆÇÅÅÇÇÄ
Descifrado: Hola me llamo manolo!
El nonce utilizado es: 8712dd31b9db9a5613c4d0ed                                         El tag de Poly1305 es: 8908749d6b142a246a2154d7785d38b7
```
