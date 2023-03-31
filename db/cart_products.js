const client = require("./client");

const addProductToCart = async (cartId, productId, quantity) => {
  try {
    const {
      rows: [cartProduct],
    } = await client.query(
      `
        INSERT into cart_products("cartId","productId","quantity")
        VALUES($1,$2,$3)
        RETURNING *
        
        `,
      [cartId, productId, quantity]
    );

    console.log("added product to cart");
    return cartProduct;
  } catch (error) {
    console.error("error creating cart product");
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
    console.log("removed product from cart");
    return cartProduct;
  } catch (error) {
    console.error("Error removing product from cart");
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
    console.log("updated quantity");
    return cartProduct;
  } catch (error) {
    console.error("error updating cart");
  }
};

const getProductsByCart = async (cartId) => {
  try {
    const { rows } = await client.query(
      `
        
        SELECT * from cart_products
        WHERE "cartId" = $1
        
        
        
        `,
      [cartId]
    );
    console.log("getting all products from cart");
    return rows;
  } catch (error) {
    console.error("Error getting products in cart");
  }
};

module.exports = {
  addProductToCart,
  removeProductFromCart,
  updateProductAmountInCart,
  getProductsByCart,
};
