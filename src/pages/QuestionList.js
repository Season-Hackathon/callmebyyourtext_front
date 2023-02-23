import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import TitleLogo from "../assets/images/titleLogo.png";
import { modalStyle, SmallImg, Wrapper } from "../components/Styled";
import { Box, Modal, Typography } from "@mui/material";
import {
  pointColor,
  primaryColor,
  secondaryColor,
} from "../styles/GlobalStyle";
import QuestionComponent from "../components/List/QuestionComponentt";
import axios from "axios";

const QuestionList = ({ questionId, questionText, questionAnswer }) => {
  // 변수 관리
  const navigate = useNavigate();
  const userName = localStorage.getItem("name");
  const { isLoggedIn } = useContext(AuthContext);
  const Id = localStorage.getItem("id");

  // 모달 관리
  const [open, setOpen] = useState(false);
  const modalOpen = () => setOpen(true);
  const modalClose = () => setOpen(false);

  // 질문 관리(예시)
  // const questionArray = [
  //   {
  //     id: 1,
  //     question: "test question1",
  //     writer: "amin1",
  //     comments: [
  //       { id: 1, comment: "hello" },
  //       { id: 2, comment: "how" },
  //     ],
  //   },
  const [questionArray, setQuestionArray] = useState([]);
  const fetchComment = async () => {
    try {
      const getQuestionData = await axios.get(
        `http://127.0.0.1:8000/${Id}/questionList`
      );
      setQuestionArray(getQuestionData.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchComment();
  }, []);

  const questionList = [questionArray?.map((q) => <QuestionComponent />)];

  return (
    <>
      <Wrapper>
        <Typography
          variant="h5"
          sx={{
            color: `${pointColor}`,
            borderBottom: `1px solid ${primaryColor}`,
            marginBottom: "10%",
          }}
        >
          <SmallImg src={TitleLogo} /> {userName}님의 질문 리스트
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {questionArray.length === 0 ? (
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "700",
                textAlign: "center",
                color: `${secondaryColor}`,
              }}
            >
              등록된 질문이 없습니다.
            </Typography>
          ) : (
            [...questionList]
          )}
        </Box>
      </Wrapper>
      <Modal
        open={open}
        onClose={modalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: "700",
              textAlign: "center",
              color: `${secondaryColor}`,
            }}
          >
            나의 포인트 :{" "}
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default QuestionList;
