const client = require("./client");
const bcrypt = require("bcrypt");

const createUser = async ({ name, email, password, isAdmin, isGuest }) => {
  try {
    const SALT_COUNT = 10;
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

    const {
      rows: [user],
    } = await client.query(
      `
            INSERT INTO users (name, email, password, "isAdmin", "isGuest")
            VALUES ($1, $2, $3, $4, $5)
            ON CONFLICT (email) DO NOTHING
            RETURNING id, name, email, "isAdmin", "isGuest";
        `,
      [name, email, hashedPassword, isAdmin, isGuest]
    );
    console.log("Finished creating user!!", user);
    return user;
  } catch (error) {
    console.error("Error creating user!!");
    throw error;
  }
};

async function updateUser(id, fields = {}) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  if (setString.length === 0) {
    return;
  }

  try {
    const {
      rows: [user],
    } = await client.query(
      `
      UPDATE users
      SET ${setString}
      WHERE id=${id}
      RETURNING *;
      `,
      Object.values(fields)
    );
    delete user.password;
    console.log("Finished updating user", user);
    return user;
  } catch (error) {
    console.error("Error updating user!!");
    throw error;
  }
}

const getUserByEmail = async (email) => {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        SELECT * 
        FROM users 
        WHERE email = $1;
        `,
      [email]
    );
    console.log("Finished getting user by email", user);
    return user;
  } catch (error) {
    console.error("Error getting user by email");
    throw error;
  }
};

const getUserById = async (userId) => {
  try {
    const {
      rows: [user],
    } = await client.query(
      `SELECT id, email, "isAdmin", "isGuest"
          FROM users
          WHERE id = $1`,
      [userId]
    );
    console.log("Finished getting user by id", user);
    return user;
  } catch (error) {
    console.error("Error getting user by Id");
    throw error;
  }
};

const getUser = async ({ email, password }) => {
  const userByEmail = await getUserByEmail(email);
  const hashedPassword = userByEmail.password;
  const isValid = await bcrypt.compare(password, hashedPassword);
  try {
    const {
      rows: [user],
    } = await client.query(
      `SELECT id, email, password, "isAdmin", "isGuest" 
            FROM users
            WHERE id=${userByEmail.id}
            
            `
    );
    if (!isValid) {
      console.log("Invalid email and/or password");
      return null;
    } else {
      delete user.password;
      console.log("Finished getting user!", user);
      return user;
    }
  } catch (error) {
    console.error("Error getting User");
    throw error;
  }
};

const getAllUsers = async () => {
  try {
    const { rows } = await client.query(`
              SELECT id, email, "isAdmin", "isGuest", "isActive", name
              FROM users
              `);
    console.log("Finished getting all users!", rows);
    return rows;
  } catch (error) {
    console.error("Error getting all users");
    throw error;
  }
};

// isActive to false
// delete the user address
// randomize their email and password (security measure to not store the originals anymore)
// we can use bcrypt and set up Math.random(10 - 100) to pick random number for SALT_COUNT
const deleteUser = async (id) => {
  try {
    console.log("beginning to delete users", id);

    const SALT_COUNT = Math.floor(Math.random() * 10);
    const deletedHashedPassword = await bcrypt.hash("password", SALT_COUNT);
    const deletedHashedEmail = await bcrypt.hash("email", SALT_COUNT);

    const {
      rows: [user],
    } = await client.query(
      `
                      UPDATE users
                      SET "isActive"=false, email=$2, password=$3
                      WHERE id = $1
                      RETURNING id, email;
                  `,
      [id, deletedHashedEmail, deletedHashedPassword]
    );
    console.log("Finished deleting user", user);
    return user;
  } catch (error) {
    console.error("Error deleting User");
    throw error;
  }
};

const createGuestUser = async () => {
  try {
    console.log("Starting to create guest user");

    const SALT_COUNT = Math.floor(Math.random() * 10);
    const assignedName = await bcrypt.hash("name", SALT_COUNT);
    const assignedEmail = await bcrypt.hash("email", SALT_COUNT);
    const assignedPassword = await bcrypt.hash("password", SALT_COUNT);

    const {
      rows: [user],
    } = await client.query(
      `
            INSERT INTO users (name, email, password, "isGuest")
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (email) DO NOTHING
            RETURNING id, name, email, "isGuest", "isAdmin";
        `,
      [assignedName, assignedEmail, assignedPassword, true]
    );
    console.log("Finished creating guest user!!", user);
    return user;
  } catch (error) {
    console.error("Error creating guest user!!");
    throw error;
  }
};

module.exports = {
  createUser: createUser,
  deleteUser: deleteUser,
  updateUser: updateUser,
  getUser: getUser,
  getUserByEmail: getUserByEmail,
  getUserById: getUserById,
  getAllUsers: getAllUsers,
  createGuestUser: createGuestUser,
};
