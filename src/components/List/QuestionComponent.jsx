import React from 'react';
import ListBtn from '../Button/ListBtn';
import { Link } from 'react-router-dom';

const QuestionComponent = ({ question, questionId, writer }) => {
  return (
    <>
      <Link
        to={`/question/${questionId}`}
        state={{ question, questionId, writer }}
      >
        <ListBtn
          btnName={
            question.length > 25 ? question.slice(0, 25) + '...' : question
          }
        ></ListBtn>
      </Link>
      <br />
    </>
  );
};

export default QuestionComponent;
