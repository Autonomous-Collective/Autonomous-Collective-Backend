const express = require("express");
const jwt = require("jsonwebtoken");
const usersRouter = express.Router();
const bcrypt = require("bcrypt");
const { requireUser, requireAdmin } = require("./utils");
const {
  getUserCartByCartOwnerId,
  getAllUserCartsByCartOwnerId,
  createUserCart,
  updateProductAmountInCart,
  addProductToCart,
  getAddressByUser,
  getUserByEmail,
  createUser,
  getAllUsers,
  getUserById,
  createUserAddress,
  editUserAddress,
  updateUser,
  deleteUser,

  createGuestUser,
  checkoutUserCart,
  getUserCartById,

  removeProductFromCart,
} = require("../db");

//user routes will go here

// POST /api/users/register
usersRouter.post("/register", async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!email || !password) {
    res.status(401);
    next({
      name: "MissingCredentialsError",
      message: "Please supply both an email and password",
    });
  }

  try {
    const _user = await getUserByEmail(email);

    if (_user) {
      res.status(401);
      next({
        name: "Email duplication error",
        message: "Email already exists",
      });
    } else if (password.length < 8) {
      res.status(401);
      next({
        name: "Password length error",
        message: "Password too short!",
      });
    } else {
      const user = await createUser({
        name,
        email,
        password,
        isAdmin: false,
        isGuest: false,
      });

      if (!user) {
        next({
          name: "User does not exist",
          message: "User does not exist",
        });
      } else {
        const token = jwt.sign({ id: user.id, email }, process.env.JWT_SECRET, {
          expiresIn: "1w",
        });

        delete user.password;

        res.send({
          message: "Thanks for signing up!",
          token,
          user,
          success: true,
        });
      }
    }
  } catch ({ name, message }) {
    res.status(400);
    next({
      name: "Registration Error",
      message: "Something went wrong during Registration",
    });
  }
});

