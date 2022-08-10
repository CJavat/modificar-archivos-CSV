const contenedor = document.getElementById('preview');

let texto = ''; // prompt("Escribe una cadena");
let contadorEspacios = 0;
//let contadorComas = 0;

let cadena = '';
let cadenaFinal = '';


let bandera = false;
let caracteres = /[a-zA-Z0-9]/g;
let finCadena = 0;

for(let i=0; i < texto.length; i++) {
    finCadena++;
    cadena += texto[i];

    if(texto.charAt(i) == ' ') {
        contadorEspacios++;
        
        if(contadorEspacios > 1) {
            //console.log("SEARCH"+cadena.search(caracteres));
            if(cadena.search(caracteres) != -1) {
                bandera=true;
            }
        }
    }
    else if(texto.charAt(i) == ',') {
        //contadorComas++;
        //console.log("soy una coma");
    }
    else if(finCadena == texto.length) {
        //console.log("final de la cadena: "+cadena);
        bandera = true;
    } 
    else {
        contadorEspacios = 0;
    }

    if(bandera == true) {
        cadenaFinal += cadena.trim();
        cadenaFinal += ',';
        cadena = '';
        bandera = false;
    }
}

console.log("cadena: " + cadena);
console.log("cadenaFinal: " + cadenaFinal);

//Codigo de paquete         Nombre            Medidas   Costo -10%     Precio       ML 20%
//                 [   9    ]     [     12    ]      [3]         [ 5  ]     [  7   ]
