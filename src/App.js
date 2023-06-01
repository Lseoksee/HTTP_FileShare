import { useState } from "react";
import "./App.css";
import { Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Utils from "../src/Utils";

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
  const regex = /\.[^.\\/]*$/;
  const list = [];
  let icon;

  params.value.forEach((e) => {
    if (Utils.isvideo(e)) {
      icon = "video.png";
    } else if (Utils.isaudio(e)) {
      icon = "music.png";
    } else if (Utils.isphoto(e)) {
      icon = "img.png";
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
          onClick={() => {
            if (regex.test(e)) window.location.href = "download/" + e;
          }}
        >
          {regex.test(e) ? <a href={"download/" + e}>{e}</a> : <p>{e}</p>}
        </td>
        <td>
          <Button
            variant="outline-warning"
            onClick={async () => {
              try {
                let url = window.document.location.href;
                if (navigator.clipboard) {
                  //http 프로토콜로 인한 복사 오류
                  await navigator.clipboard.writeText(url + "download/" + e);
                  alert("주소를 복사했습니다!");
                } else {
                  alert(url + "download/" + e);
                }
                copyState(e);
              } catch (error) {
                console.log(error);
              }
            }}
          >
            {e === value ? "복사됨!" : "공유하기"}
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <div id="filelist">
      <div id="tablediv">
        <Table
          id="filetable"
          striped
          bordered
          hover
          size="sm"
          style={{ margin: "0", whiteSpace: "nowrap" }}
        >
          <colgroup>
            <col width="10%" />
            <col width="70%" />
            <col width="20%" />
          </colgroup>
          <thead>
            <tr>
              <th></th>
              <th>이름</th>
              <th>공유하기</th>
            </tr>
          </thead>
          <tbody>{list}</tbody>
        </Table>
      </div>
      <Button onClick={params.btEV}>갱신하기</Button>
    </div>
  );
}

function App() {
  const [value, setState] = useState();
  let res;

  const getfile = async (e) => {
    e.preventDefault();

    const response1 = await fetch("/getfile");
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
