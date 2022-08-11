const dropArea = document.querySelector('.drag-drop');
const dragText = dropArea.querySelector('h2');
const button = dropArea.querySelector('button');
const input = dropArea.querySelector('#input-file');
let files;

button.addEventListener("click", () => {
    input.click();
});

input.addEventListener("change", () => {
    files = this.files;
    dropArea.classList.add("active");
    showFiles(files)
    dropArea.classList.remove("active");
});

const showFiles = () => {
    if(files.length === undefined) {
        procesFile(files);
    } else {
        for(const file of files) {
            procesFile(file);
        }
    }
}

dropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropArea.classList.add("active");
    dragText.textContent = "Suelta para subir los archivos";
});

dropArea.addEventListener("dragleave", (e) => {
    e.preventDefault();
    dropArea.classList.remove("active");
    dragText.textContent = "Arrastra y Suelta imágenes";
});

dropArea.addEventListener("drop", (e) => {
    e.preventDefault();
    files = e.dataTransfer.files;
    showFiles(files);
    dropArea.classList.remove("active");
    dragText.textContent = "Arrastra y Suelta imágenes";
});

procesFile = (file) => {
    const docType = file.type;
    const validExtensions = ['text/plain','text/csv','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',];
    let resultado = ''; 

    if(validExtensions.includes(docType)) {
        //archivo valido.
        const fileReader = new FileReader();
        
        fileReader.addEventListener('load', e => {
            const fileUrl = fileReader.result;
            resultado = fileUrl;
            console.log(resultado);
            agregarComas(resultado);
            //onst textoArchivo = `<pre>${fileUrl}</pre>`;
            console.log(fileUrl.length);
            /* document.querySelector('#preview').innerHTML = textoArchivo;
            console.log(textoArchivo); */
        });
        fileReader.readAsText(file);
    } else {
        //No es archivo valido.
        console.log(docType);
        alert("No es un archivo valido");
        
    }
}

/* const uploadFile = (file) => {

} */



const agregarComas = (text) => {
    let texto = text;
    let contadorEspacios = 0;
    let contadorComas = 0;

    let cadena = '';
    let cadenaFinal = '';
    let cadenaConEspacios = '';
    
    let bandera = false;
    let banderaComas = false;

    let caracteres = /[a-zA-Z0-9]/g;
    let finCadena = 0;
    let subCadena = '', aux = '';

    for(let i=0; i <= texto.length; i++) {
        finCadena++;
        cadena += texto[i];
        if(texto.charAt(i)==',') {
            contadorComas++;
            /* console.log(contadorComas); */
        }
        
        if(cadena.includes("\n") == true | contadorComas == 4) {
            console.log('salto de linea: ' + cadena);
            //aux='';
            for(let i=0; i<cadena.length; i++) {
                console.log('valor de aux1-- ' + aux);
                aux += cadena[i];
                console.log("aux--"+aux);
                console.log("cad--"+cadena);
                console.log("aux con espacio = "+(aux.charAt(i) === ' '));
                console.log("aux con comas = "+(cadena.charAt(i) === ','));
                if((cadena.charAt(i) === " ") == true) {
                    contadorEspacios++;
                    console.log("contador de espacios----"+contadorEspacios);
                    if(contadorEspacios>1) {
                        console.log("cadena con 2 espacios: "+aux.trimStart());
                        //aux = aux.trimStart();

                        if(aux.search(caracteres) != -1) {
                            console.log("aux tiene caracteres y 2 espacios: "+aux);
                            console.log("aux sin trim:"+aux);
                            subCadena += aux.trimStart();
                            subCadena = subCadena.substring(0,subCadena.length-1);
                            subCadena += ',';

                            console.log("aux con trim:"+aux.trimStart());
                            aux = '';
                            contadorEspacios = 0;
                            console.log('valor de aux2-- ' + aux);
                            /* console.log("subcadena: "+subCadena);
                            subCadena += aux;
                            aux = '';
                            contadorEspacios = 0; */
                        }
                    }
                }
                else if((cadena.charAt(i) === ",")==true) {
                    console.log('entroooooo---'+cadena);
                    console.log('cont---'+contadorComas);

                    contadorComas++;
                    if(contadorComas == 4) {
                        console.log('cont comas---'+aux);
                        subCadena += aux.trimStart();
                    }
                }
                else {
                    contadorComas = 0;

                }
            }


            cadenaFinal += cadena;
            cadena = '';
            contadorComas = 0;
        }
        
        
    }
    //console.log("CADENA ORIGINAL: --> \n" + texto);
    //console.log("CADENA TERMINADA: --> \n" + cadenaFinal);
    console.log("CADENA TERMINADA: --> \n" + subCadena);
}



/*

falta quitarle los espacios y (' ").

Codigo de paquete         Nombre            Medidas   Costo -10%     Precio       ML 20%                         ,,,,
LVP-03-CHM            16x19mm               2x8m        $631.00         757.2     ,,,,
LVP-005-CK            13x15mm               1x3m        $130.00          256,,,,
LVP-06-CHM            19x19mm             2.3x3m        $235.00        293.75,,,,


*/