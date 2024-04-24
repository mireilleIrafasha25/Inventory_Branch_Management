import{Addproduct,GetAllProduct,GetProductbyID,UpdateProduct,DeleteProduct} from "../Controller/Productcontroller.js"
import express from "express";

const router = express.Router();

router.post("/addproduct", Addproduct);
router.get("/list",GetAllProduct);
router.get("/GetProductByID", GetProductbyID);
router.put("/UpdateProduct", UpdateProduct);
router.delete("/DeleteProduct", DeleteProduct);
export default router;