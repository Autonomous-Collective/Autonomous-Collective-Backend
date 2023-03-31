const client = require("./client");

//create tags!:
const createTags = async ({ name }) => {
  try {
    const {
      rows: [tag],
    } = await client.query(
      `
            INSERT INTO tags (name)
            VALUES ($1)
            ON CONFLICT (name) DO NOTHING
            RETURNING *;
            `,
      [name]
    );
    return tag;
  } catch (error) {
    throw error;
  }
};

//get all tags:
const getAllTags = async () => {
  try {
    const { rows } = await client.query(`
        SELECT * 
        FROM tags;
       `);
    return rows;
  } catch (error) {
    throw error;
  }
};

//get tag by id:

const getTagById = async (id) => {
	console.log(id,'!@#!@#!@')
  try {
    console.log("getting tag by id, THIS IS IT", id);
    const { rows: [tag] } = await client.query(
      `
            SELECT *
            FROM tags
            WHERE id = $1;
        `,
      [id]
    );
    console.log(tag, "tagById, line 51");
    console.log("finished getting tag by Id");

    return tag;
  } catch (error) {
    console.log(error, "failed to get tag by id");
    throw error;
  }
};

const getTagsByProduct = async (productId) => {
  try {
    const { rows } = await client.query(
      `
        SELECT *
        FROM product_tags
        WHERE "productId" = $1
        `,
      [productId]
    );

    console.log(rows, "product_tags from get Tags by product");
  } catch (error) {}
};

module.exports = {
  createTags,
  getAllTags,
  getTagById,
};
