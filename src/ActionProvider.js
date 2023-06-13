// ActionProvider.js

import axios from "axios";
//import avatarImage from "./components/img/kgu.png"
class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  // new method
  greet() {
    const greetingMessage = this.createChatBotMessage(
      <>
        <p>안녕하세요! 오늘 하루도 즐겁게 보내세요😝</p>
      </>, {widget: "greet"}
    );
    this.updateChatbotState(greetingMessage);
  }

  // 학교 식당
  handleRestaurantList = () => {
    // // 챗봇 답변 채팅박스 하나 추가
    // const loadingMessage = this.createChatBotMessage("질문해 주신 내용 답변 드릴게요!", {widget: this.handleRestaurantList});
    // this.updateChatbotState(loadingMessage);
    
    // 사용자 채팅 추가
    const message = {
      type: "user",
      message: "오늘 식당 메뉴 알려줘!",
    };
  
    this.updateChatbotState(message);

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
                    {index !== restaurants.length - 1 && <p>---------------------------------</p>}
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
  };
  
  
  // 공지사항
  handleAnnouncementList = () => {
    // 사용자 채팅 추가
    const message = {
      type: "user",
      message: "학교 공지 알려줘!",
    };
    this.updateChatbotState(message);
      
    axios
      .post("/api/announcements")
      .then((response) => {
        const announcements = response.data;
        let message;
  
        if (announcements.length > 0) {
          // announce.importance를 오름차순으로 정렬
          announcements.sort((a, b) => a.importance - b.importance);
  
          message = this.createChatBotMessage(
            <>
              <p>경기대학교의 공지사항들이에요🙂</p>
              <ul>
                {announcements.map((announce, index) => (
                  <li key={index}>
                    <p>[중요도 : {announce.importance}]  {announce.title}</p>
                    <p style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>{announce.contents}</p>
                  </li>
                ))}
              </ul>
            </>, {widget: "announcementslist"}
          );
        } else {
          message = this.createChatBotMessage(
            <>
              <p>특별한 공지사항이 없습니다!</p>
            </>,{widget: "announcementslist"}
          );
        }
      
        this.updateChatbotState(message);
        //console.log(announcements); // UI에 받아온 데이터 출력
      }).catch((error) => {
        console.error(error);
      });
  };
  


  // 도서관
  handleLibraryList = () => {
    // 사용자 채팅 추가
    const message = {
      type: "user",
      message: "학교 도서관 정보 알려줘!",
    };
    this.updateChatbotState(message);

    axios
      .post("/api/libraries").then((response) => {
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
  });};


  // 학사 일정
  handlePlanList = () => {
    // 사용자 채팅 추가
    const message = {
      type: "user",
      message: "학사 일정 알려줘!",
    };
    this.updateChatbotState(message);
  
    axios
      .post("/api/plans")
      .then((response) => {
        const plans = response.data;
        let message;
  
        if (plans.length > 0) {
          // plan.startDay를 오름차순으로 정렬
          plans.sort((a, b) => a.startDay.localeCompare(b.startDay));
  
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
  };
  
 // 연락처
 handleContactList = () => {
  // 사용자 채팅 추가
  let message = {
    type: "user",
    message: "교내기관 전화번호 알려줘!",
  };
  this.updateChatbotState(message);
  
  message = this.createChatBotMessage(
    <>
      <p>경기대학교의 연락처를 알려드릴게요🙂</p>
      <hr></hr>
      <ul class="custom-list">
        <li>   총학생회   031-249-8600, 8601   </li>
        <li>   진성애교양대학   031-249-9526   </li>
        <li>   인문대학   031-249-9103, 9104   /  인문대 학생회   031-249-8603   </li>
        <li>   예술체육대학   031-249-9899, 9909, 9077   </li>
        <li>   예술대 학생회   031-249-8602   /  체대 학생회   031-249-8609   </li>
        <li>   사회과학대학   031-249-9361, 9315   /  사회과학대학 학생회   031-249-8604   </li>
        <li>   소프트웨어경영대학   031-249-9212, 9402   /  소프트웨어경영대학 학생회      </li>
        <li>   융합과학대학   031-249-9602, 9603   /  융합과학대학 학생회   031-249-8607   </li>
        <li>   창의공과대학   031-249-9627, 9628   /  창의공과대학 학생회   031-249-8608   </li>
        <li>   관광문화대학   02-390-5211   </li>
        <li>   건강증진센터(보건진료소)   031-249-8941   </li>
        <li>   생활관(경기드림타워)   031-249-9871, 9872   </li>
        <li>   경상대 학생회   031-249-8609   </li>
        <li>   동아리연합회   031-249-8615   </li>
      </ul>
    </>, {widget:"contactlist"}
    );

  this.updateChatbotState(message);
  };

  handleServerResponse = (response) => {
    let message;
    console.log(response);
    console.log(response.data);
    if (response && response.data.code && response.data.code.startsWith("02")) {
      const professor = response.data;
      message = this.createChatBotMessage(
        <>
          <p>{professor.department} 소속 {professor.name} 교수님 </p>
          <p>전화번호: {professor.phone}</p>
          <p>이메일: {professor.email}</p>
        </>
      );
      this.updateChatbotState(message);
    } else if (response.data.code.startsWith("07")) {
      const number = response.data.code.substring(2,4);
      let imageUrl = "/img/map/suwon_"+number+".jpg"; // 이미지 URL
      message = this.createChatBotMessage(
        <>
          <p style={{ fontSize: '1.2em' }}><strong>{response.data.location}</strong>의 위치를 붉은 원으로 표시해뒀어요!</p>
          <img src={imageUrl} alt="Suwon Map" style={{ width: '100%' }} />
          <p>{response.data.description}</p>
        </>
      );
      this.updateChatbotState(message);
    }else if (response.data[0].code === "050101") {
      const libraries = response.data;
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
      this.updateChatbotState(message);
    }  else {
      const message = this.createChatBotMessage(
        <>
          <p>제가 알지못하는 정보에요...</p>
          <p>다른 질문을 해주세요!</p>
        </>
      );
      this.updateChatbotState(message);
    }
  };
  



  updateChatbotState(message) {
    // 이 함수의 setState 함수는 최상위 수준의 Chatbot 컴포넌트에서 전달되고, Chatbot의 최상위 상태 수정

    this.setState((prevState) => ({
      ...prevState,   // 이전 상태 보존 위해 복제
      messages: [...prevState.messages, message], // messages 배열에 새로운 메시지 추가
    }));
  }
}

export default ActionProvider;