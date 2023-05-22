  // MessageParser starter code in MessageParser.js
  import axios from "axios";
class MessageParser {
  constructor(actionProvider, createChatBotMessage) {
    this.actionProvider = actionProvider;
    this.createChatBotMessage = createChatBotMessage;
  }
      parse(message) {
         // 서버에 보낼 요청 메시지 생성
    const requestMessage = {
      type: "user",
      message: message,
    };
    console.log("User Message:", requestMessage.message);
        // 서버에 요청 보내기
        axios
          .post("/api/messages",requestMessage) // 서버의 엔드포인트 주소를 입력
          .then((response) => {
            const serverResponse = response.data;
      
            // 서버 응답 메시지를 챗봇 상태에 추가
            this.actionProvider.updateChatbotState(serverResponse);
          })
          .catch((error) => {
            console.error(error);
          });
        }
  
}
  export default MessageParser;