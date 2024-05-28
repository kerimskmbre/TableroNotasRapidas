const userController = require("../controllers/user.controller")
const express = require("express")
const router = express.Router()

//login-register
router.get("/", userController.showRegister)
// Crear/Registrar usuario
router.post("/", userController.register)

// Cargar la vista de login
router.get("/login", userController.showLogin)
// Autenticar
router.post("/login", userController.login)
//Logout//Desloguearse
router.get("/logout", userController.logout);




module.exports = router