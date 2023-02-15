# Cifrado
Symmetric key encryption on development. 

### Output
```
El mensaje original es: Hola me llamo manolo!
La clave original es: abc

El mensaje original comprimido es: �Hola me llamo manolo!
El mensaje original descomprimido es: Hola me llamo manolo!                             
El mensaje original transposicionado es: Haeloalo  a nolmlmmo!
El mensaje original destransposicionado es: Hola me llamo manolo!

El mensaje original encryptado con vernam es: ©ÑÏÂÐÆÏÍÃÐÐÐÂÐÒÍÑ
El mensaje original desencryptado es: Hola me llamo manolo!

El mensaje original encryptado con Chacha20-Poly1305 es: ec946494a29f2d57fb0628f4bc9fa50a66bfafe5c7
El mensaje original desencryptado es: Hola me llamo manolo!
La clave derivada es: ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad
El nonce utilizado es: badafa584ced2e58b2664e35
El tag de Poly1305 es: 76396e3f49bae54ec75a03d6b8a6a902
El mensaje original encryptado con Chacha y que incluye el tag de Poly y el IV es:
badafa584ced2e58b2664e3576396e3f49bae54ec75a03d6b8a6a902656339343634393461323966326435376662303632386634626339666135306136366266616665356337

Chacha20-Poly1305 + Vernam + Myszkowski: ÆÃÇÂÅÆÈÈÅÃÃÄÈÅÄÉÅÉÈ
Descifrado: Hola me llamo manolo!

Chacha20-Poly1305 + Vernam + Myszkowski (Including AuthTag and IV): ÃÂÄÆÆÆÃÃÈÇÇÄÈÄÅÃÆÃÇÄÇÈÄÄ
Descifrado: Hola me llamo manolo!
El nonce utilizado es: badafa584ced2e58b2664e35
El tag de Poly1305 es: 76396e3f49bae54ec75a03d6b8a6a902
