import { useState } from "react";
import "./App.css";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Mainpage(params) {
  return (
    <div className="maindiv">
      <h1 className="title">친구들과 빠르게 파일을 공유해보세요!</h1>
      <Button className="checkbt" onClick={params.btEV}>
        파일 확인하러가기
      </Button>
    </div>
  );
}

function Filelist(params) {
  const list = [];
  params.value.forEach((e) => {
    list.push(
      <a href={e}>
        {e}
        <br></br>
      </a>
    );
  });

  return <div>{list}</div>;
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

  return <div>{res}</div>;
}

export default App;
