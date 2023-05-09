import styled, { keyframes } from 'styled-components';
import {
  bgColor,
  bgTextColor,
  errorColor,
  pointColor,
  primaryColor,
  secondaryColor,
} from '../GlobalStyle';
import landingTitle from '../assets/images/landingTitle.png';
import { FormHelperText } from '@mui/material';

// Effect------------------------------------------
export const Loading = keyframes`
  0% {
    transform: rotate(0deg) scale(1);;
    border-radius: 0% 0% 0% 0%;
    border-color: ${primaryColor};
    
  } 
  25% {
    transform: rotate(180deg) scale(0.5);;
    border-radius: 70% 30% 40% 60%;
    border-color: ${secondaryColor};
  }
  50% {
    transform: rotate(360deg) scale(1);;
    border-radius: 25% 65% 15% 50%;
    border-color: ${pointColor};
  }
  75% {
    transform: rotate(180deg) scale(1.5);;
    border-radius: 50% 50% 0% 90%;
    border-color: ${secondaryColor};
  }
  100% {
    transform: rotate(0deg) scale(1);;
    border-radius: 0% 0% 0% 0%;
    border-color: ${primaryColor};
  }
`;

export const rotateThis = keyframes`
  from {
      transform: rotate(0deg) scale(1);
  }
  to {
      transform: rotate(360deg) scale(1);
  }
`;
export const psycho = keyframes`
  0% {
      transform: rotate(0deg) scale(1) translate(0, 0);
  }
  33% {
      transform: rotate(360deg) scale(1) translate(5px, 5px);
  }
  66% {
      transform: rotate(720deg) scale(1) translate(-5px, -5px);
  }
  100% {
      transform: rotate(1080deg) scale(1) translate(0, 0);
  }
`;

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

export const ScrollContainer = styled.div`
  width: 100vw;
  height: auto;
  position: relative;
  overflow-y: auto;
`;

export const EffectContainer = styled.div`
  position: relative;
  z-index: 1;
`;

// Landing Guide---------------------------------
export const Rotate = keyframes`
  100% {
    transform: rotate(1turn);
  }
`;

export const FixedButton = styled.button`
  width: 100px;
  height: 30px;
  position: fixed;
  top: 10px;
  right: 10px;
  color: ${secondaryColor};
  background-color: transparent;
  border: 1px solid ${secondaryColor};
  border-radius: 10px;
  cursor: pointer;
  z-index: 1;
  transition: all 0.3s;
  &:hover {
    color: ${bgColor};
    background-color: ${secondaryColor};
  }
  @media screen and (max-width: 420px) {
    width: 70px;
  }
`;

export const FirstSection = styled.section`
  width: 100%;
  height: 80vh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(${bgColor}, 87%, transparent);
  color: ${bgColor};
`;

export const FirstHeadLine = styled.h1`
  width: 415px;
  display: inline-block;
  position: absolute;
  bottom: 3px;
  text-align: center;
  font-size: 18px;
  font-weight: 100;
  font-style: italic;
  opacity: 0.7;
  overflow: hidden;
  @media screen and (max-width: 420px) {
    width: 369px;
    font-size: 16px;
  }
`;

//
export const SecondSection = styled.section`
  width: 100%;
  height: 20vh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  color: ${bgColor};
`;

export const LoadingBox = styled.section`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const LoadingCircle1 = styled.div`
  width: 50px;
  height: 50px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -25px;
  margin-top: -25px;
  border-radius: 100%;
  cursor: pointer;
  animation: ${psycho} 5s linear infinite;
  box-shadow: 0 1px 0 0 rgba(225, 131, 194, 0.25),
    0 -1px 0 0 rgba(165, 181, 222, 0.25), 1px 0 0 0 rgba(225, 131, 194, 0.25),
    -1px 0 0 0 rgba(165, 181, 222, 0.25), 1px -1px 0 0 rgba(195, 156, 208, 0.5),
    -1px 1px 0 0 rgba(195, 156, 208, 0.5), 1px 1px 0 0 rgba(255, 105, 180, 0.75),
    -1px -1px 0 0 rgba(135, 206, 235, 0.75);
`;

export const LoadingCircle2 = styled.div`
  width: 50px;
  height: 50px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -25px;
  margin-top: -25px;
  border-radius: 100%;
  cursor: pointer;
  animation: ${psycho} 5s linear 0.1s infinite;
  box-shadow: 0 1px 0 0 rgba(225, 131, 194, 0.25),
    0 -1px 0 0 rgba(165, 181, 222, 0.25), 1px 0 0 0 rgba(225, 131, 194, 0.25),
    -1px 0 0 0 rgba(165, 181, 222, 0.25), 1px -1px 0 0 rgba(195, 156, 208, 0.5),
    -1px 1px 0 0 rgba(195, 156, 208, 0.5), 1px 1px 0 0 rgba(255, 105, 180, 0.75),
    -1px -1px 0 0 rgba(135, 206, 235, 0.75);
