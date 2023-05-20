// 채팅창 코드

import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";

import MainMenu from "./components/MainMenu/MainMenu";
import LinkList from "./components/LinkList/LinkList";
import Header from "./components/Header/Header";
import Avatar from "./components/Avatar/Avatar";

const config = {
  botName: "Turtle-Bot",
  
  initialMessages: [
    createChatBotMessage(<div>
      안녕하세요😀저는 경기대학교 챗봇 거붓봇이에요!<br></br>
      ✔홈페이지 공지사항 ✔도서관 ✔학식 ✔학교생활에 대해 열심히 공부했답니다.<br></br>최선을 다해 답변해드릴게요😏<br></br></div>, {
      widget: "MainMenu",
    }),
  ],
  customComponents: {
   header: () => <Header />,
   },
  customStyles: {
    botMessageBox: {
      backgroundColor: "#F1F1F1"    // 봇 메시지박스 색상
    },
    // chatButton: {
    //   backgroundColor: "#ff7f00",
    // },
  },
  widgets: [
    {
      widgetName: "MainMenu",
      widgetFunc: (props) => <MainMenu {...props} />,
    },
  ],
  customComponents: {
    header: () => <Header />,
    botAvatar: (props) => <Avatar />
  },
};

export default config;


// import { createChatBotMessage } from 'react-chatbot-kit';

// const config = { 
//   botName: "LearningBot",
//   initialMessages: [createChatBotMessage("Hi, I'm here to help. What do you want to learn?")],
//   customStyles: {
//     botMessageBox: {
//       backgroundColor: "#376B7E",
//     },
//     chatButton: {
//       backgroundColor: "#376B7E",
//     },
//   },
// }

// export default config