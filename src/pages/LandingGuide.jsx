import {
  FirstHeadLine,
  FirstSection,
  LoadingBox,
  ScrollContainer,
  TitleBox,
} from 'components/ComponentStyled';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingGuide = () => {
  const navigate = useNavigate();
  const goToHome = () => navigate('/');
  return (
    <>
      <ScrollContainer>
        <FirstSection>
          <TitleBox onClick={goToHome} />
          <LoadingBox></LoadingBox>
          <FirstHeadLine>
            "An irresistible desire to understand my very existence"
          </FirstHeadLine>
        </FirstSection>
      </ScrollContainer>
    </>
  );
};

export default LandingGuide;
