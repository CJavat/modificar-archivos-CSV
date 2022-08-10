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
    //let 

    if(validExtensions.includes(docType)) {
        //archivo valido.
        const fileReader = new FileReader();
        
        fileReader.addEventListener('load', e => {
            const fileUrl = fileReader.result;
            const textoArchivo = `<pre>${fileUrl}</pre>`;
            document.querySelector('#preview').innerHTML = textoArchivo;
            console.log(textoArchivo);
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
