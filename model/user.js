const { Schema, model, Types } = require('mongoose')

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: String,
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        unique: true,
        required: true
    },
    card: {
        items: [
            {
                courseId: Types.ObjectId
            }
        ],
        price: Number
    }
})

module.exports = model('user', userSchema)