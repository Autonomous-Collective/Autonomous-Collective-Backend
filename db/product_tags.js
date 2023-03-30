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
    tagIdList.map((tagId) => {
      const currentTag = getTagById(tagId);
      tagList.push(currentTag);
    });

    await Promise.all(tagList);
    console.log(tagList);

    const createProductTagPromises = tagList.map((tag) =>
      createProductTag(postId, tag.id)
    );

    await Promise.all(createProductTagPromises);

    return await getProductById(productId);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addTagsToProduct,
  createProductTag,
};
