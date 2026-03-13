const express = require("express")
const { Post, Category } = require("../models")
const router = express.Router()

router.get("/", async (req, res) => {
    const posts = await Post.findAll()
    const categories = await Category.findAll()

    console.log(categories)
    res.render("home", { posts, categories })
})

router.get("/subir-meme", (req, res) => {
    res.render("memeUpload")
})

module.exports = { viewRoutes: router }