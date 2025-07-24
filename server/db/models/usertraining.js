'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserTraining extends Model {
    static associate(models) {
      UserTraining.belongsTo(models.User, {foreignKey: 'userId'});
      UserTraining.belongsTo(models.Training, {foreignKey: 'trainingId'});
    }
  }
  UserTraining.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    trainingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'UserTraining',
    tableName: 'user_trainings',
    underscored: true,
  });
  return UserTraining;
};