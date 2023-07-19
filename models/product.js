import { Decimal128 } from "mongodb";
import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
    product: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    size: { type: String, required: true },
    color: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true }
}, {
    versionKey: false
});

const Product = mongoose.model("Product", productSchema);
export default Product;