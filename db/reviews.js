const client = require("./client");

//create review! --tested- working!!!
const createReview = async({ score, title, content, reviewerId, productId }) => {
    try{

        const { rows: [review] } = await client.query(`
            INSERT INTO reviews (score, title, content, "reviewerId", "productId")
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `, [score, title, content, reviewerId, productId]);

        return review;
    }catch(error){
        throw(error);
    }
}

//edit review: --tested: working!!!
const editReview= async(id, fields = {}) => {

    const setString = Object.keys(fields)
        .map((key, index) => `"${key}"=$${index + 1}`)
        .join(", ");

        if(setString.length === 0){
            return;
        }

            try{
        
                const { rows: [review] } = await client.query(`
                 UPDATE reviews
                 SET ${setString}
                 WHERE id=${id}
                 RETURNING *;
                 `, Object.values(fields));
             
     
             console.log(review, "updated review");
             return review;
         }catch(error){
             throw(error);
         }
        }


//delete review!
const deleteReview = async() => {
    try{
        //code for delete review!
    }catch(error){
        throw(error);
    }
} 

//get all reviews! --tested: working!!
const getAllReviews = async() => {
    try{

        console.log("starting to get all reviews");

        const { rows } = await client.query(`
        SELECT *
        FROM reviews;
        `);
console.log("finished getting all reviews");
        console.log(rows, 'all reviews from reviews');
        return rows;
    }catch(error){
        console.log("error getting reviews");
        throw(error);
    }
}

//get review by product id -- tested- working!!!
const getReviewByProductId = async(id) => {
    try{
        console.log("started getting review by product id");
        const { rows: [review] } = await client.query(`
            SELECT *
            FROM reviews
            WHERE "productId" = $1;
        `, [id]);

        console.log(review, 'review from get review by productID');

        console.log("finished getting review by product id");
        return review;
    }catch(error){
        console.log("error getting review by product id");
        throw(error);
    }
}



module.exports = {
    createReview : createReview,
    editReview : editReview,
    getAllReviews: getAllReviews,
    getReviewByProductId: getReviewByProductId,
}