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
  editUserAddress,
  updateUser,
  deleteUser,
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
      const updatedCart = await updateProductAmountInCart(
        cart.id,
        productId,
        quantity
      );
      res.send({ updatedCart: updatedCart, success: true });
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
  const { name, password, email } = req.body;

  const fields = {};

  if (name) {
    fields.name = name;
  }
  if (email) {
    fields.email = email;
  }
  if (password) {
    fields.password = password;
  }

  try {
    const user = await updateUser(userId, fields);

    const address = await getAddressByUser(userId);

    user.address = address;

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

module.exports = usersRouter;
