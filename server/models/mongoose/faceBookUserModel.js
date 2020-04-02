const mongoose = require('mongoose');

const FBUserSchema = mongoose.Schema({
    email: { type: String, required: true, index: { unique: true }, lowercase: true, trim: true },
    name: { type: String, required: true, trim: true },
}, { timestamps: true });

module.exports = mongoose.model('FBUser', FBUserSchema);
