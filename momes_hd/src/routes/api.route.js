const express = require("express")
const router = express.Router()
const path = require("node:path")

router.post("/update-meme", async (req, res) => {
    const { file } = req.files

    await file.mv(path.join(process.cwd(), "/public/images", file.name)) // /raiz-proyecto/public/images/file-name.jpg

    res.redirect("/")
})

module.exports = { apiRoutes: router }