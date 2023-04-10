import React from 'react';
import {
  Container,
  TitleBox,
  SubTitle404,
} from '../components/ComponentStyled';
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
        <TitleBox onClick={redirectURL}></TitleBox>
        <br />
        <br />
        <SubTitle404>
          존재하지 않는 페이지입니다.
          <br />
          다시 시도해주세요.
        </SubTitle404>
        <br />
        <br />
        <PrimaryBtn btnName={'돌아가기'} onClick={redirectURL}></PrimaryBtn>
      </Container>
    </>
  );
};

export default NotFound;
