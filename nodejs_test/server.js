const express = require("express");
const server = express();
const fs = require("fs");
const setting = JSON.parse(fs.readFileSync(__dirname + "\\server.json"));
const regex = /\.[^.\\/]*$/; //폴더 구분 정규식

server.use(express.static(__dirname + "/../build"));

server.get("/", (req, res) => {
  res.sendFile(__dirname + "/../build/index.html");
});

server.get("/getfile", (req, res) => {
  const dir = __dirname+setting.dir;

  fs.readdir(dir, (err, files) => {
    if (err) {
      console.error(err);
      res.status(500).send("요청오류");
    } else {
      files.sort((a, b) => {
        if (regex.test(a)) {
          return 1;
        } else {
          return -1;
        }
      });
      res.send(files);
    }
  });
});

server.get("/getfile/*", (req, res) => {
  const dir = __dirname+"/"+setting.dir+req.params[0];

  fs.readdir(dir, (err, files) => {
    if (err) {
      console.error(err);
      res.status(500).send("요청오류");
    } else {
      files.sort((a) => {
        if (regex.test(a)) {
          return 1;
        } else {
          return -1;
        }
      });
      res.send(files);
    }
  });
});

server.get("/download/*", (req, res) => {
  console.log(`${req.ip}가 다운로드함`);
  res.download(__dirname + "\\" + req.params[0]);
});

server.listen(setting.port, (err) => {
  if (err) return console.log(err);
  console.log(`서버가 ${setting.port}번 포트로 열림`);
});
