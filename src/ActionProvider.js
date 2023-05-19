import axios from "axios";

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
        console.log(restaurants);
        const message = this.createChatBotMessage(
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
          </>
        );
  
        this.updateChatbotState(message);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  // 공지사항
  handleAnnouncementList = () => {
    axios.post("/api/announcements").then((response) => {
      const announcements = response.data;
      const message = this.createChatBotMessage(
        <>
          <p>경기대학교의 공지사항을 알려드릴게요🙂</p>
          <p>{announcements}</p>
        </>
      );
  
      this.updateChatbotState(message);
      console.log(announcements); // UI에 받아온 데이터 출력
    }).catch((error) => {
      console.error(error);
    });
  };  


  // 도서관
  handleLibraryList = () => {
    axios.post("/api/libraries").then((response) => {
      const libraries = response.data;
      const message = this.createChatBotMessage(
        <>
        <p>경기대학교의 도서관 정보를 알려드릴게요🙂</p>
        <p>{libraries}</p>
        </>
    );

    this.updateChatbotState(message);
  })
  .catch((error) => {
    console.error(error);
  });};


  // 학사 일정
  handlePlanList = () => {
    axios.post("/api/plans").then((response) => {
      const plans = response.data;
      const message = this.createChatBotMessage(
        <>
        <p>경기대학교의 학사 일정을 알려드릴게요🙂</p>
        <p>{plans}</p>
        </>
    );

    this.updateChatbotState(message);
  })
  .catch((error) => {
    console.error(error);
  });};

 // 연락처
 handleContactList = () => {
  axios.post("/api/contacts").then((response) => {
    const professor = response.data;
        const message = this.createChatBotMessage(
          <>
            <p>경기대학교의 연락처를 알려드릴게요🙂</p>
            {professor ? (
              <>
                <p>{professor.department} 소속 {professor.name} 교수님 </p>
                <p>전화번호: {professor.phone}</p>
                <p>이메일: {professor.email}</p>
              </>
            ) : (
              <p>해당 교수님의 연락처 정보를 찾을 수 없습니다.</p>
            )}
          </>
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