'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Candidate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
   Candidate.belongsTo(models.Position, { foreignKey: 'positionId' });
    }
  }
  Candidate.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.TEXT,
    photo: DataTypes.STRING,
    positionId: DataTypes.INTEGER
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Candidate',
  });
  return Candidate;
};