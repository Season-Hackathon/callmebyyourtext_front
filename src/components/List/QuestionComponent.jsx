import React from 'react';
import ListBtn from '../Button/ListBtn';
import { Link, useNavigate } from 'react-router-dom';

const QuestionComponent = ({
  question,
  questionId,
  writer,
  publish,
  userId,
}) => {
  const navigate = useNavigate();
  const goToQuestion = () => {
    navigate(`/question/${questionId}`);
  };
  return (
    <>
      {/* <Link
        to={`/question/${questionId}`}
        state={{ question, questionId, writer, publish, userId }}
      ></Link> */}
      <ListBtn
        btnName={
          question.length > 20 ? question.slice(0, 20) + '...' : question
        }
        questionId={questionId}
        question={question}
        writer={writer}
        publish={publish}
        userId={userId}
        onClick={goToQuestion}
      ></ListBtn>

      <br />
    </>
  );
};

export default QuestionComponent;
