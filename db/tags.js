const client = require("./client");

//create tags!:
const createTags = async ({ name }) => {
  try {
    console.log("Starting to create tags", name);
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
    console.log("Finished creating tags", tag);
    return tag;
  } catch (error) {
    console.log("Error creating tags!");
    throw error;
  }
};

//get all tags:
const getAllTags = async () => {
  try {
    console.log("Starting to Get All Tags");
    const { rows } = await client.query(`
        SELECT * 
        FROM tags;
       `);
    console.log("This is all tags", rows);
    return rows;
  } catch (error) {
    console.log("Error Getting All Tags!!");
    throw error;
  }
};

//get tag by id:

const getTagById = async (id) => {
  try {
    console.log("Starting to get tag by id", id);
    const {
      rows: [tag],
    } = await client.query(
      `
            SELECT *
            FROM tags
            WHERE id = $1;
        `,
      [id]
    );
    console.log("finished getting tag by Id", tag);

    return tag;
  } catch (error) {
    console.log(error, "failed to get tag by id");
    throw error;
  }
};

const getTagsByProduct = async (productId) => {
  try {
    console.log("Starting to get Tags by Product", productId);
    const { rows } = await client.query(
      `
        SELECT *
        FROM product_tags
        WHERE "productId" = $1
        `,
      [productId]
    );
    console.log("Finished getting Tags by Product", rows);
    return rows;
  } catch (error) {
    console.log(error, "Failed to get Tag by Product");
    throw error;
  }
};

const deleteTag = async (id) => {
  try {
    console.log("Starting to delete tag", id);
    const {
      rows: [tag],
    } = await client.query(
      `
      DELETE FROM tags
      WHERE id = $1
      RETURNING *;
      `,
      [id]
    );

    console.log("Finished deleting tag");
    return tag;
  } catch (error) {
    console.log(error, "Failed to delete tag");
    throw error;
  }
};

module.exports = {
  createTags,
  getAllTags,
  getTagById,
  getTagsByProduct,
  deleteTag,
};
