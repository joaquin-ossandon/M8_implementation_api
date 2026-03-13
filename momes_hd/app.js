require("dotenv").config()

const uploader = require("./src/config/fileUpload")
const { sequelize } = require("./src/models")
const { viewRoutes } = require("./src/routes/views.route")
const { apiRoutes } = require("./src/routes/api.route")

const path = require("node:path")
const hbs = require("hbs")

const express = require("express")
const app = express()

const PORT = 3000

const viewsPath = path.join(__dirname, "/src/views")
const partialsPath = path.join(viewsPath, "/partials")

app.use("/bootstrap", express.static(path.join(__dirname, "/node_modules/bootstrap/dist")))
app.use(uploader)

app.set("view engine", "hbs")
app.set("views", viewsPath)

hbs.registerPartials(partialsPath)

app.use(viewRoutes)
app.use("/api", apiRoutes)

app.listen(PORT, () => {
    sequelize.sync({ alter: true })
    console.log(`Server listening on http://localhost:${PORT}`)
})