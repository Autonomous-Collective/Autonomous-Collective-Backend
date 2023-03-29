const client = require("./client");
const bcrypt = require("bcrypt");

// database funcs

const createUser = async({name, email, password, isAdmin, isGuest}) => {
    try{
        const SALT_COUNT = 10;
        const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

        const{
            rows: [user],
        } = await client.query(`
            INSERT INTO users (name, email, password, "isAdmin", "isGuest")
            VALUES ($1, $2, $3, $4, $5)
            ON CONFLICT (email) DO NOTHING
            RETURNING id, name, email, "isAdmin", "isGuest";
        `, [name, email, hashedPassword, isAdmin, isGuest]);
        return user;
    } catch(error){
        throw error;
    }
};

const deleteUser = async(id) => {
    try{
        console.log("beginning to delete users");
        // we will need to write getallusercarts(), deleteUserCarts(), then the function below. 
        const{
            rows: [user]
        } = await client.query(`
            DELETE FROM users
            WHERE id = $1
            RETURNING id, email;
        `, [id]);
        console.log(user, "deleted user");
        console.log("finished deleting users");
        return user;
    } catch(error){
        throw error;
    }
}

module.exports = {
    createUser: createUser,
    deleteUser: deleteUser
};