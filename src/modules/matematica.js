const PI = 3.14;
function sumar(x, y) {
let resultado = x + y; 
return resultado;
}
function resta(x, y){
let resultado = x - y;
return resultado;
}
const multiplicar = (a, b) => {
 let resultado = a * b;
 return resultado
}

const dividir = (a, b) => {
 let resultado = a % b;
 return resultado
}
;
// Exporto todo lo que yo quiero exponer del módulo hacia el exterior.
export {PI, sumar, multiplicar, resta, dividir };