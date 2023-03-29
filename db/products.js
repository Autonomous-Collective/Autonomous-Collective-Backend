const client = require("./client");

const createProduct = async({title, author, isbn, description, price, imageUrl, quantity}) =>{
    try{
        const{
           rows: [product]
        } = await client.query(`
            INSERT INTO products (title, author, isbn, description, price, img, quantity)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            ON CONFLICT (title) DO NOTHING
            RETURNING *
        `, [title, author, isbn, description, price, imageUrl, quantity]);
        console.log(product, "product from createProduct");
        return product;
    }catch(error){
        throw error
    }
};

module.exports = {
    createProduct: createProduct,
}