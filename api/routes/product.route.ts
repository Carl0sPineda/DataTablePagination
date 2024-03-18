import express from "express";
import productController from "../controllers/product.controller";
import { schemaValition } from "../middlewares/schemaValidator";
import { CreateProductSchema } from "../schemas/product.schema";

const router = express.Router();

router.post(
  "/products",
  schemaValition(CreateProductSchema),
  productController.createProduct
);
router.get("/products", productController.getAllProducts);
router.delete("/products/:id", productController.deleteProduct);
router.delete("/products", productController.deleteAllProducts);

export default router;
