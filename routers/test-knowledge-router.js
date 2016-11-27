/* globals module require */

const express = require("express");

let Router = express.Router;
let isAuthenticated = require("../middlewares/is-user-authenticated");

module.exports = function ({ app, data }) {

    let controller = require("../controllers/test-knowledge-controller")(data);
    let router = new Router();

    router
        .get("/test-your-knowledge", isAuthenticated, controller.getTestKnowledgeQuestion)
        .get("/test-your-knowledge/:countryName", isAuthenticated, controller.redirectToQuestion)
        .get("/test-your-knowledge/:countryName/:id", isAuthenticated, controller.getQuestion);

    app.use("/game", router);

    return router;
};