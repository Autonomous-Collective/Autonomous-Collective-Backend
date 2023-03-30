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

//edit review:
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



module.exports = {
    createReview : createReview,
    editReview : editReview,
}