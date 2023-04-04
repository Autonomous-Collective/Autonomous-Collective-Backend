const express = require("express");
const productsRouter = express.Router();
const {
    getAllProducts,
    getProductById,
    getProductsByTagId,
    getProductsByAuthor,
    getReviewsByProductId,
    getProductByTitle,
    createReview,
    createProduct,
    editReview,
    getReviewById
} = require("../db");
const { requireUser, requireAdmin } = require("./utils");

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
            res.send({products: products, success: true});
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
            res.send({product:product, success:true});
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
            res.send({products:products, success:true});
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
            res.send({products:products, success:true});
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
            res.send({reviews:reviews, success:true});
        }
    } catch(error){
        next(error);
    }
});

//GET product by title:
productsRouter.get("/title/:title", async(req, res, next) => {
    const { title } = req.params;
    console.log(title, "title");
    try{
        const product = await getProductByTitle(title);
        if(!product){
            res.status(255);
            next({
                name: "ProductDoesntExistError",
                message: "A product by that name may not exist",
            })
        }else{
            res.send({product:product, success:true});
        }
    }catch(error){
       next(error); 
    }
})

//POST user create a review on specific product
productsRouter.post("/:productId/reviews", requireUser, async(req, res, next) => {
    const productId = Number(req.params.productId);
    const userId = req.user.id;
    const { score, title, content } = req.body;

    try{
        
        const review = await createReview({score: score, title: title, content: content, reviewerId: userId, productId: productId});

        if(!review.id){
            res.status(400);
            next({
                name: "ReviewPostNotSuccessfulError",
                message: "Your review was not successfully posted",
            });
        }else{
            res.send({review:review, success:true});
        }
    }catch(error){
        next(error);
    }
});

//POST products (req. admin)
productsRouter.post("/", requireAdmin, async(req, res, next) => {
    const { title, author, isbn, description, price, imageUrl, quantity } = req.body;
    console.log(title, author, isbn, description, price, imageUrl, quantity, "req body !!!!");
    try{
        const product = await createProduct({title: title, author: author, isbn: isbn, description: description, price: price, imageUrl: imageUrl, quantity: quantity})
        if(!product){
            res.status(400);
            next({
                name: "ProductPostNotSuccessfulError",
                message: "Product was unable to be created",
            });
        } else {
            res.send({product:product, success:true});
        }
    } catch(error){
        next(error);
    }
})

//PATCH review for reviewer author
productsRouter.patch("/reviews/:reviewId", requireUser, async(req, res, next) => {
    const { reviewId } = req.params;
    const { score, title, content } = req.body;
    const userId = req.user.id;

    const fields = {};
    if(score){
        fields.score = score;
    }
    if(title){
        fields.title = title;
    }
    if(content){
        fields.content = content;
    }
    console.log(fields, "these are the fields to update");


    try{
        const findReview = await getReviewById(reviewId);
        if(findReview.reviewerId !== userId){
            res.status(403);
            next({
                name: "NotAuthorError",
                message: "You must be the author of this review to edit it",
            })
        } else{
            const updatedReview = await editReview(reviewId, fields);
            res.send({updatedReview: updatedReview, success: true});
        }
    }catch(error){
        next(error);
    }
})

module.exports = productsRouter;
