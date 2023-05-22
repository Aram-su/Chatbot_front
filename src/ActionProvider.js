import axios from "axios";
import avatarImage from "./components/img/kgu.png"
class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  // new method
  greet() {
    const greetingMessage = this.createChatBotMessage("안녕하세요! 오늘 하루도 즐겁게 보내세요😝");
    this.updateChatbotState(greetingMessage);
  }

// 학교 식당
handleRestaurantList = () => {
  axios
    .post("/api/restaurants")
    .then((response) => {
      const restaurants = response.data;
      let message;
      if (restaurants.length > 0) {
        message = this.createChatBotMessage(
          <>
            <p>오늘 수원캠퍼스의 식단을 알려드릴게요🙂</p>
            <ul>
              {restaurants.map((restaurant, index) => (
                <li key={index}>
                  <p>{restaurant.cafeteria} ({restaurant.lunch_or_dinner})</p>
                  <p>{restaurant.menu01}   {restaurant.menu02}  {restaurant.menu03}</p>
                  <p>{restaurant.menu04}   {restaurant.menu05}  {restaurant.menu06}</p>
                </li>
              ))}
            </ul>
          </>, { widget: "restaurantslist" }
        );
      } else {
        message = this.createChatBotMessage(
          <>
            <p>오늘은 예정되어있는 식단이 없어요😥</p>
            <p>다음에 다시 이용해주세요!</p>
          </>, { widget: "restaurantslist" }
        );
      }
    
      this.updateChatbotState(message);
    })
    .catch((error) => {
      console.error(error);
    });
}

  
  // 공지사항
  handleAnnouncementList = () => {
    axios.post("/api/announcements")
    .then((response) => {
      const announcements = response.data;
      let message;
      if (announcements.length > 0) {
        message = this.createChatBotMessage(
          <>
            <p>경기대학교의 공지사항들이에요🙂</p>
            <ul>
              {announcements.map((announce, index) => (
                <li key={index}>
                  <p>[중요도 : {announce.importance}]  {announce.title}</p>
                  <p>{announce.contents}</p>
                </li>
              ))}
            </ul>
          </>
        );
      } else {
        message = this.createChatBotMessage(
          <>
            <p>특별한 공지사항이 없습니다!</p>
          </>
        );
      }
    
      this.updateChatbotState(message);
    })
    .catch((error) => {
      console.error(error);
    });
}


  // 도서관
handleLibraryList = () => {
  axios.post("/api/libraries")
    .then((response) => {
      const libraries = response.data;
      let message;
      if ( libraries.length > 0 ){
        message = this.createChatBotMessage(
          <>
            <p>현재 도서관의 좌석이용 정보를 알려드릴게요🙂</p>
            <ul>
              {libraries.map((seat, index) => (
              <li key={index}>
              <p> {seat.location} 총 좌석 : {seat.all_seats}</p>
              <p> 사용 중 : {seat.using} / 이용가능 : {seat.available}</p>
              </li>
              ))}
            </ul>
          </>, {widget: "librarieslist"}
        );
      } else {
        message = this.createChatBotMessage(
          <>
            <p>정보를 가져오는데 실패했어요😥</p>
            <p>잠시 후 다시 이용해주세요</p>
          </>, {widget: "librarieslist"}
        );
      }
      this.updateChatbotState(message);
    })
    .catch((error) => {
      console.error(error);
    });
};


//학사일정
handlePlanList = () => {
  axios.post("/api/plans").then((response) => {
    const plans = response.data;
    let message;

    if (plans.length > 0) {
      message = this.createChatBotMessage(
        <>
          <p>예정된 학사일정을 알려드릴게요🙂</p>
          <ul>
            {plans.map((plan, index) => (
              <li key={index}>
                {plan.startDay === plan.endDay ? (
                  <p>{plan.title} {plan.startDay}</p>
                ) : (
                  <p>{plan.title} {plan.startDay}~{plan.endDay}</p>
                )}
              </li>
            ))}
          </ul>
        </>
      );
    } else {
      message = this.createChatBotMessage(
        <>
          <p>예정된 학사일정이 없습니다</p>
        </>
      );
    }
  
    this.updateChatbotState(message);
  })
  .catch((error) => {
    console.error(error);
  });
}


 // 연락처
 handleContactList = () => {
  axios.post("/api/contacts").then((response) => {
    const contact = response.data;
        const message = this.createChatBotMessage(
          <>
            <p>경기대학교의 연락처를 알려드릴게요🙂</p>
            {contact ? (
              <>
                <p>{contact.department} 소속 {contact.name} 교수님 </p>
                <p>전화번호: {contact.phone}</p>
                <p>이메일: {contact.email}</p>
              </>
            ) : (
              <p>해당 교수님의 연락처 정보를 찾을 수 없습니다.</p>
            )}
          </>, {widget:"contactlist"}
  );

  this.updateChatbotState(message);
})
.catch((error) => {
  console.error(error);
});};


  updateChatbotState(message) {
    // NOTICE: This function is set in the constructor, and is passed in from the top level Chatbot component. The setState function here actually manipulates the top level state of the Chatbot, so it's important that we make sure that we preserve the previous state.

    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  }
}

export default ActionProvider;