const mongoose = require('mongoose');

const SkillSchema = mongoose.Schema({
    name: { type: String, required: true, trim: true },
    icon: { type: String, required: true, trim: true },
    demo: { type: Array, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Skill', SkillSchema);
