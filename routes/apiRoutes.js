var db = require("../models");

module.exports = function(app) {
  // Get all naps
  app.get("/api/naps", function(req, res) {
    db.Dream.findAll({}).then(function(result) {
      res.json(result);
    });
  });

  //get all Users
  app.get("/api/user", function(req, res) {
    db.User.findAll({}).then(function(result) {
      res.json(result);
    });
  });

  // Create a new nap
  app.post("/api/naps", function(req, res) {
    console.log(req);
    db.Dream.create(req.body).then(function(result) {
      console.log(result);
      res.json(result);
    });
  });

  //create new User
  app.post("/api/user", function(req, res) {
    db.User.create(req.body).then(function(result) {
      console.log(result);
      res.json(result);
    });
  });

  // Delete an example by id
  app.delete("/api/nappers/:id", function(req, res) {
    console.log("test");
    db.User.destroy({ where: { id: req.params.id } }).then(function(result) {
      res.json(result);
    });
  });

  app.put("/api/naps/:id", function(req, res) {
    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    console.log(req.body.description)
    db.Dream.update({
      description: req.body.description
    }, {
      where: {
        id: req.params.id
      }
    }).then(function(dbTodo) {
      res.json(dbTodo);
    });
  });

};
