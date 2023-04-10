import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bracket,
  SubTitle,
  Container,
  TitleBox,
} from '../components/ComponentStyled';
import { bgColor } from 'GlobalStyle';

const Home = () => {
  const body = document.querySelector('body');
  body.style.backgroundColor = bgColor;
  body.classList.add('.fadeOut');

  const navigate = useNavigate();
  const goToHome = () => {
    navigate('/');
  };
  const loading = () => {
    setTimeout(() => {
      navigate('/signin');
      body.style.backgroundColor = 'white';
      body.classList.remove('.fadeOut');
    }, 2000);
  };

  useEffect(() => {
    loading();
    return () => {
      clearTimeout(loading);
    };
  }, []);

  return (
    <>
      <Container>
        <TitleBox onClick={goToHome}></TitleBox>
        <br />
        <SubTitle>
          나의 (<Bracket>빈칸</Bracket>), 당신의 ____
        </SubTitle>
      </Container>
    </>
  );
};

export default Home;
