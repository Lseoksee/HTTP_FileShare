import React, { useContext, useState } from "react";
import "./App.css";
import { Button, Table, Alert, Badge, Toast } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { webcon } from "./index";
import Utils from "../src/Utils";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { vs } from "react-syntax-highlighter/dist/esm/styles/hljs";

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
      {params.err ? (
        <Alert
          key="danger"
          variant="danger"
          style={{ marginTop: "var(--bs-alert-margin-bottom)" }}
        >
          폴더가 존재하지 않는거 같습니다!
        </Alert>
      ) : null}
    </div>
  );
}

function Filelist(params) {
  const [value, fileState] = useState({
    sharemode: null, //공유창
    viewmode: null, //미리보기창
    viewckname: "", //미리보기 클릭 이름
    copyckname: "", //복사 클릭 이름
    maxHeight: 100, //테이블 최대 크기
  });
  const viewtype = {
    icon: "", //확장자 아이콘
    isview: "", //미리보기 가능여부
    viewicon: "", //미리보기 선택 아이콘
    sizeshort: { size: 0.0, type: "" }, //파일크기
  };
  const list = [];
  const url = window.document.location.href;
  const context = useContext(webcon);

  const whatview = async (cp, name) => {
    const type = Utils.Filetype(name);
    let temp;

    if (type.type === "video") {
      viewtype.viewicon = "video.png";
      temp = (
        <video controls width={"100%"} id="video" autoPlay>
          <source src={encodeURI("view" + reforder + name)}></source>
        </video>
      );
    } else if (type.type === "audio") {
      viewtype.viewicon = "music.png";
      temp = (
        <audio controls id="audio" autoPlay>
          <source src={encodeURI("view" + reforder + name)}></source>
        </audio>
      );
    } else if (type.type === "photo") {
      viewtype.viewicon = "img.png";
      temp = (
        <img
          src={encodeURI("view" + reforder + name)}
          alt={name}
          width={"100%"}
          id="img"
        ></img>
      );
    } else if (type.type === "txt") {
      viewtype.viewicon = "doc.png";

      const response = await fetch(encodeURI("view" + reforder + name));
      const text = await response.text();
      const lankey = new Map([
        [".js", "javascript"],
        [".html", "htmlbars"],
        [".css", "css"],
        [".json", "json"],
      ]);
      const lan = lankey.get(type.extension) || "plaintext";

      temp = (
        <Toast
          onClose={() => {
            const cp = { ...value };

            cp.viewmode = null;
            cp.viewckname = null;
            if (!cp.sharemode) {
              cp.maxHeight = 100;
            }
            fileState(cp);
          }}
          id="txtoast"
        >
          <Toast.Header>
            <img
              src={`${process.env.PUBLIC_URL}/${viewtype.viewicon}`}
              alt={viewtype.viewicon}
              width={"16px"}
            />
            <strong className="me-auto">{name}</strong>
          </Toast.Header>
          <Toast.Body id="txtoast_body">
            <SyntaxHighlighter language={lan} style={vs} customStyle={{padding: "0"}} >
              {text}
            </SyntaxHighlighter>
          </Toast.Body>
        </Toast>
      );
    }

    cp.viewmode = (
      <div id="view">
        {temp}
        <Badge bg="info" pill id="viewbg">
          <img
            src={`${process.env.PUBLIC_URL}/${viewtype.viewicon}`}
            alt={viewtype.viewicon}
            width={"24px"}
            style={{ marginRight: "0.2em" }}
          ></img>
          {name}
        </Badge>
      </div>
    );

    fileState(cp);
  };

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
        <td></td>
      </tr>
    );
  }

  params.value.forEach((e) => {
    const type = Utils.Filetype(e.name);
    viewtype.isview = false;

    if (type.type === "video") {
      viewtype.icon = "video.png";
      viewtype.isview = true;
    } else if (type.type === "audio") {
      viewtype.icon = "music.png";
      viewtype.isview = true;
    } else if (type.type === "photo") {
      viewtype.icon = "img.png";
      viewtype.isview = true;
    } else if (type.type === "txt") {
      viewtype.isview = true;
      viewtype.icon = "doc.png";
    } else if (type.type === "zip") {
      viewtype.icon = "zip.png";
    } else if (e.isdir) {
      viewtype.icon = "logo512.png";
    } else {
      viewtype.isview = true;
    }

    if (e.size) viewtype.sizeshort = Utils.mapsize(e.size);

    list.push(
      <tr>
        {/* 파일 유형 */}
        <td>
          <img
            src={`${process.env.PUBLIC_URL}/${viewtype.icon}`}
            alt={viewtype.icon}
            width={"32px"}
          ></img>
        </td>

        {/* 이름 */}
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

        {/* 용량 */}
        {e.size ? (
          <td>
            {viewtype.sizeshort.size.toFixed(2)} {viewtype.sizeshort.type}
          </td>
        ) : (
          <td></td>
        )}

        {/* 공유하기 */}
        {!e.isdir ? (
          //복사버튼
          <td>
            <Button
              variant="outline-warning"
              id={e.name}
              onClick={async (ex) => {
                const location = encodeURI(
                  url + "download" + reforder + e.name
                );
                const cp = { ...value };

                try {
                  if (navigator.clipboard) {
                    //http 프로토콜로 인한 복사 오류
                    await navigator.clipboard.writeText(location);
                  }

                  if (e.name !== cp.copyckname) {
                    //복사
                    cp.sharemode = (
                      <div>
                        <Alert key="info" variant="primary" id="copyal">
                          {location}
                        </Alert>
                      </div>
                    );
                    cp.maxHeight = 80;
                    cp.copyckname = ex.target.id;
                    fileState(cp);
                  } else {
                    //취소
                    cp.sharemode = null;
                    cp.copyckname = null;
                    if (!cp.viewmode) {
                      cp.maxHeight = 100;
                    }
                    fileState(cp);
                  }
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              {e.name === value.copyckname && navigator.clipboard
                ? "복사됨!"
                : "공유하기"}
            </Button>
            {viewtype.isview ? (
              // 미리보기 버튼
              <Button
                variant="outline-primary"
                id={e.name}
                onClick={(ex) => {
                  const cp = { ...value };

                  ex.preventDefault();
                  if (ex.target.id !== cp.viewckname) {
                    //미리보기
                    cp.viewmode = e.name;
                    cp.maxHeight = 80;
                    cp.viewckname = ex.target.id;
                    whatview(cp, e.name);

                    const video = document.getElementById("video");
                    const audio = document.getElementById("audio");

                    if (audio) {
                      audio.load();
                    } else if (video) {
                      video.load();
                    }
                  } else {
                    //취소
                    cp.viewmode = null;
                    cp.viewckname = null;
                    if (!cp.sharemode) {
                      cp.maxHeight = 100;
                    }
                    fileState(cp);
                  }
                }}
              >
                {value.viewckname === e.name ? "보는중" : "미리보기"}
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
    <div id="filelist" style={{ width: context.viewsize }}>
      <div id="tablediv" style={{ maxHeight: `${value.maxHeight}%` }}>
        <Table
          id="filetable"
          striped
          bordered
          hover
          size="sm"
          style={{ margin: "0" }}
        >
          <colgroup>
            <col width="5%" />
            <col width="65%" />
            <col width="10%" />
            <col width="20%" />
          </colgroup>
          <thead style={{ whiteSpace: "nowrap" }}>
            <tr>
              <th>파일 유형</th>
              <th>이름</th>
              <th>크기</th>
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

            fileState({ maxHeight: 100 });
            //갱신 버튼
          }}
        >
          갱신하기
        </Button>
      </div>
      {value.sharemode}
      {value.viewmode}
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

    if (response1.ok) {
      const result1 = await response1.json();
      setState(result1);
    } else {
      setState("err");
    }
  };

  if (value === "err") {
    res = <Mainpage btEV={getfile} err={true}></Mainpage>;
  } else if (!value) {
    res = <Mainpage btEV={getfile}></Mainpage>;
  } else {
    res = <Filelist value={value} btEV={getfile}></Filelist>;
  }

  return <div id="home">{res}</div>;
}

export default App;
