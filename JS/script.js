const dropArea = document.querySelector('.drag-drop');
const dragText = dropArea.querySelector('h2');
const button = dropArea.querySelector('button');
const input = dropArea.querySelector('#input-file');
const preview = document.querySelector('#preview');
const tabla = document.querySelector('#tabla');

let files;
let cadenaConTexto = '';

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
            const textoTerminado = agregarComas(resultado);
            mostrarTabla(textoTerminado);
        });
        fileReader.readAsText(file);
    } else {
        //No es archivo valido.
        console.log(docType);
        alert("No es un archivo valido");
        
    }
}

const agregarComas = (text) => {
    let texto = text;
    let contadorEspacios = 0;
    let contadorComas = 0;
    let cadena = '';
    let caracteres = /[a-zA-Z0-9]/g;
    let subCadena = '', aux = '';

    for(let i=0; i <= texto.length; i++) {
        cadena += texto[i];
        
        
        if(cadena.includes("\n") == true) {
            aux='';
            for(let i=0; i<cadena.length; i++) {
                
                aux += cadena[i];
                
                if((cadena[i] === " ")) {
                    contadorEspacios++;
                    
                    if(contadorEspacios>1) {
                        
                        if(aux.search(caracteres) != -1) {
                                aux = aux.trim();
                                aux = aux.replace('"','');
                                tabla.innerHTML = ``;
                                if(aux.includes("$") && aux.includes(",")) {
                                    aux = '"' + aux
                                    aux = aux + '"';
                                }
                                subCadena += aux;
                                subCadena += ',';
                                
                                aux = '';
                                contadorEspacios = 0;
                        }
                        else {
                            aux = aux.trim();
                            contadorEspacios = 0;
                        }
                    }
                }
                else if(cadena[i] === ",") {
                    contadorComas++;
                    
                    if(contadorComas == 4) {
                        aux = aux.trim();
                        aux = aux.replace('"','');
                        subCadena += aux;
                        subCadena += '\n';
                    }
                }
                else {
                    contadorComas = 0;
                    contadorEspacios = 0;
                }
            }
            cadena = '';
            contadorComas = 0;
        }
    }
    //console.log('subCadena\n' + subCadena);
    return subCadena;
}

const mostrarTabla = (cadenaConTexto) => {
    let fila = 0;
    let columna = 0;
    let textoTabla = '';
    let contadorComas = 0;
    let aux =  '', contAux = 0;
    let bandera = false;
    let caracteres = /[a-zA-Z0-9]/g;

    console.log('cadenaFinal\n'+cadenaConTexto);
    tabla.innerHTML = `<tr id="fila-${fila}"></tr>`;
    //document.querySelector(`#fila-${fila}`).innerHTML += `<td id="columna-1">fgfg</td>`;

    for(let i=0; i<cadenaConTexto.length; i++) {
        textoTabla += cadenaConTexto[i];
        if(cadenaConTexto[i] === ',') {
            console.log(cadenaConTexto[i]);
            contadorComas++;
            
            console.log(`contador de comas: ${contadorComas}`);

            if(contadorComas < 2 && cadenaConTexto[i+1] != ",") {
                console.log("textoTabla con includes" + textoTabla.includes('"'));
                console.log("textoTabla" + textoTabla);

                if(textoTabla.includes('"')) {
                    contAux++;
                    aux += textoTabla;
                    console.log("variable auxiliar: "+aux);
                    if(contAux > 1) {
                        aux = aux.replace(",","");
                        bandera = true;
                    }
                }
                else {
                    textoTabla = textoTabla.replace(",","");
                    document.querySelector(`#fila-${fila}`).innerHTML += `<td id="columna-${columna}">${textoTabla}</td>`;
                }
                
                if(bandera == true) {
                    aux = aux.replace(",","");
                    console.log("variable auxiliar SIN COMA: "+aux);
                    document.querySelector(`#fila-${fila}`).innerHTML += `<td id="columna-${columna}">${aux}</td>`;
                    bandera = false;
                }
                //document.querySelector(`#fila-${fila}`).innerHTML += `<td id="columna-${columna}">${textoTabla}</td>`;
                contadorComas = 0;
                textoTabla = '';
            }
            else {
                //-------------
                //fila++
                //columna = 0
            }
        }
        else if(contadorComas == 4 || contadorComas == 5) {
            //-- AGREGAR NUEVA FILA. --
            console.log("----search"+textoTabla.search(caracteres) != -1);
            console.log("---------textotabla"+textoTabla);
            if(textoTabla.search(caracteres) != -1) {
                textoTabla = textoTabla.replace(",","");
                textoTabla = textoTabla.replace(",","");
                textoTabla = textoTabla.replace(",","");
                textoTabla = textoTabla.replace(",","");
                textoTabla = textoTabla.replace(",","");
                document.querySelector(`#fila-${fila}`).innerHTML += `<td id="columna-${columna}">${textoTabla}</td>`;
                fila++;
                textoTabla = '';
                tabla.innerHTML += `<tr id="fila-${fila}"></tr>`;
                contadorComas = 0;
            }
            else {
                fila++;
                textoTabla = '';
                tabla.innerHTML += `<tr id="fila-${fila}"></tr>`;
                contadorComas = 0;
            }
        }
        else {
            
        }
    }

}
/*
    Codigo de paquete,Nombre,Medidas,Costo -10%,Precio,ML 20%,,,,,
    LVP-10-CHM,16x19mm,2x20m,"$1,670.58",2088.23,,,,
*/