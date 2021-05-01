let fs = require("fs");

console.log("***********Start*************");
// console.log(process.argv);
// console.log(process.argv[2]);
if (process.argv[2] == undefined) {
  console.log("Falta nombre carperta");
  console.log("***********End*************");
  return;
}

var libGlobal = [];
const source = process.argv[2];
let file = fs.readdirSync("./" + source);
carpetas = file.filter((a) => !a.includes("."));
if (carpetas.length != 0) {
  buscarCarpetas(source, carpetas);
}

console.log("==========================================");
let lala = libGlobal.map((a) => (a.includes("/") ? a.split("/")[0] : a));
libGlobalPosta = [];
lala.map((a) => (libGlobalPosta.includes(a) ? "" : libGlobalPosta.push(a)));
libGlobalPosta = libGlobalPosta.sort();
console.log("npm i " + libGlobalPosta.join(" "));
console.log("==========================================");
console.log("***********End*************");

function obtenerLibrerias(carpeta, nombreArchivo) {
  let dir = "./" + carpeta + "/" + nombreArchivo;
  //   console.log(dir);
  let archivo = fs.readFileSync(dir, "utf-8");
  const renglones = archivo.split("\n");
  const imports = renglones.filter((a) => a.includes("import"));
  let aux = [];
  imports.map((a) => {
    const e = a.split("from")[1];
    if (e != undefined) {
      aux.push(e);
    }
  });
  return aux
    .map((a) => a.split("'")[1])
    .filter((a) => !a.includes(".") && !a.includes("src"));
}

function buscarCarpetas(Raiz, carpetas) {
  carpetas.forEach((nombreCarpeta) => {
    if (nombreCarpeta != "node_modules") {
      nombreCarpeta = Raiz + "/" + nombreCarpeta;
      raiz = fs.readdirSync("./" + nombreCarpeta);
      archivosRaiz = raiz.filter((a) => a.includes("."));
      carpetasRaiz = raiz.filter((a) => !a.includes("."));
      archivosRaiz.forEach((nombreArchivo) => {
        let librerias = obtenerLibrerias(nombreCarpeta, nombreArchivo);

        if (librerias.length != 0) {
          //   console.log(librerias);
          librerias.map((a) =>
            libGlobal.includes(a)
              ? ""
              : a.includes("/")
              ? libGlobal.push(a.split()[0])
              : libGlobal.push(a)
          );
        }
      });
      if (carpetasRaiz.length != 0) {
        buscarCarpetas(nombreCarpeta, carpetasRaiz);
        //   console.log("lala");
      }
    }
  });
}
