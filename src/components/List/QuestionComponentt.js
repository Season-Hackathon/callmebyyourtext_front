import { Box } from "@mui/material";
import React, { useState } from "react";
import ListBtn from "../Button/ListBtn";
import { DeleteText } from "../Styled";

const QuestionComponent = ({ question, questionId, comments }) => {
  // 모달 관리
  const [open, setOpen] = useState(false);
  const modalOpen = () => setOpen(true);
  const modalClose = () => setOpen(false);
  // 질문 관리
  const deleteQuestion = () => {
    window.confirm("해당 질문을 삭제하시겠습니까?");
  };

  return (
    <>
      <ListBtn btnName={question} onClick={modalOpen}>
        <Box sx={{ position: "absolute", right: 0, top: 0 }}>
          <DeleteText onClick={deleteQuestion}>삭제</DeleteText>
        </Box>
      </ListBtn>
      <br />
    </>
  );
};

export default QuestionComponent;
