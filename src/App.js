// 실행되는 메인 코드

import React,{ useState, useEffect }  from "react";
import Chatbot from "react-chatbot-kit";
import "./App.css";
import axios from "axios";

import config from "./config";
import ActionProvider from "./ActionProvider";
import MessageParser from "./MessageParser";

function App() {
  const [user, setUser] = useState("");
  useEffect(() => {
    axios.post("/api/users").then((response) => {
      if (response.data) {
        // console.log(response.data);
        setUser(response.data);
      } else {
        alert("failed to ");
      }
    });
  }, []);
  
  return (
    <div className="App">
      <header className="App-header">
      <Chatbot
          config={config}
          actionProvider={ActionProvider}
          messageParser={MessageParser}
        />
        {user}
      </header>
    </div>
  );
}

export default App;
