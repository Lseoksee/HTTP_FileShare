import { useState } from "react";
import "./App.css";
import { Button, Table, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Utils from "../src/Utils";

let reforder = "/"; //폴더 경로 저장

function Mainpage(params) {
  return (
    <div id="maindiv">
      <h1 id="title">친구들과 빠르게 파일을 공유해보세요!</h1>
      <Button id="checkbt" onClick={params.btEV}>
        파일 확인하러가기
      </Button>
    </div>
  );
}

function Filelist(params) {
  const [value, copyState] = useState();
  const list = [];
  let copywindow;
  let url = window.document.location.href;
  let icon;

  if (reforder !== "/") {
    //이전 버튼
    list.push(
      <tr
        onClick={(e) => {
          reforder = reforder.replace(/\/([^/]+)\/$/, "/");
          params.btEV(e, reforder);
          copyState();
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

  params.value.forEach((e) => {
    if (Utils.isvideo(e.name)) {
      icon = "video.png";
    } else if (Utils.isaudio(e.name)) {
      icon = "music.png";
    } else if (Utils.isphoto(e.name)) {
      icon = "img.png";
    } else if (e.isdir) {
      icon = "logo512.png";
    } else {
      icon = "doc.png";
    }

    list.push(
      <tr>
        <td>
          <img
            src={`${process.env.PUBLIC_URL}/${icon}`}
            alt={icon}
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
              copyState();
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
                try {
                  if (navigator.clipboard) {
                    //http 프로토콜로 인한 복사 오류
                    await navigator.clipboard.writeText(
                      url + "download" + reforder + e.name
                    );
                  }
                  copyState(url + "download" + reforder + e.name);
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              {url + "download" + reforder + e.name === value &&
              navigator.clipboard
                ? "복사됨!"
                : "공유하기"}
            </Button>
          </td>
        ) : (
          <td></td>
        )}
      </tr>
    );

    if (value) {
      copywindow = (
        <div>
          <Alert key="info" variant="primary" id="copyal">
            {value}
          </Alert>
        </div>
      );
    }
  });

  return (
    <div id="filelist">
      <div id="tablediv" style={{ maxHeight: value ? "85%" : "100%" }}>
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
            copyState();
            //갱신 버튼
          }}
        >
          갱신하기
        </Button>
      </div>
      {copywindow}
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
