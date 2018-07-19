var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/nappers", function(req, res) {
    db.Dream.findAll({}).then(function(result) {
      res.json(result);
    });
  });

  // Create a new example
  app.post("/api/nappers", function(req, res) {
    db.Dream.create(req.body).then(function(result) {
      console.log(result);
      res.json(result);
    });
  });

  // Delete an example by id
  app.delete("/api/nappers/:id", function(req, res) {
    db.Dream.destroy({ where: { id: req.params.id } }).then(function(result) {
      res.json(result);
    });
  });
};
