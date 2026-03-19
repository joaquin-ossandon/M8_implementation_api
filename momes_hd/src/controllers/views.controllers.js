const { Post, Category } = require("../models")

const renderPosts = async (req, res) => {
    const { user } = req
    const { page = 1 } = req.query

    const limit = 3
    const offset = (page - 1) * limit

    const posts = await Post.findAndCountAll({
        limit,
        offset,
        order: [
            ["createdAt", "DESC"]
        ]
    })

    const categories = await Category.findAll()

    const pagesCount = Array.from({ length: Math.ceil(posts.count / limit) }, (value, index) => index + 1)


    res.render("home", { posts: posts.rows, categories, user, pagesCount })
}

const renderSubirMeme = (req, res) => {
    res.render("memeUpload", {
        user: req.user
    })
}

const renderLogin = (req, res) => {
    res.render("login")
}

const renderRegister = (req, res) => {
    res.render("register")
}

const renderPostsByCategory = async (req, res) => {
    const { user } = req
    const { page = 1 } = req.query
    const { slug } = req.params

    const limit = 3
    const offset = (page - 1) * limit

    const posts = await Post.findAndCountAll({
        limit,
        offset,
        include: {
            model: Category,
            where: {
                slug
            }
        },
        order: [
            ["createdAt", "DESC"]
        ]
    })

    const categories = await Category.findAll()

    const pagesCount = Array.from({ length: Math.ceil(posts.count / limit) }, (value, index) => index + 1)

    res.render("home", { posts: posts.rows, categories, user, pagesCount })
}

module.exports = {
    renderPosts,
    renderSubirMeme,
    renderRegister,
    renderLogin,
    renderPostsByCategory
}