import{Addproduct,GetAllProduct,GetProductbyID,UpdateProduct,DeleteProduct} from "../Controller/Productcontroller.js"
import express from "express";

const router = express.Router();

router.post("/addproduct", Addproduct);
router.get("/list",GetAllProduct);
router.get("/GetProductByID/:id", GetProductbyID);
router.put("/UpdateProduct/:id", UpdateProduct);
router.delete("/DeleteProduct/:id", DeleteProduct);
export default router;