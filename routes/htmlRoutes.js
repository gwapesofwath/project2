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

  //maps page
  app.get("/maps", function(req, res) {
    db.Dream.findAll({}).then(function(result) {
      res.render("map", {
        loggedNaps: result
      });
    });
  });

  //alarm page
  app.get("/alarm", function(req, res) {
    db.Dream.findAll({}).then(function(result) {
      res.render("alarm", {
        alarm: result
      });
    });
  });

  //page for getting sleepy
  app.get("/sleepy", function(req, res) {
    db.Dream.findAll({}).then(function(result) {
      res.render("sleepy", {
        sleepy: result
      });
    });
  });

  // a specific user page
  app.get("/user/:id", function(req, res) {
    db.User.findAll({ where: { id: req.params.id }, include: [db.Dream] }).then(function(result) {
      res.render("userPage", {
        user: result[0],
        naps: result[0].Dreams
      });
    });
  });

  //sleep facts page
  app.get("/facts", function(req, res) {
    db.Dream.findAll({}).then(function(result) {
      res.render("facts", {
        facts: result
      });
    });
  });

  //page for adding users and seeing a list of them and the two most recents naps they took
  app.get("/addnaps", function(req, res) {
    db.User.findAll({include: [db.Dream]}).then(function(result) {
<<<<<<< HEAD
    // console.log(result[0].dataValues.Dreams[0])
=======
    console.log(result)          
>>>>>>> 48a9cb4047c564540d9f4e289c3b11078298b928
      res.render("addANap", {
      });
    });
  });

  app.get("/addnaps/:id", function(req, res) {
    db.User.findAll({ where: { id: req.params.id }}).then(function(result) {
    // console.log(result)
      res.render("addANap", {
        loggedNaps: result
      });
    });
  });

  app.get("/users", function(req, res) {
    db.User.findAll({}).then(function(result) {
      res.render("nappers", {
        users: result
      });
    });
  });

  app.get("/dreams", function(req, res) {
    db.Dream.findAll({}).then(function(result) {
      console.log(result)
      res.render("dreams", {
        dreams: result
      });
    });
  });

  // Load a specific entry
  // app.get("/entry/:id", function(req, res) {
  //   console.log(req.params)
  //   db.User.findOne({ where: { id: req.params.id }, include: [db.Dream]  }).then(function(result) {
  //     // console.log(result.dataValues.Dreams[0].dreamTitle);
  //     res.render("loggedNap", {
  //       user: result.dataValues,
  //       specificNap: result.dataValues.Dreams[0]
  //     });
  //   });
  // });

  app.get("/entry/:id", function(req, res) {
    console.log(req.params)
    db.Dream.findOne({ where: { id: req.params.id }}).then(function(result) {
      console.log("test", result.dataValues);
      res.render("loggedNap", {
        specificNap: result.dataValues
      });
    });
  });

  app.get("/entry/edit/:id", function(req, res) {
    db.User.findOne({ where: { id: req.params.id }, include: [db.Dream]  }).then(function(result) {
      console.log(result.dataValues.Dreams[0].dreamTitle);
      res.render("editDream", {
        user: result.dataValues,
        specificNap: result.dataValues.Dreams[0]
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
