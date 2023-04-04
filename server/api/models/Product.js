import mongoose from 'mongoose'
const {Schema,model} = mongoose

const ProductSchema = new Schema({
    name : String,
    price : Number,
    description : String,
    catagory:  String,
    rating : Number,
    supply: String
}, {
    timestamps : true
})

export default model("Product", ProductSchema);