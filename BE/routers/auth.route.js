const express = require("express");
const { login, register, logout } = require("../controllers/auth.controller");
const { verifyToken } = require("../middlewares/verifyToken.middleware");

const Router = express.Router();

Router.route("/register").post(register);
Router.route("/login").post(login);
Router.route("/logout").post(logout);

module.exports = Router;
