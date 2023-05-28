const express = require("express");
const server = express();
const fs = require("fs");

server.use(express.static(__dirname + "/../build"));

server.get("/", (req, res) => {
  res.sendFile(__dirname + "/../build/static/js/main.8ee7bd76.js");
});

server.get("/getfile", (req, res) => {
  fs.readdir(__dirname, (err, files) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.send(files);
    }
  });
});

server.get("/*", (req, res, next) => {
  res.download(__dirname+"\\"+req.params[0]);
});

server.listen(80, (err) => {
  if (err) return console.log(err);
  console.log("The server is listening on port 80");
});
