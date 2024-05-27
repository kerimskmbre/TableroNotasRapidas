const express = require("express")
const app = express()
const path = require("path")
const mongoConnection = require("./config/mongoDB.config")
const port = 9020
const notaRoutes = require("./routes/notas.routes")
const userRoutes = require("./routes/user.routes")
const methodOverride = require("method-override")
const session = require("express-session")
const bodyParser = require("body-parser");

app.set("trust proxy", 1);
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")
app.use(methodOverride("_method"))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())


app.use(session({ secret: "123456789", cookie: { maxAge: 60000 }}))

app.use("/notas",notaRoutes)
app.use("/",userRoutes)


// LEVANTAR EL SERVIDOR //
app.listen(port, async() =>{
    console.log("http://localhost:" + port)
    await mongoConnection.establecerConexion()
})