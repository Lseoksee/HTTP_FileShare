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
          <a href={e}>{e}</a>
        </td>
      </tr>
    );
  });

  return (
    <div id="filelist">
      <Table border={1} id="filetable">
        <tr>
          <td>이름</td>
        </tr>
        {list}
      </Table>
    </div>
  );
}

function App() {
  const [value, setState] = useState();
  let res;

  if (value) {
    res = <Filelist value={value}></Filelist>;
  } else {
    res = (
      <Mainpage
        btEV={async (e) => {
          e.preventDefault();

          const response1 = await fetch("/getfile");
          const result1 = await response1.json();

          setState(result1);
        }}
      ></Mainpage>
    );
  }

  return <div id="home">{res}</div>;
}

export default App;
