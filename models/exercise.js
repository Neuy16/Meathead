const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Exercise extends Model {}

Exercise.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    benchPress: {
      type: DataTypes.INTEGER,
    },
    tricepExtensions: {
      type: DataTypes.INTEGER,
    },
    chestFlies: {
      type: DataTypes.INTEGER,
    },
    maxid: {
      type: DataTypes.INTEGER,
      references: {
        model: 'maxInfo',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: false,
    modelName: 'exercise',
  }
);

module.exports = Exercise;