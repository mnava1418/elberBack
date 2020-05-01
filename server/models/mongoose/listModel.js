const mongoose = require('mongoose')

const ListSchema = mongoose.Schema({
    listId: { type: String, required: true, trim: true, index: { unique: true } },
    email: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    items: { type: Array, required: true }
}, { timestamps: true })

module.exports = mongoose.model('List', ListSchema)