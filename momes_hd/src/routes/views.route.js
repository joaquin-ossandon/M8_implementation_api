const express = require("express")
const { Post } = require("../models")
const router = express.Router()

router.get("/", async (req, res) => {
    const posts = await Post.findAll()
    res.render("home", { posts })
})

router.get("/subir-meme", (req, res) => {
    res.render("memeUpload")
})

module.exports = { viewRoutes: router }