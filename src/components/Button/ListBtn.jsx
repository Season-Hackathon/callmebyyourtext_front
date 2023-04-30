import React from 'react';
import styled from 'styled-components';
import { primaryColor } from '../../GlobalStyle';

const Button = styled.button`
  width: 350px;
  height: 35px;
  min-height: 35px;
  border: 1px solid ${primaryColor};
  color: ${primaryColor};
  background-color: transparent;
  border-radius: 5px;
  transition: 0.3s;
  &:hover {
    color: white;
    background-color: ${primaryColor};
    cursor: pointer;
  }
`;

const ListBtn = ({
  btnName,
  onClick,
  question,
  questionId,
  writer,
  publish,
  userId,
}) => {
  return (
    <Button
      onClick={onClick}
      question={question}
      questionId={questionId}
      writer={writer}
      publish={publish}
      userId={userId}
    >
      {btnName}
    </Button>
  );
};

export default ListBtn;
