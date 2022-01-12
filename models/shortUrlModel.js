const mongo = require('mongoose')
const shortID = require('shortid')
const shortUrlSchema = new mongo.Schema({
    fullURL: {
        type: String,
        required: true
    },
    shortURL: {
        type: String,
        required: true,
        default: shortID.generate
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    },
    creationTime: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false
})

module.exports = mongo.model('shortURL', shortUrlSchema)