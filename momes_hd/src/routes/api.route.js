const express = require("express")
const router = express.Router()
const { postMeme, login, register, logout } = require("../controllers/api.controllers")

router.post("/upload-meme", postMeme)
router.post("/login", login)
router.post("/register", register)
router.get("/logout", logout)

module.exports = { apiRoutes: router }