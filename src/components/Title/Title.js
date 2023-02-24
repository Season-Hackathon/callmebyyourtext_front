import React from "react";
import styled from "styled-components";
import { primaryColor } from "../../styles/GlobalStyle";

const TitleText = styled.p`
  font-family: "Noto Sans KR Black";
  font-style: italic;
  font-size: 1.5rem;
  text-align: center;
  color: ${primaryColor};
  margin-bottom: 0;
`;

const Bold = styled.span`
  font-family: "Noto Sans KR Bold";
  font-weight: 900;
`;

const Title = () => {
  return (
    <>
      <TitleText>
        Call me by your <Bold>TEXT</Bold>
      </TitleText>
    </>
  );
};

export default Title;
