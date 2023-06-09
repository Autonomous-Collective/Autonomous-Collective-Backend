const client = require("./client");

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
    console.error("Error creating tags!");
    throw error;
  }
};

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
    console.error("Error Getting All Tags!!");
    throw error;
  }
};

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
    console.error("failed to get tag by id");
    throw error;
  }
};

const getTagByName = async (name) => {
  try{
    console.log("Starting to get tag by name");
    const{rows:[tag]} = await client.query(`
      SELECT *
      FROM tags
      WHERE name = $1
    `, [name]);
    console.log("finished getting tag by name", tag);
    return tag;
  } catch(error) {
    console.error("failed to get tags by name");
    throw error;
  }
}

const editTag = async(id, name) => {
  try {
    console.log("starting to edit tag");
    const { rows: [tag] } = await client.query(`
    UPDATE tags
    SET name = $1
    WHERE id = $2
    RETURNING *;
    `, [name, id]);

    console.log("finished editing tag!", tag);
    return tag;
  } catch (error) {
    console.error("error editing tag");
  }
}

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
    console.error("Error deleting tags");
    throw error;
  }
};

module.exports = {
  createTags,
  getAllTags,
  getTagById,
  getTagByName,
  deleteTag,
  editTag,
};
