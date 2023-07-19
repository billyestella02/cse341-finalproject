import express from "express";
import {
    getNotifications,
    getNotification,
    postNotification,
    putNotification,
    deleteNotification
} from "../controllers/notifications.js";

const router = express.Router();

router.get("/", getNotifications);
router.get("/:id", getNotification);
router.post("/", postNotification);
router.put("/:id", putNotification);
router.delete("/:id", deleteNotification);

export { router as notificationRoute };