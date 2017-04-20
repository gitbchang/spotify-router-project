module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("UserTable", {
        first_name: {
            type: DataTypes.STRING
        },
        last_name: {
            type: DataTypes.STRING
        },
        user_name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        }
  });
  return Users;
};
