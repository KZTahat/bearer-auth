"use strict";

const express = require("express");
const app = express();
app.use(express.json());
const { Users } = require("./index.js");
const basicAuth = require("./middelware/basic-auth.js");
const bearerAuth = require("./middelware/bearer-auth.js");

app.post("/signup", async (req, res) => {
  let userInfo = req.body;
  let username = req.body.username;
  console.log("OVER HERE", req.body.username);
  let data = await Users.findOne({ where: { username } });
  if (!data) {
    Users.create(userInfo)
      .then((user) => res.status(201).send(user))
      .catch((err) => res.status(400).send(err));
  } else {
    res.status(400).send("username already exists");
  }
});

app.post("/signin", basicAuth(Users), (req, res) => {
  // the user will have the user info and the token
  res.status(200).send(req.user);
});

app.get("/user", bearerAuth(Users), (req, res) => {
  res.status(200).send(req.user);
});

function start(port) {
  app.listen(port, () => console.log(`Server Is Listining On Port ${port}`));
}

module.exports = {
  start,
};
