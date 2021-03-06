/* globals module require __dirname global */

const mongoose = require("mongoose");

const fs = require("fs"),
    path = require("path");

mongoose.Promise = global.Promise;

module.exports = function(connectionString, validator) {
    mongoose.connect(connectionString);

    let User = require("../models/user-model.js");
    let Country = require("../models/country-model");
    let Question = require("../models/question-model");
    let Analytics = require("../models/analytics-model");
    let Chat = require("../models/chat-model");
    let MoreGames = require("../models/more-games-model");

    let models = { User, Country, Question, Chat, Analytics, MoreGames };

    let data = {};

    fs.readdirSync(__dirname)
        .filter(file => file.includes("-data"))
        .forEach(file => {
            let modulePath = path.join(__dirname, file);
            let dataModule = require(modulePath)(models, validator);

            Object.keys(dataModule)
                .forEach(key => {
                    data[key] = dataModule[key];
                });
        });

    return data;
};