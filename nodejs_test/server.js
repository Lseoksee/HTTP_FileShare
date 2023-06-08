const express = require("express");
const server = express();
const fs = require("fs");
const setting = JSON.parse(fs.readFileSync(__dirname + "/server.json"));

server.use(express.static(__dirname + "/../build"));

server.get("/", (req, res) => {
  res.sendFile(__dirname + "/../build/index.html");
});

server.get("/getfile", (req, res) => {
  const dir = __dirname + setting.dir;

  const files = fs.readdirSync(dir, { withFileTypes: true }).map((file) => {
    if (file.isDirectory()) {
      return { name: file.name, isdir: true };
    } else {
      return { name: file.name, isdir: false };
    }
  });
  res.send(files);
});

server.get("/getfile/*", (req, res) => {
  const dir = __dirname + setting.dir + "/" + req.params[0];

  const files = fs.readdirSync(dir, { withFileTypes: true }).map((file) => {
    if (file.isDirectory()) {
      return { name: file.name, isdir: true };
    } else {
      return { name: file.name, isdir: false };
    }
  });
  res.send(files);
});

server.get("/download/*", (req, res) => {
  const dir = __dirname + setting.dir + "/" + req.params[0];

  console.log(`${req.ip}가 다운로드함`);
  res.download(dir);
});

server.listen(setting.port, (err) => {
  if (err) return console.log(err);
  console.log(`서버가 ${setting.port}번 포트로 열림`);
});
