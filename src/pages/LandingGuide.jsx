import {
  FirstHeadLine,
  FirstSection,
  FixedButton,
  LoadingBox,
  LoadingCircle1,
  LoadingCircle2,
  LoadingCircle3,
  ScrollContainer,
  SecondSection,
  ThirdSection,
  TitleBox,
} from 'components/ComponentStyled';
import useMoveScroll from 'components/Hooks/useMoveScroll';

import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingGuide = () => {
  const navigate = useNavigate();
  const goToHome = () => navigate('/');
  const goToSignIn = () => navigate('/signin');
  const { element, onMoveToElement } = useMoveScroll();
  return (
    <>
      <ScrollContainer>
        <FirstSection>
          <FixedButton onClick={goToSignIn}>시작하기</FixedButton>
          <TitleBox onClick={goToHome} />
          <FirstHeadLine>
            "An irresistible desire to understand my very existence"
          </FirstHeadLine>
        </FirstSection>
        <SecondSection>
          <LoadingBox>
            <LoadingCircle1></LoadingCircle1>
            <LoadingCircle2></LoadingCircle2>
            <LoadingCircle3 onClick={onMoveToElement}></LoadingCircle3>
          </LoadingBox>
        </SecondSection>
        <ThirdSection ref={element}></ThirdSection>
      </ScrollContainer>
    </>
  );
};

export default LandingGuide;
