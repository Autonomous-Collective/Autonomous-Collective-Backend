const client = require("./client");
const { getProductsByCart } = require("./cart_products");

const createUserCart = async ({ cartOwnerId, isOrdered }) => {
  try {
    console.log("Starting to create user cart");
    const {
      rows: [userCart],
    } = await client.query(
      `
              INSERT INTO user_carts ("cartOwnerId", "isOrdered")
              VALUES ($1, $2)
              RETURNING *;
              `,
      [cartOwnerId, isOrdered]
    );
    console.log("Finished creating user cart", userCart);
    return userCart;
  } catch (error) {
    console.error("Error creating user cart!");
    throw error;
  }
};

const getUserCartById = async (id) => {
  try {
    console.log("Starting to get user cart by id", id);
    const {
      rows: [userCart],
    } = await client.query(
      `SELECT * 
    FROM user_carts
    WHERE id = $1;
    `,
      [id]
    );

    const products = await getProductsByCart(userCart.id);

    userCart.products = products;
    console.log("Finished getting user cart by id", userCart);
    return userCart;
  } catch (error) {
    console.error("Error getting user cart by id");
    throw error;
  }
};

const getUserCartByCartOwnerId = async (cartOwnerId) => {
  try {
    console.log("Starting to get user cart by Cart Owner Id", cartOwnerId);
    const {
      rows: [userCart],
    } = await client.query(
      `SELECT * 
        FROM user_carts
        WHERE "cartOwnerId" = $1 AND "isOrdered" = false;
        `,
      [cartOwnerId]
    );

    if (userCart) {
      if (products) {
        const products = await getProductsByCart(userCart.id);
        userCart.products = products;
      }
    }

    console.log("Finished getting user cart by Cart Owner Id", userCart);

    return userCart;
  } catch (error) {
    console.error("Error getting user cart by Cart Owner Id");
    throw error;
  }
};

const getAllUserCartsByCartOwnerId = async (cartOwnerId) => {
  try {
    console.log("Starting to get all user carts by Cart Owner Id", cartOwnerId);
    const { rows } = await client.query(
      `   SELECT *
          FROM user_carts
          WHERE "cartOwnerId" = $1 AND "isOrdered" = true;
          `,
      [cartOwnerId]
    );

    const newRows = rows.map(async (row) => {
      const products = await getProductsByCart(row.id);
      row.products = products;
      return row;
    });

    const resolvedRows = await Promise.all(newRows);

    console.log(
      "Finished getting all user carts by Cart Owner Id",
      resolvedRows
    );
    return resolvedRows;
  } catch (error) {
    console.error("Error getting all user carts by Cart Owner Id");
    throw error;
  }
};

const checkoutUserCart = async (id) => {
  try {
    console.log("Starting to checkout user cart", id);
    const {
      rows: [userCart],
    } = await client.query(
      `
                   UPDATE user_carts 
                   SET "isOrdered" = true
                   WHERE id = $1
                   RETURNING *;
                   `,
      [id]
    );

    const products = await getProductsByCart(userCart.id);

    userCart.products = products;
    console.log("Finished checking out user cart", userCart);
  } catch {
    console.error("Error checking out user cart");
    throw error;
  }
};

const deleteUserCart = async (id) => {
  try {
    console.log("Starting to delete User Cart", id);
    const {
      rows: [userCart],
    } = await client.query(
      `DELETE FROM user_carts
            WHERE id = $1
            RETURNING *;
            `,
      [id]
    );
    console.log("Finished deleting user cart", userCart);
    return userCart;
  } catch (error) {
    console.error("Error deleting User Cart");
    throw error;
  }
};

const addProductListingsToCart = async (cartId) => {
  try {
    const { rows } = await client.query(`
    
    
    `);
  } catch (error) {
    console.error("Error adding products to cart");
    throw error;
  }
};

module.exports = {
  createUserCart,
  getUserCartById,
  getUserCartByCartOwnerId,
  getAllUserCartsByCartOwnerId,
  checkoutUserCart,
  deleteUserCart,
};
