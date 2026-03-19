const express = require("express")
const router = express.Router()

const { 
    renderPosts, renderSubirMeme, renderLogin, renderRegister, renderPostsByCategory } = require("../controllers/views.controllers")

router.get("/", renderPosts)
router.get("/subir-meme", renderSubirMeme)
router.get("/login", renderLogin)
router.get("/register", renderRegister)
router.get("/categories/:slug", renderPostsByCategory)

module.exports = { viewRoutes: router }