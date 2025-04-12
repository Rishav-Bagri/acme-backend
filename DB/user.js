const mongoose = require("mongoose")
require("dotenv").config() // load env variables

const mongoDBurl = process.env.MONGO_URI

mongoose.connect(mongoDBurl)
const contactSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Contact = mongoose.model("Contact", contactSchema)

module.exports = { Contact }
