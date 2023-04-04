const client = require("./client");

async function createProductTag(productId, tagId) {
  console.log("Creating product tag pair");
  try {
    const {
      rows: [productTag],
    } = await client.query(
      `
        INSERT INTO product_tags("productId", "tagId")
        VALUES ($1, $2)
        ON CONFLICT ("productId", "tagId") DO NOTHING
				RETURNING *;
      `,
      [productId, tagId]
    );
    console.log("Finished creating product tag", productTag);
    return productTag;
  } catch (error) {
    console.error("Error creating product tag");
    throw error;
  }
}

async function addTagsToProduct(productId, tagIdList) {
  try {
    const createProductTagPromises = tagIdList.map((tagId) =>
      createProductTag(productId, tagId)
    );

    const createdProductTags = await Promise.all(createProductTagPromises);
    console.log("Finished adding tags to product", createdProductTags);
    return createdProductTags;
  } catch (error) {
    console.error("Error adding tags to product!!");
    throw error;
  }
}

const getTagsByProduct = async (productId) => {
  try {
    const { rows } = await client.query(
      `
          SELECT *
          FROM product_tags
					JOIN tags ON product_tags."tagId" = tags.id
          WHERE "productId" = $1;
          `,
      [productId]
    );

    console.log("Finished getting tags by product", rows);
    return rows;
  } catch (error) {
    console.error("Error getting tags by product!!!");
    throw error;
  }
};


const removeTagFromProduct = async(tagId, productId) => {
  try{
    console.log("starting to delete product_tag")
    const { rows: [product_tag] } = await client.query(`
    DELETE FROM product_tags
    WHERE "tagId" = $1 AND "productId" = $2
    RETURNING *;
    `, [tagId, productId]);
    
    console.log("finished deleting product_tag", product_tag);
    return product_tag;
  }catch(error){
    console.error("Error deleting tag from product");
    throw error;
  }
}

module.exports = {
  addTagsToProduct,
  createProductTag,
  getTagsByProduct,
  removeTagFromProduct,
};
