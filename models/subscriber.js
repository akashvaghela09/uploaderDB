const mongoose = require("mongoose")

const subscriberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('subscriber', subscriberSchema)