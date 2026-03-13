const express = require("express")
const router = express.Router()
const path = require("node:path")

router.post("/update-meme", async (req, res) => {
    const { file } = req.files

    await file.mv(path.join(process.cwd(), "/public/images", file.name))

    res.json({
        ok: true
    })
})

module.exports = { apiRoutes: router }