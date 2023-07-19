import { mongoose, Schema } from 'mongoose';

const notificationSchema = new Schema({
    dateCreated: { type: Date, required: true },
    message: { type: String, required: true },
    status: { type: String, required: true }
}, {
    versionKey: false
});

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;