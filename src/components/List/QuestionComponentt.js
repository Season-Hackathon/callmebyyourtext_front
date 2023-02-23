import { Box, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import { primaryColor } from "../../styles/GlobalStyle";
import ListBtn from "../Button/ListBtn";
import { DeleteText, modalStyle, SmallImg } from "../Styled";
import HeartLogo from "../../assets/images/inputId.png";
import axios from "axios";

const QuestionComponent = ({ question, questionId, comments }) => {
  // 변수 관리
  const userId = localStorage.getItem("id");
  const Token = localStorage.getItem("token");

  // 모달 관리
  const [open, setOpen] = useState(false);
  const modalOpen = () => setOpen(true);
  const modalClose = () => setOpen(false);
  // 삭제 질문 id 체크 202322433931166460
  // 질문 관리
  const deleteQuestion = () => {
    if (window.confirm("해당 질문을 삭제하시겠습니까?")) {
      axios.delete(`http://127.0.0.1:8000/questions/${questionId}`, {
        withCredentials: true,
        headers: {
          Authorization: `token ${Token}`,
        },
      });
    } else {
      return;
    }
  };

  return (
    <>
      <ListBtn btnName={question} onClick={modalOpen}></ListBtn>
      <Modal
        open={open}
        onClose={modalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Box
            id="modal-modal-description"
            sx={{
              mt: 2,
              fontSize: 16,
              fontFamily: "Noto Sans KR Black",
              borderBottom: `1px solid ${primaryColor}`,
              marginBottom: 3,
              paddingBottom: 1,
              position: "relative",
            }}
          >
            <SmallImg src={HeartLogo} /> {question}
            <Typography sx={{ position: "absolute", top: 0, right: 0 }}>
              <DeleteText onClick={deleteQuestion}>삭제</DeleteText>
            </Typography>
          </Box>
          <Typography
            id="modal-modal-description"
            sx={{
              mt: 2,
              fontSize: 13,
              fontFamily: "Noto Sans KR Black",
              opacity: "75%",
              textAlign: "right",
              transition: "0.5s",
              "&:hover": {
                color: `${primaryColor}`,
              },
            }}
          ></Typography>
        </Box>
      </Modal>
      <br />
    </>
  );
};

export default QuestionComponent;
