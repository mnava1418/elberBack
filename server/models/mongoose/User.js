const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
    email: { type: String, required: true, index: { unique: true }, lowercase: true, trim: true },
    name: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    img: { type: String, required: false, trim: true },
}, { timestamps: true });

UserSchema.methods.comparePassword = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword);
}

module.exports = mongoose.model('User', UserSchema);
