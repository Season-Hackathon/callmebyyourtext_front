import { Box } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Menu from '../assets/images/menu.png';
import {
  Header,
  MyPage,
  QuestionBox,
  Container,
} from '../components/ComponentStyled';

const Comments = () => {
  const navigate = useNavigate();
  const Auth = localStorage.getItem('auth');
  const userId = localStorage.getItem('id');
  const goToMyPage = () => {
    if (Auth) {
      navigate(`/mypage/${userId}`);
    } else {
      localStorage.clear();
      return alert('로그인 후 이용해주세요.');
    }
  };
  return (
    <>
      <MyPage src={Menu} onClick={goToMyPage} />
      <Container>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            width: '100%',
            marginBottom: 1,
          }}
        >
          <Header>님의 질문입니다.</Header>
        </Box>
        <QuestionBox>~~</QuestionBox>
        {/* {writer === userName ? "로그인 유저 접근" : "다른 사용자 접근"} */}
        {/* <br />
        <PrimaryBtn
          btnName={"SNS 공유하기"}
          onClick={() => alert("준비 중입니다.")}
        ></PrimaryBtn>
        <br />
        <PrimaryBtn btnName={"주소 복사"} onClick={copyLink}></PrimaryBtn> */}
      </Container>
    </>
  );
};

export default Comments;
