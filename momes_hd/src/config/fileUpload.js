const fileUpload = require("express-fileupload")

const options = {
    createParentPath: true,       // Crea la carpeta de destino si no existe
    limits: { fileSize: 10 * 1024 * 1024 }, // Límite de tamaño de archivo (ej. 10MB)
    safeFileNames: true,          // Elimina caracteres extraños de los nombres de archivo
    preserveExtension: true,       // Conserva la extensión del archivo original,
}

const uploader = fileUpload(options)

module.exports = uploader