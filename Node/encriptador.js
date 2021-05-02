let fs = require("fs");
// const SHA256 = require("crypto-js/sha256");
// console.log(SHA256("lala").toString());
console.log("***********Start*************");
// // console.log(process.argv);
// // console.log(process.argv[2]);
if (process.argv[2] == undefined) {
  console.log(`
        ENCRIPTADOR
        -a  Abre el archivo y muestra su contenido
        -e  Encripta archivo si no se asigna contraseña es 'secret key 123'
        -p  Define contraseña se usa junto a otros comandos
        -m  Muestra el archivo desencriptado debe sumarse la contraseña con -p
        -d  Desencripta el archivo debe sumarse la contraseña con -p

        Ejemplo encriptar archivo
        node encriptar.js -e texto.txt -p CONTRASEÑA

        Ejemplo mostrar archivo desencriptado
        node encriptar.js -m texto.txt -p CONTRASEÑA

        Ejemplo desencriptar archivo
        node encriptar.js -d texto.txt -p CONTRASEÑA
  `);
  return;
}

// const source = process.argv[2];
// let file = fs.readdirSync("./" + source);
// carpetas = file.filter((a) => !a.includes("."));
const argumentos = process.argv;
var pass = "secret key 123";

if (arg("-p")) {
  const p = argumentos.indexOf("-p") + 1;
  pass = argumentos[p];
}
// console.log(process.argv);
if (arg("-c")) {
  // falta
  const c = argumentos.indexOf("-c") + 1;
  const carpeta = argumentos[c];
  // console.log(carpeta);
}

var CryptoJS = require("crypto-js");
if (arg("-a")) {
  const a = argumentos.indexOf("-a") + 1;
  const archivo = argumentos[a];
  //   console.log(archivo);
  const contenido = fs.readFileSync(archivo, "utf-8");
  // var CryptoJS = require("crypto-js");
  // Encrypt
  var ciphertext = CryptoJS.AES.encrypt(contenido, pass);
  // Decrypt
  var bytes = CryptoJS.AES.decrypt(ciphertext.toString(), pass);
  var plaintext = bytes.toString(CryptoJS.enc.Utf8);
  console.log("Texto \n", plaintext);
  console.log("\nTexto encriptado \n", ciphertext.toString());
}

if (arg("-e")) {
  const e = argumentos.indexOf("-e") + 1;
  const archivo = argumentos[e];
  //   console.log(archivo);
  const contenido = fs.readFileSync(archivo, "utf-8");
  // var CryptoJS = require("crypto-js");
  console.log(contenido, pass);
  // Encrypt
  const ciphertext = CryptoJS.AES.encrypt(contenido, pass);
  const dataEncriptada = ciphertext.toString();
  console.log(dataEncriptada);
  const escribirContenido = fs.writeFileSync(archivo, dataEncriptada);
  // Decrypt
  // var bytes = CryptoJS.AES.decrypt(ciphertext.toString(), "secret key 123");
  // var plaintext = bytes.toString(CryptoJS.enc.Utf8);
  // console.log(plaintext);
}

// console.log(arg("-da"));
if (arg("-d")) {
  const d = argumentos.indexOf("-d") + 1;
  const archivo = argumentos[d];
  //   console.log(archivo);
  const contenido = fs.readFileSync(archivo, "utf-8");
  // var CryptoJS = require("crypto-js");
  // Encrypt
  // const ciphertext = CryptoJS.AES.encrypt(contenido, "secret key 123");
  // const dataEncriptada = ciphertext.toString()
  // const escribirContenido = fs.writeFileSync(archivo,dataEncriptada)
  // Decrypt
  var bytes = CryptoJS.AES.decrypt(contenido, pass);
  const dataDencriptada = bytes.toString(CryptoJS.enc.Utf8);
  const escribirContenido = fs.writeFileSync(archivo, dataDencriptada);
  console.log(escribirContenido);
}
if (arg("-m")) {
  const m = argumentos.indexOf("-m") + 1;
  const archivo = argumentos[m];
  //   console.log(archivo);
  const contenido = fs.readFileSync(archivo, "utf-8");
  // console.log(contenido, pass);
  // var CryptoJS = require("crypto-js");
  // Encrypt
  // const ciphertext = CryptoJS.AES.encrypt(contenido, "secret key 123");
  // const dataEncriptada = ciphertext.toString()
  // const escribirContenido = fs.writeFileSync(archivo,dataEncriptada)
  // Decrypt
  var bytes = CryptoJS.AES.decrypt(contenido, pass);
  const dataDencriptada = bytes.toString(CryptoJS.enc.Utf8);
  console.log(dataDencriptada);
}

function arg(params) {
  return argumentos.includes(params);
}
