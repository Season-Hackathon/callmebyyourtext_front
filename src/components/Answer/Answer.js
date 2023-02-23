import { Box, Typography } from "@mui/material";
import React from "react";
import { DeleteText, SmallImg } from "../Styled";
import HeartLogo from "../../assets/images/inputId.png";
import { primaryColor } from "../../styles/GlobalStyle";

const Answer = ({ questionId, questionText, questionAnswer }) => {
  const deleteQuestion = () => {
    window.confirm("해당 질문을 삭제하시겠습니까?");
  };
  return (
    <>
      <Box
        id="modal-modal-description"
        sx={{
          mt: 3,
          fontSize: 16,
          fontFamily: "Noto Sans KR Black",
          borderBottom: `1px solid ${primaryColor}`,
          marginBottom: 1,
          paddingBottom: 0.5,
          position: "relative",
        }}
      >
        <SmallImg src={HeartLogo} /> {questionText}
        <Box sx={{ position: "absolute", right: 0, top: 0 }}>
          <DeleteText onClick={deleteQuestion}>삭제</DeleteText>
        </Box>
      </Box>
      <Typography
        id="modal-modal-description"
        sx={{
          fontSize: 13,
          fontFamily: "Noto Sans KR Black",
          opacity: "75%",
        }}
      >
        {questionAnswer}
      </Typography>
    </>
  );
};

export default Answer;
