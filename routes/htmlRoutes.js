var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Dream.findAll({}).then(function(result) {
      res.render("home", {
        examples: result
      });
    });
  });

  app.get("/maps", function(req, res) {
    db.Dream.findAll({}).then(function(result) {
      res.render("map", {
        loggedNaps: result
      });
    });
  });

  app.get("/alarm", function(req, res) {
    db.Dream.findAll({}).then(function(result) {
      res.render("alarm", {
        alarm: result
      });
    });
  });

  app.get("/sleepy", function(req, res) {
    db.Dream.findAll({}).then(function(result) {
      res.render("sleepy", {
        sleepy: result
      });
    });
  });

  app.get("/user/:id", function(req, res) {
    db.Dream.findAll({}).then(function(result) {
      res.render("userpage", {
        sleepy: result
      });
    });
  });

  app.get("/facts", function(req, res) {
    db.Dream.findAll({}).then(function(result) {
      res.render("facts", {
        facts: result
      });
    });
  });

  app.get("/addnaps", function(req, res) {
    db.Dream.findAll({}).then(function(result) {
      res.render("addANap", {
        loggedNaps: result
      });
    });
  });

  app.get("/users", function(req, res) {
    db.Dream.findAll({}).then(function(result) {
      res.render("nappers", {
        users: result
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/entry/:id", function(req, res) {
    db.Dream.findOne({ where: { id: req.params.id } }).then(function(result) {
      console.log(result.dataValues);
      res.render("loggedNap", {
        specificNap: result.dataValues
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
