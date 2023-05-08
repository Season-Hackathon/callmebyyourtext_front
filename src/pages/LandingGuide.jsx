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
  ThirdChild1,
  ThirdChild1Header,
  ThirdChild2,
  ThirdChild3,
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
        <ThirdSection ref={element}>
          <ThirdChild1>
            <ThirdChild1Header>
              "당신은 당신을 얼마나 잘 알고 있나요?"
            </ThirdChild1Header>
          </ThirdChild1>
          <ThirdChild2></ThirdChild2>
          <ThirdChild3></ThirdChild3>
        </ThirdSection>
      </ScrollContainer>
    </>
  );
};

export default LandingGuide;
