import React from 'react';
import ListBtn from '../Button/ListBtn';
import { Link } from 'react-router-dom';

const QuestionComponent = ({
  question,
  questionId,
  writer,
  publish,
  userId,
}) => {
  return (
    <>
      <Link
        to={`/question/${questionId}`}
        state={{ question, questionId, writer, publish, userId }}
      >
        <ListBtn
          btnName={
            question.length > 20 ? question.slice(0, 20) + '...' : question
          }
        ></ListBtn>
      </Link>
      <br />
    </>
  );
};

export default QuestionComponent;
