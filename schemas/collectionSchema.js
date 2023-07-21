const mongoose = require('mongoose')

const collectionSchema = new mongoose.Schema({
    collName: String,
    collDesc: String,
    collBody: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Image'
        }
    ],
})

module.exports = new mongoose.model('Collection', collectionSchema);