import styled, { keyframes } from 'styled-components';
import {
  bgColor,
  errorColor,
  pointColor,
  primaryColor,
  secondaryColor,
} from '../GlobalStyle';
import landingTitle from '../assets/images/landingTitle.png';

// Container---------------------------------------
export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const DarkContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${bgColor};
  color: ${primaryColor};
  font-weight: 550;

  // PC 화면
  @media screen and (min-width: 1024px) {
  }
  // 모바일 스타일
  @media screen and (max-width: 420px) {
    // height: auto;
    // min-height: 120vh;
  }
`;

// Mypage----------------------------------------
export const MyPage = styled.img`
  width: auto;
  height: auto;
  cursor: pointer;
  position: absolute;
  top: 30px;
  right: 13px;
`;

export const MainButton = styled.button`
  width: 200px;
  height: 35px;
  border: 1px solid ${bgColor};
  color: ${bgColor};
  background-color: transparent;
  border-radius: 5px;
  transition: 0.3s;
  &:hover {
    color: white;
    background-color: ${bgColor};
    cursor: pointer;
  }
`;

// Refactoring 대상
export const CursorText = styled.span`
  cursor: pointer;
`;

// Logo------------------------------------------
export const Header = styled.span`
  color: ${primaryColor};
  font-size: 16px;
  font-weight: 800;
`;

export const TitleBox = styled.section`
  width: 350px;
  min-height: 50px;
  background-image: url(${landingTitle});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  cursor: pointer;
`;

export const SubTitle = styled.p`
  font-size: 0.85rem;
  font-weight: 500;
  color: #fff;
`;

export const SubTitle404 = styled.p`
  font-size: 0.85rem;
  font-weight: 600;
  color: ${pointColor};
`;

export const Bracket = styled.span`
  visibility: hidden;
`;

// Guide page------------------------------------
export const GuideButton = styled.button`
  width: 500px;
  height: 35px;
  border: 1px solid transparent;
  background: none,
    linear-gradient(to right, ${primaryColor}, ${secondaryColor});
  background-origin: border-box;
  background-clip: content-box, border-box;
  border-radius: 15px;
  color: #fff;
  cursor: pointer;
  @media screen and (max-width: 530px) {
    width: 400px;
  }
`;

export const WarningButton = styled.button`
  width: 500px;
  height: 35px;
  border: 1px solid transparent;
  background: none, linear-gradient(to left, ${primaryColor}, ${secondaryColor});
  background-origin: border-box;
  background-clip: content-box, border-box;
  border-radius: 15px;
  color: #fff;
  cursor: pointer;
  @media screen and (max-width: 530px) {
    width: 400px;
  }
`;

export const GuideList = styled.ul`
  width: 500px;
  color: #fff;
  font-size: 0.9rem;
  line-height: 50px;
  @media screen and (max-width: 530px) {
    width: 400px;
    font-size: 0.76rem;
  }
`;

// Question List---------------------------------
export const QListButton = styled.button`
  width: 350px;
  height: 50px;
  min-height: 35px;
  border: 1px solid ${primaryColor};
  color: ${primaryColor};
  background-color: transparent;
  border-radius: 15px;
  transition: 0.3s;
  cursor: pointer;
  &:hover {
    color: white;
    background-color: ${primaryColor};
    border: 1px solid transparent;
    background: none,
      linear-gradient(to left, ${primaryColor}, ${secondaryColor});
    background-origin: border-box;
    background-clip: content-box, border-box;
  }
`;

// Question detail-------------------------------
export const QuestionBox = styled.section`
  width: 350px;
  min-height: 200px;
  overflow: hidden;
  word-wrap: break-word;
  border-left: 5px solid ${primaryColor};
  border-right: 5px solid ${primaryColor};
  margin: 10px 0;
  padding: 20px;
  // 모바일 스타일
  @media screen and (max-height: 700px) {
    min-height: 120px;
  }
`;

export const QuestionSubBox = styled.span`
  color: ${pointColor};
  font-size: 12px;
  font-weight: 600;
  opacity: 0.4;
  cursor: pointer;
`;

// Create Question ------------------------------
export const CreateQuestionText = styled.h6`
  width: 350px;
  color: ${primaryColor};
  font-size: 14px;
  font-weight: 600;
  margin: 40px 0 15px 0;
`;
export const CreateQuestionBox = styled.section`
  width: 350px;
  display: flex;
  justify-content: space-between;
`;

export const RecommendQuestion = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: ${pointColor};
  transition: all 0.3s;
  opacity: 0.7;
  cursor: pointer;
  &:hover {
    color: ${primaryColor};
    opacity: 1;
  }
`;

