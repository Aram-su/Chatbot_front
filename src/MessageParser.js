  // MessageParser starter code in MessageParser.js
  import axios from "axios";

  class MessageParser {
    constructor(actionProvider, createChatBotMessage) {
      this.actionProvider = actionProvider;
      this.createChatBotMessage = createChatBotMessage;
    }
  
    parse(message) {
      const requestMessage = {
        type: "user",
        message: message,
      };
  
      console.log("User Message:", requestMessage.message);
  
      axios
        .post("/api/messages", requestMessage)
        .then((response) => {
          const serverResponse = response.data;
          console.log(serverResponse)
  
          // Check if the response contains contact information
          if (serverResponse.code && serverResponse.code.match(/^02/)) {
            const contact = {
              name: serverResponse.name,
              department: serverResponse.department,
              phone: serverResponse.phone,
              email: serverResponse.email,
            };
  
            const message = this.createContactMessage(contact);
  
            this.actionProvider.updateChatbotState(message);
          } else {
            const message = this.createChatBotMessage(serverResponse);
  
            this.actionProvider.updateChatbotState(message);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  
    createContactMessage(contact) {
      const message = this.createChatBotMessage(
        <>
          <p>경기대학교의 연락처를 알려드릴게요🙂</p>
          {contact ? (
            <>
              <p>{contact.department} 소속 {contact.name} 교수님</p>
              <p>전화번호: {contact.phone}</p>
              <p>이메일: {contact.email}</p>
            </>
          ) : (
            <p>해당 교수님의 연락처 정보를 찾을 수 없습니다.</p>
          )}
        </>
      );
  
      return message;
    }
  }
  
  export default MessageParser;
  