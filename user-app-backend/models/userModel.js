const { DataTypes } = require("sequelize");

const sequelize = require("../config/db");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: false,
  },
  firstName: {
    type: DataTypes.STRING(100)
  },
  lastName: {
    type: DataTypes.STRING(100),
  },
  maidenName: {
    type: DataTypes.STRING(100),
  },
  age: {
    type: DataTypes.INTEGER,
  },
  gender: {
    type: DataTypes.STRING(20),
  },
  email: {
    type: DataTypes.STRING(150),
    unique: true,
  },
  phone: {
    type: DataTypes.STRING(50),
  },
  birthDate: {
    type: DataTypes.DATEONLY,
  },
  height: {
    type: DataTypes.DECIMAL(5, 2),
  },
  weight: {
    type: DataTypes.DECIMAL(5, 2),
  },
  city: {
    type: DataTypes.STRING(100),
  },
  state: {
    type: DataTypes.STRING(100),
  },
  stateCode: {
    type: DataTypes.STRING(20),
  },
  postalCode: {
    type: DataTypes.STRING(20),
  },
  country: {
    type: DataTypes.STRING(100),
  },
  companyDepartment: {
    type: DataTypes.STRING(100),
  },
  companyName: {
    type: DataTypes.STRING(255),
  },
  companyTitle: {
    type: DataTypes.STRING(100),
  },
  companyCity: {
    type: DataTypes.STRING(100),
  },
  companyState: {
    type: DataTypes.STRING(100),
  },
  companyStateCode: {
    type: DataTypes.STRING(20),
  },
  companyPostalCode: {
    type: DataTypes.STRING(20),
  },
  companyCountry: {
    type: DataTypes.STRING(100),
  },
  role: {
    type: DataTypes.STRING(50),
  },
},
  {
    tableName: "users",
    underscored: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = User;