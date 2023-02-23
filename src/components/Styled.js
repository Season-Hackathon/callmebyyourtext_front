import styled from "styled-components";
import { primaryColor, secondaryColor } from "../styles/GlobalStyle";

const Auth = JSON.parse(localStorage.getItem("auth"));

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Header = styled.span`
  color: ${primaryColor};
  font-size: 16px;
  font-weight: 800;
  border-bottom: 1px solid ${primaryColor};
`;

export const QuestionBox = styled.section`
  box-shadow: 3px 3px 5px 0px rgb(0 0 0 / 20%);
  border-radius: 5px;
  width: 250px;
  min-height: 100px;
  margin-bottom: 10%;
  padding: 20px;
`;

export const LogIn = styled.p`
  font-size: 14px;
  position: fixed;
  top: 3px;
  right: 13px;
  color: ${primaryColor};
  cursor: pointer;
  display: ${Auth ? "none" : "inline-block"};
`;

export const MyPage = styled.img`
  width: auto;
  height: auto;
  cursor: pointer;
  position: absolute;
  top: 50px;
  right: 13px;
`;

export const CursorText = styled.span`
  cursor: pointer;
`;

export const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 250,
  bgcolor: "background.paper",
  border: `1px solid ${primaryColor}`,
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
};

export const Img = styled.img`
  width: auto;
`;

export const SmallImg = styled.img`
  width: 20px;
`;

export const SubTitle = styled.p`
  font-family: "Noto Sans KR Bold";
  font-size: 0.8rem;
  font-weight: 900;
  color: ${secondaryColor};
`;

export const Bracket = styled.span`
  visibility: hidden;
`;

export const DeleteText = styled.span`
  font-size: 12px;
  opacity: 50%;
  cursor: pointer;
  transition: 0.5s;
  &:hover {
    color: ${primaryColor};
  }
`;
