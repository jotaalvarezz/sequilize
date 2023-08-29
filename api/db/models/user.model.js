const { Model, DataTypes, Sequelize } = require('sequelize')

const USER_TABLE = 'users';

const UserSchema = {
  id:{
    allowNull:false,
    primaryKey:true,
    autoIncrement:true,
    type: DataTypes.BIGINT
  },

  name:{
    allowNull: true,
    type: DataTypes.STRING
  },

  email:{
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },

  password:{
    allowNull: false,
    type: DataTypes.STRING,
  },

  createdAt:{
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }
}

class User extends Model {
  static associate(){

  }

  static config(sequelize){
    return{
      sequelize,
      tableName:USER_TABLE,
      modelName:'User',
      timestamps: false
    }
  }
}

module.exports = {
  USER_TABLE,
  UserSchema,
  User
}
