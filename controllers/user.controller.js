const Nota = require("../models/notas.model")
const mongoose = require("../config/mongoDB.config")
const User = require("../models/user.model")
const mongoConn = require("../config/mongoDB.config")
exports.login = async function(req, res) {
    await mongoose.conectarMongoDB()
    const { username, password } = req.body
    let userFoundData = null
    await User.findByUsername(username, async function(userFound, err) {
        if (err) {
            res.render("error_login.ejs")
        } else {
            userFoundData = userFound
            const notas = await Nota.find()

            if (userFoundData) {
               
                if (userFoundData.password == password) {
                    req.session.userLogued = userFoundData

                    req.session.authType = userFoundData.profile === 'ADMIN' ? 'admin' : 'user'

                    const userLogged = req.session.userLogued
                
                    res.render("index.ejs",{notas,user:req.session.userLogued})
                } else {
                    res.render("error_login.ejs")
                }
            }
        }        
    })
}

exports.register = async function(req, res) {
    await mongoose.conectarMongoDB()
    const notas = await Nota.find()
    try {
        const newUser = new User(req.body)
        console.log(req.body)
        await newUser.save()
        const userCreated = await User.findOne({username: newUser.username})
        req.session.userLogued = userCreated
        res.render("index.ejs",{notas,user:req.session.userLogued})

           
    } catch (error) {
        console.error("Error al crear usuario:", error)
        res.render("error_usuario_existente.ejs", { notas })
    } finally {
        await mongoConn.close()
    }

    
}


exports.logout = (req, res) => {
    req.session.destroy()
    res.redirect("/")
}

exports.showLogin = async function(req, res) {
    await mongoConn.conectarMongoDB()
    res.render("login-register.ejs")
}

exports.showRegister = async function(req, res) {
    await mongoConn.conectarMongoDB()
    res.render("login-register.ejs")
}

