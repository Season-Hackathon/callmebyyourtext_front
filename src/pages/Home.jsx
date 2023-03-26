import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/images/loadingLogo.png';
import { Bracket, Img, SubTitle, Wrapper } from '../components/ComponentStyled';
import { primaryColor } from 'GlobalStyle';
import LandingTitle from 'components/Title/LandingTitle';

const Home = () => {
  const body = document.querySelector('body');
  body.style.backgroundColor = `${primaryColor}`;
  body.classList.add('.fadeOut');

  const navigate = useNavigate();
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
      <Wrapper>
        <Img src={Logo} alt="error" />
        <LandingTitle />
        <SubTitle>
          나의 (<Bracket>빈칸</Bracket>), 당신의 ____
        </SubTitle>
      </Wrapper>
    </>
  );
};

export default Home;
