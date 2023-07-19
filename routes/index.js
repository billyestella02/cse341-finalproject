import express from "express";
import { productRoute } from "./products.js";
import { cartRoute } from "./carts.js";
import { notificationRoute } from "./notifications.js";
import { userRoute } from "./users.js";

const router = express.Router();

router.use('/products', productRoute);
router.use('/carts', cartRoute);
router.use('/notifications', notificationRoute);
router.use('/users', userRoute);

export { router as mainRoute };