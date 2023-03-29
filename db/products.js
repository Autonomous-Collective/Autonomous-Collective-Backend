const client = require("./client");

const createProduct = async({title, author, isbn, description, price, image, quantity}) =>{
    try{
        const{
           rows: [product]
        } = await client.query(`
            INSERT INTO products (title, author, isbn, description, price, image, quantity)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            ON CONFLICT (title) DO NOTHING
            RETURNING *
        `, [title, author, isbn, description, price, image, quantity]);
        console.log(product, "product from createProduct");
        return product;
    }catch(error){
        throw error
    }
};

module.exports = {
    createProduct: createProduct,
}