export const BeQuestion = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: ${pointColor};
  transition: all 0.3s;
  opacity: 0.7;
  cursor: pointer;
  &:hover {
    color: ${primaryColor};
    opacity: 1;
  }
`;

export const GivenQuestionBox = styled.section`
  width: 90%;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  margin-top: 20px;
  overflow-y: auto;

  &::-webkit-scrollbar-thumb {
    background: ${secondaryColor};
  }
`;

export const GivenQuestionContent = styled.p`
  width: 95%;
  font-size: 14px;
  color: #fff;
  border-bottom: 3px solid #fff;
`;

// Comment---------------------------------------
export const CommentBox = styled.section`
  width: 350px;
  height: auto;
  color: ${primaryColor};
  font-size: 14px;
  font-weight: 600;
  padding: 5px;
  margin-bottom: 15px;
  overflow: hidden;
  word-wrap: break-word;
`;

export const SecretCommentBox = styled.section`
  width: 350px;
  height: auto;
  color: ${pointColor};
  font-size: 14px;
  font-weight: 600;
  padding: 5px;
  margin-bottom: 15px;
  overflow: hidden;
  word-wrap: break-word;
`;

export const SecretComment = styled.span`
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    color: ${primaryColor};
  }
`;

export const LockComment = styled.span`
  color: ${pointColor};
  font-size: 12px;
  font-weight: 600;
  opacity: 0.5;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    opacity: 1;
  }
`;

export const FireComment = styled.span`
  color: ${pointColor};
  font-size: 12px;
  opacity: 0.5;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    opacity: 1;
  }
`;

export const Emotion = styled.p`
  color: ${errorColor};
`;

export const SquareSubmitButton = styled.button`
  width: 55px;
  height: 55px;
  border: 1px solid ${primaryColor};
  color: ${primaryColor};
  background-color: unset;
  border-radius: 5px;
  transition: 0.3s;
  &:hover {
    color: white;
    background-color: ${primaryColor};
    cursor: pointer;
  }
`;

// Effect------------------------------------------
export const Loading = keyframes`
  from {
    transform: rotate(0deg);
    border-radius: 50%;
    border-color: ${secondaryColor};
  } 
  to {
    transform: rotate(360deg);
  }
`;

export const LoadingBox = styled.section`
  width: 30px;
  height: 30px;
  border: 1px solid ${primaryColor};
  animation: ${Loading} 1s ease infinite alternate;
`;

// --------------------------------------------------

export const LogOutBox = styled.section`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: flex-end;
`;

// Modal----------------------------------------------
export const modalStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 325,
  height: 350,
  bgcolor: `${bgColor}`,
  border: `1px solid ${secondaryColor}`,
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
};

export const modalStyle2 = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 325,
  height: 400,
  bgcolor: `${bgColor}`,
  border: `1px solid ${secondaryColor}`,
  borderRadius: 3,
  boxShadow: 24,
  p: 3,
};

// Image---------------------------------------------
export const ImageBox = styled.img`
  width: 250px;
  height: auto;
  cursor: pointer;
  &:hover {
    width: 260px;
    transition: all 0.3s;
  }
  @media screen and (max-width: 540px) {
    width: 200px;
    height: auto;
    &:hover {
      width: 210px;
      transition: all 0.3s;
    }
  }
`;

//삭제 텍스트-------------------------------------------
export const DeleteText = styled.span`
  position: absolute;
  right: 0;
  bottom: 0;
  font-size: 12px;
  font-weight: 700;
  opacity: 50%;
  cursor: pointer;
  transition: 0.5s;
  &:hover {
    color: ${primaryColor};
  }
`;

// ABOUT PAGE-------------------------------------------
export const AboutHeader = styled.h6`
  font-size: 18px;
  font-weight: 900;
  font-style: italic;
  color: white;
  @media screen and (max-width: 476px) {
    font-size: 90%;
  }
  @media screen and (max-width: 386px) {
    font-size: 80%;
  }
`;

export const AboutBody = styled.p`
  display: flex;
  justify-content: center;
  width: 550px;
  border: 5px solid white;
  border-top: none;
  border-bottom: none;
  padding: 30px;
  font-size: 1rem;
  line-height: 45px;
  @media screen and (max-width: 580px) {
    width: 90%;
    font-size: 0.9rem;
    line-height: 40px;
  }
  @media screen and (max-width: 410px) {
    font-size: 3.5vw;
    line-height: 30px;
  }
`;

export const AboutButtonBox = styled.section`
  width: 500px;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  border: 1px soild white;
  @media screen and (max-width: 450px) {
    width: 400px;
  }
  @media screen and (max-width: 350px) {
    width: 300px;
  }
`;
