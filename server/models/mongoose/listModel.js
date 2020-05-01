const mongoose = require('mongoose')

const ListSchema = mongoose.Schema({
    email: { type: String, required: true, trim: true, index: { unique: true } },
    name: { type: String, required: true, trim: true, index: { unique: true } },
    items: { type: Array, required: true }
}, { timestamps: true })

module.exports = mongoose.model('List', ListSchema)