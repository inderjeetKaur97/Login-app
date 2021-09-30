const { text } = require("express")
const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    // confirmPassword: {
    //     type: String,
    //     required: true

    // }
})
const userSignup = new mongoose.model("usersignup",userSchema)
module.exports = userSignup;