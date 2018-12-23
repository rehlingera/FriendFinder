var path = require("path");

module.exports = function(app) {
    // When the "/" URL is visited, return the home.html page
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname,"../public/home.html"));
    });
    
    // When the "/survey" URL is visited, return the survey.html page
    app.get("/survey", function(req, res) {
        res.sendFile(path.join(__dirname,"../public/survey.html"));
    });
};