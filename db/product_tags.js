const client = require("./client");
// const result = require("./products");
// console.log(result, 'asdfasdfasdfas')
// const { getProductById } = require("./products");
const { getTagById } = require("./tags");
// console.log(result, "IN PRODUCT_TAGS");
async function createProductTag(productId, tagId) {
  console.log(productId, tagId, "productId, tagId in create product tag");
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
    console.log(productTag, "productTag");
    return productTag;
  } catch (error) {
    throw error;
  }
}

async function addTagsToProduct(productId, tagIdList) {
  try {
    // const tagList = [];
    // console.log(tagIdList, "!!! TAG ID LIST !!!");
    // const tagIdPromises = tagIdList.map((tagId) => {
    // 	console.log(tagId, "TAGID in product_tags line 26");
    // 	const currentTag = getTagById(tagId);
    // 	console.log(currentTag, 'current tag, line 28 in product tags')
    // 	// tagList.push(currentTag);
    // 	return currentTag;
    // });
    // console.log(tagIdPromises, "LINE 32 in product tags");
    // const tagList = await Promise.all(tagIdPromises);
    // console.log(tagList, "line 34");
console.log(productId, tagIdList, '7464646')
    const createProductTagPromises = tagIdList.map((tagId) =>
      createProductTag(productId, tagId)
    );

    const createdProductTags = await Promise.all(createProductTagPromises);

    console.log(createdProductTags, "!!!!! product tag promises");
    // console.log(getProductById, "GET PRODUCT BY ID!!!");
    // const product = await getProductById(productId);

    // return product;
    return createdProductTags;
  } catch (error) {
    throw error;
  }
}

const getTagsByProduct = async (productId) => {
  try {
    console.log(productId, "***");
    const { rows } = await client.query(
      `
          SELECT *
          FROM product_tags
					JOIN tags ON product_tags."tagId" = tags.id
          WHERE "productId" = $1;
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
