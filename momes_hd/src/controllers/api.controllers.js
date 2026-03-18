const path = require("node:path")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { Post, User } = require("../models")

const postMeme = async (req, res) => {
    const { file } = req.files
    const { description } = req.body
    const { id } = req.user

    try {
        const image_url = path.join("/public/images", file.name)
        await file.mv(path.join(process.cwd(), image_url)) // /raiz-proyecto/public/images/file-name.jpg

        await Post.create({
            description,
            image_url,
            userId: id
        })

        res.redirect("/")
    } catch (error) {
        console.log(error)
        res.redirect("/error")
    }
}

const login = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ where: { email } })

        const validPassword = await bcrypt.compare(password, user?.password)

        if (!user || !validPassword) {
            throw new Error("Credenciales inválidas")
        }

        const token = jwt.sign({
            id: user.id,
            email: user.email,
            name: user.name,
        }, process.env.TOKEN_SIGNATURE, {
            expiresIn: "1h"
        })

        res.cookie("jwt", token, {
            httpOnly: true,
            // secure: true // sólo funciona cuando nuestro server está sobre HTTPS
            sameSite: "strict"
        })

        res.redirect("/")
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error.message
        })
    }
}

const register = async (req, res) => {
    const { name, email, password } = req.body

    try {
        await User.create({
            name,
            email,
            password
        })

        res.redirect("/login")
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error.message
        })
    }
}

const logout = (req, res) => {
    res.clearCookie("jwt")
    res.redirect("/")
}

module.exports = {
    postMeme,
    login,
    register,
    logout
}