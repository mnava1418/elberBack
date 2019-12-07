const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;

const UserSchema = mongoose.Schema({
    email: { type: String, required: true, index: { unique: true }, lowercase: true, trim: true },
    name: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    gender: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    img: { type: String, required: false, trim: true },
}, { timestamps: true });

UserSchema.pre('save', (next) => {
    const user = this;

    if(!user.isModified('password'))
        return next();

    const hashPassword = bcrypt.hashSync(user.password, SALT_WORK_FACTOR);
    user.password = hashPassword;
    
    return next();
})


/**const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;

UserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    return cb(null, isMatch);
  });
};


module.exports = mongoose.model('User', UserSchema);
 */