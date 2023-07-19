import express from "express";
import {
    getUsers,
    getUser,
    postUser,
    putUser,
    deleteUser
} from "../controllers/users.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", postUser);
router.put("/:id", putUser);
router.delete("/:id", deleteUser);

export { router as userRoute };