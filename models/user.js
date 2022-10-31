const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class AccountInfo extends Model {}

AccountInfo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'accountinfo',
  }
);

module.exports = AccountInfo;