`;

export const LoadingCircle3 = styled.div`
  width: 50px;
  height: 50px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -25px;
  margin-top: -25px;
  border-radius: 100%;
  cursor: pointer;
  animation: ${psycho} 5s linear 0.2s infinite;
  box-shadow: 0 1px 0 0 rgba(225, 131, 194, 0.25),
    0 -1px 0 0 rgba(165, 181, 222, 0.25), 1px 0 0 0 rgba(225, 131, 194, 0.25),
    -1px 0 0 0 rgba(165, 181, 222, 0.25), 1px -1px 0 0 rgba(195, 156, 208, 0.5),
    -1px 1px 0 0 rgba(195, 156, 208, 0.5), 1px 1px 0 0 rgba(255, 105, 180, 0.75),
    -1px -1px 0 0 rgba(135, 206, 235, 0.75);
`;

export const ThirdSection = styled.section`
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  color: ${bgColor};
`;

export const ThirdChild1 = styled.section`
  width: 100%;
  height: 33.3%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ThirdChild1Header = styled.h1`
  width: 440px;
  text-align: center;
  color: ${bgColor};
  font-size: 28px;
  font-family: 'AppleSDGothicNeoL' !important;
  @media screen and (max-width: 450px) {
    width: 315px;
    font-size: 20px;
  }
`;

export const ThirdChild2 = styled.section`
  width: 100%;
  height: 33.3%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  color: ${bgColor};
  border: 1px solid ${primaryColor};
`;

export const ThirdChild3 = styled.section`
  width: 100%;
  height: 33.3%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  color: ${bgColor};
  border: 1px solid ${primaryColor};
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
  width: 350px;
  height: 40px;
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
  color: ${bgColor};
  font-size: 12px;
  font-weight: 600;
  margin: 10px 0 50px 0;
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

// Sign page-------------------------------------
export const FormHelperEmails = styled(FormHelperText)`
  width: 100%;
  margin-left: 0 !important;
  font-weight: 700 !important;
  color: ${(props) =>
    props.isemail === 'true' ? `${primaryColor}` : `${errorColor}`} !important;
`;
export const FormHelperNames = styled(FormHelperText)`
  width: 100%;
  margin-left: 0 !important;
  font-weight: 700 !important;
  color: ${(props) =>
    props.isname === 'true' ? `${primaryColor}` : `${errorColor}`} !important;
`;
export const FormHelperPWs = styled(FormHelperText)`
  width: 100%;
  margin-left: 0 !important;
  font-weight: 700 !important;
  color: ${(props) =>
    props.ispassword === 'true'
      ? `${primaryColor}`
      : `${errorColor}`} !important;
`;
export const FormHelperPWCF = styled(FormHelperText)`
  width: 100%;
  margin-left: 0 !important;
  font-weight: 700 !important;
  color: ${(props) =>
    props.ispassword2 === 'true'
      ? `${primaryColor}`
      : `${errorColor}`} !important;
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
  margin-top: 20px;
  overflow-y: auto;

  &::-webkit-scrollbar-thumb {
    background: ${secondaryColor};
  }
`;

export const GivenEmptyBox = styled.section`
  width: 90%;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
`;

export const GivenEmptyIcon = styled.p`
  font-size: 60px;
  color: ${secondaryColor};
`;

export const GivenQuestionHeader = styled.section`
  width: 95%;
  color: #fff;
  display: flex;
  justify-content: space-between;
`;

export const GivenQuestionContent = styled.span`
  font-size: 14px;
  margin-bottom: 5px;
`;

export const GivenQuestionDelete = styled.span`
  font-size: 12px;
  opacity: 0.5;
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`;

export const GivenQuestionSubContent = styled.span`
  width: 95%;
  font-size: 12px;
  color: #fff;
  opacity: 0.7;
  border-bottom: 3px solid #fff;
  cursor: pointer;
  &:hover {
    opacity: 1;
    color: ${secondaryColor};
  }
`;

// Comment---------------------------------------
export const CommentBox = styled.section`
  width: 350px;
  height: auto;
  display: flex;
  justify-content: space-between;

  color: ${primaryColor};
  font-size: 14px;
  font-weight: 600;
  padding: 5px;
  margin-bottom: 15px;
  overflow: hidden;
  word-wrap: break-word;
`;

export const CommentLeftBox = styled.section`
  width: 310px;
`;

export const CommentRightBox = styled.section`
  color: ${pointColor};
  font-size: 12px;
  opacity: 0.5;
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
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
  width: 350,
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

export const AboutContributor = styled.span`
  color: #fff;
  font-weight: 600;
  letter-spacing: 3px;
  margin-bottom: 5px;
  cursor: pointer;
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
