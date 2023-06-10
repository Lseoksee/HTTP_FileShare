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
  const file = [];
  const forder = [];

  fs.readdirSync(dir, { withFileTypes: true }).forEach((e) => {
    if (e.isDirectory()) {
      forder.push({ name: e.name, isdir: true });
    } else {
      file.push({ name: e.name, isdir: false });
    }
  });

  res.send([...forder, ...file]);
});

server.get("/getfile/*", (req, res) => {
  const dir = __dirname + setting.dir + "/" + req.params[0];
  const file = [];
  const forder = [];

  fs.readdirSync(dir, { withFileTypes: true }).forEach((e) => {
    if (e.isDirectory()) {
      forder.push({ name: e.name, isdir: true });
    } else {
      file.push({ name: e.name, isdir: false });
    }
  });

  res.send([...forder, ...file]);
});

server.get("/download/*", (req, res) => {
  const dir = setting.dir + "/" + req.params[0];
  res.download(__dirname+dir);
  console.log(`${req.ip}가 ${dir} 파일을 다운로드함`);
});

server.get("/view/*", (req, res) => {
  const dir = setting.dir + "/" + req.params[0];
  res.sendFile(__dirname+dir);
  console.log(`${req.ip}가 ${dir} 파일을 스트리밍 중`);
});

server.listen(setting.port, (err) => {
  if (err) return console.log(err);
  console.log(`서버가 ${setting.port}번 포트로 열림`);
});
