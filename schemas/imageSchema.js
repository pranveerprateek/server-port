const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
    fileName: String,
    fileUrl: String,
    fileDesc: String,
    fileCat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
})

module.exports = new mongoose.model('Image', imageSchema);