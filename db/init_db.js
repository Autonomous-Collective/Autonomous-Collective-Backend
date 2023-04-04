const client = require("./client");

const {
  //user exports
  createUser,
  deleteUser,
  updateUser,
  getUser,
  getUserByEmail,
  getUserById,
  getAllUsers,
  createGuestUser,

  //product exports
  createProduct,
  editProduct,
  getAllProducts,
  getProductByTitle,
  getProductsByTagId,
  getProductById,
  getProductsByAuthor,

  //tag exports
  createTags,
  getAllTags,
  getTagById,
  getTagsByProduct,
  deleteTag,

  //reviews exports
  createReview,
  editReview,
  getAllReviews,
  getReviewsByProductId,
  deleteReview,

  //product_tags exports
  addTagsToProduct,
  createProductTag,

  //user address imports
  createUserAddress,
  editUserAddress,
  deleteUserAddress,
  getAddressByUser,

  //user cart imports
  createUserCart,
  getUserCartById,
  getUserCartByCartOwnerId,
  getAllUserCartsByCartOwnerId,
  checkoutUserCart,
  deleteUserCart,

  //cart products imports
  addProductToCart,
  removeProductFromCart,
  updateProductAmountInCart,
  getProductsByCart,
  deleteProduct,
} = require("./index");
const {
  productsToAdd,
  usersToAdd,
  reviewsToAdd,
  tagsToAdd,
  productTagsToAdd,
  userAddresses,
  cartProductsToAdd,
  userCartsToAdd,
} = require("./dummyData");
const reviews = require("./reviews");

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
      "isGuest" BOOLEAN DEFAULT false,
      "isActive" BOOLEAN DEFAULT true
    );
    CREATE TABLE products(
      id SERIAL PRIMARY KEY,
      title varchar(255) UNIQUE NOT NULL,
      author varchar(255) NOT NULL,
      isbn varchar(255) NOT NULL,
      description varchar(255) NOT NULL,
      price INTEGER NOT NULL,
      img varchar(255),
      inventory INTEGER NOT NULL,
      "isActive" BOOLEAN DEFAULT true
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
      quantity INTEGER NOT NULL,
      UNIQUE("productId", "cartId")
    );
    CREATE TABLE product_tags(
      id SERIAL PRIMARY KEY,
      "productId" INTEGER REFERENCES products(id),
      "tagId" INTEGER REFERENCES tags(id),
      UNIQUE("productId", "tagId")
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

// create initial data functions

const createInitialUsers = async () => {
  console.log("Starting to Create Users");
  try {
    for (let i = 0; i < usersToAdd.length; i++) {
      await createUser(usersToAdd[i]);
    }
  } catch (error) {
    console.error("error creating users");
    throw error;
  }
};

const createInitialTags = async () => {
  try {
    const tags = await Promise.all(tagsToAdd.map(createTags));
    console.log("finished creating tags!");
    return tags;
  } catch (error) {
    console.log("error creating tags!");
    throw error;
  }
};

const createInitialProducts = async () => {
  console.log("Starting to create products");
  try {
    const products = await Promise.all(productsToAdd.map(createProduct));
    console.log("finished creating products");
    return products;
  } catch (error) {
    console.error("error creating products");
    throw error;
  }
};

const createInitialReviews = async () => {
  console.log("Starting to create reviews");
  try {
    const reviews = await Promise.all(reviewsToAdd.map(createReview));
    console.log("finished creating reviews");
    return reviews;
  } catch (error) {
    console.log("error creating reviews");
    throw error;
  }
};

async function rebuildDB() {
  try {
    await dropTables();
    await createTables();
    //initial funcs
    await createInitialUsers();
    await createInitialTags();
    await createInitialProducts();
    await createInitialReviews();
    const addedUserAddresses = userAddresses.map((address) => {
      createUserAddress(address);
    });
    await Promise.all(addedUserAddresses);
    const addedProductTags = productTagsToAdd.map((e) => {
      addTagsToProduct(e.productId, e.tagId);
    });
    await Promise.all(addedProductTags);
    const createInitialCarts = userCartsToAdd.map((cart) => {
      return createUserCart(cart);
    });
    await Promise.all(createInitialCarts);
    const addedProductsToCart = cartProductsToAdd.map((cartProduct) => {
      return addProductToCart(
        cartProduct.cartId,
        cartProduct.productId,
        cartProduct.quantity
      );
    });
    await Promise.all(addedProductsToCart);

    //user funcs
    await getUser({
      email: "Nicolerules@mymail.com",
      password: "ojwasterrible",
    });
    await updateUser(4, { email: "test@test.com" });
    await getUserById(4);
    await deleteUser(4);
    await createGuestUser();
    await getAllUsers();

    // user address functions
    await getAddressByUser(1);
    await editUserAddress(1, { name: "Jimbo" });
    await deleteUserAddress(2);

    // //product funcs
    await editProduct(3, { title: "edited title" });
    await getAllProducts();
    await getProductByTitle("To Kill A Mocking Bird");
    await getProductById(1);
    await getProductsByAuthor("Harper Lee");

    // Tag Functions
    await createTags({ name: "Manga" });
    await getAllTags();
    await getTagsByProduct(3);
    await getTagById(1);

    // Review Functions
    await createReview({
      score: 7,
      title: "our test review",
      content: "this review is for testing",
      reviewerId: 1,
      productId: 2,
    });

    await getAllReviews();
    await editReview(1, { title: "WE EDITED THE TITLE" });
    await getReviewsByProductId(2);

    //Add products to cart functions
    await removeProductFromCart(2, 2);
    await updateProductAmountInCart(1, 1, 5);
    await getProductsByCart(1);

    // User Cart Functions
    await getUserCartById(1);
    await deleteUserCart(2);
    await getUserCartByCartOwnerId(1);
    await checkoutUserCart(1);
    await getAllUserCartsByCartOwnerId(1);
  } catch (error) {
    console.error("Error during rebuildDB");
    throw error;
  }
}

rebuildDB()
  .catch(console.error)
  .finally(() => client.end());
