import { useState } from "react";
import "./App.css";

function App() {
  const [value, setState] = useState();
  const res = [];

  if (value) {
    value.forEach((e) => {
      console.log(e);
      res.push(
        <a href={e}>
          {e}
          <br></br>
        </a>
      );
    });
  } else {
    res.push(
      <a
        href="/test.html"
        onClick={async (e) => {
          e.preventDefault();

          const response1 = await fetch("/getfile");
          const result1 = await response1.json();

          setState(result1);
        }}
      >
        파일확인하러 가기
      </a>
    );
  }

  return <div>{res}</div>;
}

export default App;
