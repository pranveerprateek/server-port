const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    catName: String,
    catId: String,
    catDesc: String,
})

module.exports = new mongoose.model ('Category', categorySchema);