const express = require("express");
const userController = require("../controllers/user.controller");
const { verifyToken } = require("../middlewares/verifyToken.middleware");

const Router = express.Router();

Router.route("/")
    .get(verifyToken, userController.getUser)
    .put(verifyToken, userController.updateUser);
Router.route("/favourite")
    .get(verifyToken, userController.showFavourite)
    .patch(verifyToken, userController.updateFavourite);
Router.route("/collection").get(verifyToken, userController.showCollection);

module.exports = Router;
