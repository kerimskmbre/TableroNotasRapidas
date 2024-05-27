const Usuario = require("../models/user.model")
const mongoConn = require("../config/mongoDB.config")
const bcrypt = require("bcrypt")

const ejecutar = async()=>{
    await mongoConn.conectarMongoDB()
    .then(()=>{
        console.log("Conectado")
    })
    .catch((err)=>{
        console.log(err)
    })

    const usuarios = [
        {   
            nombre:"Jose",
            apellidos:"Fernandez",
            username: "jose",
            password: await bcrypt.hash("1234",12),

        },
        {   
            nombre:"Kerim",
            apellidos:"Esquembre Kucukalic",
            username: "kerkuc",
            password: await bcrypt.hash("0123",12),
           
            
        }
    ]

    await Usuario.insertMany(usuarios)
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