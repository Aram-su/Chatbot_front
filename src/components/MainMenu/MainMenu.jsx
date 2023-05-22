import React from "react";

import "./MainMenu.css";

const MainMenu = (props) => {
  const options = [
    {
      text: "학교 식당",
      handler: props.actionProvider.handleRestaurantList,
      
      id: 1,
    },
    { text: "공지사항", handler: props.actionProvider.handleAnnouncementList, id: 2 },
    { text: "도서관", handler: props.actionProvider.handleLibraryList, id: 3 },
    { text: "학사 일정", handler: props.actionProvider.handlePlanList, id: 4 },
    { text: "연락처", handler: props.actionProvider.handleContactList, id: 5 },
  ];

  const optionsMarkup = options.map((option) => (
    <button
      className="menu-option-button"
      key={option.id}
      onClick={option.handler}
    >
      {option.text}
    </button>
  ));

  return <div className="menu-options-container">{optionsMarkup}</div>;
};

export default MainMenu;
