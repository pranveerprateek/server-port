const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName: String,
    userPassword: String,
    homeTop: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Collection'
        }
    ],
    homeBottom: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Collection'
        }
    ],
    homeMid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Image'
        }
    
})

module.exports = new mongoose.model('User', userSchema);