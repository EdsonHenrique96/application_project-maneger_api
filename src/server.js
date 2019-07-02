const express = require("express");
const route = require("./routes");

const server = express();

let requestCount = 0;

server.use(express.json());
server.use((req, res, next) => {
  requestCount++;
  console.log(`Number for access ${requestCount}`);

  return next();
});

server.use(route);

server.listen(3000);
