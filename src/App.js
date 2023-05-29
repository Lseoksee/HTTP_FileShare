import { useState } from "react";
import "./App.css";
import { Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

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
  const list = [];
  params.value.forEach((e) => {
    list.push(
      <tr>
        <td>
          <a href={"download/" + e}>{e}</a>
        </td>
        <td>
          <Button
            variant="outline-warning"
            onClick={async () => {
              try {
                let url = window.document.location.href;
                await navigator.clipboard.writeText(url + "download/" + e);
                alert("주소를 복사했습니다!");
              } catch (error) {
                console.log(error);
              }
            }}
          >
            주소복사
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
            <col width="80%" />
            <col width="20%" />
          </colgroup>
          <thead>
            <tr>
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
