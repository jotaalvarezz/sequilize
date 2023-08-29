const { Sequelize, DataTypes, Model } = require('sequelize')

const PRODUCT_TABLE = 'products';

const ProductSchema = {
  id:{
    allowNull:false,
    primaryKey:true,
    autoIncrement:true,
    type: DataTypes.BIGINT
  },

  name:{
    allowNull:false,
    type: DataTypes.STRING
  },

  price:{
    allowNull:false,
    type: DataTypes.STRING
  },

  createdAt:{
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }
}


class Product extends Model {
  static associate(){

  }

  static config(sequelize){
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: 'Product',
      timestamps: false
    }
  }
}

module.exports = {
  Product,
  ProductSchema,
  PRODUCT_TABLE
}
