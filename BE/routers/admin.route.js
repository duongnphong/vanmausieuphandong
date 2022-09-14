const express = require("express");
const adminController = require("../controllers/admin.controller");
const { verifyToken } = require("../middlewares/verifyToken.middleware");

const Router = express.Router();

Router.route("/").post(verifyToken, adminController.createAdmin);
Router.route("/management/users").get(verifyToken, adminController.getAllUser);
Router.route('/management/docs').post(verifyToken, adminController.get);
Router.route('/').post(verifyToken, adminController.createAdmin);

module.exports = Router;
