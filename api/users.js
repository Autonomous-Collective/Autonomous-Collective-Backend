const express = require("express");
const jwt = require("jsonwebtoken");
const { getUserByEmail, createUser } = require("../db/users");
const usersRouter = express.Router();
const bcrypt = require("bcrypt");
const { requireUser } = require("./utils");
const { getUserCartByCartOwnerId, createUserCart } = require("../db");

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
      res.send({ message: "You're logged in!", token, success: true });
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
    console.log("this is cartId", userId);
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

module.exports = usersRouter;
