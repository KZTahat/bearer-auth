"use strict";

// when testing a database we have two choices :
// 1 - create actual testing database and then drop datatabase after all tests are done
// 2 - to create in memory database - sqlite3 database file in memory

const { Sequelize, DataTypes } = require("sequelize");
const userShcema = require("../src/userShcema.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
let POSTGRES_URI_TEST =
  process.env.POSTGRES_URI_TEST ||
  "postgres://postgres:0000@localhost:5432/testbearer";
const sequelize = new Sequelize(POSTGRES_URI_TEST, {});

const Users = userShcema(sequelize, DataTypes);

beforeAll(async () => {
  await sequelize.sync();
});
afterAll(async () => {
  await sequelize.drop();
});

describe("Bearer Auth", () => {
  let userInfo = {
    username: "test",
    password: "12345",
  };
  test("it should create a user with a hashed password", async () => {
    //arrange
    //already arranged above
    //act
    let user = await Users.create(userInfo);
    let isValied = await bcrypt.compare(userInfo.password, user.password);
    //assert
    expect(user.id).toBeTruthy();
    expect(isValied).toBeTruthy();
  });
  test("should attach a token on find", async () => {
    //act
    let user = await Users.findOne({ where: { username: userInfo.username } });
    let decodedToken = jwt.decode(user.token);
    //assert
    expect(user.token).toBeTruthy();
    expect(decodedToken.username).toEqual(userInfo.username);
    expect(user.username).toEqual(userInfo.username);
  });
});
