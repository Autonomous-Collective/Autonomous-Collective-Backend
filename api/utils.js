//require user and require admin can go here

const express = require("express");

const requireUser = (req, res, next) => {
  if (!req.user) {
    next({
      name: "MissingUserError",
      message: "You must be logged in to perform this action",
    });
  }

  next();
};

const requireAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    next({
      name: "NotAdminMessage",
      message: "You must be an admin to perform this action",
    });
  }

  next();
};

module.exports = {
  requireUser,
  requireAdmin,
};
