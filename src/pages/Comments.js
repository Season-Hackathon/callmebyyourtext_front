import { Box } from '@mui/material';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Menu from "../assets/images/menu.png";
import TitleLogo from "../assets/images/titleLogo.png";
import PrimaryBtn from '../components/Button/PrimaryBtn';
import { Header, MyPage, QuestionBox, Wrapper } from '../components/Styled';
import Title from '../components/Title/Title';
import { AuthContext } from '../context/AuthContext';

const Comments = () => {
  //   const navigate = useNavigate();
  //   const userId = localStorage.getItem("id");
  //   const userName = localStorage.getItem("name")
  //   const { isLoggedIn } = useContext(AuthContext);
  //   const goToMyPage = () => {
  //     if (isLoggedIn) {
  //       navigate(`/mypage/${userId}`);
  //     } else {
  //       return alert("로그인 후 이용해주세요.");
  //     }
  //   };
  //   return (
  //     <>
  //       <MyPage src={Menu} onClick={goToMyPage} />
  //       <Wrapper>
  //         <Title onClick={goToHome} />
  //         <Typography
  //           variant="h6"
  //           sx={{
  //             color: `${secondaryColor}`,
  //             marginBottom: "10%",
  //             fontFamily: "Noto Sans KR Black",
  //             fontSize: "14px",
  //             fontWeight: "600",
  //             textAlign: "center",
  //           }}
  //         >
  //           <SmallImg src={TitleLogo} /> {userName}님의 질문에 대한 답변입니다.
  //         </Typography>
  //         <Box
  //           sx={{
  //             display: "flex",
  //             justifyContent: "center",
  //             alignItems: "center",
  //             position: "relative",
  //             width: "100%",
  //             marginBottom: 1,
  //           }}
  //         >
  //           <Header>님의 질문입니다.</Header>
  //         </Box>
  //         <QuestionBox>질문</QuestionBox>

  //         <br />
  //         <PrimaryBtn
  //           btnName={"SNS 공유하기"}
  //           onClick={() => alert("준비 중입니다.")}
  //         ></PrimaryBtn>
  //         <br />

  //       </Wrapper>
  //     </>
  //   );
};

export default Comments;