import React, { useContext, useState } from "react";
import { primaryColor } from "../styles/GlobalStyle";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PrimaryBtn from "../components/Button/PrimaryBtn";
import Menu from "../assets/images/menu.png";
import { AuthContext } from "../context/AuthContext";
import { Box, TextField } from "@mui/material";
import {
  DeleteText,
  Header,
  LogIn,
  MyPage,
  QuestionBox,
  Wrapper,
} from "../components/Styled";
import axios from "axios";

const Question = () => {
  // 변수 관리---------------------------------------------------------
  const navigate = useNavigate();
  const location = useLocation();
  const { questionId, question, writer } = location.state;
  const { isLoggedIn } = useContext(AuthContext);
  const userId = localStorage.getItem("id");
  const Token = localStorage.getItem("token");

  // 함수 관리---------------------------------------------------------
  const copyLink = () => {
    navigator.clipboard.writeText(window.document.location.href);
    alert("주소가 복사되었습니다.");
  };
  const goToSignIn = () => {
    navigate("/signin");
  };
  const goToMyPage = () => {
    if (isLoggedIn) {
      navigate(`/mypage/${userId}`);
    } else {
      return alert("로그인 후 이용해주세요.");
    }
  };
  // 질문 관리
  const deleteQuestion = () => {
    if (window.confirm("해당 질문을 삭제하시겠습니까?")) {
      try {
        axios.delete(`http://127.0.0.1:8000/questions/${questionId}`, {
          withCredentials: true,
          headers: {
            Authorization: `token ${Token}`,
          },
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      return;
    }
  };

  const onSubmit = (e) => {
    alert(e.target);
  };
  return (
    <>
      <LogIn onClick={goToSignIn}>로그인</LogIn>
      <MyPage src={Menu} onClick={goToMyPage} />
      <Wrapper>
        <Header>{writer}님의 질문입니다.</Header>
        <DeleteText onClick={deleteQuestion}>삭제</DeleteText>
        <QuestionBox>{question}</QuestionBox>
        <TextField
          variant="outlined"
          autoFocus
          fullWidth
          color="secondary"
          id="answer"
          label="답변을 입력해주세요."
          name="answer"
          autoComplete="answer"
          sx={{
            borderBottom: `1px dashed ${primaryColor}`,
            borderRadius: 3,
            marginBottom: 2,
          }}
          // onChange={onChange}
        />
        <PrimaryBtn btnName={"답변 등록"} onClick={onSubmit}></PrimaryBtn>
        <br />
        <PrimaryBtn
          btnName={"SNS 공유하기"}
          onClick={() => alert("준비 중입니다.")}
        ></PrimaryBtn>
        <br />
        <PrimaryBtn btnName={"주소 복사"} onClick={copyLink}></PrimaryBtn>
      </Wrapper>
    </>
  );
};

export default Question;
