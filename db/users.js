const client = require("./client");
const bcrypt = require("bcrypt");

// database funcs

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
    return user;
  } catch (error) {
    throw error;
  }
};


async function updateUser(id, fields = {}) {
  // build the set string
  const setString = Object.keys(fields)
  .map((key, index) => `"${key}"=$${index + 1}`)
  .join(", ");
  
  // return early if this is called without fields
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
      // console.log(user, "Updated user");
      return user;
    } catch (error) {
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
        return user;
      } catch (error) {
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
          // console.log(user, "user from Get user by id");
          return user;
        } catch (error) {
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
              // throw {
                //   name: "UserNotFoundError",
                //   message: "Invalid username and password",
                // };
                return null;
              } else {
                delete user.password;
                // console.log(user, "Get user function return");
                return user;
              }
            } catch (error) {
              throw { error };
            }
          };
          
          const getAllUsers = async () => {
            try{
              const { rows } = await client.query(`
              SELECT id, email, "isAdmin", "isGuest"
              FROM users
              `);
              // console.log(rows, "all users from get Allusers");
              return rows;
            } catch(error){
              console.error("error getting all users");
              throw error;
            }
          };
          
          // isActive to false
          // delete the user address
          // randomize their email and password (security measure to not store the originals anymore)
                    // we can use bcrypt and set up Math.random(10 - 100) to pick random number for SALT_COUNT
          const deleteUser = async (id) => {
            try {
              console.log("beginning to delete users");

              const SALT_COUNT = Math.floor(Math.random() * 10);
              const deletedHashedPassword = await bcrypt.hash("password", SALT_COUNT);
              const deletedHashedEmail  = await bcrypt.hash("email", SALT_COUNT);
          
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
              // console.log(user, "deleted user");
              console.log(user, "finished deleting user");
              return user;
            } catch (error) {
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
};
