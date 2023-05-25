
// MessageParser starter code in MessageParser.js
import axios from "axios";

class MessageParser {
  constructor(actionProvider, createChatBotMessage) {
    this.actionProvider = actionProvider;
    this.createChatBotMessage = createChatBotMessage;
  }
      parse(message) {
      
        // 사용자가 입력한 메시지를 서버로 보내는 요청을 생성
        const requestMessage = {
          type: "user",
          message: message,
        };
      
        // 서버에 요청 보내기
        axios
          .post("/api/messages", requestMessage)
          .then((response) => {
            const serverResponse = response;
            this.actionProvider.handleServerResponse(serverResponse);
          })
          .catch((error) => {
            console.error(error);
          });
      }
}
  export default MessageParser;
  


  