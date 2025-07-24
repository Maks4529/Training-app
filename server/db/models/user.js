'use strict';
const {Model} = require('sequelize');
const {hashSync} = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsToMany(models.Training, {
        through: 'user_trainings',
        foreignKey: 'userId',
        otherKey: 'trainingId',
      })
    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
      set (value){
        this.setDataValue(
          'passwordHash',
          hashSync(value, Number(process.env.HASH_SALT))
        )
      },
    },
    birthday: {
      type: DataTypes.DATEONLY,
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    underscored: true,
  });
  return User;
};