const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class MaxInfo extends Model {}

MaxInfo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    maxbench: {
      type: DataTypes.INTEGER,
      
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: false,
    modelName: 'maxInfo',
  }
);

module.exports = MaxInfo;
