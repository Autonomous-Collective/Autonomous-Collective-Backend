const client = require("./client");

//create tags!:
const createTags = async({name}) => {
    try{
        const { rows : [tag] } = await client.query(
            `
            INSERT INTO tags (name)
            VALUES ($1)
            ON CONFLICT (name) DO NOTHING
            RETURNING *;
            ` , [name]
        )
        return tag;
    }catch(error){
        throw(error);
    }
}

//get all tags:
const getAllTags = async() => {
    try{
       const { rows: [tags] } = await client.query(`
        SELECT * 
        FROM tags;
       `);

        return tags;
    }catch(error){
        throw(error);
    }
}

//get tag by id:
const getTagById = async({id}) => {
    try{

        const {rows : [tag]} = await client.query(`
            SELECT *
            FROM tags
            WHERE id === $1;
        `, [id]);

        return tag;
    }catch(error){
        throw(error);
    }
}

module.exports = {
    createTags: createTags,
    getAllTags: getAllTags,  
    getTagById: getTagById
}