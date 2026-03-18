require("dotenv").config()

const cookieParser = require("cookie-parser")
const uploader = require("./src/config/fileUpload")
const { sequelize } = require("./src/models")
const { viewRoutes } = require("./src/routes/views.route")
const { apiRoutes } = require("./src/routes/api.route")

const { formatDistanceToNow } = require("date-fns");
const { es } = require("date-fns/locale")

const path = require("node:path")
const hbs = require("hbs")

const express = require("express")
const { verifyToken } = require("./src/middlewares/tokenVerifier")
const app = express()

const PORT = 3000

const viewsPath = path.join(__dirname, "/src/views")
const partialsPath = path.join(viewsPath, "/partials")

app.use("/bootstrap", express.static(path.join(__dirname, "/node_modules/bootstrap/dist")))
app.use("/bootstrap/icons", express.static(path.join(__dirname, "/node_modules/bootstrap-icons/font")))

app.use("/public", express.static(path.join(__dirname, "/public")))

app.use(uploader)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(verifyToken)

app.set("view engine", "hbs")
app.set("views", viewsPath)

hbs.registerPartials(partialsPath)
hbs.registerHelper("relativeTime", (time) => {
    return formatDistanceToNow(new Date(time), { locale: es, addSuffix: true })
})

app.use(viewRoutes)
app.use("/api", apiRoutes)

app.listen(PORT, () => {
    sequelize.sync({ alter: true })
    console.log(`Server listening on http://localhost:${PORT}`)
})