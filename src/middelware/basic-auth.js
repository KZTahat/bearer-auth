"use strict";

const base64 = require("base-64");

module.exports = (users) => (req, res, next) => {
  const Credintials = req.headers.authorization;
  if (!Credintials) {
    next("Invalid Login");
    return;
  }
  //basic kvnpoeibviorhf
  const encodedCredintials = Credintials.split(" ").pop();
  const decodedCredintials = base64.decode(encodedCredintials);
  const [username, password] = decodedCredintials.split(":");

  users
    .authenticateBasic(username, password)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log("Invalid Login"));
};
