"use strict";

const { Sequelize, DataTypes } = require("sequelize");
const userShcema = require("./userShcema.js");
require("dotenv").config();
const POSTGRES_URI = process.env.POSTGRES_URI;

const sequelize = new Sequelize(POSTGRES_URI, {});
const Users = userShcema(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  Users,
};
