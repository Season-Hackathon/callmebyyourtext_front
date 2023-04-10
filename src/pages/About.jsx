import React from 'react';
import { DarkContainer, ImageBox } from 'components/ComponentStyled';
import Likelion from '../assets/images/LIKELION.png';

import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/');
  };
  return (
    <>
      <DarkContainer>
        <ImageBox src={Likelion} alt="LIKELION" onClick={goToHome} />
        멋쟁이사자처럼 벚꽃톤 프로젝트 Call me by your TEXT
        <br />
        TEAM_LIKELION
      </DarkContainer>
    </>
  );
};

export default About;
