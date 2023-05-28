import { useState } from "react";
import "./App.css";

function App() {
  const [value, setState] = useState();

  return (
    <div>
      <a
        href="/test.html"
        onClick={(e) => {
          e.preventDefault();

          const Http = new XMLHttpRequest();

          const url = "/getfile";

          let temp = {};
          Http.open("GET", url);
          Http.send();
          Http.onreadystatechange = (e) => {
            console.log(Http.responseText.replace);
          };
        }}
      >
        파일확인하러 가기
      </a>
    </div>
  );
}

export default App;
