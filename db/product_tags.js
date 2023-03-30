const client = require("./client");
const { getProductById, getTagById } = require("./");

async function createProductTag(productId, tagId) {
  try {
    await client.query(
      `
        INSERT INTO product_tags("productId", "tagId")
        VALUES ($1, $2)
        ON CONFLICT ("productId", "tagId") DO NOTHING;
      `,
      [productId, tagId]
    );
  } catch (error) {
    throw error;
  }
}

async function addTagsToProduct(productId, tagIdList) {
  try {
    const tagList = [];
    console.log(tagIdList, "!!! TAG ID LIST !!!");
    const tagIdPromises = await tagIdList.map((tagId) => {
      console.log(tagId);
      const currentTag = getTagById(tagId);
      tagList.push(currentTag);
    });

    await Promise.all(tagIdPromises);
    console.log(tagList);

    const createProductTagPromises = tagList.map((tag) =>
      createProductTag(productId, tag.id)
    );

    await Promise.all(createProductTagPromises);

    return await getProductById(productId);
  } catch (error) {
    throw error;
  }
}

const getTagsByProduct = async (productId) => {
  try {
    const { rows } = await client.query(
      `
          SELECT "tagId"
          FROM product_tags
          WHERE "productId" = $1
          `,
      [productId]
    );

    console.log(rows, "product_tags from get Tags by product");
    return rows;
  } catch (error) {}
};

module.exports = {
  addTagsToProduct,
  createProductTag,
  getTagsByProduct,
};
