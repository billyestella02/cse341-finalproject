import Notification from "../models/notification.js";
import { ObjectId } from 'mongodb';
import notificationSchema from "../helpers/notif-validate-schema.js";

const getNotifications = (req, res, next) => {
    Notification.find({})
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
};

const getNotification = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({ error: "Invalid ObjectId" });
    }
    const id = new ObjectId(req.params.id);

    Notification.find({ _id: id })
        .then((result) => {
            res.status(200).json(result[0]);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
};

const postNotification = (req, res, next) => {
    const validator = notificationSchema.validate(req.body);
    if (!validator.error) {
        const notification = new Notification(validator.value);
        notification.status = "unread";
        notification.dateCreated = new Date();
        notification
            .save()
            .then((notificationData) => {
                res.status(201).send(notificationData);
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    } else {
        res.status(422).json(validator.error);
    }
};

const putNotification = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({ error: "Invalid ObjectId" });
    }
    const id = new ObjectId(req.params.id);

    Notification.findOne({ _id: id })
        .then((result) => {
            const notificationData = result;
            notificationData.status = req.body.status;

            if (notificationData.status == "read") {
                notificationData   
                .save()
                .then((updatedNotification) => {
                    console.log(updatedNotification);
                    res.status(204).send(updatedNotification);
                })
                .catch((err) => {
                    res.status(500).json(err);
                });
            } else {
                res.status(422).json(err);
            }

        });
};

const deleteNotification = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({ error: "Invalid ObjectId" });
    }
    const id = new ObjectId(req.params.id);

    Notification.deleteOne({ _id: id })
    .then((result) => {
        res.status(200).json(result);
    })
    .catch((err) => {
        res.status(500).json(err);
    });
};

export {
    getNotifications,
    getNotification,
    postNotification,
    putNotification,
    deleteNotification
}