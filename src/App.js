import { useContext, useState } from "react";
import "./App.css";
import { Button, Table, Alert, Badge } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { webcon } from "./index";
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
  const [value, fileState] = useState({
    sharemode: "", //공유상태 (공유url)
    viewmode: "", //미리보기 상태 (파일이름)
    maxHeight: 100, //테이블 최대 크기
  });
  const viewtype = {
    icon: "", //확장자 아이콘
    isview: "", //미리보기 가능여부
    viewicon: "", //미리보기 선택 아이콘
    viewbt: null, //미리보기 버튼
    sharebt: null, //공유버튼
  };
  const list = [];
  const url = window.document.location.href;
  const context = useContext(webcon);

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

  params.value.forEach(async (e) => {
    viewtype.isview = false;
    if (Utils.isvideo(e.name)) {
      viewtype.icon = "video.png";
      viewtype.isview = true;
      if (e.name === value.viewmode) {
        viewtype.viewicon = viewtype.icon;
        viewtype.viewbt = (
          <video controls width={"100%"} id="video" autoPlay>
            <source src={"view" + reforder + e.name}></source>
          </video>
        );
      }
    } else if (Utils.isaudio(e.name)) {
      viewtype.icon = "music.png";
      viewtype.isview = true;
      if (e.name === value.viewmode) {
        viewtype.viewicon = viewtype.icon;
        viewtype.viewbt = (
          <audio controls id="audio" autoPlay>
            <source src={"view" + reforder + e.name}></source>
          </audio>
        );
      }
    } else if (Utils.isphoto(e.name)) {
      viewtype.icon = "img.png";
      viewtype.isview = true;
      if (e.name === value.viewmode) {
        viewtype.viewicon = viewtype.icon;
        viewtype.viewbt = (
          <img
            src={"view" + reforder + e.name}
            alt={e.name}
            width={"100%"}
            id="img"
          ></img>
        );
      }
    } else if (Utils.iszip(e.name)) {
      viewtype.icon = "zip.png";
    } else if (e.isdir) {
      viewtype.icon = "logo512.png";
    } else {
      viewtype.icon = "doc.png";
    }

    list.push(
      <tr>
        <td>
          <img
            src={`${process.env.PUBLIC_URL}/${viewtype.icon}`}
            alt={viewtype.icon}
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
                const cp = { ...value };

                try {
                  if (navigator.clipboard) {
                    //http 프로토콜로 인한 복사 오류
                    await navigator.clipboard.writeText(location);
                  }

                  if (location !== cp.sharemode) {
                    //복사
                    cp.sharemode = url + "download" + reforder + e.name;
                    cp.maxHeight = 80;
                    fileState(cp);
                  } else {
                    //취소
                    cp.sharemode = null;
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
              {url + "download" + reforder + e.name === value.sharemode &&
              navigator.clipboard
                ? "복사됨!"
                : "공유하기"}
            </Button>
            {viewtype.isview ? (
              // 미리보기 버튼
              <Button
                variant="outline-primary"
                onClick={(ex) => {
                  const cp = { ...value };

                  ex.preventDefault();
                  if (cp.viewmode !== e.name) {
                    //미리보기
                    cp.viewmode = e.name;
                    cp.maxHeight = 80;
                    fileState(cp);

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
                    if (!cp.sharemode) {
                      cp.maxHeight = 100;
                    }
                    fileState(cp);
                  }
                }}
              >
                {value.viewmode === e.name ? "보는중" : "미리보기"}
              </Button>
            ) : null}
          </td>
        ) : (
          <td></td>
        )}
      </tr>
    );
  });

  if (value.sharemode) {
    viewtype.sharebt = (
      <div>
        <Alert key="info" variant="primary" id="copyal">
          {value.sharemode}
        </Alert>
      </div>
    );
  }

  if (value.viewmode) {
    viewtype.viewbt = (
      <div id="view">
        {viewtype.viewbt}
        <Badge bg="info" pill id="viewbg">
          <img
            src={`${process.env.PUBLIC_URL}/${viewtype.viewicon}`}
            alt={viewtype.viewicon}
            width={"24px"}
            style={{ marginRight: "0.2em" }}
          ></img>
          {value.viewmode}
        </Badge>
      </div>
    );
  }

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
      {viewtype.sharebt}
      {viewtype.viewbt}
    </div>
  );
}

function App(params) {
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
