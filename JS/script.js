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
    
    
    let bandera = false;
    let banderaComas = false;

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
            contadorComas++;
            if(contadorComas == 4) {
                banderaComas = true;
            }
            //console.log("soy una coma");
        }
        else if(finCadena == texto.length) {
            console.log("longitud fincadena: "+finCadena);
            console.log("final de la cadena: "+cadena);
            /*banderaComas = true; */
            
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
        else if(banderaComas == true) {
            console.log("banderaComas"+cadenaFinal);
            //cadenaFinal += cadena.trimStart();
            cadenaFinal += ',,,';
            console.log("banderaComassin espacio"+cadenaFinal);
            //cadenaFinal += ',';
            banderaComas = false;
        }

        console.log(cadenaFinal);
    }
    console.log("CADENA TERMINADA: " + cadenaFinal);
}
