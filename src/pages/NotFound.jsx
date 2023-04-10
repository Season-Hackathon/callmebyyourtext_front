import React from 'react';
import { Img, SubTitle, Container } from '../components/ComponentStyled';
import Title from '../components/Title/Title';
import Logo from '../assets/images/loadingLogo.png';
import PrimaryBtn from '../components/Button/PrimaryBtn';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  const redirectURL = () => {
    navigate('/', { replace: true });
  };
  return (
    <>
      <Container>
        <Img src={Logo} alt="error" />
        <Title />
        <SubTitle>
          존재하지 않는 페이지입니다.
          <br />
          다시 시도해주세요.
        </SubTitle>
        <PrimaryBtn btnName={'돌아가기'} onClick={redirectURL}></PrimaryBtn>
      </Container>
    </>
  );
};

export default NotFound;
