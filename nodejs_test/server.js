const express = require("express");
const server = express();
const fs = require("fs");
const regex = /\.[^.\\/]*$/;  //폴더 구분 정규식

server.use(express.static(__dirname + "/../build"));

server.get("/", (req, res) => {
  res.sendFile(__dirname + "/../build/index.html");
});

server.get("/getfile", (req, res) => {
  fs.readdir(__dirname, (err, files) => {
    if (err) {
      console.error(err);
      res.status(500).send("요청오류");
    } else {
      files.sort((a,b) => {
        if (regex.test(a)) {
          return 1;
        } else {
          return -1;
        }
      })
      res.send(files);
    }
  });
});

server.get("/getfile/*", (req, res) => {
  fs.readdir(__dirname+"/"+req.params[0], (err, files) => {
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
      })
      res.send(files);
    }
  });
});

server.get("/download/*", (req, res) => {
  console.log(`${req.ip}가 다운로드함`);
  res.download(__dirname+"\\"+req.params[0]);
});

server.listen(80, (err) => {
  if (err) return console.log(err);
  console.log("서버가 80번 포트로 열림");
});