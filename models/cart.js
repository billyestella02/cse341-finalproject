import { mongoose, Schema } from 'mongoose';
import Product from '../models/product.js';

const cartSchema = new Schema({
    products:
    [{
        _id: false,
        product: { type: Schema.Types.ObjectId, ref: Product, required: true},
        quantity: { type: Number, required: true }
    }],
    dateCreated: { type: Date, required: true }
}, {
    versionKey: false
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
