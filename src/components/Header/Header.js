import styled from "styled-components";
import "./Header.css";

const HeaderContainer = styled.div`
  background: rgb(60, 179, 113);
  width: flex;
  display: flex;
  justify-content: space-between;
  border-radius: 25px;
  align-items: center;
  padding: 1.4rem;
`;

function Header() {
  return (
    <HeaderContainer>
      <i className="fas fa-angle-left"></i>
      <img src="img/ku.png" alt="경기대학교 로고" />경기대학교 챗봇 거북봇<img src="img/ku.png" alt="경기대학교 로고" />
      <i className="fas fa-circle-xmark"></i>
    </HeaderContainer>
  );
}

export default Header;