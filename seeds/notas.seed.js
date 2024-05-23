const mongoConn = require("../config/mongoDB.config")
const Nota = require("../models/notas.model")


const ejecutar = async()=>{
    await mongoConn.conectarMongoDB()
    .then(()=>{
        console.log("Conectado")
    })
    .catch((err)=>{
        console.log(err)
    })

    const notas = [
        {   
            nombre:"Antonio",
            texto: "Falta por hacer textil",
            fecha: Date.now(),
        },
        {   
            nombre:"Rosa",
            texto: "Pedido de textil enviado",
            fecha: Date.now(),
        },
    ]

    await Nota.insertMany(notas)
    .then((res)=>{
        console.log(res)
    })
    .catch((err)=>{
        console.log(err)
    })

    await mongoConn.close()
    process.exit()
}

ejecutar()