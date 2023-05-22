import React, { useState, useEffect } from "react";
import Chatbot from "react-chatbot-kit";
import "./App.css";
import axios from "axios";

import config from "./config";
import ActionProvider from "./ActionProvider";
import MessageParser from "./MessageParser";

function App() {
  const [user] = useState("");

  const handleUserMessage = (message) => {
    // 사용자 메시지를 서버로 보내고 결과를 가져오는 함수
    axios
      .post("/api/messages", { message })
      .then((response) => {
        const result = response.data.result;
        // 결과 처리를 수행하고 챗봇에게 전달
        ActionProvider.handleServerResponse(result);
      })
      .catch((error) => {
        alert("서버와의 통신에 실패했습니다.");
        console.error(error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <Chatbot
          config={config}
          actionProvider={ActionProvider}
          messageParser={MessageParser}
          handleUserMessage={handleUserMessage} // 사용자 메시지 핸들러 추가
        />
        {user}
      </header>
    </div>
  );
}

export default App;
