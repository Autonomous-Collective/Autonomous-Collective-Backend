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

async function buildTables() {
  try {
    client.connect();

    // drop tables in correct order

    // build tables in correct order
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    console.log("!!!!", "Hello World");

    // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
    // const user1 = await User.createUser({ ...user info goes here... })
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
