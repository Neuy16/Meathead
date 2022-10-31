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
    accountID: {
        type: DataTypes.INTEGER,
        references:{
            model: 'accountInfo',
            key: 'id',
        },
    },
    maxBench: {
      type: DataTypes.INTEGER,
      
    },
    maxRepWeight: {
      type: DataTypes.INTEGER,
      
    },
    maxReps: {
      type: DataTypes.INTEGER,
      
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'maxInfo',
  }
);

module.exports = MaxInfo;
