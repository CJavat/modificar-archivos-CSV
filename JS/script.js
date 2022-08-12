const dropArea = document.querySelector('.drag-drop');
const dragText = dropArea.querySelector('h2');
const button = dropArea.querySelector('button');
const input = dropArea.querySelector('#input-file');
const preview = document.querySelector('#preview');
const tabla = document.querySelector('#tabla');
const botonDescargar = document.querySelector('#botonDescargar');

let files;
let cadenaConTexto = '';
let textoTerminado = '';

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
            //console.log(resultado);
            textoTerminado = agregarComas(resultado);
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
    let cadena = '';
    let subCadena = '';
    let aux = '';
    let contadorEspacios = 0;
    let contadorComas = 0;
    let caracteres = /[a-zA-Z0-9]/g;

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
    let cadenaDiferente =  '';
    let textoTabla = '';
    let contadorComas = 0;
    let contadorComillas = 0;
    let dosComillas = false;
    let caracteres = /[a-zA-Z0-9]/g;

    preview.classList.add("preview");
    tabla.classList.add("tabla");

    //console.log('cadenaFinal\n'+cadenaConTexto);
    tabla.innerHTML = `<tr id="fila-${fila}"></tr>`;

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
                    contadorComillas++;
                    cadenaDiferente += textoTabla;
                    console.log("variable auxiliar: "+cadenaDiferente);
                    if(contadorComillas > 1) {
                        cadenaDiferente = cadenaDiferente.replace(",","");
                        dosComillas = true;
                    }
                }
                else {
                    textoTabla = textoTabla.replace(",","");
                    document.querySelector(`#fila-${fila}`).innerHTML += `<td id="columna-${columna}">${textoTabla}</td>`;
                }
                
                if(dosComillas == true) {
                    cadenaDiferente = cadenaDiferente.replace(",","");
                    console.log("variable auxiliar SIN COMA: "+cadenaDiferente);
                    document.querySelector(`#fila-${fila}`).innerHTML += `<td id="columna-${columna}">${cadenaDiferente}</td>`;
                    dosComillas = false;
                    cadenaDiferente = '';
                    contadorComillas = 0;
                }
                contadorComas = 0;
                textoTabla = '';
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
    }
    //Agregar el botón de descargar.
    botonDescargar.innerHTML = '<button id="descargar">Descargar Archivo</button>';
    document.querySelector('#descargar').addEventListener("click",() =>{
        exportar(textoTerminado,"archivo.csv")
    });
    
}

exportar = (contenido, nombreArchivo) => {
    const a = document.createElement("a");
    const contenidoArchivo = contenido,
                    blob = new Blob([contenidoArchivo],{type: "octet/stream"}),
                    url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = nombreArchivo;
    a.click();
    window.URL.revokeObjectURL(url);
}