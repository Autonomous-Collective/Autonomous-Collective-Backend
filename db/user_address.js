const client = require("./client");

//not tested yet
const createUserAddress = async ({ name, address, city, state, userId }) => {
  try {
    const {
      rows: [userAddress],
    } = await client.query(
      `
            INSERT INTO user_addresses (name, address, city, state, "userId")
            VALUES ($1, $2, $3, $4, $5)
            ON CONFLICT (id, "userId") DO NOTHING
            RETURNING *
        `,
      [name, address, city, state, userId]
    );
    console.log(userAddress, "addess from createUserAddress");
    return userAddress;
  } catch (error) {
    console.error("error creating user address");
    throw error;
  }
};

const editUserAddress = async (userId, fields = {}) => {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  if (setString.length === 0) {
    return;
  }
  try {
    const {
      rows: [address],
    } = await client.query(
      `
            UPDATE user_addresses
            SET ${setString}
            WHERE "userId" = ${userId}
            RETURNING *;
        `,
      Object.values(fields)
    );
    console.log(address, "edited user address");
    return address;
  } catch (error) {
    console.error("error editing user address");
    throw error;
  }
};

const deleteUserAddress = async (userId) => {
  try {
    const {
      rows: [address],
    } = await client.query(
      `
            DELETE from user_addresses
            WHERE "userId" = $1
            RETURNING *;
        `,
      [userId]
    );
    console.log(address, "deleted user address");
    return address;
  } catch (error) {
    console.error("error deleting user");
    throw error;
  }
};

const getAddressByUser = async (id) => {
  console.log(id, "!!!!");
  try {
    const {
      rows: [address],
    } = await client.query(
      `
    SELECT *
    FROM user_addresses
    WHERE "userId" = $1
    `,
      [id]
    );
    console.log(address, "****");
    return address;
  } catch (error) {
    console.error("error getting user address");
  }
};

module.exports = {
  createUserAddress,
  editUserAddress,
  deleteUserAddress,
  getAddressByUser,
};
