const notaController = require("../controllers/notas.controller")
const express = require("express")
const router = express.Router()

//Obtener todas las notas
router.get("/z",notaController.findAllNotas)
//Obtener una nota 
router.get("/nota/:id",notaController.findNotasById)
//Crear una nota
router.post("/new",notaController.newNota)
//Actualizar una nota
router.post("/:id",notaController.updateNota)
//Eliminar una nota
router.delete("/:id",notaController.deleteNota)
//renderizar pagina principal
router.get("/show/index",notaController.renderIndex)
//renderizar pagina de creación de notas
router.get("/new/nota",notaController.renderNewNota)






module.exports = router