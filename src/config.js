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
    //학교식당
    {
      widgetName: "restaurantLinks",
      widgetFunc: (props) => <LinkList {...props} />,
      props: {
        options: [
          {
            text: "감성코어 메뉴가 궁금해요!",
            url:
              "https://www.kyonggi.ac.kr",
            id: 1,
          },
          {
            text: "이스퀘어 메뉴가 궁금해요!",
            url:
              "https://www.kyonggi.ac.kr",
            id: 2,
          },
          {
            text: "경슐랭 메뉴가 궁금해요!",
            url: "https://www.kyonggi.ac.kr",
            id: 3,
          },
        ],
      },
    },
//공지사항
    {
      widgetName: "AnnouncementLinks",
      widgetFunc: (props) => <LinkList {...props} />,
      props: {
        options: [
          {
            text: "수원캠퍼스 공지사항",
            url:
              "https://www.kyonggi.ac.kr",
            id: 1,
          },
          {
            text: "서울캠퍼스 공지사항",
            url:
              "https://www.kyonggi.ac.kr",
            id: 2,
          },
        ],
      },
    },
//도서관
    {
      widgetName: "LibraryLinks",
      widgetFunc: (props) => <LinkList {...props} />,
      props: {
        options: [
          {
            text: "수원캠퍼스 도서관 (중앙도서관)",
            url:
              "https://library.kyonggi.ac.kr/",
            id: 1,
          },
          {
            text: "서울캠퍼스 도서관 (금화도서관)",
            url:
              "https://library.kyonggi.ac.kr/",
            id: 2,
          },
        ],
      },
    },
//학사일정
    {
      widgetName: "PlanLinks",
      widgetFunc: (props) => <LinkList {...props} />,
      props: {
        options: [
          {
            text: "수원캠퍼스 학사일정",
            url:
              "/",
            id: 1,
          },
          {
            text: "서울캠퍼스 학사일정",
            url:
              "",
            id: 2,
          },
        ],
      },
    },
//연락처
    {
      widgetName: "ContactLinks",
      widgetFunc: (props) => <LinkList {...props} />,
      props: {
        options: [
          {
            text: "공대 연락처",
            url:
              "/",
            id: 1,
          },
          {
            text: "소경대 연락처",
            url:
              "",
            id: 2,
          },
        ],
      },
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