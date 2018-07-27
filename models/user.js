module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    // Giving the Author model a name of type STRING
    name: DataTypes.STRING,
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
  User.associate = function(models) {
    // Associating User with naps
    // When an User is deleted, also delete any associated naps
    User.hasMany(models.Dream, {
      onDelete: "cascade"
    });
  };
  return User;
};
