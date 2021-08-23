"use strict";

require("dotenv").config();
const SECRET = process.env.SECRET;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const users = (sequelize, DataTypes) => {
  const model = sequelize.define("users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.VIRTUAL,
      get() {
        return jwt.sign(
          { username: this.username, test: "this is a test payload" },
          SECRET
        );
      },
      set(tokenObj) {
        return jwt.sign(tokenObj, SECRET);
      },
    },
  });
  model.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
  });

  model.authenticateBasic = async function (username, password) {
    let user = await this.findOne({ where: { username } });
    let isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
      return user;
    }

    return "Invalid user/password";
  };

  model.authenticateBearer = async function (token) {
    let verifiedToken = jwt.verify(token, SECRET);
    let user = await this.findOne({
      where: { username: verifiedToken.username },
    });
    if (user) {
      return user;
    }
    return "Invalid User";
  };
  
  return model;
};

module.exports = users;
