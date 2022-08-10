const contenedor = document.getElementById('preview');

let texto = prompt("Escribe una cadena");
let contadorEspacios = 0;
let contador = 0;

for(let i=0; i < texto.length; i++) {
    
    if(texto.charAt(i) == ' ') {
        contador++;
        if(contador > 6) {
            console.log(texto.charAt(i));
            contadorEspacios++;
            contador = 0
        }
    }
    else {
        contador = 0;
    }
}
console.log(contadorEspacios);

//Codigo de paquete         Nombre            Medidas   Costo -10%     Precio       ML 20%
//                 [   9    ]     [     12    ]      [3]         [ 5  ]     [  7   ]

/*
    Logica: 
        Si se suman mas de 3 espacios significa que sera una celda nueva.
        ,,,,, <-- 5 comas es una fila nueva.

        Verificar que el CSV que tiene adriana esta escrito correctamente.
*/