const express = require("express");
const productsRouter = express.Router();
const {
    getAllProducts,
    getProductById,
    getProductsByTagId,
    getProductsByAuthor,
    getReviewsByProductId,
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
        }else{
            res.send(products);
        }
    } catch (error){
        next(error);
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
        next(error);
    }
});

//GET products by tagId:
productsRouter.get("/tags/:tagId", async(req, res, next) => {
    const tagId  = req.params.tagId;
    console.log("tagId", tagId);
    try{
        const products = await getProductsByTagId(tagId);
        if(!products.length){
            res.status(255);
            next({ name: "ProductByTagIdError",
                message: "This tag may not exist"
            })
        }else{
            res.send(products);
        }
    }catch(error){
        next(error);
    }
})

//GET product by author name:
productsRouter.get("/author/:author", async(req, res, next) => {
    const author = req.params.author;
    try{
        const products = await getProductsByAuthor(author);

        if(!products.length){
            res.status(255);
            next({
                name: "ProductByAuthorDoesntExistError",
                message: "A product by this author may not exist",
            })
        }else{
            res.send(products);
        }
    }catch(error){
        next(error);
    }
});

//GET specific product's reviews
productsRouter.get("/reviews/:productId", async (req, res, next) => {
    const productId = req.params.productId;
    try{
        const reviews = await getReviewsByProductId(productId);
        if(!reviews.length){
            res.status(255);
            next({
                name: "GetReviewsByProductError",
                message: "There may be no reviews for this product"
            })
        } else {
            res.send(reviews);
        }
    } catch(error){
        next(error);
    }
});

//POST user create a review on specific product
productsRouter.post("")



module.exports = productsRouter;
