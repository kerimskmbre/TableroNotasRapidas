const Nota = require("../models/notas.model")
const mongoose = require("../config/mongoDB.config")

const usuario = {}
exports.findAllNotas = async (req, res) => {
    await mongoose.conectarMongoDB()
    await Nota.findNotas((error, categorias) => {
        if (error) {
            res.status(500).json(error)
        } else {
            res.status(200).json(categorias)
        }
    })
    
}

exports.findNotasById = async (req, res) => {
    await mongoose.conectarMongoDB()
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
    await mongoose.conectarMongoDB()
    const newNota = new Nota(req.body)
    usuario = req.session.userLogued
    const notas = Nota.find({nombre:usuario.nombre})
    if((await notas).length == 3){
        res.render("error_notas.ejs")
    }else{
        await newNota.save()
        res.redirect("/notas/show/index")
    }
}

exports.updateNota = async (req, res) => {
    await mongoose.conectarMongoDB()
    const notaToUpdate = req.body
    const { id } = req.params
    await Nota.updateNota(id, notaToUpdate, (error, updatedNota) => {
        if (error) {
            res.status(500).json(error)
        } else {
            res.status(200).json(updatedNota)
        }
    })
    res.redirect("/notas/show/index")
}

exports.deleteNota = async (req, res) => {
    await mongoose.conectarMongoDB()
    const { id } = req.params
    await Nota.deleteNota(id, (error, notaDeleted) => {
        if (error) {
            res.status(500).json(error)
        } else {
            res.status(200).json(notaDeleted)
        }
    })
    res.redirect("/notas/show/index")
}

exports.renderIndex = async (req,res) =>{
    await mongoose.conectarMongoDB()
    const notas = await Nota.find()
    console.log(req.session.userLogued)
    usuario = req.session.userLogued
    res.render("index.ejs",{notas,user:usuario})
}

exports.renderNewNota = async(req,res) =>{
    await mongoose.conectarMongoDB()
    usuario = req.session.userLogued
    res.render("newNota.ejs",{user:usuario})
}



