const client = require("./client");
const { getTagsByProduct } = require("./product_tags");

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
            INSERT INTO products (title, author, isbn, description, price, img, inventory)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            ON CONFLICT (title) DO NOTHING
            RETURNING *
        `,
      [title, author, isbn, description, price, imageUrl, quantity]
    );
    console.log("Finished creating product", product);
    return product;
  } catch (error) {
    console.error("Error creating product");
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

    console.log("Finished editing product", product);
    return product;
  } catch (error) {
    console.error("Error updating product");
    throw error;
  }
};

const getAllProducts = async () => {
  try {
    const { rows } = await client.query(`
            SELECT *
            FROM products;
        `);
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
    console.log("Finished getting all products", awaitedProducts);
    return awaitedProducts;
  } catch (error) {
    console.error("Error getting all products");
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
    console.log("Finished getting product by Title", product);
    return product;
  } catch (error) {
    console.error("Error getting product by title");
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
    console.log("Finished getting product by Id", product);
    return product;
  } catch (error) {
    console.error("Error getting product by Id");
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
    console.log("Finished getting product by author", rows);
    return rows;
  } catch (error) {
    console.error("Error getting product by author");
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
    console.error("Error deleting product");
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
