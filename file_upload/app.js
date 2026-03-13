require("dotenv").config()
const express = require('express');
const app = express();
const fileUpload = require("express-fileupload")
const path = require("node:path")

const cloudinary = require("cloudinary").v2

cloudinary.config({
    secure: false
})

console.log(cloudinary.config());

const PORT = process.env.PORT || 3010;

// Middlewares
app.use(express.static(path.join(__dirname, "/public")))
app.use("/resources", express.static(path.join(__dirname, "/uploads")))

app.use(fileUpload({
    createParentPath: true,       // Crea la carpeta de destino si no existe
    limits: { fileSize: 10 * 1024 * 1024 }, // Límite de tamaño de archivo (ej. 10MB)
    // safeFileNames: true,          // Elimina caracteres extraños de los nombres de archivo
    preserveExtension: true,       // Conserva la extensión del archivo original,
}))

app.post("/upload", async (req, res) => {
    const { files } = req

    try {
        if (!files) {
            throw new Error("No hay ningun archivo")
        }

        const filePath = path.join(__dirname, "/uploads", files.file.name)

        // guardar archivo en nuestro sistema de archivos (local)
        await files.file.mv(filePath)

        // subir a servicio externo (cloudinary)
        const result = await cloudinary.uploader.upload(filePath, {
            use_filename: true,
            unique_filename: false,
            overwrite: true,
        })

        res.json({
            ok: true,
            resource: result.public_id,
            url: result.url
        })

    } catch (error) {
        console.log(error)
        if (err.code === 'ETOOBIG' || (err.message && err.message.includes('File size limit'))) {
            return res.status(413).json({ error: 'El archivo excede el límite de 5MB.' }); // 413 Payload Too Large
        }

        res.status(500).json({
            ok: false
        })
    }

})

app.listen(PORT, () => {
    console.log(`APP running on http://localhost:${PORT}`)
})