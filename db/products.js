const client = require("./client");
// const { getTagsByProduct, getTagById } = require("./");
const { getTagsByProduct } = require("./product_tags");
const { getTagById } = require("./tags");
const { getReviewByProductId } = require("./reviews");

const createProduct = async ({
  title,
  author,
  isbn,
  description,
  price,
  imageUrl,
  quantity,
}) => {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
            INSERT INTO products (title, author, isbn, description, price, img, quantity)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            ON CONFLICT (title) DO NOTHING
            RETURNING *
        `,
      [title, author, isbn, description, price, imageUrl, quantity]
    );
    // console.log(product, "product from createProduct");
    return product;
  } catch (error) {
    throw error;
  }
};

const editProduct = async (id, fields = {}) => {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  if (setString.length === 0) {
    return;
  }

  try {
    const {
      rows: [product],
    } = await client.query(
      `
            UPDATE products
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
        `,
      Object.values(fields)
    );

    // console.log(product, "updated product");
    return product;
  } catch (error) {
    console.error("issue updating product");
    throw error;
  }
};

const getAllProducts = async () => {
  const productsToReturn = [];
  try {
    const { rows } = await client.query(`
            SELECT *
            FROM products;
        `);
    // console.log(rows, "all products from getAllProducts");

    //map through rows
    // get all tags associated with product
    // add that tag list to that product

    // console.log(getTagsByProduct, "!!!GET TAGS BY PRODUCT FUNCTION!!!");

    // **** come back here
    const updatedProducts = rows.map(async (product) => {
      const tagIdList = await getTagsByProduct(product.id);
      const tags = tagIdList.map((e) => {
        return e.name;
      });
      const thePromises = await Promise.all(tags);
      product.tags = thePromises;
      return product;
    });
    const awaitedProducts = await Promise.all(updatedProducts);
    console.log(awaitedProducts, "All products, should have tags attached");
    return awaitedProducts;
  } catch (error) {
    console.error("error getting all products");
    throw error;
  }
};

const getProductByTitle = async (title) => {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
            SELECT *
            FROM products
            WHERE title = $1;
        `,
      [title]
    );
    // console.log(product, "product from getProductByTitle");
    return product;
  } catch (error) {
    console.error("error getting product by title");
    throw error;
  }
};
const getProductById = async (id) => {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
            SELECT *
            FROM products
            WHERE id = $1;
        `,
      [id]
    );
    // console.log(product, "product from getProductById");
    return product;
  } catch (error) {
    console.error("error getting product by Id");
    throw error;
  }
};
const getProductsByAuthor = async (author) => {
  try {
    const { rows } = await client.query(
      `
            SELECT *
            FROM products
            WHERE author = $1;
        `,
      [author]
    );
    // console.log(rows, "product from getProductByauthor");
    return rows;
  } catch (error) {
    console.error("error getting product by author");
    throw error;
  }
};

const getProductsByTagId = async (id) => {
  try {
    console.log("Starting to get Product by Tag", id);
    const { rows } = await client.query(
      `
      SELECT products.* 
      FROM products
      JOIN product_tags ON product_tags."productId" = products.id
      WHERE product_tags."tagId" = $1
      `,
      [id]
    );

    const updatedProducts = rows.map(async (product) => {
      const tagIdList = await getTagsByProduct(product.id);
      const tags = tagIdList.map((e) => {
        return e.name;
      });
      const thePromises = await Promise.all(tags);
      product.tags = thePromises;
      return product;
    });
    const awaitedProducts = await Promise.all(updatedProducts);
    console.log(awaitedProducts, "All products, should have tags attached");
    return awaitedProducts;
  } catch {
    console.error("Error getting Product by Tag!");
    throw error;
  }
};

const deleteProduct = async (id) => {
  try {
    console.log("beginning to delete products", id);
    // we don't want to hard delete a product because of the association to past orders.
    // delete could = isActive false to not display for sale
    //& remove from un-ordered carts on frontend? isActive check inside the carts.
    const {
      rows: [product],
    } = await client.query(
      `
            UPDATE products
            SET "isActive" = false
            WHERE id = $1
            RETURNING *;
        `,
      [id]
    );
    console.log("finished deleting product", product);
    return product;
  } catch (error) {
    console.error("error deleting product");
    throw error;
  }
};

module.exports = {
  createProduct,
  editProduct,
  getAllProducts,
  getProductByTitle,
  getProductById,
  getProductsByAuthor,
  getProductsByTagId,
  deleteProduct,
};
