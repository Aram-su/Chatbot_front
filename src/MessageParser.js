  // MessageParser starter code in MessageParser.js
class MessageParser {
    constructor(actionProvider) {
      this.actionProvider = actionProvider;
    }
  
    parse(message) {
      const lowerCaseMessage = message.toLowerCase();
  
      if (lowerCaseMessage.includes("안녕")) {
        this.actionProvider.greet();
      }
  //학교식당
      if (lowerCaseMessage.includes("학식") || lowerCaseMessage.includes("점심") || lowerCaseMessage.includes("식당")) {
        this.actionProvider.handleRestaurantList();
      }
//공지사항
      if (lowerCaseMessage.includes("공지사항") || lowerCaseMessage.includes("공지") || lowerCaseMessage.includes("알림")) {
        this.actionProvider.handleAnnouncementList();
      }
//도서관
      if (lowerCaseMessage.includes("도서관") || lowerCaseMessage.includes("열람실") || lowerCaseMessage.includes("중앙도서관")) {
        this.actionProvider.handleLibraryList();
      }
//학사일정
      if (lowerCaseMessage.includes("학사일정") || lowerCaseMessage.includes("일정") || lowerCaseMessage.includes("계획")) {
        this.actionProvider.handlePlanList();
      }
//연락처
      if (lowerCaseMessage.includes("연락처") || lowerCaseMessage.includes("전화번호") || lowerCaseMessage.includes("전번")) {
        this.actionProvider.handleContactList();
      }
    }
  }
  
  export default MessageParser;