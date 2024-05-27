const Nota = require("../models/notas.model")
const mongoose = require("../config/mongoDB.config")
const User = require("../models/user.model")
const bcrypt = require("bcrypt")
const mongoConn = require("../config/mongoDB.config")
exports.login = async function(req, res) {
    const { username, password } = req.body
    const pwd_textoPlano = password
    let userFoundData = null
    await mongoose.conectarMongoDB()
    await User.findByUsername(username, async function(userFound, err) {
        if (err) {
            res.render("error_login.ejs")
        } else {
            userFoundData = userFound
            await mongoose.conectarMongoDB()
            const notas = await Nota.find()

            if (userFoundData) {
                const validado = await bcrypt.compare(pwd_textoPlano, userFoundData.password)
        
                if (validado) {
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
    const newUser = new User(req.body)
    newUser.password = await bcrypt.hash(newUser.password, 12)
    await mongoose.conectarMongoDB()
    const notas = await Nota.find()
    try {
        await mongoConn.conectarMongoDB()
        const newUser = new User(req.body)
        newUser.password = await bcrypt.hash(newUser.password, 12)
        console.log(req.body)
        await newUser.save()
        const userCreated = await User.findOne({username: newUser.username})
      
        req.session.userLogued = userLogued
        res.render("index.ejs",{notas,user:req.session.userLogued})

           
    } catch (error) {
        console.error("Error al crear usuario:", error)
        res.render("error_usuario_existente.ejs", { notas })
    } finally {
        await mongoConn.close()
    }

    
}

exports.showLogin = function(req, res) {
    res.render("login-register.ejs")
}

exports.showRegister = function(req, res) {
    res.render("login-register.ejs")
}