const express = require("express")
const router = express.Router()

const { 
    renderPosts, renderSubirMeme, renderLogin, renderRegister } = require("../controllers/views.controllers")

router.get("/", renderPosts)
router.get("/subir-meme", renderSubirMeme)
router.get("/login", renderLogin)
router.get("/register", renderRegister)

module.exports = { viewRoutes: router }