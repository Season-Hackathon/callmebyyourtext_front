import React from 'react';
import styled from 'styled-components';
import { primaryColor } from '../../GlobalStyle';

const TitleText = styled.p`
  font-family: 'Noto Sans KR Black';
  font-style: italic;
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  color: ${primaryColor};
  margin-bottom: 3%;
  cursor: pointer;
`;

const Bold = styled.span`
  font-family: 'Noto Sans KR Bold';
  font-weight: 900;
`;

const Title = ({ onClick }) => {
  return (
    <>
      <TitleText onClick={onClick}>
        Call me by your <Bold>TEXT</Bold>
      </TitleText>
    </>
  );
};

export default Title;
