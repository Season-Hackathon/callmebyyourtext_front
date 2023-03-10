import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TitleLogo from "assets/images/titleLogo.png";
import { modalStyle, SmallImg, Wrapper } from "components/Styled";
import { Box, Modal, Typography } from "@mui/material";
import {
  pointColor,
  primaryColor,
  secondaryColor,
} from "styles/GlobalStyle";
import axios from "axios";
import PrimaryBtn from "components/Button/PrimaryBtn";
import ListBtn from "components/Button/ListBtn";
import QuestionComponent from "components/List/QuestionComponent";

const QuestionList = () => {
  // 변수 관리
  const navigate = useNavigate();
  const userName = localStorage.getItem("name");
  const userId = localStorage.getItem("id");
  const Token = localStorage.getItem("token");
  const goToCreateQuestion = () => {
    navigate(`/createquestion/${userId}`);
  };

  // 모달 관리
  const [open, setOpen] = useState(false);
  const modalOpen = () => setOpen(true);
  const modalClose = () => setOpen(false);

  // 상태 관리
  const [questionArray, setQuestionArray] = useState([]);
  const [point, setPoint] = useState("");
  const fetchData = async () => {
    try {
      const getQuestionData = await axios.get(
        `http://127.0.0.1:8000/${userId}/questionList`
      );
      const getPoint = await axios.get(`http://127.0.0.1:8000/login/profile/${userId}/`, {
        withCredentials: true,
        headers: {
          Authorization: `token ${Token}`,
        },
      })
      setQuestionArray(getQuestionData.data);
      setPoint(getPoint.data.point);
    } catch (error) {
      console.log(error);
      // alert("데이터를 가져오는데 실패했습니다. 다시 로그인해주세요.");
      // console.clear();
      // localStorage.clear();
      // navigate("/signin");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const questionList = [
    questionArray?.map((q) => (
      <QuestionComponent
        key={q.id}
        questionId={q.id}
        question={q.question}
        writer={q.writer}
      />
    )),
  ];

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
        <Typography
          variant="h6"
          sx={{
            color: `${secondaryColor}`,
            marginBottom: "10%",
            fontFamily: "Noto Sans KR Black",
            fontSize: "14px",
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          <SmallImg src={TitleLogo} /> 현재 포인트 : {point}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxHeight: "45vh",
            overflowY: "auto",
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
              <br />
              <br />
              <PrimaryBtn
                btnName={"질문 만들기"}
                onClick={goToCreateQuestion}
              ></PrimaryBtn>
            </Typography>
          ) : (
            [
              <ListBtn
                btnName={"+"}
                onClick={goToCreateQuestion}
                key={userId}
              />,
              <br key="enter" />,
              ...questionList,
            ]
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
