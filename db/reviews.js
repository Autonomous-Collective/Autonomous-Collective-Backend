const client = require("./client");

//create review!
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

module.exports = {
    createReview : createReview,
}