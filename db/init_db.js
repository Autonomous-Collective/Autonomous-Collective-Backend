const client = require("./client");

const usersToAdd = [
  {
    name: "Stephen",
    email: "TheKing@mymail.com",
    password: "2stephen2quit",
    isAdmin: true,
    isGuest: false,
  },
  {
    name: "Nicole",
    email: "Nicolerules@mymail.com",
    password: "ojwasterrible",
    isAdmin: false,
    isGuest: false,
  },
  {
    name: "Victor",
    email: "youngandrestless@mymail.com",
    password: "bold&beautiful",
    isAdmin: false,
    isGuest: false,
  },
  {
    name: "Barbara",
    email: "barbarian@mymail.com",
    password: "sumeriarules!",
    isAdmin: false,
    isGuest: false,
  },
];

const productsToAdd = [
  {
    title: "To Kill A Mocking Bird",
    author: "Harper Lee",
    isbn: "9781234567897",
    description: "",
    price: "",
    imageUrl: "",
    quantity: "",
  },
  {
    title: "",
    author: "",
    isbn: "9781234567898",
    description: "",
    price: "",
    imageUrl: "",
    quantity: "",
  },
  {
    title: "",
    author: "",
    isbn: "9781234567899",
    description: "",
    price: "",
    imageUrl: "",
    quantity: "",
  },
  {
    title: "",
    author: "",
    description: "",
    price: "",
    imageUrl: "",
    quantity: "",
  },
  {
    title: "",
    author: "",
    isbn: "9781234567901",
    description: "",
    price: "",
    imageUrl: "",
    quantity: "",
  },
  {
    title: "",
    author: "",
    isbn: "9781234567902",
    description: "",
    price: "",
    imageUrl: "",
    quantity: "",
  },
  {
    title: "",
    author: "",
    isbn: "9781234567903",
    description: "",
    price: "",
    imageUrl: "",
    quantity: "",
  },
  {
    title: "",
    author: "",
    isbn: "9781234567904",
    description: "",
    price: "",
    imageUrl: "",
    quantity: "",
  },
  {
    title: "",
    author: "",
    isbn: "9781234567905",
    description: "",
    price: "",
    imageUrl: "",
    quantity: "",
  },
  {
    title: "",
    author: "",
    isbn: "9781234567906",
    description: "",
    price: "",
    imageUrl: "",
    quantity: "",
  },
];

const dropTables = async () => {
  try {
    // drop tables in correct order
    client.connect();
    console.log("Dropping All Tables");

    await client.query(`
    DROP TABLE IF EXISTS cart_products;
    DROP TABLE IF EXISTS product_tags;
    DROP TABLE IF EXISTS user_addresses;
    DROP TABLE IF EXISTS reviews;
    DROP TABLE IF EXISTS user_carts;
    DROP TABLE IF EXISTS tags;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS products;
    
    
    `);
    console.log("Finished Dropping Tables!");
  } catch (error) {
    console.error("Error Dropping Tables!");
    throw error;
  }
};

const createTables = async () => {
  try {
    console.log("Starting to Build Tables");

    await client.query(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      name varchar(255) NOT NULL,
      email varchar(255) UNIQUE NOT NULL,
      password varchar(255) NOT NULL,
      "isAdmin" BOOLEAN DEFAULT false,
      "isGuest" BOOLEAN DEFAULT false
    );
    CREATE TABLE products(
      id SERIAL PRIMARY KEY,
      title varchar(255) UNIQUE NOT NULL,
      author varchar(255) NOT NULL,
      isbn varchar(255) NOT NULL,
      description varchar(255) NOT NULL,
      price INTEGER NOT NULL,
      img varchar(255),
      quanity INTEGER NOT NULL 
    );
    CREATE TABLE tags(
      id SERIAL PRIMARY KEY,
      name varchar(255) UNIQUE NOT NULL
    );
    CREATE TABLE user_carts(
      id SERIAL PRIMARY KEY,
      "cartOwnerId" INTEGER REFERENCES users(id),
      "isOrdered" BOOLEAN DEFAULT false
    );
    CREATE TABLE cart_products(
      id SERIAL PRIMARY KEY,
      "productId" INTEGER REFERENCES products(id),
      "cartId" INTEGER REFERENCES user_carts(id),
      quanity INTEGER NOT NULL
    );
    CREATE TABLE product_tags(
      id SERIAL PRIMARY KEY,
      "productId" INTEGER REFERENCES products(id),
      "tagId" INTEGER REFERENCES tags(id)
    );
    CREATE TABLE user_addresses(
      id SERIAL PRIMARY KEY,
      name varchar(255) NOT NULL,
      address varchar(255) NOT NULL,
      city varchar(255) NOT NULL,
      state varchar(255) NOT NULL,
      "userId" INTEGER REFERENCES users(id),
      UNIQUE("userId", id) 
    );
    CREATE TABLE reviews(
      id SERIAL PRIMARY KEY,
      score INTEGER NOT NULL,
      title varchar(255) NOT NULL,
      content varchar(255) NOT NULL,
      "reviewerId" INTEGER REFERENCES users(id),
      "productId" INTEGER REFERENCES products(id)
    );
    
    
    `);

    console.log("Finished Creating Tables");
  } catch (error) {
    console.error("Error Building Tables");
    throw error;
  }
};

const populateInitialData = async () => {
  try {
    console.log("!!!!", "Hello World");

    // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
    // const user1 = await User.createUser({ ...user info goes here... })
  } catch (error) {
    throw error;
  }
};

async function rebuildDB() {
  try {
    await dropTables();
    await createTables();
  } catch (error) {
    console.log("Error during rebuildDB");
    throw error;
  }
}

rebuildDB();
