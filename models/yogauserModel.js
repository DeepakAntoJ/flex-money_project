const mongoose = require('mongoose')

const Schema = mongoose.Schema

const YogaUserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
       // unique: true,
        required: true
    },
    batch: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('YogaUser', YogaUserSchema)