const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },

})

const User = mongoose.model("User", userSchema)


// Registrar Usuarios
User.create = async function (newUser, result) {
    await newUser
        .save()
        .then(function (data) {
            result(data, null)
        })
        .catch(function (err) {
            result(null, err)
        })
}

// Auxiliar para Login
User.findByUsername = async function (username_param, result) {
    const userFound = await User.findOne({ username: username_param })
    if (userFound) {
        result(userFound, null)
    } else {
        result(null, { "err": "No hay usuarios con ese username" })
    }
}

// Obtener todos los usuarios
User.findUsers = async function (result) {
    const users = await User.find()
    if (users) {
        result(users, null)
    } else {
        result(null, { "err": "No hay usuarios en la base de datos" })
    }
}

// Actualizar Usuario
User.updateUser = async function (id, userToUpdate, result) {
    const update = {
        username: userToUpdate.username,
        password: userToUpdate.password,
        profile: userToUpdate.profile,
        nombre: userToUpdate.nombre,
        apellidos: userToUpdate.apellidos,
        createdDate: userToUpdate.createdDate,
        modifiedDate: userToUpdate.modifiedDate
    };

    await User.findByIdAndUpdate(id, update, { new: true })
        .then(function (updatedUser) {
            result(updatedUser, null)
        })
        .catch(function (err) {
            result(null, err)
        })
}

// Eliminar Usuario
User.deleteUser = async function (id, result) {
    await User.findByIdAndDelete(id)
        .then(function (userDeleted) {
            result(userDeleted, null)
        })
        .catch(function (err) {
            result(null, err)
        })
}

module.exports = User
