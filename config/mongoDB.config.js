const mongoose = require("mongoose")
const mongoConnection = mongoose.createConnection()

mongoConnection.conectarMongoDB = async () => {
    return mongoose.connect("mongodb+srv://kerimskmbre:eskukerim@drive.5bi9dvg.mongodb.net/?retryWrites=true&w=majority&appName=DRIVE")
}

mongoConnection.establecerConexion = async function () {
    try {
        await this.conectarMongoDB()
            .then(() => {
                console.log("Conectado con MongoDB")
            })
            .catch((err) => {
                console.log("Error 1 conectando con MongoDB: " + err)
                process.exit(0)
            })
    } catch (error) {
        console.log("Error 2 conectando con MongoDB: " + error)
        process.exit(0)
    }
}

module.exports = mongoConnection