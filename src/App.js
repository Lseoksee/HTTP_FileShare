import { useState } from "react";
import "./App.css";
import { Button, Table, Alert, Badge } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Utils from "../src/Utils";

let reforder = "/"; //폴더 경로 저장

function Mainpage(params) {
  return (
    <div id="maindiv">
      <img
        src={`${process.env.PUBLIC_URL}/logo512.png`}
        alt={"logo.png"}
        width={"128px"}
      ></img>
      <h1 id="title">친구들과 빠르게 파일을 공유해보세요!</h1>
      <Button id="checkbt" onClick={params.btEV}>
        파일 확인하러가기
      </Button>
    </div>
  );
}

function Filelist(params) {
  const [value, fileState] = useState({ copy: null, file: null });
  const type = { icon: null, bt: null, maxHeight: 100, viewicon: null };
  const list = [];
  const url = window.document.location.href;
  let copyal;

  if (reforder !== "/") {
    //이전 버튼
    list.push(
      <tr
        onClick={(e) => {
          reforder = reforder.replace(/\/([^/]+)\/$/, "/");
          params.btEV(e, reforder);
          fileState({});
        }}
      >
        <td>
          <img
            src={`${process.env.PUBLIC_URL}/enter.png`}
            alt={"enter.png"}
            width={"32px"}
          ></img>
        </td>
        <td>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
            }}
            style={{ color: "black" }}
          >
            이전으로
          </a>
        </td>
        <td></td>
      </tr>
    );
  }

  if (value.copy) {
    type.maxHeight = 80;
    copyal = (
      <div>
        <Alert key="info" variant="primary" id="copyal">
          {value.copy}
        </Alert>
      </div>
    );
  }

  params.value.forEach(async (e) => {
    if (Utils.isvideo(e.name)) {
      type.icon = "video.png";
      if (e.name === value.file) {
        type.maxHeight = 80;
        type.viewicon = type.icon;
        type.bt = (
          <video controls width={"100%"} id="video" autoPlay>
            <source src={"view" + reforder + e.name}></source>
          </video>
        );
      }
    } else if (Utils.isaudio(e.name)) {
      type.icon = "music.png";
      if (e.name === value.file) {
        type.maxHeight = 80;
        type.viewicon = type.icon;
        type.bt = (
          <audio controls id="audio" autoPlay>
            <source src={"view" + reforder + e.name}></source>
          </audio>
        );
      }
    } else if (Utils.isphoto(e.name)) {
      type.icon = "img.png";
      if (e.name === value.file) {
        type.maxHeight = 80;
        type.viewicon = type.icon;
        type.bt = (
          <img
            src={"view" + reforder + e.name}
            alt={e.name}
            width={"100%"}
            id="img"
          ></img>
        );
      }
    } else if (e.isdir) {
      type.icon = "logo512.png";
    } else {
      type.icon = "doc.png";
    }

    list.push(
      <tr>
        <td>
          <img
            src={`${process.env.PUBLIC_URL}/${type.icon}`}
            alt={type.icon}
            width={"32px"}
          ></img>
        </td>
        <td
          onClick={(ex) => {
            if (!e.isdir) {
              window.location.href = "download" + reforder + e.name;
              //파일일때 표시
            } else {
              reforder += e.name + "/";
              params.btEV(ex, reforder);
              fileState({});
              //폴더일때 표시
            }
          }}
          style={{ fontSize: "18px" }}
        >
          {!e.isdir ? (
            <a href={"download" + reforder + e.name}>{e.name}</a>
          ) : (
            <a
              href={reforder + e.name}
              onClick={(ex) => {
                ex.preventDefault();
              }}
            >
              {e.name}
            </a>
          )}
        </td>
        {!e.isdir ? (
          //복사버튼
          <td>
            <Button
              variant="outline-warning"
              onClick={async () => {
                const location = url + "download" + reforder + e.name;

                try {
                  if (navigator.clipboard) {
                    //http 프로토콜로 인한 복사 오류
                    await navigator.clipboard.writeText(location);
                  }
                  if (location !== value.copy) {
                    fileState({
                      copy: url + "download" + reforder + e.name,
                      file: value.file,
                    });
                  } else {
                    fileState({
                      copy: null,
                      file: value.file,
                    });
                  }
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              {url + "download" + reforder + e.name === value.copy &&
              navigator.clipboard
                ? "복사됨!"
                : "공유하기"}
            </Button>
            {type.icon !== "doc.png" ? (
              <Button
                variant="outline-primary"
                onClick={(ex) => {
                  ex.preventDefault();
                  if (value.file !== e.name) {
                    fileState({
                      copy: value.copy,
                      file: e.name,
                    });

                    const video = document.getElementById("video");
                    const audio = document.getElementById("audio");

                    if (audio) {
                      audio.load();
                    } else if (video) {
                      video.load();
                    }
                  } else {
                    fileState({
                      copy: value.copy,
                      file: null,
                    });
                  }
                }}
              >
                {value.file === e.name ? "보는중" : "미리보기"}
              </Button>
            ) : null}
          </td>
        ) : (
          <td></td>
        )}
      </tr>
    );
  });

  return (
    <div id="filelist">
      <div id="tablediv" style={{ maxHeight: `${type.maxHeight}%` }}>
        <Table
          id="filetable"
          striped
          bordered
          hover
          size="sm"
          style={{ margin: "0" }}
        >
          <colgroup>
            <col width="10%" />
            <col width="70%" />
            <col width="20%" />
          </colgroup>
          <thead style={{ whiteSpace: "nowrap" }}>
            <tr>
              <th>파일 유형</th>
              <th>이름</th>
              <th>공유하기</th>
            </tr>
          </thead>
          <tbody>{list}</tbody>
        </Table>
      </div>
      <div id="refdiv">
        <Button
          onClick={(e) => {
            reforder = "/";
            params.btEV(e);
            fileState({});
            //갱신 버튼
          }}
        >
          갱신하기
        </Button>
      </div>
      {copyal}
      {type.bt ? (
        <div id="view">
          {type.bt}
          <Badge bg="info" pill id="viewbg">
            <img
              src={`${process.env.PUBLIC_URL}/${type.viewicon}`}
              alt={type.viewicon}
              width={"24px"}
              style={{ marginRight: "0.2em" }}
            ></img>
            {value.file}
          </Badge>
        </div>
      ) : null}
    </div>
  );
}

function App() {
  const [value, setState] = useState();
  let res;

  const getfile = async (e, link) => {
    let response1;

    if (link) {
      response1 = await fetch("/getfile" + link);
    } else {
      response1 = await fetch("/getfile");
    }

    const result1 = await response1.json();

    setState(result1);
  };

  if (value) {
    res = <Filelist value={value} btEV={getfile}></Filelist>;
  } else {
    res = <Mainpage btEV={getfile}></Mainpage>;
  }

  return <div id="home">{res}</div>;
}

export default App;