// POST /api/users/login
usersRouter.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(401);
    next({
      name: "MissingCredentialsError",
      message: "Please supply both an email and password",
    });
  }

  try {
    const user = await getUserByEmail(email);

    const isValid = await bcrypt.compare(password, user.password);

    if (user && isValid) {
      const token = jwt.sign({ id: user.id, email }, process.env.JWT_SECRET);

      delete user.password;

      res.send({ message: "You're logged in!", token, user, success: true });
    } else {
      res.status(401);
      next({
        name: "IncorrectCredentialsError",
        message: "Email or password is incorrect",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(400);
    next({
      name: "Login Error",
      message: "Something went wrong during Login",
    });
  }
});

//POST /api/users/guest-login

usersRouter.post("/guest-login", async (req, res, next) => {
  try {
    const guestUser = await createGuestUser();

    if (guestUser) {
      const token = jwt.sign(
        { id: guestUser.id, email: guestUser.email },
        process.env.JWT_SECRET
      );
      res.send({
        message: "Guest user logged in!",
        guestUser,
        token,
        success: true,
      });
    } else {
      res.status(401);
      next({
        name: "CreateGuestUserError",
        message: "Error during create guest user",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(400);
    next({
      name: "GuestLoginError",
      message: "Something went wrong during Guest Login",
    });
  }
});

// GET /api/users/:userId/cart

usersRouter.get("/:userId/cart", requireUser, async (req, res, next) => {
  try {
    const { userId } = req.params;
    const cart = await getUserCartByCartOwnerId(userId);

    if (cart) res.send({ cart: cart, success: true });
    else {
      const newCart = await createUserCart({
        cartOwnerId: userId,
        isOrdered: false,
      });
      res.send(newCart);
    }
  } catch ({ name, message }) {
    next({
      name: "Error getting cart",
      message: "Something happened while getting cart",
    });
  }
});

// GET /api/users/:userId/orders

usersRouter.get("/:userId/orders", requireUser, async (req, res, next) => {
  try {
    const { userId } = req.params;

    const userOrders = await getAllUserCartsByCartOwnerId(userId);

    if (userOrders.length) res.send({ userOrders: userOrders, success: true });
    else {
      next({
        name: "No orders found",
        message: "No orders found for this user",
      });
    }
  } catch ({ name, message }) {
    next({
      name: "Error getting orders",
      message: "Something happened while getting orders",
    });
  }
});

// GET /api/users/all (for admin)

usersRouter.get("/all", requireAdmin, async (req, res, next) => {
  try {
    const allUsers = await getAllUsers();
    res.send({ allUsers: allUsers, success: true });
  } catch ({ name, message }) {
    next({
      name: "Error getting all users",
      message: "Something happened while getting all users",
    });
  }
});

// PATCH /api/users/:userId/cart/update product/:productId

usersRouter.patch(
  "/:userId/cart/update-product/:productId",
  requireUser,
  async (req, res, next) => {
    const { userId, productId } = req.params;
    const { quantity } = req.body;

    try {
      const cart = await getUserCartByCartOwnerId(userId);
      if (quantity === 0) {
        const removedProduct = await removeProductFromCart(cart.id, productId);

        res.send({ removedProduct: removedProduct, success: true });
      } else {
        const updatedCart = await updateProductAmountInCart(
          cart.id,
          productId,
          quantity
        );
        res.send({ updatedCart: updatedCart, success: true });
      }
    } catch ({ name, message }) {
      next({
        name: "Error updating user's cart",
        message: "Something happened while updating user's cart",
      });
    }
  }
);

// POST /api/users/:userId/cart/add-product/:productId

usersRouter.post(
  "/:userId/cart/add-product/:productId",
  requireUser,
  async (req, res, next) => {
    const { userId, productId } = req.params;
    const { quantity } = req.body;

    try {
      const cart = await getUserCartByCartOwnerId(userId);
      const updatedCart = await addProductToCart(cart.id, productId, quantity);
      res.send({ updatedCart: updatedCart, success: true });
    } catch ({ name, message }) {
      next({
        name: "Error updating user's cart",
        message: "Error adding product to user's cart",
      });
    }
  }
);

usersRouter.get("/me", requireUser, async (req, res, next) => {
  const userId = req.user.id;

  try {
    const user = await getUserById(userId);

    const address = await getAddressByUser(userId);

    user.address = address;

    res.send({
      success: true,
      user: user,
    });
  } catch ({ name, message }) {
    next({
      name: "ErrorGettingUser",
      message: "Error getting user info",
    });
  }
});

usersRouter.post("/me/create-address", requireUser, async (req, res, next) => {
  const userId = req.user.id;
  const { name, address, city, state } = req.body;

  try {
    const userAddress = await createUserAddress({
      name: name,
      address: address,
      city: city,
      state: state,
      userId: userId,
    });
    res.send({
      success: true,
      userAddress: userAddress,
    });
  } catch ({ name, message }) {
    next({
      name: "ErrorCreatingAddress",
      message: "Error creating user address",
    });
  }
});

usersRouter.patch("/me/edit-address", requireUser, async (req, res, next) => {
  const userId = req.user.id;
  const { name, address, city, state } = req.body;

  const fields = {};

  if (name) {
    fields.name = name;
  }
  if (address) {
    fields.address = address;
  }
  if (city) {
    fields.city = city;
  }
  if (state) {
    fields.state = state;
  }

  try {
    const user = await getUserById(userId);

    const address = await editUserAddress(userId, fields);

    user.address = address;

    res.send({
      success: true,
      user: user,
    });
  } catch ({ name, message }) {
    next({
      name: "ErrorUpdatingUser",
      message: "Error updating user address",
    });
  }
});

usersRouter.patch("/me/edit-info", requireUser, async (req, res, next) => {
  const userId = req.user.id;
  console.log(req.body);
  const { name, password, email, isGuest } = req.body;
  console.log(name, password, email, isGuest, "!!!!!!!!");
  const SALT_COUNT = 10;
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  const fields = {};

  if (name) {
    fields.name = name;
  }
  if (email) {
    fields.email = email;
  }
  if (password) {
    fields.password = hashedPassword;
  }
  if (isGuest !== undefined) {
    fields.isGuest = isGuest;
  }

  console.log(fields, "!!!");

  try {
    const user = await updateUser(userId, fields);

    const address = await getAddressByUser(userId);
    if (address) {
      user.address = address;
    }

    res.send({
      success: true,
      user: user,
    });
  } catch ({ name, message }) {
    next({
      name: "ErrorUpdatingUser",
      message: "Error updating user info",
    });
  }
});

usersRouter.patch("/me/delete", requireUser, async (req, res, next) => {
  const userId = req.user.id;
  console.log(req.user, "req.user");

  try {
    const deletedUser = await deleteUser(userId);
    res.send({
      success: true,
      deletedUser: deletedUser,
    });
  } catch (error) {
    next({
      name: "ErrorDeletingUser",
      message: "There was an error deleting this user",
    });
  }
});

usersRouter.patch("/delete/:userId", requireAdmin, async (req, res, next) => {
  const { userId } = req.params;
  console.log(req.user, "req.user");

  try {
    const deletedUser = await deleteUser(userId);
    res.send({
      success: true,
      deletedUser: deletedUser,
    });
  } catch (error) {
    next({
      name: "ErrorDeletingUser",
      message: "There was an error deleting this user",
    });
  }
});

//PATCH user admin:
usersRouter.patch(
  "/admin/edit-user/:userId",
  requireAdmin,
  async (req, res, next) => {
    const userId = req.params.userId;
    const { name, email, isAdmin, isActive } = req.body;
    console.log(
      userId,
      req.body,
      "user id and req body in api for edit user admin"
    );

    const fields = {};

    if (name) {
      fields.name = name;
    }
    if (email) {
      fields.email = email;
    }
    if (isAdmin || (!isAdmin && isAdmin !== undefined)) {
      fields.isAdmin = isAdmin;
    }
    if (isActive || (!isActive && isActive !== undefined)) {
      fields.isActive = isActive;
    }

    try {
      const user = await updateUser(userId, fields);

      // const address = await getAddressByUser(userId);

      // user.address = address;

      res.send({
        success: true,
        user: user,
      });
    } catch ({ name, message }) {
      next({
        name: "ErrorUpdatingUser",
        message: "Error updating user info",
      });
    }
  }
);

usersRouter.patch("/cart/checkout", requireUser, async (req, res, next) => {
  const { id } = req.user;

  try {
    const cart = await getUserCartByCartOwnerId(id);
    const checkedOutCart = await checkoutUserCart(cart.id);

    res.send({
      success: true,
      checkedOutCart: checkedOutCart,
    });
  } catch (error) {
    next({
      name: "ErrorCheckingOutCart",
      message: "Something happened while checking out cart",
    });
  }
});

module.exports = usersRouter;
