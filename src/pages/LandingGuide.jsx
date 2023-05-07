import { TitleBox } from 'components/ComponentStyled';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingGuide = () => {
  const navigate = useNavigate();
  const goToHome = () => navigate('/');
  return (
    <>
      <TitleBox onClick={goToHome} />
    </>
  );
};

export default LandingGuide;
