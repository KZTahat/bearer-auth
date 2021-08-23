"use strict";

const { start } = require("./src/server.js");
const { db } = require("./src/index.js");
require('dotenv').config();

db.sync()
  .then(() => {
    start(process.env.PORT);
  })
  .catch((err) => console.log(`Error creating database ${err}`));
