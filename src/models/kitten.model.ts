import mongoose from 'mongoose'

const kittenSchema = new mongoose.Schema(
    {
        kitten_id: {
            type: String,
            unique: true
        },
        id: {
            type: Number
        },
        title: {
            type: String
        },
        name: {
            type: String
        },
        coin: {
            type: Number
        },
        star: {
            type: Number
        },
        image: {
            type: String
        },
        description: {
            type: String
        }
    },
    { timestamps: true }
)

const kittenModel = mongoose.model('kitten', kittenSchema)

export default kittenModel
