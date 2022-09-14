const express = require("express");
const docController = require("../controllers/document.controller");
const { verifyToken } = require("../middlewares/verifyToken.middleware");

const Router = express.Router();

Router.route("/")
    .get(docController.getAllDocument)
    .post(verifyToken, docController.createDocument);
Router.route("/:docId")
    .get(docController.getDocument)
    .put(verifyToken, docController.editDocument)
    .delete(verifyToken, docController.deleteDocument);
Router.route("/:docId/favourite").patch(
    verifyToken,
    docController.favouriteDocument
);
Router.route("/:docId/vote").patch(verifyToken, docController.voteDocument);

module.exports = Router;
