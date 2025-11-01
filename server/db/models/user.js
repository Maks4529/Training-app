'use strict';
const {Model} = require('sequelize');
const {hashSync} = require('bcrypt');
const {ROLE: {USER, TRAINER, ADMIN}} = require('./../../constants');

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
    role: {
      type: DataTypes.ENUM(USER, TRAINER, ADMIN),
      allowNull: false,
      defaultValue: USER,
    },
    image: {
      type: DataTypes.STRING(255),
      defaultValue: '/static/images/defaultImage.jpg',
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    underscored: true,
  });
  return User;
};