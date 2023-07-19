import { mongoose, Schema } from "mongoose";
import Cart from "../models/cart.js";
import Notification from "../models/notification.js";

const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    cart: [{ type: Schema.Types.ObjectId, ref: Cart, required: false }],
    notifications: [{ type: Schema.Types.ObjectId,  ref: Notification, required: false }]
}, {
    versionKey: false
});

const User = mongoose.model("User", userSchema);
export default User;