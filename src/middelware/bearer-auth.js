"use strict";

module.exports = (users) => (req, res, next) => {
  let Credintials = req.headers.authorization;
  if (!Credintials) {
    console.log("No authorization header found - jwt`");
    next("Invalid Login");
    return "Invalid Login";
  }

  // Bearer lksahdflkjhdsaflkhasdlkfhj
  let token = Credintials.split(" ").pop();
  users
    .authenticateBearer(token)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => next("Invalid Login"));
};
