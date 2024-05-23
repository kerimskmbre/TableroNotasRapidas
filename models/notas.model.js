const mongoose = require("mongoose")
const { type } = require("os")

const notaSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: true,
    },
    texto:{
        type:String,
        required: true
    },
    fecha:{
        type:String,
        required:true
    }
})

const Nota = mongoose.model("Nota",notaSchema)

Nota.findNotas = async function() {
    try {
        const notas = await Nota.find()
        return notas
    } catch (error) {
        throw error
    }
}

Nota.createNota = async function (newNota, result) {
    try{
        await newNota.save()
    }catch(error){
        throw(error)
    }
}

Nota.updateNota = async function (id, notaToUpdate, result) {
    try {
        await Nota.findByIdAndUpdate(id,notaToUpdate)
    } catch (error) {
        throw(error)
    }
   
}

Nota.deleteNota = async function (id, result) {
    try{
         await Nota.findByIdAndDelete(id)
    }catch(err){
        console.error("Error al eliminar usuario:", error)
        next(error)
    }
}

module.exports = Nota

