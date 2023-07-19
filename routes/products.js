import express from "express";
import { 
    getProducts, 
    getProduct, 
    postProduct, 
    putProduct, 
    deleteProduct 
} from "../controllers/products.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", postProduct);
router.put("/:id", putProduct);
router.delete("/:id", deleteProduct);

export { router as productRoute };