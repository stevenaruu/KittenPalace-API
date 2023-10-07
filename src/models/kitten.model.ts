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
        name: {
            type: String
        },
        coin: {
            type: Number
        },
        ancestry: {
            type: String
        },
        origin: {
            type: String
        },
        color: {
            type: String
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
