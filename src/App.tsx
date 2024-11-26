import React from "react";
import "./App.css";
import { Button, useMessage } from "./lib/index";

function App() {
  const { showMessage } = useMessage();
  return (
    <div className="App">
      <Button
        bgColor="#df4873"
        color="#fff"
        compact={true}
        rounded={false}
        onClick={() => {
          showMessage({ title: "a", message: "a" });
        }}
      >
        로그아웃
      </Button>
    </div>
  );
}

export default App;
