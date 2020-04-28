# Secure Audio Player

This is a simple project where you can..
- "encrypt" the audio file and download the encrypted file (The encryption uses AES algorith)
- "decrypt" the said audio file and let you play on the browser

Everything is done on the client side, so the file(s) won't be saved elsewhere. 

### On decryption

In order to decrypt the encrypted file, a password is needed. However, for security reason, we have encrypted `password.json` file before pushing onto this repository. Thus, if you wish to implement these simple website, you can create your own `password.json` or change the password in the `script.js`.

### Library used

The library that is used to encrypt the file is `CryptoJS`. It is JavaScript implementations of standard and secure cryptographic algorithms For more information on `CryptoJS`, you can click [here](https://cryptojs.gitbook.io/docs/).

---

**Special thanks to...**   
[TutorialZine article](https://tutorialzine.com/2013/11/javascript-file-encrypter) for giving a rough idea and initial UI to this project   
[This stackoverflow post](https://stackoverflow.com/questions/21847182/decipher-an-aes-enciphered-binary-file-with-crypto-js) for helping (a lot) with decrypting encrypted audio file.
