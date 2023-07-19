import express from "express";
import {
    getCarts,
    getCart,
    postCart,
    putCart,
    deleteCart
} from "../controllers/carts.js";

const router = express.Router();

router.get("/", getCarts);
router.get("/:id", getCart);
router.post("/", postCart);
router.put("/:id", putCart);
router.delete("/:id", deleteCart);

export { router as cartRoute };