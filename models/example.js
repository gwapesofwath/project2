module.exports = function(sequelize, DataTypes) {
  var Dream = sequelize.define("Dream", {
    name: DataTypes.STRING,
    dreamTitle: DataTypes.STRING,
    description: DataTypes.TEXT,
    status: DataTypes.BOOLEAN,
    duration: DataTypes.INTEGER
  });
  return Dream;
};
