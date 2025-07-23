'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Training extends Model {
    static associate(models) {
      Training.belongsToMany(models.User, {
        through: 'user_trainings',
        foreignKey: 'trainingId',
        otherKey: 'userId',
      })
    }
  }
  Training.init({
    title: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Training',
    tableName: 'trainings',
    underscored: true,
  });
  return Training;
};