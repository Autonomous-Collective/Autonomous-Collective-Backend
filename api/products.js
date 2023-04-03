const express = require("express");
const productsRouter = express.Router();
const {
    getAllProducts,
    getProductById,
} = require("../db");

//GET all products
productsRouter.get("/", async (req, res, next) => {
    try{
        const products = await getAllProducts();
        if(!products){
            next({
                name: "GetProductsError",
                message: "Error getting all products"
            });
        }
        res.send(products);
    } catch ({ name, message }){
        next({ name, message });
    }
});

//GET product by ID
productsRouter.get("/:productId", async (req, res, next) => {
    const productId = req.params.productId;
    console.log(productId, "product ID");
    try{
        const product = await getProductById(productId);
        if(!product){
            res.status(255);
            next({name: "Product Id Error", message: "A product with this id may not exist"});
        }else{
            res.send(product);
        }
    } catch (error) {
        next({ name: "Product Id Error", message: "A product with this id may not exist" });
    }
});


module.exports = productsRouter;
