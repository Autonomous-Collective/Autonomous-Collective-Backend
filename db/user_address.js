const client = require("./client");

const createUserAddress = async(name, address, city, state, userId) => {    //not tested yet
    try{
        const { rows: [address]} = await client.query(`
            INSERT INTO user_addresses (name, address, city, state, "userId")
            VALUES ($1, $2, $3, $4, $5)
            ON CONFLICT (id, "userId") DO NOTHING
            RETURNING *
        `, [name, address, city, state, userId]);
        console.log(address, "addess from createUserAddress");
        return address;
    } catch(error){
        console.error("error creating user address");
        throw error;
    }
}

const editUserAddress = async(userId, fields ={}) => {
    const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

    if (setString.length === 0) {
    return;
    }
    try{
        const{ rows: [address]} = await client.query(`
            UPDATE user_addresses
            SET ${setString}
            WHERE "userId" = ${userId}
            RETURNING *;
        `, Object.values(fields));
        console.log(address, "edited user address");
        return address;
    } catch(error){
        console.error("error editing user address");
        throw error;
    }
}

const deleteUserAddress = async(userId) => {
    try{
        const{rows: [address]} = await client.query(`
            DELETE from user_address
            WHERE "userId" = $1
            RETURNING *;
        `, [userId]);
        console.log(address, "deleted user address");
        return address;
    } catch(error) {
        console.error("error deleting user");
        throw error;
    }
}

module.exports ={
    createUserAddress,
    editUserAddress,
}