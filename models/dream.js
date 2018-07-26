module.exports = function(sequelize, DataTypes) {
  var Dream = sequelize.define("Dream", {
    dreamTitle: DataTypes.STRING,
    description: DataTypes.TEXT,
    status: DataTypes.BOOLEAN,
    duration: DataTypes.INTEGER
  });
  return Dream;


Dream.associate = function(models) {
  // We're saying that a Post should belong to an Author
  // A Post can't be created without an Author due to the foreign key constraint
  Dream.belongsTo(models.User, {
    foreignKey: {
      allowNull: false
    }
  });
};
return Dream;
};