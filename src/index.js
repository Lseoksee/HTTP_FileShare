import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
export const webcon = React.createContext();
let viewsize;

if (
  //모바일 여부 확인
  /Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  viewsize = "90%";
} else {
  viewsize = "70%";
}

root.render(
  <React.StrictMode>
    <webcon.Provider value={{ viewsize: viewsize }}>
      <App />
    </webcon.Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
