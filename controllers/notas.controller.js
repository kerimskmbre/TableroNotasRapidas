const Nota = require("../models/notas.model")

exports.findAllNotas = async (req, res) => {
    await Nota.findNotas((error, categorias) => {
        if (error) {
            res.status(500).json(error)
        } else {
            res.status(200).json(categorias)
        }
    })
}

exports.findNotasById = async (req, res) => {
    const { id } = req.params
    console.log(id)
    try{
        const nota = await Nota.findNotasById(id)
        res.status(200).json(nota)
    }catch(err){
        res.status(500).json(err)
    }
}

exports.newNota= async (req, res) => {
    const newNota = new Nota(req.body)
    await Nota.createNota(newNota, (error, notaCreated) => {
        if (error) {
            res.status(500).json(error)
        } else {
            res.status(200).json(notaCreated)
        }
    })
    res.redirect("/")
}

exports.updateNota = async (req, res) => {
    const notaToUpdate = req.body
    const { id } = req.params
    await Nota.updateNota(id, notaToUpdate, (error, updatedNota) => {
        if (error) {
            res.status(500).json(error)
        } else {
            res.status(200).json(updatedNota)
        }
    })
    res.redirect("/")
}

exports.deleteNota = async (req, res) => {
    const { id } = req.params
    await Nota.deleteNota(id, (error, notaDeleted) => {
        if (error) {
            res.status(500).json(error)
        } else {
            res.status(200).json(notaDeleted)
        }
    })
    res.redirect("/")
}

exports.renderIndex = async (req,res) =>{
    const notas = await Nota.find()
    res.render("index.ejs",{notas})
}

exports.renderNewNota = async(req,res) =>{
    res.render("newNota.ejs")
}