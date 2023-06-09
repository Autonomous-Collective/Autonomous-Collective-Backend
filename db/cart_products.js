const client = require("./client");

const addProductToCart = async (cartId, productId, quantity) => {
  try {
    console.log("Starting to add product to cart", cartId, productId, quantity);
    const {
      rows: [cartProduct],
    } = await client.query(
      `
        INSERT INTO cart_products ("cartId", "productId", quantity)
        VALUES ($1, $2, $3)
        ON CONFLICT ("cartId", "productId") DO NOTHING
        RETURNING *;
        `,
      [cartId, productId, quantity]
    );

    console.log(cartProduct, "added product to cart");
    return cartProduct;
  } catch (error) {
    console.error("Error creating cart product");
    throw error;
  }
};

const removeProductFromCart = async (cartId, productId) => {
  try {
    const {
      rows: [cartProduct],
    } = await client.query(
      `
        DELETE FROM cart_products
        WHERE "cartId" = $1 AND "productId" = $2
        RETURNING *
        
        `,
      [cartId, productId]
    );
    console.log(cartProduct, "removed product from cart");
    return cartProduct;
  } catch (error) {
    console.error("Error removing product from cart");
    throw error;
  }
};

const updateProductAmountInCart = async (cartId, productId, quantity) => {
  try {
    const {
      rows: [cartProduct],
    } = await client.query(
      `
            UPDATE cart_products
            SET quantity=$3
            WHERE "cartId" = $1 AND "productId" = $2
            RETURNING *
        
        `,
      [cartId, productId, quantity]
    );
    console.log(cartProduct, "updated quantity");
    return cartProduct;
  } catch (error) {
    console.error("error updating cart");
    throw error;
  }
};

const getProductsByCart = async (cartId) => {
  try {
    const { rows } = await client.query(
      `
        SELECT * from cart_products
        JOIN products ON cart_products."productId" = products.id
        WHERE "cartId" = $1
        `,
      [cartId]
    );
    console.log(rows, "all products by cart");
    return rows;
  } catch (error) {
    console.error("Error getting products in cart");
    throw error;
  }
};

module.exports = {
  addProductToCart,
  removeProductFromCart,
  updateProductAmountInCart,
  getProductsByCart,
};
